import type { Meta, StoryObj } from '@storybook/react'
import { ToastProvider, useToast } from './index'

interface ToastDemoProps {
	variant?: 'info' | 'success' | 'warning' | 'error'
	duration?: number
	dismissible?: boolean
	message: string
	position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
}

function ToastDemo({ variant, duration, dismissible, message }: Omit<ToastDemoProps, 'position'>) {
	const { showToast } = useToast()

	return (
		<div style={{ padding: '20px' }}>
			<button
				onClick={() => showToast(message, { variant, duration, dismissible })}
				style={{
					padding: '12px 24px',
					fontSize: '16px',
					cursor: 'pointer',
					backgroundColor: '#007bff',
					color: 'white',
					border: 'none',
					borderRadius: '4px'
				}}
			>
				Show Toast
			</button>
			<p style={{ marginTop: '16px', color: '#666' }}>Click the button to see the toast notification</p>
		</div>
	)
}

const meta = {
	title: 'Components/Toast',
	component: ToastDemo,
	decorators: [
		(Story, context) => (
			<ToastProvider position={context.args.position || 'top-right'}>
				<Story />
			</ToastProvider>
		)
	],
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['info', 'success', 'warning', 'error'],
			description: 'The visual style/type of the toast'
		},
		duration: {
			control: 'number',
			description: 'Duration in milliseconds before the toast auto-dismisses'
		},
		dismissible: {
			control: 'boolean',
			description: 'Whether the toast can be manually dismissed'
		},
		message: {
			control: 'text',
			description: 'The message to display in the toast'
		},
		position: {
			control: 'select',
			options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
			description: 'The position of the toast container on the screen'
		}
	}
} satisfies Meta<ToastDemoProps>

export default meta
type Story = StoryObj<typeof meta>

// Variant Stories
export const Info: Story = {
	args: {
		variant: 'info',
		message: 'This is an informational message',
		duration: 5000,
		dismissible: true,
		position: 'top-right'
	}
}

export const Success: Story = {
	args: {
		variant: 'success',
		message: 'Operation completed successfully!',
		duration: 5000,
		dismissible: true,
		position: 'top-right'
	}
}

export const Warning: Story = {
	args: {
		variant: 'warning',
		message: 'Please review your input carefully',
		duration: 5000,
		dismissible: true,
		position: 'top-right'
	}
}

export const Error: Story = {
	args: {
		variant: 'error',
		message: 'An error occurred while processing your request',
		duration: 5000,
		dismissible: true,
		position: 'top-right'
	}
}

// Duration Stories
export const ShortDuration: Story = {
	args: {
		variant: 'info',
		message: 'This toast will disappear in 2 seconds',
		duration: 2000,
		dismissible: true,
		position: 'top-right'
	}
}

export const MediumDuration: Story = {
	args: {
		variant: 'success',
		message: 'This toast will disappear in 5 seconds',
		duration: 5000,
		dismissible: true,
		position: 'top-right'
	}
}

export const LongDuration: Story = {
	args: {
		variant: 'warning',
		message: 'This toast will disappear in 10 seconds',
		duration: 10000,
		dismissible: true,
		position: 'top-right'
	}
}

// Dismissible Stories
export const NonDismissible: Story = {
	args: {
		variant: 'info',
		message: 'This toast cannot be manually dismissed',
		duration: 5000,
		dismissible: false,
		position: 'top-right'
	}
}

export const Dismissible: Story = {
	args: {
		variant: 'success',
		message: 'You can close this toast manually',
		duration: 10000,
		dismissible: true,
		position: 'top-right'
	}
}

// Position Stories
export const TopLeft: Story = {
	args: {
		variant: 'info',
		message: 'Toast positioned at top-left',
		duration: 5000,
		dismissible: true,
		position: 'top-left'
	}
}

export const TopCenter: Story = {
	args: {
		variant: 'info',
		message: 'Toast positioned at top-center',
		duration: 5000,
		dismissible: true,
		position: 'top-center'
	}
}

export const TopRight: Story = {
	args: {
		variant: 'info',
		message: 'Toast positioned at top-right',
		duration: 5000,
		dismissible: true,
		position: 'top-right'
	}
}

export const BottomLeft: Story = {
	args: {
		variant: 'info',
		message: 'Toast positioned at bottom-left',
		duration: 5000,
		dismissible: true,
		position: 'bottom-left'
	}
}

export const BottomCenter: Story = {
	args: {
		variant: 'info',
		message: 'Toast positioned at bottom-center',
		duration: 5000,
		dismissible: true,
		position: 'bottom-center'
	}
}

export const BottomRight: Story = {
	args: {
		variant: 'info',
		message: 'Toast positioned at bottom-right',
		duration: 5000,
		dismissible: true,
		position: 'bottom-right'
	}
}

// Interactive Playground
export const Playground: Story = {
	args: {
		variant: 'info',
		message: 'Customize this toast using the controls below',
		duration: 5000,
		dismissible: true,
		position: 'top-right'
	}
}
