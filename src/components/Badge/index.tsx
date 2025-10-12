import React from 'react'
import styles from './styles.module.scss'

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
export type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps {
	children: React.ReactNode
	variant?: BadgeVariant
	size?: BadgeSize
	dot?: boolean
	className?: string
}

export function Badge({ children, variant = 'default', size = 'md', dot = false, className = '' }: BadgeProps) {
	return (
		<span className={`${styles.badge} ${styles[variant]} ${styles[size]} ${className}`}>
			{dot && <span className={styles.dot} />}
			{children}
		</span>
	)
}
