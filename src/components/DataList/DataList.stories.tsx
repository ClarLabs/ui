import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { DataList } from './index'
import type { DataListItem } from './index'

const meta = {
	title: 'Components/DataList',
	component: DataList,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs'],
	argTypes: {
		orientation: {
			control: 'select',
			options: ['horizontal', 'vertical']
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg']
		},
		dividers: {
			control: 'boolean'
		},
		boldLabels: {
			control: 'boolean'
		},
		striped: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof DataList>

export default meta
type Story = StoryObj<typeof meta>

const basicItems: DataListItem[] = [
	{ id: '1', label: 'Name', value: 'John Doe' },
	{ id: '2', label: 'Email', value: 'john.doe@example.com' },
	{ id: '3', label: 'Phone', value: '+1 (555) 123-4567' },
	{ id: '4', label: 'Location', value: 'San Francisco, CA' }
]

export const Default: Story = {
	args: {
		items: basicItems
	}
}

export const Vertical: Story = {
	args: {
		items: basicItems,
		orientation: 'vertical'
	}
}

export const Small: Story = {
	args: {
		items: basicItems,
		size: 'sm'
	}
}

export const Large: Story = {
	args: {
		items: basicItems,
		size: 'lg'
	}
}

export const WithoutDividers: Story = {
	args: {
		items: basicItems,
		dividers: false
	}
}

export const Striped: Story = {
	args: {
		items: basicItems,
		striped: true
	}
}

export const WithIcons: Story = {
	args: {
		items: [
			{ id: '1', label: 'User', value: 'John Doe', icon: '👤' },
			{ id: '2', label: 'Email', value: 'john.doe@example.com', icon: '📧' },
			{ id: '3', label: 'Phone', value: '+1 (555) 123-4567', icon: '📞' },
			{ id: '4', label: 'Location', value: 'San Francisco, CA', icon: '📍' },
			{ id: '5', label: 'Birthday', value: 'January 15, 1990', icon: '🎂' }
		]
	}
}

export const WithHelpText: Story = {
	args: {
		items: [
			{
				id: '1',
				label: 'API Key',
				value: 'sk_live_abc123def456',
				helpText: 'Your secret API key for authentication'
			},
			{
				id: '2',
				label: 'Webhook URL',
				value: 'https://example.com/webhook',
				helpText: 'URL where webhook events will be sent'
			},
			{
				id: '3',
				label: 'Rate Limit',
				value: '1000 requests/hour',
				helpText: 'Maximum number of API requests per hour'
			}
		]
	}
}

export const WithHighlight: Story = {
	args: {
		items: [
			{ id: '1', label: 'Name', value: 'John Doe' },
			{ id: '2', label: 'Email', value: 'john.doe@example.com', highlight: true },
			{ id: '3', label: 'Phone', value: '+1 (555) 123-4567' },
			{ id: '4', label: 'Status', value: 'Active', highlight: true }
		]
	}
}

export const Copyable: Story = {
	render: () => {
		const [copied, setCopied] = useState<string | null>(null)

		const items: DataListItem[] = [
			{
				id: '1',
				label: 'API Key',
				value: 'sk_live_abc123def456ghi789',
				copyable: true,
				icon: '🔑'
			},
			{
				id: '2',
				label: 'Client ID',
				value: 'client_abc123def456',
				copyable: true,
				icon: '🆔'
			},
			{
				id: '3',
				label: 'Webhook Secret',
				value: 'whsec_xyz789abc123',
				copyable: true,
				icon: '🔒'
			},
			{
				id: '4',
				label: 'Public Key',
				value: 'pk_test_123456789',
				copyable: true,
				icon: '🔓'
			}
		]

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
				<DataList
					items={items}
					onCopy={(item) => {
						setCopied(item.id)
						setTimeout(() => setCopied(null), 2000)
					}}
				/>
				{copied && (
					<div
						style={{
							padding: '0.75rem 1rem',
							background: 'rgba(34, 197, 94, 0.2)',
							border: '1px solid rgba(34, 197, 94, 0.4)',
							borderRadius: '0.5rem',
							color: '#86efac',
							fontSize: '0.875rem',
							textAlign: 'center'
						}}
					>
						Copied to clipboard!
					</div>
				)}
			</div>
		)
	}
}

export const CustomLabelWidth: Story = {
	args: {
		items: basicItems,
		labelWidth: '200px'
	}
}

export const UserProfile: Story = {
	render: () => {
		const items: DataListItem[] = [
			{ id: '1', label: 'Full Name', value: 'John Michael Doe', icon: '👤' },
			{ id: '2', label: 'Username', value: '@johndoe', icon: '🏷️' },
			{ id: '3', label: 'Email', value: 'john.doe@example.com', icon: '📧', copyable: true },
			{ id: '4', label: 'Phone', value: '+1 (555) 123-4567', icon: '📞', copyable: true },
			{ id: '5', label: 'Role', value: 'Administrator', icon: '👑', highlight: true },
			{ id: '6', label: 'Department', value: 'Engineering', icon: '🏢' },
			{ id: '7', label: 'Location', value: 'San Francisco, CA', icon: '📍' },
			{ id: '8', label: 'Joined', value: 'January 15, 2020', icon: '📅' },
			{
				id: '9',
				label: 'Status',
				value: (
					<span style={{ color: '#86efac', fontWeight: 'bold' }}>● Active</span>
				),
				icon: '✓'
			}
		]

		return (
			<div style={{ maxWidth: '600px' }}>
				<DataList items={items} />
			</div>
		)
	}
}

export const SystemInfo: Story = {
	render: () => {
		const items: DataListItem[] = [
			{ id: '1', label: 'Operating System', value: 'Ubuntu 22.04 LTS', icon: '🖥️' },
			{ id: '2', label: 'Kernel Version', value: '5.15.0-76-generic', icon: '⚙️' },
			{ id: '3', label: 'CPU', value: 'Intel Core i7-9700K @ 3.60GHz', icon: '🔧' },
			{
				id: '4',
				label: 'Memory',
				value: (
					<div>
						<div>16 GB DDR4</div>
						<div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>
							8.2 GB used (51%)
						</div>
					</div>
				),
				icon: '💾'
			},
			{
				id: '5',
				label: 'Storage',
				value: (
					<div>
						<div>512 GB SSD</div>
						<div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>
							342 GB used (67%)
						</div>
					</div>
				),
				icon: '💿'
			},
			{ id: '6', label: 'GPU', value: 'NVIDIA GeForce RTX 3080', icon: '🎮' },
			{ id: '7', label: 'Uptime', value: '7 days, 14 hours, 23 minutes', icon: '⏱️' },
			{
				id: '8',
				label: 'IP Address',
				value: '192.168.1.100',
				icon: '🌐',
				copyable: true
			}
		]

		return (
			<div style={{ maxWidth: '700px' }}>
				<DataList items={items} size="lg" />
			</div>
		)
	}
}

export const ProductDetails: Story = {
	render: () => {
		const items: DataListItem[] = [
			{ id: '1', label: 'Product Name', value: 'Wireless Noise-Cancelling Headphones' },
			{ id: '2', label: 'SKU', value: 'WH-1000XM5-BLK', copyable: true },
			{ id: '3', label: 'Brand', value: 'AudioPro' },
			{
				id: '4',
				label: 'Price',
				value: (
					<span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#86efac' }}>
						$299.99
					</span>
				),
				highlight: true
			},
			{ id: '5', label: 'Category', value: 'Electronics > Audio > Headphones' },
			{
				id: '6',
				label: 'Availability',
				value: (
					<span style={{ color: '#86efac', fontWeight: 'bold' }}>● In Stock</span>
				)
			},
			{ id: '7', label: 'Stock Quantity', value: '247 units' },
			{ id: '8', label: 'Weight', value: '250g' },
			{ id: '9', label: 'Dimensions', value: '7.3 × 6.0 × 3.0 inches' },
			{ id: '10', label: 'Color', value: 'Matte Black' },
			{ id: '11', label: 'Warranty', value: '2 years manufacturer warranty' },
			{ id: '12', label: 'Last Updated', value: 'October 12, 2025 at 3:45 PM' }
		]

		return (
			<div style={{ maxWidth: '700px' }}>
				<DataList items={items} striped />
			</div>
		)
	}
}

export const ApiEndpoint: Story = {
	render: () => {
		const items: DataListItem[] = [
			{
				id: '1',
				label: 'Method',
				value: (
					<span
						style={{
							padding: '0.25rem 0.5rem',
							background: 'rgba(34, 197, 94, 0.2)',
							border: '1px solid rgba(34, 197, 94, 0.4)',
							borderRadius: '0.25rem',
							color: '#86efac',
							fontWeight: 'bold',
							fontSize: '0.75rem'
						}}
					>
						POST
					</span>
				)
			},
			{
				id: '2',
				label: 'Endpoint',
				value: '/api/v1/users',
				copyable: true,
				helpText: 'Base URL: https://api.example.com'
			},
			{
				id: '3',
				label: 'Authentication',
				value: 'Bearer Token',
				helpText: 'Include token in Authorization header'
			},
			{
				id: '4',
				label: 'Content-Type',
				value: 'application/json',
				copyable: true
			},
			{
				id: '5',
				label: 'Rate Limit',
				value: '100 requests per minute',
				helpText: 'Exceeding limit returns 429 status'
			},
			{
				id: '6',
				label: 'Response Format',
				value: 'JSON',
				helpText: 'Returns user object on success'
			},
			{
				id: '7',
				label: 'Status Codes',
				value: (
					<div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
						<div style={{ fontSize: '0.75rem' }}>
							<span style={{ color: '#86efac' }}>201</span> - Created
						</div>
						<div style={{ fontSize: '0.75rem' }}>
							<span style={{ color: '#fca5a5' }}>400</span> - Bad Request
						</div>
						<div style={{ fontSize: '0.75rem' }}>
							<span style={{ color: '#fca5a5' }}>401</span> - Unauthorized
						</div>
						<div style={{ fontSize: '0.75rem' }}>
							<span style={{ color: '#fca5a5' }}>429</span> - Rate Limit
						</div>
					</div>
				)
			}
		]

		return (
			<div style={{ maxWidth: '600px' }}>
				<DataList items={items} />
			</div>
		)
	}
}

export const ServerMetrics: Story = {
	render: () => {
		const items: DataListItem[] = [
			{
				id: '1',
				label: 'Server Status',
				value: (
					<span style={{ color: '#86efac', fontWeight: 'bold' }}>● Online</span>
				),
				icon: '🟢',
				highlight: true
			},
			{ id: '2', label: 'Uptime', value: '99.98%', icon: '⏱️' },
			{
				id: '3',
				label: 'CPU Usage',
				value: (
					<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
						<div style={{ flex: 1, height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
							<div style={{ width: '45%', height: '100%', background: '#86efac', borderRadius: '4px' }} />
						</div>
						<span>45%</span>
					</div>
				),
				icon: '🔧'
			},
			{
				id: '4',
				label: 'Memory Usage',
				value: (
					<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
						<div style={{ flex: 1, height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
							<div style={{ width: '72%', height: '100%', background: '#fbbf24', borderRadius: '4px' }} />
						</div>
						<span>72%</span>
					</div>
				),
				icon: '💾'
			},
			{ id: '5', label: 'Requests/sec', value: '1,247', icon: '📊' },
			{ id: '6', label: 'Avg Response Time', value: '127ms', icon: '⚡' },
			{ id: '7', label: 'Active Connections', value: '342', icon: '🔗' },
			{ id: '8', label: 'Last Restart', value: '7 days ago', icon: '🔄' }
		]

		return (
			<div style={{ maxWidth: '600px' }}>
				<DataList items={items} />
			</div>
		)
	}
}

export const VerticalWithIcons: Story = {
	render: () => {
		const items: DataListItem[] = [
			{ id: '1', label: 'Name', value: 'John Doe', icon: '👤' },
			{ id: '2', label: 'Email', value: 'john.doe@example.com', icon: '📧' },
			{ id: '3', label: 'Phone', value: '+1 (555) 123-4567', icon: '📞' },
			{ id: '4', label: 'Location', value: 'San Francisco, CA', icon: '📍' }
		]

		return (
			<div style={{ maxWidth: '400px' }}>
				<DataList items={items} orientation="vertical" />
			</div>
		)
	}
}

export const CompactList: Story = {
	render: () => {
		const items: DataListItem[] = [
			{ id: '1', label: 'ID', value: 'USR-12345' },
			{ id: '2', label: 'Created', value: '2025-10-12' },
			{ id: '3', label: 'Updated', value: '2025-10-12' },
			{ id: '4', label: 'Version', value: '2.1.0' },
			{ id: '5', label: 'Status', value: 'Active' }
		]

		return (
			<div style={{ maxWidth: '400px' }}>
				<DataList items={items} size="sm" boldLabels={false} />
			</div>
		)
	}
}
