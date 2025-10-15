import React, { useMemo } from 'react'
import iconData from './line-md.json'
import styles from './styles.module.scss'

export interface AnimatedIconProps {
	icon: string
	width?: number
	height?: number
	duration?: number
	disableAnimation?: boolean
	darkModeColor?: string
	lightModeColor?: string
	strokeWidth?: number
	className?: string
}

export function AnimatedIcon({
	icon,
	width = 24,
	height = 24,
	duration = 1,
	disableAnimation = false,
	darkModeColor = '#c7d2fe',
	lightModeColor = '#4338ca',
	strokeWidth = 2,
	className = ''
}: AnimatedIconProps) {
	const iconBody = useMemo(() => {
		const iconConfig = iconData.icons[icon as keyof typeof iconData.icons]
		if (!iconConfig) {
			console.warn(`Icon "${icon}" not found in line-md.json`)
			return ''
		}
		return iconConfig.body
	}, [icon])

	const svgContent = useMemo(() => {
		if (!iconBody) return ''

		let processedContent = iconBody

		// Replace currentColor with var(--icon-color) to use CSS custom property
		processedContent = processedContent.replace(/currentColor/g, 'var(--icon-color)')

		// Replace stroke-width values if strokeWidth is different from default
		if (strokeWidth !== 2) {
			processedContent = processedContent.replace(/stroke-width="2"/g, `stroke-width="${strokeWidth}"`)
		}

		// Handle animation disabling
		if (disableAnimation) {
			// Remove all animate tags
			processedContent = processedContent.replace(/<animate[^>]*>[^<]*<\/animate>/g, '')
			processedContent = processedContent.replace(/<animate[^>]*\/>/g, '')

			// Set all stroke-dashoffset to 0 to show the complete icon
			processedContent = processedContent.replace(/stroke-dashoffset="[^"]*"/g, 'stroke-dashoffset="0"')
		} else if (duration !== 1) {
			// Scale animation durations
			processedContent = processedContent.replace(/dur="([0-9.]+)s"/g, (_match, dur) => {
				const scaledDur = parseFloat(dur) * duration
				return `dur="${scaledDur}s"`
			})

			// Scale animation begin times
			processedContent = processedContent.replace(/begin="([0-9.]+)s"/g, (_match, beginTime) => {
				const scaledBegin = parseFloat(beginTime) * duration
				return `begin="${scaledBegin}s"`
			})
		}

		return processedContent
	}, [iconBody, strokeWidth, disableAnimation, duration])

	if (!iconBody) {
		return null
	}

	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			className={`${styles.animatedIcon} ${className}`}
			style={
				{
					'--icon-dark-color': darkModeColor,
					'--icon-light-color': lightModeColor
				} as React.CSSProperties
			}
			dangerouslySetInnerHTML={{ __html: svgContent }}
		/>
	)
}

// Export all available icon names
export const availableIcons = Object.keys(iconData.icons)
