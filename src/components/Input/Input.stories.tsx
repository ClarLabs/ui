import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './index'

const meta = {
	title: 'Components/Input',
	component: Input,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg']
		},
		variant: {
			control: 'select',
			options: ['default', 'success', 'error']
		},
		disabled: {
			control: 'boolean'
		},
		fullWidth: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		placeholder: 'Enter text...'
	}
}

export const WithLabel: Story = {
	args: {
		label: 'Email Address',
		placeholder: 'you@example.com',
		type: 'email'
	}
}

export const WithIcon: Story = {
	args: {
		label: 'Search',
		placeholder: 'Search...',
		icon: '🔍'
	}
}

export const WithHelperText: Story = {
	args: {
		label: 'Username',
		placeholder: 'Enter username',
		helperText: 'Your username must be unique'
	}
}

export const WithError: Story = {
	args: {
		label: 'Email',
		placeholder: 'you@example.com',
		error: 'Please enter a valid email address'
	}
}

export const Success: Story = {
	args: {
		label: 'Email',
		placeholder: 'you@example.com',
		variant: 'success',
		helperText: 'Email is available'
	}
}

export const Disabled: Story = {
	args: {
		label: 'Disabled Input',
		placeholder: 'Cannot edit',
		disabled: true
	}
}

export const Small: Story = {
	args: {
		size: 'sm',
		placeholder: 'Small input'
	}
}

export const Large: Story = {
	args: {
		size: 'lg',
		placeholder: 'Large input'
	}
}

export const FullWidth: Story = {
	args: {
		label: 'Full Width Input',
		placeholder: 'This input spans full width',
		fullWidth: true
	},
	parameters: {
		layout: 'padded'
	}
}
