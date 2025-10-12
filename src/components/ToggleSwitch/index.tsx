import React from 'react';
import styles from './styles.module.scss';

export type ToggleSwitchSize = 'sm' | 'md' | 'lg';

export interface ToggleSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: ToggleSwitchSize;
  className?: string;
}

export function ToggleSwitch({
  checked,
  defaultChecked = false,
  onChange,
  label,
  disabled = false,
  size = 'md',
  className = ''
}: ToggleSwitchProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleChange = () => {
    if (disabled) return;

    const newChecked = !isChecked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    onChange?.(newChecked);
  };

  return (
    <label className={`${styles.toggleSwitch} ${disabled ? styles.disabled : ''} ${className}`}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        className={styles.input}
      />
      <span className={`${styles.switch} ${styles[size]} ${isChecked ? styles.checked : ''}`}>
        <span className={styles.slider}></span>
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
