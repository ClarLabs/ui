import React from 'react'
import styles from './styles.module.scss'

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type GridAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
export type GridJustify = 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'

export interface GridProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
	/** Number of columns (1-12). Applies from sm breakpoint (640px) and above. Defaults to 1 column on mobile for automatic stacking. */
	columns?: GridColumns
	/** Number of columns on small screens (mobile, <640px). If not specified, defaults to 1 column (stacked). */
	columnsSm?: GridColumns
	/** Number of columns on medium screens (tablet, ≥768px) */
	columnsMd?: GridColumns
	/** Number of columns on large screens (desktop, ≥1024px) */
	columnsLg?: GridColumns
	/** Number of columns on extra large screens (≥1280px) */
	columnsXl?: GridColumns
	/** Gap between grid items */
	gap?: GridGap
	/** Row gap between grid items */
	rowGap?: GridGap
	/** Column gap between grid items */
	columnGap?: GridGap
	/** Align items along the cross axis */
	alignItems?: GridAlign
	/** Justify items along the main axis */
	justifyItems?: GridAlign
	/** Justify content along the main axis */
	justifyContent?: GridJustify
	/** Whether grid items should auto-flow */
	autoFlow?: 'row' | 'column' | 'dense' | 'row-dense' | 'column-dense'
	/** Custom className */
	className?: string
	/** Children */
	children: React.ReactNode
}

export interface GridItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
	/** Column span (1-12) */
	colSpan?: GridColumns | 'full'
	/** Column span on small screens */
	colSpanSm?: GridColumns | 'full'
	/** Column span on medium screens */
	colSpanMd?: GridColumns | 'full'
	/** Column span on large screens */
	colSpanLg?: GridColumns | 'full'
	/** Column span on extra large screens */
	colSpanXl?: GridColumns | 'full'
	/** Row span */
	rowSpan?: number
	/** Column start position */
	colStart?: number
	/** Column end position */
	colEnd?: number
	/** Row start position */
	rowStart?: number
	/** Row end position */
	rowEnd?: number
	/** Custom className */
	className?: string
	/** Children */
	children?: React.ReactNode
}

export function Grid({
	columns = 12,
	columnsSm,
	columnsMd,
	columnsLg,
	columnsXl,
	gap = 'md',
	rowGap,
	columnGap,
	alignItems,
	justifyItems,
	justifyContent,
	autoFlow,
	className = '',
	children,
	...props
}: GridProps) {
	const classes = [
		styles.grid,
		styles[`columns-${columns}`],
		columnsSm && styles[`columns-sm-${columnsSm}`],
		columnsMd && styles[`columns-md-${columnsMd}`],
		columnsLg && styles[`columns-lg-${columnsLg}`],
		columnsXl && styles[`columns-xl-${columnsXl}`],
		styles[`gap-${gap}`],
		rowGap && styles[`row-gap-${rowGap}`],
		columnGap && styles[`column-gap-${columnGap}`],
		alignItems && styles[`align-${alignItems}`],
		justifyItems && styles[`justify-items-${justifyItems}`],
		justifyContent && styles[`justify-content-${justifyContent}`],
		autoFlow && styles[`flow-${autoFlow}`],
		className
	]
		.filter(Boolean)
		.join(' ')

	return (
		<div className={classes} {...props}>
			{children}
		</div>
	)
}

export function GridItem({
	colSpan,
	colSpanSm,
	colSpanMd,
	colSpanLg,
	colSpanXl,
	rowSpan,
	colStart,
	colEnd,
	rowStart,
	rowEnd,
	className = '',
	children,
	...props
}: GridItemProps) {
	const classes = [
		styles.gridItem,
		colSpan && styles[`col-span-${colSpan}`],
		colSpanSm && styles[`col-span-sm-${colSpanSm}`],
		colSpanMd && styles[`col-span-md-${colSpanMd}`],
		colSpanLg && styles[`col-span-lg-${colSpanLg}`],
		colSpanXl && styles[`col-span-xl-${colSpanXl}`],
		rowSpan && styles[`row-span-${rowSpan}`],
		className
	]
		.filter(Boolean)
		.join(' ')

	const inlineStyles: React.CSSProperties = {}
	if (colStart) inlineStyles.gridColumnStart = colStart
	if (colEnd) inlineStyles.gridColumnEnd = colEnd
	if (rowStart) inlineStyles.gridRowStart = rowStart
	if (rowEnd) inlineStyles.gridRowEnd = rowEnd

	return (
		<div className={classes} style={inlineStyles} {...props}>
			{children}
		</div>
	)
}

Grid.Item = GridItem
