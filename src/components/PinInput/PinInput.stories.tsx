import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { PinInput } from './index'

const meta = {
	title: 'Components/PinInput',
	component: PinInput,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		length: {
			control: 'number'
		},
		type: {
			control: 'select',
			options: ['numeric', 'alphanumeric', 'alphabetic']
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg']
		},
		variant: {
			control: 'select',
			options: ['default', 'error', 'success']
		},
		mask: {
			control: 'boolean'
		},
		autoFocus: {
			control: 'boolean'
		},
		disabled: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof PinInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		length: 6
	}
}

export const WithLabel: Story = {
	args: {
		label: 'Enter PIN',
		length: 6
	}
}

export const FourDigits: Story = {
	args: {
		label: 'Enter 4-digit PIN',
		length: 4
	}
}

export const SixDigits: Story = {
	args: {
		label: 'Enter 6-digit code',
		length: 6
	}
}

export const Small: Story = {
	args: {
		label: 'Small Size',
		size: 'sm',
		length: 6
	}
}

export const Large: Story = {
	args: {
		label: 'Large Size',
		size: 'lg',
		length: 6
	}
}

export const Masked: Story = {
	args: {
		label: 'Enter Password',
		mask: true,
		length: 6
	}
}

export const Alphanumeric: Story = {
	args: {
		label: 'Enter Code (Letters & Numbers)',
		type: 'alphanumeric',
		length: 6,
		helperText: 'Letters and numbers allowed'
	}
}

export const Alphabetic: Story = {
	args: {
		label: 'Enter Code (Letters Only)',
		type: 'alphabetic',
		length: 4,
		helperText: 'Only letters allowed'
	}
}

export const WithHelperText: Story = {
	args: {
		label: 'Verification Code',
		helperText: 'Enter the 6-digit code sent to your email',
		length: 6
	}
}

export const WithError: Story = {
	args: {
		label: 'Enter PIN',
		error: 'Incorrect PIN. Please try again.',
		length: 6
	}
}

export const Success: Story = {
	args: {
		label: 'Enter PIN',
		variant: 'success',
		helperText: 'PIN verified successfully!',
		length: 6,
		defaultValue: '123456'
	}
}

export const Disabled: Story = {
	args: {
		label: 'Enter PIN',
		disabled: true,
		length: 6,
		defaultValue: '123456'
	}
}

export const WithPlaceholder: Story = {
	args: {
		label: 'Enter PIN',
		placeholder: '0',
		length: 6
	}
}

export const AutoFocus: Story = {
	args: {
		label: 'Auto-focused Input',
		autoFocus: true,
		length: 6
	}
}

export const Interactive: Story = {
	render: () => {
		const [value, setValue] = useState('')
		const [isComplete, setIsComplete] = useState(false)

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
				<PinInput
					label="Enter PIN"
					length={6}
					value={value}
					onChange={(val) => {
						setValue(val)
						setIsComplete(false)
					}}
					onComplete={() => setIsComplete(true)}
					helperText="Type numbers to see the value update"
				/>
				<div
					style={{
						padding: '1rem',
						background: 'rgba(99, 102, 241, 0.1)',
						border: '1px solid rgba(99, 102, 241, 0.3)',
						borderRadius: '0.5rem',
						minWidth: '300px',
						textAlign: 'center'
					}}
				>
					<p style={{ color: '#c7d2fe', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
						Current value: <strong>{value || '(empty)'}</strong>
					</p>
					<p style={{ color: isComplete ? '#86efac' : '#9ca3af', fontSize: '0.875rem' }}>
						Status: {isComplete ? 'Complete ✓' : 'Incomplete'}
					</p>
				</div>
			</div>
		)
	}
}

export const TwoFactorAuth: Story = {
	render: () => {
		const [value, setValue] = useState('')
		const [isVerifying, setIsVerifying] = useState(false)
		const [isVerified, setIsVerified] = useState(false)
		const [error, setError] = useState('')

		const handleComplete = (pin: string) => {
			setIsVerifying(true)
			setError('')

			// Simulate API call
			setTimeout(() => {
				setIsVerifying(false)
				if (pin === '123456') {
					setIsVerified(true)
				} else {
					setError('Invalid code. Please try again.')
					setValue('')
				}
			}, 1500)
		}

		return (
			<div
				style={{
					padding: '2rem',
					background: 'rgba(255, 255, 255, 0.05)',
					border: '1px solid rgba(255, 255, 255, 0.2)',
					borderRadius: '0.5rem',
					maxWidth: '400px'
				}}
			>
				<h3 style={{ color: '#c7d2fe', marginBottom: '0.5rem', fontSize: '1.25rem', textAlign: 'center' }}>
					Two-Factor Authentication
				</h3>
				<p style={{ color: '#9ca3af', marginBottom: '1.5rem', fontSize: '0.875rem', textAlign: 'center' }}>
					Enter the 6-digit code from your authenticator app
				</p>

				<PinInput
					length={6}
					value={value}
					onChange={setValue}
					onComplete={handleComplete}
					disabled={isVerifying || isVerified}
					variant={isVerified ? 'success' : error ? 'error' : 'default'}
					error={error}
					helperText={
						isVerified
							? 'Verified successfully!'
							: isVerifying
								? 'Verifying...'
								: 'Hint: Try 123456'
					}
				/>

				{isVerified && (
					<div
						style={{
							marginTop: '1rem',
							padding: '1rem',
							background: 'rgba(34, 197, 94, 0.1)',
							border: '1px solid rgba(34, 197, 94, 0.3)',
							borderRadius: '0.5rem',
							textAlign: 'center',
							color: '#86efac'
						}}
					>
						✓ Authentication successful!
					</div>
				)}
			</div>
		)
	}
}

export const OTPVerification: Story = {
	render: () => {
		const [value, setValue] = useState('')
		const [timeLeft, setTimeLeft] = useState(60)

		React.useEffect(() => {
			if (timeLeft > 0) {
				const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
				return () => clearTimeout(timer)
			}
		}, [timeLeft])

		return (
			<div
				style={{
					padding: '2rem',
					background: 'rgba(255, 255, 255, 0.05)',
					border: '1px solid rgba(255, 255, 255, 0.2)',
					borderRadius: '0.5rem',
					maxWidth: '400px'
				}}
			>
				<h3 style={{ color: '#c7d2fe', marginBottom: '0.5rem', fontSize: '1.25rem', textAlign: 'center' }}>
					Email Verification
				</h3>
				<p style={{ color: '#9ca3af', marginBottom: '1.5rem', fontSize: '0.875rem', textAlign: 'center' }}>
					We sent a code to <strong style={{ color: '#e0e0e0' }}>user@example.com</strong>
				</p>

				<PinInput
					label="Enter Code"
					length={6}
					value={value}
					onChange={setValue}
					onComplete={(pin) => console.log('Code entered:', pin)}
					helperText={`Code expires in ${timeLeft}s`}
				/>

				<button
					style={{
						width: '100%',
						marginTop: '1rem',
						padding: '0.75rem',
						background: timeLeft === 0 ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.05)',
						border: '1px solid rgba(255, 255, 255, 0.2)',
						borderRadius: '0.5rem',
						color: timeLeft === 0 ? '#c7d2fe' : '#6b7280',
						fontSize: '0.875rem',
						cursor: timeLeft === 0 ? 'pointer' : 'not-allowed',
						transition: 'all 0.2s ease'
					}}
					disabled={timeLeft > 0}
					onClick={() => {
						setTimeLeft(60)
						setValue('')
					}}
				>
					{timeLeft === 0 ? 'Resend Code' : `Resend available in ${timeLeft}s`}
				</button>
			</div>
		)
	}
}

export const SecurePayment: Story = {
	render: () => {
		const [pin, setPin] = useState('')

		return (
			<div
				style={{
					padding: '2rem',
					background: 'rgba(255, 255, 255, 0.05)',
					border: '1px solid rgba(255, 255, 255, 0.2)',
					borderRadius: '0.5rem',
					maxWidth: '400px'
				}}
			>
				<div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
					<div
						style={{
							display: 'inline-flex',
							padding: '1rem',
							background: 'rgba(99, 102, 241, 0.1)',
							borderRadius: '50%',
							marginBottom: '1rem'
						}}
					>
						<span style={{ fontSize: '2rem' }}>🔒</span>
					</div>
					<h3 style={{ color: '#c7d2fe', marginBottom: '0.5rem', fontSize: '1.25rem' }}>
						Confirm Payment
					</h3>
					<p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Enter your 4-digit security PIN</p>
				</div>

				<PinInput
					label="Security PIN"
					length={4}
					mask={true}
					value={pin}
					onChange={setPin}
					onComplete={(value) => console.log('PIN entered:', value)}
					autoFocus
				/>

				<button
					style={{
						width: '100%',
						marginTop: '1.5rem',
						padding: '0.75rem',
						background: pin.length === 4 ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.05)',
						border:
							pin.length === 4
								? '2px solid rgba(99, 102, 241, 0.5)'
								: '1px solid rgba(255, 255, 255, 0.2)',
						borderRadius: '0.5rem',
						color: pin.length === 4 ? '#c7d2fe' : '#6b7280',
						fontSize: '0.95rem',
						fontWeight: 'bold',
						cursor: pin.length === 4 ? 'pointer' : 'not-allowed',
						transition: 'all 0.2s ease'
					}}
					disabled={pin.length !== 4}
				>
					Confirm Payment
				</button>
			</div>
		)
	}
}

export const CompareSizes: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
			<PinInput label="Small (sm)" size="sm" length={6} />
			<PinInput label="Medium (md)" size="md" length={6} />
			<PinInput label="Large (lg)" size="lg" length={6} />
		</div>
	)
}

export const CompareTypes: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
			<PinInput
				label="Numeric Only"
				type="numeric"
				length={6}
				helperText="Numbers only (0-9)"
			/>
			<PinInput
				label="Alphabetic Only"
				type="alphabetic"
				length={6}
				helperText="Letters only (A-Z)"
			/>
			<PinInput
				label="Alphanumeric"
				type="alphanumeric"
				length={6}
				helperText="Letters and numbers (A-Z, 0-9)"
			/>
		</div>
	)
}

export const MaskedVsUnmasked: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
			<PinInput label="Visible Input" mask={false} length={6} defaultValue="123456" />
			<PinInput label="Masked Input" mask={true} length={6} defaultValue="123456" />
		</div>
	)
}
