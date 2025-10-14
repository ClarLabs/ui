import type { Meta, StoryObj } from '@storybook/react'
import { AnimatedIcon, availableIcons } from './index'
import React from 'react'

const meta = {
	title: 'Components/AnimatedIcon',
	component: AnimatedIcon,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		icon: {
			control: 'select',
			options: availableIcons,
			description: 'The icon to display from line-md icon set'
		},
		width: {
			control: 'number',
			description: 'Width of the icon in pixels'
		},
		height: {
			control: 'number',
			description: 'Height of the icon in pixels'
		},
		duration: {
			control: 'number',
			description: 'Animation duration multiplier'
		},
		disableAnimation: {
			control: 'boolean',
			description: 'Disable the icon animation'
		},
		color: {
			control: 'color',
			description: 'Icon color'
		},
		strokeWidth: {
			control: 'number',
			description: 'Stroke width of the icon'
		}
	}
} satisfies Meta<typeof AnimatedIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		icon: 'account',
		width: 24,
		height: 24,
		duration: 1,
		disableAnimation: false,
		color: '#4338ca',
		strokeWidth: 2
	}
}

export const Large: Story = {
	args: {
		icon: 'bell',
		width: 48,
		height: 48,
		duration: 1,
		disableAnimation: false,
		color: '#4338ca',
		strokeWidth: 2
	}
}

export const CustomColor: Story = {
	args: {
		icon: 'heart',
		width: 32,
		height: 32,
		duration: 1,
		disableAnimation: false,
		color: '#ef4444',
		strokeWidth: 2
	}
}

export const SlowAnimation: Story = {
	args: {
		icon: 'loading',
		width: 32,
		height: 32,
		duration: 2,
		disableAnimation: false,
		color: '#4338ca',
		strokeWidth: 2
	}
}

export const NoAnimation: Story = {
	args: {
		icon: 'check',
		width: 32,
		height: 32,
		duration: 1,
		disableAnimation: true,
		color: '#22c55e',
		strokeWidth: 2
	}
}

export const ThickStroke: Story = {
	args: {
		icon: 'menu',
		width: 32,
		height: 32,
		duration: 1,
		disableAnimation: false,
		color: '#4338ca',
		strokeWidth: 3
	}
}

export const AllIcons = {
	render: () => (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
				gap: '16px',
				padding: '20px',
				maxWidth: '1200px',
				maxHeight: '80vh',
				overflow: 'auto'
			}}
		>
			{availableIcons.map((iconName) => (
				<div
					key={iconName}
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: '8px',
						padding: '12px',
						border: '1px solid #e5e7eb',
						borderRadius: '8px',
						transition: 'all 0.2s',
						cursor: 'pointer'
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.backgroundColor = '#f9fafb'
						e.currentTarget.style.borderColor = '#4338ca'
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.backgroundColor = 'transparent'
						e.currentTarget.style.borderColor = '#e5e7eb'
					}}
				>
					<AnimatedIcon icon={iconName} width={32} height={32} color="#4338ca" />
					<span
						style={{
							fontSize: '10px',
							textAlign: 'center',
							wordBreak: 'break-word',
							color: '#6b7280',
							lineHeight: '1.2'
						}}
					>
						{iconName}
					</span>
				</div>
			))}
		</div>
	),
	parameters: {
		layout: 'fullscreen'
	}
}

export const IconCategories = {
	render: () => {
		// Group icons by category based on their prefix
		const categories: Record<string, string[]> = {}
		availableIcons.forEach((iconName) => {
			const prefix = iconName.split('-')[0]
			if (!categories[prefix]) {
				categories[prefix] = []
			}
			categories[prefix].push(iconName)
		})

		return (
			<div style={{ padding: '20px', maxWidth: '1200px' }}>
				{Object.entries(categories)
					.sort(([a], [b]) => a.localeCompare(b))
					.map(([category, icons]) => (
						<div key={category} style={{ marginBottom: '40px' }}>
							<h3
								style={{
									fontSize: '18px',
									fontWeight: '600',
									marginBottom: '16px',
									color: '#111827',
									textTransform: 'capitalize'
								}}
							>
								{category} ({icons.length})
							</h3>
							<div
								style={{
									display: 'grid',
									gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
									gap: '12px'
								}}
							>
								{icons.map((iconName) => (
									<div
										key={iconName}
										style={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											gap: '8px',
											padding: '12px',
											border: '1px solid #e5e7eb',
											borderRadius: '8px',
											transition: 'all 0.2s',
											cursor: 'pointer'
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.backgroundColor = '#f9fafb'
											e.currentTarget.style.borderColor = '#4338ca'
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.backgroundColor = 'transparent'
											e.currentTarget.style.borderColor = '#e5e7eb'
										}}
									>
										<AnimatedIcon icon={iconName} width={28} height={28} color="#4338ca" />
										<span
											style={{
												fontSize: '9px',
												textAlign: 'center',
												wordBreak: 'break-word',
												color: '#6b7280',
												lineHeight: '1.2'
											}}
										>
											{iconName.replace(`${category}-`, '')}
										</span>
									</div>
								))}
							</div>
						</div>
					))}
			</div>
		)
	},
	parameters: {
		layout: 'fullscreen'
	}
}
