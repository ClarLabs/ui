import type { Meta, StoryObj } from '@storybook/react'
import { DateRangePicker } from './index'

const meta = {
	title: 'Components/DateRangePicker',
	component: DateRangePicker,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs']
} satisfies Meta<typeof DateRangePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {}
}

export const WithValue: Story = {
	args: {
		value: {
			start: new Date('2024-03-01'),
			end: new Date('2024-03-15')
		}
	}
}

export const WithMinDate: Story = {
	args: {
		minDate: new Date()
	}
}

export const WithMaxDate: Story = {
	args: {
		maxDate: new Date('2024-12-31')
	}
}

export const WithRange: Story = {
	args: {
		minDate: new Date('2024-01-01'),
		maxDate: new Date('2024-12-31'),
		value: {
			start: new Date('2024-06-01'),
			end: new Date('2024-06-30')
		}
	}
}
