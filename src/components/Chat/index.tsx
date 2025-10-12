import React, { useState, useRef, useEffect } from 'react'
import styles from './styles.module.scss'

export interface ChatMessage {
	id: string
	content: string
	sender: 'user' | 'bot' | 'system'
	timestamp: Date
	avatar?: string
	senderName?: string
	isTyping?: boolean
}

export interface ChatProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
	messages: ChatMessage[]
	onSendMessage?: (message: string) => void
	placeholder?: string
	disabled?: boolean
	showTimestamps?: boolean
	showAvatars?: boolean
	maxHeight?: string
	typingIndicator?: boolean
	userName?: string
	botName?: string
	enableMarkdown?: boolean
}

export function Chat({
	messages,
	onSendMessage,
	placeholder = 'Type a message...',
	disabled = false,
	showTimestamps = false,
	showAvatars = true,
	maxHeight = '600px',
	typingIndicator = false,
	userName = 'You',
	botName = 'Assistant',
	className = '',
	...props
}: ChatProps) {
	const [inputValue, setInputValue] = useState('')
	const [isFocused, setIsFocused] = useState(false)
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLTextAreaElement>(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (inputValue.trim() && onSendMessage && !disabled) {
			onSendMessage(inputValue.trim())
			setInputValue('')
			if (inputRef.current) {
				inputRef.current.style.height = 'auto'
			}
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSubmit(e)
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputValue(e.target.value)
		// Auto-resize textarea
		e.target.style.height = 'auto'
		e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`
	}

	const formatTime = (date: Date) => {
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
	}

	const getInitials = (name: string) => {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2)
	}

	return (
		<div className={`${styles.chatContainer} ${className}`} {...props}>
			<div className={styles.messagesWrapper} style={{ maxHeight }}>
				{messages.length === 0 ? (
					<div className={styles.emptyState}>
						<div className={styles.emptyIcon}>💬</div>
						<p className={styles.emptyText}>No messages yet</p>
						<p className={styles.emptySubtext}>Start a conversation!</p>
					</div>
				) : (
					<div className={styles.messagesList}>
						{messages.map((message, index) => {
							const isUser = message.sender === 'user'
							const isSystem = message.sender === 'system'
							const showAvatar = showAvatars && !isSystem
							const senderName = isUser ? userName : message.senderName || botName

							return (
								<div
									key={message.id}
									className={`${styles.messageGroup} ${isUser ? styles.userMessage : ''} ${isSystem ? styles.systemMessage : ''}`}
								>
									{showAvatar && (
										<div className={styles.avatarWrapper}>
											{message.avatar ? (
												<img src={message.avatar} alt={senderName} className={styles.avatar} />
											) : (
												<div className={`${styles.avatarPlaceholder} ${isUser ? styles.userAvatar : styles.botAvatar}`}>
													{getInitials(senderName)}
												</div>
											)}
										</div>
									)}
									<div className={styles.messageContent}>
										{!isSystem && !isUser && (
											<div className={styles.senderName}>{senderName}</div>
										)}
										<div className={`${styles.messageBubble} ${message.isTyping ? styles.typing : ''}`}>
											{message.isTyping ? (
												<div className={styles.typingIndicator}>
													<span className={styles.dot}></span>
													<span className={styles.dot}></span>
													<span className={styles.dot}></span>
												</div>
											) : (
												<p className={styles.messageText}>{message.content}</p>
											)}
										</div>
										{showTimestamps && !message.isTyping && (
											<div className={styles.timestamp}>{formatTime(message.timestamp)}</div>
										)}
									</div>
								</div>
							)
						})}
						{typingIndicator && (
							<div className={`${styles.messageGroup}`}>
								{showAvatars && (
									<div className={styles.avatarWrapper}>
										<div className={`${styles.avatarPlaceholder} ${styles.botAvatar}`}>
											{getInitials(botName)}
										</div>
									</div>
								)}
								<div className={styles.messageContent}>
									<div className={styles.senderName}>{botName}</div>
									<div className={`${styles.messageBubble} ${styles.typing}`}>
										<div className={styles.typingIndicator}>
											<span className={styles.dot}></span>
											<span className={styles.dot}></span>
											<span className={styles.dot}></span>
										</div>
									</div>
								</div>
							</div>
						)}
						<div ref={messagesEndRef} />
					</div>
				)}
			</div>

			<form onSubmit={handleSubmit} className={styles.inputForm}>
				<div className={`${styles.inputWrapper} ${isFocused ? styles.focused : ''}`}>
					<textarea
						ref={inputRef}
						className={styles.input}
						value={inputValue}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						placeholder={placeholder}
						disabled={disabled}
						rows={1}
					/>
					<button
						type="submit"
						className={`${styles.sendButton} ${inputValue.trim() ? styles.active : ''}`}
						disabled={!inputValue.trim() || disabled}
					>
						<svg className={styles.sendIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
			</form>
		</div>
	)
}
