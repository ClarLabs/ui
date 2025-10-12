import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Rating } from './index'

const meta = {
	title: 'Components/Rating',
	component: Rating,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs'],
	argTypes: {
		max: {
			control: 'number'
		},
		precision: {
			control: 'select',
			options: [0.5, 1]
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg']
		},
		readOnly: {
			control: 'boolean'
		},
		disabled: {
			control: 'boolean'
		},
		showValue: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof Rating>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {}
}

export const WithLabel: Story = {
	args: {
		label: 'Rate this product'
	}
}

export const WithDefaultValue: Story = {
	args: {
		label: 'Product Rating',
		defaultValue: 3.5,
		precision: 0.5
	}
}

export const Small: Story = {
	args: {
		label: 'Small Rating',
		size: 'sm',
		defaultValue: 4
	}
}

export const Large: Story = {
	args: {
		label: 'Large Rating',
		size: 'lg',
		defaultValue: 4
	}
}

export const HalfStarPrecision: Story = {
	args: {
		label: 'Half Star Precision',
		precision: 0.5,
		defaultValue: 3.5,
		showValue: true
	}
}

export const FullStarPrecision: Story = {
	args: {
		label: 'Full Star Precision',
		precision: 1,
		defaultValue: 3,
		showValue: true
	}
}

export const WithValue: Story = {
	args: {
		label: 'Show Numeric Value',
		defaultValue: 4.5,
		precision: 0.5,
		showValue: true
	}
}

export const ReadOnly: Story = {
	args: {
		label: 'Read Only',
		value: 4.5,
		precision: 0.5,
		readOnly: true,
		showValue: true
	}
}

export const Disabled: Story = {
	args: {
		label: 'Disabled',
		value: 3,
		disabled: true
	}
}

export const MaxTen: Story = {
	args: {
		label: 'Rate out of 10',
		max: 10,
		defaultValue: 7,
		showValue: true
	}
}

export const WithHelperText: Story = {
	args: {
		label: 'Rate your experience',
		helperText: 'Click to rate from 1 to 5 stars',
		defaultValue: 0
	}
}

export const Interactive: Story = {
	render: () => {
		const [value, setValue] = useState(0)

		const getDescription = (rating: number) => {
			if (rating === 0) return 'Not rated'
			if (rating <= 1) return 'Poor'
			if (rating <= 2) return 'Fair'
			if (rating <= 3) return 'Good'
			if (rating <= 4) return 'Very Good'
			return 'Excellent'
		}

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
				<Rating
					label="How would you rate your experience?"
					value={value}
					onChange={setValue}
					precision={0.5}
					showValue
				/>
				<div
					style={{
						padding: '1rem',
						background: 'rgba(99, 102, 241, 0.1)',
						border: '1px solid rgba(99, 102, 241, 0.3)',
						borderRadius: '0.5rem',
						textAlign: 'center'
					}}
				>
					<p style={{ color: '#c7d2fe', fontSize: '1rem', fontWeight: 'bold' }}>
						{getDescription(value)}
					</p>
				</div>
			</div>
		)
	}
}

export const ReviewForm: Story = {
	render: () => {
		const [rating, setRating] = useState(0)
		const [submitted, setSubmitted] = useState(false)

		const handleSubmit = (e: React.FormEvent) => {
			e.preventDefault()
			setSubmitted(true)
			setTimeout(() => {
				setSubmitted(false)
				setRating(0)
			}, 3000)
		}

		return (
			<form
				onSubmit={handleSubmit}
				style={{
					padding: '2rem',
					background: 'rgba(255, 255, 255, 0.05)',
					border: '1px solid rgba(255, 255, 255, 0.2)',
					borderRadius: '0.5rem',
					maxWidth: '500px'
				}}
			>
				<h3 style={{ color: '#c7d2fe', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
					Leave a Review
				</h3>

				<div style={{ marginBottom: '1.5rem' }}>
					<Rating
						label="Overall Rating"
						value={rating}
						onChange={setRating}
						precision={0.5}
						showValue
						helperText="How would you rate this product?"
					/>
				</div>

				<div style={{ marginBottom: '1.5rem' }}>
					<label style={{ display: 'block', color: '#e0e0e0', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
						Review Title
					</label>
					<input
						type="text"
						placeholder="Summarize your experience..."
						required
						style={{
							width: '100%',
							padding: '0.5rem 1rem',
							background: 'rgba(255, 255, 255, 0.05)',
							border: '1px solid rgba(255, 255, 255, 0.2)',
							borderRadius: '0.5rem',
							color: '#e0e0e0',
							fontSize: '0.95rem'
						}}
					/>
				</div>

				<div style={{ marginBottom: '1.5rem' }}>
					<label style={{ display: 'block', color: '#e0e0e0', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
						Your Review
					</label>
					<textarea
						placeholder="Tell us about your experience..."
						required
						rows={4}
						style={{
							width: '100%',
							padding: '0.75rem 1rem',
							background: 'rgba(255, 255, 255, 0.05)',
							border: '1px solid rgba(255, 255, 255, 0.2)',
							borderRadius: '0.5rem',
							color: '#e0e0e0',
							fontSize: '0.95rem',
							fontFamily: 'inherit',
							resize: 'vertical'
						}}
					/>
				</div>

				<button
					type="submit"
					disabled={rating === 0}
					style={{
						padding: '0.75rem 2rem',
						background: rating > 0 ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.05)',
						border: rating > 0 ? '2px solid rgba(99, 102, 241, 0.5)' : '1px solid rgba(255, 255, 255, 0.2)',
						borderRadius: '0.5rem',
						color: rating > 0 ? '#c7d2fe' : '#6b7280',
						fontSize: '0.95rem',
						fontWeight: 'bold',
						cursor: rating > 0 ? 'pointer' : 'not-allowed'
					}}
				>
					{submitted ? 'Submitted!' : 'Submit Review'}
				</button>
			</form>
		)
	}
}

export const ProductRatings: Story = {
	render: () => {
		const products = [
			{ name: 'Wireless Headphones', rating: 4.5, reviews: 1234 },
			{ name: 'Smart Watch', rating: 4.0, reviews: 856 },
			{ name: 'Laptop Stand', rating: 3.5, reviews: 432 },
			{ name: 'USB-C Cable', rating: 5.0, reviews: 2341 },
			{ name: 'Keyboard', rating: 4.5, reviews: 678 }
		]

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
				{products.map((product, index) => (
					<div
						key={index}
						style={{
							padding: '1rem',
							background: 'rgba(255, 255, 255, 0.05)',
							border: '1px solid rgba(255, 255, 255, 0.2)',
							borderRadius: '0.5rem',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center'
						}}
					>
						<div>
							<h4 style={{ color: '#c7d2fe', marginBottom: '0.5rem', fontSize: '1rem' }}>
								{product.name}
							</h4>
							<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
								<Rating value={product.rating} precision={0.5} size="sm" readOnly />
								<span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
									({product.reviews} reviews)
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		)
	}
}

export const HoverFeedback: Story = {
	render: () => {
		const [value, setValue] = useState(0)
		const [hoverValue, setHoverValue] = useState(0)

		const labels: { [key: number]: string } = {
			0: 'No rating',
			0.5: 'Useless+',
			1: 'Useless',
			1.5: 'Poor+',
			2: 'Poor',
			2.5: 'Ok+',
			3: 'Ok',
			3.5: 'Good+',
			4: 'Good',
			4.5: 'Excellent+',
			5: 'Excellent'
		}

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
				<Rating
					value={value}
					onChange={setValue}
					onHoverChange={setHoverValue}
					precision={0.5}
					size="lg"
				/>
				<div
					style={{
						padding: '0.75rem 1.5rem',
						background: 'rgba(99, 102, 241, 0.1)',
						border: '1px solid rgba(99, 102, 241, 0.3)',
						borderRadius: '0.5rem',
						minWidth: '150px',
						textAlign: 'center'
					}}
				>
					<p style={{ color: '#c7d2fe', fontSize: '1rem', fontWeight: 'bold' }}>
						{labels[hoverValue || value]}
					</p>
				</div>
			</div>
		)
	}
}

export const MultiCriteria: Story = {
	render: () => {
		const [ratings, setRatings] = useState({
			quality: 0,
			service: 0,
			value: 0,
			delivery: 0
		})

		const updateRating = (key: keyof typeof ratings, value: number) => {
			setRatings((prev) => ({ ...prev, [key]: value }))
		}

		const averageRating = Object.values(ratings).reduce((a, b) => a + b, 0) / Object.keys(ratings).length

		return (
			<div
				style={{
					padding: '2rem',
					background: 'rgba(255, 255, 255, 0.05)',
					border: '1px solid rgba(255, 255, 255, 0.2)',
					borderRadius: '0.5rem',
					maxWidth: '500px'
				}}
			>
				<h3 style={{ color: '#c7d2fe', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
					Rate Your Experience
				</h3>

				<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
					<Rating label="Product Quality" value={ratings.quality} onChange={(v) => updateRating('quality', v)} />
					<Rating label="Customer Service" value={ratings.service} onChange={(v) => updateRating('service', v)} />
					<Rating label="Value for Money" value={ratings.value} onChange={(v) => updateRating('value', v)} />
					<Rating label="Delivery Speed" value={ratings.delivery} onChange={(v) => updateRating('delivery', v)} />
				</div>

				<div
					style={{
						padding: '1rem',
						background: 'rgba(99, 102, 241, 0.1)',
						border: '1px solid rgba(99, 102, 241, 0.3)',
						borderRadius: '0.5rem',
						textAlign: 'center'
					}}
				>
					<p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
						Overall Average
					</p>
					<p style={{ color: '#c7d2fe', fontSize: '1.5rem', fontWeight: 'bold' }}>
						{averageRating.toFixed(1)} / 5
					</p>
				</div>
			</div>
		)
	}
}

export const CompareSizes: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
			<Rating label="Small (sm)" size="sm" defaultValue={4} showValue />
			<Rating label="Medium (md)" size="md" defaultValue={4} showValue />
			<Rating label="Large (lg)" size="lg" defaultValue={4} showValue />
		</div>
	)
}

export const CustomMaxRatings: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
			<Rating label="Rate out of 5" max={5} defaultValue={3} showValue />
			<Rating label="Rate out of 10" max={10} defaultValue={7} showValue />
			<Rating label="Rate out of 3" max={3} defaultValue={2} showValue />
		</div>
	)
}

export const ReadOnlyDisplays: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
			<div
				style={{
					padding: '1rem',
					background: 'rgba(255, 255, 255, 0.05)',
					border: '1px solid rgba(255, 255, 255, 0.2)',
					borderRadius: '0.5rem'
				}}
			>
				<h4 style={{ color: '#c7d2fe', marginBottom: '0.5rem' }}>Overall Rating</h4>
				<Rating value={4.7} precision={0.5} readOnly showValue size="lg" />
				<p style={{ color: '#9ca3af', marginTop: '0.5rem', fontSize: '0.875rem' }}>
					Based on 1,234 reviews
				</p>
			</div>

			<div
				style={{
					padding: '1rem',
					background: 'rgba(255, 255, 255, 0.05)',
					border: '1px solid rgba(255, 255, 255, 0.2)',
					borderRadius: '0.5rem'
				}}
			>
				<h4 style={{ color: '#c7d2fe', marginBottom: '0.5rem' }}>Customer Satisfaction</h4>
				<Rating value={5} readOnly showValue />
				<p style={{ color: '#9ca3af', marginTop: '0.5rem', fontSize: '0.875rem' }}>
					100% satisfaction rate
				</p>
			</div>
		</div>
	)
}
