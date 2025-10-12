import React, { useEffect } from 'react'
import styles from './styles.module.scss'

export type SidePanelPosition = 'left' | 'right'
export type SidePanelSize = 'sm' | 'md' | 'lg'

export interface SidePanelProps {
	isOpen: boolean
	onClose: () => void
	title?: string
	children: React.ReactNode
	footer?: React.ReactNode
	position?: SidePanelPosition
	size?: SidePanelSize
	closeOnOverlayClick?: boolean
	showCloseButton?: boolean
	className?: string
}

export function SidePanel({
	isOpen,
	onClose,
	title,
	children,
	footer,
	position = 'right',
	size = 'md',
	closeOnOverlayClick = true,
	showCloseButton = true,
	className = ''
}: SidePanelProps) {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen) {
				onClose()
			}
		}
		document.addEventListener('keydown', handleEscape)
		return () => document.removeEventListener('keydown', handleEscape)
	}, [isOpen, onClose])

	if (!isOpen) return null

	return (
		<div className={styles.overlay} onClick={closeOnOverlayClick ? onClose : undefined}>
			<div className={`${styles.sidePanel} ${styles[position]} ${styles[size]} ${className}`} onClick={(e) => e.stopPropagation()}>
				{(title || showCloseButton) && (
					<div className={styles.header}>
						{title && <h2 className={styles.title}>{title}</h2>}
						{showCloseButton && (
							<button className={styles.closeButton} onClick={onClose} type="button">
								×
							</button>
						)}
					</div>
				)}
				<div className={styles.content}>{children}</div>
				{footer && <div className={styles.footer}>{footer}</div>}
			</div>
		</div>
	)
}
