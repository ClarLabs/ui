import type { Meta, StoryObj } from '@storybook/react'
import { ProgressBar } from './index'

const meta = {
	title: 'Components/ProgressBar',
	component: ProgressBar,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'success', 'warning', 'error', 'info']
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg']
		},
		value: {
			control: { type: 'range', min: 0, max: 100, step: 1 }
		},
		showLabel: {
			control: 'boolean'
		},
		striped: {
			control: 'boolean'
		},
		animated: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		value: 60,
		max: 100
	}
}

export const WithLabel: Story = {
	args: {
		value: 75,
		showLabel: true
	}
}

export const Success: Story = {
	args: {
		value: 100,
		variant: 'success',
		showLabel: true
	}
}

export const Warning: Story = {
	args: {
		value: 45,
		variant: 'warning',
		showLabel: true
	}
}

export const Error: Story = {
	args: {
		value: 25,
		variant: 'error',
		showLabel: true
	}
}

export const Info: Story = {
	args: {
		value: 80,
		variant: 'info',
		showLabel: true
	}
}

export const Small: Story = {
	args: {
		value: 60,
		size: 'sm',
		showLabel: true
	}
}

export const Large: Story = {
	args: {
		value: 60,
		size: 'lg',
		showLabel: true
	}
}

export const Striped: Story = {
	args: {
		value: 70,
		striped: true,
		showLabel: true
	}
}

export const StripedAnimated: Story = {
	args: {
		value: 70,
		striped: true,
		animated: true,
		showLabel: true
	}
}

export const CustomLabel: Story = {
	args: {
		value: 45,
		max: 100,
		showLabel: true,
		label: '45 of 100 tasks complete'
	}
}

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
			<div>
				<p style={{ marginBottom: '0.5rem', color: '#9ca3af' }}>Default</p>
				<ProgressBar value={60} showLabel />
			</div>
			<div>
				<p style={{ marginBottom: '0.5rem', color: '#9ca3af' }}>Success</p>
				<ProgressBar value={100} variant="success" showLabel />
			</div>
			<div>
				<p style={{ marginBottom: '0.5rem', color: '#9ca3af' }}>Warning</p>
				<ProgressBar value={45} variant="warning" showLabel />
			</div>
			<div>
				<p style={{ marginBottom: '0.5rem', color: '#9ca3af' }}>Error</p>
				<ProgressBar value={25} variant="error" showLabel />
			</div>
			<div>
				<p style={{ marginBottom: '0.5rem', color: '#9ca3af' }}>Info</p>
				<ProgressBar value={80} variant="info" showLabel />
			</div>
		</div>
	)
}
