import React, { useState, useRef, useEffect } from 'react'
import styles from './styles.module.scss'

export interface RichSelectOption {
	label: string
	value: string
	description?: string
	icon?: React.ReactNode
	disabled?: boolean
}

export interface RichSelectProps {
	options: RichSelectOption[]
	value?: string
	onChange?: (value: string) => void
	placeholder?: string
	disabled?: boolean
	searchable?: boolean
	className?: string
}

export function RichSelect({
	options,
	value,
	onChange,
	placeholder = 'Select an option',
	disabled = false,
	searchable = false,
	className = ''
}: RichSelectProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const selectRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
				setIsOpen(false)
				setSearchQuery('')
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const handleSelect = (optionValue: string) => {
		if (disabled) return
		onChange?.(optionValue)
		setIsOpen(false)
		setSearchQuery('')
	}

	const selectedOption = options.find((opt) => opt.value === value)
	const filteredOptions = searchable ? options.filter((opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase())) : options

	return (
		<div className={`${styles.richSelect} ${className}`} ref={selectRef}>
			<button
				className={`${styles.trigger} ${disabled ? styles.disabled : ''}`}
				onClick={() => !disabled && setIsOpen(!isOpen)}
				disabled={disabled}
				type="button"
			>
				{selectedOption ? (
					<div className={styles.selectedContent}>
						{selectedOption.icon && <span className={styles.icon}>{selectedOption.icon}</span>}
						<div className={styles.textContent}>
							<span className={styles.label}>{selectedOption.label}</span>
							{selectedOption.description && <span className={styles.description}>{selectedOption.description}</span>}
						</div>
					</div>
				) : (
					<span className={styles.placeholder}>{placeholder}</span>
				)}
				<span className={`${styles.arrow} ${isOpen ? styles.open : ''}`}>▼</span>
			</button>
			{isOpen && (
				<div className={styles.menu}>
					{searchable && (
						<div className={styles.searchWrapper}>
							<input
								type="text"
								className={styles.searchInput}
								placeholder="Search..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								autoFocus
							/>
						</div>
					)}
					<div className={styles.optionsList}>
						{filteredOptions.map((option) => (
							<div
								key={option.value}
								className={`${styles.option} ${option.value === value ? styles.active : ''} ${option.disabled ? styles.optionDisabled : ''}`}
								onClick={() => !option.disabled && handleSelect(option.value)}
							>
								{option.icon && <span className={styles.icon}>{option.icon}</span>}
								<div className={styles.textContent}>
									<span className={styles.label}>{option.label}</span>
									{option.description && <span className={styles.description}>{option.description}</span>}
								</div>
							</div>
						))}
						{filteredOptions.length === 0 && <div className={styles.noResults}>No results found</div>}
					</div>
				</div>
			)}
		</div>
	)
}
