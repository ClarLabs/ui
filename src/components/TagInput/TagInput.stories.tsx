import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { TagInput, Tag } from './index'

const meta = {
	title: 'Components/TagInput',
	component: TagInput,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg']
		},
		variant: {
			control: 'select',
			options: ['default', 'error', 'success']
		},
		disabled: {
			control: 'boolean'
		},
		removable: {
			control: 'boolean'
		},
		allowDuplicates: {
			control: 'boolean'
		},
		fullWidth: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof TagInput>

export default meta
type Story = StoryObj<typeof meta>

const ControlledTagInput = (props: any) => {
	const [tags, setTags] = useState<Tag[]>(props.tags || [])

	return <TagInput {...props} tags={tags} onChange={setTags} />
}

export const Default: Story = {
	render: () => <ControlledTagInput placeholder="Type and press Enter..." />
}

export const WithLabel: Story = {
	render: () => <ControlledTagInput label="Add Tags" placeholder="Type and press Enter..." />
}

export const WithInitialTags: Story = {
	render: () => (
		<ControlledTagInput
			label="Technologies"
			tags={[
				{ id: '1', label: 'React' },
				{ id: '2', label: 'TypeScript' },
				{ id: '3', label: 'CSS' }
			]}
			placeholder="Add more..."
		/>
	)
}

export const Small: Story = {
	render: () => <ControlledTagInput label="Small Tags" size="sm" placeholder="Type and press Enter..." />
}

export const Large: Story = {
	render: () => <ControlledTagInput label="Large Tags" size="lg" placeholder="Type and press Enter..." />
}

export const WithError: Story = {
	render: () => (
		<ControlledTagInput
			label="Skills"
			error="Please add at least 3 tags"
			placeholder="Type and press Enter..."
		/>
	)
}

export const WithHelperText: Story = {
	render: () => (
		<ControlledTagInput
			label="Keywords"
			helperText="Press Enter or comma to add a tag"
			placeholder="Type keywords..."
		/>
	)
}

export const Success: Story = {
	render: () => (
		<ControlledTagInput
			label="Interests"
			variant="success"
			tags={[
				{ id: '1', label: 'Design' },
				{ id: '2', label: 'Development' }
			]}
			placeholder="Add more..."
		/>
	)
}

export const Disabled: Story = {
	render: () => (
		<ControlledTagInput
			label="Tags"
			disabled
			tags={[
				{ id: '1', label: 'Disabled' },
				{ id: '2', label: 'Tags' }
			]}
		/>
	)
}

export const NonRemovable: Story = {
	render: () => (
		<ControlledTagInput
			label="Fixed Tags"
			removable={false}
			tags={[
				{ id: '1', label: 'Cannot' },
				{ id: '2', label: 'Remove' },
				{ id: '3', label: 'These' }
			]}
			placeholder="Add more..."
		/>
	)
}

export const MaxTags: Story = {
	render: () => (
		<ControlledTagInput
			label="Up to 5 tags"
			maxTags={5}
			tags={[
				{ id: '1', label: 'Tag 1' },
				{ id: '2', label: 'Tag 2' },
				{ id: '3', label: 'Tag 3' }
			]}
			helperText="Maximum 5 tags allowed"
			placeholder="Add more..."
		/>
	)
}

export const AllowDuplicates: Story = {
	render: () => (
		<ControlledTagInput
			label="Duplicates Allowed"
			allowDuplicates
			helperText="You can add the same tag multiple times"
			placeholder="Type and press Enter..."
		/>
	)
}

export const CustomValidation: Story = {
	render: () => (
		<ControlledTagInput
			label="Hashtags Only"
			validate={(value) => value.startsWith('#')}
			helperText="Tags must start with #"
			placeholder="Type #hashtag..."
		/>
	)
}

export const CustomSeparators: Story = {
	render: () => (
		<ControlledTagInput
			label="Multiple Separators"
			separators={['Enter', ',', ';', ' ']}
			helperText="Press Enter, comma, semicolon, or space to add"
			placeholder="Type tags..."
		/>
	)
}

export const FullWidth: Story = {
	render: () => <ControlledTagInput label="Full Width" fullWidth placeholder="Type and press Enter..." />
}

export const WithCallbacks: Story = {
	render: () => {
		const [tags, setTags] = useState<Tag[]>([])
		const [log, setLog] = useState<string[]>([])

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
				<TagInput
					label="Tags with Callbacks"
					tags={tags}
					onChange={setTags}
					onTagAdd={(tag) => setLog((prev) => [...prev, `Added: ${tag.label}`])}
					onTagRemove={(tag) => setLog((prev) => [...prev, `Removed: ${tag.label}`])}
					placeholder="Type and press Enter..."
				/>
				<div
					style={{
						padding: '1rem',
						background: 'rgba(255, 255, 255, 0.05)',
						border: '1px solid rgba(255, 255, 255, 0.2)',
						borderRadius: '0.5rem',
						maxHeight: '200px',
						overflowY: 'auto'
					}}
				>
					<h4 style={{ color: '#c7d2fe', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Event Log:</h4>
					{log.length === 0 ? (
						<p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>No events yet</p>
					) : (
						<ul style={{ color: '#e0e0e0', fontSize: '0.875rem', paddingLeft: '1.5rem' }}>
							{log.map((entry, i) => (
								<li key={i}>{entry}</li>
							))}
						</ul>
					)}
				</div>
			</div>
		)
	}
}

export const FormExample: Story = {
	render: () => {
		const [tags, setTags] = useState<Tag[]>([])
		const [submitted, setSubmitted] = useState(false)

		const handleSubmit = (e: React.FormEvent) => {
			e.preventDefault()
			setSubmitted(true)
			setTimeout(() => setSubmitted(false), 2000)
		}

		return (
			<form
				onSubmit={handleSubmit}
				style={{
					padding: '2rem',
					background: 'rgba(255, 255, 255, 0.05)',
					border: '1px solid rgba(255, 255, 255, 0.2)',
					borderRadius: '0.5rem',
					maxWidth: '600px'
				}}
			>
				<h3 style={{ color: '#c7d2fe', marginBottom: '1.5rem', fontSize: '1.25rem' }}>Project Details</h3>

				<div style={{ marginBottom: '1.5rem' }}>
					<label style={{ display: 'block', color: '#e0e0e0', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
						Project Name
					</label>
					<input
						type="text"
						placeholder="Enter project name..."
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
					<TagInput
						label="Technologies"
						tags={tags}
						onChange={setTags}
						placeholder="Add technologies..."
						helperText="Press Enter or comma to add tags"
					/>
				</div>

				<button
					type="submit"
					style={{
						padding: '0.75rem 2rem',
						background: 'rgba(99, 102, 241, 0.3)',
						border: '2px solid rgba(99, 102, 241, 0.5)',
						borderRadius: '0.5rem',
						color: '#c7d2fe',
						fontSize: '0.95rem',
						fontWeight: 'bold',
						cursor: 'pointer'
					}}
				>
					{submitted ? 'Submitted!' : 'Submit'}
				</button>
			</form>
		)
	}
}

export const BlogCategories: Story = {
	render: () => {
		const [tags, setTags] = useState<Tag[]>([
			{ id: '1', label: 'Technology' },
			{ id: '2', label: 'Design' },
			{ id: '3', label: 'Programming' }
		])

		return (
			<div
				style={{
					padding: '2rem',
					background: 'rgba(255, 255, 255, 0.05)',
					border: '1px solid rgba(255, 255, 255, 0.2)',
					borderRadius: '0.5rem',
					maxWidth: '700px'
				}}
			>
				<h2 style={{ color: '#c7d2fe', marginBottom: '1rem', fontSize: '1.5rem' }}>Write a Blog Post</h2>

				<div style={{ marginBottom: '1.5rem' }}>
					<label style={{ display: 'block', color: '#e0e0e0', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
						Title
					</label>
					<input
						type="text"
						placeholder="Post title..."
						style={{
							width: '100%',
							padding: '0.75rem 1rem',
							background: 'rgba(255, 255, 255, 0.05)',
							border: '1px solid rgba(255, 255, 255, 0.2)',
							borderRadius: '0.5rem',
							color: '#e0e0e0',
							fontSize: '1rem'
						}}
					/>
				</div>

				<div style={{ marginBottom: '1.5rem' }}>
					<TagInput
						label="Categories"
						tags={tags}
						onChange={setTags}
						maxTags={5}
						placeholder="Add categories..."
						helperText="Maximum 5 categories"
					/>
				</div>

				<div>
					<label style={{ display: 'block', color: '#e0e0e0', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
						Content
					</label>
					<textarea
						placeholder="Write your post content..."
						rows={8}
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
			</div>
		)
	}
}

export const EmailRecipients: Story = {
	render: () => {
		const [tags, setTags] = useState<Tag[]>([])

		const validateEmail = (value: string) => {
			return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
		}

		return (
			<div
				style={{
					padding: '2rem',
					background: 'rgba(255, 255, 255, 0.05)',
					border: '1px solid rgba(255, 255, 255, 0.2)',
					borderRadius: '0.5rem',
					maxWidth: '600px'
				}}
			>
				<h3 style={{ color: '#c7d2fe', marginBottom: '1.5rem', fontSize: '1.25rem' }}>Send Email</h3>

				<div style={{ marginBottom: '1rem' }}>
					<TagInput
						label="Recipients"
						tags={tags}
						onChange={setTags}
						validate={validateEmail}
						placeholder="Enter email addresses..."
						helperText="Enter valid email addresses"
						separators={['Enter', ',', ';', ' ']}
					/>
				</div>

				<p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '1rem' }}>
					Recipients: {tags.length}
				</p>
			</div>
		)
	}
}

export const ColorThemes: Story = {
	render: () => {
		const [lightTags, setLightTags] = useState<Tag[]>([
			{ id: '1', label: 'Primary' },
			{ id: '2', label: 'Secondary' }
		])
		const [darkTags, setDarkTags] = useState<Tag[]>([
			{ id: '3', label: 'Accent' },
			{ id: '4', label: 'Neutral' }
		])

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
				<TagInput
					label="Light Mode Colors"
					tags={lightTags}
					onChange={setLightTags}
					placeholder="Add colors..."
					variant="default"
				/>
				<TagInput
					label="Dark Mode Colors"
					tags={darkTags}
					onChange={setDarkTags}
					placeholder="Add colors..."
					variant="default"
				/>
			</div>
		)
	}
}
