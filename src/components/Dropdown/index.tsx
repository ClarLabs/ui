import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.scss';

export interface DropdownOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  className = ''
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    if (disabled) return;
    setSelectedValue(optionValue);
    setIsOpen(false);
    onChange?.(optionValue);
  };

  const selectedOption = options.find((opt) => opt.value === selectedValue);
  const displayText = selectedOption?.label || placeholder;

  return (
    <div className={`${styles.dropdown} ${className}`} ref={dropdownRef}>
      <button
        className={`${styles.trigger} ${disabled ? styles.disabled : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        type="button"
      >
        <span className={selectedOption ? styles.selected : styles.placeholder}>{displayText}</span>
        <span className={`${styles.arrow} ${isOpen ? styles.open : ''}`}>▼</span>
      </button>
      {isOpen && (
        <div className={styles.menu}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`${styles.option} ${option.value === selectedValue ? styles.active : ''} ${
                option.disabled ? styles.optionDisabled : ''
              }`}
              onClick={() => !option.disabled && handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
