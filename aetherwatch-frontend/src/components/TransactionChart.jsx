import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
	{
		name: 'Jan',
		Threats: 4000,
		Blocked: 2400
	},
	{
		name: 'Feb',
		Threats: 3000,
		Blocked: 1398
	},
	{
		name: 'Mar',
		Threats: 8000,
		Blocked: 4800
	},
	{
		name: 'Apr',
		Threats: 2780,
		Blocked: 3908
	},
	{
		name: 'May',
		Threats: 1890,
		Blocked: 4800
	},
	{
		name: 'Jun',
		Threats: 2390,
		Blocked: 3800
	},
	{
		name: 'July',
		Threats: 3490,
		Blocked: 4300
	},
	{
		name: 'Aug',
		Threats: 12000,
		Blocked: 9800
	},
	{
		name: 'Sep',
		Threats: 2780,
		Blocked: 3908
	},
	{
		name: 'Oct',
		Threats: 11890,
		Blocked: 8800
	},
	{
		name: 'Nov',
		Threats: 2390,
		Blocked: 3800
	},
	{
		name: 'Dec',
		Threats: 3490,
		Blocked: 4300
	}
]

export default function TransactionChart() {
	return (
		<div className="h-[22rem] bg-black bg-opacity-60 p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
			<strong className="text-white-700 font-medium">Potential Threat Attempts</strong>
			<div className="mt-3 w-full flex-1 text-xs">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						width={500}
						height={300}
						data={data}
						margin={{
							top: 20,
							right: 10,
							left: -10,
							bottom: 0
						}}
					>
						<CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="Threats" fill="#ea580c" />
						<Bar dataKey="Blocked" fill="#0ea5e9"/>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
