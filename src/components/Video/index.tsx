import React, { forwardRef } from 'react'
import styles from './styles.module.scss'

export type VideoAspectRatio = '16:9' | '4:3' | '1:1' | '21:9' | 'auto'

export interface VideoProps extends Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'className'> {
	/** Video source URL */
	src: string
	/** Alternative sources for different formats */
	sources?: { src: string; type: string }[]
	/** Poster image URL */
	poster?: string
	/** Aspect ratio of the video */
	aspectRatio?: VideoAspectRatio
	/** Whether to show native controls */
	controls?: boolean
	/** Whether to autoplay the video */
	autoPlay?: boolean
	/** Whether to loop the video */
	loop?: boolean
	/** Whether to mute the video */
	muted?: boolean
	/** Whether to play inline on mobile */
	playsInline?: boolean
	/** Width of the video container */
	width?: string | number
	/** Height of the video container */
	height?: string | number
	/** Custom className for the container */
	className?: string
	/** Loading state placeholder */
	loading?: 'lazy' | 'eager'
	/** Error message to display if video fails to load */
	onError?: (error: React.SyntheticEvent<HTMLVideoElement>) => void
}

export const Video = forwardRef<HTMLVideoElement, VideoProps>(
	(
		{
			src,
			sources,
			poster,
			aspectRatio = '16:9',
			controls = true,
			autoPlay = false,
			loop = false,
			muted = false,
			playsInline = true,
			width,
			height,
			className = '',
			loading = 'lazy',
			onError,
			...props
		},
		ref
	) => {
		const containerStyle: React.CSSProperties = {}
		if (width) containerStyle.width = typeof width === 'number' ? `${width}px` : width
		if (height) containerStyle.height = typeof height === 'number' ? `${height}px` : height

		const containerClasses = [
			styles.videoContainer,
			aspectRatio !== 'auto' && styles[`aspect-${aspectRatio.replace(':', '-')}`],
			className
		]
			.filter(Boolean)
			.join(' ')

		return (
			<div className={containerClasses} style={containerStyle}>
				<video
					ref={ref}
					className={styles.video}
					controls={controls}
					autoPlay={autoPlay}
					loop={loop}
					muted={muted}
					playsInline={playsInline}
					poster={poster}
					onError={onError}
					{...props}
				>
					{sources && sources.length > 0 ? (
						sources.map((source, index) => <source key={index} src={source.src} type={source.type} />)
					) : (
						<source src={src} />
					)}
					Your browser does not support the video tag.
				</video>
			</div>
		)
	}
)

Video.displayName = 'Video'
