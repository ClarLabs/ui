import React from 'react'
import styles from './styles.module.scss'

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant
	size?: ButtonSize
	fullWidth?: boolean
	loading?: boolean
	children: React.ReactNode
}

export function Button({ variant = 'primary', size = 'md', fullWidth = false, loading = false, disabled, className = '', children, ...props }: ButtonProps) {
	return (
		<button
			className={`
        ${styles.button}
        ${styles[variant]}
        ${styles[size]}
        ${fullWidth ? styles.fullWidth : ''}
        ${loading ? styles.loading : ''}
        ${className}
      `}
			disabled={disabled || loading}
			{...props}
		>
			{loading && <span className={styles.spinner} />}
			<span className={loading ? styles.hiddenContent : ''}>{children}</span>
		</button>
	)
}
