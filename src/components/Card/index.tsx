import React from 'react'
import styles from './styles.module.scss'

export interface CardProps {
	children: React.ReactNode
	title?: string
	subtitle?: string
	footer?: React.ReactNode
	image?: string
	hoverable?: boolean
	className?: string
	onClick?: () => void
}

export function Card({ children, title, subtitle, footer, image, hoverable = false, className = '', onClick }: CardProps) {
	const isClickable = !!onClick

	return (
		<div
			className={`
        ${styles.card}
        ${hoverable ? styles.hoverable : ''}
        ${isClickable ? styles.clickable : ''}
        ${className}
      `}
			onClick={onClick}
			role={isClickable ? 'button' : undefined}
			tabIndex={isClickable ? 0 : undefined}
		>
			{image && (
				<div className={styles.imageWrapper}>
					<img src={image} alt={title || ''} className={styles.image} />
				</div>
			)}
			<div className={styles.content}>
				{(title || subtitle) && (
					<div className={styles.header}>
						{title && <h3 className={styles.title}>{title}</h3>}
						{subtitle && <p className={styles.subtitle}>{subtitle}</p>}
					</div>
				)}
				<div className={styles.body}>{children}</div>
				{footer && <div className={styles.footer}>{footer}</div>}
			</div>
		</div>
	)
}
