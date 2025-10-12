import type { Preview, Decorator } from '@storybook/react-vite'
import React, { useEffect } from 'react'
import '../src/styles/global.scss'

// Decorator to sync background with light-mode class
export const withTheme: Decorator = (Story, context) => {
	const background = context.globals.backgrounds?.value
	const root = document.getElementById('root') || document.documentElement
	const isLight = background === 'light'
	const Wrapper: React.FC = () => {
		useEffect(() => {
			if (isLight) root.classList.add('light-mode')
			else root.classList.remove('light-mode')
		}, [background])

		return <Story />
	}

	return <Wrapper />
}

const preview: Preview = {
	decorators: [withTheme],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},
		backgrounds: {
			default: 'dark',
			values: [
				{
					name: 'dark',
					value: '#1a1a1a'
				},
				{
					name: 'light',
					value: '#f5f5f5'
				}
			]
		}
	}
}

export default preview
