import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Window } from './index'

const meta = {
	title: 'Components/Window',
	component: Window,
	parameters: {
		layout: 'fullscreen'
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg', 'xl', 'full']
		},
		variant: {
			control: 'select',
			options: ['default', 'dark', 'light']
		},
		closable: {
			control: 'boolean'
		},
		minimizable: {
			control: 'boolean'
		},
		maximizable: {
			control: 'boolean'
		},
		draggable: {
			control: 'boolean'
		},
		resizable: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof Window>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		title: 'Default Window',
		children: <p>This is a default window with standard controls.</p>
	}
}

export const Small: Story = {
	args: {
		title: 'Small Window',
		size: 'sm',
		children: <p>A small window for compact content.</p>
	}
}

export const Medium: Story = {
	args: {
		title: 'Medium Window',
		size: 'md',
		children: <p>A medium-sized window (default size).</p>
	}
}

export const Large: Story = {
	args: {
		title: 'Large Window',
		size: 'lg',
		children: <p>A large window for more content.</p>
	}
}

export const ExtraLarge: Story = {
	args: {
		title: 'Extra Large Window',
		size: 'xl',
		children: <p>An extra large window for extensive content.</p>
	}
}

export const DarkVariant: Story = {
	args: {
		title: 'Dark Window',
		variant: 'dark',
		children: <p>A window with dark styling.</p>
	}
}

export const LightVariant: Story = {
	args: {
		title: 'Light Window',
		variant: 'light',
		children: <p>A window with light styling.</p>
	}
}

export const WithToolbar: Story = {
	args: {
		title: 'Window with Toolbar',
		toolbar: (
			<div style={{ display: 'flex', gap: '0.5rem' }}>
				<button
					style={{
						padding: '0.25rem 0.75rem',
						background: 'rgba(99, 102, 241, 0.2)',
						border: '1px solid rgba(99, 102, 241, 0.5)',
						borderRadius: '0.25rem',
						color: '#c7d2fe',
						fontSize: '0.75rem',
						cursor: 'pointer'
					}}
				>
					Save
				</button>
				<button
					style={{
						padding: '0.25rem 0.75rem',
						background: 'rgba(255, 255, 255, 0.05)',
						border: '1px solid rgba(255, 255, 255, 0.2)',
						borderRadius: '0.25rem',
						color: '#e0e0e0',
						fontSize: '0.75rem',
						cursor: 'pointer'
					}}
				>
					Cancel
				</button>
			</div>
		),
		children: <p>This window has custom toolbar buttons.</p>
	}
}

export const WithFooter: Story = {
	args: {
		title: 'Window with Footer',
		footer: (
			<div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
				<button
					style={{
						padding: '0.5rem 1rem',
						background: 'rgba(255, 255, 255, 0.05)',
						border: '1px solid rgba(255, 255, 255, 0.2)',
						borderRadius: '0.375rem',
						color: '#e0e0e0',
						cursor: 'pointer'
					}}
				>
					Cancel
				</button>
				<button
					style={{
						padding: '0.5rem 1rem',
						background: 'rgba(99, 102, 241, 0.3)',
						border: '1px solid rgba(99, 102, 241, 0.5)',
						borderRadius: '0.375rem',
						color: '#c7d2fe',
						fontWeight: 'bold',
						cursor: 'pointer'
					}}
				>
					Confirm
				</button>
			</div>
		),
		children: <p>This window has a footer with action buttons.</p>
	}
}

export const NonClosable: Story = {
	args: {
		title: 'Non-Closable Window',
		closable: false,
		children: <p>This window cannot be closed.</p>
	}
}

export const WithAllControls: Story = {
	args: {
		title: 'All Controls',
		closable: true,
		minimizable: true,
		maximizable: true,
		children: <p>This window has minimize, maximize, and close controls.</p>
	}
}

export const NoControls: Story = {
	args: {
		title: 'No Controls',
		showControls: false,
		children: <p>This window has no control buttons.</p>
	}
}

export const NonDraggable: Story = {
	args: {
		title: 'Non-Draggable',
		draggable: false,
		children: <p>This window cannot be dragged.</p>
	}
}

export const Interactive: Story = {
	render: () => {
		const [isOpen, setIsOpen] = useState(true)

		return (
			<div style={{ padding: '2rem' }}>
				{!isOpen && (
					<button
						onClick={() => setIsOpen(true)}
						style={{
							padding: '0.75rem 1.5rem',
							background: 'rgba(99, 102, 241, 0.3)',
							border: '2px solid rgba(99, 102, 241, 0.5)',
							borderRadius: '0.5rem',
							color: '#c7d2fe',
							fontWeight: 'bold',
							cursor: 'pointer'
						}}
					>
						Open Window
					</button>
				)}

				<Window
					title="Interactive Window"
					open={isOpen}
					onClose={() => setIsOpen(false)}
					size="md"
					initialX={100}
					initialY={50}
				>
					<p style={{ marginBottom: '1rem' }}>
						This window can be closed and reopened. Try clicking the close button!
					</p>
					<button
						onClick={() => setIsOpen(false)}
						style={{
							padding: '0.5rem 1rem',
							background: 'rgba(239, 68, 68, 0.2)',
							border: '1px solid rgba(239, 68, 68, 0.5)',
							borderRadius: '0.375rem',
							color: '#fca5a5',
							cursor: 'pointer'
						}}
					>
						Close Window
					</button>
				</Window>
			</div>
		)
	}
}

export const TextEditor: Story = {
	render: () => {
		const [content, setContent] = useState('Type your content here...')

		return (
			<Window
				title="Text Editor"
				size="lg"
				initialX={50}
				initialY={50}
				toolbar={
					<div style={{ display: 'flex', gap: '0.5rem' }}>
						<button
							style={{
								padding: '0.25rem 0.5rem',
								background: 'rgba(255, 255, 255, 0.05)',
								border: '1px solid rgba(255, 255, 255, 0.2)',
								borderRadius: '0.25rem',
								color: '#e0e0e0',
								fontSize: '0.75rem',
								fontWeight: 'bold',
								cursor: 'pointer'
							}}
						>
							B
						</button>
						<button
							style={{
								padding: '0.25rem 0.5rem',
								background: 'rgba(255, 255, 255, 0.05)',
								border: '1px solid rgba(255, 255, 255, 0.2)',
								borderRadius: '0.25rem',
								color: '#e0e0e0',
								fontSize: '0.75rem',
								fontStyle: 'italic',
								cursor: 'pointer'
							}}
						>
							I
						</button>
						<button
							style={{
								padding: '0.25rem 0.5rem',
								background: 'rgba(255, 255, 255, 0.05)',
								border: '1px solid rgba(255, 255, 255, 0.2)',
								borderRadius: '0.25rem',
								color: '#e0e0e0',
								fontSize: '0.75rem',
								textDecoration: 'underline',
								cursor: 'pointer'
							}}
						>
							U
						</button>
					</div>
				}
				footer={
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
							{content.length} characters
						</span>
						<button
							style={{
								padding: '0.5rem 1rem',
								background: 'rgba(99, 102, 241, 0.3)',
								border: '1px solid rgba(99, 102, 241, 0.5)',
								borderRadius: '0.375rem',
								color: '#c7d2fe',
								fontWeight: 'bold',
								cursor: 'pointer'
							}}
						>
							Save
						</button>
					</div>
				}
			>
				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					style={{
						width: '100%',
						height: '100%',
						minHeight: '300px',
						padding: '1rem',
						background: 'rgba(0, 0, 0, 0.2)',
						border: '1px solid rgba(255, 255, 255, 0.1)',
						borderRadius: '0.375rem',
						color: '#e0e0e0',
						fontSize: '0.95rem',
						fontFamily: 'inherit',
						resize: 'none'
					}}
				/>
			</Window>
		)
	}
}

export const Settings: Story = {
	render: () => {
		return (
			<Window
				title="Settings"
				size="md"
				initialX={100}
				initialY={100}
			>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
					<div>
						<h3 style={{ color: '#c7d2fe', marginBottom: '1rem', fontSize: '1.125rem' }}>
							General Settings
						</h3>
						<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
							<label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e0e0e0' }}>
								<input type="checkbox" defaultChecked />
								Enable notifications
							</label>
							<label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e0e0e0' }}>
								<input type="checkbox" />
								Auto-save changes
							</label>
							<label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e0e0e0' }}>
								<input type="checkbox" defaultChecked />
								Show tooltips
							</label>
						</div>
					</div>

					<div>
						<h3 style={{ color: '#c7d2fe', marginBottom: '1rem', fontSize: '1.125rem' }}>
							Appearance
						</h3>
						<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
							<label style={{ color: '#e0e0e0', fontSize: '0.875rem' }}>Theme</label>
							<select
								style={{
									padding: '0.5rem',
									background: 'rgba(255, 255, 255, 0.05)',
									border: '1px solid rgba(255, 255, 255, 0.2)',
									borderRadius: '0.375rem',
									color: '#e0e0e0'
								}}
							>
								<option>Dark</option>
								<option>Light</option>
								<option>Auto</option>
							</select>
						</div>
					</div>
				</div>
			</Window>
		)
	}
}

export const FileManager: Story = {
	render: () => {
		const files = [
			{ name: 'Documents', type: 'folder', size: '-' },
			{ name: 'Images', type: 'folder', size: '-' },
			{ name: 'report.pdf', type: 'file', size: '2.4 MB' },
			{ name: 'presentation.pptx', type: 'file', size: '5.1 MB' },
			{ name: 'data.xlsx', type: 'file', size: '1.2 MB' }
		]

		return (
			<Window
				title="File Manager"
				size="lg"
				initialX={50}
				initialY={50}
				toolbar={
					<div style={{ display: 'flex', gap: '0.5rem' }}>
						<button
							style={{
								padding: '0.25rem 0.75rem',
								background: 'rgba(255, 255, 255, 0.05)',
								border: '1px solid rgba(255, 255, 255, 0.2)',
								borderRadius: '0.25rem',
								color: '#e0e0e0',
								fontSize: '0.75rem',
								cursor: 'pointer'
							}}
						>
							New
						</button>
						<button
							style={{
								padding: '0.25rem 0.75rem',
								background: 'rgba(255, 255, 255, 0.05)',
								border: '1px solid rgba(255, 255, 255, 0.2)',
								borderRadius: '0.25rem',
								color: '#e0e0e0',
								fontSize: '0.75rem',
								cursor: 'pointer'
							}}
						>
							Upload
						</button>
					</div>
				}
			>
				<table style={{ width: '100%', borderCollapse: 'collapse' }}>
					<thead>
						<tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
							<th style={{ padding: '0.75rem', textAlign: 'left', color: '#9ca3af', fontSize: '0.875rem' }}>
								Name
							</th>
							<th style={{ padding: '0.75rem', textAlign: 'left', color: '#9ca3af', fontSize: '0.875rem' }}>
								Type
							</th>
							<th style={{ padding: '0.75rem', textAlign: 'left', color: '#9ca3af', fontSize: '0.875rem' }}>
								Size
							</th>
						</tr>
					</thead>
					<tbody>
						{files.map((file, index) => (
							<tr
								key={index}
								style={{
									borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
									cursor: 'pointer'
								}}
							>
								<td style={{ padding: '0.75rem', color: '#e0e0e0' }}>
									{file.type === 'folder' ? '📁' : '📄'} {file.name}
								</td>
								<td style={{ padding: '0.75rem', color: '#9ca3af', fontSize: '0.875rem' }}>
									{file.type}
								</td>
								<td style={{ padding: '0.75rem', color: '#9ca3af', fontSize: '0.875rem' }}>
									{file.size}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</Window>
		)
	}
}

export const MultipleWindows: Story = {
	render: () => {
		return (
			<div style={{ position: 'relative', height: '100vh' }}>
				<Window
					title="Window 1"
					size="sm"
					initialX={50}
					initialY={50}
				>
					<p>First window</p>
				</Window>

				<Window
					title="Window 2"
					size="sm"
					initialX={300}
					initialY={100}
					variant="dark"
				>
					<p>Second window</p>
				</Window>

				<Window
					title="Window 3"
					size="sm"
					initialX={550}
					initialY={150}
					variant="light"
				>
					<p>Third window</p>
				</Window>
			</div>
		)
	}
}
