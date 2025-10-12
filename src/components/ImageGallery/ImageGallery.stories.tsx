import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { ImageGallery } from './index'
import type { GalleryImage } from './index'

const meta = {
	title: 'Components/ImageGallery',
	component: ImageGallery,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['carousel', 'grid', 'masonry']
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg']
		},
		lightbox: {
			control: 'boolean'
		},
		showCaptions: {
			control: 'boolean'
		},
		showThumbnails: {
			control: 'boolean'
		},
		showArrows: {
			control: 'boolean'
		},
		showIndicators: {
			control: 'boolean'
		},
		infinite: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof ImageGallery>

export default meta
type Story = StoryObj<typeof meta>

// Sample images using placeholder service
const sampleImages: GalleryImage[] = [
	{
		id: '1',
		src: 'https://picsum.photos/800/600?random=1',
		alt: 'Landscape 1',
		caption: 'Beautiful mountain landscape at sunset',
		title: 'Mountain Vista'
	},
	{
		id: '2',
		src: 'https://picsum.photos/800/600?random=2',
		alt: 'Landscape 2',
		caption: 'Serene ocean view with crystal clear water',
		title: 'Ocean Paradise'
	},
	{
		id: '3',
		src: 'https://picsum.photos/800/600?random=3',
		alt: 'Landscape 3',
		caption: 'Dense forest with morning mist',
		title: 'Misty Forest'
	},
	{
		id: '4',
		src: 'https://picsum.photos/800/600?random=4',
		alt: 'Landscape 4',
		caption: 'Desert sand dunes at golden hour',
		title: 'Desert Dunes'
	},
	{
		id: '5',
		src: 'https://picsum.photos/800/600?random=5',
		alt: 'Landscape 5',
		caption: 'Snow-covered peaks in winter',
		title: 'Winter Peaks'
	}
]

const masonryImages: GalleryImage[] = [
	{
		id: '1',
		src: 'https://picsum.photos/400/600?random=10',
		alt: 'Portrait 1',
		title: 'Tall Image',
		caption: 'Portrait orientation'
	},
	{
		id: '2',
		src: 'https://picsum.photos/600/400?random=11',
		alt: 'Landscape 1',
		title: 'Wide Image',
		caption: 'Landscape orientation'
	},
	{
		id: '3',
		src: 'https://picsum.photos/400/500?random=12',
		alt: 'Square 1',
		title: 'Square Image'
	},
	{
		id: '4',
		src: 'https://picsum.photos/500/700?random=13',
		alt: 'Portrait 2',
		caption: 'Another tall image'
	},
	{
		id: '5',
		src: 'https://picsum.photos/600/400?random=14',
		alt: 'Landscape 2',
		title: 'Wide View'
	},
	{
		id: '6',
		src: 'https://picsum.photos/400/600?random=15',
		alt: 'Portrait 3',
		caption: 'Vertical shot'
	},
	{
		id: '7',
		src: 'https://picsum.photos/500/500?random=16',
		alt: 'Square 2',
		title: 'Perfect Square'
	},
	{
		id: '8',
		src: 'https://picsum.photos/600/450?random=17',
		alt: 'Landscape 3',
		caption: 'Panoramic view'
	}
]

export const CarouselDefault: Story = {
	args: {
		images: sampleImages,
		variant: 'carousel'
	}
}

export const CarouselWithThumbnails: Story = {
	args: {
		images: sampleImages,
		variant: 'carousel',
		showThumbnails: true
	}
}

export const CarouselAutoPlay: Story = {
	args: {
		images: sampleImages,
		variant: 'carousel',
		autoPlay: 3000,
		showIndicators: true
	}
}

export const CarouselSmall: Story = {
	args: {
		images: sampleImages,
		variant: 'carousel',
		size: 'sm'
	}
}

export const CarouselLarge: Story = {
	args: {
		images: sampleImages,
		variant: 'carousel',
		size: 'lg',
		showThumbnails: true
	}
}

export const CarouselNoInfinite: Story = {
	args: {
		images: sampleImages,
		variant: 'carousel',
		infinite: false
	}
}

export const GridDefault: Story = {
	args: {
		images: sampleImages,
		variant: 'grid',
		columns: 3
	}
}

export const GridTwoColumns: Story = {
	args: {
		images: sampleImages,
		variant: 'grid',
		columns: 2
	}
}

export const GridFourColumns: Story = {
	args: {
		images: sampleImages,
		variant: 'grid',
		columns: 4
	}
}

export const GridWithCustomGap: Story = {
	args: {
		images: sampleImages,
		variant: 'grid',
		columns: 3,
		gap: 32
	}
}

export const MasonryDefault: Story = {
	args: {
		images: masonryImages,
		variant: 'masonry',
		columns: 3
	}
}

export const MasonryTwoColumns: Story = {
	args: {
		images: masonryImages,
		variant: 'masonry',
		columns: 2
	}
}

export const MasonryFourColumns: Story = {
	args: {
		images: masonryImages,
		variant: 'masonry',
		columns: 4
	}
}

export const WithoutCaptions: Story = {
	args: {
		images: sampleImages,
		variant: 'carousel',
		showCaptions: false
	}
}

export const WithoutLightbox: Story = {
	args: {
		images: sampleImages,
		variant: 'grid',
		columns: 3,
		lightbox: false
	}
}

export const WithCallback: Story = {
	render: () => {
		const [currentIndex, setCurrentIndex] = useState(0)
		const [clickedImage, setClickedImage] = useState<string | null>(null)

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
				<div
					style={{
						padding: '1rem',
						background: 'rgba(99, 102, 241, 0.1)',
						border: '1px solid rgba(99, 102, 241, 0.3)',
						borderRadius: '0.5rem',
						color: '#c7d2fe',
						textAlign: 'center'
					}}
				>
					Current slide: {currentIndex + 1} / {sampleImages.length}
					{clickedImage && <div style={{ marginTop: '0.5rem' }}>Last clicked: {clickedImage}</div>}
				</div>
				<ImageGallery
					images={sampleImages}
					variant="carousel"
					onIndexChange={setCurrentIndex}
					onImageClick={(image) => setClickedImage(image.title || image.alt)}
				/>
			</div>
		)
	}
}

export const ProductGallery: Story = {
	render: () => {
		const productImages: GalleryImage[] = [
			{
				id: '1',
				src: 'https://picsum.photos/800/800?random=20',
				alt: 'Product main view',
				title: 'Main View',
				caption: 'High-quality wireless headphones'
			},
			{
				id: '2',
				src: 'https://picsum.photos/800/800?random=21',
				alt: 'Product side view',
				title: 'Side View',
				caption: 'Adjustable headband for comfort'
			},
			{
				id: '3',
				src: 'https://picsum.photos/800/800?random=22',
				alt: 'Product detail',
				title: 'Detail Shot',
				caption: 'Premium materials and finish'
			},
			{
				id: '4',
				src: 'https://picsum.photos/800/800?random=23',
				alt: 'Product in use',
				title: 'In Use',
				caption: 'Active noise cancellation'
			}
		]

		return (
			<div style={{ maxWidth: '800px', margin: '0 auto' }}>
				<ImageGallery
					images={productImages}
					variant="carousel"
					showThumbnails
					size="lg"
				/>
			</div>
		)
	}
}

export const PortfolioGallery: Story = {
	render: () => {
		const portfolioImages: GalleryImage[] = Array.from({ length: 12 }, (_, i) => ({
			id: `${i + 1}`,
			src: `https://picsum.photos/600/400?random=${30 + i}`,
			alt: `Portfolio image ${i + 1}`,
			title: `Project ${i + 1}`,
			caption: `Description for project ${i + 1}`
		}))

		return (
			<ImageGallery
				images={portfolioImages}
				variant="grid"
				columns={4}
				gap={16}
			/>
		)
	}
}

export const BlogGallery: Story = {
	render: () => {
		const blogImages: GalleryImage[] = [
			{
				id: '1',
				src: 'https://picsum.photos/700/500?random=40',
				alt: 'Blog image 1',
				title: 'Getting Started with React',
				caption: 'Learn the fundamentals of React development'
			},
			{
				id: '2',
				src: 'https://picsum.photos/600/800?random=41',
				alt: 'Blog image 2',
				title: 'Advanced TypeScript Patterns',
				caption: 'Deep dive into TypeScript best practices'
			},
			{
				id: '3',
				src: 'https://picsum.photos/800/600?random=42',
				alt: 'Blog image 3',
				title: 'Building Scalable Applications',
				caption: 'Architecture patterns for large projects'
			},
			{
				id: '4',
				src: 'https://picsum.photos/500/700?random=43',
				alt: 'Blog image 4',
				title: 'Performance Optimization',
				caption: 'Tips for faster React applications'
			},
			{
				id: '5',
				src: 'https://picsum.photos/700/600?random=44',
				alt: 'Blog image 5',
				title: 'State Management Guide',
				caption: 'Choosing the right state solution'
			},
			{
				id: '6',
				src: 'https://picsum.photos/600/700?random=45',
				alt: 'Blog image 6',
				title: 'Testing Strategies',
				caption: 'Complete guide to testing React apps'
			}
		]

		return (
			<ImageGallery
				images={blogImages}
				variant="masonry"
				columns={3}
				gap={20}
			/>
		)
	}
}

export const TravelGallery: Story = {
	render: () => {
		const travelImages: GalleryImage[] = [
			{
				id: '1',
				src: 'https://picsum.photos/800/600?random=50',
				alt: 'Paris',
				title: 'Paris, France',
				caption: 'The City of Light and romance'
			},
			{
				id: '2',
				src: 'https://picsum.photos/800/600?random=51',
				alt: 'Tokyo',
				title: 'Tokyo, Japan',
				caption: 'Where tradition meets innovation'
			},
			{
				id: '3',
				src: 'https://picsum.photos/800/600?random=52',
				alt: 'New York',
				title: 'New York, USA',
				caption: 'The city that never sleeps'
			},
			{
				id: '4',
				src: 'https://picsum.photos/800/600?random=53',
				alt: 'Sydney',
				title: 'Sydney, Australia',
				caption: 'Harbor city with stunning views'
			},
			{
				id: '5',
				src: 'https://picsum.photos/800/600?random=54',
				alt: 'London',
				title: 'London, UK',
				caption: 'Historic capital with modern flair'
			},
			{
				id: '6',
				src: 'https://picsum.photos/800/600?random=55',
				alt: 'Dubai',
				title: 'Dubai, UAE',
				caption: 'Futuristic skyline in the desert'
			}
		]

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
				<div>
					<h3 style={{ color: '#c7d2fe', marginBottom: '1rem' }}>Carousel View</h3>
					<ImageGallery
						images={travelImages}
						variant="carousel"
						autoPlay={4000}
						showThumbnails
					/>
				</div>
				<div>
					<h3 style={{ color: '#c7d2fe', marginBottom: '1rem' }}>Grid View</h3>
					<ImageGallery
						images={travelImages}
						variant="grid"
						columns={3}
					/>
				</div>
			</div>
		)
	}
}

export const MinimalCarousel: Story = {
	render: () => (
		<ImageGallery
			images={sampleImages}
			variant="carousel"
			showArrows={false}
			showCaptions={false}
			showIndicators={false}
		/>
	)
}

export const FullFeaturedCarousel: Story = {
	render: () => (
		<ImageGallery
			images={sampleImages}
			variant="carousel"
			size="lg"
			showThumbnails
			showArrows
			showIndicators
			showCaptions
			autoPlay={5000}
			infinite
		/>
	)
}

export const CompactGrid: Story = {
	render: () => (
		<ImageGallery
			images={sampleImages.slice(0, 6)}
			variant="grid"
			columns={3}
			gap={8}
			showCaptions={false}
		/>
	)
}

export const WideGrid: Story = {
	render: () => {
		const images: GalleryImage[] = Array.from({ length: 8 }, (_, i) => ({
			id: `${i + 1}`,
			src: `https://picsum.photos/800/600?random=${60 + i}`,
			alt: `Image ${i + 1}`,
			title: `Image ${i + 1}`,
			caption: `Caption for image ${i + 1}`
		}))

		return (
			<ImageGallery
				images={images}
				variant="grid"
				columns={4}
				gap={24}
			/>
		)
	}
}

export const MasonryShowcase: Story = {
	render: () => {
		const showcaseImages: GalleryImage[] = [
			{ id: '1', src: 'https://picsum.photos/400/600?random=70', alt: 'Image 1', title: 'Portrait 1' },
			{ id: '2', src: 'https://picsum.photos/600/400?random=71', alt: 'Image 2', title: 'Landscape 1' },
			{ id: '3', src: 'https://picsum.photos/400/500?random=72', alt: 'Image 3', title: 'Medium 1' },
			{ id: '4', src: 'https://picsum.photos/500/700?random=73', alt: 'Image 4', title: 'Tall 1' },
			{ id: '5', src: 'https://picsum.photos/600/400?random=74', alt: 'Image 5', title: 'Wide 1' },
			{ id: '6', src: 'https://picsum.photos/400/600?random=75', alt: 'Image 6', title: 'Portrait 2' },
			{ id: '7', src: 'https://picsum.photos/500/500?random=76', alt: 'Image 7', title: 'Square 1' },
			{ id: '8', src: 'https://picsum.photos/600/450?random=77', alt: 'Image 8', title: 'Wide 2' },
			{ id: '9', src: 'https://picsum.photos/400/550?random=78', alt: 'Image 9', title: 'Medium 2' },
			{ id: '10', src: 'https://picsum.photos/550/650?random=79', alt: 'Image 10', title: 'Tall 2' },
			{ id: '11', src: 'https://picsum.photos/600/400?random=80', alt: 'Image 11', title: 'Landscape 2' },
			{ id: '12', src: 'https://picsum.photos/400/600?random=81', alt: 'Image 12', title: 'Portrait 3' }
		]

		return (
			<ImageGallery
				images={showcaseImages}
				variant="masonry"
				columns={4}
				gap={16}
			/>
		)
	}
}
