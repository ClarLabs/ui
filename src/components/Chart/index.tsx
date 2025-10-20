import React, { useMemo } from 'react'
import styles from './styles.module.scss'

export type ChartType = 'line' | 'bar' | 'area' | 'pie' | 'doughnut'

export interface ChartDataPoint {
	label: string
	value: number
	lightColor?: string
	darkColor?: string
}

export interface ChartDataset {
	label: string
	data: number[]
	lightColor?: string
	darkColor?: string
}

export interface ChartProps {
	type: ChartType
	/** For line, bar, and area charts - array of datasets */
	datasets?: ChartDataset[]
	/** For pie and doughnut charts - array of data points */
	data?: ChartDataPoint[]
	/** Labels for x-axis (for line, bar, area) */
	labels?: string[]
	/** Chart title */
	title?: string
	/** Show legend */
	showLegend?: boolean
	/** Show grid lines */
	showGrid?: boolean
	/** Show values on data points/bars */
	showValues?: boolean
	/** Height of the chart in pixels */
	height?: number
	/** Custom className */
	className?: string
	/** Animate chart on mount */
	animate?: boolean
	/** Curve for line and area charts */
	smooth?: boolean
}

// Default color palette
const defaultColors = {
	light: [
		'rgba(99, 102, 241, 0.8)',
		'rgba(34, 197, 94, 0.8)',
		'rgba(251, 191, 36, 0.8)',
		'rgba(239, 68, 68, 0.8)',
		'rgba(59, 130, 246, 0.8)',
		'rgba(168, 85, 247, 0.8)',
		'rgba(236, 72, 153, 0.8)',
		'rgba(20, 184, 166, 0.8)'
	],
	dark: [
		'rgba(129, 140, 248, 0.9)',
		'rgba(74, 222, 128, 0.9)',
		'rgba(253, 224, 71, 0.9)',
		'rgba(248, 113, 113, 0.9)',
		'rgba(96, 165, 250, 0.9)',
		'rgba(196, 181, 253, 0.9)',
		'rgba(244, 114, 182, 0.9)',
		'rgba(45, 212, 191, 0.9)'
	]
}

function getColor(index: number, customLightColor?: string, customDarkColor?: string, isDark?: boolean): string {
	if (isDark && customDarkColor) return customDarkColor
	if (!isDark && customLightColor) return customLightColor

	const colors = isDark ? defaultColors.dark : defaultColors.light
	return colors[index % colors.length]
}

function generatePath(points: { x: number; y: number }[], smooth: boolean): string {
	if (points.length === 0) return ''
	if (points.length === 1) return `M ${points[0].x} ${points[0].y}`

	if (!smooth) {
		return points.reduce((path, point, index) => {
			return index === 0 ? `M ${point.x} ${point.y}` : `${path} L ${point.x} ${point.y}`
		}, '')
	}

	// Smooth curve using bezier curves
	let path = `M ${points[0].x} ${points[0].y}`

	for (let i = 0; i < points.length - 1; i++) {
		const current = points[i]
		const next = points[i + 1]
		const controlX = (current.x + next.x) / 2

		path += ` Q ${controlX} ${current.y}, ${controlX} ${(current.y + next.y) / 2}`
		path += ` Q ${controlX} ${next.y}, ${next.x} ${next.y}`
	}

	return path
}

export function Chart({
	type,
	datasets = [],
	data = [],
	labels = [],
	title,
	showLegend = true,
	showGrid = true,
	showValues = false,
	height = 300,
	className = '',
	animate = true,
	smooth = true
}: ChartProps) {
	const chartData = useMemo(() => {
		if (type === 'pie' || type === 'doughnut') {
			const total = data.reduce((sum, item) => sum + item.value, 0)
			let currentAngle = -90

			return data.map((item, index) => {
				const percentage = (item.value / total) * 100
				const angle = (percentage / 100) * 360
				const startAngle = currentAngle
				const endAngle = currentAngle + angle
				currentAngle = endAngle

				return {
					...item,
					percentage,
					startAngle,
					endAngle
				}
			})
		}

		return null
	}, [type, data])

	const renderLineChart = () => {
		const chartWidth = 800
		const chartHeight = height - 60
		const padding = { top: 20, right: 20, bottom: 40, left: 50 }
		const plotWidth = chartWidth - padding.left - padding.right
		const plotHeight = chartHeight - padding.top - padding.bottom

		// Calculate scales
		const maxValue = Math.max(...datasets.flatMap(ds => ds.data))
		const minValue = Math.min(...datasets.flatMap(ds => ds.data), 0)
		const yScale = plotHeight / (maxValue - minValue)
		const xStep = plotWidth / (labels.length - 1)

		return (
			<svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} className={styles.svg}>
				{/* Grid lines */}
				{showGrid && (
					<g className={styles.grid}>
						{[0, 1, 2, 3, 4].map((i) => {
							const y = padding.top + (plotHeight / 4) * i
							return (
								<line
									key={`grid-${i}`}
									x1={padding.left}
									y1={y}
									x2={chartWidth - padding.right}
									y2={y}
									className={styles.gridLine}
								/>
							)
						})}
					</g>
				)}

				{/* Y-axis labels */}
				<g className={styles.yAxis}>
					{[0, 1, 2, 3, 4].map((i) => {
						const value = maxValue - ((maxValue - minValue) / 4) * i
						const y = padding.top + (plotHeight / 4) * i
						return (
							<text key={`y-${i}`} x={padding.left - 10} y={y + 5} className={styles.axisLabel}>
								{value.toFixed(0)}
							</text>
						)
					})}
				</g>

				{/* X-axis labels */}
				<g className={styles.xAxis}>
					{labels.map((label, i) => {
						const x = padding.left + xStep * i
						return (
							<text key={`x-${i}`} x={x} y={chartHeight - 10} className={styles.axisLabel}>
								{label}
							</text>
						)
					})}
				</g>

				{/* Data lines */}
				{datasets.map((dataset, datasetIndex) => {
					const points = dataset.data.map((value, i) => ({
						x: padding.left + xStep * i,
						y: padding.top + plotHeight - (value - minValue) * yScale
					}))

					const path = generatePath(points, smooth)
					const color = getColor(datasetIndex, dataset.lightColor, dataset.darkColor)

					return (
						<g key={datasetIndex}>
							<path
								d={path}
								fill="none"
								stroke={color}
								strokeWidth="3"
								className={animate ? styles.animatedLine : ''}
							/>
							{/* Data points */}
							{points.map((point, i) => (
								<circle
									key={`point-${datasetIndex}-${i}`}
									cx={point.x}
									cy={point.y}
									r="4"
									fill={color}
									className={styles.dataPoint}
								/>
							))}
							{/* Values */}
							{showValues && points.map((point, i) => (
								<text
									key={`value-${datasetIndex}-${i}`}
									x={point.x}
									y={point.y - 10}
									className={styles.valueLabel}
								>
									{dataset.data[i]}
								</text>
							))}
						</g>
					)
				})}
			</svg>
		)
	}

	const renderAreaChart = () => {
		const chartWidth = 800
		const chartHeight = height - 60
		const padding = { top: 20, right: 20, bottom: 40, left: 50 }
		const plotWidth = chartWidth - padding.left - padding.right
		const plotHeight = chartHeight - padding.top - padding.bottom

		const maxValue = Math.max(...datasets.flatMap(ds => ds.data))
		const minValue = Math.min(...datasets.flatMap(ds => ds.data), 0)
		const yScale = plotHeight / (maxValue - minValue)
		const xStep = plotWidth / (labels.length - 1)
		const baselineY = padding.top + plotHeight - (0 - minValue) * yScale

		return (
			<svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} className={styles.svg}>
				{showGrid && (
					<g className={styles.grid}>
						{[0, 1, 2, 3, 4].map((i) => {
							const y = padding.top + (plotHeight / 4) * i
							return (
								<line key={`grid-${i}`} x1={padding.left} y1={y} x2={chartWidth - padding.right} y2={y} className={styles.gridLine} />
							)
						})}
					</g>
				)}

				<g className={styles.yAxis}>
					{[0, 1, 2, 3, 4].map((i) => {
						const value = maxValue - ((maxValue - minValue) / 4) * i
						const y = padding.top + (plotHeight / 4) * i
						return (
							<text key={`y-${i}`} x={padding.left - 10} y={y + 5} className={styles.axisLabel}>
								{value.toFixed(0)}
							</text>
						)
					})}
				</g>

				<g className={styles.xAxis}>
					{labels.map((label, i) => (
						<text key={`x-${i}`} x={padding.left + xStep * i} y={chartHeight - 10} className={styles.axisLabel}>
							{label}
						</text>
					))}
				</g>

				{datasets.map((dataset, datasetIndex) => {
					const points = dataset.data.map((value, i) => ({
						x: padding.left + xStep * i,
						y: padding.top + plotHeight - (value - minValue) * yScale
					}))

					const linePath = generatePath(points, smooth)
					const areaPath = `${linePath} L ${points[points.length - 1].x} ${baselineY} L ${points[0].x} ${baselineY} Z`
					const color = getColor(datasetIndex, dataset.lightColor, dataset.darkColor)

					return (
						<g key={datasetIndex}>
							<path
								d={areaPath}
								fill={color.replace('0.8', '0.3').replace('0.9', '0.3')}
								className={animate ? styles.animatedArea : ''}
							/>
							<path d={linePath} fill="none" stroke={color} strokeWidth="2" />
						</g>
					)
				})}
			</svg>
		)
	}

	const renderBarChart = () => {
		const chartWidth = 800
		const chartHeight = height - 60
		const padding = { top: 20, right: 20, bottom: 40, left: 50 }
		const plotWidth = chartWidth - padding.left - padding.right
		const plotHeight = chartHeight - padding.top - padding.bottom

		const maxValue = Math.max(...datasets.flatMap(ds => ds.data))
		const minValue = Math.min(...datasets.flatMap(ds => ds.data), 0)
		const yScale = plotHeight / (maxValue - minValue)
		const barGroupWidth = plotWidth / labels.length
		const barWidth = barGroupWidth / datasets.length * 0.8
		const baselineY = padding.top + plotHeight - (0 - minValue) * yScale

		return (
			<svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} className={styles.svg}>
				{showGrid && (
					<g className={styles.grid}>
						{[0, 1, 2, 3, 4].map((i) => {
							const y = padding.top + (plotHeight / 4) * i
							return (
								<line key={`grid-${i}`} x1={padding.left} y1={y} x2={chartWidth - padding.right} y2={y} className={styles.gridLine} />
							)
						})}
					</g>
				)}

				<g className={styles.yAxis}>
					{[0, 1, 2, 3, 4].map((i) => {
						const value = maxValue - ((maxValue - minValue) / 4) * i
						const y = padding.top + (plotHeight / 4) * i
						return (
							<text key={`y-${i}`} x={padding.left - 10} y={y + 5} className={styles.axisLabel}>
								{value.toFixed(0)}
							</text>
						)
					})}
				</g>

				<g className={styles.xAxis}>
					{labels.map((label, i) => {
						const x = padding.left + barGroupWidth * i + barGroupWidth / 2
						return (
							<text key={`x-${i}`} x={x} y={chartHeight - 10} className={styles.axisLabel}>
								{label}
							</text>
						)
					})}
				</g>

				{datasets.map((dataset, datasetIndex) => {
					const color = getColor(datasetIndex, dataset.lightColor, dataset.darkColor)

					return (
						<g key={datasetIndex}>
							{dataset.data.map((value, i) => {
								const x = padding.left + barGroupWidth * i + barWidth * datasetIndex + (barGroupWidth - barWidth * datasets.length) / 2
								const barHeight = Math.abs(value) * yScale
								const y = value >= 0 ? baselineY - barHeight : baselineY

								return (
									<g key={`bar-${datasetIndex}-${i}`}>
										<rect
											x={x}
											y={y}
											width={barWidth}
											height={barHeight}
											fill={color}
											className={animate ? styles.animatedBar : ''}
										/>
										{showValues && (
											<text
												x={x + barWidth / 2}
												y={y - 5}
												className={styles.valueLabel}
											>
												{value}
											</text>
										)}
									</g>
								)
							})}
						</g>
					)
				})}
			</svg>
		)
	}

	const renderPieChart = () => {
		const size = 300
		const center = size / 2
		const radius = size / 2 - 20
		const innerRadius = type === 'doughnut' ? radius * 0.6 : 0

		return (
			<svg width="100%" height={height - 60} viewBox={`0 0 ${size} ${size}`} className={styles.svg}>
				{chartData?.map((item, index) => {
					const startAngle = (item.startAngle * Math.PI) / 180
					const endAngle = (item.endAngle * Math.PI) / 180

					const x1 = center + radius * Math.cos(startAngle)
					const y1 = center + radius * Math.sin(startAngle)
					const x2 = center + radius * Math.cos(endAngle)
					const y2 = center + radius * Math.sin(endAngle)

					const largeArc = item.endAngle - item.startAngle > 180 ? 1 : 0

					let path: string
					if (type === 'doughnut') {
						const x1Inner = center + innerRadius * Math.cos(startAngle)
						const y1Inner = center + innerRadius * Math.sin(startAngle)
						const x2Inner = center + innerRadius * Math.cos(endAngle)
						const y2Inner = center + innerRadius * Math.sin(endAngle)

						path = `
							M ${x1} ${y1}
							A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
							L ${x2Inner} ${y2Inner}
							A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x1Inner} ${y1Inner}
							Z
						`
					} else {
						path = `
							M ${center} ${center}
							L ${x1} ${y1}
							A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
							Z
						`
					}

					const color = getColor(index, item.lightColor, item.darkColor)
					const labelAngle = (startAngle + endAngle) / 2
					const labelRadius = type === 'doughnut' ? (radius + innerRadius) / 2 : radius * 0.7
					const labelX = center + labelRadius * Math.cos(labelAngle)
					const labelY = center + labelRadius * Math.sin(labelAngle)

					return (
						<g key={index}>
							<path
								d={path}
								fill={color}
								className={`${styles.pieSlice} ${animate ? styles.animatedPie : ''}`}
							/>
							{showValues && item.percentage > 5 && (
								<text x={labelX} y={labelY} className={styles.pieLabel}>
									{item.percentage.toFixed(1)}%
								</text>
							)}
						</g>
					)
				})}
			</svg>
		)
	}

	const renderChart = () => {
		switch (type) {
			case 'line':
				return renderLineChart()
			case 'area':
				return renderAreaChart()
			case 'bar':
				return renderBarChart()
			case 'pie':
			case 'doughnut':
				return renderPieChart()
			default:
				return null
		}
	}

	return (
		<div className={`${styles.chartContainer} ${className}`} style={{ height }}>
			{title && <h3 className={styles.title}>{title}</h3>}
			<div className={styles.chartWrapper}>
				{renderChart()}
			</div>
			{showLegend && (
				<div className={styles.legend}>
					{type === 'pie' || type === 'doughnut' ? (
						data.map((item, index) => (
							<div key={index} className={styles.legendItem}>
								<span
									className={styles.legendColor}
									style={{ backgroundColor: getColor(index, item.lightColor, item.darkColor) }}
								/>
								<span className={styles.legendLabel}>
									{item.label}: {item.value}
								</span>
							</div>
						))
					) : (
						datasets.map((dataset, index) => (
							<div key={index} className={styles.legendItem}>
								<span
									className={styles.legendColor}
									style={{ backgroundColor: getColor(index, dataset.lightColor, dataset.darkColor) }}
								/>
								<span className={styles.legendLabel}>{dataset.label}</span>
							</div>
						))
					)}
				</div>
			)}
		</div>
	)
}
