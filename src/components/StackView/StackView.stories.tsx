import type { Meta, StoryObj } from '@storybook/react'
import { StackView } from './index'
import { Button } from '../Button'

const meta = {
	title: 'Components/StackView',
	component: StackView,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs'],
	argTypes: {
		direction: {
			control: 'select',
			options: ['horizontal', 'vertical']
		},
		align: {
			control: 'select',
			options: ['start', 'center', 'end', 'stretch']
		},
		justify: {
			control: 'select',
			options: ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly']
		},
		spacing: {
			control: 'select',
			options: ['none', 'xs', 'sm', 'md', 'lg', 'xl']
		},
		wrap: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof StackView>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
	args: {
		direction: 'horizontal',
		spacing: 'md',
		children: (
			<>
				<Button>Button 1</Button>
				<Button>Button 2</Button>
				<Button>Button 3</Button>
			</>
		)
	}
}

export const Vertical: Story = {
	args: {
		direction: 'vertical',
		spacing: 'md',
		children: (
			<>
				<Button>Button 1</Button>
				<Button>Button 2</Button>
				<Button>Button 3</Button>
			</>
		)
	}
}

export const SpaceBetween: Story = {
	args: {
		direction: 'horizontal',
		justify: 'space-between',
		spacing: 'md',
		children: (
			<>
				<Button>Start</Button>
				<Button>Middle</Button>
				<Button>End</Button>
			</>
		)
	}
}

export const Centered: Story = {
	args: {
		direction: 'horizontal',
		align: 'center',
		justify: 'center',
		spacing: 'md',
		children: (
			<>
				<Button size="sm">Small</Button>
				<Button size="md">Medium</Button>
				<Button size="lg">Large</Button>
			</>
		)
	}
}

export const WithWrap: Story = {
	args: {
		direction: 'horizontal',
		spacing: 'md',
		wrap: true,
		children: (
			<>
				{Array.from({ length: 10 }, (_, i) => (
					<Button key={i}>Button {i + 1}</Button>
				))}
			</>
		)
	}
}

export const DifferentSpacing: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
			<div>
				<p style={{ margin: '0 0 0.5rem', color: '#9ca3af' }}>None</p>
				<StackView direction="horizontal" spacing="none">
					<Button size="sm">A</Button>
					<Button size="sm">B</Button>
					<Button size="sm">C</Button>
				</StackView>
			</div>
			<div>
				<p style={{ margin: '0 0 0.5rem', color: '#9ca3af' }}>XS</p>
				<StackView direction="horizontal" spacing="xs">
					<Button size="sm">A</Button>
					<Button size="sm">B</Button>
					<Button size="sm">C</Button>
				</StackView>
			</div>
			<div>
				<p style={{ margin: '0 0 0.5rem', color: '#9ca3af' }}>SM</p>
				<StackView direction="horizontal" spacing="sm">
					<Button size="sm">A</Button>
					<Button size="sm">B</Button>
					<Button size="sm">C</Button>
				</StackView>
			</div>
			<div>
				<p style={{ margin: '0 0 0.5rem', color: '#9ca3af' }}>MD</p>
				<StackView direction="horizontal" spacing="md">
					<Button size="sm">A</Button>
					<Button size="sm">B</Button>
					<Button size="sm">C</Button>
				</StackView>
			</div>
			<div>
				<p style={{ margin: '0 0 0.5rem', color: '#9ca3af' }}>LG</p>
				<StackView direction="horizontal" spacing="lg">
					<Button size="sm">A</Button>
					<Button size="sm">B</Button>
					<Button size="sm">C</Button>
				</StackView>
			</div>
			<div>
				<p style={{ margin: '0 0 0.5rem', color: '#9ca3af' }}>XL</p>
				<StackView direction="horizontal" spacing="xl">
					<Button size="sm">A</Button>
					<Button size="sm">B</Button>
					<Button size="sm">C</Button>
				</StackView>
			</div>
		</div>
	)
}
