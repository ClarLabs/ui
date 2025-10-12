import React from 'react';
import styles from './styles.module.scss';

export interface ListItem {
  id: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export interface ListProps {
  items: ListItem[];
  hoverable?: boolean;
  dividers?: boolean;
  className?: string;
}

export function List({ items, hoverable = false, dividers = false, className = '' }: ListProps) {
  return (
    <ul className={`${styles.list} ${dividers ? styles.dividers : ''} ${className}`}>
      {items.map((item) => (
        <li
          key={item.id}
          className={`${styles.item} ${hoverable && !item.disabled ? styles.hoverable : ''} ${
            item.disabled ? styles.disabled : ''
          } ${item.onClick && !item.disabled ? styles.clickable : ''}`}
          onClick={item.disabled ? undefined : item.onClick}
        >
          {item.icon && <span className={styles.icon}>{item.icon}</span>}
          <span className={styles.content}>{item.content}</span>
          {item.badge && <span className={styles.badge}>{item.badge}</span>}
        </li>
      ))}
    </ul>
  );
}
