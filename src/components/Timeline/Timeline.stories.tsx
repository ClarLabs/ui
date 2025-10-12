import type { Meta, StoryObj } from '@storybook/react'
import { Timeline } from './index'

const timelineItems = [
	{
		id: '1',
		title: 'Project Started',
		description: 'Initial project kickoff and planning phase',
		date: '2024-01-15',
		color: 'primary' as const
	},
	{
		id: '2',
		title: 'Design Complete',
		description: 'All designs approved and ready for development',
		date: '2024-02-01',
		color: 'success' as const
	},
	{
		id: '3',
		title: 'Development Phase',
		description: 'Core features being implemented',
		date: '2024-03-01',
		color: 'info' as const
	},
	{
		id: '4',
		title: 'Testing',
		description: 'Quality assurance and bug fixes',
		date: '2024-04-01',
		color: 'warning' as const
	}
]

const meta = {
	title: 'Components/Timeline',
	component: Timeline,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs'],
	argTypes: {
		orientation: {
			control: 'select',
			options: ['vertical', 'horizontal']
		}
	}
} satisfies Meta<typeof Timeline>

export default meta
type Story = StoryObj<typeof meta>

export const Vertical: Story = {
	args: {
		items: timelineItems,
		orientation: 'vertical'
	}
}

export const Horizontal: Story = {
	args: {
		items: timelineItems,
		orientation: 'horizontal'
	}
}

export const WithIcons: Story = {
	args: {
		items: [
			{
				id: '1',
				title: 'Order Placed',
				description: 'Your order has been placed successfully',
				date: 'Mar 15, 2024',
				icon: '🛒',
				color: 'primary'
			},
			{
				id: '2',
				title: 'Processing',
				description: 'Your order is being prepared',
				date: 'Mar 16, 2024',
				icon: '📦',
				color: 'info'
			},
			{
				id: '3',
				title: 'Shipped',
				description: 'Your order is on the way',
				date: 'Mar 17, 2024',
				icon: '🚚',
				color: 'warning'
			},
			{
				id: '4',
				title: 'Delivered',
				description: 'Your order has been delivered',
				date: 'Mar 20, 2024',
				icon: '✓',
				color: 'success'
			}
		],
		orientation: 'vertical'
	}
}

export const ManyItems: Story = {
	args: {
		items: [
			{ id: '1', title: 'Q1 2024', description: 'Planning and design', date: 'Jan 2024', color: 'primary' },
			{ id: '2', title: 'Q2 2024', description: 'Development kickoff', date: 'Apr 2024', color: 'info' },
			{ id: '3', title: 'Q3 2024', description: 'Testing and refinement', date: 'Jul 2024', color: 'warning' },
			{ id: '4', title: 'Q4 2024', description: 'Launch preparation', date: 'Oct 2024', color: 'success' },
			{ id: '5', title: 'Q1 2025', description: 'Public release', date: 'Jan 2025', color: 'success' }
		],
		orientation: 'vertical'
	}
}

export const MinimalItems: Story = {
	args: {
		items: [
			{ id: '1', title: 'Started', date: '2024-01-01' },
			{ id: '2', title: 'In Progress', date: '2024-02-01' },
			{ id: '3', title: 'Completed', date: '2024-03-01', color: 'success' }
		],
		orientation: 'vertical'
	}
}
