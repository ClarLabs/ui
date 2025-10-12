import React from 'react'
import styles from './styles.module.scss'

export interface BreadcrumbItem {
	label: string
	href?: string
	onClick?: () => void
}

export interface BreadcrumbsProps {
	items: BreadcrumbItem[]
	separator?: string
	className?: string
}

export function Breadcrumbs({ items, separator = '/', className = '' }: BreadcrumbsProps) {
	return (
		<nav className={`${styles.breadcrumbs} ${className}`} aria-label="Breadcrumb">
			<ol className={styles.list}>
				{items.map((item, index) => {
					const isLast = index === items.length - 1

					return (
						<li key={index} className={styles.item}>
							{item.href && !isLast ? (
								<a href={item.href} className={styles.link}>
									{item.label}
								</a>
							) : item.onClick && !isLast ? (
								<button onClick={item.onClick} className={styles.button}>
									{item.label}
								</button>
							) : (
								<span className={`${styles.text} ${isLast ? styles.current : ''}`}>{item.label}</span>
							)}
							{!isLast && (
								<span className={styles.separator} aria-hidden="true">
									{separator}
								</span>
							)}
						</li>
					)
				})}
			</ol>
		</nav>
	)
}
