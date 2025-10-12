import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { StatCard } from './index'

const meta = {
	title: 'Components/StatCard',
	component: StatCard,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'primary', 'success', 'warning', 'error', 'info']
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg']
		},
		trend: {
			control: 'select',
			options: ['up', 'down', 'neutral']
		},
		loading: {
			control: 'boolean'
		},
		bordered: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		value: '12,345',
		label: 'Total Sales'
	}
}

export const WithIcon: Story = {
	args: {
		value: '1,234',
		label: 'Active Users',
		icon: '👥'
	}
}

export const WithChange: Story = {
	args: {
		value: '45.2',
		label: 'Conversion Rate',
		suffix: '%',
		change: '+12.5%',
		trend: 'up'
	}
}

export const WithDescription: Story = {
	args: {
		value: '892',
		label: 'New Orders',
		icon: '📦',
		change: '+23.1%',
		trend: 'up',
		description: 'Compared to last month'
	}
}

export const WithFooter: Story = {
	args: {
		value: '47,291',
		label: 'Total Revenue',
		prefix: '$',
		change: '+15.3%',
		trend: 'up',
		footer: 'Last updated: 2 minutes ago'
	}
}

export const NegativeTrend: Story = {
	args: {
		value: '34.7',
		label: 'Bounce Rate',
		suffix: '%',
		change: '-5.2%',
		trend: 'down',
		description: 'Lower is better',
		icon: '📊'
	}
}

export const NeutralTrend: Story = {
	args: {
		value: '127',
		label: 'Avg Response Time',
		suffix: 'ms',
		change: '±0%',
		trend: 'neutral',
		icon: '⚡'
	}
}

export const SmallSize: Story = {
	args: {
		value: '8,432',
		label: 'Page Views',
		size: 'sm',
		change: '+8.1%',
		trend: 'up'
	}
}

export const LargeSize: Story = {
	args: {
		value: '2.4M',
		label: 'Total Downloads',
		size: 'lg',
		icon: '⬇️',
		change: '+42.8%',
		trend: 'up'
	}
}

export const PrimaryVariant: Story = {
	args: {
		value: '54,291',
		label: 'Revenue',
		variant: 'primary',
		prefix: '$',
		change: '+18.7%',
		trend: 'up',
		icon: '💰'
	}
}

export const SuccessVariant: Story = {
	args: {
		value: '99.8',
		label: 'Uptime',
		variant: 'success',
		suffix: '%',
		icon: '✓',
		description: 'All systems operational'
	}
}

export const WarningVariant: Story = {
	args: {
		value: '84',
		label: 'Storage Used',
		variant: 'warning',
		suffix: '%',
		icon: '⚠️',
		description: 'Consider upgrading soon'
	}
}

export const ErrorVariant: Story = {
	args: {
		value: '127',
		label: 'Failed Requests',
		variant: 'error',
		change: '+23',
		trend: 'up',
		icon: '❌',
		description: 'Requires immediate attention'
	}
}

export const InfoVariant: Story = {
	args: {
		value: '342',
		label: 'Active Sessions',
		variant: 'info',
		icon: '🔗',
		change: '+12',
		trend: 'up'
	}
}

export const Clickable: Story = {
	args: {
		value: '12,567',
		label: 'Total Users',
		icon: '👥',
		change: '+234',
		trend: 'up',
		onClick: () => alert('Stat card clicked!')
	}
}

export const Bordered: Story = {
	args: {
		value: '1,892',
		label: 'New Signups',
		icon: '✨',
		change: '+127',
		trend: 'up',
		bordered: true
	}
}

export const Loading: Story = {
	args: {
		value: '0',
		label: 'Loading Data',
		loading: true,
		description: 'Please wait...'
	}
}

export const DashboardGrid: Story = {
	render: () => (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
				gap: '1rem'
			}}
		>
			<StatCard
				value="54,291"
				label="Total Revenue"
				variant="primary"
				prefix="$"
				change="+18.7%"
				trend="up"
				icon="💰"
			/>
			<StatCard
				value="12,567"
				label="Total Users"
				variant="success"
				change="+234"
				trend="up"
				icon="👥"
			/>
			<StatCard
				value="892"
				label="New Orders"
				variant="info"
				change="+23.1%"
				trend="up"
				icon="📦"
			/>
			<StatCard
				value="34.7"
				label="Bounce Rate"
				variant="warning"
				suffix="%"
				change="-5.2%"
				trend="down"
				icon="📊"
			/>
		</div>
	)
}

export const AnalyticsDashboard: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
					gap: '1rem'
				}}
			>
				<StatCard
					value="47,291"
					label="Total Revenue"
					prefix="$"
					change="+15.3%"
					trend="up"
					icon="💵"
					description="Compared to last month"
					footer="Updated 2 mins ago"
				/>
				<StatCard
					value="1,234"
					label="Active Users"
					icon="👥"
					change="+87"
					trend="up"
					description="Currently online"
					footer="Real-time"
				/>
				<StatCard
					value="89.4"
					label="Conversion Rate"
					suffix="%"
					change="+2.3%"
					trend="up"
					icon="📈"
					description="Last 30 days"
					footer="Target: 90%"
				/>
				<StatCard
					value="127"
					label="Avg Response"
					suffix="ms"
					change="±0%"
					trend="neutral"
					icon="⚡"
					description="Server latency"
					footer="Optimal"
				/>
			</div>
		</div>
	)
}

export const EcommerceDashboard: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
					gap: '1rem'
				}}
			>
				<StatCard
					value="892"
					label="New Orders"
					variant="success"
					icon="📦"
					change="+127 today"
					trend="up"
					footer={
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<span>Processing: 23</span>
							<span>Delivered: 745</span>
						</div>
					}
				/>
				<StatCard
					value="54,291"
					label="Sales Revenue"
					variant="primary"
					prefix="$"
					icon="💰"
					change="+18.7%"
					trend="up"
					description="Gross revenue"
					footer="Target: $60,000"
				/>
				<StatCard
					value="12,567"
					label="Total Customers"
					variant="info"
					icon="👥"
					change="+234"
					trend="up"
					description="Active accounts"
					footer="Retention: 94.2%"
				/>
				<StatCard
					value="4.8"
					label="Avg Rating"
					variant="success"
					suffix="/5"
					icon="⭐"
					description="Product reviews"
					footer="Based on 3,421 reviews"
				/>
			</div>
		</div>
	)
}

export const ServerMonitoring: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
					gap: '1rem'
				}}
			>
				<StatCard
					value="99.98"
					label="Uptime"
					variant="success"
					suffix="%"
					icon="✓"
					description="Last 30 days"
					footer="Target: 99.9%"
				/>
				<StatCard
					value="45"
					label="CPU Usage"
					suffix="%"
					icon="🔧"
					description="8 cores active"
					footer="Normal load"
				/>
				<StatCard
					value="72"
					label="Memory Usage"
					variant="warning"
					suffix="%"
					icon="💾"
					description="11.5 GB / 16 GB"
					footer="Consider scaling"
				/>
				<StatCard
					value="127"
					label="Avg Latency"
					suffix="ms"
					icon="⚡"
					change="-15ms"
					trend="down"
					description="Response time"
					footer="Optimal"
				/>
			</div>
		</div>
	)
}

export const SocialMediaMetrics: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
					gap: '1rem'
				}}
			>
				<StatCard
					value="24.5K"
					label="Followers"
					icon="👥"
					change="+1,247"
					trend="up"
					description="This week"
					footer="Engagement: 8.4%"
				/>
				<StatCard
					value="892"
					label="New Posts"
					icon="📝"
					change="+127"
					trend="up"
					description="Last 30 days"
					footer="Avg: 29 per day"
				/>
				<StatCard
					value="12.4K"
					label="Total Likes"
					variant="error"
					icon="❤️"
					change="+892"
					trend="up"
					description="Across all posts"
					footer="Avg: 14 per post"
				/>
				<StatCard
					value="3,421"
					label="Comments"
					icon="💬"
					change="+234"
					trend="up"
					description="This month"
					footer="Reply rate: 92%"
				/>
			</div>
		</div>
	)
}

export const InteractiveCards: Story = {
	render: () => {
		const [clicked, setClicked] = useState<string | null>(null)

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
						gap: '1rem'
					}}
				>
					<StatCard
						value="12,567"
						label="Total Users"
						icon="👥"
						change="+234"
						trend="up"
						onClick={() => setClicked('users')}
						bordered={clicked === 'users'}
					/>
					<StatCard
						value="892"
						label="New Orders"
						icon="📦"
						change="+127"
						trend="up"
						onClick={() => setClicked('orders')}
						bordered={clicked === 'orders'}
					/>
					<StatCard
						value="54,291"
						label="Revenue"
						prefix="$"
						icon="💰"
						change="+18.7%"
						trend="up"
						onClick={() => setClicked('revenue')}
						bordered={clicked === 'revenue'}
					/>
					<StatCard
						value="99.8"
						label="Uptime"
						suffix="%"
						icon="✓"
						onClick={() => setClicked('uptime')}
						bordered={clicked === 'uptime'}
					/>
				</div>
				{clicked && (
					<div
						style={{
							padding: '1rem',
							background: 'rgba(99, 102, 241, 0.1)',
							border: '1px solid rgba(99, 102, 241, 0.3)',
							borderRadius: '0.5rem',
							color: '#c7d2fe',
							textAlign: 'center'
						}}
					>
						You clicked: {clicked}
					</div>
				)}
			</div>
		)
	}
}

export const LoadingStates: Story = {
	render: () => (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
				gap: '1rem'
			}}
		>
			<StatCard value="0" label="Loading..." loading />
			<StatCard value="0" label="Loading..." loading description="Fetching data..." />
			<StatCard value="0" label="Loading..." loading size="sm" />
			<StatCard value="0" label="Loading..." loading size="lg" />
		</div>
	)
}

export const DifferentSizes: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
					gap: '1rem'
				}}
			>
				<StatCard
					value="12,567"
					label="Small Size"
					size="sm"
					icon="📊"
					change="+5.2%"
					trend="up"
				/>
				<StatCard
					value="12,567"
					label="Medium Size"
					size="md"
					icon="📊"
					change="+5.2%"
					trend="up"
				/>
				<StatCard
					value="12,567"
					label="Large Size"
					size="lg"
					icon="📊"
					change="+5.2%"
					trend="up"
				/>
			</div>
		</div>
	)
}

export const AllVariants: Story = {
	render: () => (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
				gap: '1rem'
			}}
		>
			<StatCard
				value="12,567"
				label="Default"
				icon="📊"
				change="+5.2%"
				trend="up"
			/>
			<StatCard
				value="12,567"
				label="Primary"
				variant="primary"
				icon="📊"
				change="+5.2%"
				trend="up"
			/>
			<StatCard
				value="12,567"
				label="Success"
				variant="success"
				icon="✓"
				change="+5.2%"
				trend="up"
			/>
			<StatCard
				value="12,567"
				label="Warning"
				variant="warning"
				icon="⚠️"
				change="+5.2%"
				trend="up"
			/>
			<StatCard
				value="12,567"
				label="Error"
				variant="error"
				icon="❌"
				change="+5.2%"
				trend="up"
			/>
			<StatCard
				value="12,567"
				label="Info"
				variant="info"
				icon="ℹ️"
				change="+5.2%"
				trend="up"
			/>
		</div>
	)
}
