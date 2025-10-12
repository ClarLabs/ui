import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Avatar } from './index'

const meta = {
	title: 'Components/Avatar',
	component: Avatar,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg', 'xl']
		}
	}
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const WithInitials: Story = {
	args: {
		initials: 'JD'
	}
}

export const WithImage: Story = {
	args: {
		src: 'https://i.pravatar.cc/150?img=1',
		alt: 'John Doe'
	}
}

export const Small: Story = {
	args: {
		initials: 'AB',
		size: 'sm'
	}
}

export const Medium: Story = {
	args: {
		initials: 'AB',
		size: 'md'
	}
}

export const Large: Story = {
	args: {
		initials: 'AB',
		size: 'lg'
	}
}

export const ExtraLarge: Story = {
	args: {
		initials: 'AB',
		size: 'xl'
	}
}

export const ImageWithFallback: Story = {
	args: {
		src: 'https://invalid-url.example.com/image.jpg',
		initials: 'FB',
		alt: 'Fallback'
	}
}

export const AllSizes: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
			<Avatar initials="SM" size="sm" />
			<Avatar initials="MD" size="md" />
			<Avatar initials="LG" size="lg" />
			<Avatar initials="XL" size="xl" />
		</div>
	)
}

export const MixedTypes: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
			<Avatar src="https://i.pravatar.cc/150?img=1" alt="User 1" />
			<Avatar src="https://i.pravatar.cc/150?img=2" alt="User 2" />
			<Avatar initials="AB" />
			<Avatar src="https://i.pravatar.cc/150?img=3" alt="User 3" />
			<Avatar initials="CD" />
		</div>
	)
}
