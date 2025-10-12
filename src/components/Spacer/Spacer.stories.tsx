import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Spacer } from './index'

const meta = {
	title: 'Components/Spacer',
	component: Spacer,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']
		},
		axis: {
			control: 'select',
			options: ['horizontal', 'vertical', 'both']
		},
		spacing: {
			control: 'text'
		}
	}
} satisfies Meta<typeof Spacer>

export default meta
type Story = StoryObj<typeof meta>

// Demo box component for visualization
const DemoBox = ({ children }: { children?: React.ReactNode }) => (
	<div
		style={{
			background: 'rgba(99, 102, 241, 0.2)',
			border: '2px solid rgba(99, 102, 241, 0.5)',
			borderRadius: '0.5rem',
			padding: '1rem',
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			color: '#c7d2fe',
			fontWeight: 'bold'
		}}
	>
		{children}
	</div>
)

export const Default: Story = {
	render: () => (
		<div>
			<DemoBox>Content Above</DemoBox>
			<Spacer />
			<DemoBox>Content Below</DemoBox>
		</div>
	)
}

export const VerticalSizes: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '0.5rem' }}>XS (4px)</h3>
				<DemoBox>Top</DemoBox>
				<Spacer size="xs" />
				<DemoBox>Bottom</DemoBox>
			</div>

			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '0.5rem' }}>SM (8px)</h3>
				<DemoBox>Top</DemoBox>
				<Spacer size="sm" />
				<DemoBox>Bottom</DemoBox>
			</div>

			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '0.5rem' }}>MD (16px)</h3>
				<DemoBox>Top</DemoBox>
				<Spacer size="md" />
				<DemoBox>Bottom</DemoBox>
			</div>

			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '0.5rem' }}>LG (24px)</h3>
				<DemoBox>Top</DemoBox>
				<Spacer size="lg" />
				<DemoBox>Bottom</DemoBox>
			</div>

			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '0.5rem' }}>XL (32px)</h3>
				<DemoBox>Top</DemoBox>
				<Spacer size="xl" />
				<DemoBox>Bottom</DemoBox>
			</div>

			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '0.5rem' }}>2XL (48px)</h3>
				<DemoBox>Top</DemoBox>
				<Spacer size="2xl" />
				<DemoBox>Bottom</DemoBox>
			</div>

			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '0.5rem' }}>3XL (64px)</h3>
				<DemoBox>Top</DemoBox>
				<Spacer size="3xl" />
				<DemoBox>Bottom</DemoBox>
			</div>

			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '0.5rem' }}>4XL (96px)</h3>
				<DemoBox>Top</DemoBox>
				<Spacer size="4xl" />
				<DemoBox>Bottom</DemoBox>
			</div>
		</div>
	)
}

export const HorizontalSizes: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '0.5rem' }}>XS (4px)</h3>
				<div style={{ display: 'flex' }}>
					<DemoBox>Left</DemoBox>
					<Spacer size="xs" axis="horizontal" />
					<DemoBox>Right</DemoBox>
				</div>
			</div>

			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '0.5rem' }}>SM (8px)</h3>
				<div style={{ display: 'flex' }}>
					<DemoBox>Left</DemoBox>
					<Spacer size="sm" axis="horizontal" />
					<DemoBox>Right</DemoBox>
				</div>
			</div>

			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '0.5rem' }}>MD (16px)</h3>
				<div style={{ display: 'flex' }}>
					<DemoBox>Left</DemoBox>
					<Spacer size="md" axis="horizontal" />
					<DemoBox>Right</DemoBox>
				</div>
			</div>

			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '0.5rem' }}>LG (24px)</h3>
				<div style={{ display: 'flex' }}>
					<DemoBox>Left</DemoBox>
					<Spacer size="lg" axis="horizontal" />
					<DemoBox>Right</DemoBox>
				</div>
			</div>

			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '0.5rem' }}>XL (32px)</h3>
				<div style={{ display: 'flex' }}>
					<DemoBox>Left</DemoBox>
					<Spacer size="xl" axis="horizontal" />
					<DemoBox>Right</DemoBox>
				</div>
			</div>

			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '0.5rem' }}>2XL (48px)</h3>
				<div style={{ display: 'flex' }}>
					<DemoBox>Left</DemoBox>
					<Spacer size="2xl" axis="horizontal" />
					<DemoBox>Right</DemoBox>
				</div>
			</div>

			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '0.5rem' }}>3XL (64px)</h3>
				<div style={{ display: 'flex' }}>
					<DemoBox>Left</DemoBox>
					<Spacer size="3xl" axis="horizontal" />
					<DemoBox>Right</DemoBox>
				</div>
			</div>

			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '0.5rem' }}>4XL (96px)</h3>
				<div style={{ display: 'flex' }}>
					<DemoBox>Left</DemoBox>
					<Spacer size="4xl" axis="horizontal" />
					<DemoBox>Right</DemoBox>
				</div>
			</div>
		</div>
	)
}

export const CustomSpacing: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '0.5rem' }}>Custom: 50px</h3>
				<DemoBox>Top</DemoBox>
				<Spacer spacing={50} />
				<DemoBox>Bottom</DemoBox>
			</div>

			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '0.5rem' }}>Custom: 5rem</h3>
				<DemoBox>Top</DemoBox>
				<Spacer spacing="5rem" />
				<DemoBox>Bottom</DemoBox>
			</div>

			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '0.5rem' }}>Custom Horizontal: 100px</h3>
				<div style={{ display: 'flex' }}>
					<DemoBox>Left</DemoBox>
					<Spacer spacing={100} axis="horizontal" />
					<DemoBox>Right</DemoBox>
				</div>
			</div>
		</div>
	)
}

export const InFlexLayout: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<DemoBox>Header</DemoBox>
			<Spacer size="lg" />
			<DemoBox>Content Section 1</DemoBox>
			<Spacer size="md" />
			<DemoBox>Content Section 2</DemoBox>
			<Spacer size="md" />
			<DemoBox>Content Section 3</DemoBox>
			<Spacer size="lg" />
			<DemoBox>Footer</DemoBox>
		</div>
	)
}

export const InHorizontalLayout: Story = {
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<DemoBox>Button 1</DemoBox>
			<Spacer size="sm" axis="horizontal" />
			<DemoBox>Button 2</DemoBox>
			<Spacer size="sm" axis="horizontal" />
			<DemoBox>Button 3</DemoBox>
			<Spacer size="xl" axis="horizontal" />
			<DemoBox>Button 4</DemoBox>
		</div>
	)
}

export const PushToEnd: Story = {
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center', border: '2px dashed rgba(99, 102, 241, 0.3)', padding: '1rem' }}>
			<DemoBox>Left Content</DemoBox>
			<Spacer size="md" axis="horizontal" />
			<DemoBox>Center Left</DemoBox>
			<div style={{ flex: 1 }} />
			<DemoBox>Pushed Right</DemoBox>
		</div>
	)
}

export const MixedLayout: Story = {
	render: () => (
		<div>
			<div
				style={{
					background: 'rgba(99, 102, 241, 0.1)',
					border: '2px solid rgba(99, 102, 241, 0.3)',
					borderRadius: '0.5rem',
					padding: '2rem'
				}}
			>
				<h2 style={{ color: '#c7d2fe', fontSize: '1.5rem', fontWeight: 'bold' }}>Section Title</h2>
				<Spacer size="sm" />
				<p style={{ color: '#e0e0e0', lineHeight: '1.6' }}>
					This is a paragraph of text that demonstrates how Spacer can be used to create consistent vertical spacing between elements.
				</p>
				<Spacer size="lg" />
				<div style={{ display: 'flex' }}>
					<DemoBox>Action 1</DemoBox>
					<Spacer size="sm" axis="horizontal" />
					<DemoBox>Action 2</DemoBox>
					<Spacer size="sm" axis="horizontal" />
					<DemoBox>Action 3</DemoBox>
				</div>
			</div>

			<Spacer size="2xl" />

			<div
				style={{
					background: 'rgba(34, 197, 94, 0.1)',
					border: '2px solid rgba(34, 197, 94, 0.3)',
					borderRadius: '0.5rem',
					padding: '2rem'
				}}
			>
				<h2 style={{ color: '#86efac', fontSize: '1.5rem', fontWeight: 'bold' }}>Another Section</h2>
				<Spacer size="sm" />
				<p style={{ color: '#e0e0e0', lineHeight: '1.6' }}>
					Spacers help maintain visual rhythm and improve readability by providing consistent spacing throughout your UI.
				</p>
			</div>
		</div>
	)
}

export const CompareToMargin: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '3rem' }}>
			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '1rem' }}>Using margin</h3>
				<DemoBox>Box 1</DemoBox>
				<div style={{ marginBottom: '1rem' }} />
				<DemoBox>Box 2</DemoBox>
			</div>

			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '1rem' }}>Using Spacer</h3>
				<DemoBox>Box 1</DemoBox>
				<Spacer size="md" />
				<DemoBox>Box 2</DemoBox>
			</div>
		</div>
	)
}

export const VisualSpacingGuide: Story = {
	render: () => (
		<div
			style={{
				background: 'rgba(99, 102, 241, 0.05)',
				border: '2px dashed rgba(99, 102, 241, 0.3)',
				borderRadius: '0.5rem',
				padding: '2rem'
			}}
		>
			<h2 style={{ color: '#c7d2fe', fontSize: '1.5rem', fontWeight: 'bold' }}>Spacing Guide</h2>
			<Spacer size="xs" />
			<p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>XS spacing between title and subtitle</p>

			<Spacer size="md" />

			<div
				style={{
					background: 'rgba(99, 102, 241, 0.1)',
					borderRadius: '0.5rem',
					padding: '1rem'
				}}
			>
				<h3 style={{ color: '#e0e0e0', fontWeight: 'bold' }}>Content Block 1</h3>
			</div>

			<Spacer size="lg" />

			<div
				style={{
					background: 'rgba(99, 102, 241, 0.1)',
					borderRadius: '0.5rem',
					padding: '1rem'
				}}
			>
				<h3 style={{ color: '#e0e0e0', fontWeight: 'bold' }}>Content Block 2</h3>
			</div>

			<Spacer size="2xl" />

			<div
				style={{
					background: 'rgba(34, 197, 94, 0.1)',
					border: '2px solid rgba(34, 197, 94, 0.3)',
					borderRadius: '0.5rem',
					padding: '1.5rem',
					textAlign: 'center'
				}}
			>
				<p style={{ color: '#86efac', fontWeight: 'bold' }}>2XL spacing before this call-to-action</p>
			</div>
		</div>
	)
}
