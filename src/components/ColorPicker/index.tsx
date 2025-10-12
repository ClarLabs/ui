import React, { useState, useRef, useEffect } from 'react'
import styles from './styles.module.scss'

export type ColorFormat = 'hex' | 'rgb' | 'hsl'

export interface ColorPickerProps {
	/** Current color value */
	value?: string
	/** Default color value */
	defaultValue?: string
	/** Callback when color changes */
	onChange?: (color: string) => void
	/** Color format */
	format?: ColorFormat
	/** Label for the picker */
	label?: string
	/** Whether the picker is disabled */
	disabled?: boolean
	/** Show preset colors */
	showPresets?: boolean
	/** Custom preset colors */
	presets?: string[]
	/** Show alpha channel */
	showAlpha?: boolean
	/** Custom className */
	className?: string
	/** Helper text */
	helperText?: string
	/** Error message */
	error?: string
}

// Helper functions for color conversion
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
			}
		: null
}

const rgbToHex = (r: number, g: number, b: number): string => {
	return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')
}

const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
	r /= 255
	g /= 255
	b /= 255
	const max = Math.max(r, g, b)
	const min = Math.min(r, g, b)
	let h = 0
	let s = 0
	const l = (max + min) / 2

	if (max !== min) {
		const d = max - min
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
		switch (max) {
			case r:
				h = ((g - b) / d + (g < b ? 6 : 0)) / 6
				break
			case g:
				h = ((b - r) / d + 2) / 6
				break
			case b:
				h = ((r - g) / d + 4) / 6
				break
		}
	}

	return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

export function ColorPicker({
	value: controlledValue,
	defaultValue = '#6366f1',
	onChange,
	format = 'hex',
	label,
	disabled = false,
	showPresets = true,
	presets = ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#ec4899'],
	showAlpha = false,
	className = '',
	helperText,
	error
}: ColorPickerProps) {
	const [internalValue, setInternalValue] = useState(defaultValue)
	const [isOpen, setIsOpen] = useState(false)
	const pickerRef = useRef<HTMLDivElement>(null)

	const currentColor = controlledValue !== undefined ? controlledValue : internalValue

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen])

	const handleColorChange = (newColor: string) => {
		if (controlledValue === undefined) {
			setInternalValue(newColor)
		}
		onChange?.(newColor)
	}

	const formatColor = (color: string): string => {
		const rgb = hexToRgb(color)
		if (!rgb) return color

		switch (format) {
			case 'rgb':
				return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
			case 'hsl':
				const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
				return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
			default:
				return color
		}
	}

	const containerClasses = [styles.colorPickerContainer, className].filter(Boolean).join(' ')

	return (
		<div className={containerClasses}>
			{label && <label className={styles.label}>{label}</label>}

			<div className={styles.inputWrapper} ref={pickerRef}>
				<button
					type="button"
					className={`${styles.colorButton} ${disabled ? styles.disabled : ''}`}
					onClick={() => !disabled && setIsOpen(!isOpen)}
					disabled={disabled}
					style={{ backgroundColor: currentColor }}
					aria-label="Select color"
				>
					<span className={styles.colorPreview} style={{ backgroundColor: currentColor }} />
				</button>

				<input
					type="text"
					className={styles.colorInput}
					value={formatColor(currentColor)}
					onChange={(e) => handleColorChange(e.target.value)}
					disabled={disabled}
					placeholder="#000000"
				/>

				{isOpen && !disabled && (
					<div className={styles.popover}>
						<div className={styles.pickerContent}>
							{/* Native color picker */}
							<input
								type="color"
								className={styles.nativeColorPicker}
								value={currentColor}
								onChange={(e) => handleColorChange(e.target.value)}
							/>

							{/* Preset colors */}
							{showPresets && (
								<div className={styles.presets}>
									<div className={styles.presetsLabel}>Presets</div>
									<div className={styles.presetsGrid}>
										{presets.map((preset) => (
											<button
												key={preset}
												type="button"
												className={`${styles.presetButton} ${preset === currentColor ? styles.active : ''}`}
												style={{ backgroundColor: preset }}
												onClick={() => handleColorChange(preset)}
												aria-label={`Select ${preset}`}
											/>
										))}
									</div>
								</div>
							)}

							{/* Quick colors */}
							<div className={styles.quickColors}>
								<div className={styles.quickColorsLabel}>Quick Colors</div>
								<div className={styles.quickColorsGrid}>
									<button
										type="button"
										className={styles.quickColorButton}
										style={{ backgroundColor: '#000000' }}
										onClick={() => handleColorChange('#000000')}
									/>
									<button
										type="button"
										className={styles.quickColorButton}
										style={{ backgroundColor: '#ffffff' }}
										onClick={() => handleColorChange('#ffffff')}
									/>
									<button
										type="button"
										className={styles.quickColorButton}
										style={{ backgroundColor: '#808080' }}
										onClick={() => handleColorChange('#808080')}
									/>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			{(error || helperText) && (
				<span className={`${styles.helperText} ${error ? styles.errorText : ''}`}>{error || helperText}</span>
			)}
		</div>
	)
}
