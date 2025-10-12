import React from 'react';
import styles from './styles.module.scss';

export interface RangeInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  showValue?: boolean;
  showMinMax?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function RangeInput({
  label,
  min = 0,
  max = 100,
  step = 1,
  value = 50,
  showValue = false,
  showMinMax = false,
  onChange,
  className = '',
  disabled = false,
  ...props
}: RangeInputProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`${styles.container} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.rangeWrapper}>
        {showMinMax && <span className={styles.minMax}>{min}</span>}
        <div className={styles.inputWrapper}>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`${styles.input} ${disabled ? styles.disabled : ''}`}
            style={{ '--percentage': `${percentage}%` } as React.CSSProperties}
            {...props}
          />
        </div>
        {showMinMax && <span className={styles.minMax}>{max}</span>}
      </div>
      {showValue && <span className={styles.value}>{value}</span>}
    </div>
  );
}
