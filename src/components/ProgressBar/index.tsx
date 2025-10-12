import React from 'react';
import styles from './styles.module.scss';

export type ProgressBarVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type ProgressBarSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: ProgressBarVariant;
  size?: ProgressBarSize;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  striped?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  showLabel = false,
  label,
  animated = false,
  striped = false,
  className = ''
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const displayLabel = label || `${Math.round(percentage)}%`;

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={`${styles.progressBar} ${styles[size]}`}>
        <div
          className={`${styles.fill} ${styles[variant]} ${striped ? styles.striped : ''} ${
            animated ? styles.animated : ''
          }`}
          style={{ width: `${percentage}%` }}
        >
          {showLabel && <span className={styles.label}>{displayLabel}</span>}
        </div>
      </div>
    </div>
  );
}
