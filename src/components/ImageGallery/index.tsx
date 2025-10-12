import React, { useState, useEffect, useCallback, useRef } from 'react'
import styles from './styles.module.scss'

export type ImageGalleryVariant = 'carousel' | 'grid' | 'masonry'
export type ImageGallerySize = 'sm' | 'md' | 'lg'

export interface GalleryImage {
	/** Unique identifier */
	id: string
	/** Image source URL */
	src: string
	/** Alt text for accessibility */
	alt: string
	/** Optional caption */
	caption?: string
	/** Optional thumbnail (for performance) */
	thumbnail?: string
	/** Optional title */
	title?: string
}

export interface ImageGalleryProps {
	/** Array of images to display */
	images: GalleryImage[]
	/** Gallery variant */
	variant?: ImageGalleryVariant
	/** Size variant */
	size?: ImageGallerySize
	/** Initial image index (for carousel) */
	initialIndex?: number
	/** Show thumbnails (carousel only) */
	showThumbnails?: boolean
	/** Show captions */
	showCaptions?: boolean
	/** Auto-play interval in ms (carousel only, 0 to disable) */
	autoPlay?: number
	/** Grid columns (grid/masonry only) */
	columns?: number
	/** Gap between images */
	gap?: number
	/** Enable lightbox on click */
	lightbox?: boolean
	/** Custom className */
	className?: string
	/** Callback when image is clicked */
	onImageClick?: (image: GalleryImage, index: number) => void
	/** Callback when current index changes (carousel only) */
	onIndexChange?: (index: number) => void
	/** Show navigation arrows */
	showArrows?: boolean
	/** Show indicators/dots */
	showIndicators?: boolean
	/** Enable infinite loop */
	infinite?: boolean
}

export function ImageGallery({
	images,
	variant = 'carousel',
	size = 'md',
	initialIndex = 0,
	showThumbnails = false,
	showCaptions = true,
	autoPlay = 0,
	columns = 3,
	gap = 16,
	lightbox = true,
	className = '',
	onImageClick,
	onIndexChange,
	showArrows = true,
	showIndicators = true,
	infinite = true
}: ImageGalleryProps) {
	const [currentIndex, setCurrentIndex] = useState(initialIndex)
	const [lightboxOpen, setLightboxOpen] = useState(false)
	const [lightboxIndex, setLightboxIndex] = useState(0)
	const [isTransitioning, setIsTransitioning] = useState(false)
	const autoPlayTimerRef = useRef<NodeJS.Timeout>()

	const handlePrevious = useCallback(() => {
		if (isTransitioning) return
		setIsTransitioning(true)
		setCurrentIndex((prev) => {
			const newIndex = prev === 0 ? (infinite ? images.length - 1 : 0) : prev - 1
			onIndexChange?.(newIndex)
			return newIndex
		})
		setTimeout(() => setIsTransitioning(false), 300)
	}, [images.length, infinite, onIndexChange, isTransitioning])

	const handleNext = useCallback(() => {
		if (isTransitioning) return
		setIsTransitioning(true)
		setCurrentIndex((prev) => {
			const newIndex = prev === images.length - 1 ? (infinite ? 0 : images.length - 1) : prev + 1
			onIndexChange?.(newIndex)
			return newIndex
		})
		setTimeout(() => setIsTransitioning(false), 300)
	}, [images.length, infinite, onIndexChange, isTransitioning])

	const handleImageClick = (image: GalleryImage, index: number) => {
		onImageClick?.(image, index)
		if (lightbox) {
			setLightboxIndex(index)
			setLightboxOpen(true)
		}
	}

	const handleThumbnailClick = (index: number) => {
		setCurrentIndex(index)
		onIndexChange?.(index)
	}

	const closeLightbox = () => {
		setLightboxOpen(false)
	}

	const handleLightboxPrevious = () => {
		setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
	}

	const handleLightboxNext = () => {
		setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
	}

	// Auto-play functionality
	useEffect(() => {
		if (variant === 'carousel' && autoPlay > 0) {
			autoPlayTimerRef.current = setInterval(() => {
				handleNext()
			}, autoPlay)

			return () => {
				if (autoPlayTimerRef.current) {
					clearInterval(autoPlayTimerRef.current)
				}
			}
		}
	}, [variant, autoPlay, handleNext])

	// Keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (lightboxOpen) {
				if (e.key === 'Escape') closeLightbox()
				if (e.key === 'ArrowLeft') handleLightboxPrevious()
				if (e.key === 'ArrowRight') handleLightboxNext()
			} else if (variant === 'carousel') {
				if (e.key === 'ArrowLeft') handlePrevious()
				if (e.key === 'ArrowRight') handleNext()
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [lightboxOpen, variant, handlePrevious, handleNext])

	const renderCarousel = () => (
		<div className={styles.carouselContainer}>
			<div className={styles.carouselMain}>
				<div
					className={styles.carouselTrack}
					style={{
						transform: `translateX(-${currentIndex * 100}%)`
					}}
				>
					{images.map((image, index) => (
						<div
							key={image.id}
							className={styles.carouselSlide}
							onClick={() => handleImageClick(image, index)}
						>
							<img src={image.src} alt={image.alt} className={styles.carouselImage} />
							{showCaptions && image.caption && (
								<div className={styles.caption}>{image.caption}</div>
							)}
						</div>
					))}
				</div>

				{showArrows && (
					<>
						<button
							className={`${styles.arrow} ${styles.arrowLeft}`}
							onClick={handlePrevious}
							aria-label="Previous image"
							disabled={!infinite && currentIndex === 0}
						>
							‹
						</button>
						<button
							className={`${styles.arrow} ${styles.arrowRight}`}
							onClick={handleNext}
							aria-label="Next image"
							disabled={!infinite && currentIndex === images.length - 1}
						>
							›
						</button>
					</>
				)}
			</div>

			{showIndicators && (
				<div className={styles.indicators}>
					{images.map((_, index) => (
						<button
							key={index}
							className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
							onClick={() => {
								setCurrentIndex(index)
								onIndexChange?.(index)
							}}
							aria-label={`Go to image ${index + 1}`}
						/>
					))}
				</div>
			)}

			{showThumbnails && (
				<div className={styles.thumbnails}>
					{images.map((image, index) => (
						<button
							key={image.id}
							className={`${styles.thumbnail} ${index === currentIndex ? styles.active : ''}`}
							onClick={() => handleThumbnailClick(index)}
							aria-label={`Select image ${index + 1}`}
						>
							<img src={image.thumbnail || image.src} alt={image.alt} />
						</button>
					))}
				</div>
			)}
		</div>
	)

	const renderGrid = () => (
		<div
			className={styles.grid}
			style={{
				gridTemplateColumns: `repeat(${columns}, 1fr)`,
				gap: `${gap}px`
			}}
		>
			{images.map((image, index) => (
				<div
					key={image.id}
					className={styles.gridItem}
					onClick={() => handleImageClick(image, index)}
				>
					<img src={image.thumbnail || image.src} alt={image.alt} />
					{showCaptions && (image.caption || image.title) && (
						<div className={styles.gridOverlay}>
							{image.title && <div className={styles.gridTitle}>{image.title}</div>}
							{image.caption && <div className={styles.gridCaption}>{image.caption}</div>}
						</div>
					)}
				</div>
			))}
		</div>
	)

	const renderMasonry = () => (
		<div
			className={styles.masonry}
			style={{
				columnCount: columns,
				columnGap: `${gap}px`
			}}
		>
			{images.map((image, index) => (
				<div
					key={image.id}
					className={styles.masonryItem}
					style={{ marginBottom: `${gap}px` }}
					onClick={() => handleImageClick(image, index)}
				>
					<img src={image.thumbnail || image.src} alt={image.alt} />
					{showCaptions && (image.caption || image.title) && (
						<div className={styles.masonryOverlay}>
							{image.title && <div className={styles.masonryTitle}>{image.title}</div>}
							{image.caption && <div className={styles.masonryCaption}>{image.caption}</div>}
						</div>
					)}
				</div>
			))}
		</div>
	)

	const renderLightbox = () => {
		if (!lightboxOpen) return null

		const currentImage = images[lightboxIndex]

		return (
			<div className={styles.lightbox} onClick={closeLightbox}>
				<button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close lightbox">
					×
				</button>

				<button
					className={`${styles.lightboxArrow} ${styles.lightboxArrowLeft}`}
					onClick={(e) => {
						e.stopPropagation()
						handleLightboxPrevious()
					}}
					aria-label="Previous image"
				>
					‹
				</button>

				<div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
					<img src={currentImage.src} alt={currentImage.alt} />
					{(currentImage.caption || currentImage.title) && (
						<div className={styles.lightboxCaption}>
							{currentImage.title && <div className={styles.lightboxTitle}>{currentImage.title}</div>}
							{currentImage.caption && <div>{currentImage.caption}</div>}
						</div>
					)}
				</div>

				<button
					className={`${styles.lightboxArrow} ${styles.lightboxArrowRight}`}
					onClick={(e) => {
						e.stopPropagation()
						handleLightboxNext()
					}}
					aria-label="Next image"
				>
					›
				</button>

				<div className={styles.lightboxCounter}>
					{lightboxIndex + 1} / {images.length}
				</div>
			</div>
		)
	}

	return (
		<div className={`${styles.imageGallery} ${styles[variant]} ${styles[size]} ${className}`}>
			{variant === 'carousel' && renderCarousel()}
			{variant === 'grid' && renderGrid()}
			{variant === 'masonry' && renderMasonry()}
			{renderLightbox()}
		</div>
	)
}
