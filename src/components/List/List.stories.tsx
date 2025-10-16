import type { Meta, StoryObj } from '@storybook/react'
import { List } from './index'

const items = [
	{ id: '1', title: 'First item' },
	{ id: '2', title: 'Second item' },
	{ id: '3', title: 'Third item' },
	{ id: '4', title: 'Fourth item' }
]

const itemsWithIcons = [
	{ id: '1', title: 'Home', icon: '🏠' },
	{ id: '2', title: 'Profile', icon: '👤' },
	{ id: '3', title: 'Settings', icon: '⚙️' },
	{ id: '4', title: 'Logout', icon: '🚪' }
]

const itemsWithBadges = [
	{ id: '1', title: 'Inbox', badge: 5, badgeVariant: 'primary' },
	{ id: '2', title: 'Drafts', badge: 2, badgeVariant: 'warning' },
	{ id: '3', title: 'Sent' },
	{ id: '4', title: 'Trash', badge: 12, badgeVariant: 'error' }
]

const meta = {
	title: 'Components/List',
	component: List,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs'],
	argTypes: {
		hoverable: {
			control: 'boolean'
		},
		dividers: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof List>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		items
	}
}

export const Hoverable: Story = {
	args: {
		items,
		hoverable: true
	}
}

export const WithDividers: Story = {
	args: {
		items,
		dividers: true
	}
}

export const WithIcons: Story = {
	args: {
		items: itemsWithIcons,
		hoverable: true
	}
}

export const WithBadges: Story = {
	args: {
		items: itemsWithBadges,
		hoverable: true,
		dividers: true
	}
}

export const Clickable: Story = {
	args: {
		items: items.map((item) => ({
			...item,
			onClick: () => alert(`Clicked: ${item.title}`)
		})),
		hoverable: true
	}
}

export const WithDisabled: Story = {
	args: {
		items: [
			{ id: '1', title: 'Active item', icon: '✓' },
			{ id: '2', title: 'Disabled item', disabled: true, icon: '✕' },
			{ id: '3', title: 'Active item', icon: '✓' },
			{ id: '4', title: 'Disabled item', disabled: true, icon: '✕' }
		],
		hoverable: true
	}
}

export const WithSubtitles: Story = {
	args: {
		items: [
			{
				id: '1',
				title: 'John Doe',
				subtitle: 'john.doe@example.com',
				icon: '👤',
				badge: 3,
				badgeVariant: 'primary'
			},
			{
				id: '2',
				title: 'Jane Smith',
				subtitle: 'jane.smith@example.com',
				icon: '👤',
				badge: 1,
				badgeVariant: 'success'
			},
			{
				id: '3',
				title: 'Bob Johnson',
				subtitle: 'bob.johnson@example.com',
				icon: '👤'
			},
			{
				id: '4',
				title: 'Alice Williams',
				subtitle: 'alice.williams@example.com',
				icon: '👤',
				badge: 5,
				badgeVariant: 'warning'
			}
		],
		hoverable: true,
		dividers: true
	}
}

export const BadgeVariants: Story = {
	args: {
		items: [
			{ id: '1', title: 'Default Badge', badge: 10, badgeVariant: 'default', icon: '📌' },
			{ id: '2', title: 'Primary Badge', badge: 5, badgeVariant: 'primary', icon: '🔵' },
			{ id: '3', title: 'Success Badge', badge: 3, badgeVariant: 'success', icon: '✅' },
			{ id: '4', title: 'Warning Badge', badge: 7, badgeVariant: 'warning', icon: '⚠️' },
			{ id: '5', title: 'Error Badge', badge: 2, badgeVariant: 'error', icon: '❌' },
			{ id: '6', title: 'Info Badge', badge: 15, badgeVariant: 'info', icon: 'ℹ️' }
		],
		hoverable: true,
		dividers: true
	}
}

export const AllFeatures: Story = {
	args: {
		items: [
			{
				id: '1',
				title: 'Inbox',
				subtitle: 'New messages',
				icon: '📥',
				badge: 5,
				badgeVariant: 'primary',
				onClick: () => console.log('Inbox')
			},
			{
				id: '2',
				title: 'Starred',
				subtitle: 'Important items',
				icon: '⭐',
				badge: 2,
				badgeVariant: 'warning',
				onClick: () => console.log('Starred')
			},
			{
				id: '3',
				title: 'Sent',
				subtitle: 'Outgoing mail',
				icon: '📤',
				onClick: () => console.log('Sent')
			},
			{
				id: '4',
				title: 'Drafts',
				subtitle: 'Work in progress',
				icon: '📝',
				badge: 1,
				badgeVariant: 'info',
				onClick: () => console.log('Drafts')
			},
			{
				id: '5',
				title: 'Spam',
				subtitle: 'Junk mail',
				icon: '🚫',
				disabled: true
			},
			{
				id: '6',
				title: 'Trash',
				subtitle: 'Deleted items',
				icon: '🗑️',
				badge: 12,
				badgeVariant: 'error',
				onClick: () => console.log('Trash')
			}
		],
		hoverable: true,
		dividers: true
	}
}
