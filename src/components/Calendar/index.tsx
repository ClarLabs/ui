import React, { useState, useMemo } from 'react'
import styles from './styles.module.scss'

export interface CalendarEvent {
	id: string
	date: Date
	title: string
	color?: string
	data?: { [key: string]: string }
}

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onClick'> {
	value?: Date
	onChange?: (date: Date) => void // Called when month changes with Date object of new month
	onClick?: (events: CalendarEvent[]) => void // Called when date is clicked with events for that day
	minDate?: Date
	maxDate?: Date
	events?: CalendarEvent[]
	highlightedDates?: Date[]
	disabledDates?: Date[]
	showWeekNumbers?: boolean
	firstDayOfWeek?: 0 | 1 // 0 = Sunday, 1 = Monday
	variant?: 'default' | 'minimal' | 'modern'
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function Calendar({
	value,
	onChange,
	onClick,
	minDate,
	maxDate,
	events = [],
	highlightedDates = [],
	disabledDates = [],
	showWeekNumbers = false,
	firstDayOfWeek = 0,
	variant = 'default',
	className = '',
	...props
}: CalendarProps) {
	const [currentDate, setCurrentDate] = useState(value || new Date())
	const [selectedDate, setSelectedDate] = useState<Date | null>(value || null)
	const [viewDate, setViewDate] = useState(value || new Date())

	const daysOfWeek = useMemo(() => {
		if (firstDayOfWeek === 1) {
			return [...DAYS.slice(1), DAYS[0]]
		}
		return DAYS
	}, [firstDayOfWeek])

	const isSameDay = (date1: Date, date2: Date) => {
		return (
			date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()
		)
	}

	const isDateDisabled = (date: Date) => {
		if (minDate && date < minDate) return true
		if (maxDate && date > maxDate) return true
		return disabledDates.some((disabledDate) => isSameDay(date, disabledDate))
	}

	const isDateHighlighted = (date: Date) => {
		return highlightedDates.some((highlightedDate) => isSameDay(date, highlightedDate))
	}

	const getEventsForDate = (date: Date) => {
		return events.filter((event) => isSameDay(event.date, date))
	}

	const getDaysInMonth = (year: number, month: number) => {
		return new Date(year, month + 1, 0).getDate()
	}

	const getFirstDayOfMonth = (year: number, month: number) => {
		const day = new Date(year, month, 1).getDay()
		return firstDayOfWeek === 1 ? (day === 0 ? 6 : day - 1) : day
	}

	const getWeekNumber = (date: Date) => {
		const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
		const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
		return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
	}

	const calendarDays = useMemo(() => {
		const year = viewDate.getFullYear()
		const month = viewDate.getMonth()
		const daysInMonth = getDaysInMonth(year, month)
		const firstDay = getFirstDayOfMonth(year, month)

		const days: (Date | null)[] = []

		// Previous month days
		const prevMonthDays = getDaysInMonth(year, month - 1)
		for (let i = firstDay - 1; i >= 0; i--) {
			const prevMonth = month === 0 ? 11 : month - 1
			const prevYear = month === 0 ? year - 1 : year
			days.push(new Date(prevYear, prevMonth, prevMonthDays - i))
		}

		// Current month days
		for (let i = 1; i <= daysInMonth; i++) {
			days.push(new Date(year, month, i))
		}

		// Next month days
		const remainingDays = 42 - days.length // 6 rows x 7 days
		for (let i = 1; i <= remainingDays; i++) {
			const nextMonth = month === 11 ? 0 : month + 1
			const nextYear = month === 11 ? year + 1 : year
			days.push(new Date(nextYear, nextMonth, i))
		}

		return days
	}, [viewDate, firstDayOfWeek])

	const handlePreviousMonth = () => {
		const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1)
		setViewDate(newDate)
		onChange?.(newDate)
	}

	const handleNextMonth = () => {
		const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1)
		setViewDate(newDate)
		onChange?.(newDate)
	}

	const handleDateClick = (date: Date) => {
		if (isDateDisabled(date)) return
		setSelectedDate(date)
		const dayEvents = getEventsForDate(date)
		onClick?.(dayEvents)
	}

	const handleToday = () => {
		const today = new Date()
		const monthChanged = viewDate.getMonth() !== today.getMonth() || viewDate.getFullYear() !== today.getFullYear()

		setViewDate(today)
		setSelectedDate(today)

		if (monthChanged) {
			onChange?.(today)
		}

		const todayEvents = getEventsForDate(today)
		onClick?.(todayEvents)
	}

	const isToday = (date: Date) => isSameDay(date, new Date())
	const isSelected = (date: Date) => selectedDate && isSameDay(date, selectedDate)
	const isCurrentMonth = (date: Date) => date.getMonth() === viewDate.getMonth()

	// Group days into weeks
	const weeks = []
	for (let i = 0; i < calendarDays.length; i += 7) {
		weeks.push(calendarDays.slice(i, i + 7))
	}

	return (
		<div className={`${styles.calendar} ${styles[variant]} ${className}`} {...props}>
			<div className={styles.header}>
				<button type="button" className={styles.navButton} onClick={handlePreviousMonth} aria-label="Previous month">
					<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</button>
				<div className={styles.monthYear}>
					<span className={styles.month}>{MONTHS[viewDate.getMonth()]}</span>
					<span className={styles.year}>{viewDate.getFullYear()}</span>
				</div>
				<button type="button" className={styles.navButton} onClick={handleNextMonth} aria-label="Next month">
					<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</button>
			</div>

			<div className={styles.weekdays}>
				{showWeekNumbers && <div className={styles.weekNumber}>Wk</div>}
				{daysOfWeek.map((day) => (
					<div key={day} className={styles.weekday}>
						{day}
					</div>
				))}
			</div>

			<div className={styles.days}>
				{weeks.map((week, weekIndex) => (
					<div key={weekIndex} className={styles.week}>
						{showWeekNumbers && week[0] && (
							<div className={styles.weekNumber}>{getWeekNumber(week[0] as Date)}</div>
						)}
						{week.map((date, dayIndex) => {
							if (!date) return <div key={dayIndex} className={styles.day} />

							const dayEvents = getEventsForDate(date)
							const isHighlighted = isDateHighlighted(date)
							const disabled = isDateDisabled(date)

							return (
								<button
									key={dayIndex}
									type="button"
									className={`${styles.day} ${isCurrentMonth(date) ? styles.currentMonth : styles.otherMonth} ${
										isToday(date) ? styles.today : ''
									} ${isSelected(date) ? styles.selected : ''} ${isHighlighted ? styles.highlighted : ''} ${
										disabled ? styles.disabled : ''
									}`}
									onClick={() => handleDateClick(date)}
									disabled={disabled}
									aria-label={date.toDateString()}
								>
									<span className={styles.dayNumber}>{date.getDate()}</span>
									{dayEvents.length > 0 && (
										<div className={styles.eventIndicators}>
											{dayEvents.slice(0, 3).map((event) => (
												<span
													key={event.id}
													className={styles.eventDot}
													style={{ backgroundColor: event.color || '#6366f1' }}
													title={event.title}
												/>
											))}
										</div>
									)}
								</button>
							)
						})}
					</div>
				))}
			</div>

			<div className={styles.footer}>
				<button type="button" className={styles.todayButton} onClick={handleToday}>
					Today
				</button>
			</div>
		</div>
	)
}
