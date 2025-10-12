import React, { useState, useRef, useEffect } from 'react'
import styles from './styles.module.scss'

export type WindowSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type WindowVariant = 'default' | 'dark' | 'light'

export interface WindowProps {
	/** Window title */
	title?: string
	/** Window size preset */
	size?: WindowSize
	/** Visual variant */
	variant?: WindowVariant
	/** Whether the window is open */
	open?: boolean
	/** Whether the window can be closed */
	closable?: boolean
	/** Whether the window can be minimized */
	minimizable?: boolean
	/** Whether the window can be maximized */
	maximizable?: boolean
	/** Whether the window is resizable */
	resizable?: boolean
	/** Whether the window is draggable */
	draggable?: boolean
	/** Callback when close button is clicked */
	onClose?: () => void
	/** Callback when minimize button is clicked */
	onMinimize?: () => void
	/** Callback when maximize button is clicked */
	onMaximize?: () => void
	/** Custom width */
	width?: string | number
	/** Custom height */
	height?: string | number
	/** Initial position X */
	initialX?: number
	/** Initial position Y */
	initialY?: number
	/** Window content */
	children: React.ReactNode
	/** Custom className */
	className?: string
	/** Show window controls */
	showControls?: boolean
	/** Custom toolbar content */
	toolbar?: React.ReactNode
	/** Footer content */
	footer?: React.ReactNode
}

export function Window({
	title = 'Window',
	size = 'md',
	variant = 'default',
	open = true,
	closable = true,
	minimizable = false,
	maximizable = true,
	resizable = false,
	draggable = true,
	onClose,
	onMinimize,
	onMaximize,
	width,
	height,
	initialX = 0,
	initialY = 0,
	children,
	className = '',
	showControls = true,
	toolbar,
	footer
}: WindowProps) {
	const [isMaximized, setIsMaximized] = useState(false)
	const [position, setPosition] = useState({ x: initialX, y: initialY })
	const [isDragging, setIsDragging] = useState(false)
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
	const windowRef = useRef<HTMLDivElement>(null)

	if (!open) return null

	const handleMouseDown = (e: React.MouseEvent) => {
		if (!draggable || isMaximized) return

		setIsDragging(true)
		setDragStart({
			x: e.clientX - position.x,
			y: e.clientY - position.y
		})
	}

	const handleMouseMove = (e: MouseEvent) => {
		if (!isDragging) return

		setPosition({
			x: e.clientX - dragStart.x,
			y: e.clientY - dragStart.y
		})
	}

	const handleMouseUp = () => {
		setIsDragging(false)
	}

	useEffect(() => {
		if (isDragging) {
			document.addEventListener('mousemove', handleMouseMove)
			document.addEventListener('mouseup', handleMouseUp)

			return () => {
				document.removeEventListener('mousemove', handleMouseMove)
				document.removeEventListener('mouseup', handleMouseUp)
			}
		}
	}, [isDragging, dragStart])

	const handleMaximize = () => {
		setIsMaximized(!isMaximized)
		onMaximize?.()
	}

	const windowStyle: React.CSSProperties = {}
	if (!isMaximized && draggable) {
		windowStyle.transform = `translate(${position.x}px, ${position.y}px)`
	}
	if (width) windowStyle.width = typeof width === 'number' ? `${width}px` : width
	if (height) windowStyle.height = typeof height === 'number' ? `${height}px` : height

	const windowClasses = [
		styles.window,
		styles[`size-${size}`],
		styles[`variant-${variant}`],
		isMaximized && styles.maximized,
		resizable && styles.resizable,
		className
	]
		.filter(Boolean)
		.join(' ')

	return (
		<div ref={windowRef} className={windowClasses} style={windowStyle}>
			{/* Title Bar */}
			<div
				className={`${styles.titleBar} ${draggable && !isMaximized ? styles.draggable : ''}`}
				onMouseDown={handleMouseDown}
			>
				<div className={styles.titleBarContent}>
					<span className={styles.title}>{title}</span>
					{toolbar && <div className={styles.toolbar}>{toolbar}</div>}
				</div>

				{showControls && (
					<div className={styles.controls}>
						{minimizable && (
							<button
								type="button"
								className={`${styles.control} ${styles.minimize}`}
								onClick={onMinimize}
								aria-label="Minimize"
							>
								−
							</button>
						)}
						{maximizable && (
							<button
								type="button"
								className={`${styles.control} ${styles.maximize}`}
								onClick={handleMaximize}
								aria-label={isMaximized ? 'Restore' : 'Maximize'}
							>
								{isMaximized ? '⧉' : '□'}
							</button>
						)}
						{closable && (
							<button
								type="button"
								className={`${styles.control} ${styles.close}`}
								onClick={onClose}
								aria-label="Close"
							>
								×
							</button>
						)}
					</div>
				)}
			</div>

			{/* Content */}
			<div className={styles.content}>{children}</div>

			{/* Footer */}
			{footer && <div className={styles.footer}>{footer}</div>}
		</div>
	)
}
