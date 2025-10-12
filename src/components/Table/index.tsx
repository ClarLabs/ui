import React from 'react'
import styles from './styles.module.scss'

export interface TableColumn<T = any> {
	key: string
	header: string
	width?: string
	render?: (value: any, row: T) => React.ReactNode
}

export interface TableProps<T = any> {
	columns: TableColumn<T>[]
	data: T[]
	striped?: boolean
	hoverable?: boolean
	bordered?: boolean
	compact?: boolean
	onRowClick?: (row: T) => void
	className?: string
}

export function Table<T = any>({
	columns,
	data,
	striped = false,
	hoverable = false,
	bordered = false,
	compact = false,
	onRowClick,
	className = ''
}: TableProps<T>) {
	return (
		<div className={`${styles.tableWrapper} ${className}`}>
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
					</tr>
				</thead>
				<tbody className={styles.tbody}>
					{data.map((row, index) => (
						<tr key={index} className={`${styles.tr} ${onRowClick ? styles.clickable : ''}`} onClick={() => onRowClick?.(row)}>
							{columns.map((column) => (
								<td key={column.key} className={styles.td}>
									{column.render ? column.render(row[column.key as keyof T], row) : String(row[column.key as keyof T] ?? '')}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			{data.length === 0 && <div className={styles.empty}>No data available</div>}
		</div>
	)
}
