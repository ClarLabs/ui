import React, { useCallback, useState } from 'react'
import { Input } from '../Input'
import { Pagination } from '../Pagination'
import { Badge } from '../Badge'
import { Spinner } from '../Spinner'
import styles from './styles.module.scss'

export interface SearchResult {
	/** Unique identifier */
	id: string
	/** Result title */
	title: string
	/** Result body/description */
	body: string
	/** Optional tags to display next to title */
	tags?: string[]
	/** Click handler for custom behavior */
	onClick?: () => void
	/** External link URL (use with newTab to open in new window) */
	href?: string
	/** When href is set, open link in new tab (target="_blank") */
	newTab?: boolean
}

export interface SearchProps {
	/** Callback when user searches or changes page. Hook to any data source (API, local filter, etc.) */
	onSearch: (params: { query: string; page: number; pageSize: number }) => void | Promise<void>
	/** Search results from your data source */
	results: SearchResult[]
	/** Total number of results (for pagination) */
	totalCount: number
	/** Number of results per page */
	pageSize?: number
	/** Search input placeholder */
	placeholder?: string
	/** Loading state (e.g. when fetching from API) */
	loading?: boolean
	/** Debounce delay in ms before firing onSearch (0 = no debounce) */
	debounceMs?: number
	/** Custom class name */
	className?: string
}

const searchIcon = (
	<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
		<path
			d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
)

export function Search({
	onSearch,
	results,
	totalCount,
	pageSize = 10,
	placeholder = 'Search...',
	loading = false,
	debounceMs = 300,
	className = ''
}: SearchProps) {
	const [query, setQuery] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [hasSearched, setHasSearched] = useState(false)
	const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

	const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))

	const performSearch = useCallback(
		(searchQuery: string, page: number) => {
			onSearch({ query: searchQuery, page, pageSize })
		},
		[onSearch, pageSize]
	)

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value
			setQuery(value)

			if (debounceRef.current) {
				clearTimeout(debounceRef.current)
			}

			if (value.trim()) {
				if (debounceMs > 0) {
					debounceRef.current = setTimeout(() => {
						setHasSearched(true)
						setCurrentPage(1)
						performSearch(value.trim(), 1)
						debounceRef.current = null
					}, debounceMs)
				} else {
					setHasSearched(true)
					setCurrentPage(1)
					performSearch(value.trim(), 1)
				}
			} else {
				setHasSearched(false)
				setCurrentPage(1)
			}
		},
		[debounceMs, performSearch]
	)

	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault()
			if (debounceRef.current) {
				clearTimeout(debounceRef.current)
				debounceRef.current = null
			}
			const trimmed = query.trim()
			if (trimmed) {
				setHasSearched(true)
				setCurrentPage(1)
				performSearch(trimmed, 1)
			}
		},
		[query, performSearch]
	)

	const handlePageChange = useCallback(
		(page: number) => {
			setCurrentPage(page)
			performSearch(query.trim(), page)
		},
		[query, performSearch]
	)

	// Cleanup debounce on unmount
	React.useEffect(() => {
		return () => {
			if (debounceRef.current) clearTimeout(debounceRef.current)
		}
	}, [])

	const isActive = hasSearched && query.trim().length > 0
	const showResults = isActive
	const showPagination = showResults && totalCount > pageSize

	return (
		<div className={`${styles.search} ${isActive ? styles.active : styles.initial} ${className}`}>
			<form
				className={`${styles.searchForm} ${isActive ? styles.compact : styles.centered}`}
				onSubmit={handleSubmit}
				role="search"
			>
				<div className={styles.inputWrapper}>
					<Input
						type="search"
						value={query}
						onChange={handleInputChange}
						placeholder={placeholder}
						icon={searchIcon}
						fullWidth
						size="lg"
						className={styles.input}
						aria-label="Search"
						autoComplete="off"
					/>
				</div>
			</form>

			{showResults && (
				<div className={styles.resultsSection}>
					{loading ? (
						<div className={styles.loading}>
							<Spinner size="lg" variant="default" />
							<span className={styles.loadingText}>Searching...</span>
						</div>
					) : (
						<>
							{results.length > 0 ? (
								<>
									<div className={styles.resultsHeader}>
										<span className={styles.resultCount}>
											{totalCount} result{totalCount !== 1 ? 's' : ''} found
										</span>
									</div>
									<ul className={styles.resultList}>
										{results.map((result) => {
											const resultContent = (
												<>
													<div className={styles.resultTitleRow}>
														<h3 className={styles.resultTitle}>{result.title}</h3>
														{result.tags && result.tags.length > 0 && (
															<div className={styles.resultTags}>
																{result.tags.map((tag) => (
																	<Badge key={tag} variant="default" size="sm" className={styles.tag}>
																		{tag}
																	</Badge>
																))}
															</div>
														)}
													</div>
													<p className={styles.resultBody}>{result.body}</p>
												</>
											)
											return (
												<li key={result.id} className={styles.resultListItem}>
													{result.href ? (
														<a
															href={result.href}
															target={result.newTab ? '_blank' : undefined}
															rel={result.newTab ? 'noopener noreferrer' : undefined}
															className={`${styles.resultItem} ${styles.clickable} ${styles.link}`}
														>
															{resultContent}
														</a>
													) : result.onClick ? (
														<button
															type="button"
															onClick={result.onClick}
															className={`${styles.resultItem} ${styles.clickable} ${styles.button}`}
														>
															{resultContent}
														</button>
													) : (
														<div className={styles.resultItem}>{resultContent}</div>
													)}
												</li>
											)
										})}
									</ul>
									{showPagination && (
										<div className={styles.paginationWrapper}>
											<Pagination
												currentPage={currentPage}
												totalPages={totalPages}
												onPageChange={handlePageChange}
											/>
										</div>
									)}
								</>
							) : (
								<div className={styles.empty}>
									<svg
										className={styles.emptyIcon}
										width="48"
										height="48"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden
									>
										<path
											d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
									<p className={styles.emptyTitle}>No results found</p>
									<p className={styles.emptyBody}>Try a different search term or check your spelling</p>
								</div>
							)}
						</>
					)}
				</div>
			)}
		</div>
	)
}
