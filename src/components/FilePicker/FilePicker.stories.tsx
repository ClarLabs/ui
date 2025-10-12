import type { Meta, StoryObj } from '@storybook/react'
import { FilePicker } from './index'

const meta = {
	title: 'Components/FilePicker',
	component: FilePicker,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs'],
	argTypes: {
		multiple: {
			control: 'boolean'
		},
		disabled: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof FilePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {}
}

export const Multiple: Story = {
	args: {
		multiple: true
	}
}

export const ImagesOnly: Story = {
	args: {
		accept: 'image/*'
	}
}

export const DocumentsOnly: Story = {
	args: {
		accept: '.pdf,.doc,.docx',
		multiple: true
	}
}

export const WithMaxSize: Story = {
	args: {
		maxSize: 5 * 1024 * 1024, // 5MB
		multiple: true
	}
}

export const Disabled: Story = {
	args: {
		disabled: true
	}
}

export const WithUploadHandler: Story = {
	args: {
		multiple: true,
		onUpload: async (file) => {
			// Simulate upload delay
			await new Promise((resolve) => setTimeout(resolve, 2000))
			console.log('Uploaded:', file.name)
		}
	}
}
