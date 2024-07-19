# website_risk_model.py
from joblib import load
import pandas as pd
from datetime import datetime, timedelta

model_path = '/mnt/data/website_risk_model.joblib'
website_model = load(model_path)

def preprocess_url(url):
    features = pd.DataFrame({
        'url_length': [len(url)],
        'subdomain_count': [url.count('.') - 1],
        'domain_age': [1],  # Dummy value
        'ssl_valid': [1],  # Dummy value
        'numeric_chars': [sum(c.isdigit() for c in url)],  # Count numeric characters
        'suspicious_keywords': [0],  # Dummy value for suspicious keywords
    })
    return features

def assess_website_risk(url):
    features = preprocess_url(url)
    risk_score = website_model.predict_proba(features)[0][1]
    return risk_score

def generate_trends_and_insights(df, days=30):
    today = datetime.now()
    df['date'] = [today - timedelta(days=np.random.randint(0, days)) for _ in range(len(df))]
    daily_stats = df.groupby('date').agg({
        'label': ['count', lambda x: (x == 1).sum() / len(x)],
        'url_length': 'mean',
        'suspicious_keywords': 'mean'
    }).reset_index()
    daily_stats.columns = ['date', 'total_urls', 'fraud_ratio', 'avg_url_length', 'avg_suspicious_keywords']
    daily_stats['fraud_ratio_trend'] = daily_stats['fraud_ratio'].diff()
    daily_stats['url_length_trend'] = daily_stats['avg_url_length'].diff()
    daily_stats['suspicious_keywords_trend'] = daily_stats['avg_suspicious_keywords'].diff()
    return daily_stats

def check_compliance(trends):
    compliance_status = {
        'DPR': {'status': 'Compliant', 'issues': []},
        'PCI-DSS': {'status': 'Compliant', 'issues': []}
    }
    if trends['fraud_ratio'].mean() > 0.1:
        compliance_status['DPR']['status'] = 'Non-compliant'
        compliance_status['DPR']['issues'].append('High proportion of potentially fraudulent URLs detected')
    if trends['fraud_ratio'].max() > 0.05:
        compliance_status['PCI-DSS']['status'] = 'Non-compliant'
        compliance_status['PCI-DSS']['issues'].append('Daily fraud ratio exceeded 5%')
    return compliance_status

def get_website_risk_assessment(url, df):
    risk_score = assess_website_risk(url)
    trends = generate_trends_and_insights(df)
    compliance = check_compliance(trends)

    assessment = f"Website risk score: {risk_score:.2%}\n"
    assessment += f"Current Trends:\n"
    assessment += f"- Daily fraud ratio: {trends['fraud_ratio'].iloc[-1]:.2%}\n"
    assessment += f"- Average URL length: {trends['avg_url_length'].iloc[-1]:.2f}\n"
    assessment += f"- Average suspicious keywords: {trends['avg_suspicious_keywords'].iloc[-1]:.2f}\n"

    assessment += "\nCompliance Status:\n"
    for standard, status in compliance.items():
        assessment += f"- {standard}: {status['status']}\n"
        if status['issues']:
            assessment += f"  Issues:\n"
            for issue in status['issues']:
                assessment += f"  - {issue}\n"

    return assessment
