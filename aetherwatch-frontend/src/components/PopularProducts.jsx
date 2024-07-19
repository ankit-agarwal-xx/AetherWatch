import classNames from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

const topFlaggedDomains = [
	{
		id: '3432',
		domain_name: 'malicious-site.com',
		threat_icon: 'https://img.icons8.com/color/48/000000/virus.png',
		times_flagged: 1499,
		threat_category: 'Malware'
	},
	{
		id: '7633',
		domain_name: 'phishing-attempt.net',
		threat_icon: 'https://img.icons8.com/color/48/000000/phishing.png',
		times_flagged: 399,
		threat_category: 'Phishing'
	},
	{
		id: '6534',
		domain_name: 'data-exfiltration.org',
		threat_icon: 'https://img.icons8.com/color/48/000000/data-encryption.png',
		times_flagged: 899,
		threat_category: 'Data Exfiltration'
	},
	{
		id: '9234',
		domain_name: 'dns-tunnel-service.io',
		threat_icon: 'https://img.icons8.com/color/48/000000/tunnel.png',
		times_flagged: 499,
		threat_category: 'DNS Tunneling'
	},
	{
		id: '4314',
		domain_name: 'suspicious-fintech-app.com',
		threat_icon: 'https://img.icons8.com/color/48/000000/money-transfer.png',
		times_flagged: 699,
		threat_category: 'Financial Service'
	}
]

function TopFlaggedDomains() {
	return (
		<div className="w-[20rem] bg-white p-4 rounded-sm border border-gray-200">
			<strong className="text-gray-700 font-medium">Top Flagged Domains</strong>
			<div className="mt-4 flex flex-col gap-3">
				{topFlaggedDomains.map((domain) => (
					<Link
						key={domain.id}
						to={`/domain/${domain.id}`}
						className="flex items-start hover:no-underline"
					>
						<div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
							<img
								className="w-full h-full object-cover rounded-sm"
								src={domain.threat_icon}
								alt={domain.threat_category}
							/>
						</div>
						<div className="ml-4 flex-1">
							<p className="text-sm text-gray-800">{domain.domain_name}</p>
							<span
								className={classNames(
									domain.times_flagged > 1000
										? 'text-red-500'
										: domain.times_flagged > 500
										? 'text-orange-500'
										: 'text-yellow-500',
									'text-xs font-medium'
								)}
							>
								{domain.times_flagged} times flagged
							</span>
						</div>
						<div className="text-xs text-gray-400 pl-1.5">{domain.threat_category}</div>
					</Link>
				))}
			</div>
		</div>
	)
}

export default TopFlaggedDomains