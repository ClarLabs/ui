import React, { useState, useRef, useEffect } from 'react'
import styles from './styles.module.scss'

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
	children: React.ReactElement
	content: React.ReactNode
	position?: TooltipPosition
	delay?: number
	className?: string
}

export function Tooltip({ children, content, position = 'top', delay = 200, className = '' }: TooltipProps) {
	const [isVisible, setIsVisible] = useState(false)
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
	const triggerRef = useRef<HTMLDivElement>(null)

	const showTooltip = () => {
		timeoutRef.current = setTimeout(() => {
			setIsVisible(true)
		}, delay)
	}

	const hideTooltip = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}
		setIsVisible(false)
	}

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [])

	return (
		<div
			className={`${styles.tooltipWrapper} ${className}`}
			ref={triggerRef}
			onMouseEnter={showTooltip}
			onMouseLeave={hideTooltip}
			onFocus={showTooltip}
			onBlur={hideTooltip}
		>
			{children}
			{isVisible && (
				<div className={`${styles.tooltip} ${styles[position]}`} role="tooltip">
					<div className={styles.tooltipContent}>{content}</div>
					<div className={styles.tooltipArrow}></div>
				</div>
			)}
		</div>
	)
}
