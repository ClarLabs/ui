import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Tabs } from './index'

const meta = {
	title: 'Components/Tabs',
	component: Tabs,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'pills', 'underline']
		},
		fullWidth: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

// Sample icons for demonstration
const HomeIcon = () => (
	<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
		<path d="M8 1l6 6v7H2V7l6-6zm0 2.5L3 8v5h10V8L8 3.5z" />
	</svg>
)

const UserIcon = () => (
	<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
		<path d="M8 8a3 3 0 100-6 3 3 0 000 6zm0 1c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
	</svg>
)

const SettingsIcon = () => (
	<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
		<path d="M8 10a2 2 0 100-4 2 2 0 000 4zm6.5-2c0 .34-.03.67-.08 1l1.5 1.2-1.5 2.6-1.8-.7c-.5.4-1.1.7-1.7.9l-.3 1.9h-3l-.3-1.9c-.6-.2-1.2-.5-1.7-.9l-1.8.7L2.1 10.2l1.5-1.2A6 6 0 013.5 8c0-.34.03-.67.08-1L2.1 5.8l1.5-2.6 1.8.7c.5-.4 1.1-.7 1.7-.9L7.4 1h3l.3 1.9c.6.2 1.2.5 1.7.9l1.8-.7 1.5 2.6-1.5 1.2c.05.33.08.66.08 1z" />
	</svg>
)

const basicItems = [
	{
		id: 'tab1',
		label: 'Tab 1',
		content: <div style={{ padding: '20px' }}>Content for Tab 1</div>
	},
	{
		id: 'tab2',
		label: 'Tab 2',
		content: <div style={{ padding: '20px' }}>Content for Tab 2</div>
	},
	{
		id: 'tab3',
		label: 'Tab 3',
		content: <div style={{ padding: '20px' }}>Content for Tab 3</div>
	}
]

export const Default: Story = {
	args: {
		items: basicItems,
		variant: 'default'
	}
}

export const Pills: Story = {
	args: {
		items: basicItems,
		variant: 'pills'
	}
}

export const Underline: Story = {
	args: {
		items: basicItems,
		variant: 'underline'
	}
}

export const WithIcons: Story = {
	args: {
		items: [
			{
				id: 'home',
				label: 'Home',
				icon: <HomeIcon />,
				content: (
					<div style={{ padding: '20px' }}>
						<h3>Home</h3>
						<p>Welcome to the home tab with an icon.</p>
					</div>
				)
			},
			{
				id: 'profile',
				label: 'Profile',
				icon: <UserIcon />,
				content: (
					<div style={{ padding: '20px' }}>
						<h3>Profile</h3>
						<p>View and edit your profile information.</p>
					</div>
				)
			},
			{
				id: 'settings',
				label: 'Settings',
				icon: <SettingsIcon />,
				content: (
					<div style={{ padding: '20px' }}>
						<h3>Settings</h3>
						<p>Manage your account settings and preferences.</p>
					</div>
				)
			}
		],
		variant: 'default'
	}
}

export const WithIconsPills: Story = {
	args: {
		items: [
			{
				id: 'home',
				label: 'Home',
				icon: <HomeIcon />,
				content: (
					<div style={{ padding: '20px' }}>
						<h3>Home</h3>
						<p>Welcome to the home tab with an icon.</p>
					</div>
				)
			},
			{
				id: 'profile',
				label: 'Profile',
				icon: <UserIcon />,
				content: (
					<div style={{ padding: '20px' }}>
						<h3>Profile</h3>
						<p>View and edit your profile information.</p>
					</div>
				)
			},
			{
				id: 'settings',
				label: 'Settings',
				icon: <SettingsIcon />,
				content: (
					<div style={{ padding: '20px' }}>
						<h3>Settings</h3>
						<p>Manage your account settings and preferences.</p>
					</div>
				)
			}
		],
		variant: 'pills'
	}
}

export const WithDisabledTab: Story = {
	args: {
		items: [
			{
				id: 'tab1',
				label: 'Active Tab',
				content: <div style={{ padding: '20px' }}>This tab is active and clickable.</div>
			},
			{
				id: 'tab2',
				label: 'Disabled Tab',
				content: <div style={{ padding: '20px' }}>This content should not be visible.</div>,
				disabled: true
			},
			{
				id: 'tab3',
				label: 'Another Active Tab',
				content: <div style={{ padding: '20px' }}>This tab is also active and clickable.</div>
			}
		],
		variant: 'default'
	}
}

export const FullWidth: Story = {
	args: {
		items: basicItems,
		variant: 'default',
		fullWidth: true
	}
}

export const FullWidthPills: Story = {
	args: {
		items: basicItems,
		variant: 'pills',
		fullWidth: true
	}
}

export const FullWidthUnderline: Story = {
	args: {
		items: basicItems,
		variant: 'underline',
		fullWidth: true
	}
}

export const WithRichContent: Story = {
	args: {
		items: [
			{
				id: 'overview',
				label: 'Overview',
				content: (
					<div style={{ padding: '24px' }}>
						<h2 style={{ marginTop: 0 }}>Project Overview</h2>
						<p>This is a comprehensive overview of the project with rich content including text, lists, and more.</p>
						<ul>
							<li>Feature 1: Advanced component library</li>
							<li>Feature 2: TypeScript support</li>
							<li>Feature 3: Customizable themes</li>
						</ul>
					</div>
				)
			},
			{
				id: 'details',
				label: 'Details',
				content: (
					<div style={{ padding: '24px' }}>
						<h2 style={{ marginTop: 0 }}>Detailed Information</h2>
						<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
							<div style={{ padding: '16px', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
								<h4 style={{ marginTop: 0 }}>Statistics</h4>
								<p>Active Users: 1,234</p>
								<p>Total Projects: 56</p>
							</div>
							<div style={{ padding: '16px', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
								<h4 style={{ marginTop: 0 }}>Performance</h4>
								<p>Response Time: 120ms</p>
								<p>Uptime: 99.9%</p>
							</div>
						</div>
					</div>
				)
			},
			{
				id: 'documentation',
				label: 'Documentation',
				content: (
					<div style={{ padding: '24px' }}>
						<h2 style={{ marginTop: 0 }}>Documentation</h2>
						<p>Access comprehensive documentation for all features:</p>
						<div style={{ marginTop: '16px' }}>
							<h3>Getting Started</h3>
							<p>Learn how to install and configure the component library.</p>
							<code
								style={{
									display: 'block',
									padding: '12px',
									backgroundColor: '#f5f5f5',
									borderRadius: '4px',
									marginTop: '8px'
								}}
							>
								npm install @clarlabs/ui
							</code>
						</div>
					</div>
				)
			}
		],
		variant: 'underline',
		defaultActiveId: 'overview'
	}
}

export const WithDefaultActive: Story = {
	args: {
		items: basicItems,
		variant: 'pills',
		defaultActiveId: 'tab2'
	}
}

export const ManyTabs: Story = {
	args: {
		items: [
			{ id: 'tab1', label: 'Tab 1', content: <div style={{ padding: '20px' }}>Content 1</div> },
			{ id: 'tab2', label: 'Tab 2', content: <div style={{ padding: '20px' }}>Content 2</div> },
			{ id: 'tab3', label: 'Tab 3', content: <div style={{ padding: '20px' }}>Content 3</div> },
			{ id: 'tab4', label: 'Tab 4', content: <div style={{ padding: '20px' }}>Content 4</div> },
			{ id: 'tab5', label: 'Tab 5', content: <div style={{ padding: '20px' }}>Content 5</div> },
			{ id: 'tab6', label: 'Tab 6', content: <div style={{ padding: '20px' }}>Content 6</div> },
			{ id: 'tab7', label: 'Tab 7', content: <div style={{ padding: '20px' }}>Content 7</div> }
		],
		variant: 'default'
	}
}
