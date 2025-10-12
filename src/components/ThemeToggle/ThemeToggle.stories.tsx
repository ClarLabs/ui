import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { ThemeToggle } from './index'

const meta = {
	title: 'Components/ThemeToggle',
	component: ThemeToggle,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		defaultTheme: {
			control: 'select',
			options: ['light', 'dark'],
			description: 'Default theme when no saved preference exists'
		},
		onThemeChange: {
			action: 'themeChanged',
			description: 'Callback fired when theme changes'
		}
	}
} satisfies Meta<typeof ThemeToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {}
}

export const LightMode: Story = {
	args: {
		defaultTheme: 'light'
	}
}

export const DarkMode: Story = {
	args: {
		defaultTheme: 'dark'
	}
}

export const WithCallback: Story = {
	render: () => {
		const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark')

		return (
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
				<ThemeToggle onThemeChange={(theme) => setCurrentTheme(theme)} />
				<p style={{ color: '#e0e0e0', fontSize: '0.875rem' }}>Current theme: {currentTheme}</p>
			</div>
		)
	}
}

export const InHeader: Story = {
	render: () => (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				padding: '1rem 2rem',
				background: 'rgba(60, 60, 70, 0.95)',
				borderRadius: '0.5rem',
				minWidth: '600px',
				border: '1px solid rgba(255, 255, 255, 0.1)'
			}}
		>
			<h2 style={{ margin: 0, color: '#e0e0e0', fontSize: '1.25rem' }}>Application Header</h2>
			<ThemeToggle />
		</div>
	)
}

export const InToolbar: Story = {
	render: () => (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: '0.5rem',
				padding: '0.5rem',
				background: 'rgba(60, 60, 70, 0.95)',
				borderRadius: '0.5rem',
				border: '1px solid rgba(255, 255, 255, 0.1)'
			}}
		>
			<button
				style={{
					padding: '0.5rem',
					background: 'transparent',
					border: 'none',
					color: '#e0e0e0',
					cursor: 'pointer',
					borderRadius: '0.25rem'
				}}
			>
				File
			</button>
			<button
				style={{
					padding: '0.5rem',
					background: 'transparent',
					border: 'none',
					color: '#e0e0e0',
					cursor: 'pointer',
					borderRadius: '0.25rem'
				}}
			>
				Edit
			</button>
			<button
				style={{
					padding: '0.5rem',
					background: 'transparent',
					border: 'none',
					color: '#e0e0e0',
					cursor: 'pointer',
					borderRadius: '0.25rem'
				}}
			>
				View
			</button>
			<div style={{ marginLeft: 'auto' }}>
				<ThemeToggle />
			</div>
		</div>
	)
}

export const Multiple: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
			<ThemeToggle />
			<ThemeToggle />
			<ThemeToggle />
		</div>
	)
}

export const WithCustomStyles: Story = {
	render: () => (
		<ThemeToggle
			style={{
				width: '4rem',
				height: '4rem',
				boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
			}}
		/>
	)
}

export const AnimationDemo: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
			<p style={{ color: '#e0e0e0', textAlign: 'center', maxWidth: '400px' }}>
				Click the toggle to see the smooth sun-to-moon animation with rotation and scale effects
			</p>
			<ThemeToggle />
		</div>
	)
}
