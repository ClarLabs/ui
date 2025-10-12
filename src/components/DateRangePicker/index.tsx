import React, { useState, useRef, useEffect } from 'react'
import { Calendar } from '../Calendar'
import styles from './styles.module.scss'

export interface DateRange {
	start: Date | null
	end: Date | null
}

export interface DateRangePickerProps {
	value?: DateRange
	onChange?: (range: DateRange) => void
	minDate?: Date
	maxDate?: Date
	className?: string
	placeholder?: string
	disabled?: boolean
	variant?: 'default' | 'minimal' | 'modern'
}

export function DateRangePicker({
	value,
	onChange,
	minDate,
	maxDate,
	className = '',
	placeholder = 'Select date range',
	disabled = false,
	variant = 'default'
}: DateRangePickerProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [tempRange, setTempRange] = useState<DateRange>({ start: null, end: null })
	const [selectingEnd, setSelectingEnd] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsOpen(false)
				setTempRange({ start: null, end: null })
				setSelectingEnd(false)
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen])

	const handleDateClick = (date: Date) => {
		if (!selectingEnd) {
			// First click - set start date
			setTempRange({ start: date, end: null })
			setSelectingEnd(true)
		} else {
			// Second click - set end date
			const start = tempRange.start!
			const end = date

			// Ensure start is before end
			if (start > end) {
				onChange?.({ start: end, end: start })
			} else {
				onChange?.({ start, end })
			}

			setIsOpen(false)
			setTempRange({ start: null, end: null })
			setSelectingEnd(false)
		}
	}

	const handleClear = (e: React.MouseEvent) => {
		e.stopPropagation()
		onChange?.({ start: null, end: null })
		setTempRange({ start: null, end: null })
		setSelectingEnd(false)
	}

	const formatDisplayDate = (date: Date): string => {
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		})
	}

	const getDisplayValue = () => {
		if (value?.start && value?.end) {
			return `${formatDisplayDate(value.start)} → ${formatDisplayDate(value.end)}`
		}
		if (value?.start) {
			return formatDisplayDate(value.start)
		}
		return placeholder
	}

	// Get highlighted dates for the range
	const getHighlightedDates = () => {
		const dates: Date[] = []
		const start = tempRange.start || value?.start
		const end = tempRange.end || value?.end

		if (start && end) {
			const current = new Date(start)
			while (current <= end) {
				dates.push(new Date(current))
				current.setDate(current.getDate() + 1)
			}
		}

		return dates
	}

	return (
		<div className={`${styles.dateRangePicker} ${className}`} ref={containerRef}>
			<button
				type="button"
				className={`${styles.input} ${disabled ? styles.disabled : ''}`}
				onClick={() => !disabled && setIsOpen(!isOpen)}
				disabled={disabled}
			>
				<span className={styles.value}>{getDisplayValue()}</span>
				<span className={styles.icons}>
					{(value?.start || value?.end) && !disabled && (
						<span className={styles.clearIcon} onClick={handleClear}>
							×
						</span>
					)}
					<span className={styles.icon}>📅</span>
				</span>
			</button>
			{isOpen && (
				<div className={styles.popover}>
					<div className={styles.rangeInfo}>
						{!selectingEnd ? 'Select start date' : 'Select end date'}
					</div>
					<Calendar
						value={tempRange.start || value?.start || undefined}
						onChange={handleDateClick}
						minDate={minDate}
						maxDate={maxDate}
						highlightedDates={getHighlightedDates()}
						variant={variant}
					/>
				</div>
			)}
		</div>
	)
}
