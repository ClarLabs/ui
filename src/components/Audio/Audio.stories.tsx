import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Audio } from './index'

const meta = {
	title: 'Components/Audio',
	component: Audio,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['minimal', 'standard', 'detailed']
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
		},
		preload: {
			control: 'select',
			options: ['none', 'metadata', 'auto']
		}
	}
} satisfies Meta<typeof Audio>

export default meta
type Story = StoryObj<typeof meta>

// Sample audio URL (using a public domain audio file)
const sampleAudioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
const sampleCoverArt = 'https://via.placeholder.com/150/6366f1/ffffff?text=Album'

export const Default: Story = {
	args: {
		src: sampleAudioUrl,
		controls: true
	}
}

export const Minimal: Story = {
	args: {
		src: sampleAudioUrl,
		variant: 'minimal',
		controls: true
	}
}

export const Standard: Story = {
	args: {
		src: sampleAudioUrl,
		variant: 'standard',
		controls: true
	}
}

export const Detailed: Story = {
	args: {
		src: sampleAudioUrl,
		variant: 'detailed',
		controls: true
	}
}

export const WithTitle: Story = {
	args: {
		src: sampleAudioUrl,
		title: 'Sample Audio Track',
		controls: true
	}
}

export const WithMetadata: Story = {
	args: {
		src: sampleAudioUrl,
		title: 'Symphony No. 5',
		artist: 'Ludwig van Beethoven',
		controls: true
	}
}

export const WithFullMetadata: Story = {
	args: {
		src: sampleAudioUrl,
		title: 'Moonlight Sonata',
		artist: 'Ludwig van Beethoven',
		album: 'Piano Sonatas',
		variant: 'detailed',
		controls: true
	}
}

export const WithCoverArt: Story = {
	args: {
		src: sampleAudioUrl,
		title: 'Electronic Dreams',
		artist: 'Sound Designer',
		coverArt: sampleCoverArt,
		controls: true
	}
}

export const FullyFeatured: Story = {
	args: {
		src: sampleAudioUrl,
		title: 'Beautiful Melody',
		artist: 'The Composers',
		album: 'Greatest Hits',
		coverArt: sampleCoverArt,
		variant: 'detailed',
		controls: true
	}
}

export const WithoutControls: Story = {
	args: {
		src: sampleAudioUrl,
		title: 'Background Music',
		artist: 'Ambient Sounds',
		coverArt: sampleCoverArt,
		controls: false
	}
}

export const Looping: Story = {
	args: {
		src: sampleAudioUrl,
		title: 'Looping Track',
		artist: 'DJ Loop',
		coverArt: sampleCoverArt,
		loop: true,
		controls: true
	}
}

export const AutoPlay: Story = {
	args: {
		src: sampleAudioUrl,
		title: 'Auto-playing Track',
		artist: 'Auto Player',
		autoPlay: true,
		muted: true, // Browsers require muted for autoplay
		controls: true
	}
}

export const MultipleSources: Story = {
	args: {
		src: sampleAudioUrl,
		sources: [
			{ src: sampleAudioUrl, type: 'audio/mpeg' },
			{ src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.ogg', type: 'audio/ogg' }
		],
		title: 'Multi-format Audio',
		artist: 'Format Master',
		coverArt: sampleCoverArt,
		controls: true
	}
}

export const Playlist: Story = {
	render: () => {
		const tracks = [
			{
				title: 'Symphony No. 5',
				artist: 'Ludwig van Beethoven',
				album: 'Classical Masterpieces',
				coverArt: 'https://via.placeholder.com/150/6366f1/ffffff?text=Track+1'
			},
			{
				title: 'Moonlight Sonata',
				artist: 'Ludwig van Beethoven',
				album: 'Piano Sonatas',
				coverArt: 'https://via.placeholder.com/150/10b981/ffffff?text=Track+2'
			},
			{
				title: 'Für Elise',
				artist: 'Ludwig van Beethoven',
				album: 'Piano Works',
				coverArt: 'https://via.placeholder.com/150/f59e0b/ffffff?text=Track+3'
			},
			{
				title: 'Turkish March',
				artist: 'Ludwig van Beethoven',
				album: 'Popular Works',
				coverArt: 'https://via.placeholder.com/150/ef4444/ffffff?text=Track+4'
			}
		]

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
				{tracks.map((track, index) => (
					<Audio
						key={index}
						src={sampleAudioUrl}
						title={track.title}
						artist={track.artist}
						album={track.album}
						coverArt={track.coverArt}
						variant="standard"
						controls
					/>
				))}
			</div>
		)
	}
}

export const CompactPlaylist: Story = {
	render: () => {
		const tracks = [
			{ title: 'Track One', artist: 'Artist A' },
			{ title: 'Track Two', artist: 'Artist B' },
			{ title: 'Track Three', artist: 'Artist C' },
			{ title: 'Track Four', artist: 'Artist D' }
		]

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '600px' }}>
				{tracks.map((track, index) => (
					<Audio
						key={index}
						src={sampleAudioUrl}
						title={track.title}
						artist={track.artist}
						variant="minimal"
						controls
					/>
				))}
			</div>
		)
	}
}

export const AudioInCard: Story = {
	render: () => (
		<div
			style={{
				maxWidth: '600px',
				background: 'rgba(255, 255, 255, 0.05)',
				backdropFilter: 'blur(10px)',
				border: '1px solid rgba(255, 255, 255, 0.2)',
				borderRadius: '0.5rem',
				padding: '1.5rem'
			}}
		>
			<h3 style={{ color: '#c7d2fe', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
				Now Playing
			</h3>
			<Audio
				src={sampleAudioUrl}
				title="Beautiful Symphony"
				artist="Orchestra Ensemble"
				album="Classical Collection"
				coverArt={sampleCoverArt}
				variant="detailed"
				controls
			/>
			<div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
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
					Classical
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
					Instrumental
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
					Orchestra
				</span>
			</div>
		</div>
	)
}

export const PodcastEpisode: Story = {
	render: () => (
		<div
			style={{
				maxWidth: '700px',
				background: 'rgba(255, 255, 255, 0.05)',
				backdropFilter: 'blur(10px)',
				border: '1px solid rgba(255, 255, 255, 0.2)',
				borderRadius: '0.5rem',
				overflow: 'hidden'
			}}
		>
			<div
				style={{
					background: 'rgba(99, 102, 241, 0.1)',
					padding: '1.5rem',
					borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
				}}
			>
				<h2 style={{ color: '#c7d2fe', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
					Episode 42: The Future of Design
				</h2>
				<p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1rem' }}>
					Published on October 12, 2025 · 45 minutes
				</p>
				<p style={{ color: '#e0e0e0', lineHeight: '1.6' }}>
					In this episode, we discuss the latest trends in design systems, component libraries, and the future of web
					development. Join us as we explore best practices and innovative approaches.
				</p>
			</div>
			<div style={{ padding: '1rem' }}>
				<Audio
					src={sampleAudioUrl}
					title="Episode 42: The Future of Design"
					artist="Design Podcast"
					album="Season 3"
					coverArt="https://via.placeholder.com/150/8b5cf6/ffffff?text=Podcast"
					variant="standard"
					controls
				/>
			</div>
		</div>
	)
}

export const WithCallbacks: Story = {
	render: () => {
		const [status, setStatus] = React.useState<string>('Ready to play')

		return (
			<div style={{ maxWidth: '600px' }}>
				<Audio
					src={sampleAudioUrl}
					title="Interactive Audio"
					artist="Callback Demo"
					coverArt={sampleCoverArt}
					controls
					onPlay={() => setStatus('Playing...')}
					onPause={() => setStatus('Paused')}
					onEnded={() => setStatus('Finished')}
					onError={() => setStatus('Error loading audio')}
				/>
				<div
					style={{
						marginTop: '1rem',
						padding: '1rem',
						background: 'rgba(99, 102, 241, 0.1)',
						border: '1px solid rgba(99, 102, 241, 0.3)',
						borderRadius: '0.5rem',
						color: '#c7d2fe',
						textAlign: 'center',
						fontWeight: 'bold'
					}}
				>
					Status: {status}
				</div>
			</div>
		)
	}
}

export const CompareVariants: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '600px' }}>
			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '0.75rem' }}>Minimal Variant</h3>
				<Audio
					src={sampleAudioUrl}
					title="Minimal Player"
					artist="Artist Name"
					coverArt={sampleCoverArt}
					variant="minimal"
					controls
				/>
			</div>
			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '0.75rem' }}>Standard Variant</h3>
				<Audio
					src={sampleAudioUrl}
					title="Standard Player"
					artist="Artist Name"
					coverArt={sampleCoverArt}
					variant="standard"
					controls
				/>
			</div>
			<div>
				<h3 style={{ color: '#e0e0e0', marginBottom: '0.75rem' }}>Detailed Variant</h3>
				<Audio
					src={sampleAudioUrl}
					title="Detailed Player"
					artist="Artist Name"
					album="Album Name"
					coverArt={sampleCoverArt}
					variant="detailed"
					controls
				/>
			</div>
		</div>
	)
}

export const ResponsivePlaylist: Story = {
	render: () => (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
				gap: '1rem'
			}}
		>
			{Array.from({ length: 6 }, (_, i) => (
				<Audio
					key={i}
					src={sampleAudioUrl}
					title={`Track ${i + 1}`}
					artist={`Artist ${String.fromCharCode(65 + i)}`}
					coverArt={`https://via.placeholder.com/150/${['6366f1', '10b981', 'f59e0b', 'ef4444', '8b5cf6', 'ec4899'][i]}/ffffff?text=Track+${i + 1}`}
					variant="standard"
					controls
				/>
			))}
		</div>
	)
}
