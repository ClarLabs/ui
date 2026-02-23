import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Input } from '../Input'
import { Pagination } from '../Pagination'
import { Badge } from '../Badge'
import { Spinner } from '../Spinner'
import { DatePicker } from '../DatePicker'
import { DateRangePicker } from '../DateRangePicker'
import styles from './styles.module.scss'

export type SearchDateFilter = { date: Date | null } | { start: Date | null; end: Date | null }

export interface SearchHistogramBucket {
	/** Date as ISO string (YYYY-MM-DD) */
	date: string
	/** Hit count for this date */
	count: number
}

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
	onSearch: (params: {
		query: string
		page: number
		pageSize: number
		dateFilter?: SearchDateFilter
	}) => void | Promise<void>
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
	/** Show optional date filter. Use 'date' for single date or 'range' for date range */
	dateFilterMode?: 'date' | 'range'
	/** Controlled date filter value */
	dateFilter?: SearchDateFilter
	/** Called when date filter changes (e.g. from picker or histogram brush) */
	onDateFilterChange?: (filter: SearchDateFilter) => void
	/** Optional histogram data - date vs hits. Renders above results when provided. */
	histogramData?: SearchHistogramBucket[]
	/** Called when user brushes/drags on histogram to select a date range */
	onHistogramBrush?: (range: { start: Date; end: Date }) => void
	/** Custom class name */
	className?: string
}

function escapeRegex(str: string): string {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function highlightText(text: string, searchQuery: string): React.ReactNode {
	const trimmed = searchQuery.trim()
	if (!trimmed) return text

	const terms = trimmed.split(/\s+/).filter(Boolean)
	if (terms.length === 0) return text

	const escaped = terms.map(escapeRegex)
	const pattern = new RegExp(`(${escaped.join('|')})`, 'gi')

	const parts: React.ReactNode[] = []
	let lastIndex = 0
	let match: RegExpExecArray | null
	let key = 0
	const regex = new RegExp(pattern.source, 'gi')
	while ((match = regex.exec(text)) !== null) {
		parts.push(text.slice(lastIndex, match.index))
		parts.push(
			<mark key={key++} className={styles.highlight}>
				{match[0]}
			</mark>
		)
		lastIndex = match.index + match[0].length
	}
	parts.push(text.slice(lastIndex))

	// If no matches, return original text
	if (parts.length === 1 && typeof parts[0] === 'string') return parts[0]

	return parts
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
	dateFilterMode,
	dateFilter,
	onDateFilterChange,
	histogramData,
	onHistogramBrush,
	className = ''
}: SearchProps) {
	const [query, setQuery] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [hasSearched, setHasSearched] = useState(false)
	const [internalDateFilter, setInternalDateFilter] = useState<SearchDateFilter | undefined>(undefined)
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
	const histogramRef = useRef<HTMLDivElement>(null)

	const effectiveDateFilter = dateFilter ?? internalDateFilter

	const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))

	const performSearch = useCallback(
		(searchQuery: string, page: number, filter?: SearchDateFilter) => {
			onSearch({ query: searchQuery, page, pageSize, dateFilter: filter ?? effectiveDateFilter })
		},
		[onSearch, pageSize, effectiveDateFilter]
	)

	const handleDateFilterChange = useCallback(
		(filter: SearchDateFilter) => {
			if (onDateFilterChange) {
				onDateFilterChange(filter)
			} else {
				setInternalDateFilter(filter)
			}
			setCurrentPage(1)
			performSearch(query.trim(), 1, filter)
		},
		[onDateFilterChange, query, performSearch]
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

	// Histogram brush state
	const [brushStart, setBrushStart] = useState<number | null>(null)
	const [brushEnd, setBrushEnd] = useState<number | null>(null)
	const isBrushing = brushStart !== null

	const handleHistogramMouseDown = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!histogramData?.length || dateFilterMode !== 'range') return
			const rect = histogramRef.current?.getBoundingClientRect()
			if (!rect) return
			const x = (e.clientX - rect.left) / rect.width
			const idx = Math.floor(x * histogramData.length)
			const clampedIdx = Math.max(0, Math.min(idx, histogramData.length - 1))
			setBrushStart(clampedIdx)
			setBrushEnd(clampedIdx)
		},
		[histogramData, dateFilterMode]
	)

	const handleHistogramMouseMove = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (brushStart === null || !histogramData?.length) return
			const rect = histogramRef.current?.getBoundingClientRect()
			if (!rect) return
			const x = (e.clientX - rect.left) / rect.width
			const idx = Math.floor(x * histogramData.length)
			const clampedIdx = Math.max(0, Math.min(idx, histogramData.length - 1))
			setBrushEnd(clampedIdx)
		},
		[brushStart, histogramData]
	)

	const handleHistogramMouseUp = useCallback(() => {
		if (brushStart === null || brushEnd === null || !histogramData?.length || dateFilterMode !== 'range') {
			setBrushStart(null)
			setBrushEnd(null)
			return
		}
		const [startIdx, endIdx] = brushStart <= brushEnd ? [brushStart, brushEnd] : [brushEnd, brushStart]
		const startDate = new Date(histogramData[startIdx].date + 'T00:00:00Z')
		const endDate = new Date(histogramData[endIdx].date + 'T23:59:59Z')
		onHistogramBrush?.({ start: startDate, end: endDate })
		handleDateFilterChange({ start: startDate, end: endDate })
		setBrushStart(null)
		setBrushEnd(null)
	}, [brushStart, brushEnd, histogramData, dateFilterMode, onHistogramBrush, handleDateFilterChange])

	useEffect(() => {
		if (isBrushing) {
			const handleUp = () => handleHistogramMouseUp()
			window.addEventListener('mouseup', handleUp)
			return () => window.removeEventListener('mouseup', handleUp)
		}
	}, [isBrushing, handleHistogramMouseUp])

	useEffect(() => {
		if (isBrushing) {
			const handleMove = (e: MouseEvent) => {
				if (!histogramRef.current) return
				const rect = histogramRef.current.getBoundingClientRect()
				const x = (e.clientX - rect.left) / rect.width
				const idx = Math.floor(x * (histogramData?.length ?? 1))
				const clampedIdx = Math.max(0, Math.min(idx, (histogramData?.length ?? 1) - 1))
				setBrushEnd(clampedIdx)
			}
			window.addEventListener('mousemove', handleMove)
			return () => window.removeEventListener('mousemove', handleMove)
		}
	}, [isBrushing, histogramData?.length])

	// Cleanup debounce on unmount
	useEffect(() => {
		return () => {
			if (debounceRef.current) clearTimeout(debounceRef.current)
		}
	}, [])

	const isActive = hasSearched && query.trim().length > 0
	const showResults = isActive
	const showPagination = showResults && totalCount > pageSize
	const showHistogram = showResults && histogramData && histogramData.length > 0

	return (
		<div className={`${styles.search} ${isActive ? styles.active : styles.initial} ${className}`}>
			<form
				className={`${styles.searchForm} ${isActive ? styles.compact : styles.centered}`}
				onSubmit={handleSubmit}
				role="search"
			>
				<div className={`${styles.formRow} ${isActive ? styles.compact : ''}`}>
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
					{dateFilterMode && (
						<div className={styles.dateFilterWrapper}>
							{dateFilterMode === 'date' ? (
								<DatePicker
									value={
										effectiveDateFilter && 'date' in effectiveDateFilter
											? effectiveDateFilter.date ?? undefined
											: undefined
									}
									onChange={(date) => handleDateFilterChange({ date: date ?? null })}
									placeholder="Filter by date"
								/>
							) : (
								<DateRangePicker
									value={
										effectiveDateFilter && 'start' in effectiveDateFilter
											? {
													start: effectiveDateFilter.start ?? null,
													end: effectiveDateFilter.end ?? null
												}
											: { start: null, end: null }
									}
									onChange={(range) =>
										handleDateFilterChange({ start: range.start ?? null, end: range.end ?? null })
									}
									placeholder="Filter by date range"
								/>
							)}
						</div>
					)}
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
							{showHistogram && (
								<div
									ref={histogramRef}
									className={`${styles.histogram} ${dateFilterMode === 'range' ? styles.brushable : ''}`}
									onMouseDown={handleHistogramMouseDown}
									onMouseMove={handleHistogramMouseMove}
									onMouseLeave={() => {
										if (isBrushing) {
											setBrushStart(null)
											setBrushEnd(null)
										}
									}}
									role={dateFilterMode === 'range' ? 'application' : undefined}
									aria-label="Search results over time. Drag to narrow date range."
								>
									<div className={styles.histogramBars}>
										{histogramData!.map((bucket, i) => {
											const maxCount = Math.max(...histogramData!.map((b) => b.count), 1)
											const heightPct = (bucket.count / maxCount) * 100
											const isInBrush =
												brushStart !== null &&
												brushEnd !== null &&
												i >= Math.min(brushStart, brushEnd) &&
												i <= Math.max(brushStart, brushEnd)
											return (
												<div
													key={bucket.date}
													className={`${styles.histogramBar} ${isInBrush ? styles.brushSelected : ''}`}
													style={{ height: `${heightPct}%` }}
													title={`${bucket.date}: ${bucket.count} hits`}
												/>
											)
										})}
									</div>
									<div className={styles.histogramLabels}>
										{histogramData!.length > 0 && (
											<>
												<span>{histogramData![0].date}</span>
												<span>{histogramData![histogramData!.length - 1].date}</span>
											</>
										)}
									</div>
									{dateFilterMode === 'range' && (
										<p className={styles.histogramHint}>Drag to narrow date range</p>
									)}
								</div>
							)}
							{results.length > 0 ? (
								<>
									<div className={styles.resultsHeader}>
										<span className={styles.resultCount}>
											{totalCount} result{totalCount !== 1 ? 's' : ''} found
										</span>
									</div>
									<ul className={styles.resultList}>
										{results.map((result) => {
											const searchTerm = query.trim()
											const resultContent = (
												<>
													<div className={styles.resultTitleRow}>
														<h3 className={styles.resultTitle}>
															{highlightText(result.title, searchTerm)}
														</h3>
														{result.tags && result.tags.length > 0 && (
															<div className={styles.resultTags}>
																{result.tags.map((tag) => (
																	<Badge key={tag} variant="default" size="sm" className={styles.tag}>
																		{highlightText(tag, searchTerm)}
																	</Badge>
																))}
															</div>
														)}
													</div>
													<p className={styles.resultBody}>{highlightText(result.body, searchTerm)}</p>
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
