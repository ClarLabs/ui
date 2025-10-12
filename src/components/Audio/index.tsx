import React, { forwardRef } from 'react'
import styles from './styles.module.scss'

export type AudioVariant = 'minimal' | 'standard' | 'detailed'

export interface AudioProps extends Omit<React.AudioHTMLAttributes<HTMLAudioElement>, 'className'> {
	/** Audio source URL */
	src: string
	/** Alternative sources for different formats */
	sources?: { src: string; type: string }[]
	/** Title/name of the audio track */
	title?: string
	/** Artist or creator name */
	artist?: string
	/** Album or collection name */
	album?: string
	/** Cover art/thumbnail URL */
	coverArt?: string
	/** Variant style of the player */
	variant?: AudioVariant
	/** Whether to show native controls */
	controls?: boolean
	/** Whether to autoplay the audio */
	autoPlay?: boolean
	/** Whether to loop the audio */
	loop?: boolean
	/** Whether to mute the audio */
	muted?: boolean
	/** Whether to preload the audio */
	preload?: 'none' | 'metadata' | 'auto'
	/** Custom className for the container */
	className?: string
	/** Error callback */
	onError?: (error: React.SyntheticEvent<HTMLAudioElement>) => void
	/** Play callback */
	onPlay?: () => void
	/** Pause callback */
	onPause?: () => void
	/** Ended callback */
	onEnded?: () => void
}

export const Audio = forwardRef<HTMLAudioElement, AudioProps>(
	(
		{
			src,
			sources,
			title,
			artist,
			album,
			coverArt,
			variant = 'standard',
			controls = true,
			autoPlay = false,
			loop = false,
			muted = false,
			preload = 'metadata',
			className = '',
			onError,
			onPlay,
			onPause,
			onEnded,
			...props
		},
		ref
	) => {
		const containerClasses = [styles.audioContainer, styles[`variant-${variant}`], className].filter(Boolean).join(' ')

		const hasMetadata = title || artist || album || coverArt

		return (
			<div className={containerClasses}>
				{hasMetadata && variant !== 'minimal' && (
					<div className={styles.metadata}>
						{coverArt && (
							<div className={styles.coverArt}>
								<img src={coverArt} alt={title || 'Cover art'} />
							</div>
						)}
						<div className={styles.info}>
							{title && <div className={styles.title}>{title}</div>}
							{artist && <div className={styles.artist}>{artist}</div>}
							{album && variant === 'detailed' && <div className={styles.album}>{album}</div>}
						</div>
					</div>
				)}

				<audio
					ref={ref}
					className={styles.audio}
					controls={controls}
					autoPlay={autoPlay}
					loop={loop}
					muted={muted}
					preload={preload}
					onError={onError}
					onPlay={onPlay}
					onPause={onPause}
					onEnded={onEnded}
					{...props}
				>
					{sources && sources.length > 0 ? (
						sources.map((source, index) => <source key={index} src={source.src} type={source.type} />)
					) : (
						<source src={src} />
					)}
					Your browser does not support the audio tag.
				</audio>
			</div>
		)
	}
)

Audio.displayName = 'Audio'
