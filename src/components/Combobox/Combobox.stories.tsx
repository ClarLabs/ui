import type { Meta, StoryObj } from '@storybook/react'
import { Combobox } from './index'

const options = [
	{ value: 'react', label: 'React' },
	{ value: 'vue', label: 'Vue' },
	{ value: 'angular', label: 'Angular' },
	{ value: 'svelte', label: 'Svelte' },
	{ value: 'solid', label: 'Solid', disabled: true },
	{ value: 'ember', label: 'Ember' }
]

const meta = {
	title: 'Components/Combobox',
	component: Combobox,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		disabled: {
			control: 'boolean'
		},
		allowCustomValue: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		options,
		placeholder: 'Select or type...'
	}
}

export const WithDefaultValue: Story = {
	args: {
		options,
		defaultValue: 'React'
	}
}

export const AllowCustomValue: Story = {
	args: {
		options,
		placeholder: 'Type custom value...',
		allowCustomValue: true
	}
}

export const WithDisabledOption: Story = {
	args: {
		options,
		placeholder: 'Solid is disabled'
	}
}

export const Disabled: Story = {
	args: {
		options,
		disabled: true,
		placeholder: 'Disabled combobox'
	}
}

export const ManyOptions: Story = {
	args: {
		options: Array.from({ length: 50 }, (_, i) => ({
			value: `option${i + 1}`,
			label: `Option ${i + 1}`
		})),
		placeholder: 'Search from 50 options...'
	}
}

export const Searchable: Story = {
	args: {
		options: [
			{ value: 'usa', label: 'United States' },
			{ value: 'uk', label: 'United Kingdom' },
			{ value: 'canada', label: 'Canada' },
			{ value: 'australia', label: 'Australia' },
			{ value: 'germany', label: 'Germany' },
			{ value: 'france', label: 'France' },
			{ value: 'spain', label: 'Spain' },
			{ value: 'italy', label: 'Italy' },
			{ value: 'japan', label: 'Japan' },
			{ value: 'china', label: 'China' }
		],
		placeholder: 'Search countries...'
	}
}
