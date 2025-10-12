import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Divider } from './index'

const meta = {
	title: 'Components/Divider',
	component: Divider,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs'],
	argTypes: {
		orientation: {
			control: 'select',
			options: ['horizontal', 'vertical']
		},
		variant: {
			control: 'select',
			options: ['solid', 'dashed', 'dotted']
		}
	}
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
	args: {
		orientation: 'horizontal'
	}
}

export const WithLabel: Story = {
	args: {
		orientation: 'horizontal',
		label: 'OR'
	}
}

export const Dashed: Story = {
	args: {
		orientation: 'horizontal',
		variant: 'dashed'
	}
}

export const Dotted: Story = {
	args: {
		orientation: 'horizontal',
		variant: 'dotted'
	}
}

export const DashedWithLabel: Story = {
	args: {
		orientation: 'horizontal',
		variant: 'dashed',
		label: 'Section Break'
	}
}

export const Vertical: Story = {
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '1rem', height: '100px' }}>
			<span>Left</span>
			<Divider orientation="vertical" />
			<span>Center</span>
			<Divider orientation="vertical" />
			<span>Right</span>
		</div>
	)
}

export const VerticalVariants: Story = {
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '2rem', height: '100px' }}>
			<span>Solid</span>
			<Divider orientation="vertical" variant="solid" />
			<span>Dashed</span>
			<Divider orientation="vertical" variant="dashed" />
			<span>Dotted</span>
			<Divider orientation="vertical" variant="dotted" />
			<span>End</span>
		</div>
	)
}

export const ContentSeparator: Story = {
	render: () => (
		<div style={{ padding: '1rem' }}>
			<h3 style={{ margin: 0, color: '#e0e0e0' }}>Section 1</h3>
			<p style={{ color: '#9ca3af' }}>This is the first section of content.</p>

			<Divider label="Next Section" />

			<h3 style={{ margin: 0, color: '#e0e0e0' }}>Section 2</h3>
			<p style={{ color: '#9ca3af' }}>This is the second section of content.</p>

			<Divider />

			<h3 style={{ margin: 0, color: '#e0e0e0' }}>Section 3</h3>
			<p style={{ color: '#9ca3af' }}>This is the third section of content.</p>
		</div>
	)
}
