import React from 'react'
import styles from './styles.module.scss'

export type StatCardVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
export type StatCardSize = 'sm' | 'md' | 'lg'
export type TrendDirection = 'up' | 'down' | 'neutral'

export interface StatCardProps {
	/** Main statistic value */
	value: string | number
	/** Label for the statistic */
	label: string
	/** Optional icon */
	icon?: React.ReactNode
	/** Color variant */
	variant?: StatCardVariant
	/** Size variant */
	size?: StatCardSize
	/** Change amount (e.g., "+12.5%") */
	change?: string
	/** Trend direction */
	trend?: TrendDirection
	/** Description or additional info */
	description?: string
	/** Footer content */
	footer?: React.ReactNode
	/** Loading state */
	loading?: boolean
	/** Custom className */
	className?: string
	/** Click handler */
	onClick?: () => void
	/** Show border */
	bordered?: boolean
	/** Prefix for the value (e.g., "$", "€") */
	prefix?: string
	/** Suffix for the value (e.g., "%", "ms") */
	suffix?: string
}

export function StatCard({
	value,
	label,
	icon,
	variant = 'default',
	size = 'md',
	change,
	trend,
	description,
	footer,
	loading = false,
	className = '',
	onClick,
	bordered = false,
	prefix,
	suffix
}: StatCardProps) {
	const isClickable = !!onClick

	const renderValue = () => {
		if (loading) {
			return (
				<div className={styles.loadingSkeleton}>
					<div className={styles.skeletonValue} />
				</div>
			)
		}

		return (
			<div className={styles.valueContainer}>
				{prefix && <span className={styles.prefix}>{prefix}</span>}
				<span className={styles.value}>{value}</span>
				{suffix && <span className={styles.suffix}>{suffix}</span>}
			</div>
		)
	}

	const renderTrend = () => {
		if (!change && !trend) return null

		const trendClass = trend
			? styles[`trend-${trend}`]
			: change?.startsWith('+') || change?.startsWith('↑')
				? styles['trend-up']
				: change?.startsWith('-') || change?.startsWith('↓')
					? styles['trend-down']
					: styles['trend-neutral']

		return (
			<div className={`${styles.changeContainer} ${trendClass}`}>
				{trend === 'up' && !change?.includes('↑') && !change?.includes('▲') && (
					<span className={styles.trendIcon}>↑</span>
				)}
				{trend === 'down' && !change?.includes('↓') && !change?.includes('▼') && (
					<span className={styles.trendIcon}>↓</span>
				)}
				{trend === 'neutral' && !change?.includes('→') && (
					<span className={styles.trendIcon}>→</span>
				)}
				{change && <span className={styles.change}>{change}</span>}
			</div>
		)
	}

	return (
		<div
			className={`${styles.statCard} ${styles[variant]} ${styles[size]} ${isClickable ? styles.clickable : ''} ${bordered ? styles.bordered : ''} ${loading ? styles.loading : ''} ${className}`}
			onClick={onClick}
			role={isClickable ? 'button' : undefined}
			tabIndex={isClickable ? 0 : undefined}
			onKeyDown={
				isClickable
					? (e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault()
								onClick?.()
							}
						}
					: undefined
			}
		>
			<div className={styles.header}>
				<div className={styles.labelContainer}>
					{icon && <span className={styles.icon}>{icon}</span>}
					<span className={styles.label}>{label}</span>
				</div>
				{renderTrend()}
			</div>

			<div className={styles.content}>
				{renderValue()}
				{description && !loading && <p className={styles.description}>{description}</p>}
				{loading && description && (
					<div className={styles.loadingSkeleton}>
						<div className={styles.skeletonDescription} />
					</div>
				)}
			</div>

			{footer && !loading && <div className={styles.footer}>{footer}</div>}
		</div>
	)
}
