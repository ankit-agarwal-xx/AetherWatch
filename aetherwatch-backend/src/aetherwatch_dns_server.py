import socket
import dns.message
import dns.rrset
import dns.name
import dns.query
import dns.flags
import pandas as pd
import time
import os
import joblib
import dns.resolver
import dns.exception
import tldextract
from ml_model_server.dns_tunnelling_model import dns_ml_model_predict

# Server Configuration
SERVER_IP = "127.0.0.1"
SERVER_PORT = 53

# Paths
blacklist_path = "blacklist_domains.txt"
whitelist_path = "whitelist_domains.txt"
historical_data_path = "historical_dns_data.csv"
risk_model_path = "/mnt/data/website_risk_model.joblib"

# Load Blacklist and Whitelist
def load_domains(file_path):
    if os.path.exists(file_path):
        with open(file_path, 'r') as file:
            return set(file.read().splitlines())
    return set()

blacklist_domains = load_domains(blacklist_path)
whitelist_domains = load_domains(whitelist_path)

# Load Historical Data
if os.path.exists(historical_data_path):
    historical_df = pd.read_csv(historical_data_path)
else:
    historical_df = pd.DataFrame(columns=['query_name', 'client_ip', 'query_time', 'response_time'])

# Save Historical Data
def save_historical_data(df):
    df.to_csv(historical_data_path, index=False)

# Load Risk Assessment Model
risk_model = joblib.load(risk_model_path)

# Add to Whitelist
def addToWhitelist(data):
    with open(whitelist_path, 'a') as file:
        file.write(f"{data['domain']}\n")
    whitelist_domains.add(data['domain'])

# Create Data Object
def create_data_object(query_name, client_address, ip_address, curr_time, is_malicious, is_blacklist, is_whitelist, elapsed_time, risk_assessment):
    return {
        'query_name': query_name,
        'client_ip': client_address,
        'query_time': curr_time,
        'response_time': elapsed_time,
        'response_ip': ip_address,
        'is_malicious': is_malicious,
        'is_blacklist': is_blacklist,
        'is_whitelist': is_whitelist,
        'risk_assessment': risk_assessment
    }

# DNS Cache
dns_cache = {}
CACHE_EXPIRY_TIME = 300  # 5 minutes

resolver = dns.resolver.Resolver()

def resolve_dns(domain_name):
    cached_record = dns_cache.get(domain_name)
    if cached_record and time.time() - cached_record[1] < CACHE_EXPIRY_TIME:
        print("Retrieving from cache:", domain_name)
        return cached_record[0]
    
    for q_type in ["CNAME", "A", "AAAA", "SOA", "MX", "NS", "TXT"]:
        try:
            answer = resolver.resolve(domain_name, q_type)
            record = (str(answer[0]), q_type)
            dns_cache[domain_name] = (record, time.time())
            return record
        except (dns.resolver.NoAnswer, dns.resolver.NXDOMAIN):
            pass
        except dns.resolver.Timeout:
            print("DNS resolution timed out.")
            return None
        except dns.exception.DNSException as e:
            print(f"DNS resolution failed: {e}")
            return None

def handle_dns_record_type(response, query_name):
    try:
        ip_addresses = resolve_dns(query_name)
        query_type = ip_addresses[1]
    except TypeError:
        print(f"Could not resolve {query_name}.")
        ip_addresses = ("0.0.0.0", "A")
        query_type = ip_addresses[1]
        
    if query_type == "CNAME":
        RRset = dns.rrset.from_text(query_name, 300, dns.rdataclass.IN, dns.rdatatype.CNAME, ip_addresses[0])
        response.answer.append(RRset)
        response = handle_dns_record_type(response, ip_addresses[0])
    elif query_type == "MX":
        RRset = dns.rrset.from_text(query_name, 300, dns.rdataclass.IN, dns.rdatatype.MX, ip_addresses[0])
        response.answer.append(RRset)
    elif query_type == "A":
        RRset = dns.rrset.from_text(query_name, 300, dns.rdataclass.IN, dns.rdatatype.A, ip_addresses[0])
        response.answer.append(RRset)
    elif query_type == "AAAA":
        RRset = dns.rrset.from_text(query_name, 300, dns.rdataclass.IN, dns.rdatatype.AAAA, ip_addresses[0])
        response.answer.append(RRset)
    elif query_type == "SOA":
        RRset = dns.rrset.from_text(query_name, 300, dns.rdataclass.IN, dns.rdatatype.SOA, ip_addresses[0])
        response.authority.append(RRset)
    return response

def handle_dns_request(data, client_address):
    request = dns.message.from_wire(data)
    query_name = str(request.question[0].name)
    query_type = str(request.question[0].rdtype)

    response = dns.message.make_response(request)
    response.flags |= dns.flags.QR

    is_malicious = False
    is_blacklist = query_name in blacklist_domains
    is_whitelist = query_name in whitelist_domains

    new_data = {'ip_address': '0.0.0.0'}
    risk_assessment = None

    curr_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
    elapsed_time = time.time()

    if is_blacklist:
        print(f"Blocked {query_name} (Blacklisted)")
        RRset = dns.rrset.from_text(query_name, 300, dns.rdataclass.IN, query_type, "0.0.0.0")
        response.answer.append(RRset)
        is_malicious = True
    else:
        try:
            received_t = dns_ml_model_predict(query_name)
            # Assuming the risk model works with some features extracted from the query_name
            risk_features = [query_name]  # Adjust based on actual feature extraction requirements
            risk_assessment = risk_model.predict_proba([risk_features])[0][1]  # Use predict_proba for risk assessment

            if received_t[0] == 1 and received_t[1] >= 70:
                print(f"ML Model predicted malicious with probability {received_t[1]}%")
                print(f"Blocked {query_name}")
                print(f"DNS tunneling detected with {received_t[1]:.2f}% probability.")
                print(f"Risk assessment: {risk_assessment}")

                try:
                    RRset = dns.rrset.from_text(query_name, 300, dns.rdataclass.IN, query_type, "0.0.0.0")
                    response.answer.append(RRset)
                except:
                    print("Not Resolved, dummy IP sent!")
                is_malicious = received_t[1]
            else:
                print(f"DNS tunneling not detected (probability: {received_t[1]:.2f}%)")
                print(f"Risk assessment: {risk_assessment}")

                response = handle_dns_record_type(response, query_name)
                if response.answer:
                    a_response = [i for i in str(response.answer[0]).split(" ")][4:]
                    new_data = {'s': 0, 'domain': query_name, 'ip_address': a_response[0]}
                if response.authority:
                    soa_response = [i for i in str(response.authority[0]).split(" ")][4:]
                    soa_response = " ".join(soa_response)[1:]
                    new_data = {'s': 0, 'domain': query_name, 'ip_address': soa_response}

                if new_data['ip_address'] != "0.0.0.0":
                    addToWhitelist(new_data)

            print("...ML Detection finished.")
        except Exception as e:
            print("ML Model ran into a problem so blocking all requests.")
            print(str(e))
            RRset = dns.rrset.from_text(query_name, 300, dns.rdataclass.IN, query_type, "0.0.0.0")
            response.answer.append(RRset)

    elapsed_time = time.time() - elapsed_time
    final_data = create_data_object(query_name, list(client_address), new_data['ip_address'], str(curr_time), is_malicious, is_blacklist, is_whitelist, str(elapsed_time), risk_assessment)
    historical_df.append(final_data, ignore_index=True)
    save_historical_data(historical_df)
    return response

# Main Function to Run the Server
def run_server():
    print(f"Starting DNS server on {SERVER_IP}:{SERVER_PORT}")
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.bind((SERVER_IP, SERVER_PORT))

    try:
        while True:
            data, client_address = sock.recvfrom(512)
            response = handle_dns_request(data, client_address)
            sock.sendto(response.to_wire(), client_address)
    except KeyboardInterrupt:
        print("\nServer shutdown.")
    finally:
        sock.close()

if __name__ == "__main__":
    run_server()
