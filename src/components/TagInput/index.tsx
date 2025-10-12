import React, { useState, useRef, KeyboardEvent } from 'react'
import styles from './styles.module.scss'

export type TagInputSize = 'sm' | 'md' | 'lg'
export type TagInputVariant = 'default' | 'error' | 'success'

export interface Tag {
	id: string
	label: string
}

export interface TagInputProps {
	/** Array of tags */
	tags?: Tag[]
	/** Callback when tags change */
	onChange?: (tags: Tag[]) => void
	/** Callback when a tag is added */
	onTagAdd?: (tag: Tag) => void
	/** Callback when a tag is removed */
	onTagRemove?: (tag: Tag) => void
	/** Placeholder text */
	placeholder?: string
	/** Label for the input */
	label?: string
	/** Error message */
	error?: string
	/** Helper text */
	helperText?: string
	/** Size of the input */
	size?: TagInputSize
	/** Variant style */
	variant?: TagInputVariant
	/** Whether the input is disabled */
	disabled?: boolean
	/** Maximum number of tags allowed */
	maxTags?: number
	/** Separator characters (default: Enter, comma) */
	separators?: string[]
	/** Whether to allow duplicate tags */
	allowDuplicates?: boolean
	/** Custom validation function */
	validate?: (value: string) => boolean
	/** Whether tags should be removable */
	removable?: boolean
	/** Full width */
	fullWidth?: boolean
	/** Custom className */
	className?: string
}

export function TagInput({
	tags = [],
	onChange,
	onTagAdd,
	onTagRemove,
	placeholder = 'Add tags...',
	label,
	error,
	helperText,
	size = 'md',
	variant = 'default',
	disabled = false,
	maxTags,
	separators = ['Enter', ','],
	allowDuplicates = false,
	validate,
	removable = true,
	fullWidth = false,
	className = ''
}: TagInputProps) {
	const [inputValue, setInputValue] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)

	const finalVariant = error ? 'error' : variant

	const addTag = (value: string) => {
		const trimmedValue = value.trim()

		if (!trimmedValue) return

		// Check max tags
		if (maxTags && tags.length >= maxTags) return

		// Check duplicates
		if (!allowDuplicates && tags.some((tag) => tag.label.toLowerCase() === trimmedValue.toLowerCase())) {
			return
		}

		// Custom validation
		if (validate && !validate(trimmedValue)) return

		const newTag: Tag = {
			id: `${Date.now()}-${Math.random()}`,
			label: trimmedValue
		}

		const newTags = [...tags, newTag]
		onChange?.(newTags)
		onTagAdd?.(newTag)
		setInputValue('')
	}

	const removeTag = (tagToRemove: Tag) => {
		if (!removable || disabled) return

		const newTags = tags.filter((tag) => tag.id !== tagToRemove.id)
		onChange?.(newTags)
		onTagRemove?.(tagToRemove)
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		const value = inputValue.trim()

		// Handle separators
		if (separators.includes(e.key)) {
			e.preventDefault()
			addTag(value)
			return
		}

		// Handle backspace to remove last tag
		if (e.key === 'Backspace' && !inputValue && tags.length > 0 && removable) {
			e.preventDefault()
			removeTag(tags[tags.length - 1])
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value

		// Check for comma in the input
		if (separators.includes(',') && value.includes(',')) {
			const parts = value.split(',')
			parts.slice(0, -1).forEach((part) => addTag(part))
			setInputValue(parts[parts.length - 1])
		} else {
			setInputValue(value)
		}
	}

	const handleContainerClick = () => {
		inputRef.current?.focus()
	}

	const containerClasses = [
		styles.tagInputContainer,
		fullWidth && styles.fullWidth,
		className
	].filter(Boolean).join(' ')

	const inputWrapperClasses = [
		styles.inputWrapper,
		styles[size],
		styles[finalVariant],
		disabled && styles.disabled
	].filter(Boolean).join(' ')

	return (
		<div className={containerClasses}>
			{label && <label className={styles.label}>{label}</label>}

			<div className={inputWrapperClasses} onClick={handleContainerClick}>
				<div className={styles.tagsContainer}>
					{tags.map((tag) => (
						<div key={tag.id} className={styles.tag}>
							<span className={styles.tagLabel}>{tag.label}</span>
							{removable && !disabled && (
								<button
									type="button"
									className={styles.removeButton}
									onClick={(e) => {
										e.stopPropagation()
										removeTag(tag)
									}}
									aria-label={`Remove ${tag.label}`}
								>
									×
								</button>
							)}
						</div>
					))}

					{(!maxTags || tags.length < maxTags) && (
						<input
							ref={inputRef}
							type="text"
							className={styles.input}
							value={inputValue}
							onChange={handleInputChange}
							onKeyDown={handleKeyDown}
							onBlur={() => {
								if (inputValue.trim()) {
									addTag(inputValue)
								}
							}}
							placeholder={tags.length === 0 ? placeholder : ''}
							disabled={disabled}
						/>
					)}
				</div>
			</div>

			{(error || helperText) && (
				<span className={`${styles.helperText} ${error ? styles.errorText : ''}`}>
					{error || helperText}
				</span>
			)}
		</div>
	)
}
