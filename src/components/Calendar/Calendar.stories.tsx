import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Calendar, CalendarEvent } from './index'

const meta = {
	title: 'Components/Calendar',
	component: Calendar,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'minimal', 'modern'],
			description: 'Visual variant of the calendar'
		},
		showWeekNumbers: {
			control: 'boolean',
			description: 'Show week numbers on the left side'
		},
		firstDayOfWeek: {
			control: 'select',
			options: [0, 1],
			description: '0 = Sunday, 1 = Monday'
		},
		onChange: {
			action: 'dateSelected',
			description: 'Callback when a date is selected'
		}
	}
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {}
}

export const MinimalVariant: Story = {
	args: {
		variant: 'minimal'
	}
}

export const ModernVariant: Story = {
	args: {
		variant: 'modern'
	}
}

export const WithWeekNumbers: Story = {
	args: {
		showWeekNumbers: true
	}
}

export const MondayFirst: Story = {
	args: {
		firstDayOfWeek: 1
	}
}

export const WithEvents: Story = {
	args: {
		events: [
			{
				id: '1',
				date: new Date(),
				title: 'Team Meeting',
				color: '#6366f1'
			},
			{
				id: '2',
				date: new Date(Date.now() + 86400000),
				title: 'Project Deadline',
				color: '#ef4444'
			},
			{
				id: '3',
				date: new Date(Date.now() + 172800000),
				title: 'Client Call',
				color: '#10b981'
			},
			{
				id: '4',
				date: new Date(Date.now() + 259200000),
				title: 'Workshop',
				color: '#f59e0b'
			},
			{
				id: '5',
				date: new Date(Date.now() + 345600000),
				title: 'Code Review',
				color: '#8b5cf6'
			}
		]
	}
}

export const WithHighlightedDates: Story = {
	args: {
		highlightedDates: [
			new Date(Date.now() + 86400000),
			new Date(Date.now() + 172800000),
			new Date(Date.now() + 345600000)
		]
	}
}

export const WithDisabledDates: Story = {
	args: {
		disabledDates: [
			new Date(Date.now() + 86400000),
			new Date(Date.now() + 172800000),
			new Date(Date.now() + 259200000)
		]
	}
}

export const WithMinMaxDates: Story = {
	args: {
		minDate: new Date(),
		maxDate: new Date(Date.now() + 30 * 86400000) // 30 days from now
	}
}

export const Interactive: Story = {
	render: () => {
		const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
				<Calendar value={selectedDate || undefined} onChange={(date) => setSelectedDate(date)} />
				{selectedDate && (
					<div
						style={{
							padding: '1rem 1.5rem',
							background: 'rgba(99, 102, 241, 0.1)',
							borderRadius: '0.75rem',
							border: '1px solid rgba(99, 102, 241, 0.3)',
							textAlign: 'center'
						}}
					>
						<p style={{ margin: 0, color: '#e0e0e0', fontSize: '0.875rem' }}>
							<strong>Selected Date:</strong>
						</p>
						<p style={{ margin: '0.25rem 0 0 0', color: '#818cf8', fontSize: '1.125rem', fontWeight: 600 }}>
							{selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
						</p>
					</div>
				)}
			</div>
		)
	}
}

export const EventCalendar: Story = {
	render: () => {
		const events: CalendarEvent[] = [
			{
				id: '1',
				date: new Date(2025, 9, 15),
				title: 'Product Launch',
				color: '#6366f1'
			},
			{
				id: '2',
				date: new Date(2025, 9, 18),
				title: 'Team Standup',
				color: '#10b981'
			},
			{
				id: '3',
				date: new Date(2025, 9, 18),
				title: 'Client Meeting',
				color: '#f59e0b'
			},
			{
				id: '4',
				date: new Date(2025, 9, 20),
				title: 'Sprint Review',
				color: '#8b5cf6'
			},
			{
				id: '5',
				date: new Date(2025, 9, 22),
				title: 'Deadline',
				color: '#ef4444'
			},
			{
				id: '6',
				date: new Date(2025, 9, 25),
				title: 'Workshop',
				color: '#14b8a6'
			},
			{
				id: '7',
				date: new Date(2025, 9, 25),
				title: 'Training',
				color: '#f97316'
			},
			{
				id: '8',
				date: new Date(2025, 9, 28),
				title: 'All Hands',
				color: '#6366f1'
			}
		]

		const [selectedDate, setSelectedDate] = useState<Date | null>(null)

		const selectedEvents = selectedDate ? events.filter((event) => event.date.toDateString() === selectedDate.toDateString()) : []

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', maxWidth: '450px' }}>
				<Calendar variant="modern" events={events} value={selectedDate || undefined} onChange={(date) => setSelectedDate(date)} />
				{selectedEvents.length > 0 && (
					<div
						style={{
							width: '100%',
							padding: '1.25rem',
							background: 'rgba(40, 40, 50, 0.95)',
							borderRadius: '0.75rem',
							border: '1px solid rgba(255, 255, 255, 0.15)'
						}}
					>
						<h4 style={{ margin: '0 0 1rem 0', color: '#e0e0e0', fontSize: '0.95rem', fontWeight: 600 }}>
							Events on {selectedDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
						</h4>
						<div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
							{selectedEvents.map((event) => (
								<div
									key={event.id}
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: '0.75rem',
										padding: '0.75rem',
										background: 'rgba(255, 255, 255, 0.05)',
										borderRadius: '0.5rem',
										borderLeft: `3px solid ${event.color}`
									}}
								>
									<span
										style={{
											width: '0.625rem',
											height: '0.625rem',
											borderRadius: '50%',
											backgroundColor: event.color,
											flexShrink: 0
										}}
									/>
									<span style={{ color: '#e0e0e0', fontSize: '0.875rem' }}>{event.title}</span>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		)
	}
}

export const DateRangeBooking: Story = {
	render: () => {
		const today = new Date()
		const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate())

		const bookedDates = [
			new Date(2025, 9, 16),
			new Date(2025, 9, 17),
			new Date(2025, 9, 23),
			new Date(2025, 9, 24),
			new Date(2025, 9, 30)
		]

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
				<div
					style={{
						padding: '1rem',
						background: 'rgba(99, 102, 241, 0.1)',
						borderRadius: '0.5rem',
						border: '1px solid rgba(99, 102, 241, 0.3)',
						marginBottom: '0.5rem'
					}}
				>
					<p style={{ margin: 0, color: '#e0e0e0', fontSize: '0.875rem', textAlign: 'center' }}>
						Select an available date for your booking
					</p>
				</div>
				<Calendar minDate={today} maxDate={maxDate} disabledDates={bookedDates} />
				<div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#9ca3af' }}>
					<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
						<div style={{ width: '0.75rem', height: '0.75rem', background: '#6366f1', borderRadius: '0.25rem' }} />
						<span>Selected</span>
					</div>
					<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
						<div style={{ width: '0.75rem', height: '0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '0.25rem' }} />
						<span>Available</span>
					</div>
					<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
						<div style={{ width: '0.75rem', height: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.25rem', opacity: 0.3 }} />
						<span>Booked</span>
					</div>
				</div>
			</div>
		)
	}
}

export const CompactView: Story = {
	render: () => (
		<div style={{ transform: 'scale(0.85)', transformOrigin: 'center' }}>
			<Calendar variant="minimal" />
		</div>
	)
}

export const MultipleCalendars: Story = {
	render: () => {
		const [date1, setDate1] = useState<Date>(new Date())
		const [date2, setDate2] = useState<Date>(new Date(new Date().setMonth(new Date().getMonth() + 1)))

		return (
			<div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
				<Calendar value={date1} onChange={setDate1} />
				<Calendar value={date2} onChange={setDate2} />
			</div>
		)
	}
}

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
				<Calendar variant="default" />
				<p style={{ margin: 0, fontSize: '0.875rem', color: '#9ca3af' }}>Default</p>
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
				<Calendar variant="minimal" />
				<p style={{ margin: 0, fontSize: '0.875rem', color: '#9ca3af' }}>Minimal</p>
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
				<Calendar variant="modern" />
				<p style={{ margin: 0, fontSize: '0.875rem', color: '#9ca3af' }}>Modern</p>
			</div>
		</div>
	)
}

export const WithAllFeatures: Story = {
	render: () => {
		const events: CalendarEvent[] = [
			{ id: '1', date: new Date(2025, 9, 15), title: 'Meeting', color: '#6366f1' },
			{ id: '2', date: new Date(2025, 9, 20), title: 'Deadline', color: '#ef4444' },
			{ id: '3', date: new Date(2025, 9, 25), title: 'Review', color: '#10b981' }
		]

		return (
			<Calendar
				variant="modern"
				showWeekNumbers={true}
				firstDayOfWeek={1}
				events={events}
				highlightedDates={[new Date(2025, 9, 18)]}
				minDate={new Date(2025, 9, 1)}
				maxDate={new Date(2025, 9, 31)}
			/>
		)
	}
}
