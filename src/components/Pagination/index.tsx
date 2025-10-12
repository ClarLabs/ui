import React from 'react'
import styles from './styles.module.scss'

export interface PaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
	showFirstLast?: boolean
	siblingCount?: number
	className?: string
}

export function Pagination({ currentPage, totalPages, onPageChange, showFirstLast = true, siblingCount = 1, className = '' }: PaginationProps) {
	const range = (start: number, end: number) => {
		return Array.from({ length: end - start + 1 }, (_, i) => start + i)
	}

	const getPaginationRange = () => {
		const totalPageNumbers = siblingCount + 5

		if (totalPages <= totalPageNumbers) {
			return range(1, totalPages)
		}

		const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
		const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)
		const showLeftDots = leftSiblingIndex > 2
		const showRightDots = rightSiblingIndex < totalPages - 1

		if (!showLeftDots && showRightDots) {
			const leftRange = range(1, 3 + 2 * siblingCount)
			return [...leftRange, '...', totalPages]
		}

		if (showLeftDots && !showRightDots) {
			const rightRange = range(totalPages - (2 + 2 * siblingCount), totalPages)
			return [1, '...', ...rightRange]
		}

		const middleRange = range(leftSiblingIndex, rightSiblingIndex)
		return [1, '...', ...middleRange, '...', totalPages]
	}

	const paginationRange = getPaginationRange()

	const handlePrevious = () => {
		if (currentPage > 1) onPageChange(currentPage - 1)
	}

	const handleNext = () => {
		if (currentPage < totalPages) onPageChange(currentPage + 1)
	}

	return (
		<nav className={`${styles.pagination} ${className}`}>
			{showFirstLast && (
				<button className={styles.pageButton} onClick={() => onPageChange(1)} disabled={currentPage === 1}>
					«
				</button>
			)}
			<button className={styles.pageButton} onClick={handlePrevious} disabled={currentPage === 1}>
				‹
			</button>
			{paginationRange.map((pageNumber, index) => {
				if (pageNumber === '...') {
					return (
						<span key={`dots-${index}`} className={styles.dots}>
							...
						</span>
					)
				}
				return (
					<button
						key={pageNumber}
						className={`${styles.pageButton} ${pageNumber === currentPage ? styles.active : ''}`}
						onClick={() => onPageChange(pageNumber as number)}
					>
						{pageNumber}
					</button>
				)
			})}
			<button className={styles.pageButton} onClick={handleNext} disabled={currentPage === totalPages}>
				›
			</button>
			{showFirstLast && (
				<button className={styles.pageButton} onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
					»
				</button>
			)}
		</nav>
	)
}
