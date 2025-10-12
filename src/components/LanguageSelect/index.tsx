import React, { useState, useRef, useEffect } from 'react'
import styles from './styles.module.scss'

export interface Language {
	code: string
	name: string
	nativeName: string
	flag: string
}

export interface LanguageSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
	languages?: Language[]
	defaultLanguage?: string
	onChange?: (language: Language) => void
	disabled?: boolean
	showSearch?: boolean
	label?: string
}

const DEFAULT_LANGUAGES: Language[] = [
	{ code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
	{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
	{ code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
	{ code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
	{ code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
	{ code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
	{ code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
	{ code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
	{ code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
	{ code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
	{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
	{ code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' }
]

export function LanguageSelect({
	languages = DEFAULT_LANGUAGES,
	defaultLanguage = 'en',
	onChange,
	disabled = false,
	showSearch = false,
	label,
	className = '',
	...props
}: LanguageSelectProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedLanguage, setSelectedLanguage] = useState<Language>(() => {
		return languages.find((lang) => lang.code === defaultLanguage) || languages[0]
	})
	const [searchQuery, setSearchQuery] = useState('')
	const [highlightedIndex, setHighlightedIndex] = useState(0)
	const containerRef = useRef<HTMLDivElement>(null)
	const searchInputRef = useRef<HTMLInputElement>(null)

	const filteredLanguages = languages.filter(
		(lang) =>
			lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
			lang.code.toLowerCase().includes(searchQuery.toLowerCase())
	)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsOpen(false)
				setSearchQuery('')
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen])

	useEffect(() => {
		if (isOpen && showSearch && searchInputRef.current) {
			searchInputRef.current.focus()
		}
	}, [isOpen, showSearch])

	const handleSelect = (language: Language) => {
		setSelectedLanguage(language)
		setIsOpen(false)
		setSearchQuery('')
		onChange?.(language)
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (disabled) return

		switch (e.key) {
			case 'Enter':
			case ' ':
				if (!isOpen) {
					e.preventDefault()
					setIsOpen(true)
				} else if (filteredLanguages[highlightedIndex]) {
					e.preventDefault()
					handleSelect(filteredLanguages[highlightedIndex])
				}
				break
			case 'Escape':
				setIsOpen(false)
				setSearchQuery('')
				break
			case 'ArrowDown':
				e.preventDefault()
				if (!isOpen) {
					setIsOpen(true)
				} else {
					setHighlightedIndex((prev) => (prev < filteredLanguages.length - 1 ? prev + 1 : 0))
				}
				break
			case 'ArrowUp':
				e.preventDefault()
				if (isOpen) {
					setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : filteredLanguages.length - 1))
				}
				break
		}
	}

	return (
		<div className={`${styles.languageSelectContainer} ${className}`} ref={containerRef} {...props}>
			{label && <label className={styles.label}>{label}</label>}
			<div className={`${styles.languageSelect} ${disabled ? styles.disabled : ''}`}>
				<button
					type="button"
					className={`${styles.trigger} ${isOpen ? styles.open : ''}`}
					onClick={() => !disabled && setIsOpen(!isOpen)}
					onKeyDown={handleKeyDown}
					disabled={disabled}
					aria-haspopup="listbox"
					aria-expanded={isOpen}
				>
					<span className={styles.flag}>{selectedLanguage.flag}</span>
					<span className={styles.selectedText}>
						<span className={styles.languageName}>{selectedLanguage.name}</span>
						<span className={styles.nativeName}>{selectedLanguage.nativeName}</span>
					</span>
					<svg className={styles.chevron} viewBox="0 0 20 20" fill="currentColor">
						<path
							fillRule="evenodd"
							d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</button>

				{isOpen && (
					<div className={styles.dropdown}>
						{showSearch && (
							<div className={styles.searchContainer}>
								<svg className={styles.searchIcon} viewBox="0 0 20 20" fill="currentColor">
									<path
										fillRule="evenodd"
										d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
										clipRule="evenodd"
									/>
								</svg>
								<input
									ref={searchInputRef}
									type="text"
									className={styles.searchInput}
									placeholder="Search languages..."
									value={searchQuery}
									onChange={(e) => {
										setSearchQuery(e.target.value)
										setHighlightedIndex(0)
									}}
									onKeyDown={handleKeyDown}
								/>
							</div>
						)}
						<ul className={styles.list} role="listbox">
							{filteredLanguages.length > 0 ? (
								filteredLanguages.map((language, index) => (
									<li
										key={language.code}
										className={`${styles.option} ${selectedLanguage.code === language.code ? styles.selected : ''} ${
											index === highlightedIndex ? styles.highlighted : ''
										}`}
										onClick={() => handleSelect(language)}
										onMouseEnter={() => setHighlightedIndex(index)}
										role="option"
										aria-selected={selectedLanguage.code === language.code}
									>
										<span className={styles.optionFlag}>{language.flag}</span>
										<span className={styles.optionText}>
											<span className={styles.optionName}>{language.name}</span>
											<span className={styles.optionNative}>{language.nativeName}</span>
										</span>
										{selectedLanguage.code === language.code && (
											<svg className={styles.checkIcon} viewBox="0 0 20 20" fill="currentColor">
												<path
													fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd"
												/>
											</svg>
										)}
									</li>
								))
							) : (
								<li className={styles.noResults}>No languages found</li>
							)}
						</ul>
					</div>
				)}
			</div>
		</div>
	)
}
