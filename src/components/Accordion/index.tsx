import React, { useState } from 'react'
import styles from './styles.module.scss'

export interface AccordionItemProps {
	id: string
	title: string
	content: React.ReactNode
}

export interface AccordionProps {
	items: AccordionItemProps[]
	allowMultiple?: boolean
	defaultOpenIds?: string[]
	className?: string
}

export function Accordion({ items, allowMultiple = false, defaultOpenIds = [], className = '' }: AccordionProps) {
	const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpenIds))

	const toggleItem = (id: string) => {
		setOpenIds((prev) => {
			const newSet = new Set(prev)
			if (newSet.has(id)) {
				newSet.delete(id)
			} else {
				if (!allowMultiple) {
					newSet.clear()
				}
				newSet.add(id)
			}
			return newSet
		})
	}

	return (
		<div className={`${styles.accordion} ${className}`}>
			{items.map((item) => (
				<AccordionItem key={item.id} item={item} isOpen={openIds.has(item.id)} onToggle={() => toggleItem(item.id)} />
			))}
		</div>
	)
}

interface AccordionItemInternalProps {
	item: AccordionItemProps
	isOpen: boolean
	onToggle: () => void
}

function AccordionItem({ item, isOpen, onToggle }: AccordionItemInternalProps) {
	return (
		<div className={`${styles.item} ${isOpen ? styles.open : ''}`}>
			<button className={styles.header} onClick={onToggle} aria-expanded={isOpen}>
				<span className={styles.title}>{item.title}</span>
				<span className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}>▼</span>
			</button>
			<div className={`${styles.content} ${isOpen ? styles.contentOpen : ''}`}>
				<div className={styles.contentInner}>{item.content}</div>
			</div>
		</div>
	)
}
