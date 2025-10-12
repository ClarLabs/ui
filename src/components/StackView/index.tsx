import React from 'react'
import styles from './styles.module.scss'

export type StackViewDirection = 'horizontal' | 'vertical'
export type StackViewAlign = 'start' | 'center' | 'end' | 'stretch'
export type StackViewJustify = 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'
export type StackViewSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface StackViewProps {
	children: React.ReactNode
	direction?: StackViewDirection
	align?: StackViewAlign
	justify?: StackViewJustify
	spacing?: StackViewSpacing
	wrap?: boolean
	className?: string
	style?: React.CSSProperties
}

export function StackView({
	children,
	direction = 'horizontal',
	align = 'start',
	justify = 'start',
	spacing = 'md',
	wrap = false,
	className = '',
	style
}: StackViewProps) {
	return (
		<div
			className={`${styles.stackView} ${styles[direction]} ${styles[`align-${align}`]} ${styles[`justify-${justify}`]} ${styles[`spacing-${spacing}`]} ${wrap ? styles.wrap : ''} ${className}`}
			style={style}
		>
			{children}
		</div>
	)
}
