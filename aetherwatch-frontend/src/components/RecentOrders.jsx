import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

const recentDNSQueries = [
	{
		id: '1',
		timestamp: '2023-07-19T14:23:15',
		source_ip: '192.168.1.105',
		queried_domain: 'secure-bank.com',
		query_type: 'A',
		action_taken: 'Allowed',
		threat_category: 'N/A'
	},
	{
		id: '2',
		timestamp: '2023-07-19T14:24:30',
		source_ip: '192.168.1.107',
		queried_domain: 'malware-site.com',
		query_type: 'A',
		action_taken: 'Blocked',
		threat_category: 'Malware'
	},
	{
		id: '3',
		timestamp: '2023-07-19T14:25:45',
		source_ip: '192.168.1.110',
		queried_domain: 'data-exfil.net',
		query_type: 'AAAA',
		action_taken: 'Blocked',
		threat_category: 'Data Exfiltration'
	},
	{
		id: '4',
		timestamp: '2023-07-19T14:26:10',
		source_ip: '192.168.1.112',
		queried_domain: 'legit-fintech-app.com',
		query_type: 'A',
		action_taken: 'Allowed',
		threat_category: 'N/A'
	},
	{
		id: '5',
		timestamp: '2023-07-19T14:27:55',
		source_ip: '192.168.1.115',
		queried_domain: 'suspicious-dns-tunnel.org',
		query_type: 'TXT',
		action_taken: 'Blocked',
		threat_category: 'DNS Tunneling'
	}
]

const getActionColor = (action) => {
	switch (action) {
		case 'Allowed':
			return 'text-green-500'
		case 'Blocked':
			return 'text-red-500'
		default:
			return 'text-gray-500'
	}
}

export default function RecentDNSQueries() {
	return (
		<div className="bg-black bg-opacity-60 px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
			<strong className="text-white-700 font-medium">Recent DNS Queries</strong>
			<div className="border-x border-gray-200 rounded-sm mt-3">
				<table className="w-full text-white-700">
					<thead>
						<tr>
							<th>Timestamp</th>
							<th>Source IP</th>
							<th>Queried Domain</th>
							<th>Query Type</th>
							<th>Action Taken</th>
							<th>Threat Category</th>
						</tr>
					</thead>
					<tbody>
						{recentDNSQueries.map((query) => (
							<tr key={query.id}>
								<td>{format(new Date(query.timestamp), 'yyyy-MM-dd HH:mm:ss')}</td>
								<td>{query.source_ip}</td>
								<td>
									<Link to={`/domain/${query.queried_domain}`}>{query.queried_domain}</Link>
								</td>
								<td>{query.query_type}</td>
								<td className={getActionColor(query.action_taken)}>{query.action_taken}</td>
								<td>{query.threat_category}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}