import type { Meta, StoryObj } from '@storybook/react'
import { Signpost } from './index'
import { Button } from '../Button'

const meta = {
	title: 'Components/Signpost',
	component: Signpost,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		position: {
			control: 'select',
			options: ['top', 'bottom', 'left', 'right']
		}
	}
} satisfies Meta<typeof Signpost>

export default meta
type Story = StoryObj<typeof meta>

export const Top: Story = {
	args: {
		trigger: <Button>Click me (Top)</Button>,
		position: 'top',
		children: (
			<div style={{ padding: '0.5rem' }}>
				<p style={{ margin: 0 }}>This is a signpost message!</p>
			</div>
		)
	}
}

export const Bottom: Story = {
	args: {
		trigger: <Button>Click me (Bottom)</Button>,
		position: 'bottom',
		children: (
			<div style={{ padding: '0.5rem' }}>
				<p style={{ margin: 0 }}>This is a signpost message!</p>
			</div>
		)
	}
}

export const Left: Story = {
	args: {
		trigger: <Button>Click me (Left)</Button>,
		position: 'left',
		children: (
			<div style={{ padding: '0.5rem' }}>
				<p style={{ margin: 0 }}>This is a signpost message!</p>
			</div>
		)
	}
}

export const Right: Story = {
	args: {
		trigger: <Button>Click me (Right)</Button>,
		position: 'right',
		children: (
			<div style={{ padding: '0.5rem' }}>
				<p style={{ margin: 0 }}>This is a signpost message!</p>
			</div>
		)
	}
}

export const WithRichContent: Story = {
	args: {
		trigger: <Button variant="primary">Show Details</Button>,
		position: 'bottom',
		children: (
			<div style={{ padding: '1rem', minWidth: '250px' }}>
				<h4 style={{ margin: '0 0 0.5rem 0', color: '#e0e0e0' }}>Additional Information</h4>
				<p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#9ca3af' }}>This is a more detailed signpost with multiple elements.</p>
				<ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.875rem', color: '#9ca3af' }}>
					<li>Feature one</li>
					<li>Feature two</li>
					<li>Feature three</li>
				</ul>
			</div>
		)
	}
}

export const OnIcon: Story = {
	args: {
		trigger: (
			<span
				style={{
					display: 'inline-flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '24px',
					height: '24px',
					borderRadius: '50%',
					background: 'rgba(59, 130, 246, 0.2)',
					color: '#60a5fa',
					cursor: 'pointer',
					fontSize: '14px',
					fontWeight: 'bold'
				}}
			>
				?
			</span>
		),
		position: 'top',
		children: (
			<div style={{ padding: '0.75rem', maxWidth: '200px' }}>
				<p style={{ margin: 0, fontSize: '0.875rem' }}>Click the icon to toggle this help message.</p>
			</div>
		)
	}
}
