import type { Meta, StoryObj } from '@storybook/react'
import { RichSelect } from './index'

const options = [
	{ value: 'react', label: 'React', description: 'A JavaScript library for building user interfaces' },
	{ value: 'vue', label: 'Vue.js', description: 'The Progressive JavaScript Framework' },
	{ value: 'angular', label: 'Angular', description: 'Platform for building mobile and desktop web applications' },
	{ value: 'svelte', label: 'Svelte', description: 'Cybernetically enhanced web apps', disabled: true }
]

const optionsWithIcons = [
	{ value: 'home', label: 'Home', icon: '🏠', description: 'Go to homepage' },
	{ value: 'profile', label: 'Profile', icon: '👤', description: 'View your profile' },
	{ value: 'settings', label: 'Settings', icon: '⚙️', description: 'Configure your preferences' },
	{ value: 'logout', label: 'Logout', icon: '🚪', description: 'Sign out of your account' }
]

const meta = {
	title: 'Components/RichSelect',
	component: RichSelect,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		disabled: {
			control: 'boolean'
		},
		searchable: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof RichSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		options,
		placeholder: 'Select a framework'
	}
}

export const WithIcons: Story = {
	args: {
		options: optionsWithIcons,
		placeholder: 'Select an action'
	}
}

export const Searchable: Story = {
	args: {
		options,
		searchable: true,
		placeholder: 'Search frameworks...'
	}
}

export const WithDefaultValue: Story = {
	args: {
		options,
		value: 'react'
	}
}

export const Disabled: Story = {
	args: {
		options,
		disabled: true,
		placeholder: 'Disabled select'
	}
}

export const WithDisabledOption: Story = {
	args: {
		options,
		placeholder: 'Svelte is disabled'
	}
}

export const ManyOptions: Story = {
	args: {
		options: Array.from({ length: 20 }, (_, i) => ({
			value: `option${i + 1}`,
			label: `Option ${i + 1}`,
			description: `Description for option ${i + 1}`
		})),
		searchable: true,
		placeholder: 'Search from 20 options...'
	}
}
