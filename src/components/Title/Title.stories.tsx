import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Title } from './index'

const meta = {
	title: 'Components/Title',
	component: Title,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs'],
	argTypes: {
		level: {
			control: 'select',
			options: [1, 2, 3, 4, 5, 6]
		},
		align: {
			control: 'select',
			options: ['left', 'center', 'right']
		}
	}
} satisfies Meta<typeof Title>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		children: 'Welcome to Our Platform'
	}
}

export const WithSubtitle: Story = {
	args: {
		children: 'Welcome to Our Platform',
		subtitle: 'Build amazing experiences with our component library'
	}
}

export const Level2: Story = {
	args: {
		children: 'Section Heading',
		subtitle: 'A smaller heading for subsections',
		level: 2
	}
}

export const Level3: Story = {
	args: {
		children: 'Subsection Title',
		subtitle: 'Even more detailed content grouping',
		level: 3
	}
}

export const CenterAligned: Story = {
	args: {
		children: 'Centered Title',
		subtitle: 'Perfect for hero sections and landing pages',
		align: 'center'
	}
}

export const RightAligned: Story = {
	args: {
		children: 'Right Aligned Title',
		subtitle: 'Useful for specific layout needs',
		align: 'right'
	}
}

export const MultipleHeadings: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
			<Title level={1} subtitle="The main page title">
				Main Heading (H1)
			</Title>
			<Title level={2} subtitle="A section within the page">
				Section Heading (H2)
			</Title>
			<Title level={3} subtitle="A subsection">
				Subsection Heading (H3)
			</Title>
			<Title level={4} subtitle="Even more granular">
				Minor Heading (H4)
			</Title>
		</div>
	)
}

export const LongContent: Story = {
	args: {
		children: 'This is a Very Long Title That Might Wrap to Multiple Lines Depending on the Container Width',
		subtitle: 'And here is a subtitle that also contains quite a bit of text to demonstrate how the component handles longer content gracefully'
	}
}
