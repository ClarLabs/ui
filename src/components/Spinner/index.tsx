import React from 'react';
import styles from './styles.module.scss';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerVariant = 'default' | 'primary' | 'secondary';

export interface SpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  className?: string;
  label?: string;
}

export function Spinner({
  size = 'md',
  variant = 'default',
  className = '',
  label
}: SpinnerProps) {
  return (
    <div className={`${styles.spinnerWrapper} ${className}`}>
      <div
        className={`${styles.spinner} ${styles[size]} ${styles[variant]}`}
        role="status"
        aria-label={label || 'Loading'}
      >
        <div className={styles.circle}></div>
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}
