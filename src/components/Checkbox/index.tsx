import React from 'react'
import styles from './styles.module.scss'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
	label?: string
	indeterminate?: boolean
}

export function Checkbox({ label, indeterminate = false, className = '', ...props }: CheckboxProps) {
	const checkboxRef = React.useRef<HTMLInputElement>(null)

	React.useEffect(() => {
		if (checkboxRef.current) {
			checkboxRef.current.indeterminate = indeterminate
		}
	}, [indeterminate])

	return (
		<label className={`${styles.checkboxWrapper} ${className}`}>
			<input ref={checkboxRef} type="checkbox" className={styles.checkbox} {...props} />
			<span className={styles.checkmark}>
				{indeterminate ? <span className={styles.indeterminateIcon}>−</span> : <span className={styles.checkIcon}>✓</span>}
			</span>
			{label && <span className={styles.label}>{label}</span>}
		</label>
	)
}
