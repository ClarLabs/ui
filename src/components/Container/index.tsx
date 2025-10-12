import React from 'react'
import styles from './styles.module.scss'

export type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
export type ContainerPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Maximum width of the container */
	size?: ContainerSize
	/** Padding on the sides */
	padding?: ContainerPadding
	/** Whether to center the container */
	centered?: boolean
	/** Whether the container should be fluid (no max-width) */
	fluid?: boolean
	/** Custom className */
	className?: string
	/** Children */
	children: React.ReactNode
}

export function Container({ size = 'lg', padding = 'md', centered = true, fluid = false, className = '', children, ...props }: ContainerProps) {
	const classes = [
		styles.container,
		!fluid && styles[`size-${size}`],
		styles[`padding-${padding}`],
		centered && styles.centered,
		fluid && styles.fluid,
		className
	]
		.filter(Boolean)
		.join(' ')

	return (
		<div className={classes} {...props}>
			{children}
		</div>
	)
}
