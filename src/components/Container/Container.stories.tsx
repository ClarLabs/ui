import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Container } from './index'

const meta = {
	title: 'Components/Container',
	component: Container,
	parameters: {
		layout: 'fullscreen'
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full']
		},
		padding: {
			control: 'select',
			options: ['none', 'sm', 'md', 'lg', 'xl']
		},
		centered: {
			control: 'boolean'
		},
		fluid: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

// Demo content component
const DemoContent = ({ title, lines = 5 }: { title?: string; lines?: number }) => (
	<div
		style={{
			background: 'rgba(99, 102, 241, 0.1)',
			border: '2px solid rgba(99, 102, 241, 0.3)',
			borderRadius: '0.5rem',
			padding: '2rem'
		}}
	>
		{title && (
			<h2 style={{ color: '#c7d2fe', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
				{title}
			</h2>
		)}
		{Array.from({ length: lines }, (_, i) => (
			<p key={i} style={{ color: '#e0e0e0', marginBottom: '0.5rem', lineHeight: '1.6' }}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
			</p>
		))}
	</div>
)

export const Default: Story = {
	args: {
		children: <DemoContent title="Default Container (lg)" lines={3} />
	}
}

export const ExtraSmall: Story = {
	args: {
		size: 'xs',
		children: <DemoContent title="Extra Small Container" lines={3} />
	}
}

export const Small: Story = {
	args: {
		size: 'sm',
		children: <DemoContent title="Small Container" lines={3} />
	}
}

export const Medium: Story = {
	args: {
		size: 'md',
		children: <DemoContent title="Medium Container" lines={3} />
	}
}

export const Large: Story = {
	args: {
		size: 'lg',
		children: <DemoContent title="Large Container" lines={3} />
	}
}

export const ExtraLarge: Story = {
	args: {
		size: 'xl',
		children: <DemoContent title="Extra Large Container" lines={3} />
	}
}

export const ExtraExtraLarge: Story = {
	args: {
		size: '2xl',
		children: <DemoContent title="2XL Container" lines={3} />
	}
}

export const FullWidth: Story = {
	args: {
		size: 'full',
		children: <DemoContent title="Full Width Container" lines={3} />
	}
}

export const Fluid: Story = {
	args: {
		fluid: true,
		children: <DemoContent title="Fluid Container (No Max Width)" lines={3} />
	}
}

export const WithPadding: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
			<Container size="lg" padding="none">
				<DemoContent title="No Padding" lines={2} />
			</Container>
			<Container size="lg" padding="sm">
				<DemoContent title="Small Padding" lines={2} />
			</Container>
			<Container size="lg" padding="md">
				<DemoContent title="Medium Padding (Default)" lines={2} />
			</Container>
			<Container size="lg" padding="lg">
				<DemoContent title="Large Padding" lines={2} />
			</Container>
			<Container size="lg" padding="xl">
				<DemoContent title="Extra Large Padding" lines={2} />
			</Container>
		</div>
	)
}

export const NotCentered: Story = {
	args: {
		size: 'md',
		centered: false,
		children: <DemoContent title="Not Centered Container" lines={3} />
	}
}

export const CompareSizes: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
			<Container size="xs">
				<DemoContent title="xs (320px)" lines={1} />
			</Container>
			<Container size="sm">
				<DemoContent title="sm (384px)" lines={1} />
			</Container>
			<Container size="md">
				<DemoContent title="md (448px)" lines={1} />
			</Container>
			<Container size="lg">
				<DemoContent title="lg (512px)" lines={1} />
			</Container>
			<Container size="xl">
				<DemoContent title="xl (672px)" lines={1} />
			</Container>
			<Container size="2xl">
				<DemoContent title="2xl (768px)" lines={1} />
			</Container>
		</div>
	)
}

export const WithNestedContent: Story = {
	render: () => (
		<Container size="xl">
			<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
				<div
					style={{
						background: 'rgba(99, 102, 241, 0.1)',
						border: '2px solid rgba(99, 102, 241, 0.3)',
						borderRadius: '0.5rem',
						padding: '2rem'
					}}
				>
					<h1 style={{ color: '#c7d2fe', marginBottom: '1rem', fontSize: '2rem', fontWeight: 'bold' }}>
						Page Title
					</h1>
					<p style={{ color: '#e0e0e0', lineHeight: '1.6' }}>
						This is a container with nested content. The container constrains the width while keeping content centered.
					</p>
				</div>

				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
						gap: '1rem'
					}}
				>
					{Array.from({ length: 6 }, (_, i) => (
						<div
							key={i}
							style={{
								background: 'rgba(34, 197, 94, 0.1)',
								border: '2px solid rgba(34, 197, 94, 0.3)',
								borderRadius: '0.5rem',
								padding: '1.5rem',
								color: '#e0e0e0'
							}}
						>
							<h3 style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Card {i + 1}</h3>
							<p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Card content here</p>
						</div>
					))}
				</div>

				<div
					style={{
						background: 'rgba(99, 102, 241, 0.1)',
						border: '2px solid rgba(99, 102, 241, 0.3)',
						borderRadius: '0.5rem',
						padding: '1rem',
						textAlign: 'center',
						color: '#e0e0e0'
					}}
				>
					Footer Content
				</div>
			</div>
		</Container>
	)
}

export const BlogPost: Story = {
	render: () => (
		<Container size="md">
			<article>
				<div
					style={{
						background: 'rgba(99, 102, 241, 0.1)',
						border: '2px solid rgba(99, 102, 241, 0.3)',
						borderRadius: '0.5rem',
						padding: '2rem'
					}}
				>
					<h1 style={{ color: '#c7d2fe', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
						Blog Post Title
					</h1>
					<p style={{ color: '#9ca3af', marginBottom: '2rem', fontSize: '0.9rem' }}>
						Published on October 12, 2025 by John Doe
					</p>

					<div style={{ color: '#e0e0e0', lineHeight: '1.8' }}>
						<p style={{ marginBottom: '1rem' }}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
						</p>
						<p style={{ marginBottom: '1rem' }}>
							Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</p>
						<p style={{ marginBottom: '1rem' }}>
							Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
						</p>
					</div>
				</div>
			</article>
		</Container>
	)
}

export const ResponsivePadding: Story = {
	args: {
		size: 'xl',
		padding: 'md',
		children: (
			<DemoContent
				title="Responsive Padding (Resize browser to see effect)"
				lines={3}
			/>
		)
	}
}
