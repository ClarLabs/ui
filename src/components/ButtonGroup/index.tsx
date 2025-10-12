import React from 'react';
import styles from './styles.module.scss';

export type ButtonGroupOrientation = 'horizontal' | 'vertical';

export interface ButtonGroupProps {
  children: React.ReactNode;
  orientation?: ButtonGroupOrientation;
  fullWidth?: boolean;
  className?: string;
}

export function ButtonGroup({
  children,
  orientation = 'horizontal',
  fullWidth = false,
  className = ''
}: ButtonGroupProps) {
  return (
    <div
      className={`
        ${styles.buttonGroup}
        ${styles[orientation]}
        ${fullWidth ? styles.fullWidth : ''}
        ${className}
      `}
      role="group"
    >
      {children}
    </div>
  );
}
