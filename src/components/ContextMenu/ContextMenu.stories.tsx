import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { ContextMenu, ContextMenuItem } from './index'

const meta = {
	title: 'Components/ContextMenu',
	component: ContextMenu,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs']
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

const basicItems: ContextMenuItem[] = [
	{ id: '1', label: 'Copy', shortcut: 'Ctrl+C', onClick: () => console.log('Copy') },
	{ id: '2', label: 'Cut', shortcut: 'Ctrl+X', onClick: () => console.log('Cut') },
	{ id: '3', label: 'Paste', shortcut: 'Ctrl+V', onClick: () => console.log('Paste'), separator: true },
	{ id: '4', label: 'Delete', danger: true, onClick: () => console.log('Delete') }
]

export const Default: Story = {
	render: () => (
		<ContextMenu items={basicItems}>
			<div
				style={{
					padding: '3rem',
					background: 'rgba(99, 102, 241, 0.1)',
					border: '2px dashed rgba(99, 102, 241, 0.5)',
					borderRadius: '0.5rem',
					textAlign: 'center',
					color: '#c7d2fe',
					fontWeight: 'bold',
					cursor: 'context-menu'
				}}
			>
				Right-click me!
			</div>
		</ContextMenu>
	)
}

export const WithIcons: Story = {
	render: () => {
		const items: ContextMenuItem[] = [
			{ id: '1', label: 'Open', icon: '📁', shortcut: 'Ctrl+O', onClick: () => console.log('Open') },
			{ id: '2', label: 'Save', icon: '💾', shortcut: 'Ctrl+S', onClick: () => console.log('Save') },
			{ id: '3', label: 'Print', icon: '🖨️', shortcut: 'Ctrl+P', onClick: () => console.log('Print'), separator: true },
			{ id: '4', label: 'Delete', icon: '🗑️', danger: true, onClick: () => console.log('Delete') }
		]

		return (
			<ContextMenu items={items}>
				<div
					style={{
						padding: '3rem',
						background: 'rgba(99, 102, 241, 0.1)',
						border: '2px dashed rgba(99, 102, 241, 0.5)',
						borderRadius: '0.5rem',
						textAlign: 'center',
						color: '#c7d2fe',
						fontWeight: 'bold',
						cursor: 'context-menu'
					}}
				>
					Right-click for menu with icons
				</div>
			</ContextMenu>
		)
	}
}

export const WithSubmenu: Story = {
	render: () => {
		const items: ContextMenuItem[] = [
			{ id: '1', label: 'New', icon: '✨', shortcut: 'Ctrl+N' },
			{
				id: '2',
				label: 'Open',
				icon: '📂',
				submenu: [
					{ id: '2-1', label: 'Open File', shortcut: 'Ctrl+O', onClick: () => console.log('Open File') },
					{ id: '2-2', label: 'Open Folder', shortcut: 'Ctrl+K', onClick: () => console.log('Open Folder') },
					{ id: '2-3', label: 'Open Recent', onClick: () => console.log('Open Recent') }
				]
			},
			{ id: '3', label: 'Save', icon: '💾', shortcut: 'Ctrl+S', separator: true },
			{
				id: '4',
				label: 'Export',
				icon: '📤',
				submenu: [
					{ id: '4-1', label: 'Export as PDF', onClick: () => console.log('PDF') },
					{ id: '4-2', label: 'Export as PNG', onClick: () => console.log('PNG') },
					{ id: '4-3', label: 'Export as SVG', onClick: () => console.log('SVG') }
				]
			}
		]

		return (
			<ContextMenu items={items}>
				<div
					style={{
						padding: '3rem',
						background: 'rgba(99, 102, 241, 0.1)',
						border: '2px dashed rgba(99, 102, 241, 0.5)',
						borderRadius: '0.5rem',
						textAlign: 'center',
						color: '#c7d2fe',
						fontWeight: 'bold',
						cursor: 'context-menu'
					}}
				>
					Right-click for submenu
				</div>
			</ContextMenu>
		)
	}
}

export const WithDisabled: Story = {
	render: () => {
		const items: ContextMenuItem[] = [
			{ id: '1', label: 'Copy', shortcut: 'Ctrl+C', onClick: () => console.log('Copy') },
			{ id: '2', label: 'Cut', shortcut: 'Ctrl+X', disabled: true },
			{ id: '3', label: 'Paste', shortcut: 'Ctrl+V', disabled: true, separator: true },
			{ id: '4', label: 'Select All', shortcut: 'Ctrl+A', onClick: () => console.log('Select All') }
		]

		return (
			<ContextMenu items={items}>
				<div
					style={{
						padding: '3rem',
						background: 'rgba(99, 102, 241, 0.1)',
						border: '2px dashed rgba(99, 102, 241, 0.5)',
						borderRadius: '0.5rem',
						textAlign: 'center',
						color: '#c7d2fe',
						fontWeight: 'bold',
						cursor: 'context-menu'
					}}
				>
					Right-click (some items disabled)
				</div>
			</ContextMenu>
		)
	}
}

export const FileManager: Story = {
	render: () => {
		const items: ContextMenuItem[] = [
			{ id: '1', label: 'Open', icon: '📂', onClick: () => console.log('Open') },
			{ id: '2', label: 'Open in new window', icon: '🪟', onClick: () => console.log('New window'), separator: true },
			{ id: '3', label: 'Cut', icon: '✂️', shortcut: 'Ctrl+X', onClick: () => console.log('Cut') },
			{ id: '4', label: 'Copy', icon: '📋', shortcut: 'Ctrl+C', onClick: () => console.log('Copy') },
			{ id: '5', label: 'Paste', icon: '📄', shortcut: 'Ctrl+V', onClick: () => console.log('Paste'), separator: true },
			{ id: '6', label: 'Rename', icon: '✏️', shortcut: 'F2', onClick: () => console.log('Rename') },
			{ id: '7', label: 'Delete', icon: '🗑️', danger: true, shortcut: 'Del', onClick: () => console.log('Delete'), separator: true },
			{ id: '8', label: 'Properties', icon: 'ℹ️', onClick: () => console.log('Properties') }
		]

		const files = ['Document.pdf', 'Image.png', 'Spreadsheet.xlsx', 'Presentation.pptx']

		return (
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(2, 1fr)',
					gap: '1rem',
					padding: '2rem',
					background: 'rgba(255, 255, 255, 0.05)',
					borderRadius: '0.75rem',
					border: '1px solid rgba(255, 255, 255, 0.2)'
				}}
			>
				{files.map((file, index) => (
					<ContextMenu key={index} items={items}>
						<div
							style={{
								padding: '1.5rem',
								background: 'rgba(255, 255, 255, 0.05)',
								border: '1px solid rgba(255, 255, 255, 0.2)',
								borderRadius: '0.5rem',
								textAlign: 'center',
								cursor: 'context-menu',
								transition: 'all 0.2s'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)'
								e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)'
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
								e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
							}}
						>
							<div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📄</div>
							<div style={{ color: '#e0e0e0', fontSize: '0.875rem' }}>{file}</div>
						</div>
					</ContextMenu>
				))}
			</div>
		)
	}
}

export const TextEditor: Story = {
	render: () => {
		const items: ContextMenuItem[] = [
			{ id: '1', label: 'Undo', icon: '↶', shortcut: 'Ctrl+Z', onClick: () => console.log('Undo') },
			{ id: '2', label: 'Redo', icon: '↷', shortcut: 'Ctrl+Y', onClick: () => console.log('Redo'), separator: true },
			{ id: '3', label: 'Cut', shortcut: 'Ctrl+X', onClick: () => console.log('Cut') },
			{ id: '4', label: 'Copy', shortcut: 'Ctrl+C', onClick: () => console.log('Copy') },
			{ id: '5', label: 'Paste', shortcut: 'Ctrl+V', onClick: () => console.log('Paste'), separator: true },
			{
				id: '6',
				label: 'Format',
				submenu: [
					{ id: '6-1', label: 'Bold', shortcut: 'Ctrl+B', onClick: () => console.log('Bold') },
					{ id: '6-2', label: 'Italic', shortcut: 'Ctrl+I', onClick: () => console.log('Italic') },
					{ id: '6-3', label: 'Underline', shortcut: 'Ctrl+U', onClick: () => console.log('Underline') }
				]
			},
			{ id: '7', label: 'Select All', shortcut: 'Ctrl+A', onClick: () => console.log('Select All') }
		]

		return (
			<ContextMenu items={items}>
				<textarea
					style={{
						width: '500px',
						height: '300px',
						padding: '1rem',
						background: 'rgba(255, 255, 255, 0.05)',
						border: '1px solid rgba(255, 255, 255, 0.2)',
						borderRadius: '0.5rem',
						color: '#e0e0e0',
						fontSize: '0.95rem',
						fontFamily: 'inherit',
						resize: 'vertical'
					}}
					placeholder="Right-click anywhere in this text area..."
					defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Right-click to see context menu options."
				/>
			</ContextMenu>
		)
	}
}

export const ImageGallery: Story = {
	render: () => {
		const imageMenuItems: ContextMenuItem[] = [
			{ id: '1', label: 'View', icon: '👁️', onClick: () => console.log('View') },
			{ id: '2', label: 'Edit', icon: '✏️', onClick: () => console.log('Edit'), separator: true },
			{ id: '3', label: 'Download', icon: '⬇️', onClick: () => console.log('Download') },
			{
				id: '4',
				label: 'Share',
				icon: '🔗',
				submenu: [
					{ id: '4-1', label: 'Copy Link', onClick: () => console.log('Copy link') },
					{ id: '4-2', label: 'Email', onClick: () => console.log('Email') },
					{ id: '4-3', label: 'Social Media', onClick: () => console.log('Social') }
				],
				separator: true
			},
			{ id: '5', label: 'Set as Cover', icon: '⭐', onClick: () => console.log('Set cover') },
			{ id: '6', label: 'Delete', icon: '🗑️', danger: true, onClick: () => console.log('Delete') }
		]

		const images = ['🖼️', '🎨', '📷', '🌄', '🌆', '🌇']

		return (
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 1fr)',
					gap: '1rem',
					padding: '2rem',
					background: 'rgba(255, 255, 255, 0.05)',
					borderRadius: '0.75rem',
					border: '1px solid rgba(255, 255, 255, 0.2)'
				}}
			>
				{images.map((emoji, index) => (
					<ContextMenu key={index} items={imageMenuItems}>
						<div
							style={{
								aspectRatio: '1',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								background: 'rgba(99, 102, 241, 0.1)',
								border: '2px solid rgba(99, 102, 241, 0.3)',
								borderRadius: '0.5rem',
								fontSize: '3rem',
								cursor: 'context-menu',
								transition: 'all 0.2s'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = 'scale(1.05)'
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = 'scale(1)'
							}}
						>
							{emoji}
						</div>
					</ContextMenu>
				))}
			</div>
		)
	}
}

export const TableRow: Story = {
	render: () => {
		const rowMenuItems: ContextMenuItem[] = [
			{ id: '1', label: 'Edit Row', icon: '✏️', onClick: () => console.log('Edit') },
			{ id: '2', label: 'Duplicate Row', icon: '📋', onClick: () => console.log('Duplicate'), separator: true },
			{
				id: '3',
				label: 'Insert',
				icon: '➕',
				submenu: [
					{ id: '3-1', label: 'Insert Above', onClick: () => console.log('Insert above') },
					{ id: '3-2', label: 'Insert Below', onClick: () => console.log('Insert below') }
				],
				separator: true
			},
			{ id: '4', label: 'Delete Row', icon: '🗑️', danger: true, onClick: () => console.log('Delete') }
		]

		const rows = [
			{ id: 1, name: 'John Doe', email: 'john@example.com' },
			{ id: 2, name: 'Jane Smith', email: 'jane@example.com' },
			{ id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
		]

		return (
			<div
				style={{
					background: 'rgba(255, 255, 255, 0.05)',
					border: '1px solid rgba(255, 255, 255, 0.2)',
					borderRadius: '0.75rem',
					overflow: 'hidden'
				}}
			>
				<table style={{ width: '100%', borderCollapse: 'collapse' }}>
					<thead>
						<tr style={{ background: 'rgba(99, 102, 241, 0.1)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
							<th style={{ padding: '1rem', textAlign: 'left', color: '#c7d2fe', fontWeight: 'bold' }}>Name</th>
							<th style={{ padding: '1rem', textAlign: 'left', color: '#c7d2fe', fontWeight: 'bold' }}>Email</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((row) => (
							<ContextMenu key={row.id} items={rowMenuItems}>
								<tr
									style={{
										borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
										cursor: 'context-menu',
										transition: 'background 0.2s'
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.background = 'rgba(99, 102, 241, 0.05)'
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.background = 'transparent'
									}}
								>
									<td style={{ padding: '1rem', color: '#e0e0e0' }}>{row.name}</td>
									<td style={{ padding: '1rem', color: '#9ca3af' }}>{row.email}</td>
								</tr>
							</ContextMenu>
						))}
					</tbody>
				</table>
			</div>
		)
	}
}
