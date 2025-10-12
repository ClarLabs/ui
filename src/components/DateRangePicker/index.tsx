import React, { useState } from 'react';
import styles from './styles.module.scss';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

export function DateRangePicker({
  value,
  onChange,
  minDate,
  maxDate,
  className = ''
}: DateRangePickerProps) {
  const [startValue, setStartValue] = useState<string>(
    value?.start ? formatDate(value.start) : ''
  );
  const [endValue, setEndValue] = useState<string>(
    value?.end ? formatDate(value.end) : ''
  );

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    setStartValue(dateValue);

    const startDate = dateValue ? new Date(dateValue) : null;
    const endDate = endValue ? new Date(endValue) : null;

    if (startDate && !isNaN(startDate.getTime())) {
      onChange?.({ start: startDate, end: endDate });
    } else {
      onChange?.({ start: null, end: endDate });
    }
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    setEndValue(dateValue);

    const startDate = startValue ? new Date(startValue) : null;
    const endDate = dateValue ? new Date(dateValue) : null;

    if (endDate && !isNaN(endDate.getTime())) {
      onChange?.({ start: startDate, end: endDate });
    } else {
      onChange?.({ start: startDate, end: null });
    }
  };

  return (
    <div className={`${styles.dateRangePicker} ${className}`}>
      <div className={styles.inputWrapper}>
        <input
          type="date"
          className={styles.input}
          value={startValue}
          onChange={handleStartChange}
          min={minDate ? formatDate(minDate) : undefined}
          max={endValue || (maxDate ? formatDate(maxDate) : undefined)}
          placeholder="Start date"
        />
        <span className={styles.icon}>📅</span>
      </div>
      <span className={styles.separator}>→</span>
      <div className={styles.inputWrapper}>
        <input
          type="date"
          className={styles.input}
          value={endValue}
          onChange={handleEndChange}
          min={startValue || (minDate ? formatDate(minDate) : undefined)}
          max={maxDate ? formatDate(maxDate) : undefined}
          placeholder="End date"
        />
        <span className={styles.icon}>📅</span>
      </div>
    </div>
  );
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
