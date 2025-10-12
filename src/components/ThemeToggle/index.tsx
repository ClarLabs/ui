import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'

export interface ThemeToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
	defaultTheme?: 'light' | 'dark'
	onThemeChange?: (theme: 'light' | 'dark') => void
}

export function ThemeToggle({ defaultTheme = 'dark', onThemeChange, className = '', ...props }: ThemeToggleProps) {
	const [theme, setTheme] = useState<'light' | 'dark'>(() => {
		if (typeof window === 'undefined') return defaultTheme

		const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
		return savedTheme || defaultTheme
	})

	useEffect(() => {
		// Apply theme to body on mount and when theme changes
		if (theme === 'light') {
			document.body.classList.add('light-mode')
		} else {
			document.body.classList.remove('light-mode')
		}

		// Save to localStorage
		localStorage.setItem('theme', theme)

		// Call callback if provided
		onThemeChange?.(theme)
	}, [theme, onThemeChange])

	const toggleTheme = () => {
		setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
	}

	return (
		<button type="button" className={`${styles.themeToggle} ${className}`} onClick={toggleTheme} aria-label="Toggle theme" {...props}>
			<div className={`${styles.iconContainer} ${theme === 'light' ? styles.light : styles.dark}`}>
				<svg className={`${styles.icon} ${styles.sun}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="12" cy="12" r="5" fill="currentColor" />
					<line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
					<line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
					<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
					<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
					<line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
					<line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
					<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
					<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
				</svg>
				<svg className={`${styles.icon} ${styles.moon}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
						fill="currentColor"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
		</button>
	)
}
