import React from 'react'
import styles from './styles.module.scss'

export type AlertVariant = 'info' | 'success' | 'warning' | 'error'

export interface AlertProps {
	variant?: AlertVariant
	title?: string
	message: string
	dismissible?: boolean
	onDismiss?: () => void
	className?: string
}

export function Alert({ variant = 'info', title, message, dismissible = false, onDismiss, className = '' }: AlertProps) {
	const icons = {
		info: 'ℹ',
		success: '✓',
		warning: '⚠',
		error: '✕'
	}

	return (
		<div className={`${styles.alert} ${styles[variant]} ${className}`} role="alert">
			<div className={styles.icon}>{icons[variant]}</div>
			<div className={styles.content}>
				{title && <div className={styles.title}>{title}</div>}
				<div className={styles.message}>{message}</div>
			</div>
			{dismissible && (
				<button className={styles.dismissButton} onClick={onDismiss} aria-label="Dismiss alert">
					✕
				</button>
			)}
		</div>
	)
}
