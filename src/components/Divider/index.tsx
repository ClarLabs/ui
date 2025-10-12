import React from 'react';
import styles from './styles.module.scss';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

export interface DividerProps {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  label?: string;
  className?: string;
}

export function Divider({
  orientation = 'horizontal',
  variant = 'solid',
  label,
  className = ''
}: DividerProps) {
  const dividerClass = `${styles.divider} ${styles[orientation]} ${styles[variant]} ${className}`;

  if (label && orientation === 'horizontal') {
    return (
      <div className={dividerClass}>
        <span className={styles.line}></span>
        <span className={styles.label}>{label}</span>
        <span className={styles.line}></span>
      </div>
    );
  }

  return <div className={dividerClass}></div>;
}
