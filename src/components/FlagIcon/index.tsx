import React, { useMemo } from 'react'
import flagData from './flagicons.json'

// Import all SVG files using Vite's import.meta.glob
const svgModules = import.meta.glob<string>('./svg/*.svg', {
	eager: true,
	import: 'default'
})

export interface FlagIconProps {
	flag: string
	width?: number
	height?: number
	className?: string
	title?: string
	style?: React.CSSProperties
	rounded?: boolean
}

export function FlagIcon({
	flag,
	width = 24,
	height = 24,
	className = '',
	title,
	style,
	rounded = false
}: FlagIconProps) {
	const flagInfo = useMemo(() => {
		return flagData.icons[flag as keyof typeof flagData.icons]
	}, [flag])

	const svgSrc = useMemo(() => {
		if (!flagInfo) return null
		const fileName = flagInfo.body.replace('./', '')
		const svgPath = `./${fileName}`
		return svgModules[svgPath]
	}, [flagInfo])

	if (!flagInfo || !svgSrc) {
		if (!flagInfo) {
			console.warn(`Flag "${flag}" not found in flagicons.json`)
		}
		return null
	}

	const flagTitle = title || flagInfo.name

	return (
		<span
			className={`flag-icon flag-icon-${flag} ${className}`}
			style={{
				display: 'inline-flex',
				width: `${width}px`,
				height: `${height}px`,
				borderRadius: rounded ? '4px' : '0',
				overflow: 'hidden',
				...style
			}}
			title={flagTitle}
			role="img"
			aria-label={flagTitle}
		>
			<img
				src={svgSrc}
				alt={flagTitle}
				style={{
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					display: 'block'
				}}
			/>
		</span>
	)
}

// Export all available flag codes
export const availableFlags = Object.keys(flagData.icons)

// Export flag information for easy lookup
export const getFlagInfo = (flagCode: string) => {
	const flagConfig = flagData.icons[flagCode as keyof typeof flagData.icons]
	return flagConfig
		? {
				code: flagCode,
				name: flagConfig.name,
				translation: flagConfig.translation
			}
		: null
}

// Helper to get all flags as an array with their info
export const getAllFlags = () => {
	return Object.entries(flagData.icons).map(([code, info]) => ({
		code,
		name: info.name,
		translation: info.translation
	}))
}
