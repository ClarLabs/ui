import React, { useState, DragEvent } from 'react'
import styles from './styles.module.scss'
import { Badge, BadgeVariant } from '../Badge'

export interface KanBanItem {
	id: string
	title: string
	description?: string
	badge?: string | number
	badgeVariant?: BadgeVariant
	[key: string]: any
}

export interface KanBanColumn {
	id: string
	title: string
	items: KanBanItem[]
	color?: string
	maxItems?: number
}

export interface KanBanProps {
	columns: KanBanColumn[]
	onItemMove?: (item: KanBanItem, fromColumnId: string, toColumnId: string) => void
	onItemClick?: (item: KanBanItem, columnId: string) => void
	onColumnAdd?: (columnId: string, columnTitle: string) => void
	onColumnRemove?: (columnId: string) => void
	allowAddColumns?: boolean
	allowRemoveColumns?: boolean
	className?: string
}

export function KanBan({
	columns: initialColumns,
	onItemMove,
	onItemClick,
	onColumnAdd,
	onColumnRemove,
	allowAddColumns = false,
	allowRemoveColumns = false,
	className = ''
}: KanBanProps) {
	const [columns, setColumns] = useState<KanBanColumn[]>(initialColumns)
	const [draggedItem, setDraggedItem] = useState<{ item: KanBanItem; columnId: string } | null>(null)
	const [dragOverColumn, setDragOverColumn] = useState<string | null>(null)
	const [newColumnTitle, setNewColumnTitle] = useState('')
	const [isAddingColumn, setIsAddingColumn] = useState(false)

	const handleDragStart = (e: DragEvent<HTMLDivElement>, item: KanBanItem, columnId: string) => {
		setDraggedItem({ item, columnId })
		e.dataTransfer.effectAllowed = 'move'
		e.currentTarget.style.opacity = '0.5'
	}

	const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
		e.currentTarget.style.opacity = '1'
		setDraggedItem(null)
		setDragOverColumn(null)
	}

	const handleDragOver = (e: DragEvent<HTMLDivElement>, columnId: string) => {
		e.preventDefault()
		e.dataTransfer.dropEffect = 'move'
		setDragOverColumn(columnId)
	}

	const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setDragOverColumn(null)
	}

	const handleDrop = (e: DragEvent<HTMLDivElement>, targetColumnId: string) => {
		e.preventDefault()
		setDragOverColumn(null)

		if (!draggedItem) return

		const { item, columnId: sourceColumnId } = draggedItem

		if (sourceColumnId === targetColumnId) {
			setDraggedItem(null)
			return
		}

		const targetColumn = columns.find((col) => col.id === targetColumnId)
		if (targetColumn?.maxItems && targetColumn.items.length >= targetColumn.maxItems) {
			setDraggedItem(null)
			return
		}

		const updatedColumns = columns.map((col) => {
			if (col.id === sourceColumnId) {
				return {
					...col,
					items: col.items.filter((i) => i.id !== item.id)
				}
			}
			if (col.id === targetColumnId) {
				return {
					...col,
					items: [...col.items, item]
				}
			}
			return col
		})

		setColumns(updatedColumns)
		onItemMove?.(item, sourceColumnId, targetColumnId)
		setDraggedItem(null)
	}

	const handleAddColumn = () => {
		if (!newColumnTitle.trim()) return

		const newColumn: KanBanColumn = {
			id: `column-${Date.now()}`,
			title: newColumnTitle,
			items: []
		}

		setColumns([...columns, newColumn])
		onColumnAdd?.(newColumn.id, newColumn.title)
		setNewColumnTitle('')
		setIsAddingColumn(false)
	}

	const handleRemoveColumn = (columnId: string) => {
		setColumns(columns.filter((col) => col.id !== columnId))
		onColumnRemove?.(columnId)
	}

	const handleItemClick = (item: KanBanItem, columnId: string) => {
		onItemClick?.(item, columnId)
	}

	return (
		<div className={`${styles.kanban} ${className}`}>
			<div className={styles.columnsContainer}>
				{columns.map((column) => (
					<div
						key={column.id}
						className={`${styles.column} ${dragOverColumn === column.id ? styles.dragOver : ''}`}
						onDragOver={(e) => handleDragOver(e, column.id)}
						onDragLeave={handleDragLeave}
						onDrop={(e) => handleDrop(e, column.id)}
					>
						<div className={styles.columnHeader} style={{ borderLeftColor: column.color }}>
							<h3 className={styles.columnTitle}>{column.title}</h3>
							<div className={styles.columnHeaderActions}>
								<Badge variant="default" size="sm">
									{column.items.length}
									{column.maxItems ? `/${column.maxItems}` : ''}
								</Badge>
								{allowRemoveColumns && (
									<button
										onClick={() => handleRemoveColumn(column.id)}
										className={styles.removeColumnButton}
										title="Remove column"
										aria-label="Remove column"
									>
										<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
											<path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</button>
								)}
							</div>
						</div>
						<div className={styles.columnContent}>
							{column.items.length === 0 ? (
								<div className={styles.emptyColumn}>Drop items here</div>
							) : (
								column.items.map((item) => (
									<div
										key={item.id}
										className={styles.item}
										draggable
										onDragStart={(e) => handleDragStart(e, item, column.id)}
										onDragEnd={handleDragEnd}
										onClick={() => handleItemClick(item, column.id)}
										role="button"
										tabIndex={0}
									>
										<div className={styles.itemHeader}>
											<h4 className={styles.itemTitle}>{item.title}</h4>
											{item.badge && (
												<Badge variant={item.badgeVariant || 'default'} size="sm">
													{item.badge}
												</Badge>
											)}
										</div>
										{item.description && <p className={styles.itemDescription}>{item.description}</p>}
									</div>
								))
							)}
						</div>
					</div>
				))}

				{allowAddColumns && (
					<div className={styles.addColumnContainer}>
						{isAddingColumn ? (
							<div className={styles.addColumnForm}>
								<input
									type="text"
									value={newColumnTitle}
									onChange={(e) => setNewColumnTitle(e.target.value)}
									placeholder="Column title"
									className={styles.addColumnInput}
									autoFocus
									onKeyDown={(e) => {
										if (e.key === 'Enter') handleAddColumn()
										if (e.key === 'Escape') {
											setIsAddingColumn(false)
											setNewColumnTitle('')
										}
									}}
								/>
								<div className={styles.addColumnActions}>
									<button onClick={handleAddColumn} className={styles.addColumnSaveButton} disabled={!newColumnTitle.trim()}>
										Add
									</button>
									<button
										onClick={() => {
											setIsAddingColumn(false)
											setNewColumnTitle('')
										}}
										className={styles.addColumnCancelButton}
									>
										Cancel
									</button>
								</div>
							</div>
						) : (
							<button onClick={() => setIsAddingColumn(true)} className={styles.addColumnButton}>
								<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
									<path d="M10 4.167v11.666M4.167 10h11.666" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
								Add Column
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
