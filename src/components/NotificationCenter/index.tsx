import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'

export type NotificationType = 'info' | 'success' | 'warning' | 'error'

export interface Notification {
	id: string
	type: NotificationType
	title: string
	message: string
	timestamp?: Date
	read?: boolean
}

export interface NotificationCenterProps {
	notifications: Notification[]
	onNotificationClick?: (id: string) => void
	onNotificationDismiss?: (id: string) => void
	onClearAll?: () => void
	maxHeight?: string
	className?: string
}

export function NotificationCenter({
	notifications,
	onNotificationClick,
	onNotificationDismiss,
	onClearAll,
	maxHeight = '400px',
	className = ''
}: NotificationCenterProps) {
	const [unreadCount, setUnreadCount] = useState(0)

	useEffect(() => {
		setUnreadCount(notifications.filter((n) => !n.read).length)
	}, [notifications])

	const icons = {
		info: 'ℹ',
		success: '✓',
		warning: '⚠',
		error: '✕'
	}

	const formatTime = (date?: Date) => {
		if (!date) return ''
		const now = new Date()
		const diff = Math.floor((now.getTime() - date.getTime()) / 1000)

		if (diff < 60) return 'Just now'
		if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
		if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
		return `${Math.floor(diff / 86400)}d ago`
	}

	return (
		<div className={`${styles.notificationCenter} ${className}`}>
			<div className={styles.header}>
				<h3 className={styles.title}>
					Notifications {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
				</h3>
				{notifications.length > 0 && (
					<button className={styles.clearButton} onClick={onClearAll}>
						Clear all
					</button>
				)}
			</div>

			<div className={styles.notificationList} style={{ maxHeight }}>
				{notifications.length === 0 ? (
					<div className={styles.emptyState}>No notifications</div>
				) : (
					notifications.map((notification) => (
						<div
							key={notification.id}
							className={`${styles.notification} ${styles[notification.type]} ${!notification.read ? styles.unread : ''}`}
							onClick={() => onNotificationClick?.(notification.id)}
						>
							<div className={styles.icon}>{icons[notification.type]}</div>
							<div className={styles.content}>
								<div className={styles.notificationTitle}>{notification.title}</div>
								<div className={styles.message}>{notification.message}</div>
								{notification.timestamp && <div className={styles.timestamp}>{formatTime(notification.timestamp)}</div>}
							</div>
							<button
								className={styles.dismissButton}
								onClick={(e) => {
									e.stopPropagation()
									onNotificationDismiss?.(notification.id)
								}}
								aria-label="Dismiss notification"
							>
								✕
							</button>
						</div>
					))
				)}
			</div>
		</div>
	)
}
