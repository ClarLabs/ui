import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Card } from './index'

const meta = {
	title: 'Components/Card',
	component: Card,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		hoverable: {
			control: 'boolean'
		},
		clickable: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		children: (
			<div style={{ padding: '1rem' }}>
				<h3 style={{ margin: '0 0 0.5rem 0' }}>Card Title</h3>
				<p style={{ margin: 0, color: '#9ca3af' }}>This is a basic card with some content inside.</p>
			</div>
		)
	}
}

export const WithImage: Story = {
	args: {
		image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
		title: 'Technology',
		subtitle: 'Latest trends',
		children: 'Explore the latest in technology and innovation.'
	}
}

export const WithTitleAndSubtitle: Story = {
	args: {
		title: 'Card Title',
		subtitle: 'Card Subtitle',
		children: 'This card has a title and subtitle defined as props.'
	}
}

export const WithFooter: Story = {
	args: {
		title: 'Card with Footer',
		children: 'This card includes a footer section.',
		footer: (
			<div style={{ display: 'flex', gap: '0.5rem' }}>
				<button style={{ padding: '0.5rem 1rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>
					Action
				</button>
				<button
					style={{
						padding: '0.5rem 1rem',
						background: 'transparent',
						color: '#9ca3af',
						border: '1px solid rgba(255, 255, 255, 0.2)',
						borderRadius: '0.375rem',
						cursor: 'pointer'
					}}
				>
					Cancel
				</button>
			</div>
		)
	}
}

export const Hoverable: Story = {
	args: {
		title: 'Hoverable Card',
		children: 'This card has a hover effect. Hover over it to see the animation.',
		hoverable: true
	}
}

export const Clickable: Story = {
	args: {
		title: 'Clickable Card',
		children: 'This card is clickable. Click it to trigger an action.',
		clickable: true,
		onClick: () => alert('Card clicked!')
	}
}

export const FullCard: Story = {
	args: {
		image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
		title: 'Complete Card',
		subtitle: 'With all features',
		children: 'This card demonstrates all available features including image, title, subtitle, content, footer, and interactivity.',
		footer: (
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>2 days ago</span>
				<button style={{ padding: '0.5rem 1rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>
					Read More
				</button>
			</div>
		),
		hoverable: true,
		clickable: true,
		onClick: () => console.log('Card clicked')
	}
}
