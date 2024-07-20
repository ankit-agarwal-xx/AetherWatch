# AetherWatch

## About

AetherWatch is a lightweight DNS server implementation designed to resolve DNS queries via UDP. It provides a simple yet efficient way to handle DNS requests from clients and send back responses with resolved DNS records.

## Features

- **UDP-based DNS Resolution**: The server listens for DNS requests over UDP, making it suitable for quick and lightweight DNS resolution tasks.
- **System-Configured Resolver**: Utilizes the system-configured DNS resolver to perform DNS queries, ensuring compatibility with various DNS configurations.
- **Support for Multiple Record Types**: Supports resolution of various types of DNS records, including "A", "AAAA", "MX", "CNAME", "TXT", and more.
- **Error Handling**: Handles DNS resolution errors gracefully, providing informative messages in case of failures or timeouts.
- **Flexible Configuration**: Easily configurable server settings, such as the server IP address and port number, allowing for customization based on deployment requirements.
- **Parallel Processing**: Implements parallel processing, making the service highly scalable as the hardware specs are increased.

## Use Case

AetherWatch is particularly useful in scenarios where a lightweight DNS resolution solution is needed, such as:

- Local network DNS resolution for internal services and resources.
- DNS resolution for small-scale applications and services where a full-fledged DNS server may be overkill.
- Educational purposes, allowing users to understand the basics of DNS resolution and server-side network programming.

## Technologies Used

- **Python**: The server implementation is written in Python, leveraging its simplicity and versatility for network programming tasks.
- **dns.resolver**: Utilizes the `dns.resolver` module from the `dnspython` library for performing DNS queries.
- **Socket Programming**: Implements UDP socket programming in Python to handle communication between the server and clients.

## Future Enhancements

- **TCP Support**: Extend the server to support TCP-based DNS resolution for handling large DNS responses and zone transfers.
- **Cache Implementation**: Implement a caching mechanism to store resolved DNS records temporarily, improving response time for frequently requested records.
- **Security Measures**: Introduce security features such as DNSSEC support and filtering capabilities to enhance the server's reliability and security.

## Tutorial

### Setup

1. **Python Version**: Use only Python 3.11, not above.
2. **Clone the Repository**:
    ```sh
    git clone <repository-url>
    cd AetherWatch
    ```

3. **Create a Virtual Environment**:
    ```sh
    python3.11 -m venv env
    source env/bin/activate   # On Windows use `env\Scripts\activate`
    ```

4. **Install Dependencies and Run the Server**:
    ```sh
    python main.py
    ```

5. **Windows Registry Configuration**:
    
    Run the following command in PowerShell (Admin mode):
    ```sh
    New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
    ```

6. **Start the Server**:
    ```sh
    python main.py
    ```

    You will be prompted to enter your email ID and password. The server will then start on your PC.

### Usage

To make a DNS query from any device on the same network:

- **For Windows**:
    ```sh
    nslookup google.com 192.168.1.2
    ```
    Replace `192.168.1.2` with your server PC's IP.

- **For Mac/Linux**:
    ```sh
    dig @192.168.1.2 google.com
    ```
    Replace `192.168.1.2` with your server PC's IP.

