import React, { useState } from 'react'
import styles from './styles.module.scss'

export type RatingSize = 'sm' | 'md' | 'lg'
export type RatingPrecision = 0.5 | 1

export interface RatingProps {
	/** Current rating value */
	value?: number
	/** Default value (uncontrolled) */
	defaultValue?: number
	/** Maximum rating value */
	max?: number
	/** Precision of the rating (0.5 for half stars, 1 for full stars) */
	precision?: RatingPrecision
	/** Size of the rating stars */
	size?: RatingSize
	/** Whether the rating is read-only */
	readOnly?: boolean
	/** Whether the rating is disabled */
	disabled?: boolean
	/** Label for the rating */
	label?: string
	/** Show the numeric value */
	showValue?: boolean
	/** Custom empty icon */
	emptyIcon?: React.ReactNode
	/** Custom filled icon */
	filledIcon?: React.ReactNode
	/** Custom half icon (for half star precision) */
	halfIcon?: React.ReactNode
	/** Callback when value changes */
	onChange?: (value: number) => void
	/** Callback when hover value changes */
	onHoverChange?: (value: number) => void
	/** Custom className */
	className?: string
	/** Helper text */
	helperText?: string
}

export function Rating({
	value: controlledValue,
	defaultValue = 0,
	max = 5,
	precision = 1,
	size = 'md',
	readOnly = false,
	disabled = false,
	label,
	showValue = false,
	emptyIcon,
	filledIcon,
	halfIcon,
	onChange,
	onHoverChange,
	className = '',
	helperText
}: RatingProps) {
	const [internalValue, setInternalValue] = useState(defaultValue)
	const [hoverValue, setHoverValue] = useState<number | null>(null)

	const value = controlledValue !== undefined ? controlledValue : internalValue
	const displayValue = hoverValue !== null ? hoverValue : value

	const isInteractive = !readOnly && !disabled

	const handleClick = (newValue: number) => {
		if (!isInteractive) return

		// If clicking the same value, reset to 0
		const finalValue = value === newValue ? 0 : newValue

		if (controlledValue === undefined) {
			setInternalValue(finalValue)
		}
		onChange?.(finalValue)
	}

	const handleMouseMove = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
		if (!isInteractive) return

		if (precision === 0.5) {
			const { left, width } = event.currentTarget.getBoundingClientRect()
			const percent = (event.clientX - left) / width
			const newValue = index + (percent > 0.5 ? 1 : 0.5)
			setHoverValue(newValue)
			onHoverChange?.(newValue)
		} else {
			const newValue = index + 1
			setHoverValue(newValue)
			onHoverChange?.(newValue)
		}
	}

	const handleMouseLeave = () => {
		if (!isInteractive) return
		setHoverValue(null)
		onHoverChange?.(0)
	}

	const getIconForPosition = (index: number) => {
		const position = index + 1
		const filled = displayValue >= position
		const half = precision === 0.5 && displayValue >= position - 0.5 && displayValue < position

		if (filled) {
			return filledIcon || '★'
		} else if (half) {
			return halfIcon || '⯨'
		} else {
			return emptyIcon || '☆'
		}
	}

	const containerClasses = [
		styles.ratingContainer,
		className
	].filter(Boolean).join(' ')

	const ratingClasses = [
		styles.rating,
		styles[size],
		disabled && styles.disabled,
		readOnly && styles.readOnly
	].filter(Boolean).join(' ')

	return (
		<div className={containerClasses}>
			{label && <label className={styles.label}>{label}</label>}

			<div className={styles.ratingWrapper}>
				<div className={ratingClasses} onMouseLeave={handleMouseLeave}>
					{Array.from({ length: max }, (_, index) => (
						<button
							key={index}
							type="button"
							className={styles.star}
							onClick={() => handleClick(index + 1)}
							onMouseMove={(e) => handleMouseMove(index, e)}
							disabled={disabled}
							aria-label={`Rate ${index + 1} out of ${max}`}
						>
							{getIconForPosition(index)}
						</button>
					))}
				</div>

				{showValue && (
					<span className={styles.valueDisplay}>
						{displayValue.toFixed(precision === 0.5 ? 1 : 0)} / {max}
					</span>
				)}
			</div>

			{helperText && <span className={styles.helperText}>{helperText}</span>}
		</div>
	)
}
