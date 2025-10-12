import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Pagination } from './index'
import { useState } from 'react'

function PaginationWrapper(props: any) {
	const [currentPage, setCurrentPage] = useState(props.currentPage || 1)

	return <Pagination {...props} currentPage={currentPage} onPageChange={setCurrentPage} />
}

const meta = {
	title: 'Components/Pagination',
	component: PaginationWrapper,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		totalPages: {
			control: { type: 'number', min: 1, max: 100 }
		},
		showFirstLast: {
			control: 'boolean'
		},
		siblingCount: {
			control: { type: 'number', min: 0, max: 5 }
		}
	}
} satisfies Meta<typeof PaginationWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		currentPage: 1,
		totalPages: 10
	}
}

export const MiddlePage: Story = {
	args: {
		currentPage: 5,
		totalPages: 10
	}
}

export const ManyPages: Story = {
	args: {
		currentPage: 15,
		totalPages: 50
	}
}

export const FewPages: Story = {
	args: {
		currentPage: 2,
		totalPages: 5
	}
}

export const WithoutFirstLast: Story = {
	args: {
		currentPage: 5,
		totalPages: 20,
		showFirstLast: false
	}
}

export const MoreSiblings: Story = {
	args: {
		currentPage: 10,
		totalPages: 30,
		siblingCount: 2
	}
}

export const FewerSiblings: Story = {
	args: {
		currentPage: 10,
		totalPages: 30,
		siblingCount: 0
	}
}
