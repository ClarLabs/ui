import React, { useState, useRef, useEffect, useCallback } from 'react'
import styles from './styles.module.scss'

export type SplitDirection = 'horizontal' | 'vertical'

export interface SplitProps {
	/** Direction of the split */
	direction?: SplitDirection
	/** Initial size of the first pane (in percentage, 0-100) */
	initialSize?: number
	/** Minimum size of the first pane (in pixels) */
	minSize?: number
	/** Maximum size of the first pane (in pixels) */
	maxSize?: number
	/** First pane content */
	children: [React.ReactNode, React.ReactNode]
	/** Callback when size changes */
	onResize?: (size: number) => void
	/** Custom className */
	className?: string
	/** Disable resizing */
	disabled?: boolean
	/** Show snap guides at common positions */
	snapPositions?: number[]
	/** Snap threshold in pixels */
	snapThreshold?: number
	/** Gutter size in pixels */
	gutterSize?: number
}

export function Split({
	direction = 'horizontal',
	initialSize = 50,
	minSize = 100,
	maxSize,
	children,
	onResize,
	className = '',
	disabled = false,
	snapPositions = [],
	snapThreshold = 20,
	gutterSize = 8
}: SplitProps) {
	const [size, setSize] = useState(initialSize)
	const [isDragging, setIsDragging] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)
	const startPositionRef = useRef<number>(0)
	const startSizeRef = useRef<number>(0)

	const isHorizontal = direction === 'horizontal'

	const handleMouseDown = (e: React.MouseEvent) => {
		if (disabled) return

		e.preventDefault()
		setIsDragging(true)
		startPositionRef.current = isHorizontal ? e.clientX : e.clientY
		startSizeRef.current = size
	}

	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (!isDragging || !containerRef.current) return

			const container = containerRef.current
			const containerRect = container.getBoundingClientRect()
			const containerSize = isHorizontal ? containerRect.width : containerRect.height
			const currentPosition = isHorizontal ? e.clientX : e.clientY
			const startPosition = isHorizontal ? containerRect.left : containerRect.top

			// Calculate the new size as a percentage
			const delta = currentPosition - startPositionRef.current
			const deltaPercentage = (delta / containerSize) * 100
			let newSize = startSizeRef.current + deltaPercentage

			// Apply min/max constraints
			const minPercentage = (minSize / containerSize) * 100
			let maxPercentage = 100 - minPercentage

			if (maxSize) {
				maxPercentage = Math.min(maxPercentage, (maxSize / containerSize) * 100)
			}

			newSize = Math.max(minPercentage, Math.min(maxPercentage, newSize))

			// Apply snap positions
			if (snapPositions.length > 0) {
				for (const snapPos of snapPositions) {
					const snapPixels = (snapPos / 100) * containerSize
					const currentPixels = (newSize / 100) * containerSize
					const diff = Math.abs(currentPixels - snapPixels)

					if (diff < snapThreshold) {
						newSize = snapPos
						break
					}
				}
			}

			setSize(newSize)
			onResize?.(newSize)
		},
		[isDragging, isHorizontal, minSize, maxSize, snapPositions, snapThreshold, onResize]
	)

	const handleMouseUp = useCallback(() => {
		if (isDragging) {
			setIsDragging(false)
		}
	}, [isDragging])

	useEffect(() => {
		if (isDragging) {
			document.addEventListener('mousemove', handleMouseMove)
			document.addEventListener('mouseup', handleMouseUp)

			// Prevent text selection while dragging
			document.body.style.userSelect = 'none'
			document.body.style.cursor = isHorizontal ? 'col-resize' : 'row-resize'

			return () => {
				document.removeEventListener('mousemove', handleMouseMove)
				document.removeEventListener('mouseup', handleMouseUp)
				document.body.style.userSelect = ''
				document.body.style.cursor = ''
			}
		}
	}, [isDragging, handleMouseMove, handleMouseUp, isHorizontal])

	// Handle touch events for mobile
	const handleTouchStart = (e: React.TouchEvent) => {
		if (disabled) return

		e.preventDefault()
		setIsDragging(true)
		const touch = e.touches[0]
		startPositionRef.current = isHorizontal ? touch.clientX : touch.clientY
		startSizeRef.current = size
	}

	const handleTouchMove = useCallback(
		(e: TouchEvent) => {
			if (!isDragging || !containerRef.current) return

			const touch = e.touches[0]
			const container = containerRef.current
			const containerRect = container.getBoundingClientRect()
			const containerSize = isHorizontal ? containerRect.width : containerRect.height
			const currentPosition = isHorizontal ? touch.clientX : touch.clientY

			const delta = currentPosition - startPositionRef.current
			const deltaPercentage = (delta / containerSize) * 100
			let newSize = startSizeRef.current + deltaPercentage

			const minPercentage = (minSize / containerSize) * 100
			let maxPercentage = 100 - minPercentage

			if (maxSize) {
				maxPercentage = Math.min(maxPercentage, (maxSize / containerSize) * 100)
			}

			newSize = Math.max(minPercentage, Math.min(maxPercentage, newSize))

			if (snapPositions.length > 0) {
				for (const snapPos of snapPositions) {
					const snapPixels = (snapPos / 100) * containerSize
					const currentPixels = (newSize / 100) * containerSize
					const diff = Math.abs(currentPixels - snapPixels)

					if (diff < snapThreshold) {
						newSize = snapPos
						break
					}
				}
			}

			setSize(newSize)
			onResize?.(newSize)
		},
		[isDragging, isHorizontal, minSize, maxSize, snapPositions, snapThreshold, onResize]
	)

	const handleTouchEnd = useCallback(() => {
		if (isDragging) {
			setIsDragging(false)
		}
	}, [isDragging])

	useEffect(() => {
		if (isDragging) {
			document.addEventListener('touchmove', handleTouchMove)
			document.addEventListener('touchend', handleTouchEnd)

			return () => {
				document.removeEventListener('touchmove', handleTouchMove)
				document.removeEventListener('touchend', handleTouchEnd)
			}
		}
	}, [isDragging, handleTouchMove, handleTouchEnd])

	const [firstPane, secondPane] = children

	return (
		<div
			ref={containerRef}
			className={`${styles.split} ${styles[direction]} ${isDragging ? styles.dragging : ''} ${disabled ? styles.disabled : ''} ${className}`}
		>
			<div
				className={styles.pane}
				style={{
					[isHorizontal ? 'width' : 'height']: `${size}%`
				}}
			>
				{firstPane}
			</div>

			<div
				className={styles.gutter}
				style={{
					[isHorizontal ? 'width' : 'height']: `${gutterSize}px`
				}}
				onMouseDown={handleMouseDown}
				onTouchStart={handleTouchStart}
				role="separator"
				aria-orientation={direction}
				aria-valuenow={size}
				aria-valuemin={minSize}
				aria-valuemax={maxSize || 100}
			>
				<div className={styles.gutterHandle} />
			</div>

			<div
				className={styles.pane}
				style={{
					flex: 1
				}}
			>
				{secondPane}
			</div>
		</div>
	)
}
