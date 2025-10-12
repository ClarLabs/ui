import type { Meta, StoryObj } from '@storybook/react'
import { ToggleSwitch } from './index'

const meta = {
	title: 'Components/ToggleSwitch',
	component: ToggleSwitch,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg']
		},
		disabled: {
			control: 'boolean'
		},
		checked: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof ToggleSwitch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		label: 'Toggle Switch'
	}
}

export const Checked: Story = {
	args: {
		label: 'Enabled',
		defaultChecked: true
	}
}

export const WithoutLabel: Story = {
	args: {}
}

export const Disabled: Story = {
	args: {
		label: 'Disabled Toggle',
		disabled: true
	}
}

export const DisabledChecked: Story = {
	args: {
		label: 'Disabled Checked',
		checked: true,
		disabled: true
	}
}

export const Small: Story = {
	args: {
		label: 'Small Toggle',
		size: 'sm'
	}
}

export const Large: Story = {
	args: {
		label: 'Large Toggle',
		size: 'lg'
	}
}

export const AllSizes: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
			<ToggleSwitch label="Small" size="sm" defaultChecked />
			<ToggleSwitch label="Medium" size="md" defaultChecked />
			<ToggleSwitch label="Large" size="lg" defaultChecked />
		</div>
	)
}

export const SettingsExample: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '300px' }}>
			<div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem' }}>
				<h4 style={{ margin: '0 0 1rem 0', color: '#e0e0e0' }}>Notification Settings</h4>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
					<ToggleSwitch label="Email notifications" defaultChecked />
					<ToggleSwitch label="Push notifications" defaultChecked />
					<ToggleSwitch label="SMS notifications" />
					<ToggleSwitch label="Weekly digest" defaultChecked />
				</div>
			</div>
		</div>
	)
}
