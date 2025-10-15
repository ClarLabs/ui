import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { DataTable } from './index'

interface User {
	id: number
	name: string
	email: string
	role: string
	status: string
	age: number
}

const columns = [
	{ key: 'id', header: 'ID', width: '80px', editable: false },
	{ key: 'name', header: 'Name', editable: true },
	{ key: 'email', header: 'Email', type: 'email' as const, editable: true },
	{ key: 'role', header: 'Role', editable: true },
	{ key: 'status', header: 'Status', editable: true },
	{ key: 'age', header: 'Age', type: 'number' as const, width: '100px', editable: true }
]

const initialData: User[] = [
	{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', age: 32 },
	{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', age: 28 },
	{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive', age: 45 },
	{ id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Manager', status: 'Active', age: 38 },
	{ id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Active', age: 25 }
]

const meta = {
	title: 'Components/DataTable',
	component: DataTable,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs'],
	argTypes: {
		striped: {
			control: 'boolean',
			description: 'Enable striped rows'
		},
		hoverable: {
			control: 'boolean',
			description: 'Enable hover effect on rows'
		},
		bordered: {
			control: 'boolean',
			description: 'Add borders between columns'
		},
		compact: {
			control: 'boolean',
			description: 'Use compact padding'
		},
		editable: {
			control: 'boolean',
			description: 'Enable inline editing'
		},
		deletable: {
			control: 'boolean',
			description: 'Enable row deletion'
		},
		addable: {
			control: 'boolean',
			description: 'Enable adding new rows'
		}
	}
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		columns,
		data: initialData
	}
}

export const Striped: Story = {
	args: {
		columns,
		data: initialData,
		striped: true
	}
}

export const Hoverable: Story = {
	args: {
		columns,
		data: initialData,
		hoverable: true
	}
}

export const Bordered: Story = {
	args: {
		columns,
		data: initialData,
		bordered: true
	}
}

export const Compact: Story = {
	args: {
		columns,
		data: initialData,
		compact: true,
		striped: true
	}
}

export const WithInlineEditing: Story = {
	args: {
		columns,
		data: initialData,
		editable: true,
		hoverable: true,
		onRowEdit: (row, index) => {
			console.log('Row edited:', row, 'at index:', index)
		}
	}
}

export const WithDeletion: Story = {
	args: {
		columns,
		data: initialData,
		deletable: true,
		hoverable: true,
		onRowDelete: (row, index) => {
			console.log('Row deleted:', row, 'at index:', index)
		}
	}
}

export const WithAddition: Story = {
	args: {
		columns,
		data: initialData,
		addable: true,
		hoverable: true,
		onRowAdd: (row) => {
			console.log('Row added:', row)
		}
	}
}

export const FullCRUD: Story = {
	args: {
		columns,
		data: initialData,
		editable: true,
		deletable: true,
		addable: true,
		striped: true,
		hoverable: true,
		onRowEdit: (row, index) => {
			console.log('Row edited:', row, 'at index:', index)
		},
		onRowDelete: (row, index) => {
			console.log('Row deleted:', row, 'at index:', index)
		},
		onRowAdd: (row) => {
			console.log('Row added:', row)
		}
	}
}

export const AllFeatures: Story = {
	args: {
		columns,
		data: initialData,
		editable: true,
		deletable: true,
		addable: true,
		striped: true,
		hoverable: true,
		bordered: true
	}
}

export const CustomRender: Story = {
	args: {
		columns: [
			{ key: 'id', header: 'ID', width: '80px', editable: false },
			{ key: 'name', header: 'Name', editable: true },
			{ key: 'email', header: 'Email', type: 'email' as const, editable: true },
			{ key: 'role', header: 'Role', editable: true },
			{
				key: 'status',
				header: 'Status',
				editable: true,
				render: (value, row, isEditing) => {
					if (isEditing) {
						return null // Use default input
					}
					return (
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
			},
			{ key: 'age', header: 'Age', type: 'number' as const, width: '100px', editable: true }
		],
		data: initialData,
		editable: true,
		hoverable: true
	}
}

export const EmptyTable: Story = {
	args: {
		columns,
		data: [],
		addable: true
	}
}

export const Clickable: Story = {
	args: {
		columns,
		data: initialData,
		hoverable: true,
		onRowClick: (row) => {
			alert(`Clicked row: ${row.name}`)
		}
	}
}

// Interactive example with state management
export const InteractiveExample: Story = {
	render: () => {
		const [data, setData] = useState<User[]>(initialData)

		const handleRowEdit = (row: User, index: number) => {
			const newData = [...data]
			newData[index] = row
			setData(newData)
			console.log('Updated data:', newData)
		}

		const handleRowDelete = (row: User, index: number) => {
			const newData = data.filter((_, i) => i !== index)
			setData(newData)
			console.log('Data after deletion:', newData)
		}

		const handleRowAdd = (row: User) => {
			const newRow = { ...row, id: Math.max(...data.map((d) => d.id), 0) + 1 }
			const newData = [...data, newRow]
			setData(newData)
			console.log('Data after addition:', newData)
		}

		return (
			<div>
				<h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Interactive DataTable</h3>
				<p style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
					Try adding, editing, or deleting rows. Open the console to see the callback data.
				</p>
				<DataTable
					columns={columns}
					data={data}
					editable={true}
					deletable={true}
					addable={true}
					striped={true}
					hoverable={true}
					bordered={true}
					onRowEdit={handleRowEdit}
					onRowDelete={handleRowDelete}
					onRowAdd={handleRowAdd}
				/>
				<div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '0.5rem' }}>
					<strong>Current row count:</strong> {data.length}
				</div>
			</div>
		)
	}
}
