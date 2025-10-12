import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './index'

const meta: Meta<typeof Modal> = {
	title: 'Components/Modal',
	component: Modal,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		isOpen: {
			control: 'boolean',
			description: 'Controls whether the modal is visible'
		},
		onClose: {
			action: 'closed',
			description: 'Callback function when modal is closed'
		},
		title: {
			control: 'text',
			description: 'Title displayed in the modal header'
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg', 'xl'],
			description: 'Size of the modal'
		},
		closeOnOverlayClick: {
			control: 'boolean',
			description: 'Whether clicking the overlay closes the modal'
		},
		showCloseButton: {
			control: 'boolean',
			description: 'Whether to show the close button'
		}
	}
}

export default meta
type Story = StoryObj<typeof Modal>

// Wrapper component to handle modal state
const ModalWrapper = ({
	children,
	footer,
	size = 'md',
	closeOnOverlayClick = true,
	showCloseButton = true,
	title
}: {
	children: React.ReactNode
	footer?: React.ReactNode
	size?: 'sm' | 'md' | 'lg' | 'xl'
	closeOnOverlayClick?: boolean
	showCloseButton?: boolean
	title?: string
}) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div>
			<button
				onClick={() => setIsOpen(true)}
				style={{
					padding: '10px 20px',
					backgroundColor: '#007bff',
					color: 'white',
					border: 'none',
					borderRadius: '4px',
					cursor: 'pointer',
					fontSize: '14px'
				}}
			>
				Open Modal
			</button>
			<Modal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title={title}
				footer={footer}
				size={size}
				closeOnOverlayClick={closeOnOverlayClick}
				showCloseButton={showCloseButton}
			>
				{children}
			</Modal>
		</div>
	)
}

// Basic modal with default settings
export const Default: Story = {
	render: () => (
		<ModalWrapper title="Default Modal">
			<p>This is a basic modal with default settings (medium size).</p>
			<p>You can close it by:</p>
			<ul>
				<li>Clicking the X button</li>
				<li>Clicking the overlay</li>
				<li>Pressing the Escape key</li>
			</ul>
		</ModalWrapper>
	)
}

// Small modal
export const SmallSize: Story = {
	render: () => (
		<ModalWrapper title="Small Modal" size="sm">
			<p>This is a small modal. Perfect for simple confirmations or alerts.</p>
		</ModalWrapper>
	)
}

// Medium modal (default)
export const MediumSize: Story = {
	render: () => (
		<ModalWrapper title="Medium Modal" size="md">
			<p>This is a medium-sized modal. This is the default size.</p>
			<p>It works well for most standard use cases like forms or content display.</p>
		</ModalWrapper>
	)
}

// Large modal
export const LargeSize: Story = {
	render: () => (
		<ModalWrapper title="Large Modal" size="lg">
			<p>This is a large modal. Great for displaying more content.</p>
			<p>Use this size when you need more space for detailed information or complex forms.</p>
			<div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
				<h4>Additional Content</h4>
				<p>You can fit more content comfortably in a large modal.</p>
			</div>
		</ModalWrapper>
	)
}

// Extra large modal
export const ExtraLargeSize: Story = {
	render: () => (
		<ModalWrapper title="Extra Large Modal" size="xl">
			<p>This is an extra large modal. Ideal for complex layouts or data-rich interfaces.</p>
			<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
				<div style={{ padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
					<h4>Section 1</h4>
					<p>Content for the first section goes here.</p>
				</div>
				<div style={{ padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
					<h4>Section 2</h4>
					<p>Content for the second section goes here.</p>
				</div>
			</div>
		</ModalWrapper>
	)
}

// Modal with footer
export const WithFooter: Story = {
	render: () => (
		<ModalWrapper
			title="Modal with Footer"
			footer={
				<div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
					<button
						style={{
							padding: '8px 16px',
							backgroundColor: '#6c757d',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer'
						}}
					>
						Cancel
					</button>
					<button
						style={{
							padding: '8px 16px',
							backgroundColor: '#007bff',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer'
						}}
					>
						Confirm
					</button>
				</div>
			}
		>
			<p>This modal includes a footer with action buttons.</p>
			<p>Footers are useful for confirmation dialogs or forms that need submit/cancel actions.</p>
		</ModalWrapper>
	)
}

// Modal without footer
export const WithoutFooter: Story = {
	render: () => (
		<ModalWrapper title="Modal without Footer">
			<p>This modal has no footer section.</p>
			<p>Use this when you don't need action buttons or additional controls at the bottom.</p>
		</ModalWrapper>
	)
}

// Modal without close button
export const NoCloseButton: Story = {
	render: () => (
		<ModalWrapper
			title="No Close Button"
			showCloseButton={false}
			footer={
				<div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
					<button
						style={{
							padding: '8px 16px',
							backgroundColor: '#007bff',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer'
						}}
					>
						Close
					</button>
				</div>
			}
		>
			<p>This modal has no X close button in the header.</p>
			<p>You can still close it by clicking the overlay or pressing Escape.</p>
			<p>Use this when you want users to explicitly use a footer button to close.</p>
		</ModalWrapper>
	)
}

// Modal that doesn't close on overlay click
export const NoOverlayClose: Story = {
	render: () => (
		<ModalWrapper
			title="Overlay Click Disabled"
			closeOnOverlayClick={false}
			footer={
				<div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
					<button
						style={{
							padding: '8px 16px',
							backgroundColor: '#007bff',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer'
						}}
					>
						Close
					</button>
				</div>
			}
		>
			<p>This modal will not close when you click the overlay.</p>
			<p>You can only close it using:</p>
			<ul>
				<li>The X close button</li>
				<li>The footer button</li>
				<li>The Escape key</li>
			</ul>
			<p>Use this for important dialogs where accidental dismissal should be prevented.</p>
		</ModalWrapper>
	)
}

// Modal without title
export const NoTitle: Story = {
	render: () => (
		<ModalWrapper>
			<div style={{ textAlign: 'center', padding: '20px' }}>
				<h3 style={{ margin: '0 0 15px 0' }}>Custom Header</h3>
				<p>This modal has no title prop, so you can create your own custom header layout.</p>
				<p>The close button still appears in the header area.</p>
			</div>
		</ModalWrapper>
	)
}

// Form example
export const FormExample: Story = {
	render: () => (
		<ModalWrapper
			title="Contact Form"
			size="md"
			footer={
				<div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
					<button
						style={{
							padding: '8px 16px',
							backgroundColor: '#6c757d',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer'
						}}
					>
						Cancel
					</button>
					<button
						style={{
							padding: '8px 16px',
							backgroundColor: '#28a745',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer'
						}}
					>
						Submit
					</button>
				</div>
			}
		>
			<form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
				<div>
					<label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name</label>
					<input
						type="text"
						placeholder="Enter your name"
						style={{
							width: '100%',
							padding: '8px',
							border: '1px solid #ccc',
							borderRadius: '4px',
							fontSize: '14px'
						}}
					/>
				</div>
				<div>
					<label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
					<input
						type="email"
						placeholder="Enter your email"
						style={{
							width: '100%',
							padding: '8px',
							border: '1px solid #ccc',
							borderRadius: '4px',
							fontSize: '14px'
						}}
					/>
				</div>
				<div>
					<label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Message</label>
					<textarea
						placeholder="Enter your message"
						rows={4}
						style={{
							width: '100%',
							padding: '8px',
							border: '1px solid #ccc',
							borderRadius: '4px',
							fontSize: '14px',
							resize: 'vertical'
						}}
					/>
				</div>
			</form>
		</ModalWrapper>
	)
}

// Confirmation dialog
export const ConfirmationDialog: Story = {
	render: () => (
		<ModalWrapper
			title="Delete Item"
			size="sm"
			closeOnOverlayClick={false}
			footer={
				<div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
					<button
						style={{
							padding: '8px 16px',
							backgroundColor: '#6c757d',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer'
						}}
					>
						Cancel
					</button>
					<button
						style={{
							padding: '8px 16px',
							backgroundColor: '#dc3545',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer'
						}}
					>
						Delete
					</button>
				</div>
			}
		>
			<p>Are you sure you want to delete this item?</p>
			<p style={{ color: '#dc3545', fontWeight: 'bold' }}>This action cannot be undone.</p>
		</ModalWrapper>
	)
}

// Long content with scrolling
export const LongContent: Story = {
	render: () => (
		<ModalWrapper
			title="Terms and Conditions"
			size="lg"
			footer={
				<div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
					<button
						style={{
							padding: '8px 16px',
							backgroundColor: '#007bff',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer'
						}}
					>
						Accept
					</button>
				</div>
			}
		>
			<div>
				<p>This modal demonstrates scrollable content when the content is longer than the viewport.</p>
				{Array.from({ length: 10 }, (_, i) => (
					<div key={i} style={{ marginBottom: '20px' }}>
						<h4>Section {i + 1}</h4>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
							ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</p>
					</div>
				))}
			</div>
		</ModalWrapper>
	)
}

// Interactive example with multiple controls
export const InteractiveExample: Story = {
	render: () => {
		const InteractiveModal = () => {
			const [isOpen, setIsOpen] = useState(false)
			const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md')
			const [showFooter, setShowFooter] = useState(true)
			const [closeOnOverlay, setCloseOnOverlay] = useState(true)
			const [showClose, setShowClose] = useState(true)

			return (
				<div>
					<div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
						<div>
							<label style={{ marginRight: '10px' }}>Size:</label>
							<select value={size} onChange={(e) => setSize(e.target.value as 'sm' | 'md' | 'lg' | 'xl')} style={{ padding: '5px' }}>
								<option value="sm">Small</option>
								<option value="md">Medium</option>
								<option value="lg">Large</option>
								<option value="xl">Extra Large</option>
							</select>
						</div>
						<div>
							<label>
								<input type="checkbox" checked={showFooter} onChange={(e) => setShowFooter(e.target.checked)} style={{ marginRight: '5px' }} />
								Show Footer
							</label>
						</div>
						<div>
							<label>
								<input
									type="checkbox"
									checked={closeOnOverlay}
									onChange={(e) => setCloseOnOverlay(e.target.checked)}
									style={{ marginRight: '5px' }}
								/>
								Close on Overlay Click
							</label>
						</div>
						<div>
							<label>
								<input type="checkbox" checked={showClose} onChange={(e) => setShowClose(e.target.checked)} style={{ marginRight: '5px' }} />
								Show Close Button
							</label>
						</div>
					</div>
					<button
						onClick={() => setIsOpen(true)}
						style={{
							padding: '10px 20px',
							backgroundColor: '#007bff',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer',
							fontSize: '14px'
						}}
					>
						Open Modal
					</button>
					<Modal
						isOpen={isOpen}
						onClose={() => setIsOpen(false)}
						title="Interactive Modal"
						size={size}
						closeOnOverlayClick={closeOnOverlay}
						showCloseButton={showClose}
						footer={
							showFooter ? (
								<div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
									<button
										onClick={() => setIsOpen(false)}
										style={{
											padding: '8px 16px',
											backgroundColor: '#6c757d',
											color: 'white',
											border: 'none',
											borderRadius: '4px',
											cursor: 'pointer'
										}}
									>
										Cancel
									</button>
									<button
										onClick={() => setIsOpen(false)}
										style={{
											padding: '8px 16px',
											backgroundColor: '#007bff',
											color: 'white',
											border: 'none',
											borderRadius: '4px',
											cursor: 'pointer'
										}}
									>
										Confirm
									</button>
								</div>
							) : undefined
						}
					>
						<p>This is an interactive modal where you can customize various properties.</p>
						<p>Current settings:</p>
						<ul>
							<li>Size: {size}</li>
							<li>Footer: {showFooter ? 'Visible' : 'Hidden'}</li>
							<li>Close on Overlay Click: {closeOnOverlay ? 'Enabled' : 'Disabled'}</li>
							<li>Show Close Button: {showClose ? 'Yes' : 'No'}</li>
						</ul>
					</Modal>
				</div>
			)
		}

		return <InteractiveModal />
	}
}
