import React from 'react'
import styles from './styles.module.scss'

export type SpacerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
export type SpacerAxis = 'horizontal' | 'vertical' | 'both'

export interface SpacerProps {
	/** Size of the spacer */
	size?: SpacerSize
	/** Direction of spacing */
	axis?: SpacerAxis
	/** Custom spacing value (overrides size) */
	spacing?: string | number
	/** Custom className */
	className?: string
}

export function Spacer({ size = 'md', axis = 'vertical', spacing, className = '' }: SpacerProps) {
	const classes = [styles.spacer, styles[`size-${size}`], styles[`axis-${axis}`], className].filter(Boolean).join(' ')

	const customStyle: React.CSSProperties = {}

	if (spacing !== undefined) {
		const spacingValue = typeof spacing === 'number' ? `${spacing}px` : spacing

		switch (axis) {
			case 'horizontal':
				customStyle.width = spacingValue
				customStyle.height = 0
				break
			case 'vertical':
				customStyle.height = spacingValue
				customStyle.width = 0
				break
			case 'both':
				customStyle.width = spacingValue
				customStyle.height = spacingValue
				break
		}
	}

	return <div className={classes} style={customStyle} aria-hidden="true" />
}
