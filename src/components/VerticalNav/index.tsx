import React, { useState } from 'react'
import styles from './styles.module.scss'

export interface NavItem {
	id: string
	label: string
	icon?: React.ReactNode
	href?: string
	onClick?: () => void
	children?: NavItem[]
	disabled?: boolean
	badge?: React.ReactNode
	megaMenu?: boolean
}

export type NavOrientation = 'vertical' | 'horizontal'

export interface VerticalNavProps {
	items: NavItem[]
	orientation?: NavOrientation
	defaultExpandedIds?: string[]
	onItemClick?: (item: NavItem) => void
	className?: string
	collapsed?: boolean
}

interface NavItemComponentProps {
	item: NavItem
	level: number
	expandedIds: Set<string>
	onToggle: (id: string) => void
	onItemClick?: (item: NavItem) => void
	orientation: NavOrientation
	collapsed?: boolean
}

function NavItemComponent({ item, level, expandedIds, onToggle, onItemClick, orientation, collapsed }: NavItemComponentProps) {
	const hasChildren = item.children && item.children.length > 0
	const isExpanded = expandedIds.has(item.id)
	const isMegaMenu = item.megaMenu && hasChildren

	const handleClick = (e: React.MouseEvent) => {
		if (item.disabled) return

		if (hasChildren && orientation === 'vertical') {
			e.preventDefault()
			onToggle(item.id)
		}

		if (item.onClick) {
			item.onClick()
		}

		onItemClick?.(item)
	}

	const renderContent = () => (
		<>
			{item.icon && <span className={styles.icon}>{item.icon}</span>}
			{!collapsed && <span className={styles.label}>{item.label}</span>}
			{!collapsed && item.badge && <span className={styles.badge}>{item.badge}</span>}
			{!collapsed && hasChildren && orientation === 'vertical' && <span className={`${styles.expandIcon} ${isExpanded ? styles.expanded : ''}`}>▶</span>}
			{!collapsed && hasChildren && orientation === 'horizontal' && <span className={styles.dropdownIcon}>▼</span>}
		</>
	)

	const content = item.href ? (
		<a href={item.href} className={`${styles.navItem} ${item.disabled ? styles.disabled : ''} ${level > 0 ? styles.nested : ''}`} onClick={handleClick}>
			{renderContent()}
		</a>
	) : (
		<button type="button" className={`${styles.navItem} ${item.disabled ? styles.disabled : ''} ${level > 0 ? styles.nested : ''}`} onClick={handleClick}>
			{renderContent()}
		</button>
	)

	return (
		<div className={`${styles.navItemWrapper} ${isMegaMenu ? styles.megaMenuWrapper : ''}`}>
			{content}
			{hasChildren && (
				<>
					{orientation === 'vertical' && isExpanded && (
						<div className={styles.children}>
							{item.children!.map((child) => (
								<NavItemComponent
									key={child.id}
									item={child}
									level={level + 1}
									expandedIds={expandedIds}
									onToggle={onToggle}
									onItemClick={onItemClick}
									orientation={orientation}
									collapsed={collapsed}
								/>
							))}
						</div>
					)}
					{orientation === 'horizontal' && (
						<div className={`${styles.dropdown} ${isMegaMenu ? styles.megaMenu : ''}`}>
							{isMegaMenu ? (
								<div className={styles.megaMenuGrid}>
									{item.children!.map((child) => (
										<div key={child.id} className={styles.megaMenuColumn}>
											<NavItemComponent
												item={child}
												level={level + 1}
												expandedIds={expandedIds}
												onToggle={onToggle}
												onItemClick={onItemClick}
												orientation={orientation}
												collapsed={collapsed}
											/>
										</div>
									))}
								</div>
							) : (
								item.children!.map((child) => (
									<NavItemComponent
										key={child.id}
										item={child}
										level={level + 1}
										expandedIds={expandedIds}
										onToggle={onToggle}
										onItemClick={onItemClick}
										orientation={orientation}
										collapsed={collapsed}
									/>
								))
							)}
						</div>
					)}
				</>
			)}
		</div>
	)
}

export function VerticalNav({ items, orientation = 'vertical', defaultExpandedIds = [], onItemClick, className = '', collapsed = false }: VerticalNavProps) {
	const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(defaultExpandedIds))

	const handleToggle = (id: string) => {
		setExpandedIds((prev) => {
			const next = new Set(prev)
			if (next.has(id)) {
				next.delete(id)
			} else {
				next.add(id)
			}
			return next
		})
	}

	return (
		<nav className={`${styles.nav} ${styles[orientation]} ${collapsed ? styles.collapsed : ''} ${className}`}>
			{items.map((item) => (
				<NavItemComponent
					key={item.id}
					item={item}
					level={0}
					expandedIds={expandedIds}
					onToggle={handleToggle}
					onItemClick={onItemClick}
					orientation={orientation}
					collapsed={collapsed}
				/>
			))}
		</nav>
	)
}
