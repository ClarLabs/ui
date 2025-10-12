import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Chat, ChatMessage } from './index'

const meta = {
	title: 'Components/Chat',
	component: Chat,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		placeholder: {
			control: 'text',
			description: 'Placeholder text for input'
		},
		disabled: {
			control: 'boolean',
			description: 'Disable the chat input'
		},
		showTimestamps: {
			control: 'boolean',
			description: 'Show message timestamps'
		},
		showAvatars: {
			control: 'boolean',
			description: 'Show user and bot avatars'
		},
		typingIndicator: {
			control: 'boolean',
			description: 'Show typing indicator'
		},
		maxHeight: {
			control: 'text',
			description: 'Maximum height of chat container'
		},
		onSendMessage: {
			action: 'messageSent',
			description: 'Callback when message is sent'
		}
	}
} satisfies Meta<typeof Chat>

export default meta
type Story = StoryObj<typeof meta>

const sampleMessages: ChatMessage[] = [
	{
		id: '1',
		content: 'Hello! How can I help you today?',
		sender: 'bot',
		timestamp: new Date(Date.now() - 300000),
		senderName: 'Assistant'
	},
	{
		id: '2',
		content: 'Hi! I need help with my account settings.',
		sender: 'user',
		timestamp: new Date(Date.now() - 240000)
	},
	{
		id: '3',
		content: "I'd be happy to help you with your account settings. What specific setting would you like to change?",
		sender: 'bot',
		timestamp: new Date(Date.now() - 180000),
		senderName: 'Assistant'
	},
	{
		id: '4',
		content: 'I want to update my email address and enable two-factor authentication.',
		sender: 'user',
		timestamp: new Date(Date.now() - 120000)
	},
	{
		id: '5',
		content:
			'Great! To update your email address, go to Settings > Account > Email. For two-factor authentication, navigate to Settings > Security > 2FA and follow the setup instructions.',
		sender: 'bot',
		timestamp: new Date(Date.now() - 60000),
		senderName: 'Assistant'
	}
]

export const Default: Story = {
	args: {
		messages: sampleMessages,
		showAvatars: true,
		showTimestamps: false
	},
	render: (args) => (
		<div style={{ width: '600px', height: '500px' }}>
			<Chat {...args} />
		</div>
	)
}

export const Empty: Story = {
	args: {
		messages: []
	},
	render: (args) => (
		<div style={{ width: '600px', height: '500px' }}>
			<Chat {...args} />
		</div>
	)
}

export const WithTimestamps: Story = {
	args: {
		messages: sampleMessages,
		showTimestamps: true,
		showAvatars: true
	},
	render: (args) => (
		<div style={{ width: '600px', height: '500px' }}>
			<Chat {...args} />
		</div>
	)
}

export const WithoutAvatars: Story = {
	args: {
		messages: sampleMessages,
		showAvatars: false
	},
	render: (args) => (
		<div style={{ width: '600px', height: '500px' }}>
			<Chat {...args} />
		</div>
	)
}

export const WithTypingIndicator: Story = {
	args: {
		messages: sampleMessages,
		typingIndicator: true,
		showAvatars: true
	},
	render: (args) => (
		<div style={{ width: '600px', height: '500px' }}>
			<Chat {...args} />
		</div>
	)
}

export const Disabled: Story = {
	args: {
		messages: sampleMessages,
		disabled: true
	},
	render: (args) => (
		<div style={{ width: '600px', height: '500px' }}>
			<Chat {...args} />
		</div>
	)
}

export const Interactive: Story = {
	render: () => {
		const [messages, setMessages] = useState<ChatMessage[]>([
			{
				id: '1',
				content: 'Hello! I am an AI assistant. How can I help you today?',
				sender: 'bot',
				timestamp: new Date(),
				senderName: 'AI Assistant'
			}
		])
		const [isTyping, setIsTyping] = useState(false)

		const handleSendMessage = (message: string) => {
			const userMessage: ChatMessage = {
				id: Date.now().toString(),
				content: message,
				sender: 'user',
				timestamp: new Date()
			}

			setMessages((prev) => [...prev, userMessage])
			setIsTyping(true)

			// Simulate bot response
			setTimeout(() => {
				const responses = [
					"That's a great question! Let me help you with that.",
					'I understand what you mean. Here is what I can tell you...',
					'Interesting! I can provide more information about that.',
					"I'm here to help! Let me explain that for you.",
					'Thank you for asking! Here is my response...'
				]

				const botMessage: ChatMessage = {
					id: (Date.now() + 1).toString(),
					content: responses[Math.floor(Math.random() * responses.length)],
					sender: 'bot',
					timestamp: new Date(),
					senderName: 'AI Assistant'
				}

				setMessages((prev) => [...prev, botMessage])
				setIsTyping(false)
			}, 2000)
		}

		return (
			<div style={{ width: '600px', height: '600px' }}>
				<Chat
					messages={messages}
					onSendMessage={handleSendMessage}
					typingIndicator={isTyping}
					showAvatars={true}
					showTimestamps={true}
					placeholder="Type your message..."
				/>
			</div>
		)
	}
}

export const CustomerSupport: Story = {
	render: () => {
		const supportMessages: ChatMessage[] = [
			{
				id: '1',
				content: 'Welcome to Customer Support! How can we assist you today?',
				sender: 'bot',
				timestamp: new Date(Date.now() - 600000),
				senderName: 'Support Team'
			},
			{
				id: '2',
				content: 'I have an issue with my recent order #12345',
				sender: 'user',
				timestamp: new Date(Date.now() - 540000)
			},
			{
				id: '3',
				content: 'Let me look into that order for you right away.',
				sender: 'bot',
				timestamp: new Date(Date.now() - 480000),
				senderName: 'Support Team'
			},
			{
				id: '4',
				content: 'System notification: Agent Sarah has joined the conversation',
				sender: 'system',
				timestamp: new Date(Date.now() - 420000)
			},
			{
				id: '5',
				content: "Hello! I've reviewed your order. It appears there was a delay in shipping. Let me expedite this for you.",
				sender: 'bot',
				timestamp: new Date(Date.now() - 360000),
				senderName: 'Sarah'
			},
			{
				id: '6',
				content: 'Thank you so much! When should I expect delivery?',
				sender: 'user',
				timestamp: new Date(Date.now() - 300000)
			},
			{
				id: '7',
				content: 'Your order will arrive within 2-3 business days with expedited shipping at no extra cost. Is there anything else I can help with?',
				sender: 'bot',
				timestamp: new Date(Date.now() - 240000),
				senderName: 'Sarah'
			}
		]

		return (
			<div style={{ width: '700px', height: '650px' }}>
				<Chat messages={supportMessages} showTimestamps={true} showAvatars={true} placeholder="Type your question..." />
			</div>
		)
	}
}

export const LongConversation: Story = {
	render: () => {
		const longMessages: ChatMessage[] = Array.from({ length: 20 }, (_, i) => ({
			id: i.toString(),
			content:
				i % 2 === 0
					? `This is message number ${i + 1} from the bot. It contains some helpful information.`
					: `This is my response number ${i + 1}. Thank you for the information!`,
			sender: i % 2 === 0 ? ('bot' as const) : ('user' as const),
			timestamp: new Date(Date.now() - (20 - i) * 60000),
			senderName: i % 2 === 0 ? 'Assistant' : undefined
		}))

		return (
			<div style={{ width: '600px', height: '600px' }}>
				<Chat messages={longMessages} showTimestamps={true} showAvatars={true} maxHeight="500px" />
			</div>
		)
	}
}

export const CompactMode: Story = {
	args: {
		messages: sampleMessages.slice(0, 3),
		showAvatars: false,
		showTimestamps: false
	},
	render: (args) => (
		<div style={{ width: '400px', height: '350px' }}>
			<Chat {...args} placeholder="Quick message..." />
		</div>
	)
}

export const MobileView: Story = {
	args: {
		messages: sampleMessages,
		showAvatars: true,
		showTimestamps: false
	},
	render: (args) => (
		<div style={{ width: '375px', height: '667px' }}>
			<Chat {...args} />
		</div>
	)
}

export const WithCustomNames: Story = {
	args: {
		messages: sampleMessages,
		userName: 'John Doe',
		botName: 'ClarBot',
		showAvatars: true,
		showTimestamps: true
	},
	render: (args) => (
		<div style={{ width: '600px', height: '500px' }}>
			<Chat {...args} />
		</div>
	)
}

export const MultilineMessages: Story = {
	render: () => {
		const multilineMessages: ChatMessage[] = [
			{
				id: '1',
				content: 'Hello! I can help you with:\n\n1. Account settings\n2. Billing questions\n3. Technical support\n\nWhat do you need help with?',
				sender: 'bot',
				timestamp: new Date(Date.now() - 180000),
				senderName: 'Assistant'
			},
			{
				id: '2',
				content: 'I need help with:\n\n- Updating my profile\n- Changing my password\n- Adding a payment method',
				sender: 'user',
				timestamp: new Date(Date.now() - 120000)
			},
			{
				id: '3',
				content:
					"I'll guide you through each step:\n\n**Profile Update:**\nGo to Settings > Profile\n\n**Password Change:**\nSettings > Security > Change Password\n\n**Payment Method:**\nSettings > Billing > Add Payment",
				sender: 'bot',
				timestamp: new Date(Date.now() - 60000),
				senderName: 'Assistant'
			}
		]

		return (
			<div style={{ width: '650px', height: '550px' }}>
				<Chat messages={multilineMessages} showTimestamps={true} showAvatars={true} />
			</div>
		)
	}
}
