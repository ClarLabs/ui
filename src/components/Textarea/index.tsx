import React from 'react'
import styles from './styles.module.scss'

export type TextareaSize = 'sm' | 'md' | 'lg'
export type TextareaVariant = 'default' | 'success' | 'error'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string
	helperText?: string
	error?: string
	size?: TextareaSize
	variant?: TextareaVariant
	fullWidth?: boolean
	resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ label, helperText, error, size = 'md', variant = 'default', fullWidth = false, resize = 'vertical', className = '', disabled, ...rest }, ref) => {
		const computedVariant = error ? 'error' : variant

		return (
			<div className={`${styles.textareaWrapper} ${fullWidth ? styles.fullWidth : ''} ${className}`}>
				{label && <label className={styles.label}>{label}</label>}
				<textarea
					ref={ref}
					className={`${styles.textarea} ${styles[size]} ${styles[computedVariant]} ${styles[`resize-${resize}`]} ${disabled ? styles.disabled : ''}`}
					disabled={disabled}
					{...rest}
				/>
				{error && <span className={styles.errorText}>{error}</span>}
				{!error && helperText && <span className={styles.helperText}>{helperText}</span>}
			</div>
		)
	}
)

Textarea.displayName = 'Textarea'
