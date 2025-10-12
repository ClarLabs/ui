import type { Meta, StoryObj } from '@storybook/react'
import { RangeInput } from './index'

const meta = {
	title: 'Components/RangeInput',
	component: RangeInput,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs'],
	argTypes: {
		min: {
			control: { type: 'number' }
		},
		max: {
			control: { type: 'number' }
		},
		step: {
			control: { type: 'number' }
		},
		value: {
			control: { type: 'number' }
		},
		showValue: {
			control: 'boolean'
		},
		showMinMax: {
			control: 'boolean'
		},
		disabled: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof RangeInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		value: 50
	}
}

export const WithLabel: Story = {
	args: {
		label: 'Volume',
		value: 75
	}
}

export const WithValue: Story = {
	args: {
		label: 'Brightness',
		value: 60,
		showValue: true
	}
}

export const WithMinMax: Story = {
	args: {
		label: 'Temperature',
		min: 0,
		max: 100,
		value: 72,
		showMinMax: true,
		showValue: true
	}
}

export const CustomRange: Story = {
	args: {
		label: 'Price Range',
		min: 10,
		max: 1000,
		value: 500,
		step: 10,
		showValue: true,
		showMinMax: true
	}
}

export const SmallSteps: Story = {
	args: {
		label: 'Precision Control',
		min: 0,
		max: 10,
		value: 5.5,
		step: 0.1,
		showValue: true
	}
}

export const Disabled: Story = {
	args: {
		label: 'Disabled Range',
		value: 50,
		disabled: true,
		showValue: true
	}
}

export const MultipleRanges: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem' }}>
			<RangeInput label="Volume" value={75} showValue />
			<RangeInput label="Bass" value={50} showValue />
			<RangeInput label="Treble" value={60} showValue />
			<RangeInput label="Balance" min={-50} max={50} value={0} showValue showMinMax />
		</div>
	)
}
