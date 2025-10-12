import React from 'react'
import styles from './styles.module.scss'

export type LabelSize = 'sm' | 'md' | 'lg'

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
	size?: LabelSize
	required?: boolean
	disabled?: boolean
	children: React.ReactNode
}

export function Label({ size = 'md', required = false, disabled = false, className = '', children, ...props }: LabelProps) {
	return (
		<label className={`${styles.label} ${styles[size]} ${disabled ? styles.disabled : ''} ${className}`} {...props}>
			{children}
			{required && <span className={styles.required}>*</span>}
		</label>
	)
}
