import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Badge } from './index'

const meta = {
	title: 'Components/Badge',
	component: Badge,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'primary', 'success', 'warning', 'error', 'info']
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg']
		},
		dot: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		children: 'Badge'
	}
}

export const Primary: Story = {
	args: {
		children: 'Primary',
		variant: 'primary'
	}
}

export const Success: Story = {
	args: {
		children: 'Success',
		variant: 'success'
	}
}

export const Warning: Story = {
	args: {
		children: 'Warning',
		variant: 'warning'
	}
}

export const Error: Story = {
	args: {
		children: 'Error',
		variant: 'error'
	}
}

export const Info: Story = {
	args: {
		children: 'Info',
		variant: 'info'
	}
}

export const Small: Story = {
	args: {
		children: 'Small',
		size: 'sm'
	}
}

export const Large: Story = {
	args: {
		children: 'Large',
		size: 'lg'
	}
}

export const WithDot: Story = {
	args: {
		children: 'Online',
		variant: 'success',
		dot: true
	}
}

export const AllVariantsWithDot: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
			<Badge variant="default" dot>
				Default
			</Badge>
			<Badge variant="primary" dot>
				Primary
			</Badge>
			<Badge variant="success" dot>
				Success
			</Badge>
			<Badge variant="warning" dot>
				Warning
			</Badge>
			<Badge variant="error" dot>
				Error
			</Badge>
			<Badge variant="info" dot>
				Info
			</Badge>
		</div>
	)
}
