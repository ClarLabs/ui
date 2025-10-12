import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Skeleton } from './index'

const meta = {
	title: 'Components/Skeleton',
	component: Skeleton,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['text', 'circular', 'rectangular', 'rounded']
		},
		animation: {
			control: 'select',
			options: ['pulse', 'wave', 'none']
		},
		width: {
			control: 'text'
		},
		height: {
			control: 'text'
		},
		lines: {
			control: 'number'
		}
	}
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		variant: 'text',
		animation: 'pulse'
	}
}

export const TextSkeleton: Story = {
	args: {
		variant: 'text',
		lines: 1
	}
}

export const MultipleLines: Story = {
	args: {
		variant: 'text',
		lines: 5
	}
}

export const CircularSkeleton: Story = {
	args: {
		variant: 'circular',
		width: 60,
		height: 60
	}
}

export const RectangularSkeleton: Story = {
	args: {
		variant: 'rectangular',
		width: '100%',
		height: 200
	}
}

export const RoundedSkeleton: Story = {
	args: {
		variant: 'rounded',
		width: '100%',
		height: 200
	}
}

export const PulseAnimation: Story = {
	args: {
		variant: 'rectangular',
		width: '100%',
		height: 100,
		animation: 'pulse'
	}
}

export const WaveAnimation: Story = {
	args: {
		variant: 'rectangular',
		width: '100%',
		height: 100,
		animation: 'wave'
	}
}

export const NoAnimation: Story = {
	args: {
		variant: 'rectangular',
		width: '100%',
		height: 100,
		animation: 'none'
	}
}

export const CustomSizes: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			<Skeleton variant="text" width="30%" />
			<Skeleton variant="text" width="50%" />
			<Skeleton variant="text" width="70%" />
			<Skeleton variant="text" width="100%" />
			<Skeleton variant="rectangular" width={200} height={100} />
			<Skeleton variant="circular" width={80} height={80} />
		</div>
	)
}

export const ProfileCardSkeleton: Story = {
	render: () => (
		<div
			style={{
				background: 'rgba(255, 255, 255, 0.05)',
				backdropFilter: 'blur(10px)',
				border: '1px solid rgba(255, 255, 255, 0.2)',
				borderRadius: '0.5rem',
				padding: '1.5rem',
				maxWidth: '400px'
			}}
		>
			<div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
				<Skeleton variant="circular" width={60} height={60} />
				<div style={{ flex: 1 }}>
					<Skeleton variant="text" width="70%" height={20} />
					<div style={{ height: '0.5rem' }} />
					<Skeleton variant="text" width="50%" height={16} />
				</div>
			</div>
			<Skeleton variant="text" lines={3} />
			<div style={{ height: '1rem' }} />
			<Skeleton variant="rectangular" height={120} />
		</div>
	)
}

export const ArticleCardSkeleton: Story = {
	render: () => (
		<div
			style={{
				background: 'rgba(255, 255, 255, 0.05)',
				backdropFilter: 'blur(10px)',
				border: '1px solid rgba(255, 255, 255, 0.2)',
				borderRadius: '0.5rem',
				overflow: 'hidden',
				maxWidth: '400px'
			}}
		>
			<Skeleton variant="rectangular" height={200} animation="wave" />
			<div style={{ padding: '1.5rem' }}>
				<Skeleton variant="text" width="40%" height={14} />
				<div style={{ height: '0.75rem' }} />
				<Skeleton variant="text" width="90%" height={24} />
				<div style={{ height: '0.5rem' }} />
				<Skeleton variant="text" lines={3} />
				<div style={{ height: '1rem' }} />
				<div style={{ display: 'flex', gap: '0.5rem' }}>
					<Skeleton variant="rounded" width={80} height={32} />
					<Skeleton variant="rounded" width={80} height={32} />
				</div>
			</div>
		</div>
	)
}

export const ListSkeleton: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			{Array.from({ length: 5 }, (_, i) => (
				<div
					key={i}
					style={{
						display: 'flex',
						gap: '1rem',
						padding: '1rem',
						background: 'rgba(255, 255, 255, 0.05)',
						backdropFilter: 'blur(10px)',
						border: '1px solid rgba(255, 255, 255, 0.2)',
						borderRadius: '0.5rem'
					}}
				>
					<Skeleton variant="circular" width={50} height={50} />
					<div style={{ flex: 1 }}>
						<Skeleton variant="text" width="60%" height={18} />
						<div style={{ height: '0.5rem' }} />
						<Skeleton variant="text" width="90%" height={14} />
						<div style={{ height: '0.25rem' }} />
						<Skeleton variant="text" width="40%" height={14} />
					</div>
				</div>
			))}
		</div>
	)
}

export const TableSkeleton: Story = {
	render: () => (
		<div
			style={{
				background: 'rgba(255, 255, 255, 0.05)',
				backdropFilter: 'blur(10px)',
				border: '1px solid rgba(255, 255, 255, 0.2)',
				borderRadius: '0.5rem',
				overflow: 'hidden'
			}}
		>
			{/* Table Header */}
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '2fr 1fr 1fr 1fr',
					gap: '1rem',
					padding: '1rem',
					borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
				}}
			>
				<Skeleton variant="text" width="50%" height={16} />
				<Skeleton variant="text" width="40%" height={16} />
				<Skeleton variant="text" width="40%" height={16} />
				<Skeleton variant="text" width="40%" height={16} />
			</div>

			{/* Table Rows */}
			{Array.from({ length: 6 }, (_, i) => (
				<div
					key={i}
					style={{
						display: 'grid',
						gridTemplateColumns: '2fr 1fr 1fr 1fr',
						gap: '1rem',
						padding: '1rem',
						borderBottom: i < 5 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none'
					}}
				>
					<Skeleton variant="text" width="70%" height={14} />
					<Skeleton variant="text" width="60%" height={14} />
					<Skeleton variant="text" width="50%" height={14} />
					<Skeleton variant="rounded" width={60} height={28} />
				</div>
			))}
		</div>
	)
}

export const DashboardSkeleton: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
			{/* Header */}
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Skeleton variant="text" width={200} height={32} />
				<Skeleton variant="rounded" width={120} height={40} />
			</div>

			{/* Stats Cards */}
			<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
				{Array.from({ length: 4 }, (_, i) => (
					<div
						key={i}
						style={{
							background: 'rgba(255, 255, 255, 0.05)',
							backdropFilter: 'blur(10px)',
							border: '1px solid rgba(255, 255, 255, 0.2)',
							borderRadius: '0.5rem',
							padding: '1.5rem'
						}}
					>
						<Skeleton variant="text" width="60%" height={14} />
						<div style={{ height: '0.5rem' }} />
						<Skeleton variant="text" width="40%" height={28} />
					</div>
				))}
			</div>

			{/* Chart */}
			<div
				style={{
					background: 'rgba(255, 255, 255, 0.05)',
					backdropFilter: 'blur(10px)',
					border: '1px solid rgba(255, 255, 255, 0.2)',
					borderRadius: '0.5rem',
					padding: '1.5rem'
				}}
			>
				<Skeleton variant="text" width={150} height={20} />
				<div style={{ height: '1rem' }} />
				<Skeleton variant="rectangular" height={300} animation="wave" />
			</div>
		</div>
	)
}

export const ConvenienceComponents: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '1rem' }}>Skeleton.Text</h3>
				<Skeleton.Text lines={4} />
			</div>

			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '1rem' }}>Skeleton.Circle</h3>
				<div style={{ display: 'flex', gap: '1rem' }}>
					<Skeleton.Circle size={40} />
					<Skeleton.Circle size={60} />
					<Skeleton.Circle size={80} />
				</div>
			</div>

			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '1rem' }}>Skeleton.Rectangle</h3>
				<Skeleton.Rectangle height={150} />
			</div>
		</div>
	)
}

export const LoadingStates: Story = {
	render: () => {
		const [loading, setLoading] = React.useState(true)

		return (
			<div style={{ maxWidth: '600px' }}>
				<div style={{ marginBottom: '1rem' }}>
					<button
						onClick={() => setLoading(!loading)}
						style={{
							padding: '0.5rem 1rem',
							background: 'rgba(99, 102, 241, 0.3)',
							border: '2px solid rgba(99, 102, 241, 0.5)',
							borderRadius: '0.5rem',
							color: '#c7d2fe',
							fontWeight: 'bold',
							cursor: 'pointer'
						}}
					>
						Toggle Loading
					</button>
				</div>

				{loading ? (
					<div
						style={{
							background: 'rgba(255, 255, 255, 0.05)',
							backdropFilter: 'blur(10px)',
							border: '1px solid rgba(255, 255, 255, 0.2)',
							borderRadius: '0.5rem',
							padding: '1.5rem'
						}}
					>
						<div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
							<Skeleton variant="circular" width={60} height={60} />
							<div style={{ flex: 1 }}>
								<Skeleton variant="text" width="60%" height={20} />
								<div style={{ height: '0.5rem' }} />
								<Skeleton variant="text" width="40%" height={16} />
							</div>
						</div>
						<Skeleton variant="text" lines={4} />
					</div>
				) : (
					<div
						style={{
							background: 'rgba(255, 255, 255, 0.05)',
							backdropFilter: 'blur(10px)',
							border: '1px solid rgba(255, 255, 255, 0.2)',
							borderRadius: '0.5rem',
							padding: '1.5rem'
						}}
					>
						<div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
							<div
								style={{
									width: 60,
									height: 60,
									borderRadius: '50%',
									background: 'rgba(99, 102, 241, 0.3)',
									border: '2px solid rgba(99, 102, 241, 0.5)'
								}}
							/>
							<div style={{ flex: 1 }}>
								<h3 style={{ color: '#c7d2fe', fontSize: '1.25rem', fontWeight: 'bold' }}>John Doe</h3>
								<p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Software Engineer</p>
							</div>
						</div>
						<p style={{ color: '#e0e0e0', lineHeight: '1.6' }}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo consequat.
						</p>
					</div>
				)}
			</div>
		)
	}
}
