import React, { forwardRef } from 'react'
import styles from './styles.module.scss'

export type SelectSize = 'sm' | 'md' | 'lg'
export type SelectVariant = 'default' | 'error' | 'success'

export interface SelectOption {
	value: string
	label: string
	disabled?: boolean
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
	label?: string
	error?: string
	helperText?: string
	size?: SelectSize
	variant?: SelectVariant
	fullWidth?: boolean
	options: SelectOption[]
	placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
	(
		{
			label,
			error,
			helperText,
			size = 'md',
			variant = 'default',
			fullWidth = false,
			className = '',
			disabled = false,
			options,
			placeholder,
			...props
		},
		ref
	) => {
		const finalVariant = error ? 'error' : variant
		const containerClass = `${styles.selectContainer} ${fullWidth ? styles.fullWidth : ''} ${className}`
		const selectClass = `${styles.select} ${styles[size]} ${styles[finalVariant]} ${disabled ? styles.disabled : ''}`

		return (
			<div className={containerClass}>
				{label && <label className={styles.label}>{label}</label>}
				<div className={styles.wrapper}>
					<select ref={ref} className={selectClass} disabled={disabled} {...props}>
						{placeholder && (
							<option value="" disabled>
								{placeholder}
							</option>
						)}
						{options.map((option) => (
							<option key={option.value} value={option.value} disabled={option.disabled}>
								{option.label}
							</option>
						))}
					</select>
					<span className={styles.arrow}>▼</span>
				</div>
				{(error || helperText) && <span className={`${styles.helperText} ${error ? styles.errorText : ''}`}>{error || helperText}</span>}
			</div>
		)
	}
)

Select.displayName = 'Select'
