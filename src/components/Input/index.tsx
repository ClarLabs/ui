import React, { forwardRef } from 'react'
import styles from './styles.module.scss'

export type InputSize = 'sm' | 'md' | 'lg'
export type InputVariant = 'default' | 'error' | 'success'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
	label?: string
	error?: string
	helperText?: string
	size?: InputSize
	variant?: InputVariant
	icon?: React.ReactNode
	fullWidth?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, error, helperText, size = 'md', variant = 'default', icon, fullWidth = false, className = '', disabled = false, ...props }, ref) => {
		const finalVariant = error ? 'error' : variant
		const containerClass = `${styles.inputContainer} ${fullWidth ? styles.fullWidth : ''} ${className}`
		const inputClass = `${styles.input} ${styles[size]} ${styles[finalVariant]} ${icon ? styles.withIcon : ''} ${disabled ? styles.disabled : ''}`

		return (
			<div className={containerClass}>
				{label && <label className={styles.label}>{label}</label>}
				<div className={styles.wrapper}>
					{icon && <span className={styles.icon}>{icon}</span>}
					<input ref={ref} className={inputClass} disabled={disabled} {...props} />
				</div>
				{(error || helperText) && <span className={`${styles.helperText} ${error ? styles.errorText : ''}`}>{error || helperText}</span>}
			</div>
		)
	}
)

Input.displayName = 'Input'
