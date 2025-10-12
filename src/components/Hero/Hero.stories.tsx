import type { Meta, StoryObj } from '@storybook/react'
import { Hero } from './index'

const meta: Meta<typeof Hero> = {
	title: 'Components/Hero',
	component: Hero,
	parameters: {
		layout: 'fullscreen'
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'gradient', 'image', 'video', 'split', 'centered', 'minimal'],
			description: 'Visual variant of the hero'
		},
		size: {
			control: 'select',
			options: ['small', 'medium', 'large', 'fullscreen'],
			description: 'Size of the hero section'
		},
		alignment: {
			control: 'select',
			options: ['left', 'center', 'right'],
			description: 'Content alignment'
		},
		title: {
			control: 'text',
			description: 'Hero title'
		},
		subtitle: {
			control: 'text',
			description: 'Hero subtitle or description'
		},
		backgroundImage: {
			control: 'text',
			description: 'Background image URL'
		},
		overlayOpacity: {
			control: { type: 'range', min: 0, max: 1, step: 0.1 },
			description: 'Background overlay opacity'
		},
		imagePosition: {
			control: 'select',
			options: ['left', 'right'],
			description: 'Image position for split variant'
		}
	}
}

export default meta
type Story = StoryObj<typeof Hero>

export const Default: Story = {
	args: {
		variant: 'default',
		size: 'large',
		alignment: 'center',
		title: 'Welcome to Our Platform',
		subtitle: 'Build amazing experiences with our comprehensive component library. Fast, accessible, and beautiful by default.',
		primaryAction: {
			label: 'Get Started',
			onClick: () => alert('Get Started clicked!')
		},
		secondaryAction: {
			label: 'Learn More',
			onClick: () => alert('Learn More clicked!')
		}
	}
}

export const Gradient: Story = {
	args: {
		variant: 'gradient',
		size: 'large',
		alignment: 'center',
		title: 'Beautiful Gradients',
		subtitle: 'Create stunning hero sections with smooth gradient backgrounds that captivate your audience.',
		primaryAction: {
			label: 'Explore',
			onClick: () => alert('Explore clicked!')
		}
	}
}

export const WithBackgroundImage: Story = {
	args: {
		variant: 'image',
		size: 'large',
		alignment: 'left',
		title: 'Your Journey Starts Here',
		subtitle: 'Discover endless possibilities with our powerful tools and intuitive design.',
		backgroundImage: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80',
		overlayOpacity: 0.6,
		primaryAction: {
			label: 'Start Now',
			onClick: () => alert('Start Now clicked!')
		},
		secondaryAction: {
			label: 'Watch Demo',
			onClick: () => alert('Watch Demo clicked!')
		}
	}
}

export const SplitWithImage: Story = {
	args: {
		variant: 'split',
		size: 'large',
		alignment: 'left',
		title: 'Modern Design System',
		subtitle: 'Build consistent, accessible, and beautiful user interfaces with our comprehensive component library.',
		image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
		imageAlt: 'Modern workspace',
		imagePosition: 'right',
		primaryAction: {
			label: 'Get Started',
			onClick: () => alert('Get Started clicked!')
		},
		secondaryAction: {
			label: 'View Components',
			onClick: () => alert('View Components clicked!')
		}
	}
}

export const SplitImageLeft: Story = {
	args: {
		variant: 'split',
		size: 'large',
		alignment: 'left',
		title: 'Collaborate Seamlessly',
		subtitle: 'Work together with your team in real-time. Share ideas, iterate quickly, and ship faster.',
		image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
		imageAlt: 'Team collaboration',
		imagePosition: 'left',
		primaryAction: {
			label: 'Start Collaborating',
			onClick: () => alert('Start Collaborating clicked!')
		}
	}
}

export const Minimal: Story = {
	args: {
		variant: 'minimal',
		size: 'medium',
		alignment: 'center',
		title: 'Simple and Clean',
		subtitle: 'Sometimes less is more. Focus on what matters.',
		primaryAction: {
			label: 'Learn More',
			onClick: () => alert('Learn More clicked!')
		}
	}
}

export const Small: Story = {
	args: {
		variant: 'default',
		size: 'small',
		alignment: 'left',
		title: 'Compact Hero',
		subtitle: 'Perfect for pages that need a smaller hero section.',
		primaryAction: {
			label: 'Action',
			onClick: () => alert('Action clicked!')
		}
	}
}

export const Fullscreen: Story = {
	args: {
		variant: 'gradient',
		size: 'fullscreen',
		alignment: 'center',
		title: 'Make a Bold Statement',
		subtitle: 'Full screen hero sections create maximum impact and engagement.',
		primaryAction: {
			label: 'Discover More',
			onClick: () => alert('Discover More clicked!')
		},
		secondaryAction: {
			label: 'Contact Us',
			onClick: () => alert('Contact Us clicked!')
		}
	}
}

export const WithCustomContent: Story = {
	args: {
		variant: 'default',
		size: 'large',
		alignment: 'center',
		title: 'Extensible Components',
		subtitle: 'Add any custom content you need below the main hero elements.',
		primaryAction: {
			label: 'Get Started',
			onClick: () => alert('Get Started clicked!')
		},
		children: (
			<div style={{
				marginTop: '2rem',
				padding: '1rem',
				background: 'rgba(255, 255, 255, 0.1)',
				borderRadius: '0.5rem',
				backdropFilter: 'blur(10px)'
			}}>
				<p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.9)' }}>
					Custom content area - add badges, features, stats, or anything else!
				</p>
			</div>
		)
	}
}

export const ProductLaunch: Story = {
	args: {
		variant: 'gradient',
		size: 'large',
		alignment: 'center',
		title: 'Introducing Our Latest Product',
		subtitle: 'Revolutionary features that will transform the way you work. Available now.',
		primaryAction: {
			label: 'Try for Free',
			onClick: () => alert('Try for Free clicked!')
		},
		secondaryAction: {
			label: 'See Pricing',
			onClick: () => alert('See Pricing clicked!')
		}
	}
}

export const ComingSoon: Story = {
	args: {
		variant: 'image',
		size: 'fullscreen',
		alignment: 'center',
		title: 'Something Amazing is Coming',
		subtitle: 'We are working on something special. Stay tuned for updates.',
		backgroundImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80',
		overlayOpacity: 0.7,
		primaryAction: {
			label: 'Notify Me',
			onClick: () => alert('Notify Me clicked!')
		}
	}
}

export const RightAligned: Story = {
	args: {
		variant: 'default',
		size: 'large',
		alignment: 'right',
		title: 'Align Your Content',
		subtitle: 'Choose left, center, or right alignment to match your design needs.',
		primaryAction: {
			label: 'Explore',
			onClick: () => alert('Explore clicked!')
		}
	}
}

export const WithLinks: Story = {
	args: {
		variant: 'gradient',
		size: 'large',
		alignment: 'center',
		title: 'Navigation Ready',
		subtitle: 'Use href instead of onClick for navigation buttons.',
		primaryAction: {
			label: 'Documentation',
			href: '#docs'
		},
		secondaryAction: {
			label: 'Examples',
			href: '#examples'
		}
	}
}
