import type { Meta, StoryObj } from '@storybook/react'
import React, { useState, useEffect } from 'react'
import { Gauge } from './index'

const meta = {
	title: 'Components/Gauge',
	component: Gauge,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: { type: 'range', min: 0, max: 100, step: 1 }
		},
		min: {
			control: 'number'
		},
		max: {
			control: 'number'
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg', 'xl']
		},
		variant: {
			control: 'select',
			options: ['default', 'success', 'warning', 'error', 'info']
		},
		thickness: {
			control: { type: 'range', min: 4, max: 20, step: 1 }
		},
		showValue: {
			control: 'boolean'
		},
		showMinMax: {
			control: 'boolean'
		},
		animate: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof Gauge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		value: 65
	}
}

export const WithLabel: Story = {
	args: {
		value: 75,
		label: 'Progress'
	}
}

export const WithUnit: Story = {
	args: {
		value: 68,
		label: 'CPU Usage',
		unit: '%'
	}
}

export const Small: Story = {
	args: {
		value: 45,
		size: 'sm',
		label: 'Small'
	}
}

export const Medium: Story = {
	args: {
		value: 65,
		size: 'md',
		label: 'Medium'
	}
}

export const Large: Story = {
	args: {
		value: 80,
		size: 'lg',
		label: 'Large'
	}
}

export const ExtraLarge: Story = {
	args: {
		value: 90,
		size: 'xl',
		label: 'Extra Large'
	}
}

export const Success: Story = {
	args: {
		value: 85,
		variant: 'success',
		label: 'Success',
		unit: '%'
	}
}

export const Warning: Story = {
	args: {
		value: 60,
		variant: 'warning',
		label: 'Warning',
		unit: '%'
	}
}

export const Error: Story = {
	args: {
		value: 25,
		variant: 'error',
		label: 'Error',
		unit: '%'
	}
}

export const Info: Story = {
	args: {
		value: 50,
		variant: 'info',
		label: 'Info',
		unit: '%'
	}
}

export const WithMinMax: Story = {
	args: {
		value: 65,
		min: 0,
		max: 100,
		showMinMax: true,
		label: 'Progress'
	}
}

export const CustomRange: Story = {
	args: {
		value: 150,
		min: 0,
		max: 200,
		showMinMax: true,
		label: 'Score'
	}
}

export const ThickGauge: Story = {
	args: {
		value: 75,
		thickness: 18,
		label: 'Thick'
	}
}

export const ThinGauge: Story = {
	args: {
		value: 75,
		thickness: 6,
		label: 'Thin'
	}
}

export const NoAnimation: Story = {
	args: {
		value: 80,
		animate: false,
		label: 'No Animation'
	}
}

export const FullCircle: Story = {
	args: {
		value: 75,
		startAngle: 0,
		endAngle: 360,
		label: 'Full Circle',
		unit: '%'
	}
}

export const HalfCircle: Story = {
	args: {
		value: 60,
		startAngle: -180,
		endAngle: 0,
		label: 'Half Circle',
		unit: '%'
	}
}

export const CustomFormatter: Story = {
	args: {
		value: 3450,
		min: 0,
		max: 10000,
		valueFormatter: (value) => `$${(value / 1000).toFixed(1)}k`,
		label: 'Revenue',
		showMinMax: true
	}
}

export const Interactive: Story = {
	render: () => {
		const [value, setValue] = useState(50)

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
				<Gauge value={value} label="Adjust Me" unit="%" showMinMax />

				<div style={{ width: '300px' }}>
					<input
						type="range"
						min="0"
						max="100"
						value={value}
						onChange={(e) => setValue(Number(e.target.value))}
						style={{ width: '100%' }}
					/>
					<p style={{ textAlign: 'center', color: '#e0e0e0', marginTop: '0.5rem' }}>
						Value: {value}%
					</p>
				</div>
			</div>
		)
	}
}

export const AnimatedProgress: Story = {
	render: () => {
		const [value, setValue] = useState(0)

		useEffect(() => {
			const interval = setInterval(() => {
				setValue((prev) => {
					if (prev >= 100) return 0
					return prev + 1
				})
			}, 50)

			return () => clearInterval(interval)
		}, [])

		return <Gauge value={value} label="Loading" unit="%" size="lg" />
	}
}

export const Dashboard: Story = {
	render: () => {
		const [metrics, setMetrics] = useState({
			cpu: 45,
			memory: 62,
			disk: 78,
			network: 35
		})

		useEffect(() => {
			const interval = setInterval(() => {
				setMetrics({
					cpu: Math.random() * 100,
					memory: 40 + Math.random() * 40,
					disk: 60 + Math.random() * 30,
					network: Math.random() * 60
				})
			}, 2000)

			return () => clearInterval(interval)
		}, [])

		const getVariant = (value: number) => {
			if (value < 50) return 'success'
			if (value < 75) return 'warning'
			return 'error'
		}

		return (
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(2, 1fr)',
					gap: '2rem',
					padding: '2rem',
					background: 'rgba(255, 255, 255, 0.05)',
					border: '1px solid rgba(255, 255, 255, 0.2)',
					borderRadius: '0.75rem'
				}}
			>
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
					<Gauge
						value={metrics.cpu}
						variant={getVariant(metrics.cpu)}
						label="CPU"
						unit="%"
						size="md"
						showMinMax
					/>
				</div>

				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
					<Gauge
						value={metrics.memory}
						variant={getVariant(metrics.memory)}
						label="Memory"
						unit="%"
						size="md"
						showMinMax
					/>
				</div>

				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
					<Gauge
						value={metrics.disk}
						variant={getVariant(metrics.disk)}
						label="Disk"
						unit="%"
						size="md"
						showMinMax
					/>
				</div>

				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
					<Gauge
						value={metrics.network}
						variant={getVariant(metrics.network)}
						label="Network"
						unit="%"
						size="md"
						showMinMax
					/>
				</div>
			</div>
		)
	}
}

export const PerformanceMetrics: Story = {
	render: () => {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '2rem',
					padding: '2rem',
					background: 'rgba(255, 255, 255, 0.05)',
					border: '1px solid rgba(255, 255, 255, 0.2)',
					borderRadius: '0.75rem',
					maxWidth: '800px'
				}}
			>
				<h2 style={{ color: '#c7d2fe', fontSize: '1.5rem', fontWeight: 'bold' }}>
					Performance Metrics
				</h2>

				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem' }}>
					<Gauge value={92} variant="success" label="Uptime" unit="%" size="md" />
					<Gauge value={88} variant="success" label="Response Time" size="md" />
					<Gauge value={65} variant="warning" label="Load" unit="%" size="md" />
					<Gauge value={45} variant="success" label="Errors" size="md" />
				</div>
			</div>
		)
	}
}

export const BatteryLevel: Story = {
	render: () => {
		const [battery, setBattery] = useState(85)

		useEffect(() => {
			const interval = setInterval(() => {
				setBattery((prev) => Math.max(0, prev - 1))
			}, 1000)

			return () => clearInterval(interval)
		}, [])

		const getVariant = () => {
			if (battery > 50) return 'success'
			if (battery > 20) return 'warning'
			return 'error'
		}

		return (
			<div
				style={{
					padding: '2rem',
					background: 'rgba(255, 255, 255, 0.05)',
					border: '1px solid rgba(255, 255, 255, 0.2)',
					borderRadius: '0.75rem',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '1rem'
				}}
			>
				<Gauge
					value={battery}
					variant={getVariant()}
					label="Battery"
					unit="%"
					size="lg"
					showMinMax
				/>
				<p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
					{battery > 20 ? 'Battery level is ' : 'Low battery! '}
					{battery > 0 ? 'draining...' : 'Empty'}
				</p>
			</div>
		)
	}
}

export const CompareSizes: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
			<Gauge value={75} size="sm" label="Small" unit="%" />
			<Gauge value={75} size="md" label="Medium" unit="%" />
			<Gauge value={75} size="lg" label="Large" unit="%" />
			<Gauge value={75} size="xl" label="XL" unit="%" />
		</div>
	)
}

export const CompareVariants: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
			<Gauge value={75} variant="default" label="Default" unit="%" />
			<Gauge value={75} variant="success" label="Success" unit="%" />
			<Gauge value={75} variant="warning" label="Warning" unit="%" />
			<Gauge value={75} variant="error" label="Error" unit="%" />
			<Gauge value={75} variant="info" label="Info" unit="%" />
		</div>
	)
}

export const SpeedMeter: Story = {
	render: () => {
		const [speed, setSpeed] = useState(0)

		useEffect(() => {
			const interval = setInterval(() => {
				setSpeed(Math.random() * 120)
			}, 1500)

			return () => clearInterval(interval)
		}, [])

		const getVariant = () => {
			if (speed < 60) return 'success'
			if (speed < 90) return 'warning'
			return 'error'
		}

		return (
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
				<Gauge
					value={speed}
					min={0}
					max={120}
					variant={getVariant()}
					label="Speed"
					unit=" km/h"
					size="xl"
					showMinMax
					thickness={16}
				/>
				<p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
					{speed < 60 ? 'Safe speed' : speed < 90 ? 'Moderate speed' : 'High speed!'}
				</p>
			</div>
		)
	}
}
