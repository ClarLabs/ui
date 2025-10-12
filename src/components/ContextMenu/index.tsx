import React, { useState, useEffect, useRef } from 'react'
import styles from './styles.module.scss'

export interface ContextMenuItem {
	/** Unique identifier */
	id: string
	/** Label to display */
	label: string
	/** Icon element */
	icon?: React.ReactNode
	/** Callback when item is clicked */
	onClick?: () => void
	/** Whether the item is disabled */
	disabled?: boolean
	/** Separator after this item */
	separator?: boolean
	/** Keyboard shortcut to display */
	shortcut?: string
	/** Danger variant (red styling) */
	danger?: boolean
	/** Submenu items */
	submenu?: ContextMenuItem[]
}

export interface ContextMenuProps {
	/** Menu items */
	items: ContextMenuItem[]
	/** Trigger element */
	children: React.ReactNode
	/** Custom className */
	className?: string
	/** Disabled state */
	disabled?: boolean
}

export function ContextMenu({ items, children, className = '', disabled = false }: ContextMenuProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [position, setPosition] = useState({ x: 0, y: 0 })
	const [submenuStates, setSubmenuStates] = useState<Record<string, boolean>>({})
	const menuRef = useRef<HTMLDivElement>(null)
	const triggerRef = useRef<HTMLDivElement>(null)

	const handleContextMenu = (e: React.MouseEvent) => {
		if (disabled) return

		e.preventDefault()
		e.stopPropagation()

		// Calculate position
		const x = e.clientX
		const y = e.clientY

		// Adjust if menu would go off screen
		const menuWidth = 240
		const menuHeight = items.length * 40 + 16 // Approximate
		const viewportWidth = window.innerWidth
		const viewportHeight = window.innerHeight

		const adjustedX = x + menuWidth > viewportWidth ? viewportWidth - menuWidth - 10 : x
		const adjustedY = y + menuHeight > viewportHeight ? viewportHeight - menuHeight - 10 : y

		setPosition({ x: adjustedX, y: adjustedY })
		setIsOpen(true)
	}

	const handleClickOutside = (e: MouseEvent) => {
		if (
			menuRef.current &&
			!menuRef.current.contains(e.target as Node) &&
			triggerRef.current &&
			!triggerRef.current.contains(e.target as Node)
		) {
			setIsOpen(false)
			setSubmenuStates({})
		}
	}

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
			document.addEventListener('contextmenu', handleClickOutside)

			return () => {
				document.removeEventListener('mousedown', handleClickOutside)
				document.removeEventListener('contextmenu', handleClickOutside)
			}
		}
	}, [isOpen])

	const handleItemClick = (item: ContextMenuItem) => {
		if (item.disabled) return

		if (item.submenu) {
			setSubmenuStates((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
		} else {
			item.onClick?.()
			setIsOpen(false)
			setSubmenuStates({})
		}
	}

	const handleSubmenuMouseEnter = (itemId: string) => {
		setSubmenuStates((prev) => ({ ...prev, [itemId]: true }))
	}

	const handleSubmenuMouseLeave = (itemId: string) => {
		setSubmenuStates((prev) => ({ ...prev, [itemId]: false }))
	}

	const renderMenuItem = (item: ContextMenuItem, depth = 0) => {
		const hasSubmenu = item.submenu && item.submenu.length > 0
		const isSubmenuOpen = submenuStates[item.id]

		return (
			<React.Fragment key={item.id}>
				<div
					className={`${styles.menuItem} ${item.disabled ? styles.disabled : ''} ${item.danger ? styles.danger : ''}`}
					onClick={() => handleItemClick(item)}
					onMouseEnter={() => hasSubmenu && handleSubmenuMouseEnter(item.id)}
					onMouseLeave={() => hasSubmenu && handleSubmenuMouseLeave(item.id)}
					style={{ paddingLeft: `${0.75 + depth * 0.5}rem` }}
				>
					<div className={styles.menuItemContent}>
						{item.icon && <span className={styles.icon}>{item.icon}</span>}
						<span className={styles.label}>{item.label}</span>
					</div>

					<div className={styles.menuItemRight}>
						{item.shortcut && <span className={styles.shortcut}>{item.shortcut}</span>}
						{hasSubmenu && <span className={styles.submenuIndicator}>›</span>}
					</div>

					{hasSubmenu && isSubmenuOpen && (
						<div className={styles.submenu}>
							{item.submenu!.map((subItem) => renderMenuItem(subItem, depth + 1))}
						</div>
					)}
				</div>

				{item.separator && <div className={styles.separator} />}
			</React.Fragment>
		)
	}

	return (
		<>
			<div
				ref={triggerRef}
				onContextMenu={handleContextMenu}
				className={className}
				style={{ display: 'inline-block' }}
			>
				{children}
			</div>

			{isOpen && (
				<div
					ref={menuRef}
					className={styles.contextMenu}
					style={{
						left: `${position.x}px`,
						top: `${position.y}px`
					}}
				>
					{items.map((item) => renderMenuItem(item))}
				</div>
			)}
		</>
	)
}
