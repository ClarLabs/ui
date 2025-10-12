import React, { useRef, useState, useEffect, KeyboardEvent, ClipboardEvent } from 'react'
import styles from './styles.module.scss'

export type PinInputSize = 'sm' | 'md' | 'lg'
export type PinInputVariant = 'default' | 'error' | 'success'
export type PinInputType = 'numeric' | 'alphanumeric' | 'alphabetic'

export interface PinInputProps {
	/** Number of input fields */
	length?: number
	/** Type of characters allowed */
	type?: PinInputType
	/** Size of the input fields */
	size?: PinInputSize
	/** Variant style */
	variant?: PinInputVariant
	/** Whether to mask the input (show dots) */
	mask?: boolean
	/** Whether to focus on mount */
	autoFocus?: boolean
	/** Whether the input is disabled */
	disabled?: boolean
	/** Placeholder character */
	placeholder?: string
	/** Label for the input */
	label?: string
	/** Error message */
	error?: string
	/** Helper text */
	helperText?: string
	/** Callback when value changes */
	onChange?: (value: string) => void
	/** Callback when all fields are filled */
	onComplete?: (value: string) => void
	/** Value (controlled) */
	value?: string
	/** Default value (uncontrolled) */
	defaultValue?: string
	/** Whether to select input content on focus */
	selectOnFocus?: boolean
	/** Custom className */
	className?: string
}

export function PinInput({
	length = 6,
	type = 'numeric',
	size = 'md',
	variant = 'default',
	mask = false,
	autoFocus = false,
	disabled = false,
	placeholder = '',
	label,
	error,
	helperText,
	onChange,
	onComplete,
	value: controlledValue,
	defaultValue = '',
	selectOnFocus = true,
	className = ''
}: PinInputProps) {
	const [values, setValues] = useState<string[]>(
		controlledValue?.split('') || defaultValue.split('').slice(0, length) || Array(length).fill('')
	)
	const inputRefs = useRef<(HTMLInputElement | null)[]>([])
	const finalVariant = error ? 'error' : variant

	// Sync controlled value
	useEffect(() => {
		if (controlledValue !== undefined) {
			const newValues = controlledValue.split('').slice(0, length)
			while (newValues.length < length) {
				newValues.push('')
			}
			setValues(newValues)
		}
	}, [controlledValue, length])

	// Auto focus first input on mount
	useEffect(() => {
		if (autoFocus && inputRefs.current[0]) {
			inputRefs.current[0].focus()
		}
	}, [autoFocus])

	const isValidChar = (char: string): boolean => {
		if (!char) return true

		switch (type) {
			case 'numeric':
				return /^\d$/.test(char)
			case 'alphabetic':
				return /^[a-zA-Z]$/.test(char)
			case 'alphanumeric':
				return /^[a-zA-Z0-9]$/.test(char)
			default:
				return true
		}
	}

	const focusInput = (index: number) => {
		if (inputRefs.current[index]) {
			inputRefs.current[index]?.focus()
			if (selectOnFocus) {
				inputRefs.current[index]?.select()
			}
		}
	}

	const handleChange = (index: number, newValue: string) => {
		const char = newValue.slice(-1) // Get last character

		if (newValue && !isValidChar(char)) {
			return
		}

		const newValues = [...values]
		newValues[index] = char

		setValues(newValues)

		const fullValue = newValues.join('')
		onChange?.(fullValue)

		// Auto-focus next input if value was added
		if (char && index < length - 1) {
			focusInput(index + 1)
		}

		// Check if complete
		if (newValues.every((v) => v !== '')) {
			onComplete?.(fullValue)
		}
	}

	const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
		// Handle backspace
		if (e.key === 'Backspace') {
			e.preventDefault()
			const newValues = [...values]

			if (values[index]) {
				// Clear current field
				newValues[index] = ''
				setValues(newValues)
				onChange?.(newValues.join(''))
			} else if (index > 0) {
				// Move to previous field and clear it
				newValues[index - 1] = ''
				setValues(newValues)
				onChange?.(newValues.join(''))
				focusInput(index - 1)
			}
		}

		// Handle delete
		if (e.key === 'Delete') {
			e.preventDefault()
			const newValues = [...values]
			newValues[index] = ''
			setValues(newValues)
			onChange?.(newValues.join(''))
		}

		// Handle arrow keys
		if (e.key === 'ArrowLeft' && index > 0) {
			e.preventDefault()
			focusInput(index - 1)
		}

		if (e.key === 'ArrowRight' && index < length - 1) {
			e.preventDefault()
			focusInput(index + 1)
		}

		// Handle home/end
		if (e.key === 'Home') {
			e.preventDefault()
			focusInput(0)
		}

		if (e.key === 'End') {
			e.preventDefault()
			focusInput(length - 1)
		}
	}

	const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault()
		const pasteData = e.clipboardData.getData('text').slice(0, length)
		const chars = pasteData.split('').filter(isValidChar)

		const newValues = [...values]
		chars.forEach((char, i) => {
			if (i < length) {
				newValues[i] = char
			}
		})

		setValues(newValues)
		onChange?.(newValues.join(''))

		// Focus last filled input or first empty
		const nextEmptyIndex = newValues.findIndex((v) => !v)
		focusInput(nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex)

		// Check if complete
		if (newValues.every((v) => v !== '')) {
			onComplete?.(newValues.join(''))
		}
	}

	const handleFocus = (index: number) => {
		if (selectOnFocus && inputRefs.current[index]) {
			inputRefs.current[index]?.select()
		}
	}

	const containerClasses = [styles.pinInputContainer, className].filter(Boolean).join(' ')

	const inputClasses = [
		styles.pinInput,
		styles[size],
		styles[finalVariant],
		mask && styles.masked,
		disabled && styles.disabled
	]
		.filter(Boolean)
		.join(' ')

	return (
		<div className={containerClasses}>
			{label && <label className={styles.label}>{label}</label>}

			<div className={styles.inputsWrapper}>
				{Array.from({ length }).map((_, index) => (
					<input
						key={index}
						ref={(el) => (inputRefs.current[index] = el)}
						type={mask ? 'password' : 'text'}
						inputMode={type === 'numeric' ? 'numeric' : 'text'}
						maxLength={1}
						value={values[index] || ''}
						onChange={(e) => handleChange(index, e.target.value)}
						onKeyDown={(e) => handleKeyDown(index, e)}
						onPaste={handlePaste}
						onFocus={() => handleFocus(index)}
						disabled={disabled}
						placeholder={placeholder}
						className={inputClasses}
						aria-label={`PIN digit ${index + 1}`}
					/>
				))}
			</div>

			{(error || helperText) && (
				<span className={`${styles.helperText} ${error ? styles.errorText : ''}`}>{error || helperText}</span>
			)}
		</div>
	)
}
