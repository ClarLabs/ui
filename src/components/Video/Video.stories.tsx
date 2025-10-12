import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Video } from './index'

const meta = {
	title: 'Components/Video',
	component: Video,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs'],
	argTypes: {
		aspectRatio: {
			control: 'select',
			options: ['16:9', '4:3', '1:1', '21:9', 'auto']
		},
		controls: {
			control: 'boolean'
		},
		autoPlay: {
			control: 'boolean'
		},
		loop: {
			control: 'boolean'
		},
		muted: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof Video>

export default meta
type Story = StoryObj<typeof meta>

// Sample video URLs (using Big Buck Bunny from Blender Foundation - public domain)
const sampleVideoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
const samplePosterUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'

export const Default: Story = {
	args: {
		src: sampleVideoUrl,
		poster: samplePosterUrl,
		controls: true
	}
}

export const WithPoster: Story = {
	args: {
		src: sampleVideoUrl,
		poster: samplePosterUrl,
		controls: true
	}
}

export const WithoutControls: Story = {
	args: {
		src: sampleVideoUrl,
		poster: samplePosterUrl,
		controls: false
	}
}

export const AutoPlay: Story = {
	args: {
		src: sampleVideoUrl,
		autoPlay: true,
		muted: true, // Browsers require muted for autoplay
		loop: true,
		controls: true
	}
}

export const Looping: Story = {
	args: {
		src: sampleVideoUrl,
		poster: samplePosterUrl,
		loop: true,
		controls: true
	}
}

export const Muted: Story = {
	args: {
		src: sampleVideoUrl,
		poster: samplePosterUrl,
		muted: true,
		controls: true
	}
}

export const AspectRatio16By9: Story = {
	args: {
		src: sampleVideoUrl,
		poster: samplePosterUrl,
		aspectRatio: '16:9',
		controls: true
	}
}

export const AspectRatio4By3: Story = {
	args: {
		src: sampleVideoUrl,
		poster: samplePosterUrl,
		aspectRatio: '4:3',
		controls: true
	}
}

export const AspectRatio1By1: Story = {
	args: {
		src: sampleVideoUrl,
		poster: samplePosterUrl,
		aspectRatio: '1:1',
		controls: true
	}
}

export const AspectRatio21By9: Story = {
	args: {
		src: sampleVideoUrl,
		poster: samplePosterUrl,
		aspectRatio: '21:9',
		controls: true
	}
}

export const CustomWidth: Story = {
	args: {
		src: sampleVideoUrl,
		poster: samplePosterUrl,
		width: 400,
		controls: true
	}
}

export const CustomHeight: Story = {
	args: {
		src: sampleVideoUrl,
		poster: samplePosterUrl,
		height: 300,
		aspectRatio: 'auto',
		controls: true
	}
}

export const MultipleSources: Story = {
	args: {
		src: sampleVideoUrl,
		sources: [
			{ src: sampleVideoUrl, type: 'video/mp4' },
			{ src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.webm', type: 'video/webm' }
		],
		poster: samplePosterUrl,
		controls: true
	}
}

export const VideoGrid: Story = {
	render: () => (
		<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
			<Video src={sampleVideoUrl} poster={samplePosterUrl} controls />
			<Video src={sampleVideoUrl} poster={samplePosterUrl} controls />
			<Video src={sampleVideoUrl} poster={samplePosterUrl} controls />
			<Video src={sampleVideoUrl} poster={samplePosterUrl} controls />
		</div>
	)
}

export const ResponsiveVideo: Story = {
	render: () => (
		<div style={{ maxWidth: '800px', margin: '0 auto' }}>
			<Video src={sampleVideoUrl} poster={samplePosterUrl} controls aspectRatio="16:9" />
		</div>
	)
}

export const VideoInCard: Story = {
	render: () => (
		<div
			style={{
				maxWidth: '600px',
				background: 'rgba(255, 255, 255, 0.05)',
				backdropFilter: 'blur(10px)',
				border: '1px solid rgba(255, 255, 255, 0.2)',
				borderRadius: '0.5rem',
				overflow: 'hidden'
			}}
		>
			<Video src={sampleVideoUrl} poster={samplePosterUrl} controls aspectRatio="16:9" />
			<div style={{ padding: '1.5rem' }}>
				<h3 style={{ color: '#c7d2fe', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
					Big Buck Bunny
				</h3>
				<p style={{ color: '#e0e0e0', lineHeight: '1.6', marginBottom: '1rem' }}>
					Big Buck Bunny is a short computer-animated comedy film by the Blender Institute, featuring a large rabbit named
					Big Buck Bunny.
				</p>
				<div style={{ display: 'flex', gap: '0.5rem' }}>
					<span
						style={{
							padding: '0.25rem 0.75rem',
							background: 'rgba(99, 102, 241, 0.2)',
							border: '1px solid rgba(99, 102, 241, 0.5)',
							borderRadius: '0.25rem',
							fontSize: '0.875rem',
							color: '#c7d2fe'
						}}
					>
						Animation
					</span>
					<span
						style={{
							padding: '0.25rem 0.75rem',
							background: 'rgba(99, 102, 241, 0.2)',
							border: '1px solid rgba(99, 102, 241, 0.5)',
							borderRadius: '0.25rem',
							fontSize: '0.875rem',
							color: '#c7d2fe'
						}}
					>
						Short Film
					</span>
				</div>
			</div>
		</div>
	)
}

export const VideoGallery: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
			<div>
				<h2 style={{ color: '#c7d2fe', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Featured Video</h2>
				<Video src={sampleVideoUrl} poster={samplePosterUrl} controls aspectRatio="21:9" />
			</div>

			<div>
				<h3 style={{ color: '#e0e0e0', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>More Videos</h3>
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
					{Array.from({ length: 4 }, (_, i) => (
						<div key={i}>
							<Video src={sampleVideoUrl} poster={samplePosterUrl} controls aspectRatio="16:9" />
							<p style={{ color: '#e0e0e0', marginTop: '0.5rem', fontSize: '0.875rem' }}>Video Title {i + 1}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export const BackgroundVideo: Story = {
	render: () => (
		<div style={{ position: 'relative', height: '400px', borderRadius: '0.5rem', overflow: 'hidden' }}>
			<Video
				src={sampleVideoUrl}
				autoPlay
				loop
				muted
				playsInline
				controls={false}
				aspectRatio="auto"
				style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
			/>
			<div
				style={{
					position: 'relative',
					zIndex: 1,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100%',
					background: 'rgba(0, 0, 0, 0.4)',
					backdropFilter: 'blur(2px)'
				}}
			>
				<h1 style={{ color: '#ffffff', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>
					Welcome to Our Platform
				</h1>
				<p style={{ color: '#e0e0e0', fontSize: '1.125rem', marginBottom: '2rem', textAlign: 'center', maxWidth: '600px' }}>
					Experience amazing content with our video platform
				</p>
				<button
					style={{
						padding: '0.75rem 2rem',
						background: 'rgba(99, 102, 241, 0.8)',
						border: '2px solid rgba(99, 102, 241, 1)',
						borderRadius: '0.5rem',
						color: '#ffffff',
						fontSize: '1rem',
						fontWeight: 'bold',
						cursor: 'pointer'
					}}
				>
					Get Started
				</button>
			</div>
		</div>
	)
}

export const WithErrorHandling: Story = {
	render: () => {
		const [error, setError] = React.useState<string | null>(null)

		return (
			<div>
				<Video
					src="https://invalid-url.example.com/video.mp4"
					poster={samplePosterUrl}
					controls
					onError={() => setError('Failed to load video')}
				/>
				{error && (
					<div
						style={{
							marginTop: '1rem',
							padding: '1rem',
							background: 'rgba(239, 68, 68, 0.1)',
							border: '1px solid rgba(239, 68, 68, 0.3)',
							borderRadius: '0.5rem',
							color: '#fca5a5'
						}}
					>
						{error}
					</div>
				)}
			</div>
		)
	}
}

export const CompareAspectRatios: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '0.5rem' }}>16:9 (Standard Widescreen)</h3>
				<Video src={sampleVideoUrl} poster={samplePosterUrl} controls aspectRatio="16:9" />
			</div>
			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '0.5rem' }}>4:3 (Classic TV)</h3>
				<Video src={sampleVideoUrl} poster={samplePosterUrl} controls aspectRatio="4:3" />
			</div>
			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '0.5rem' }}>1:1 (Square)</h3>
				<Video src={sampleVideoUrl} poster={samplePosterUrl} controls aspectRatio="1:1" />
			</div>
			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '0.5rem' }}>21:9 (Ultrawide)</h3>
				<Video src={sampleVideoUrl} poster={samplePosterUrl} controls aspectRatio="21:9" />
			</div>
		</div>
	)
}
