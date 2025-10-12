import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { RadioButton } from './index'
import { useState } from 'react'

function RadioGroup() {
	const [selected, setSelected] = useState('option1')

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			<RadioButton name="options" value="option1" label="Option 1" checked={selected === 'option1'} onChange={(e) => setSelected(e.target.value)} />
			<RadioButton name="options" value="option2" label="Option 2" checked={selected === 'option2'} onChange={(e) => setSelected(e.target.value)} />
			<RadioButton name="options" value="option3" label="Option 3" checked={selected === 'option3'} onChange={(e) => setSelected(e.target.value)} />
			<RadioButton
				name="options"
				value="option4"
				label="Option 4 (Disabled)"
				disabled
				checked={selected === 'option4'}
				onChange={(e) => setSelected(e.target.value)}
			/>
		</div>
	)
}

const meta = {
	title: 'Components/RadioButton',
	component: RadioButton,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		disabled: {
			control: 'boolean'
		},
		checked: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof RadioButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		name: 'radio',
		value: 'default',
		label: 'Radio Button'
	}
}

export const Checked: Story = {
	args: {
		name: 'radio',
		value: 'checked',
		label: 'Checked Radio Button',
		checked: true
	}
}

export const Disabled: Story = {
	args: {
		name: 'radio',
		value: 'disabled',
		label: 'Disabled Radio Button',
		disabled: true
	}
}

export const DisabledChecked: Story = {
	args: {
		name: 'radio',
		value: 'disabled-checked',
		label: 'Disabled Checked',
		checked: true,
		disabled: true
	}
}

export const WithoutLabel: Story = {
	args: {
		name: 'radio',
		value: 'no-label'
	}
}

export const InteractiveGroup: Story = {
	render: () => <RadioGroup />
}
