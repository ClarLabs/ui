import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Header } from './index'
import { Button } from '../Button'

const meta = {
	title: 'Components/Header',
	component: Header,
	parameters: {
		layout: 'fullscreen'
	},
	tags: ['autodocs'],
	argTypes: {
		sticky: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		title: 'My Application'
	}
}

export const WithLogo: Story = {
	args: {
		logo: <span style={{ fontSize: '1.5rem' }}>🚀</span>,
		title: 'My Application'
	}
}

export const WithNavigation: Story = {
	args: {
		title: 'My Application',
		children: (
			<nav style={{ display: 'flex', gap: '1.5rem' }}>
				<a href="/" style={{ color: '#e0e0e0', textDecoration: 'none' }}>
					Home
				</a>
				<a href="/about" style={{ color: '#e0e0e0', textDecoration: 'none' }}>
					About
				</a>
				<a href="/contact" style={{ color: '#e0e0e0', textDecoration: 'none' }}>
					Contact
				</a>
			</nav>
		)
	}
}

export const WithActions: Story = {
	args: {
		title: 'My Application',
		actions: (
			<div style={{ display: 'flex', gap: '0.5rem' }}>
				<Button variant="outline" size="sm">
					Login
				</Button>
				<Button variant="primary" size="sm">
					Sign Up
				</Button>
			</div>
		)
	}
}

export const FullFeatured: Story = {
	args: {
		logo: <span style={{ fontSize: '1.5rem' }}>🚀</span>,
		title: 'My Application',
		children: (
			<nav style={{ display: 'flex', gap: '1.5rem' }}>
				<a href="/" style={{ color: '#e0e0e0', textDecoration: 'none' }}>
					Home
				</a>
				<a href="/products" style={{ color: '#e0e0e0', textDecoration: 'none' }}>
					Products
				</a>
				<a href="/about" style={{ color: '#e0e0e0', textDecoration: 'none' }}>
					About
				</a>
				<a href="/contact" style={{ color: '#e0e0e0', textDecoration: 'none' }}>
					Contact
				</a>
			</nav>
		),
		actions: (
			<div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
				<span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Welcome, User</span>
				<Button variant="outline" size="sm">
					Logout
				</Button>
			</div>
		),
		sticky: true
	}
}

export const Sticky: Story = {
	args: {
		title: 'Sticky Header',
		sticky: true
	}
}
