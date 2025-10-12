import React from 'react'
import styles from './styles.module.scss'

export type HeroVariant = 'default' | 'gradient' | 'image' | 'video' | 'split' | 'centered' | 'minimal'
export type HeroSize = 'small' | 'medium' | 'large' | 'fullscreen'
export type HeroAlignment = 'left' | 'center' | 'right'

export interface HeroProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
	/** Hero variant style */
	variant?: HeroVariant
	/** Hero size */
	size?: HeroSize
	/** Content alignment */
	alignment?: HeroAlignment
	/** Hero title */
	title?: React.ReactNode
	/** Hero subtitle or description */
	subtitle?: React.ReactNode
	/** Background image URL */
	backgroundImage?: string
	/** Background video URL */
	backgroundVideo?: string
	/** Background overlay opacity (0-1) */
	overlayOpacity?: number
	/** Primary action button */
	primaryAction?: {
		label: string
		onClick?: () => void
		href?: string
	}
	/** Secondary action button */
	secondaryAction?: {
		label: string
		onClick?: () => void
		href?: string
	}
	/** Additional content to render in the hero */
	children?: React.ReactNode
	/** Image to display (for split variant) */
	image?: string
	/** Image alt text */
	imageAlt?: string
	/** Image position (for split variant) */
	imagePosition?: 'left' | 'right'
}

export function Hero({
	variant = 'default',
	size = 'large',
	alignment = 'center',
	title,
	subtitle,
	backgroundImage,
	backgroundVideo,
	overlayOpacity = 0.5,
	primaryAction,
	secondaryAction,
	children,
	image,
	imageAlt = 'Hero image',
	imagePosition = 'right',
	className = '',
	style,
	...props
}: HeroProps) {
	const heroStyles: React.CSSProperties = {
		...style
	}

	// Handle background image
	if (backgroundImage && variant === 'image') {
		heroStyles.backgroundImage = `url(${backgroundImage})`
	}

	const renderActions = () => {
		if (!primaryAction && !secondaryAction) return null

		return (
			<div className={styles.actions}>
				{primaryAction && (
					primaryAction.href ? (
						<a
							href={primaryAction.href}
							className={`${styles.button} ${styles.primary}`}
						>
							{primaryAction.label}
						</a>
					) : (
						<button
							type="button"
							onClick={primaryAction.onClick}
							className={`${styles.button} ${styles.primary}`}
						>
							{primaryAction.label}
						</button>
					)
				)}
				{secondaryAction && (
					secondaryAction.href ? (
						<a
							href={secondaryAction.href}
							className={`${styles.button} ${styles.secondary}`}
						>
							{secondaryAction.label}
						</a>
					) : (
						<button
							type="button"
							onClick={secondaryAction.onClick}
							className={`${styles.button} ${styles.secondary}`}
						>
							{secondaryAction.label}
						</button>
					)
				)}
			</div>
		)
	}

	const renderContent = () => (
		<div className={styles.content}>
			{title && <h1 className={styles.title}>{title}</h1>}
			{subtitle && <p className={styles.subtitle}>{subtitle}</p>}
			{renderActions()}
			{children && <div className={styles.children}>{children}</div>}
		</div>
	)

	const renderVideoBackground = () => {
		if (!backgroundVideo || variant !== 'video') return null

		return (
			<video
				className={styles.backgroundVideo}
				autoPlay
				loop
				muted
				playsInline
			>
				<source src={backgroundVideo} type="video/mp4" />
			</video>
		)
	}

	const renderOverlay = () => {
		if ((variant === 'image' || variant === 'video') && overlayOpacity > 0) {
			return (
				<div
					className={styles.overlay}
					style={{ opacity: overlayOpacity }}
				/>
			)
		}
		return null
	}

	// Split variant with image
	if (variant === 'split' && image) {
		return (
			<section
				className={`${styles.hero} ${styles[variant]} ${styles[size]} ${styles[alignment]} ${imagePosition === 'left' ? styles.imageLeft : styles.imageRight} ${className}`}
				style={heroStyles}
				{...props}
			>
				<div className={styles.container}>
					<div className={styles.splitContent}>
						{renderContent()}
					</div>
					<div className={styles.splitImage}>
						<img src={image} alt={imageAlt} />
					</div>
				</div>
			</section>
		)
	}

	// Standard hero variants
	return (
		<section
			className={`${styles.hero} ${styles[variant]} ${styles[size]} ${styles[alignment]} ${className}`}
			style={heroStyles}
			{...props}
		>
			{renderVideoBackground()}
			{renderOverlay()}
			<div className={styles.container}>
				{renderContent()}
			</div>
		</section>
	)
}
