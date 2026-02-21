import type { Meta, StoryObj } from '@storybook/react'
import React, { useCallback, useState } from 'react'
import { Search } from './index'
import type { SearchResult } from './index'

// Mock data for stories
const mockResults: SearchResult[] = [
	{
		id: '1',
		title: 'Getting Started with React',
		body: 'Learn the fundamentals of React including components, props, state, and hooks. Build your first React application step by step.',
		tags: ['Tutorial', 'Beginner']
	},
	{
		id: '2',
		title: 'Advanced TypeScript Patterns',
		body: 'Explore advanced TypeScript patterns for building scalable applications. Generics, conditional types, and utility types explained.',
		tags: ['Advanced', 'TypeScript']
	},
	{
		id: '3',
		title: 'CSS-in-JS with Emotion',
		body: 'Style your React components with Emotion. Compare CSS-in-JS approaches and learn when to use each strategy.',
		tags: ['Styling', 'Emotion']
	},
	{
		id: '4',
		title: 'State Management with Zustand',
		body: 'Simple and minimal state management. Learn how Zustand simplifies global state without boilerplate.',
		tags: ['State', 'Zustand']
	},
	{
		id: '5',
		title: 'Testing React with Vitest',
		body: 'Unit test your React components with Vitest. Fast, ESM-native testing with great DX.',
		tags: ['Testing', 'Vitest']
	}
]

const mockResultsWithTags: SearchResult[] = [
	{ id: 't1', title: 'Documentation', body: 'Official docs and guides.', tags: ['Docs', 'Official'] },
	{ id: 't2', title: 'API Reference', body: 'Complete API documentation.', tags: ['API', 'Reference'] },
	{ id: 't3', title: 'Changelog', body: 'Version history and updates.', tags: ['Release'] }
]

// Simulated API - filters mock data by query
function simulateSearch(query: string, page: number, pageSize: number) {
	const all = [...mockResults, ...mockResultsWithTags]
	const filtered = all.filter(
		(r) =>
			r.title.toLowerCase().includes(query.toLowerCase()) ||
			r.body.toLowerCase().includes(query.toLowerCase()) ||
			r.tags?.some((t) => t.toLowerCase().includes(query.toLowerCase()))
	)
	const start = (page - 1) * pageSize
	return {
		results: filtered.slice(start, start + pageSize),
		totalCount: filtered.length
	}
}

const meta = {
	title: 'Components/Search',
	component: Search,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A Google-style search component. Starts with a centered search field; after searching, the input moves to the top with results below and pagination at the bottom. Supports dark/light theming—toggle via the toolbar background control.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		pageSize: {
			control: { type: 'number', min: 5, max: 50, step: 5 },
			description: 'Number of results per page'
		},
		debounceMs: {
			control: { type: 'number', min: 0, max: 1000, step: 100 },
			description: 'Debounce delay before firing search (0 = immediate)'
		},
		loading: {
			control: 'boolean',
			description: 'Loading state for async operations'
		},
		placeholder: {
			control: 'text',
			description: 'Search input placeholder'
		}
	}
} satisfies Meta<typeof Search>

export default meta
type Story = StoryObj<typeof meta>

// Controlled story with local state - simulates hooking to any data source
export const Default: Story = {
	render: () => {
		const [results, setResults] = useState<SearchResult[]>([])
		const [totalCount, setTotalCount] = useState(0)
		const [loading, setLoading] = useState(false)

		const handleSearch = useCallback(
			async ({ query, page, pageSize }: { query: string; page: number; pageSize: number }) => {
				setLoading(true)
				// Simulate API delay
				await new Promise((r) => setTimeout(r, 400))
				const { results: data, totalCount: total } = simulateSearch(query, page, pageSize)
				setResults(data)
				setTotalCount(total)
				setLoading(false)
			},
			[]
		)

		return (
			<div style={{ minHeight: '70vh' }}>
				<Search
					onSearch={handleSearch}
					results={results}
					totalCount={totalCount}
					pageSize={5}
					placeholder="Search documentation..."
				/>
			</div>
		)
	}
}

export const WithTags: Story = {
	render: () => {
		const [results, setResults] = useState<SearchResult[]>([])
		const [totalCount, setTotalCount] = useState(0)
		const [loading, setLoading] = useState(false)

		const handleSearch = useCallback(
			async ({ query, page, pageSize }: { query: string; page: number; pageSize: number }) => {
				setLoading(true)
				await new Promise((r) => setTimeout(r, 300))
				const filtered = mockResultsWithTags.filter(
					(r) =>
						r.title.toLowerCase().includes(query.toLowerCase()) ||
						r.tags?.some((t) => t.toLowerCase().includes(query.toLowerCase()))
				)
				const start = (page - 1) * pageSize
				setResults(filtered.slice(start, start + pageSize))
				setTotalCount(filtered.length)
				setLoading(false)
			},
			[]
		)

		return (
			<div style={{ minHeight: '70vh' }}>
				<Search
					onSearch={handleSearch}
					results={results}
					totalCount={totalCount}
					pageSize={10}
					placeholder="Search by tag (e.g. Docs, API)..."
				/>
			</div>
		)
	}
}

export const WithPagination: Story = {
	render: () => {
		const [results, setResults] = useState<SearchResult[]>([])
		const [totalCount, setTotalCount] = useState(0)
		const [loading, setLoading] = useState(false)

		const handleSearch = useCallback(
			async ({ query, page, pageSize }: { query: string; page: number; pageSize: number }) => {
				setLoading(true)
				await new Promise((r) => setTimeout(r, 350))
				const all = [...mockResults, ...mockResultsWithTags]
				const filtered = query
					? all.filter(
							(r) =>
								r.title.toLowerCase().includes(query.toLowerCase()) ||
								r.body.toLowerCase().includes(query.toLowerCase())
						)
					: all
				const start = (page - 1) * pageSize
				setResults(filtered.slice(start, start + pageSize))
				setTotalCount(filtered.length)
				setLoading(false)
			},
			[]
		)

		return (
			<div style={{ minHeight: '70vh' }}>
				<Search
					onSearch={handleSearch}
					results={results}
					totalCount={totalCount}
					pageSize={3}
					placeholder="Search (try 'react' or 'docs')..."
				/>
			</div>
		)
	}
}

export const LoadingState: Story = {
	render: () => {
		const [results, setResults] = useState<SearchResult[]>([])
		const [totalCount, setTotalCount] = useState(0)
		const [loading, setLoading] = useState(false)

		const handleSearch = useCallback(
			async ({ query, page, pageSize }: { query: string; page: number; pageSize: number }) => {
				setLoading(true)
				await new Promise((r) => setTimeout(r, 2000))
				const { results: data, totalCount: total } = simulateSearch(query, page, pageSize)
				setResults(data)
				setTotalCount(total)
				setLoading(false)
			},
			[]
		)

		return (
			<div style={{ minHeight: '70vh' }}>
				<p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary, #9ca3af)' }}>
					Type a search term to see the loading spinner (2s delay).
				</p>
				<Search
					onSearch={handleSearch}
					results={results}
					totalCount={totalCount}
					loading={loading}
					pageSize={5}
					placeholder="Type to see loading..."
				/>
			</div>
		)
	}
}

export const WithResultClick: Story = {
	render: () => {
		const [results, setResults] = useState<SearchResult[]>([])
		const [totalCount, setTotalCount] = useState(0)
		const [loading, setLoading] = useState(false)
		const [clicked, setClicked] = useState<string | null>(null)

		const handleSearch = useCallback(
			async ({ query, page, pageSize }: { query: string; page: number; pageSize: number }) => {
				setLoading(true)
				await new Promise((r) => setTimeout(r, 300))
				const { results: data, totalCount: total } = simulateSearch(query, page, pageSize)
				setResults(
					data.map((r) => ({
						...r,
						onClick: () => setClicked(r.title)
					}))
				)
				setTotalCount(total)
				setLoading(false)
			},
			[]
		)

		return (
			<div style={{ minHeight: '70vh' }}>
				<p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary, #9ca3af)' }}>
					Search and click a result to trigger its onClick handler.
				</p>
				<Search
					onSearch={handleSearch}
					results={results}
					totalCount={totalCount}
					pageSize={10}
					placeholder="Search and click a result..."
				/>
				{clicked && (
					<div
						style={{
							marginTop: '1rem',
							padding: '0.75rem 1rem',
							background: 'rgba(59, 130, 246, 0.15)',
							borderRadius: '0.5rem',
							fontSize: '0.875rem'
						}}
					>
						Clicked: <strong>{clicked}</strong>
					</div>
				)}
			</div>
		)
	}
}

export const WithExternalLinks: Story = {
	render: () => {
		const [results, setResults] = useState<SearchResult[]>([])
		const [totalCount, setTotalCount] = useState(0)
		const [loading, setLoading] = useState(false)

		const handleSearch = useCallback(
			async ({ query, page, pageSize }: { query: string; page: number; pageSize: number }) => {
				setLoading(true)
				await new Promise((r) => setTimeout(r, 300))
				const { results: data, totalCount: total } = simulateSearch(query, page, pageSize)
				setResults(
					data.map((r, i) => ({
						...r,
						href: `https://example.com/docs/${r.id}`,
						newTab: i % 2 === 0
					}))
				)
				setTotalCount(total)
				setLoading(false)
			},
			[]
		)

		return (
			<div style={{ minHeight: '70vh' }}>
				<p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary, #9ca3af)' }}>
					Results link externally. Odd-indexed open in same tab, even-indexed open in new tab (newTab=true).
				</p>
				<Search
					onSearch={handleSearch}
					results={results}
					totalCount={totalCount}
					pageSize={10}
					placeholder="Search (results have href + newTab)..."
				/>
			</div>
		)
	}
}

export const EmptyState: Story = {
	render: () => {
		const [results, setResults] = useState<SearchResult[]>([])
		const [totalCount, setTotalCount] = useState(0)
		const [loading, setLoading] = useState(false)

		const handleSearch = useCallback(
			async ({ query, page, pageSize }: { query: string; page: number; pageSize: number }) => {
				setLoading(true)
				await new Promise((r) => setTimeout(r, 400))
				// Simulate no results for certain queries
				const filtered = mockResults.filter((r) =>
					r.title.toLowerCase().includes(query.toLowerCase())
				)
				const start = (page - 1) * pageSize
				setResults(filtered.slice(start, start + pageSize))
				setTotalCount(filtered.length)
				setLoading(false)
			},
			[]
		)

		return (
			<div style={{ minHeight: '70vh' }}>
				<p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary, #9ca3af)' }}>
					Try searching for &quot;nonexistent&quot; to see the empty state.
				</p>
				<Search
					onSearch={handleSearch}
					results={results}
					totalCount={totalCount}
					pageSize={10}
					placeholder="Search (try 'nonexistent' for empty)..."
				/>
			</div>
		)
	}
}

export const NoDebounce: Story = {
	render: () => {
		const [results, setResults] = useState<SearchResult[]>([])
		const [totalCount, setTotalCount] = useState(0)

		const handleSearch = useCallback(
			({ query, page, pageSize }: { query: string; page: number; pageSize: number }) => {
				const { results: data, totalCount: total } = simulateSearch(query, page, pageSize)
				setResults(data)
				setTotalCount(total)
			},
			[]
		)

		return (
			<div style={{ minHeight: '70vh' }}>
				<Search
					onSearch={handleSearch}
					results={results}
					totalCount={totalCount}
					pageSize={10}
					placeholder="Instant search (no debounce)..."
					debounceMs={0}
				/>
			</div>
		)
	}
}
