import React, { useState, useRef, useEffect } from 'react'
import { Calendar } from '../Calendar'
import styles from './styles.module.scss'

export interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
	value?: Date
	onChange?: (date: Date | null) => void
	minDate?: Date
	maxDate?: Date
	placeholder?: string
	disabled?: boolean
	variant?: 'default' | 'minimal' | 'modern'
}

export function DatePicker({
	value,
	onChange,
	minDate,
	maxDate,
	placeholder = 'Select a date',
	disabled = false,
	variant = 'default',
	className = '',
	...props
}: DatePickerProps) {
	const [isOpen, setIsOpen] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen])

	const handleDateChange = (date: Date) => {
		onChange?.(date)
		setIsOpen(false)
	}

	const handleClear = (e: React.MouseEvent) => {
		e.stopPropagation()
		onChange?.(null)
	}

	const formatDisplayDate = (date: Date): string => {
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		})
	}

	return (
		<div className={`${styles.datePicker} ${className}`} ref={containerRef} {...props}>
			<button
				type="button"
				className={`${styles.input} ${disabled ? styles.disabled : ''}`}
				onClick={() => !disabled && setIsOpen(!isOpen)}
				disabled={disabled}
			>
				<span className={styles.value}>
					{value ? formatDisplayDate(value) : placeholder}
				</span>
				<span className={styles.icons}>
					{value && !disabled && (
						<span className={styles.clearIcon} onClick={handleClear}>
							×
						</span>
					)}
					<span className={styles.icon}>📅</span>
				</span>
			</button>
			{isOpen && (
				<div className={styles.popover}>
					<Calendar
						value={value}
						onChange={handleDateChange}
						minDate={minDate}
						maxDate={maxDate}
						variant={variant}
					/>
				</div>
			)}
		</div>
	)
}
