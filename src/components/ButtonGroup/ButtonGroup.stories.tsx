import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { ButtonGroup } from './index'
import { Button } from '../Button'

const meta = {
	title: 'Components/ButtonGroup',
	component: ButtonGroup,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		orientation: {
			control: 'select',
			options: ['horizontal', 'vertical']
		}
	}
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
	args: {
		orientation: 'horizontal',
		children: (
			<>
				<Button>First</Button>
				<Button>Second</Button>
				<Button>Third</Button>
			</>
		)
	}
}

export const Vertical: Story = {
	args: {
		orientation: 'vertical',
		children: (
			<>
				<Button>First</Button>
				<Button>Second</Button>
				<Button>Third</Button>
			</>
		)
	}
}

export const DifferentVariants: Story = {
	args: {
		children: (
			<>
				<Button variant="primary">Primary</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="outline">Outline</Button>
			</>
		)
	}
}

export const WithIcons: Story = {
	args: {
		children: (
			<>
				<Button>◀</Button>
				<Button>▶</Button>
			</>
		)
	}
}

export const Toolbar: Story = {
	args: {
		children: (
			<>
				<Button variant="outline">Bold</Button>
				<Button variant="outline">Italic</Button>
				<Button variant="outline">Underline</Button>
				<Button variant="outline">Strike</Button>
			</>
		)
	}
}

export const ManyButtons: Story = {
	args: {
		children: (
			<>
				{Array.from({ length: 7 }, (_, i) => (
					<Button key={i} variant="outline">
						{i + 1}
					</Button>
				))}
			</>
		)
	}
}

export const Pagination: Story = {
	args: {
		children: (
			<>
				<Button variant="outline">◀◀</Button>
				<Button variant="outline">◀</Button>
				<Button variant="primary">1</Button>
				<Button variant="outline">2</Button>
				<Button variant="outline">3</Button>
				<Button variant="outline">▶</Button>
				<Button variant="outline">▶▶</Button>
			</>
		)
	}
}
