import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Select } from './index'

const meta = {
	title: 'Components/Select',
	component: Select,
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
			options: ['default', 'error', 'success']
		},
		disabled: {
			control: 'boolean'
		},
		fullWidth: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const fruitOptions = [
	{ value: 'apple', label: 'Apple' },
	{ value: 'banana', label: 'Banana' },
	{ value: 'orange', label: 'Orange' },
	{ value: 'grape', label: 'Grape' },
	{ value: 'mango', label: 'Mango' }
]

const countryOptions = [
	{ value: 'us', label: 'United States' },
	{ value: 'uk', label: 'United Kingdom' },
	{ value: 'ca', label: 'Canada' },
	{ value: 'au', label: 'Australia' },
	{ value: 'de', label: 'Germany' }
]

export const Default: Story = {
	args: {
		label: 'Select a fruit',
		options: fruitOptions,
		placeholder: 'Choose an option...'
	}
}

export const WithDefaultValue: Story = {
	args: {
		label: 'Select a fruit',
		options: fruitOptions,
		defaultValue: 'banana'
	}
}

export const Small: Story = {
	args: {
		label: 'Small Select',
		options: fruitOptions,
		size: 'sm',
		placeholder: 'Choose...'
	}
}

export const Large: Story = {
	args: {
		label: 'Large Select',
		options: fruitOptions,
		size: 'lg',
		placeholder: 'Choose...'
	}
}

export const WithHelperText: Story = {
	args: {
		label: 'Select your country',
		options: countryOptions,
		helperText: 'Choose the country you currently reside in',
		placeholder: 'Select country...'
	}
}

export const WithError: Story = {
	args: {
		label: 'Select a fruit',
		options: fruitOptions,
		error: 'Please select a valid option',
		placeholder: 'Choose...'
	}
}

export const Success: Story = {
	args: {
		label: 'Select a fruit',
		options: fruitOptions,
		variant: 'success',
		defaultValue: 'apple',
		helperText: 'Great choice!'
	}
}

export const Disabled: Story = {
	args: {
		label: 'Disabled Select',
		options: fruitOptions,
		disabled: true,
		placeholder: 'Cannot select...'
	}
}

export const DisabledWithValue: Story = {
	args: {
		label: 'Disabled Select',
		options: fruitOptions,
		disabled: true,
		defaultValue: 'orange'
	}
}

export const WithDisabledOptions: Story = {
	args: {
		label: 'Select a fruit',
		options: [
			{ value: 'apple', label: 'Apple' },
			{ value: 'banana', label: 'Banana (Out of stock)', disabled: true },
			{ value: 'orange', label: 'Orange' },
			{ value: 'grape', label: 'Grape (Out of stock)', disabled: true },
			{ value: 'mango', label: 'Mango' }
		],
		placeholder: 'Choose...'
	}
}

export const FullWidth: Story = {
	args: {
		label: 'Full Width Select',
		options: countryOptions,
		fullWidth: true,
		placeholder: 'Select country...'
	},
	parameters: {
		layout: 'padded'
	}
}

export const WithoutLabel: Story = {
	args: {
		options: fruitOptions,
		placeholder: 'Choose a fruit...'
	}
}

export const Multiple: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px' }}>
			<Select label="Favorite Fruit" options={fruitOptions} defaultValue="apple" />
			<Select label="Country" options={countryOptions} placeholder="Select..." />
			<Select label="Secondary Fruit" options={fruitOptions} size="sm" defaultValue="mango" helperText="Choose your second favorite" />
		</div>
	)
}
