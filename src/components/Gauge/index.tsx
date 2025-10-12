import React, { useMemo } from 'react'
import styles from './styles.module.scss'

export type GaugeSize = 'sm' | 'md' | 'lg' | 'xl'
export type GaugeVariant = 'default' | 'success' | 'warning' | 'error' | 'info'

export interface GaugeProps {
	/** Current value */
	value: number
	/** Minimum value */
	min?: number
	/** Maximum value */
	max?: number
	/** Size of the gauge */
	size?: GaugeSize
	/** Visual variant (color scheme) */
	variant?: GaugeVariant
	/** Thickness of the gauge arc */
	thickness?: number
	/** Label to display in the center */
	label?: string
	/** Show the numeric value */
	showValue?: boolean
	/** Custom value formatter */
	valueFormatter?: (value: number) => string
	/** Show min/max labels */
	showMinMax?: boolean
	/** Start angle in degrees (0 = top, 90 = right) */
	startAngle?: number
	/** End angle in degrees */
	endAngle?: number
	/** Whether to animate the gauge */
	animate?: boolean
	/** Custom className */
	className?: string
	/** Unit to display after the value */
	unit?: string
}

export function Gauge({
	value,
	min = 0,
	max = 100,
	size = 'md',
	variant = 'default',
	thickness = 12,
	label,
	showValue = true,
	valueFormatter,
	showMinMax = false,
	startAngle = -135,
	endAngle = 135,
	animate = true,
	className = '',
	unit = ''
}: GaugeProps) {
	// Clamp value between min and max
	const clampedValue = Math.max(min, Math.min(max, value))

	// Calculate percentage
	const percentage = ((clampedValue - min) / (max - min)) * 100

	// Calculate stroke properties
	const radius = 50 - thickness / 2
	const circumference = 2 * Math.PI * radius

	// Calculate angles in radians
	const startAngleRad = (startAngle * Math.PI) / 180
	const endAngleRad = (endAngle * Math.PI) / 180
	const totalAngle = endAngleRad - startAngleRad
	const currentAngle = startAngleRad + (totalAngle * percentage) / 100

	// Calculate arc path
	const startX = 50 + radius * Math.sin(startAngleRad)
	const startY = 50 - radius * Math.cos(startAngleRad)
	const endX = 50 + radius * Math.sin(endAngleRad)
	const endY = 50 - radius * Math.cos(endAngleRad)

	// Calculate current position
	const currentX = 50 + radius * Math.sin(currentAngle)
	const currentY = 50 - radius * Math.cos(currentAngle)

	// Determine if arc should be large (> 180 degrees)
	const largeArcFlag = Math.abs(endAngle - startAngle) > 180 ? 1 : 0
	const largeArcFlagCurrent = (percentage / 100) * Math.abs(endAngle - startAngle) > 180 ? 1 : 0

	// Create path for background arc
	const backgroundPath = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`

	// Create path for value arc
	const valuePath = percentage > 0 ? `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlagCurrent} 1 ${currentX} ${currentY}` : ''

	// Format value
	const displayValue = valueFormatter ? valueFormatter(clampedValue) : clampedValue.toFixed(0)

	const containerClasses = [styles.gaugeContainer, styles[size], className].filter(Boolean).join(' ')

	const variantColors: Record<GaugeVariant, string> = {
		default: 'rgba(99, 102, 241, 0.8)',
		success: 'rgba(34, 197, 94, 0.8)',
		warning: 'rgba(251, 191, 36, 0.8)',
		error: 'rgba(239, 68, 68, 0.8)',
		info: 'rgba(59, 130, 246, 0.8)'
	}

	return (
		<div className={containerClasses}>
			<svg className={styles.svg} viewBox="0 0 100 100">
				{/* Background arc */}
				<path
					d={backgroundPath}
					fill="none"
					stroke="rgba(255, 255, 255, 0.1)"
					strokeWidth={thickness}
					strokeLinecap="round"
				/>

				{/* Value arc */}
				{percentage > 0 && (
					<path
						d={valuePath}
						fill="none"
						stroke={variantColors[variant]}
						strokeWidth={thickness}
						strokeLinecap="round"
						className={animate ? styles.animatedPath : ''}
						style={{
							strokeDasharray: circumference,
							strokeDashoffset: circumference * (1 - percentage / 100)
						}}
					/>
				)}

				{/* Center text */}
				<g className={styles.centerText}>
					{showValue && (
						<text x="50" y={label ? "45" : "52"} className={styles.value}>
							{displayValue}
							{unit && <tspan className={styles.unit}>{unit}</tspan>}
						</text>
					)}
					{label && (
						<text x="50" y={showValue ? "60" : "52"} className={styles.label}>
							{label}
						</text>
					)}
				</g>
			</svg>

			{/* Min/Max labels */}
			{showMinMax && (
				<div className={styles.minMaxLabels}>
					<span className={styles.minLabel}>{min}</span>
					<span className={styles.maxLabel}>{max}</span>
				</div>
			)}
		</div>
	)
}
