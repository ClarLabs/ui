import React, { useState, useRef, useEffect } from 'react'
import styles from './styles.module.scss'
import { FlagIcon } from '../FlagIcon'

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
	// Major world languages
	{ code: 'en', name: 'English', nativeName: 'English', flag: 'us' },
	{ code: 'zh', name: 'Chinese (Simplified)', nativeName: '简体中文', flag: 'cn' },
	{ code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文', flag: 'tw' },
	{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: 'es' },
	{ code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: 'in' },
	{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: 'sa' },
	{ code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: 'bd' },
	{ code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: 'pt' },
	{ code: 'pt-BR', name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)', flag: 'br' },
	{ code: 'ru', name: 'Russian', nativeName: 'Русский', flag: 'ru' },
	{ code: 'ja', name: 'Japanese', nativeName: '日本語', flag: 'jp' },
	{ code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: 'in' },
	{ code: 'de', name: 'German', nativeName: 'Deutsch', flag: 'de' },
	{ code: 'jv', name: 'Javanese', nativeName: 'Basa Jawa', flag: 'id' },
	{ code: 'ko', name: 'Korean', nativeName: '한국어', flag: 'kr' },
	{ code: 'fr', name: 'French', nativeName: 'Français', flag: 'fr' },
	{ code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: 'in' },
	{ code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: 'in' },
	{ code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: 'tr' },
	{ code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: 'in' },
	{ code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: 'vn' },
	{ code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: 'pk' },
	{ code: 'it', name: 'Italian', nativeName: 'Italiano', flag: 'it' },
	{ code: 'th', name: 'Thai', nativeName: 'ไทย', flag: 'th' },
	{ code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: 'in' },
	{ code: 'pl', name: 'Polish', nativeName: 'Polski', flag: 'pl' },
	{ code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: 'ua' },
	{ code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: 'in' },
	{ code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: 'in' },
	{ code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: 'in' },
	{ code: 'my', name: 'Burmese', nativeName: 'မြန်မာဘာသာ', flag: 'mm' },
	{ code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: 'ir' },
	{ code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: 'nl' },
	{ code: 'ro', name: 'Romanian', nativeName: 'Română', flag: 'ro' },
	{ code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: 'se' },
	{ code: 'hu', name: 'Hungarian', nativeName: 'Magyar', flag: 'hu' },
	{ code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: 'cz' },
	{ code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: 'gr' },
	{ code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: 'il' },
	{ code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: 'fi' },
	{ code: 'da', name: 'Danish', nativeName: 'Dansk', flag: 'dk' },
	{ code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: 'no' },
	{ code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', flag: 'sk' },
	{ code: 'bg', name: 'Bulgarian', nativeName: 'Български', flag: 'bg' },
	{ code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', flag: 'hr' },
	{ code: 'sr', name: 'Serbian', nativeName: 'Српски', flag: 'rs' },
	{ code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių', flag: 'lt' },
	{ code: 'lv', name: 'Latvian', nativeName: 'Latviešu', flag: 'lv' },
	{ code: 'et', name: 'Estonian', nativeName: 'Eesti', flag: 'ee' },
	{ code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina', flag: 'si' },
	{ code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: 'my' },
	{ code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: 'id' },
	{ code: 'tl', name: 'Tagalog', nativeName: 'Tagalog', flag: 'ph' },
	{ code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: 'ke' },
	{ code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', flag: 'za' },
	{ code: 'ca', name: 'Catalan', nativeName: 'Català', flag: 'es-ct' },
	{ code: 'eu', name: 'Basque', nativeName: 'Euskara', flag: 'es-pv' },
	{ code: 'gl', name: 'Galician', nativeName: 'Galego', flag: 'es-ga' },
	{ code: 'is', name: 'Icelandic', nativeName: 'Íslenska', flag: 'is' },
	{ code: 'ga', name: 'Irish', nativeName: 'Gaeilge', flag: 'ie' },
	{ code: 'cy', name: 'Welsh', nativeName: 'Cymraeg', flag: 'gb-wls' },
	{ code: 'gd', name: 'Scottish Gaelic', nativeName: 'Gàidhlig', flag: 'gb-sct' },
	{ code: 'sq', name: 'Albanian', nativeName: 'Shqip', flag: 'al' },
	{ code: 'mk', name: 'Macedonian', nativeName: 'Македонски', flag: 'mk' },
	{ code: 'bs', name: 'Bosnian', nativeName: 'Bosanski', flag: 'ba' },
	{ code: 'ka', name: 'Georgian', nativeName: 'ქართული', flag: 'ge' },
	{ code: 'hy', name: 'Armenian', nativeName: 'Հայերեն', flag: 'am' },
	{ code: 'az', name: 'Azerbaijani', nativeName: 'Azərbaycan', flag: 'az' },
	{ code: 'kk', name: 'Kazakh', nativeName: 'Қазақ тілі', flag: 'kz' },
	{ code: 'uz', name: 'Uzbek', nativeName: 'Oʻzbek', flag: 'uz' },
	{ code: 'mn', name: 'Mongolian', nativeName: 'Монгол', flag: 'mn' },
	{ code: 'km', name: 'Khmer', nativeName: 'ភាសាខ្មែរ', flag: 'kh' },
	{ code: 'lo', name: 'Lao', nativeName: 'ລາວ', flag: 'la' },
	{ code: 'ne', name: 'Nepali', nativeName: 'नेपाली', flag: 'np' },
	{ code: 'si', name: 'Sinhala', nativeName: 'සිංහල', flag: 'lk' },
	{ code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: 'et' },
	{ code: 'zu', name: 'Zulu', nativeName: 'isiZulu', flag: 'za' },
	{ code: 'xh', name: 'Xhosa', nativeName: 'isiXhosa', flag: 'za' },
	{ code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', flag: 'ng' },
	{ code: 'ig', name: 'Igbo', nativeName: 'Igbo', flag: 'ng' },
	{ code: 'ha', name: 'Hausa', nativeName: 'Hausa', flag: 'ng' },
	{ code: 'so', name: 'Somali', nativeName: 'Soomaali', flag: 'so' },
	{ code: 'mg', name: 'Malagasy', nativeName: 'Malagasy', flag: 'mg' }
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
					<span className={styles.flag}>
						<FlagIcon flag={selectedLanguage.flag} width={32} height={32} rounded />
					</span>
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
										<span className={styles.optionFlag}>
											<FlagIcon flag={language.flag} width={28} height={28} rounded />
										</span>
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
