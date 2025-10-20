import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Chart } from './index'

const meta = {
	title: 'Components/Chart',
	component: Chart,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs'],
	argTypes: {
		type: {
			control: 'select',
			options: ['line', 'bar', 'area', 'pie', 'doughnut']
		},
		showLegend: {
			control: 'boolean'
		},
		showGrid: {
			control: 'boolean'
		},
		showValues: {
			control: 'boolean'
		},
		animate: {
			control: 'boolean'
		},
		smooth: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof Chart>

export default meta
type Story = StoryObj<typeof meta>

const monthlyLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

export const LineChart: Story = {
	args: {
		type: 'line',
		title: 'Monthly Sales',
		labels: monthlyLabels,
		datasets: [
			{
				label: 'Revenue',
				data: [12000, 19000, 15000, 25000, 22000, 30000]
			},
			{
				label: 'Expenses',
				data: [8000, 11000, 9000, 14000, 13000, 16000]
			}
		],
		showLegend: true,
		showGrid: true,
		animate: true,
		smooth: true,
		height: 400
	}
}

export const LineChartCustomColors: Story = {
	args: {
		type: 'line',
		title: 'Sales Performance',
		labels: monthlyLabels,
		datasets: [
			{
				label: 'Product A',
				data: [65, 75, 70, 85, 90, 95],
				lightColor: 'rgba(34, 197, 94, 0.8)',
				darkColor: 'rgba(74, 222, 128, 0.9)'
			},
			{
				label: 'Product B',
				data: [45, 55, 60, 65, 70, 75],
				lightColor: 'rgba(239, 68, 68, 0.8)',
				darkColor: 'rgba(248, 113, 113, 0.9)'
			},
			{
				label: 'Product C',
				data: [30, 40, 45, 55, 60, 70],
				lightColor: 'rgba(59, 130, 246, 0.8)',
				darkColor: 'rgba(96, 165, 250, 0.9)'
			}
		],
		showLegend: true,
		showGrid: true,
		animate: true,
		smooth: true,
		height: 400
	}
}

export const BarChart: Story = {
	args: {
		type: 'bar',
		title: 'Quarterly Performance',
		labels: ['Q1', 'Q2', 'Q3', 'Q4'],
		datasets: [
			{
				label: 'Sales',
				data: [45000, 52000, 48000, 67000]
			},
			{
				label: 'Profit',
				data: [15000, 18000, 16000, 25000]
			}
		],
		showLegend: true,
		showGrid: true,
		showValues: false,
		animate: true,
		height: 400
	}
}

export const BarChartWithValues: Story = {
	args: {
		type: 'bar',
		title: 'Team Performance',
		labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
		datasets: [
			{
				label: 'Tasks Completed',
				data: [23, 45, 32, 56, 41]
			}
		],
		showLegend: true,
		showGrid: true,
		showValues: true,
		animate: true,
		height: 400
	}
}

export const BarChartCustomColors: Story = {
	args: {
		type: 'bar',
		title: 'Regional Sales',
		labels: ['North', 'South', 'East', 'West'],
		datasets: [
			{
				label: '2023',
				data: [120, 95, 150, 110],
				lightColor: 'rgba(168, 85, 247, 0.8)',
				darkColor: 'rgba(196, 181, 253, 0.9)'
			},
			{
				label: '2024',
				data: [145, 110, 175, 130],
				lightColor: 'rgba(236, 72, 153, 0.8)',
				darkColor: 'rgba(244, 114, 182, 0.9)'
			}
		],
		showLegend: true,
		showGrid: true,
		animate: true,
		height: 400
	}
}

export const AreaChart: Story = {
	args: {
		type: 'area',
		title: 'Website Traffic',
		labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		datasets: [
			{
				label: 'Page Views',
				data: [2400, 3200, 2800, 3900, 4200, 3800, 3500]
			},
			{
				label: 'Unique Visitors',
				data: [1800, 2400, 2100, 2900, 3100, 2800, 2600]
			}
		],
		showLegend: true,
		showGrid: true,
		animate: true,
		smooth: true,
		height: 400
	}
}

export const AreaChartCustomColors: Story = {
	args: {
		type: 'area',
		title: 'Server Metrics',
		labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
		datasets: [
			{
				label: 'CPU Usage',
				data: [35, 42, 58, 72, 65, 55, 40],
				lightColor: 'rgba(251, 191, 36, 0.8)',
				darkColor: 'rgba(253, 224, 71, 0.9)'
			},
			{
				label: 'Memory Usage',
				data: [45, 48, 62, 68, 70, 58, 52],
				lightColor: 'rgba(20, 184, 166, 0.8)',
				darkColor: 'rgba(45, 212, 191, 0.9)'
			}
		],
		showLegend: true,
		showGrid: true,
		animate: true,
		smooth: true,
		height: 400
	}
}

export const PieChart: Story = {
	args: {
		type: 'pie',
		title: 'Market Share',
		data: [
			{ label: 'Product A', value: 35 },
			{ label: 'Product B', value: 25 },
			{ label: 'Product C', value: 20 },
			{ label: 'Product D', value: 15 },
			{ label: 'Product E', value: 5 }
		],
		showLegend: true,
		showValues: true,
		animate: true,
		height: 400
	}
}

export const PieChartCustomColors: Story = {
	args: {
		type: 'pie',
		title: 'Browser Usage',
		data: [
			{
				label: 'Chrome',
				value: 65,
				lightColor: 'rgba(34, 197, 94, 0.8)',
				darkColor: 'rgba(74, 222, 128, 0.9)'
			},
			{
				label: 'Firefox',
				value: 15,
				lightColor: 'rgba(251, 191, 36, 0.8)',
				darkColor: 'rgba(253, 224, 71, 0.9)'
			},
			{
				label: 'Safari',
				value: 12,
				lightColor: 'rgba(59, 130, 246, 0.8)',
				darkColor: 'rgba(96, 165, 250, 0.9)'
			},
			{
				label: 'Edge',
				value: 5,
				lightColor: 'rgba(168, 85, 247, 0.8)',
				darkColor: 'rgba(196, 181, 253, 0.9)'
			},
			{
				label: 'Other',
				value: 3,
				lightColor: 'rgba(107, 114, 128, 0.8)',
				darkColor: 'rgba(156, 163, 175, 0.9)'
			}
		],
		showLegend: true,
		showValues: true,
		animate: true,
		height: 400
	}
}

export const DoughnutChart: Story = {
	args: {
		type: 'doughnut',
		title: 'Traffic Sources',
		data: [
			{ label: 'Direct', value: 4200 },
			{ label: 'Organic Search', value: 3800 },
			{ label: 'Social Media', value: 2100 },
			{ label: 'Referral', value: 1500 },
			{ label: 'Email', value: 900 }
		],
		showLegend: true,
		showValues: true,
		animate: true,
		height: 400
	}
}

export const DoughnutChartCustomColors: Story = {
	args: {
		type: 'doughnut',
		title: 'Budget Allocation',
		data: [
			{
				label: 'Development',
				value: 45,
				lightColor: 'rgba(99, 102, 241, 0.8)',
				darkColor: 'rgba(129, 140, 248, 0.9)'
			},
			{
				label: 'Marketing',
				value: 25,
				lightColor: 'rgba(236, 72, 153, 0.8)',
				darkColor: 'rgba(244, 114, 182, 0.9)'
			},
			{
				label: 'Operations',
				value: 20,
				lightColor: 'rgba(34, 197, 94, 0.8)',
				darkColor: 'rgba(74, 222, 128, 0.9)'
			},
			{
				label: 'Research',
				value: 10,
				lightColor: 'rgba(251, 191, 36, 0.8)',
				darkColor: 'rgba(253, 224, 71, 0.9)'
			}
		],
		showLegend: true,
		showValues: true,
		animate: true,
		height: 400
	}
}

export const MultiDatasetComparison: Story = {
	args: {
		type: 'bar',
		title: 'Department Performance - Multi-Year Comparison',
		labels: ['Sales', 'Marketing', 'Engineering', 'Support', 'HR'],
		datasets: [
			{
				label: '2022',
				data: [85, 72, 95, 78, 68],
				lightColor: 'rgba(99, 102, 241, 0.8)',
				darkColor: 'rgba(129, 140, 248, 0.9)'
			},
			{
				label: '2023',
				data: [92, 85, 98, 82, 75],
				lightColor: 'rgba(34, 197, 94, 0.8)',
				darkColor: 'rgba(74, 222, 128, 0.9)'
			},
			{
				label: '2024',
				data: [98, 90, 102, 88, 82],
				lightColor: 'rgba(251, 191, 36, 0.8)',
				darkColor: 'rgba(253, 224, 71, 0.9)'
			}
		],
		showLegend: true,
		showGrid: true,
		animate: true,
		height: 450
	}
}

export const SmoothVsSharp: Story = {
	args: {
		type: 'line',
		title: 'Temperature Over Time (Smooth Curve)',
		labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
		datasets: [
			{
				label: 'Temperature (°C)',
				data: [15, 18, 25, 28, 24, 19]
			}
		],
		showLegend: true,
		showGrid: true,
		animate: true,
		smooth: true,
		height: 350
	}
}

export const NoAnimation: Story = {
	args: {
		type: 'bar',
		title: 'Static Chart (No Animation)',
		labels: ['A', 'B', 'C', 'D', 'E'],
		datasets: [
			{
				label: 'Dataset',
				data: [12, 19, 15, 25, 22]
			}
		],
		showLegend: false,
		showGrid: true,
		animate: false,
		height: 300
	}
}
