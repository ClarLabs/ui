import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { LanguageSelect, Language } from './index'

const meta = {
	title: 'Components/LanguageSelect',
	component: LanguageSelect,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		defaultLanguage: {
			control: 'text',
			description: 'Default selected language code'
		},
		disabled: {
			control: 'boolean',
			description: 'Disable the language selector'
		},
		showSearch: {
			control: 'boolean',
			description: 'Show search input in dropdown'
		},
		onChange: {
			action: 'languageChanged',
			description: 'Callback when language selection changes'
		}
	}
} satisfies Meta<typeof LanguageSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {}
}

export const WithLabel: Story = {
	args: {
		label: 'Select Language'
	}
}

export const WithSearch: Story = {
	args: {
		showSearch: true,
		label: 'Choose your language'
	}
}

export const DefaultSpanish: Story = {
	args: {
		defaultLanguage: 'es',
		label: 'Idioma'
	}
}

export const DefaultJapanese: Story = {
	args: {
		defaultLanguage: 'ja',
		label: 'Language / 言語'
	}
}

export const Disabled: Story = {
	args: {
		disabled: true,
		label: 'Language (Disabled)'
	}
}

export const CustomLanguages: Story = {
	args: {
		languages: [
			{ code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
			{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
			{ code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
			{ code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' }
		],
		label: 'Available Languages',
		showSearch: false
	}
}

export const WithCallback: Story = {
	render: () => {
		const [selectedLang, setSelectedLang] = useState<Language | null>(null)

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', minWidth: '320px' }}>
				<LanguageSelect label="Select Language" showSearch onChange={(lang) => setSelectedLang(lang)} />
				{selectedLang && (
					<div
						style={{
							padding: '1rem',
							background: 'rgba(99, 102, 241, 0.1)',
							borderRadius: '0.5rem',
							border: '1px solid rgba(99, 102, 241, 0.3)',
							width: '100%'
						}}
					>
						<p style={{ margin: 0, color: '#e0e0e0', fontSize: '0.875rem' }}>
							<strong>Selected:</strong> {selectedLang.flag} {selectedLang.name} ({selectedLang.nativeName})
						</p>
						<p style={{ margin: '0.25rem 0 0 0', color: '#9ca3af', fontSize: '0.75rem' }}>Code: {selectedLang.code}</p>
					</div>
				)}
			</div>
		)
	}
}

export const InNavigationBar: Story = {
	render: () => (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				padding: '1rem 2rem',
				background: 'rgba(60, 60, 70, 0.95)',
				borderRadius: '0.75rem',
				minWidth: '700px',
				border: '1px solid rgba(255, 255, 255, 0.1)'
			}}
		>
			<div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
				<h2 style={{ margin: 0, color: '#e0e0e0', fontSize: '1.25rem', fontWeight: 600 }}>MyApp</h2>
				<nav style={{ display: 'flex', gap: '1.5rem' }}>
					<a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.9rem' }}>
						Home
					</a>
					<a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.9rem' }}>
						Products
					</a>
					<a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.9rem' }}>
						About
					</a>
				</nav>
			</div>
			<div style={{ width: '200px' }}>
				<LanguageSelect />
			</div>
		</div>
	)
}

export const InSettingsPanel: Story = {
	render: () => (
		<div
			style={{
				padding: '2rem',
				background: 'rgba(60, 60, 70, 0.95)',
				borderRadius: '0.75rem',
				minWidth: '400px',
				border: '1px solid rgba(255, 255, 255, 0.1)'
			}}
		>
			<h3 style={{ margin: '0 0 1.5rem 0', color: '#e0e0e0', fontSize: '1.25rem', fontWeight: 600 }}>Preferences</h3>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
				<div>
					<label style={{ display: 'block', marginBottom: '0.5rem', color: '#9ca3af', fontSize: '0.875rem' }}>Theme</label>
					<select
						style={{
							width: '100%',
							padding: '0.75rem',
							background: 'rgba(255, 255, 255, 0.05)',
							border: '1px solid rgba(255, 255, 255, 0.2)',
							borderRadius: '0.5rem',
							color: '#e0e0e0'
						}}
					>
						<option>Dark</option>
						<option>Light</option>
					</select>
				</div>
				<div>
					<LanguageSelect label="Language" showSearch />
				</div>
				<div>
					<label style={{ display: 'block', marginBottom: '0.5rem', color: '#9ca3af', fontSize: '0.875rem' }}>Timezone</label>
					<select
						style={{
							width: '100%',
							padding: '0.75rem',
							background: 'rgba(255, 255, 255, 0.05)',
							border: '1px solid rgba(255, 255, 255, 0.2)',
							borderRadius: '0.5rem',
							color: '#e0e0e0'
						}}
					>
						<option>UTC</option>
						<option>EST</option>
					</select>
				</div>
			</div>
		</div>
	)
}

export const MultipleSelectors: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
			<LanguageSelect label="Primary Language" defaultLanguage="en" />
			<LanguageSelect label="Secondary Language" defaultLanguage="es" showSearch />
			<LanguageSelect label="Fallback Language" defaultLanguage="fr" />
		</div>
	)
}

export const CompactVersion: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
			<span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Select language:</span>
			<div style={{ width: '220px' }}>
				<LanguageSelect />
			</div>
		</div>
	)
}

export const WithSearchDemo: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
			<p
				style={{
					color: '#9ca3af',
					textAlign: 'center',
					maxWidth: '400px',
					fontSize: '0.875rem',
					margin: 0
				}}
			>
				Click to open and try searching for languages by name, native name, or language code. Navigate with keyboard arrows and Enter to
				select.
			</p>
			<LanguageSelect label="Language Selector with Search" showSearch />
		</div>
	)
}

export const AllLanguages: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
			<p
				style={{
					color: '#9ca3af',
					textAlign: 'center',
					maxWidth: '400px',
					fontSize: '0.875rem',
					margin: 0
				}}
			>
				Showcasing all 12 default languages with smooth animations, gradient accents, and interactive hover effects.
			</p>
			<LanguageSelect label="All Available Languages" showSearch />
		</div>
	)
}
