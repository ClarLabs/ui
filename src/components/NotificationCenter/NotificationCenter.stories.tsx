import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { NotificationCenter, Notification } from './index'

const meta = {
	title: 'Components/NotificationCenter',
	component: NotificationCenter,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		maxHeight: {
			control: 'text'
		}
	},
	decorators: [
		(Story) => (
			<div>
				<div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
					<button onClick={() => document.body.classList.toggle('light-mode')}>Toggle Light/Dark Mode</button>
				</div>
				<Story />
			</div>
		)
	]
} satisfies Meta<typeof NotificationCenter>

export default meta
type Story = StoryObj<typeof meta>

const sampleNotifications: Notification[] = [
	{
		id: '1',
		type: 'info',
		title: 'System Update',
		message: 'A new system update is available.',
		timestamp: new Date(Date.now() - 1000 * 60 * 5),
		read: false
	},
	{
		id: '2',
		type: 'success',
		title: 'Upload Complete',
		message: 'Your files have been successfully uploaded.',
		timestamp: new Date(Date.now() - 1000 * 60 * 15),
		read: false
	},
	{
		id: '3',
		type: 'warning',
		title: 'Storage Almost Full',
		message: 'You have used 90% of your storage space.',
		timestamp: new Date(Date.now() - 1000 * 60 * 60),
		read: true
	},
	{
		id: '4',
		type: 'error',
		title: 'Connection Failed',
		message: 'Unable to connect to the server. Please try again.',
		timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
		read: true
	}
]

export const Default: Story = {
	args: {
		notifications: sampleNotifications,
		onNotificationClick: (id) => console.log('Notification clicked:', id),
		onNotificationDismiss: (id) => console.log('Notification dismissed:', id),
		onClearAll: () => console.log('Clear all clicked')
	}
}

export const Empty: Story = {
	args: {
		notifications: [],
		onClearAll: () => console.log('Clear all clicked')
	}
}

export const AllUnread: Story = {
	args: {
		notifications: sampleNotifications.map((n) => ({ ...n, read: false })),
		onNotificationClick: (id) => console.log('Notification clicked:', id),
		onNotificationDismiss: (id) => console.log('Notification dismissed:', id),
		onClearAll: () => console.log('Clear all clicked')
	}
}

export const ManyNotifications: Story = {
	args: {
		notifications: [
			...sampleNotifications,
			{
				id: '5',
				type: 'info',
				title: 'New Message',
				message: 'You have a new message from John.',
				timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
				read: false
			},
			{
				id: '6',
				type: 'success',
				title: 'Payment Received',
				message: 'Payment of $100 has been received.',
				timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
				read: true
			},
			{
				id: '7',
				type: 'info',
				title: 'Reminder',
				message: 'Meeting starts in 30 minutes.',
				timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
				read: true
			}
		],
		maxHeight: '300px',
		onNotificationClick: (id) => console.log('Notification clicked:', id),
		onNotificationDismiss: (id) => console.log('Notification dismissed:', id),
		onClearAll: () => console.log('Clear all clicked')
	}
}

export const Interactive: Story = {
	render: () => {
		const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications)

		const handleNotificationClick = (id: string) => {
			setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
		}

		const handleNotificationDismiss = (id: string) => {
			setNotifications((prev) => prev.filter((n) => n.id !== id))
		}

		const handleClearAll = () => {
			setNotifications([])
		}

		return (
			<NotificationCenter
				notifications={notifications}
				onNotificationClick={handleNotificationClick}
				onNotificationDismiss={handleNotificationDismiss}
				onClearAll={handleClearAll}
			/>
		)
	}
}
