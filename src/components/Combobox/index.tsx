import React, { useState, useRef, useEffect } from 'react'
import styles from './styles.module.scss'

export interface ComboboxOption {
	value: string
	label: string
	disabled?: boolean
}

export interface ComboboxProps {
	options: ComboboxOption[]
	value?: string
	defaultValue?: string
	onChange?: (value: string) => void
	placeholder?: string
	disabled?: boolean
	className?: string
	allowCustomValue?: boolean
	filterFunction?: (option: ComboboxOption, searchTerm: string) => boolean
}

export function Combobox({
	options,
	value: controlledValue,
	defaultValue = '',
	onChange,
	placeholder = 'Select or type...',
	disabled = false,
	className = '',
	allowCustomValue = false,
	filterFunction
}: ComboboxProps) {
	const [inputValue, setInputValue] = useState(defaultValue)
	const [isOpen, setIsOpen] = useState(false)
	const [highlightedIndex, setHighlightedIndex] = useState(-1)
	const inputRef = useRef<HTMLInputElement>(null)
	const listRef = useRef<HTMLUListElement>(null)
	const wrapperRef = useRef<HTMLDivElement>(null)

	const isControlled = controlledValue !== undefined
	const currentValue = isControlled ? controlledValue : inputValue

	const defaultFilter = (option: ComboboxOption, searchTerm: string) => {
		return option.label.toLowerCase().includes(searchTerm.toLowerCase())
	}

	const filterFunc = filterFunction || defaultFilter

	const filteredOptions = options.filter((option) => filterFunc(option, currentValue))

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	useEffect(() => {
		if (isOpen && highlightedIndex >= 0 && listRef.current) {
			const highlightedElement = listRef.current.children[highlightedIndex] as HTMLElement
			if (highlightedElement) {
				highlightedElement.scrollIntoView({ block: 'nearest' })
			}
		}
	}, [highlightedIndex, isOpen])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value

		if (!isControlled) {
			setInputValue(newValue)
		}

		onChange?.(newValue)
		setIsOpen(true)
		setHighlightedIndex(-1)
	}

	const handleOptionClick = (option: ComboboxOption) => {
		if (option.disabled) return

		const newValue = option.value

		if (!isControlled) {
			setInputValue(option.label)
		}

		onChange?.(newValue)
		setIsOpen(false)
		setHighlightedIndex(-1)
		inputRef.current?.blur()
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (disabled) return

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault()
				setIsOpen(true)
				setHighlightedIndex((prev) => {
					const maxIndex = filteredOptions.length - 1
					if (prev >= maxIndex) return maxIndex
					let nextIndex = prev + 1
					while (nextIndex <= maxIndex && filteredOptions[nextIndex].disabled) {
						nextIndex++
					}
					return nextIndex <= maxIndex ? nextIndex : prev
				})
				break

			case 'ArrowUp':
				e.preventDefault()
				setHighlightedIndex((prev) => {
					if (prev <= 0) return -1
					let prevIndex = prev - 1
					while (prevIndex >= 0 && filteredOptions[prevIndex].disabled) {
						prevIndex--
					}
					return prevIndex >= 0 ? prevIndex : -1
				})
				break

			case 'Enter':
				e.preventDefault()
				if (isOpen && highlightedIndex >= 0) {
					handleOptionClick(filteredOptions[highlightedIndex])
				} else if (allowCustomValue) {
					onChange?.(currentValue)
					setIsOpen(false)
				}
				break

			case 'Escape':
				e.preventDefault()
				setIsOpen(false)
				setHighlightedIndex(-1)
				inputRef.current?.blur()
				break

			case 'Tab':
				setIsOpen(false)
				break
		}
	}

	const handleInputFocus = () => {
		if (!disabled) {
			setIsOpen(true)
		}
	}

	const selectedOption = options.find((opt) => opt.value === currentValue)
	const displayValue = selectedOption ? selectedOption.label : currentValue

	return (
		<div ref={wrapperRef} className={`${styles.combobox} ${className}`}>
			<div className={styles.inputWrapper}>
				<input
					ref={inputRef}
					type="text"
					className={`${styles.input} ${disabled ? styles.disabled : ''}`}
					value={displayValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					onFocus={handleInputFocus}
					placeholder={placeholder}
					disabled={disabled}
					autoComplete="off"
					role="combobox"
					aria-expanded={isOpen}
					aria-autocomplete="list"
					aria-controls="combobox-listbox"
				/>
				<span className={`${styles.arrow} ${isOpen ? styles.open : ''}`}>▼</span>
			</div>

			{isOpen && filteredOptions.length > 0 && (
				<ul ref={listRef} id="combobox-listbox" className={styles.menu} role="listbox">
					{filteredOptions.map((option, index) => (
						<li
							key={option.value}
							className={`${styles.option} ${highlightedIndex === index ? styles.highlighted : ''} ${
								option.disabled ? styles.optionDisabled : ''
							}`}
							onClick={() => handleOptionClick(option)}
							role="option"
							aria-selected={option.value === currentValue}
							aria-disabled={option.disabled}
						>
							{option.label}
						</li>
					))}
				</ul>
			)}

			{isOpen && filteredOptions.length === 0 && (
				<div className={styles.noResults}>{allowCustomValue ? 'Press Enter to use custom value' : 'No results found'}</div>
			)}
		</div>
	)
}
