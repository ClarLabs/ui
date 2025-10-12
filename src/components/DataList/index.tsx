import React from 'react'
import styles from './styles.module.scss'

export type DataListOrientation = 'horizontal' | 'vertical'
export type DataListSize = 'sm' | 'md' | 'lg'

export interface DataListItem {
	/** Unique identifier */
	id: string
	/** Label/key to display */
	label: string
	/** Value to display */
	value: React.ReactNode
	/** Optional icon */
	icon?: React.ReactNode
	/** Optional help text for the label */
	helpText?: string
	/** Custom className for the item */
	className?: string
	/** Highlight this item */
	highlight?: boolean
	/** Make the value copyable */
	copyable?: boolean
}

export interface DataListProps {
	/** List of items to display */
	items: DataListItem[]
	/** Orientation of the list */
	orientation?: DataListOrientation
	/** Size variant */
	size?: DataListSize
	/** Show dividers between items */
	dividers?: boolean
	/** Make labels bold */
	boldLabels?: boolean
	/** Custom className */
	className?: string
	/** Custom label width (for horizontal orientation) */
	labelWidth?: string
	/** Striped rows */
	striped?: boolean
	/** Callback when a copyable value is copied */
	onCopy?: (item: DataListItem) => void
}

export function DataList({
	items,
	orientation = 'horizontal',
	size = 'md',
	dividers = true,
	boldLabels = true,
	className = '',
	labelWidth,
	striped = false,
	onCopy
}: DataListProps) {
	const handleCopy = async (item: DataListItem) => {
		if (!item.copyable || typeof item.value !== 'string') return

		try {
			await navigator.clipboard.writeText(item.value as string)
			onCopy?.(item)
		} catch (err) {
			console.error('Failed to copy:', err)
		}
	}

	return (
		<dl
			className={`${styles.dataList} ${styles[orientation]} ${styles[size]} ${dividers ? styles.dividers : ''} ${striped ? styles.striped : ''} ${className}`}
			style={
				{
					'--label-width': labelWidth
				} as React.CSSProperties
			}
		>
			{items.map((item, index) => (
				<div
					key={item.id}
					className={`${styles.item} ${item.highlight ? styles.highlight : ''} ${item.className || ''}`}
				>
					<dt className={`${styles.label} ${boldLabels ? styles.bold : ''}`}>
						{item.icon && <span className={styles.icon}>{item.icon}</span>}
						<span className={styles.labelText}>
							{item.label}
							{item.helpText && (
								<span className={styles.helpText} title={item.helpText}>
									?
								</span>
							)}
						</span>
					</dt>
					<dd className={styles.value}>
						<span className={styles.valueContent}>{item.value}</span>
						{item.copyable && (
							<button
								type="button"
								className={styles.copyButton}
								onClick={() => handleCopy(item)}
								aria-label="Copy value"
								title="Copy to clipboard"
							>
								<svg
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M5.5 2.5h-2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2m-5-8h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1z"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						)}
					</dd>
				</div>
			))}
		</dl>
	)
}
