import type { Meta, StoryObj } from '@storybook/react'
import { TreeView } from './index'

const simpleTree = [
	{
		id: '1',
		label: 'Documents',
		children: [
			{ id: '1-1', label: 'Work' },
			{ id: '1-2', label: 'Personal' }
		]
	},
	{
		id: '2',
		label: 'Photos',
		children: [
			{ id: '2-1', label: '2023' },
			{ id: '2-2', label: '2024' }
		]
	},
	{
		id: '3',
		label: 'Videos'
	}
]

const complexTree = [
	{
		id: '1',
		label: 'src',
		icon: '📁',
		children: [
			{
				id: '1-1',
				label: 'components',
				icon: '📁',
				children: [
					{ id: '1-1-1', label: 'Button.tsx', icon: '📄' },
					{ id: '1-1-2', label: 'Input.tsx', icon: '📄' }
				]
			},
			{
				id: '1-2',
				label: 'styles',
				icon: '📁',
				children: [{ id: '1-2-1', label: 'global.scss', icon: '🎨' }]
			}
		]
	},
	{
		id: '2',
		label: 'public',
		icon: '📁',
		children: [{ id: '2-1', label: 'index.html', icon: '📄' }]
	},
	{
		id: '3',
		label: 'package.json',
		icon: '📦'
	}
]

const meta = {
	title: 'Components/TreeView',
	component: TreeView,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs']
} satisfies Meta<typeof TreeView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		data: simpleTree
	}
}

export const WithIcons: Story = {
	args: {
		data: complexTree
	}
}

export const DefaultExpanded: Story = {
	args: {
		data: simpleTree,
		defaultExpandedIds: ['1', '2']
	}
}

export const Clickable: Story = {
	args: {
		data: simpleTree,
		onNodeClick: (node) => alert(`Clicked: ${node.label}`)
	}
}

export const WithDisabled: Story = {
	args: {
		data: [
			{
				id: '1',
				label: 'Available',
				children: [
					{ id: '1-1', label: 'Item 1' },
					{ id: '1-2', label: 'Item 2' }
				]
			},
			{
				id: '2',
				label: 'Disabled',
				disabled: true,
				children: [{ id: '2-1', label: 'Item 3' }]
			},
			{
				id: '3',
				label: 'Available'
			}
		]
	}
}

export const FileSystem: Story = {
	args: {
		data: [
			{
				id: 'root',
				label: 'project',
				icon: '📁',
				children: [
					{
						id: 'src',
						label: 'src',
						icon: '📁',
						children: [
							{
								id: 'components',
								label: 'components',
								icon: '📁',
								children: [
									{ id: 'button', label: 'Button.tsx', icon: '⚛️' },
									{ id: 'input', label: 'Input.tsx', icon: '⚛️' },
									{ id: 'card', label: 'Card.tsx', icon: '⚛️' }
								]
							},
							{
								id: 'utils',
								label: 'utils',
								icon: '📁',
								children: [
									{ id: 'helpers', label: 'helpers.ts', icon: '📘' },
									{ id: 'constants', label: 'constants.ts', icon: '📘' }
								]
							},
							{ id: 'app', label: 'App.tsx', icon: '⚛️' },
							{ id: 'index', label: 'index.tsx', icon: '⚛️' }
						]
					},
					{
						id: 'public',
						label: 'public',
						icon: '📁',
						children: [
							{ id: 'html', label: 'index.html', icon: '🌐' },
							{ id: 'favicon', label: 'favicon.ico', icon: '🖼️' }
						]
					},
					{ id: 'package', label: 'package.json', icon: '📦' },
					{ id: 'readme', label: 'README.md', icon: '📝' }
				]
			}
		],
		defaultExpandedIds: ['root', 'src'],
		onNodeClick: (node) => console.log('Opened:', node.label)
	}
}
