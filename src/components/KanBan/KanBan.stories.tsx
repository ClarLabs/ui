import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { KanBan } from './index'

const meta = {
	title: 'Components/KanBan',
	component: KanBan,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs'],
	argTypes: {
		allowAddColumns: {
			control: 'boolean'
		},
		allowRemoveColumns: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof KanBan>

export default meta
type Story = StoryObj<typeof meta>

const defaultColumns = [
	{
		id: 'todo',
		title: 'To Do',
		color: '#ef4444',
		items: [
			{
				id: '1',
				title: 'Design new landing page',
				description: 'Create mockups and wireframes for the new landing page',
				badge: 'High',
				badgeVariant: 'error' as const
			},
			{
				id: '2',
				title: 'Update documentation',
				description: 'Add examples for the new API endpoints',
				badge: 'Medium',
				badgeVariant: 'warning' as const
			},
			{
				id: '3',
				title: 'Setup CI/CD pipeline',
				description: 'Configure automated testing and deployment',
				badge: 'Low',
				badgeVariant: 'info' as const
			}
		]
	},
	{
		id: 'in-progress',
		title: 'In Progress',
		color: '#f59e0b',
		items: [
			{
				id: '4',
				title: 'Implement authentication',
				description: 'Add JWT-based authentication to the API',
				badge: '50%',
				badgeVariant: 'warning' as const
			},
			{
				id: '5',
				title: 'Refactor database queries',
				description: 'Optimize slow queries in the user service',
				badge: '75%',
				badgeVariant: 'primary' as const
			}
		]
	},
	{
		id: 'review',
		title: 'Review',
		color: '#3b82f6',
		items: [
			{
				id: '6',
				title: 'Code review: Payment module',
				description: 'Review pull request #123 for the new payment integration',
				badge: 'PR #123',
				badgeVariant: 'info' as const
			}
		]
	},
	{
		id: 'done',
		title: 'Done',
		color: '#10b981',
		items: [
			{
				id: '7',
				title: 'Fix login bug',
				description: 'Resolved issue with session timeout',
				badge: 'Completed',
				badgeVariant: 'success' as const
			},
			{
				id: '8',
				title: 'Add unit tests',
				description: 'Increased test coverage to 85%',
				badge: 'Completed',
				badgeVariant: 'success' as const
			}
		]
	}
]

export const Default: Story = {
	args: {
		columns: defaultColumns,
		onItemMove: (item, fromColumn, toColumn) => {
			console.log(`Moved "${item.title}" from ${fromColumn} to ${toColumn}`)
		},
		onItemClick: (item, columnId) => {
			console.log(`Clicked "${item.title}" in ${columnId}`)
		}
	}
}

export const WithAddColumns: Story = {
	args: {
		columns: defaultColumns,
		allowAddColumns: true,
		onItemMove: (item, fromColumn, toColumn) => {
			console.log(`Moved "${item.title}" from ${fromColumn} to ${toColumn}`)
		},
		onColumnAdd: (columnId, columnTitle) => {
			console.log(`Added column "${columnTitle}" with id ${columnId}`)
		}
	}
}

export const WithRemoveColumns: Story = {
	args: {
		columns: defaultColumns,
		allowRemoveColumns: true,
		onItemMove: (item, fromColumn, toColumn) => {
			console.log(`Moved "${item.title}" from ${fromColumn} to ${toColumn}`)
		},
		onColumnRemove: (columnId) => {
			console.log(`Removed column with id ${columnId}`)
		}
	}
}

export const FullFeatures: Story = {
	args: {
		columns: defaultColumns,
		allowAddColumns: true,
		allowRemoveColumns: true,
		onItemMove: (item, fromColumn, toColumn) => {
			console.log(`Moved "${item.title}" from ${fromColumn} to ${toColumn}`)
		},
		onItemClick: (item, columnId) => {
			console.log(`Clicked "${item.title}" in ${columnId}`)
		},
		onColumnAdd: (columnId, columnTitle) => {
			console.log(`Added column "${columnTitle}" with id ${columnId}`)
		},
		onColumnRemove: (columnId) => {
			console.log(`Removed column with id ${columnId}`)
		}
	}
}

export const EmptyBoard: Story = {
	args: {
		columns: [
			{
				id: 'backlog',
				title: 'Backlog',
				color: '#6b7280',
				items: []
			},
			{
				id: 'todo',
				title: 'To Do',
				color: '#ef4444',
				items: []
			},
			{
				id: 'in-progress',
				title: 'In Progress',
				color: '#f59e0b',
				items: []
			},
			{
				id: 'done',
				title: 'Done',
				color: '#10b981',
				items: []
			}
		],
		allowAddColumns: true,
		onItemMove: (item, fromColumn, toColumn) => {
			console.log(`Moved "${item.title}" from ${fromColumn} to ${toColumn}`)
		}
	}
}

export const WithMaxItems: Story = {
	args: {
		columns: [
			{
				id: 'wip',
				title: 'Work In Progress (Max 2)',
				color: '#f59e0b',
				maxItems: 2,
				items: [
					{
						id: '1',
						title: 'Task 1',
						description: 'First task in progress',
						badge: 'Active',
						badgeVariant: 'warning' as const
					},
					{
						id: '2',
						title: 'Task 2',
						description: 'Second task in progress',
						badge: 'Active',
						badgeVariant: 'warning' as const
					}
				]
			},
			{
				id: 'backlog',
				title: 'Backlog',
				color: '#6b7280',
				items: [
					{
						id: '3',
						title: 'Task 3',
						description: 'Try to drag this to WIP - it will be blocked when limit is reached'
					}
				]
			}
		],
		onItemMove: (item, fromColumn, toColumn) => {
			console.log(`Moved "${item.title}" from ${fromColumn} to ${toColumn}`)
		}
	}
}

export const SimpleBoard: Story = {
	args: {
		columns: [
			{
				id: 'todo',
				title: 'To Do',
				color: '#ef4444',
				items: [
					{
						id: '1',
						title: 'Write documentation'
					},
					{
						id: '2',
						title: 'Fix bugs'
					}
				]
			},
			{
				id: 'done',
				title: 'Done',
				color: '#10b981',
				items: [
					{
						id: '3',
						title: 'Setup project'
					}
				]
			}
		],
		onItemMove: (item, fromColumn, toColumn) => {
			console.log(`Moved "${item.title}" from ${fromColumn} to ${toColumn}`)
		}
	}
}
