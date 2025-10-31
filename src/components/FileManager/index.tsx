import React, { useState, useRef } from 'react'
import styles from './styles.module.scss'
import { ContextMenu, type ContextMenuItem } from '../ContextMenu'

export interface FileItem {
	id: string
	name: string
	type: 'folder' | 'file'
	/** Custom icon element that replaces the default icon */
	icon?: React.ReactNode
	/** Thumbnail image URL (for files only) */
	thumbnail?: string
	size?: number
	modified?: Date
	children?: FileItem[]
}

export interface FileManagerProps {
	/** Root items */
	readonly items: FileItem[]
	/** Top left menu items */
	readonly topMenuItems?: ContextMenuItem[]
	/** Callback when a file/folder is clicked */
	readonly onItemClick?: (item: FileItem, path: string[]) => void
	/** Callback when a file/folder is double-clicked */
	readonly onItemDoubleClick?: (item: FileItem, path: string[]) => void
	/** Callback when breadcrumb item is clicked */
	readonly onBreadcrumbClick?: (path: string[], index: number) => void
	/** Callback when breadcrumb item is double-clicked */
	readonly onBreadcrumbDoubleClick?: (path: string[], index: number) => void
	/** Callback to get context menu items for a file/folder */
	readonly getContextMenuItems?: (item: FileItem, path: string[]) => ContextMenuItem[]
	/** Custom className */
	readonly className?: string
}

export function FileManager({
	items,
	topMenuItems = [],
	onItemClick,
	onItemDoubleClick,
	onBreadcrumbClick,
	onBreadcrumbDoubleClick,
	getContextMenuItems,
	className = ''
}: FileManagerProps) {
	const [currentPath, setCurrentPath] = useState<string[]>([])
	const containerRef = useRef<HTMLDivElement>(null)

	// Get current directory items based on path
	const getCurrentItems = (): FileItem[] => {
		if (currentPath.length === 0) {
			return items
		}

		let current: FileItem[] = items
		for (const segment of currentPath) {
			const found = current.find((item) => item.id === segment || item.name === segment)
			if (found?.type !== 'folder' || !found.children?.length) {
				return []
			}
			current = found.children
		}
		return current
	}

	const handleItemClick = (item: FileItem, path: string[]) => {
		if (item.type === 'folder') {
			const newPath = [...path, item.id]
			setCurrentPath(newPath)
		}
		onItemClick?.(item, path)
	}

	const handleItemDoubleClick = (item: FileItem, path: string[]) => {
		if (item.type === 'folder') {
			const newPath = [...path, item.id]
			setCurrentPath(newPath)
		}
		onItemDoubleClick?.(item, path)
	}

	const handleBreadcrumbClick = (index: number) => {
		const newPath = currentPath.slice(0, index + 1)
		setCurrentPath(newPath)
		onBreadcrumbClick?.(newPath, index)
	}

	const handleBreadcrumbDoubleClick = (index: number) => {
		const newPath = currentPath.slice(0, index + 1)
		setCurrentPath(newPath)
		onBreadcrumbDoubleClick?.(newPath, index)
	}

	// Build breadcrumb items with names
	const getBreadcrumbItems = () => {
		const breadcrumbItems: Array<{ label: string; pathIndex: number }> = [{ label: 'Root', pathIndex: -1 }]

		let current: FileItem[] = items
		for (let i = 0; i < currentPath.length; i++) {
			const segment = currentPath[i]
			const found = current.find((item) => item.id === segment || item.name === segment)
			if (found) {
				breadcrumbItems.push({ label: found.name, pathIndex: i })
				if (found.type === 'folder' && found.children) {
					current = found.children
				} else {
					break
				}
			} else {
				break
			}
		}

		return breadcrumbItems
	}

	const breadcrumbItems = getBreadcrumbItems()

	// Calculate full path for an item
	const getItemPath = (item: FileItem, parentPath: string[] = currentPath): string[] => {
		return [...parentPath, item.id]
	}

	const renderFileItem = (item: FileItem, path: string[] = currentPath) => {
		const itemPath = getItemPath(item, path)
		const contextMenuItems = getContextMenuItems ? getContextMenuItems(item, itemPath) : []

		const defaultContextMenuItems: ContextMenuItem[] = [
			{
				id: 'open',
				label: 'Open',
				onClick: () => handleItemClick(item, path)
			},
			{
				id: 'rename',
				label: 'Rename',
				onClick: () => console.log('Rename', item.name)
			},
			{
				id: 'delete',
				label: 'Delete',
				danger: true,
				onClick: () => console.log('Delete', item.name)
			}
		]

		const menuItems = contextMenuItems.length > 0 ? contextMenuItems : defaultContextMenuItems

		const formatSize = (bytes?: number): string => {
			if (!bytes) return ''
			if (bytes < 1024) return `${bytes} B`
			if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
			return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
		}

		const formatDate = (date?: Date): string => {
			if (!date) return ''
			return date.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			})
		}

		// Determine what to show in the icon area
		const renderIconArea = () => {
			// If custom icon is provided, use it
			if (item.icon) {
				return <div className={styles.fileIcon}>{item.icon}</div>
			}

			// For files, check for thumbnail first
			if (item.type === 'file' && item.thumbnail) {
				return (
					<div className={styles.fileThumbnail}>
						<img src={item.thumbnail} alt={item.name} />
					</div>
				)
			}

			// Default icons
			return (
				<div className={styles.fileIcon}>
					{item.type === 'folder' ? (
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
						</svg>
					) : (
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
							<polyline points="14 2 14 8 20 8" />
						</svg>
					)}
				</div>
			)
		}

		const itemContent = (
			<button
				type="button"
				className={`${styles.fileItem} ${item.type === 'folder' ? styles.folder : styles.file}`}
				onClick={() => handleItemClick(item, path)}
				onDoubleClick={() => handleItemDoubleClick(item, path)}
			>
				{renderIconArea()}
				<div className={styles.fileInfo}>
					<div className={styles.fileName}>{item.name}</div>
					{item.type === 'file' && (item.size || item.modified) && (
						<div className={styles.fileMeta}>
							{item.size && <span>{formatSize(item.size)}</span>}
							{item.size && item.modified && <span className={styles.metaSeparator}>•</span>}
							{item.modified && <span>{formatDate(item.modified)}</span>}
						</div>
					)}
				</div>
			</button>
		)

		if (menuItems.length > 0) {
			return (
				<ContextMenu key={item.id} items={menuItems}>
					{itemContent}
				</ContextMenu>
			)
		}

		return <React.Fragment key={item.id}>{itemContent}</React.Fragment>
	}

	const currentItems = getCurrentItems()

	return (
		<div className={`${styles.fileManager} ${className}`} ref={containerRef}>
			<div className={styles.header}>
				{topMenuItems.length > 0 && (
					<div className={styles.topMenu}>
						<ContextMenu items={topMenuItems}>
							<button className={styles.menuButton} type="button" aria-label="Menu">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<line x1="3" y1="6" x2="21" y2="6" />
									<line x1="3" y1="12" x2="21" y2="12" />
									<line x1="3" y1="18" x2="21" y2="18" />
								</svg>
							</button>
						</ContextMenu>
					</div>
				)}
				<div className={styles.breadcrumbContainer}>
					<nav className={styles.breadcrumbs} aria-label="Breadcrumb">
						{breadcrumbItems.map((item, index) => {
							const isLast = index === breadcrumbItems.length - 1
							const handleClick = () => {
								if (item.pathIndex === -1) {
									setCurrentPath([])
									onBreadcrumbClick?.([], -1)
								} else {
									handleBreadcrumbClick(item.pathIndex)
								}
							}
							const handleDoubleClick = () => {
								if (item.pathIndex === -1) {
									setCurrentPath([])
									onBreadcrumbDoubleClick?.([], -1)
								} else {
									handleBreadcrumbDoubleClick(item.pathIndex)
								}
							}

							return (
								<React.Fragment key={`breadcrumb-${item.pathIndex}-${item.label}`}>
									{isLast ? (
										<span className={styles.breadcrumbCurrent}>{item.label}</span>
									) : (
										<button type="button" className={styles.breadcrumbLink} onClick={handleClick} onDoubleClick={handleDoubleClick}>
											{item.label}
										</button>
									)}
									{!isLast && <span className={styles.breadcrumbSeparator}>/</span>}
								</React.Fragment>
							)
						})}
					</nav>
				</div>
			</div>
			<div className={styles.content}>
				{currentItems.length === 0 ? (
					<div className={styles.emptyState}>
						<p>This folder is empty</p>
					</div>
				) : (
					<div className={styles.fileList}>{currentItems.map((item) => renderFileItem(item, currentPath))}</div>
				)}
			</div>
		</div>
	)
}
