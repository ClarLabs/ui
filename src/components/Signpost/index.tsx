import React, { useState, useRef, useEffect } from 'react'
import styles from './styles.module.scss'

export type SignpostPosition = 'top' | 'bottom' | 'left' | 'right'

export interface SignpostProps {
	trigger: React.ReactNode
	children: React.ReactNode
	position?: SignpostPosition
	className?: string
}

export function Signpost({ trigger, children, position = 'top', className = '' }: SignpostProps) {
	const [isOpen, setIsOpen] = useState(false)
	const signpostRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (signpostRef.current && !signpostRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [isOpen])

	return (
		<div className={`${styles.signpost} ${className}`} ref={signpostRef}>
			<div className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
				{trigger}
			</div>
			{isOpen && (
				<div className={`${styles.content} ${styles[position]}`}>
					<div className={styles.arrow}></div>
					<div className={styles.inner}>{children}</div>
				</div>
			)}
		</div>
	)
}
