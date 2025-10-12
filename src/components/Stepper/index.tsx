import React from 'react'
import styles from './styles.module.scss'

export type StepperOrientation = 'horizontal' | 'vertical'

export interface StepperStep {
	label: string
	description?: string
	icon?: React.ReactNode
}

export interface StepperProps {
	steps: StepperStep[]
	currentStep: number
	orientation?: StepperOrientation
	onStepClick?: (index: number) => void
	className?: string
}

export function Stepper({ steps, currentStep, orientation = 'horizontal', onStepClick, className = '' }: StepperProps) {
	return (
		<div className={`${styles.stepper} ${styles[orientation]} ${className}`}>
			{steps.map((step, index) => {
				const isCompleted = index < currentStep
				const isCurrent = index === currentStep
				const isClickable = onStepClick && (isCompleted || isCurrent)

				return (
					<React.Fragment key={index}>
						<div
							className={`${styles.step} ${isCompleted ? styles.completed : ''} ${isCurrent ? styles.current : ''} ${isClickable ? styles.clickable : ''}`}
							onClick={() => isClickable && onStepClick(index)}
						>
							<div className={styles.stepIndicator}>
								{isCompleted ? (
									<span className={styles.checkmark}>✓</span>
								) : step.icon ? (
									step.icon
								) : (
									<span className={styles.stepNumber}>{index + 1}</span>
								)}
							</div>
							<div className={styles.stepContent}>
								<div className={styles.stepLabel}>{step.label}</div>
								{step.description && <div className={styles.stepDescription}>{step.description}</div>}
							</div>
						</div>
						{index < steps.length - 1 && <div className={`${styles.connector} ${isCompleted ? styles.completed : ''}`}></div>}
					</React.Fragment>
				)
			})}
		</div>
	)
}
