import type { Meta, StoryObj } from '@storybook/react'
import { FlagIcon, availableFlags, getAllFlags } from './index'
import React from 'react'

const meta = {
	title: 'Components/FlagIcon',
	component: FlagIcon,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		flag: {
			control: 'select',
			options: availableFlags,
			description: 'The flag code to display (ISO 3166-1 alpha-2 or custom codes)'
		},
		width: {
			control: 'number',
			description: 'Width of the flag in pixels'
		},
		height: {
			control: 'number',
			description: 'Height of the flag in pixels'
		},
		rounded: {
			control: 'boolean',
			description: 'Apply rounded corners to the flag'
		},
		title: {
			control: 'text',
			description: 'Custom title/tooltip text (defaults to country name)'
		}
	}
} satisfies Meta<typeof FlagIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		flag: 'us',
		width: 32,
		height: 32,
		rounded: false
	}
}

export const Large: Story = {
	args: {
		flag: 'gb',
		width: 64,
		height: 64,
		rounded: false
	}
}

export const Rounded: Story = {
	args: {
		flag: 'fr',
		width: 48,
		height: 48,
		rounded: true
	}
}

export const Small: Story = {
	args: {
		flag: 'de',
		width: 20,
		height: 20,
		rounded: false
	}
}

export const WithCustomTitle: Story = {
	args: {
		flag: 'jp',
		width: 32,
		height: 32,
		rounded: false,
		title: 'Japan Flag'
	}
}

export const PopularCountries = {
	render: () => {
		const popularFlags = ['us', 'gb', 'fr', 'de', 'jp', 'cn', 'in', 'br', 'ca', 'au', 'es', 'it']
		return (
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
					gap: '16px',
					padding: '20px',
					maxWidth: '800px'
				}}
			>
				{popularFlags.map((flagCode) => (
					<div
						key={flagCode}
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
						<FlagIcon flag={flagCode} width={48} height={48} rounded />
						<span
							style={{
								fontSize: '11px',
								textAlign: 'center',
								color: '#6b7280',
								textTransform: 'uppercase',
								fontWeight: '600'
							}}
						>
							{flagCode}
						</span>
					</div>
				))}
			</div>
		)
	},
	parameters: {
		layout: 'fullscreen'
	}
}

export const AllFlags = {
	render: () => {
		const allFlagsData = getAllFlags()

		return (
			<div
				style={{
					padding: '20px',
					maxWidth: '100%'
				}}
			>
				<div
					style={{
						marginBottom: '20px',
						padding: '16px',
						backgroundColor: '#f9fafb',
						borderRadius: '8px',
						border: '1px solid #e5e7eb'
					}}
				>
					<h2 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600', color: '#111827' }}>
						All Flags ({allFlagsData.length})
					</h2>
					<p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
						Complete collection of flag icons available in this component
					</p>
				</div>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
						gap: '12px',
						maxHeight: '80vh',
						overflow: 'auto',
						padding: '4px'
					}}
				>
					{allFlagsData.map((flag) => (
						<div
							key={flag.code}
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: '8px',
								padding: '12px',
								border: '1px solid #e5e7eb',
								borderRadius: '8px',
								transition: 'all 0.2s',
								cursor: 'pointer',
								backgroundColor: '#ffffff'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = '#f9fafb'
								e.currentTarget.style.borderColor = '#4338ca'
								e.currentTarget.style.transform = 'translateY(-2px)'
								e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = '#ffffff'
								e.currentTarget.style.borderColor = '#e5e7eb'
								e.currentTarget.style.transform = 'translateY(0)'
								e.currentTarget.style.boxShadow = 'none'
							}}
						>
							<FlagIcon flag={flag.code} width={64} height={48} rounded />
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: '2px',
									width: '100%'
								}}
							>
								<span
									style={{
										fontSize: '10px',
										color: '#9ca3af',
										textTransform: 'uppercase',
										fontWeight: '600',
										letterSpacing: '0.5px'
									}}
								>
									{flag.code}
								</span>
								<span
									style={{
										fontSize: '12px',
										textAlign: 'center',
										color: '#374151',
										fontWeight: '500',
										lineHeight: '1.3',
										wordBreak: 'break-word',
										width: '100%'
									}}
								>
									{flag.name}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		)
	},
	parameters: {
		layout: 'fullscreen'
	}
}

export const FlagSizes = {
	render: () => {
		const sizes = [
			{ width: 16, height: 16, label: 'Extra Small' },
			{ width: 24, height: 24, label: 'Small' },
			{ width: 32, height: 32, label: 'Medium' },
			{ width: 48, height: 48, label: 'Large' },
			{ width: 64, height: 64, label: 'Extra Large' },
			{ width: 96, height: 96, label: 'Huge' }
		]

		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '24px',
					padding: '20px',
					maxWidth: '800px'
				}}
			>
				{sizes.map((size) => (
					<div
						key={size.label}
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '16px',
							padding: '16px',
							border: '1px solid #e5e7eb',
							borderRadius: '8px'
						}}
					>
						<FlagIcon flag="us" width={size.width} height={size.height} rounded />
						<div>
							<div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{size.label}</div>
							<div style={{ fontSize: '12px', color: '#6b7280' }}>
								{size.width}×{size.height}px
							</div>
						</div>
					</div>
				))}
			</div>
		)
	},
	parameters: {
		layout: 'centered'
	}
}

export const RegionalFlags = {
	render: () => {
		const regions = {
			Europe: ['gb', 'fr', 'de', 'it', 'es', 'nl', 'se', 'no', 'fi', 'pl', 'gr', 'pt'],
			Asia: ['cn', 'jp', 'in', 'kr', 'th', 'vn', 'id', 'ph', 'sg', 'my', 'pk', 'bd'],
			Americas: ['us', 'ca', 'br', 'mx', 'ar', 'cl', 'co', 'pe', 'uy', 've'],
			Africa: ['za', 'eg', 'ng', 'ke', 'gh', 'et', 'tz', 'ug', 'ma', 'dz'],
			Oceania: ['au', 'nz', 'fj', 'pg', 'ws', 'to']
		}

		return (
			<div style={{ padding: '20px', maxWidth: '1200px' }}>
				{Object.entries(regions).map(([region, flags]) => (
					<div key={region} style={{ marginBottom: '32px' }}>
						<h3
							style={{
								fontSize: '16px',
								fontWeight: '600',
								marginBottom: '12px',
								color: '#111827',
								paddingBottom: '8px',
								borderBottom: '2px solid #e5e7eb'
							}}
						>
							{region}
						</h3>
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
								gap: '12px'
							}}
						>
							{flags.map((flagCode) => (
								<div
									key={flagCode}
									style={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										gap: '6px',
										padding: '10px',
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
									<FlagIcon flag={flagCode} width={40} height={40} rounded />
									<span
										style={{
											fontSize: '10px',
											color: '#6b7280',
											textTransform: 'uppercase',
											fontWeight: '600'
										}}
									>
										{flagCode}
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
