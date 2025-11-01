import React, { useState, useRef, useEffect } from 'react'
import styles from './styles.module.scss'

export interface ToolbarMenuItem {
	/** Unique identifier */
	id: string
	/** Label to display */
	label: string
	/** Icon element */
	icon?: React.ReactNode
	/** Whether the item is disabled */
	disabled?: boolean
	/** Submenu items for dropdown */
	submenu?: ToolbarMenuItem[]
	/** Callback when item is clicked (if no submenu) */
	onClick?: () => void
	/** Separator after this item */
	separator?: boolean
	/** Badge or count to display */
	badge?: string | number
}

export interface ToolbarStatus {
	/** Status text */
	text: string
	/** Optional icon */
	icon?: React.ReactNode
	/** Optional tooltip */
	tooltip?: string
}

export interface ToolbarProps {
	/** Menu items with optional dropdowns */
	menuItems?: ToolbarMenuItem[]
	/** Status information sections */
	statusItems?: ToolbarStatus[]
	/** Additional custom content */
	children?: React.ReactNode
	/** Custom className */
	className?: string
}

export function Toolbar({ menuItems = [], statusItems = [], children, className = '' }: ToolbarProps) {
	const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set())
	const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({})

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node
			for (const [id, ref] of Object.entries(dropdownRefs.current)) {
				if (ref && !ref.contains(target)) {
					setOpenDropdowns((prev) => {
						const next = new Set(prev)
						next.delete(id)
						return next
					})
				}
			}
		}

		if (openDropdowns.size > 0) {
			document.addEventListener('mousedown', handleClickOutside)
			return () => document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [openDropdowns])

	const toggleDropdown = (id: string) => {
		setOpenDropdowns((prev) => {
			const next = new Set(prev)
			if (next.has(id)) {
				next.delete(id)
			} else {
				// Close other dropdowns
				next.clear()
				next.add(id)
			}
			return next
		})
	}

	const handleMenuItemClick = (item: ToolbarMenuItem) => {
		if (item.disabled) return

		if (item.submenu && item.submenu.length > 0) {
			toggleDropdown(item.id)
		} else {
			item.onClick?.()
		}
	}

	const renderMenuItem = (item: ToolbarMenuItem) => {
		// Handle separator items
		if (!item.label && item.separator) {
			return <div key={item.id} className={styles.separator} />
		}

		const hasDropdown = item.submenu && item.submenu.length > 0
		const isOpen = openDropdowns.has(item.id)

		return (
			<React.Fragment key={item.id}>
				<div className={styles.menuItemContainer}>
					<button
						type="button"
						className={`${styles.menuItem} ${item.disabled ? styles.disabled : ''} ${isOpen ? styles.active : ''}`}
						onClick={() => handleMenuItemClick(item)}
						disabled={item.disabled}
					>
						{item.icon && <span className={styles.icon}>{item.icon}</span>}
						<span className={styles.label}>{item.label}</span>
						{item.badge !== undefined && <span className={styles.badge}>{item.badge}</span>}
						{hasDropdown && (
							<span className={`${styles.dropdownArrow} ${isOpen ? styles.open : ''}`}>▼</span>
						)}
					</button>

					{hasDropdown && isOpen && (
						<div
							ref={(el) => (dropdownRefs.current[item.id] = el)}
							className={styles.dropdown}
						>
							{item.submenu!.map((subItem) => {
								// Handle separator in submenu
								if (!subItem.label && subItem.separator) {
									return <div key={subItem.id} className={styles.dropdownSeparator} />
								}

								return (
									<button
										key={subItem.id}
										type="button"
										className={`${styles.dropdownItem} ${subItem.disabled ? styles.disabled : ''}`}
										onClick={() => {
											if (!subItem.disabled) {
												subItem.onClick?.()
												setOpenDropdowns(new Set())
											}
										}}
										disabled={subItem.disabled}
									>
										{subItem.icon && <span className={styles.icon}>{subItem.icon}</span>}
										<span className={styles.label}>{subItem.label}</span>
										{subItem.badge !== undefined && <span className={styles.badge}>{subItem.badge}</span>}
									</button>
								)
							})}
						</div>
					)}
				</div>

				{item.separator && <div className={styles.separator} />}
			</React.Fragment>
		)
	}

	const renderStatusItem = (status: ToolbarStatus, index: number) => {
		return (
			<div key={index} className={styles.statusItem} title={status.tooltip}>
				{status.icon && <span className={styles.statusIcon}>{status.icon}</span>}
				<span className={styles.statusText}>{status.text}</span>
			</div>
		)
	}

	return (
		<div className={`${styles.toolbar} ${className}`}>
			{menuItems.length > 0 && (
				<div className={styles.menuSection}>
					{menuItems.map((item) => renderMenuItem(item))}
				</div>
			)}

			{children && <div className={styles.contentSection}>{children}</div>}

			{statusItems.length > 0 && (
				<div className={styles.statusSection}>
					{statusItems.map((status, index) => renderStatusItem(status, index))}
				</div>
			)}
		</div>
	)
}

