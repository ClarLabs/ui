import type { Meta, StoryObj } from '@storybook/react'
import { Toolbar, type ToolbarMenuItem, type ToolbarStatus } from './index'

const meta = {
	title: 'Components/Toolbar',
	component: Toolbar,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs'],
	argTypes: {
		menuItems: {
			control: false
		},
		statusItems: {
			control: false
		}
	}
} satisfies Meta<typeof Toolbar>

export default meta
type Story = StoryObj<typeof meta>

const basicMenuItems: ToolbarMenuItem[] = [
	{
		id: 'file',
		label: 'File',
		submenu: [
			{
				id: 'new',
				label: 'New',
				icon: (
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
						<polyline points="14 2 14 8 20 8" />
					</svg>
				),
				onClick: () => console.log('New')
			},
			{
				id: 'open',
				label: 'Open',
				icon: (
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
						<polyline points="17 8 12 3 7 8" />
						<line x1="12" y1="3" x2="12" y2="15" />
					</svg>
				),
				onClick: () => console.log('Open')
			},
			{
				id: 'separator1',
				label: '',
				separator: true
			},
			{
				id: 'save',
				label: 'Save',
				icon: (
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
						<polyline points="17 21 17 13 7 13 7 21" />
						<polyline points="7 3 7 8 15 8" />
					</svg>
				),
				onClick: () => console.log('Save')
			}
		]
	},
	{
		id: 'edit',
		label: 'Edit',
		submenu: [
			{
				id: 'undo',
				label: 'Undo',
				onClick: () => console.log('Undo')
			},
			{
				id: 'redo',
				label: 'Redo',
				onClick: () => console.log('Redo')
			},
			{
				id: 'separator2',
				label: '',
				separator: true
			},
			{
				id: 'cut',
				label: 'Cut',
				onClick: () => console.log('Cut')
			},
			{
				id: 'copy',
				label: 'Copy',
				onClick: () => console.log('Copy')
			},
			{
				id: 'paste',
				label: 'Paste',
				onClick: () => console.log('Paste')
			}
		]
	},
	{
		id: 'view',
		label: 'View',
		submenu: [
			{
				id: 'zoom-in',
				label: 'Zoom In',
				onClick: () => console.log('Zoom In')
			},
			{
				id: 'zoom-out',
				label: 'Zoom Out',
				onClick: () => console.log('Zoom Out')
			},
			{
				id: 'reset-zoom',
				label: 'Reset Zoom',
				onClick: () => console.log('Reset Zoom')
			}
		]
	}
]

const statusItems: ToolbarStatus[] = [
	{
		text: 'Ready',
		icon: (
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
				<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
				<polyline points="22 4 12 14.01 9 11.01" />
			</svg>
		)
	},
	{
		text: 'Modified',
		tooltip: 'File has unsaved changes'
	}
]

export const Default: Story = {
	args: {
		menuItems: basicMenuItems
	}
}

export const WithStatus: Story = {
	args: {
		menuItems: basicMenuItems,
		statusItems
	}
}

export const WithIcons: Story = {
	args: {
		menuItems: [
			{
				id: 'file',
				label: 'File',
				icon: (
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
						<polyline points="14 2 14 8 20 8" />
					</svg>
				),
				submenu: [
					{ id: 'new', label: 'New', onClick: () => console.log('New') },
					{ id: 'open', label: 'Open', onClick: () => console.log('Open') }
				]
			},
			{
				id: 'edit',
				label: 'Edit',
				icon: (
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
						<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
					</svg>
				),
				submenu: [
					{ id: 'undo', label: 'Undo', onClick: () => console.log('Undo') },
					{ id: 'redo', label: 'Redo', onClick: () => console.log('Redo') }
				]
			},
			{
				id: 'separator',
				label: '',
				separator: true
			},
			{
				id: 'save',
				label: 'Save',
				icon: (
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
						<polyline points="17 21 17 13 7 13 7 21" />
						<polyline points="7 3 7 8 15 8" />
					</svg>
				),
				onClick: () => console.log('Save')
			}
		],
		statusItems: [
			{
				text: 'Document saved',
				icon: (
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
						<polyline points="17 21 17 13 7 13 7 21" />
						<polyline points="7 3 7 8 15 8" />
					</svg>
				)
			}
		]
	}
}

export const WithBadges: Story = {
	args: {
		menuItems: [
			{
				id: 'notifications',
				label: 'Notifications',
				icon: (
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
						<path d="M13.73 21a2 2 0 0 1-3.46 0" />
					</svg>
				),
				badge: 5,
				submenu: [
					{ id: 'notification1', label: 'New message', onClick: () => console.log('Notification 1') },
					{ id: 'notification2', label: 'New comment', onClick: () => console.log('Notification 2') }
				]
			},
			{
				id: 'messages',
				label: 'Messages',
				badge: 12,
				submenu: [
					{ id: 'message1', label: 'Message 1', onClick: () => console.log('Message 1') },
					{ id: 'message2', label: 'Message 2', onClick: () => console.log('Message 2') }
				]
			},
			{
				id: 'separator',
				label: '',
				separator: true
			},
			{
				id: 'settings',
				label: 'Settings',
				icon: (
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<circle cx="12" cy="12" r="3" />
						<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
					</svg>
				),
				onClick: () => console.log('Settings')
			}
		],
		statusItems: [
			{
				text: '5 items selected',
				icon: (
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<polyline points="9 11 12 14 22 4" />
						<path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
					</svg>
				)
			}
		]
	}
}

export const WithCustomContent: Story = {
	args: {
		menuItems: [
			{
				id: 'file',
				label: 'File',
				submenu: [
					{ id: 'new', label: 'New', onClick: () => console.log('New') },
					{ id: 'open', label: 'Open', onClick: () => console.log('Open') }
				]
			}
		],
		children: (
			<div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
				<button
					style={{
						padding: '0.5rem 1rem',
						background: 'rgba(99, 102, 241, 0.2)',
						border: '1px solid rgba(99, 102, 241, 0.3)',
						borderRadius: '0.375rem',
						color: '#c7d2fe',
						cursor: 'pointer',
						fontSize: '0.875rem'
					}}
					onClick={() => console.log('Custom action')}
				>
					Custom Button
				</button>
			</div>
		),
		statusItems: [
			{
				text: 'Custom content area',
				tooltip: 'You can add any custom content here'
			}
		]
	}
}

export const StatusOnly: Story = {
	args: {
		statusItems: [
			{
				text: 'Connected',
				icon: (
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<circle cx="12" cy="12" r="10" />
						<path d="M12 16v-4" />
						<path d="M12 8h.01" />
					</svg>
				)
			},
			{
				text: 'Last saved: 2 minutes ago',
				icon: (
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<circle cx="12" cy="12" r="10" />
						<polyline points="12 6 12 12 16 14" />
					</svg>
				)
			},
			{
				text: 'User: john.doe',
				icon: (
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
						<circle cx="12" cy="7" r="4" />
					</svg>
				)
			}
		]
	}
}

export const WithDisabledItems: Story = {
	args: {
		menuItems: [
			{
				id: 'file',
				label: 'File',
				submenu: [
					{ id: 'new', label: 'New', onClick: () => console.log('New') },
					{ id: 'open', label: 'Open', onClick: () => console.log('Open') },
					{ id: 'save', label: 'Save', disabled: true, onClick: () => console.log('Save') },
					{ id: 'save-as', label: 'Save As', disabled: true, onClick: () => console.log('Save As') }
				]
			},
			{
				id: 'edit',
				label: 'Edit',
				disabled: true,
				submenu: [
					{ id: 'cut', label: 'Cut', onClick: () => console.log('Cut') },
					{ id: 'copy', label: 'Copy', onClick: () => console.log('Copy') }
				]
			},
			{
				id: 'separator',
				label: '',
				separator: true
			},
			{
				id: 'action',
				label: 'Action',
				disabled: true,
				onClick: () => console.log('Action')
			}
		]
	}
}

