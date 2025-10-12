import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { ColorPicker } from './index'

const meta = {
	title: 'Components/ColorPicker',
	component: ColorPicker,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs'],
	argTypes: {
		format: {
			control: 'select',
			options: ['hex', 'rgb', 'hsl']
		},
		disabled: {
			control: 'boolean'
		},
		showPresets: {
			control: 'boolean'
		},
		showAlpha: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof ColorPicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		defaultValue: '#6366f1'
	}
}

export const WithLabel: Story = {
	args: {
		label: 'Choose a color',
		defaultValue: '#ef4444'
	}
}

export const HexFormat: Story = {
	args: {
		label: 'Hex Format',
		format: 'hex',
		defaultValue: '#22c55e'
	}
}

export const RgbFormat: Story = {
	args: {
		label: 'RGB Format',
		format: 'rgb',
		defaultValue: '#3b82f6'
	}
}

export const HslFormat: Story = {
	args: {
		label: 'HSL Format',
		format: 'hsl',
		defaultValue: '#a855f7'
	}
}

export const WithHelperText: Story = {
	args: {
		label: 'Brand Color',
		helperText: 'Select your primary brand color',
		defaultValue: '#6366f1'
	}
}

export const WithError: Story = {
	args: {
		label: 'Color Selection',
		error: 'This color is not allowed',
		defaultValue: '#ef4444'
	}
}

export const Disabled: Story = {
	args: {
		label: 'Disabled',
		disabled: true,
		defaultValue: '#8b5cf6'
	}
}

export const NoPresets: Story = {
	args: {
		label: 'Without Presets',
		showPresets: false,
		defaultValue: '#f59e0b'
	}
}

export const CustomPresets: Story = {
	args: {
		label: 'Custom Presets',
		presets: [
			'#1e293b',
			'#334155',
			'#475569',
			'#64748b',
			'#94a3b8',
			'#cbd5e1',
			'#e2e8f0',
			'#f1f5f9',
			'#f8fafc',
			'#ffffff'
		],
		defaultValue: '#475569'
	}
}

export const Interactive: Story = {
	render: () => {
		const [color, setColor] = useState('#6366f1')

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
				<ColorPicker label="Choose a color" value={color} onChange={setColor} />

				<div
					style={{
						padding: '2rem',
						background: color,
						border: '2px solid rgba(255, 255, 255, 0.2)',
						borderRadius: '0.5rem',
						textAlign: 'center',
						color: '#ffffff',
						fontWeight: 'bold',
						textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
					}}
				>
					Current Color: {color}
				</div>
			</div>
		)
	}
}

export const ThemeCustomizer: Story = {
	render: () => {
		const [colors, setColors] = useState({
			primary: '#6366f1',
			secondary: '#8b5cf6',
			accent: '#ec4899',
			background: '#1e293b'
		})

		return (
			<div
				style={{
					padding: '2rem',
					background: 'rgba(255, 255, 255, 0.05)',
					border: '1px solid rgba(255, 255, 255, 0.2)',
					borderRadius: '0.75rem',
					maxWidth: '600px'
				}}
			>
				<h3 style={{ color: '#c7d2fe', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
					Theme Customizer
				</h3>

				<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
					<ColorPicker
						label="Primary Color"
						value={colors.primary}
						onChange={(value) => setColors({ ...colors, primary: value })}
					/>
					<ColorPicker
						label="Secondary Color"
						value={colors.secondary}
						onChange={(value) => setColors({ ...colors, secondary: value })}
					/>
					<ColorPicker
						label="Accent Color"
						value={colors.accent}
						onChange={(value) => setColors({ ...colors, accent: value })}
					/>
					<ColorPicker
						label="Background Color"
						value={colors.background}
						onChange={(value) => setColors({ ...colors, background: value })}
					/>
				</div>

				<div
					style={{
						padding: '1.5rem',
						background: colors.background,
						borderRadius: '0.5rem',
						border: '1px solid rgba(255, 255, 255, 0.1)'
					}}
				>
					<h4 style={{ color: colors.primary, marginBottom: '0.5rem' }}>Preview</h4>
					<p style={{ color: colors.secondary, marginBottom: '1rem', fontSize: '0.875rem' }}>
						This is how your theme will look
					</p>
					<button
						style={{
							padding: '0.5rem 1rem',
							background: colors.accent,
							border: 'none',
							borderRadius: '0.375rem',
							color: '#ffffff',
							fontWeight: 'bold',
							cursor: 'pointer'
						}}
					>
						Action Button
					</button>
				</div>
			</div>
		)
	}
}

export const BrandColors: Story = {
	render: () => {
		const [brandColors, setBrandColors] = useState({
			primary: '#6366f1',
			secondary: '#8b5cf6',
			success: '#22c55e',
			warning: '#f59e0b',
			error: '#ef4444'
		})

		return (
			<div
				style={{
					padding: '2rem',
					background: 'rgba(255, 255, 255, 0.05)',
					border: '1px solid rgba(255, 255, 255, 0.2)',
					borderRadius: '0.75rem',
					maxWidth: '600px'
				}}
			>
				<h3 style={{ color: '#c7d2fe', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
					Brand Color Palette
				</h3>

				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
					{Object.entries(brandColors).map(([key, value]) => (
						<div key={key}>
							<ColorPicker
								label={key.charAt(0).toUpperCase() + key.slice(1)}
								value={value}
								onChange={(newValue) => setBrandColors({ ...brandColors, [key]: newValue })}
							/>
						</div>
					))}
				</div>

				<div
					style={{
						marginTop: '2rem',
						display: 'flex',
						gap: '0.5rem',
						flexWrap: 'wrap'
					}}
				>
					{Object.entries(brandColors).map(([key, value]) => (
						<div
							key={key}
							style={{
								flex: '1 1 100px',
								height: '80px',
								background: value,
								borderRadius: '0.5rem',
								display: 'flex',
								alignItems: 'flex-end',
								padding: '0.5rem',
								color: '#ffffff',
								fontSize: '0.75rem',
								fontWeight: 'bold',
								textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
							}}
						>
							{key}
						</div>
					))}
				</div>
			</div>
		)
	}
}

export const UIElementColors: Story = {
	render: () => {
		const [buttonColor, setButtonColor] = useState('#6366f1')
		const [textColor, setTextColor] = useState('#e0e0e0')
		const [borderColor, setBorderColor] = useState('#8b5cf6')

		return (
			<div
				style={{
					padding: '2rem',
					background: 'rgba(255, 255, 255, 0.05)',
					border: '1px solid rgba(255, 255, 255, 0.2)',
					borderRadius: '0.75rem',
					maxWidth: '600px'
				}}
			>
				<h3 style={{ color: '#c7d2fe', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
					UI Element Styling
				</h3>

				<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
					<ColorPicker label="Button Background" value={buttonColor} onChange={setButtonColor} />
					<ColorPicker label="Text Color" value={textColor} onChange={setTextColor} />
					<ColorPicker label="Border Color" value={borderColor} onChange={setBorderColor} />
				</div>

				<div
					style={{
						padding: '2rem',
						background: 'rgba(0, 0, 0, 0.2)',
						borderRadius: '0.5rem',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: '1rem'
					}}
				>
					<h4 style={{ color: textColor }}>Preview</h4>
					<button
						style={{
							padding: '0.75rem 1.5rem',
							background: buttonColor,
							border: `2px solid ${borderColor}`,
							borderRadius: '0.5rem',
							color: textColor,
							fontWeight: 'bold',
							cursor: 'pointer'
						}}
					>
						Custom Button
					</button>
				</div>
			</div>
		)
	}
}

export const CompareFormats: Story = {
	render: () => {
		const [color, setColor] = useState('#6366f1')

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '300px' }}>
				<ColorPicker label="Hex Format" format="hex" value={color} onChange={setColor} />
				<ColorPicker label="RGB Format" format="rgb" value={color} onChange={setColor} />
				<ColorPicker label="HSL Format" format="hsl" value={color} onChange={setColor} />

				<div
					style={{
						padding: '1rem',
						background: color,
						borderRadius: '0.5rem',
						textAlign: 'center',
						color: '#ffffff',
						fontWeight: 'bold',
						textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
					}}
				>
					Same color, different formats
				</div>
			</div>
		)
	}
}

export const GradientBuilder: Story = {
	render: () => {
		const [color1, setColor1] = useState('#6366f1')
		const [color2, setColor2] = useState('#ec4899')

		return (
			<div
				style={{
					padding: '2rem',
					background: 'rgba(255, 255, 255, 0.05)',
					border: '1px solid rgba(255, 255, 255, 0.2)',
					borderRadius: '0.75rem',
					maxWidth: '600px'
				}}
			>
				<h3 style={{ color: '#c7d2fe', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
					Gradient Builder
				</h3>

				<div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
					<ColorPicker label="Start Color" value={color1} onChange={setColor1} />
					<ColorPicker label="End Color" value={color2} onChange={setColor2} />
				</div>

				<div
					style={{
						height: '200px',
						background: `linear-gradient(135deg, ${color1}, ${color2})`,
						borderRadius: '0.5rem',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						color: '#ffffff',
						fontSize: '1.25rem',
						fontWeight: 'bold',
						textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
					}}
				>
					Gradient Preview
				</div>

				<div
					style={{
						marginTop: '1rem',
						padding: '0.75rem',
						background: 'rgba(0, 0, 0, 0.2)',
						borderRadius: '0.375rem',
						fontFamily: 'monospace',
						fontSize: '0.75rem',
						color: '#9ca3af'
					}}
				>
					background: linear-gradient(135deg, {color1}, {color2})
				</div>
			</div>
		)
	}
}

export const WithPreview: Story = {
	render: () => {
		const [color, setColor] = useState('#6366f1')

		return (
			<div style={{ display: 'flex', gap: '2rem', alignItems: 'start' }}>
				<ColorPicker label="Select Color" value={color} onChange={setColor} />

				<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
					<div
						style={{
							width: '150px',
							height: '150px',
							background: color,
							borderRadius: '0.75rem',
							border: '2px solid rgba(255, 255, 255, 0.2)'
						}}
					/>
					<div style={{ textAlign: 'center', color: '#e0e0e0', fontSize: '0.875rem' }}>
						{color}
					</div>
				</div>
			</div>
		)
	}
}
