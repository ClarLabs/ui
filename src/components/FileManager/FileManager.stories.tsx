import type { Meta, StoryObj } from '@storybook/react'
import { FileManager, type FileItem, type ContextMenuItem } from './index'

const meta = {
	title: 'Components/FileManager',
	component: FileManager,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs'],
	argTypes: {
		items: {
			control: false
		},
		topMenuItems: {
			control: false
		},
		onItemClick: {
			action: 'item clicked'
		},
		onItemDoubleClick: {
			action: 'item double-clicked'
		},
		onBreadcrumbClick: {
			action: 'breadcrumb clicked'
		},
		onBreadcrumbDoubleClick: {
			action: 'breadcrumb double-clicked'
		}
	}
} satisfies Meta<typeof FileManager>

export default meta
type Story = StoryObj<typeof meta>

const sampleFiles: FileItem[] = [
	{
		id: 'folder1',
		name: 'Documents',
		type: 'folder',
		children: [
			{
				id: 'file1',
				name: 'report.pdf',
				type: 'file',
				size: 2456789,
				modified: new Date('2024-01-15')
			},
			{
				id: 'file2',
				name: 'presentation.pptx',
				type: 'file',
				size: 5678901,
				modified: new Date('2024-01-14')
			},
			{
				id: 'folder2',
				name: 'Projects',
				type: 'folder',
				children: [
					{
						id: 'file3',
						name: 'project-plan.docx',
						type: 'file',
						size: 1234567,
						modified: new Date('2024-01-13')
					},
					{
						id: 'file4',
						name: 'notes.txt',
						type: 'file',
						size: 4567,
						modified: new Date('2024-01-12')
					}
				]
			}
		]
	},
	{
		id: 'folder3',
		name: 'Images',
		type: 'folder',
		children: [
			{
				id: 'file5',
				name: 'photo1.jpg',
				type: 'file',
				thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop',
				size: 3456789,
				modified: new Date('2024-01-11')
			},
			{
				id: 'file6',
				name: 'photo2.png',
				type: 'file',
				thumbnail: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200&h=200&fit=crop',
				size: 2345678,
				modified: new Date('2024-01-10')
			}
		]
	},
	{
		id: 'file7',
		name: 'readme.md',
		type: 'file',
		size: 8901,
		modified: new Date('2024-01-09')
	},
	{
		id: 'file8',
		name: 'config.json',
		type: 'file',
		size: 1234,
		modified: new Date('2024-01-08')
	}
]

const topMenuItems: ContextMenuItem[] = [
	{
		id: 'new-folder',
		label: 'New Folder',
		onClick: () => console.log('New Folder')
	},
	{
		id: 'new-file',
		label: 'New File',
		onClick: () => console.log('New File')
	},
	{
		id: 'separator1',
		label: '',
		separator: true
	},
	{
		id: 'upload',
		label: 'Upload',
		onClick: () => console.log('Upload')
	},
	{
		id: 'separator2',
		label: '',
		separator: true
	},
	{
		id: 'settings',
		label: 'Settings',
		onClick: () => console.log('Settings')
	}
]

export const Default: Story = {
	args: {
		items: sampleFiles
	}
}

export const WithTopMenu: Story = {
	args: {
		items: sampleFiles,
		topMenuItems
	}
}

export const WithCustomContextMenu: Story = {
	args: {
		items: sampleFiles,
		topMenuItems,
		getContextMenuItems: (item) => {
			if (item.type === 'folder') {
				return [
					{
						id: 'open-folder',
						label: 'Open Folder',
						onClick: () => console.log('Open folder:', item.name)
					},
					{
						id: 'rename-folder',
						label: 'Rename',
						onClick: () => console.log('Rename folder:', item.name)
					},
					{
						id: 'separator',
						label: '',
						separator: true
					},
					{
						id: 'delete-folder',
						label: 'Delete',
						danger: true,
						onClick: () => console.log('Delete folder:', item.name)
					}
				]
			}
			return [
				{
					id: 'open-file',
					label: 'Open',
					onClick: () => console.log('Open file:', item.name)
				},
				{
					id: 'download',
					label: 'Download',
					onClick: () => console.log('Download file:', item.name)
				},
				{
					id: 'rename-file',
					label: 'Rename',
					onClick: () => console.log('Rename file:', item.name)
				},
				{
					id: 'separator',
					label: '',
					separator: true
				},
				{
					id: 'delete-file',
					label: 'Delete',
					danger: true,
					onClick: () => console.log('Delete file:', item.name)
				}
			]
		}
	}
}

export const ManyFiles: Story = {
	args: {
		items: Array.from({ length: 30 }, (_, i) => ({
			id: `file-${i}`,
			name: `document-${i + 1}.txt`,
			type: 'file' as const,
			size: Math.floor(Math.random() * 1000000),
			modified: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
		}))
	}
}

export const EmptyFolder: Story = {
	args: {
		items: []
	}
}

export const LargeStructure: Story = {
	args: {
		items: [
			{
				id: 'root1',
				name: 'Folder 1',
				type: 'folder',
				children: [
					{
						id: 'root1-sub1',
						name: 'Subfolder 1',
						type: 'folder',
						children: [
							{
								id: 'root1-sub1-file1',
								name: 'file1.txt',
								type: 'file',
								size: 1234,
								modified: new Date('2024-01-15')
							},
							{
								id: 'root1-sub1-sub2',
								name: 'Deep Folder',
								type: 'folder',
								children: [
									{
										id: 'deep-file',
										name: 'deep-file.txt',
										type: 'file',
										size: 5678,
										modified: new Date('2024-01-14')
									}
								]
							}
						]
					},
					{
						id: 'root1-file1',
						name: 'root-file.txt',
						type: 'file',
						size: 9876,
						modified: new Date('2024-01-13')
					}
				]
			},
			{
				id: 'root2',
				name: 'Folder 2',
				type: 'folder',
				children: [
					{
						id: 'root2-file1',
						name: 'another-file.pdf',
						type: 'file',
						size: 54321,
						modified: new Date('2024-01-12')
					}
				]
			}
		]
	}
}

export const WithThumbnails: Story = {
	args: {
		items: [
			{
				id: 'img1',
				name: 'mountain.jpg',
				type: 'file',
				thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop',
				size: 2456789,
				modified: new Date('2024-01-15')
			},
			{
				id: 'img2',
				name: 'beach.png',
				type: 'file',
				thumbnail: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200&h=200&fit=crop',
				size: 3456789,
				modified: new Date('2024-01-14')
			},
			{
				id: 'img3',
				name: 'forest.jpg',
				type: 'file',
				thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop',
				size: 4567890,
				modified: new Date('2024-01-13')
			},
			{
				id: 'file1',
				name: 'document.pdf',
				type: 'file',
				size: 1234567,
				modified: new Date('2024-01-12')
			},
			{
				id: 'folder1',
				name: 'My Photos',
				type: 'folder'
			}
		]
	}
}

export const WithCustomIcons: Story = {
	args: {
		items: [
			{
				id: 'folder1',
				name: 'Custom Folder',
				type: 'folder',
				icon: (
					<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" fill="#9333ea" />
					</svg>
				)
			},
			{
				id: 'file1',
				name: 'Custom File',
				type: 'file',
				icon: (
					<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#10b981" />
						<polyline points="14 2 14 8 20 8" />
					</svg>
				),
				size: 1234567,
				modified: new Date('2024-01-15')
			},
			{
				id: 'file2',
				name: 'Regular File',
				type: 'file',
				size: 8901,
				modified: new Date('2024-01-14')
			}
		]
	}
}
