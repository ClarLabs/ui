import type { Meta, StoryObj } from '@storybook/react'
import { SidePanel } from './index'
import { Button } from '../Button'
import { useState } from 'react'

function SidePanelWrapper(props: any) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<Button onClick={() => setIsOpen(true)}>Open Side Panel</Button>
			<SidePanel {...props} isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</>
	)
}

const meta = {
	title: 'Components/SidePanel',
	component: SidePanelWrapper,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		position: {
			control: 'select',
			options: ['left', 'right']
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg']
		},
		showCloseButton: {
			control: 'boolean'
		},
		closeOnOverlayClick: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof SidePanelWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const Right: Story = {
	args: {
		title: 'Side Panel',
		position: 'right',
		children: <div>This is a side panel that slides in from the right.</div>
	}
}

export const Left: Story = {
	args: {
		title: 'Side Panel',
		position: 'left',
		children: <div>This is a side panel that slides in from the left.</div>
	}
}

export const Small: Story = {
	args: {
		title: 'Small Panel',
		size: 'sm',
		children: <div>This is a small side panel.</div>
	}
}

export const Large: Story = {
	args: {
		title: 'Large Panel',
		size: 'lg',
		children: <div>This is a large side panel.</div>
	}
}

export const WithFooter: Story = {
	args: {
		title: 'Panel with Footer',
		children: <div>Content goes here...</div>,
		footer: (
			<div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
				<Button variant="outline">Cancel</Button>
				<Button variant="primary">Save</Button>
			</div>
		)
	}
}

export const NoCloseButton: Story = {
	args: {
		title: 'No Close Button',
		showCloseButton: false,
		children: <div>You must use the overlay or footer button to close.</div>,
		footer: <Button>Close</Button>
	}
}

export const NoOverlayClose: Story = {
	args: {
		title: 'No Overlay Close',
		closeOnOverlayClick: false,
		children: <div>Clicking the overlay won't close this panel.</div>
	}
}
