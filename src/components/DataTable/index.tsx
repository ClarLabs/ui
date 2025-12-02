import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'

export interface DataTableColumn<T = any> {
	key: string
	header: string
	width?: string
	editable?: boolean
	type?: 'text' | 'number' | 'date' | 'email'
	render?: (value: any, row: T, isEditing: boolean) => React.ReactNode
}

export interface DataTableProps<T = any> {
	columns: DataTableColumn<T>[]
	data: T[]
	striped?: boolean
	hoverable?: boolean
	bordered?: boolean
	compact?: boolean
	editable?: boolean
	deletable?: boolean
	addable?: boolean
	onRowClick?: (row: T) => void
	onRowEdit?: (row: T, rowIndex: number) => void
	onRowDelete?: (row: T, rowIndex: number) => void
	onRowAdd?: (row: T) => void
	rowIdKey?: string
	className?: string
}

export function DataTable<T = any>({
	columns,
	data: initialData,
	striped = false,
	hoverable = false,
	bordered = false,
	compact = false,
	editable = false,
	deletable = false,
	addable = false,
	onRowClick,
	onRowEdit,
	onRowDelete,
	onRowAdd,
	rowIdKey = 'id',
	className = ''
}: DataTableProps<T>) {
	const [data, setData] = useState<T[]>(initialData)
	const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null)
	const [editingRow, setEditingRow] = useState<any>(null)
	const [isAddingRow, setIsAddingRow] = useState(false)
	const [newRow, setNewRow] = useState<any>({})

	// Sync internal state with external data prop changes
	useEffect(() => {
		setData(initialData)
	}, [initialData])

	const handleEditClick = (row: T, index: number) => {
		setEditingRowIndex(index)
		setEditingRow({ ...row })
	}

	const handleSaveClick = (index: number) => {
		const updatedData = [...data]
		updatedData[index] = editingRow
		setData(updatedData)
		onRowEdit?.(editingRow, index)
		setEditingRowIndex(null)
		setEditingRow(null)
	}

	const handleCancelClick = () => {
		setEditingRowIndex(null)
		setEditingRow(null)
	}

	const handleDeleteClick = (row: T, index: number) => {
		const updatedData = data.filter((_, i) => i !== index)
		setData(updatedData)
		onRowDelete?.(row, index)
	}

	const handleAddClick = () => {
		setIsAddingRow(true)
		const emptyRow: any = {}
		columns.forEach((col) => {
			emptyRow[col.key] = ''
		})
		setNewRow(emptyRow)
	}

	const handleSaveNewRow = () => {
		const updatedData = [...data, newRow]
		setData(updatedData)
		onRowAdd?.(newRow)
		setIsAddingRow(false)
		setNewRow({})
	}

	const handleCancelNewRow = () => {
		setIsAddingRow(false)
		setNewRow({})
	}

	const handleCellChange = (key: string, value: any, isNewRow: boolean = false) => {
		if (isNewRow) {
			setNewRow({ ...newRow, [key]: value })
		} else {
			setEditingRow({ ...editingRow, [key]: value })
		}
	}

	const renderCell = (column: DataTableColumn<T>, row: T, rowIndex: number, isNewRow: boolean = false) => {
		const isEditing = isNewRow ? true : editingRowIndex === rowIndex
		const value = isNewRow ? newRow[column.key] : isEditing ? editingRow?.[column.key] : row[column.key as keyof T]

		if (column.render && !isEditing) {
			return column.render(value, row, isEditing)
		}

		if (isEditing && column.editable !== false) {
			return (
				<input
					type={column.type || 'text'}
					value={value || ''}
					onChange={(e) => handleCellChange(column.key, e.target.value, isNewRow)}
					className={styles.cellInput}
				/>
			)
		}

		return String(value ?? '')
	}

	const renderActionButtons = (row: T, index: number) => {
		if (editingRowIndex === index) {
			return (
				<div className={styles.actionButtons}>
					<button onClick={() => handleSaveClick(index)} className={`${styles.actionButton} ${styles.save}`} title="Save">
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
							<path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>
					<button onClick={handleCancelClick} className={`${styles.actionButton} ${styles.cancel}`} title="Cancel">
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
							<path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>
				</div>
			)
		}

		return (
			<div className={styles.actionButtons}>
				{editable && (
					<button onClick={() => handleEditClick(row, index)} className={`${styles.actionButton} ${styles.edit}`} title="Edit">
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
							<path
								d="M11.333 2A1.886 1.886 0 0 1 14 4.667l-9 9-3.667 1 1-3.667 9-9Z"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				)}
				{deletable && (
					<button onClick={() => handleDeleteClick(row, index)} className={`${styles.actionButton} ${styles.delete}`} title="Delete">
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
							<path
								d="M2 4h12M5.333 4V2.667a1.333 1.333 0 0 1 1.334-1.334h2.666a1.333 1.333 0 0 1 1.334 1.334V4m2 0v9.333a1.333 1.333 0 0 1-1.334 1.334H4.667a1.334 1.334 0 0 1-1.334-1.334V4h9.334Z"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				)}
			</div>
		)
	}

	return (
		<div className={`${styles.dataTableWrapper} ${className}`}>
			{addable && (
				<div className={styles.toolbar}>
					<button onClick={handleAddClick} disabled={isAddingRow} className={styles.addButton}>
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
							<path d="M8 3.333v9.334M3.333 8h9.334" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
						Add Row
					</button>
				</div>
			)}
			<div className={styles.tableContainer}>
				<table
					className={`${styles.table} ${striped ? styles.striped : ''} ${hoverable ? styles.hoverable : ''} ${bordered ? styles.bordered : ''} ${compact ? styles.compact : ''}`}
				>
					<thead className={styles.thead}>
						<tr>
							{columns.map((column) => (
								<th key={column.key} className={styles.th} style={{ width: column.width }}>
									{column.header}
								</th>
							))}
							{(editable || deletable) && <th className={`${styles.th} ${styles.actionColumn}`}>Actions</th>}
						</tr>
					</thead>
					<tbody className={styles.tbody}>
						{data.map((row, index) => (
							<tr
								key={(row as any)[rowIdKey] || index}
								className={`${styles.tr} ${onRowClick && !editable ? styles.clickable : ''}`}
								onClick={() => editingRowIndex === null && onRowClick?.(row)}
							>
								{columns.map((column) => (
									<td key={column.key} className={styles.td}>
										{renderCell(column, row, index)}
									</td>
								))}
								{(editable || deletable) && <td className={`${styles.td} ${styles.actionCell}`}>{renderActionButtons(row, index)}</td>}
							</tr>
						))}
						{isAddingRow && (
							<tr className={styles.tr}>
								{columns.map((column) => (
									<td key={column.key} className={styles.td}>
										{renderCell(column, {} as T, -1, true)}
									</td>
								))}
								{(editable || deletable) && (
									<td className={`${styles.td} ${styles.actionCell}`}>
										<div className={styles.actionButtons}>
											<button onClick={handleSaveNewRow} className={`${styles.actionButton} ${styles.save}`} title="Save">
												<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
													<path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</button>
											<button onClick={handleCancelNewRow} className={`${styles.actionButton} ${styles.cancel}`} title="Cancel">
												<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
													<path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</button>
										</div>
									</td>
								)}
							</tr>
						)}
					</tbody>
				</table>
				{data.length === 0 && !isAddingRow && <div className={styles.empty}>No data available</div>}
			</div>
		</div>
	)
}
