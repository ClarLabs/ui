import type { Meta, StoryObj } from '@storybook/react'
import { Stepper } from './index'
import { useState } from 'react'
import { Button } from '../Button'

const steps = [
	{ label: 'Account', description: 'Create your account' },
	{ label: 'Profile', description: 'Setup your profile' },
	{ label: 'Preferences', description: 'Configure settings' },
	{ label: 'Complete', description: 'Review and finish' }
]

function InteractiveStepper() {
	const [currentStep, setCurrentStep] = useState(0)

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
			<Stepper steps={steps} currentStep={currentStep} onStepClick={setCurrentStep} />
			<div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
				<Button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0}>
					Previous
				</Button>
				<Button
					onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
					disabled={currentStep === steps.length - 1}
					variant="primary"
				>
					Next
				</Button>
			</div>
		</div>
	)
}

const meta = {
	title: 'Components/Stepper',
	component: Stepper,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs'],
	argTypes: {
		orientation: {
			control: 'select',
			options: ['horizontal', 'vertical']
		},
		currentStep: {
			control: { type: 'number', min: 0, max: 3 }
		}
	}
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

export const HorizontalFirstStep: Story = {
	args: {
		steps,
		currentStep: 0,
		orientation: 'horizontal'
	}
}

export const HorizontalSecondStep: Story = {
	args: {
		steps,
		currentStep: 1,
		orientation: 'horizontal'
	}
}

export const HorizontalLastStep: Story = {
	args: {
		steps,
		currentStep: 3,
		orientation: 'horizontal'
	}
}

export const Vertical: Story = {
	args: {
		steps,
		currentStep: 1,
		orientation: 'vertical'
	}
}

export const Clickable: Story = {
	args: {
		steps,
		currentStep: 2,
		orientation: 'horizontal',
		onStepClick: (index) => alert(`Clicked step ${index + 1}`)
	}
}

export const WithIcons: Story = {
	args: {
		steps: [
			{ label: 'Cart', description: 'Review items', icon: '🛒' },
			{ label: 'Shipping', description: 'Enter address', icon: '📦' },
			{ label: 'Payment', description: 'Payment details', icon: '💳' },
			{ label: 'Confirm', description: 'Review order', icon: '✓' }
		],
		currentStep: 1,
		orientation: 'horizontal'
	}
}

export const ManySteps: Story = {
	args: {
		steps: Array.from({ length: 6 }, (_, i) => ({
			label: `Step ${i + 1}`,
			description: `Description for step ${i + 1}`
		})),
		currentStep: 2,
		orientation: 'horizontal'
	}
}

export const Interactive: Story = {
	render: () => <InteractiveStepper />
}
