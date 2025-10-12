import type { Meta, StoryObj } from '@storybook/react'
import { Table } from './index'

const columns = [
	{ key: 'name', header: 'Name' },
	{ key: 'email', header: 'Email' },
	{ key: 'role', header: 'Role' },
	{ key: 'status', header: 'Status' }
]

const data = [
	{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
	{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
	{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
	{ id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Manager', status: 'Active' },
	{ id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Active' }
]

const meta = {
	title: 'Components/Table',
	component: Table,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs'],
	argTypes: {
		striped: {
			control: 'boolean'
		},
		hoverable: {
			control: 'boolean'
		},
		bordered: {
			control: 'boolean'
		},
		compact: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		columns,
		data
	}
}

export const Striped: Story = {
	args: {
		columns,
		data,
		striped: true
	}
}

export const Hoverable: Story = {
	args: {
		columns,
		data,
		hoverable: true
	}
}

export const Bordered: Story = {
	args: {
		columns,
		data,
		bordered: true
	}
}

export const Compact: Story = {
	args: {
		columns,
		data,
		compact: true
	}
}

export const Clickable: Story = {
	args: {
		columns,
		data,
		hoverable: true,
		onRowClick: (row) => alert(`Clicked row: ${row.name}`)
	}
}

export const AllFeatures: Story = {
	args: {
		columns,
		data,
		striped: true,
		hoverable: true,
		bordered: true
	}
}

export const CustomRender: Story = {
	args: {
		columns: [
			{ key: 'name', header: 'Name' },
			{ key: 'email', header: 'Email' },
			{ key: 'role', header: 'Role' },
			{
				key: 'status',
				header: 'Status',
				render: (value) => (
					<span
						style={{
							padding: '0.25rem 0.75rem',
							borderRadius: '9999px',
							fontSize: '0.75rem',
							background: value === 'Active' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
							color: value === 'Active' ? '#4ade80' : '#f87171'
						}}
					>
						{value}
					</span>
				)
			}
		],
		data,
		hoverable: true
	}
}

export const EmptyTable: Story = {
	args: {
		columns,
		data: []
	}
}
