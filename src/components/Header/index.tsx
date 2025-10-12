import React from 'react'
import styles from './styles.module.scss'

export interface HeaderProps {
	logo?: React.ReactNode
	title?: string
	children?: React.ReactNode
	actions?: React.ReactNode
	sticky?: boolean
	className?: string
}

export function Header({ logo, title, children, actions, sticky = false, className = '' }: HeaderProps) {
	return (
		<header className={`${styles.header} ${sticky ? styles.sticky : ''} ${className}`}>
			<div className={styles.content}>
				{(logo || title) && (
					<div className={styles.brand}>
						{logo && <div className={styles.logo}>{logo}</div>}
						{title && <h1 className={styles.title}>{title}</h1>}
					</div>
				)}
				{children && <div className={styles.nav}>{children}</div>}
				{actions && <div className={styles.actions}>{actions}</div>}
			</div>
		</header>
	)
}
