import React, { useState } from 'react';
import styles from './styles.module.scss';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export type TabsVariant = 'default' | 'pills' | 'underline';

export interface TabsProps {
  items: TabItem[];
  defaultActiveId?: string;
  variant?: TabsVariant;
  fullWidth?: boolean;
  onChange?: (id: string) => void;
  className?: string;
}

export function Tabs({
  items,
  defaultActiveId,
  variant = 'default',
  fullWidth = false,
  onChange,
  className = ''
}: TabsProps) {
  const [activeId, setActiveId] = useState(defaultActiveId || items[0]?.id);

  const handleTabClick = (id: string, disabled?: boolean) => {
    if (disabled) return;
    setActiveId(id);
    onChange?.(id);
  };

  const activeItem = items.find((item) => item.id === activeId);

  return (
    <div className={`${styles.tabsContainer} ${className}`}>
      <div
        className={`${styles.tabsList} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''}`}
        role="tablist"
      >
        {items.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={item.id === activeId}
            aria-disabled={item.disabled}
            className={`${styles.tab} ${item.id === activeId ? styles.active : ''} ${item.disabled ? styles.disabled : ''}`}
            onClick={() => handleTabClick(item.id, item.disabled)}
            disabled={item.disabled}
          >
            {item.icon && <span className={styles.icon}>{item.icon}</span>}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
      <div className={styles.tabContent} role="tabpanel">
        {activeItem?.content}
      </div>
    </div>
  );
}
