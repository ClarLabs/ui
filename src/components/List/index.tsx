import React from 'react'
import styles from './styles.module.scss'
import { Badge, BadgeVariant } from '../Badge'

export interface ListItem {
	id: string
	title: React.ReactNode
	subtitle?: React.ReactNode
	icon?: React.ReactNode
	badge?: string | number
	badgeVariant?: BadgeVariant
	disabled?: boolean
	onClick?: () => void
}

export interface ListProps {
	items: ListItem[]
	hoverable?: boolean
	dividers?: boolean
	className?: string
}

export function List({ items, hoverable = false, dividers = false, className = '' }: ListProps) {
	return (
		<ul className={`${styles.list} ${dividers ? styles.dividers : ''} ${className}`}>
			{items.map((item) => (
				<li
					key={item.id}
					className={`${styles.item} ${hoverable && !item.disabled ? styles.hoverable : ''} ${
						item.disabled ? styles.disabled : ''
					} ${item.onClick && !item.disabled ? styles.clickable : ''}`}
					onClick={item.disabled ? undefined : item.onClick}
				>
					{item.icon && <span className={styles.icon}>{item.icon}</span>}
					<div className={styles.content}>
						<span className={styles.title}>{item.title}</span>
						{item.subtitle && <span className={styles.subtitle}>{item.subtitle}</span>}
					</div>
					{item.badge && (
						<span className={styles.badge}>
							<Badge variant={item.badgeVariant || 'default'} size="sm">
								{item.badge}
							</Badge>
						</span>
					)}
				</li>
			))}
		</ul>
	)
}
