import React from 'react'
import styles from './styles.module.scss'

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded'
export type SkeletonAnimation = 'pulse' | 'wave' | 'none'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Variant of the skeleton */
	variant?: SkeletonVariant
	/** Width of the skeleton */
	width?: string | number
	/** Height of the skeleton */
	height?: string | number
	/** Animation type */
	animation?: SkeletonAnimation
	/** Custom className */
	className?: string
	/** Number of lines (for text variant) */
	lines?: number
}

export function Skeleton({
	variant = 'text',
	width,
	height,
	animation = 'pulse',
	className = '',
	lines = 1,
	...props
}: SkeletonProps) {
	const getStyles = (): React.CSSProperties => {
		const customStyles: React.CSSProperties = {}

		if (width !== undefined) {
			customStyles.width = typeof width === 'number' ? `${width}px` : width
		}

		if (height !== undefined) {
			customStyles.height = typeof height === 'number' ? `${height}px` : height
		}

		return customStyles
	}

	const classes = [
		styles.skeleton,
		styles[`variant-${variant}`],
		animation !== 'none' && styles[`animation-${animation}`],
		className
	]
		.filter(Boolean)
		.join(' ')

	// For text variant with multiple lines
	if (variant === 'text' && lines > 1) {
		return (
			<div className={styles.textGroup} {...props}>
				{Array.from({ length: lines }, (_, i) => (
					<div
						key={i}
						className={classes}
						style={{
							...getStyles(),
							...(i === lines - 1 && { width: width || '80%' }) // Last line is shorter
						}}
					/>
				))}
			</div>
		)
	}

	return <div className={classes} style={getStyles()} {...props} />
}

// Convenience components for common skeleton patterns
export function SkeletonText({ lines = 3, ...props }: Omit<SkeletonProps, 'variant'>) {
	return <Skeleton variant="text" lines={lines} {...props} />
}

export function SkeletonCircle({ size = 40, ...props }: Omit<SkeletonProps, 'variant' | 'width' | 'height'> & { size?: number }) {
	return <Skeleton variant="circular" width={size} height={size} {...props} />
}

export function SkeletonRectangle({ width = '100%', height = 200, ...props }: Omit<SkeletonProps, 'variant'>) {
	return <Skeleton variant="rectangular" width={width} height={height} {...props} />
}

// Attach convenience components
Skeleton.Text = SkeletonText
Skeleton.Circle = SkeletonCircle
Skeleton.Rectangle = SkeletonRectangle
