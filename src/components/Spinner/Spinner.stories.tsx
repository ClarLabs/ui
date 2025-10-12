import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Spinner } from './index'

const meta = {
	title: 'Components/Spinner',
	component: Spinner,
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
			options: ['default', 'primary', 'secondary']
		}
	}
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {}
}

export const WithLabel: Story = {
	args: {
		label: 'Loading...'
	}
}

export const Small: Story = {
	args: {
		size: 'sm'
	}
}

export const Large: Story = {
	args: {
		size: 'lg',
		label: 'Loading'
	}
}

export const Primary: Story = {
	args: {
		variant: 'primary',
		label: 'Loading'
	}
}

export const Secondary: Story = {
	args: {
		variant: 'secondary',
		label: 'Loading'
	}
}

export const AllSizes: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
			<Spinner size="sm" label="Small" />
			<Spinner size="md" label="Medium" />
			<Spinner size="lg" label="Large" />
		</div>
	)
}

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
			<Spinner variant="default" label="Default" />
			<Spinner variant="primary" label="Primary" />
			<Spinner variant="secondary" label="Secondary" />
		</div>
	)
}
