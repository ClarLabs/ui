import React from 'react'
import styles from './styles.module.scss'

export interface TitleProps {
	children: React.ReactNode
	subtitle?: string
	level?: 1 | 2 | 3 | 4 | 5 | 6
	align?: 'left' | 'center' | 'right'
	className?: string
}

const headingMap = { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5', 6: 'h6' } as const

export function Title({ children, subtitle, level = 1, align = 'left', className = '' }: TitleProps) {
	const HeadingTag = headingMap[level]

	return (
		<div className={`${styles.titleWrapper} ${styles[align]} ${className}`}>
			<HeadingTag className={styles.title}>{children}</HeadingTag>
			{subtitle && <p className={styles.subtitle}>{subtitle}</p>}
		</div>
	)
}
