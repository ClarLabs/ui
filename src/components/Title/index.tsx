import React from 'react'
import styles from './styles.module.scss'

export interface TitleProps {
	children: React.ReactNode
	subtitle?: string
	level?: 1 | 2 | 3 | 4 | 5 | 6
	align?: 'left' | 'center' | 'right'
	className?: string
}

export function Title({ children, subtitle, level = 1, align = 'left', className = '' }: TitleProps) {
	const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements

	return (
		<div className={`${styles.titleWrapper} ${styles[align]} ${className}`}>
			<HeadingTag className={styles.title}>{children}</HeadingTag>
			{subtitle && <p className={styles.subtitle}>{subtitle}</p>}
		</div>
	)
}
