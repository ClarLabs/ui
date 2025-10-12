import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Grid } from './index'

const meta = {
	title: 'Components/Grid',
	component: Grid,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs']
} satisfies Meta<typeof Grid>

export default meta
type Story = StoryObj<typeof meta>

// Demo box component for visualization
const DemoBox = ({ children, height = '80px' }: { children?: React.ReactNode; height?: string }) => (
	<div
		style={{
			background: 'rgba(99, 102, 241, 0.2)',
			border: '2px solid rgba(99, 102, 241, 0.5)',
			borderRadius: '0.5rem',
			padding: '1rem',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			color: '#c7d2fe',
			fontWeight: 'bold',
			height
		}}
	>
		{children}
	</div>
)

export const Default: Story = {
	render: () => (
		<Grid columns={3}>
			<DemoBox>1</DemoBox>
			<DemoBox>2</DemoBox>
			<DemoBox>3</DemoBox>
			<DemoBox>4</DemoBox>
			<DemoBox>5</DemoBox>
			<DemoBox>6</DemoBox>
		</Grid>
	)
}

export const TwoColumns: Story = {
	render: () => (
		<Grid columns={2} gap="lg">
			<DemoBox>Column 1</DemoBox>
			<DemoBox>Column 2</DemoBox>
			<DemoBox>Column 3</DemoBox>
			<DemoBox>Column 4</DemoBox>
		</Grid>
	)
}

export const FourColumns: Story = {
	render: () => (
		<Grid columns={4}>
			<DemoBox>1</DemoBox>
			<DemoBox>2</DemoBox>
			<DemoBox>3</DemoBox>
			<DemoBox>4</DemoBox>
			<DemoBox>5</DemoBox>
			<DemoBox>6</DemoBox>
			<DemoBox>7</DemoBox>
			<DemoBox>8</DemoBox>
		</Grid>
	)
}

export const ResponsiveColumns: Story = {
	render: () => (
		<Grid columns={1} columnsSm={2} columnsMd={3} columnsLg={4} columnsXl={6}>
			<DemoBox>1</DemoBox>
			<DemoBox>2</DemoBox>
			<DemoBox>3</DemoBox>
			<DemoBox>4</DemoBox>
			<DemoBox>5</DemoBox>
			<DemoBox>6</DemoBox>
			<DemoBox>7</DemoBox>
			<DemoBox>8</DemoBox>
			<DemoBox>9</DemoBox>
			<DemoBox>10</DemoBox>
			<DemoBox>11</DemoBox>
			<DemoBox>12</DemoBox>
		</Grid>
	)
}

export const WithGaps: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '1rem' }}>Gap: xs</h3>
				<Grid columns={3} gap="xs">
					<DemoBox>1</DemoBox>
					<DemoBox>2</DemoBox>
					<DemoBox>3</DemoBox>
				</Grid>
			</div>
			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '1rem' }}>Gap: md</h3>
				<Grid columns={3} gap="md">
					<DemoBox>1</DemoBox>
					<DemoBox>2</DemoBox>
					<DemoBox>3</DemoBox>
				</Grid>
			</div>
			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '1rem' }}>Gap: xl</h3>
				<Grid columns={3} gap="xl">
					<DemoBox>1</DemoBox>
					<DemoBox>2</DemoBox>
					<DemoBox>3</DemoBox>
				</Grid>
			</div>
		</div>
	)
}

export const WithGridItems: Story = {
	render: () => (
		<Grid columns={12} gap="md">
			<Grid.Item colSpan={12}>
				<DemoBox>Full Width (span 12)</DemoBox>
			</Grid.Item>
			<Grid.Item colSpan={6}>
				<DemoBox>Half Width (span 6)</DemoBox>
			</Grid.Item>
			<Grid.Item colSpan={6}>
				<DemoBox>Half Width (span 6)</DemoBox>
			</Grid.Item>
			<Grid.Item colSpan={4}>
				<DemoBox>1/3 Width (span 4)</DemoBox>
			</Grid.Item>
			<Grid.Item colSpan={4}>
				<DemoBox>1/3 Width (span 4)</DemoBox>
			</Grid.Item>
			<Grid.Item colSpan={4}>
				<DemoBox>1/3 Width (span 4)</DemoBox>
			</Grid.Item>
			<Grid.Item colSpan={3}>
				<DemoBox>1/4 (span 3)</DemoBox>
			</Grid.Item>
			<Grid.Item colSpan={3}>
				<DemoBox>1/4 (span 3)</DemoBox>
			</Grid.Item>
			<Grid.Item colSpan={3}>
				<DemoBox>1/4 (span 3)</DemoBox>
			</Grid.Item>
			<Grid.Item colSpan={3}>
				<DemoBox>1/4 (span 3)</DemoBox>
			</Grid.Item>
		</Grid>
	)
}

export const ResponsiveGridItems: Story = {
	render: () => (
		<Grid columns={12} gap="md">
			<Grid.Item colSpan={12} colSpanMd={6} colSpanLg={4}>
				<DemoBox>Mobile: Full, Tablet: Half, Desktop: 1/3</DemoBox>
			</Grid.Item>
			<Grid.Item colSpan={12} colSpanMd={6} colSpanLg={4}>
				<DemoBox>Mobile: Full, Tablet: Half, Desktop: 1/3</DemoBox>
			</Grid.Item>
			<Grid.Item colSpan={12} colSpanMd={12} colSpanLg={4}>
				<DemoBox>Mobile: Full, Tablet: Full, Desktop: 1/3</DemoBox>
			</Grid.Item>
		</Grid>
	)
}

export const ComplexLayout: Story = {
	render: () => (
		<Grid columns={12} gap="md">
			<Grid.Item colSpan={12}>
				<DemoBox>Header (Full Width)</DemoBox>
			</Grid.Item>
			<Grid.Item colSpan={12} colSpanMd={3}>
				<DemoBox height="200px">Sidebar</DemoBox>
			</Grid.Item>
			<Grid.Item colSpan={12} colSpanMd={9}>
				<Grid columns={2} gap="md">
					<DemoBox height="200px">Content 1</DemoBox>
					<DemoBox height="200px">Content 2</DemoBox>
				</Grid>
			</Grid.Item>
			<Grid.Item colSpan={12}>
				<DemoBox>Footer (Full Width)</DemoBox>
			</Grid.Item>
		</Grid>
	)
}

export const WithRowSpan: Story = {
	render: () => (
		<Grid columns={3} gap="md">
			<Grid.Item rowSpan={2}>
				<DemoBox height="100%">Tall Item (row span 2)</DemoBox>
			</Grid.Item>
			<DemoBox>1</DemoBox>
			<DemoBox>2</DemoBox>
			<DemoBox>3</DemoBox>
			<DemoBox>4</DemoBox>
			<DemoBox>5</DemoBox>
			<DemoBox>6</DemoBox>
		</Grid>
	)
}

export const DashboardLayout: Story = {
	render: () => (
		<Grid columns={12} gap="lg">
			<Grid.Item colSpan={12}>
				<DemoBox>Dashboard Header</DemoBox>
			</Grid.Item>
			<Grid.Item colSpan={12} colSpanMd={6} colSpanLg={3}>
				<DemoBox height="150px">Stat Card 1</DemoBox>
			</Grid.Item>
			<Grid.Item colSpan={12} colSpanMd={6} colSpanLg={3}>
				<DemoBox height="150px">Stat Card 2</DemoBox>
			</Grid.Item>
			<Grid.Item colSpan={12} colSpanMd={6} colSpanLg={3}>
				<DemoBox height="150px">Stat Card 3</DemoBox>
			</Grid.Item>
			<Grid.Item colSpan={12} colSpanMd={6} colSpanLg={3}>
				<DemoBox height="150px">Stat Card 4</DemoBox>
			</Grid.Item>
			<Grid.Item colSpan={12} colSpanLg={8}>
				<DemoBox height="300px">Main Chart</DemoBox>
			</Grid.Item>
			<Grid.Item colSpan={12} colSpanLg={4}>
				<DemoBox height="300px">Activity Feed</DemoBox>
			</Grid.Item>
			<Grid.Item colSpan={12} colSpanMd={6}>
				<DemoBox height="200px">Recent Items</DemoBox>
			</Grid.Item>
			<Grid.Item colSpan={12} colSpanMd={6}>
				<DemoBox height="200px">Quick Actions</DemoBox>
			</Grid.Item>
		</Grid>
	)
}

export const AlignmentOptions: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '1rem' }}>Align Items: Start</h3>
				<Grid columns={3} gap="md" alignItems="start">
					<DemoBox height="60px">Short</DemoBox>
					<DemoBox height="120px">Tall</DemoBox>
					<DemoBox height="80px">Medium</DemoBox>
				</Grid>
			</div>
			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '1rem' }}>Align Items: Center</h3>
				<Grid columns={3} gap="md" alignItems="center">
					<DemoBox height="60px">Short</DemoBox>
					<DemoBox height="120px">Tall</DemoBox>
					<DemoBox height="80px">Medium</DemoBox>
				</Grid>
			</div>
			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '1rem' }}>Align Items: Stretch</h3>
				<Grid columns={3} gap="md" alignItems="stretch">
					<DemoBox>Auto Height 1</DemoBox>
					<DemoBox>Auto Height 2</DemoBox>
					<DemoBox>Auto Height 3</DemoBox>
				</Grid>
			</div>
		</div>
	)
}

export const CardGallery: Story = {
	render: () => (
		<Grid columns={1} columnsSm={2} columnsMd={3} columnsLg={4} gap="lg">
			{Array.from({ length: 12 }, (_, i) => (
				<DemoBox key={i} height="200px">
					Card {i + 1}
				</DemoBox>
			))}
		</Grid>
	)
}
