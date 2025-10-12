import React from 'react'
import styles from './styles.module.scss'

export interface RadioButtonProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
	label?: string
	value: string
	name: string
	checked?: boolean
	disabled?: boolean
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function RadioButton({ label, value, name, checked = false, disabled = false, onChange, className = '', ...props }: RadioButtonProps) {
	return (
		<label className={`${styles.radioButton} ${disabled ? styles.disabled : ''} ${className}`}>
			<input type="radio" name={name} value={value} checked={checked} disabled={disabled} onChange={onChange} className={styles.input} {...props} />
			<span className={styles.radio}></span>
			{label && <span className={styles.label}>{label}</span>}
		</label>
	)
}
