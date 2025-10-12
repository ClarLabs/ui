import React, { useState } from 'react';
import styles from './styles.module.scss';

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> {
  value?: Date;
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
}

export function DatePicker({
  value,
  onChange,
  minDate,
  maxDate,
  className = '',
  ...props
}: DatePickerProps) {
  const [inputValue, setInputValue] = useState<string>(
    value ? formatDate(value) : ''
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    setInputValue(dateValue);

    if (dateValue) {
      const date = new Date(dateValue);
      if (!isNaN(date.getTime())) {
        onChange?.(date);
      }
    } else {
      onChange?.(null);
    }
  };

  return (
    <div className={`${styles.datePicker} ${className}`}>
      <input
        type="date"
        className={styles.input}
        value={inputValue}
        onChange={handleChange}
        min={minDate ? formatDate(minDate) : undefined}
        max={maxDate ? formatDate(maxDate) : undefined}
        {...props}
      />
      <span className={styles.icon}>📅</span>
    </div>
  );
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
