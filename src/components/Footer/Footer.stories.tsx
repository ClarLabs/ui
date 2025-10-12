import type { Meta, StoryObj } from '@storybook/react'
import { Footer } from './index'

const meta: Meta<typeof Footer> = {
	title: 'Components/Footer',
	component: Footer,
	parameters: {
		layout: 'fullwidth'
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'minimal', 'centered', 'stacked'],
			description: 'Visual variant of the footer'
		},
		brandName: {
			control: 'text',
			description: 'Company or brand name'
		},
		brandDescription: {
			control: 'text',
			description: 'Brand description or tagline'
		},
		copyright: {
			control: 'text',
			description: 'Copyright text'
		},
		showYear: {
			control: 'boolean',
			description: 'Show current year in copyright'
		}
	}
}

export default meta
type Story = StoryObj<typeof Footer>

const defaultSections = [
	{
		title: 'Product',
		links: [
			{ label: 'Features', href: '#features' },
			{ label: 'Pricing', href: '#pricing' },
			{ label: 'Documentation', href: '#docs' },
			{ label: 'API Reference', href: '#api' }
		]
	},
	{
		title: 'Company',
		links: [
			{ label: 'About Us', href: '#about' },
			{ label: 'Careers', href: '#careers' },
			{ label: 'Blog', href: '#blog' },
			{ label: 'Contact', href: '#contact' }
		]
	},
	{
		title: 'Resources',
		links: [
			{ label: 'Community', href: '#community' },
			{ label: 'Guides', href: '#guides' },
			{ label: 'Support', href: '#support' },
			{ label: 'Status', href: '#status' }
		]
	},
	{
		title: 'Legal',
		links: [
			{ label: 'Privacy Policy', href: '#privacy' },
			{ label: 'Terms of Service', href: '#terms' },
			{ label: 'Cookie Policy', href: '#cookies' },
			{ label: 'Licenses', href: '#licenses' }
		]
	}
]

const defaultSocialLinks = [
	{ platform: 'Twitter', href: 'https://twitter.com', icon: '𝕏' },
	{ platform: 'GitHub', href: 'https://github.com', icon: '⚡' },
	{ platform: 'LinkedIn', href: 'https://linkedin.com', icon: '💼' },
	{ platform: 'Discord', href: 'https://discord.com', icon: '💬' }
]

const defaultBottomLinks = [
	{ label: 'Privacy', href: '#privacy' },
	{ label: 'Terms', href: '#terms' },
	{ label: 'Cookies', href: '#cookies' }
]

export const Default: Story = {
	args: {
		variant: 'default',
		brandName: 'Acme Corp',
		brandLogo: '🚀',
		brandDescription: 'Building the future of web development with modern tools and technologies.',
		sections: defaultSections,
		socialLinks: defaultSocialLinks,
		showYear: true,
		bottomLinks: defaultBottomLinks
	}
}

export const Minimal: Story = {
	args: {
		variant: 'minimal',
		brandName: 'Acme',
		copyright: '© Acme Corporation',
		showYear: true,
		sections: [
			{
				title: 'Quick Links',
				links: [
					{ label: 'Home', href: '#home' },
					{ label: 'About', href: '#about' },
					{ label: 'Contact', href: '#contact' }
				]
			}
		],
		bottomLinks: [
			{ label: 'Privacy', href: '#privacy' },
			{ label: 'Terms', href: '#terms' }
		]
	}
}

export const Centered: Story = {
	args: {
		variant: 'centered',
		brandName: 'Acme',
		brandLogo: '✨',
		brandDescription: 'Empowering creators worldwide with innovative solutions.',
		sections: [
			{
				title: 'Product',
				links: [
					{ label: 'Features', href: '#features' },
					{ label: 'Pricing', href: '#pricing' }
				]
			},
			{
				title: 'Company',
				links: [
					{ label: 'About', href: '#about' },
					{ label: 'Careers', href: '#careers' }
				]
			},
			{
				title: 'Support',
				links: [
					{ label: 'Help Center', href: '#help' },
					{ label: 'Contact', href: '#contact' }
				]
			}
		],
		socialLinks: defaultSocialLinks,
		showYear: true,
		bottomLinks: defaultBottomLinks
	}
}

export const Stacked: Story = {
	args: {
		variant: 'stacked',
		brandName: 'Acme',
		brandDescription: 'Innovation through technology.',
		sections: defaultSections.slice(0, 2),
		socialLinks: defaultSocialLinks,
		showYear: true,
		bottomLinks: defaultBottomLinks
	}
}

export const WithCustomContent: Story = {
	args: {
		variant: 'default',
		brandName: 'Acme Corp',
		brandDescription: 'Building amazing products since 2024.',
		sections: defaultSections,
		showYear: true,
		children: (
			<div style={{
				padding: '1.5rem',
				background: 'rgba(99, 102, 241, 0.1)',
				borderRadius: '0.5rem',
				border: '1px solid rgba(99, 102, 241, 0.2)'
			}}>
				<h4 style={{ margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: 600 }}>
					Newsletter
				</h4>
				<p style={{ margin: '0 0 1rem', fontSize: '0.875rem', opacity: 0.8 }}>
					Stay updated with our latest news and updates.
				</p>
				<div style={{ display: 'flex', gap: '0.5rem' }}>
					<input
						type="email"
						placeholder="Enter your email"
						style={{
							flex: 1,
							padding: '0.5rem',
							borderRadius: '0.375rem',
							border: '1px solid rgba(255, 255, 255, 0.2)',
							background: 'rgba(255, 255, 255, 0.05)',
							color: 'inherit'
						}}
					/>
					<button
						type="button"
						style={{
							padding: '0.5rem 1rem',
							borderRadius: '0.375rem',
							border: 'none',
							background: '#6366f1',
							color: 'white',
							cursor: 'pointer',
							fontWeight: 600
						}}
					>
						Subscribe
					</button>
				</div>
			</div>
		)
	}
}

export const SimpleFooter: Story = {
	args: {
		variant: 'minimal',
		brandName: 'MyApp',
		copyright: '© MyApp Inc.',
		showYear: true,
		bottomLinks: [
			{ label: 'Privacy', href: '#privacy' },
			{ label: 'Terms', href: '#terms' }
		]
	}
}

export const WithExternalLinks: Story = {
	args: {
		variant: 'default',
		brandName: 'DevTools',
		brandDescription: 'Open source tools for developers.',
		sections: [
			{
				title: 'Resources',
				links: [
					{ label: 'Documentation', href: 'https://example.com/docs', external: true },
					{ label: 'GitHub', href: 'https://github.com', external: true },
					{ label: 'Blog', href: 'https://example.com/blog', external: true }
				]
			},
			{
				title: 'Community',
				links: [
					{ label: 'Discord', href: 'https://discord.com', external: true },
					{ label: 'Twitter', href: 'https://twitter.com', external: true },
					{ label: 'Forum', href: 'https://forum.example.com', external: true }
				]
			}
		],
		socialLinks: defaultSocialLinks,
		showYear: true
	}
}

export const ComprehensiveFooter: Story = {
	args: {
		variant: 'default',
		brandName: 'TechCorp',
		brandLogo: '⚡',
		brandDescription: 'Leading the way in digital innovation. Building products that make a difference.',
		sections: [
			{
				title: 'Product',
				links: [
					{ label: 'Features', href: '#features' },
					{ label: 'Pricing', href: '#pricing' },
					{ label: 'Use Cases', href: '#use-cases' },
					{ label: 'Integrations', href: '#integrations' },
					{ label: 'Changelog', href: '#changelog' }
				]
			},
			{
				title: 'Resources',
				links: [
					{ label: 'Documentation', href: '#docs' },
					{ label: 'Guides & Tutorials', href: '#guides' },
					{ label: 'API Reference', href: '#api' },
					{ label: 'Help Center', href: '#help' },
					{ label: 'Community', href: '#community' }
				]
			},
			{
				title: 'Company',
				links: [
					{ label: 'About Us', href: '#about' },
					{ label: 'Careers', href: '#careers' },
					{ label: 'Press Kit', href: '#press' },
					{ label: 'Partners', href: '#partners' },
					{ label: 'Contact', href: '#contact' }
				]
			},
			{
				title: 'Legal',
				links: [
					{ label: 'Privacy Policy', href: '#privacy' },
					{ label: 'Terms of Service', href: '#terms' },
					{ label: 'Cookie Policy', href: '#cookies' },
					{ label: 'Security', href: '#security' },
					{ label: 'Compliance', href: '#compliance' }
				]
			}
		],
		socialLinks: [
			{ platform: 'Twitter', href: 'https://twitter.com', icon: '𝕏' },
			{ platform: 'GitHub', href: 'https://github.com', icon: '⚡' },
			{ platform: 'LinkedIn', href: 'https://linkedin.com', icon: '💼' },
			{ platform: 'YouTube', href: 'https://youtube.com', icon: '📺' },
			{ platform: 'Discord', href: 'https://discord.com', icon: '💬' }
		],
		showYear: true,
		bottomLinks: [
			{ label: 'Privacy', href: '#privacy' },
			{ label: 'Terms', href: '#terms' },
			{ label: 'Cookies', href: '#cookies' },
			{ label: 'Accessibility', href: '#accessibility' }
		]
	}
}

export const NoBrand: Story = {
	args: {
		variant: 'default',
		sections: defaultSections,
		socialLinks: defaultSocialLinks,
		copyright: '© All rights reserved',
		showYear: true,
		bottomLinks: defaultBottomLinks
	}
}

export const SocialOnly: Story = {
	args: {
		variant: 'centered',
		brandName: 'SocialHub',
		brandLogo: '🌐',
		socialLinks: [
			{ platform: 'Twitter', href: 'https://twitter.com', icon: '𝕏' },
			{ platform: 'Instagram', href: 'https://instagram.com', icon: '📸' },
			{ platform: 'Facebook', href: 'https://facebook.com', icon: '👥' },
			{ platform: 'LinkedIn', href: 'https://linkedin.com', icon: '💼' },
			{ platform: 'YouTube', href: 'https://youtube.com', icon: '📺' },
			{ platform: 'TikTok', href: 'https://tiktok.com', icon: '🎵' }
		],
		showYear: true
	}
}
