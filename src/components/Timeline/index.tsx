import React from 'react';
import styles from './styles.module.scss';

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date?: string;
  icon?: React.ReactNode;
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
}

export type TimelineOrientation = 'vertical' | 'horizontal';

export interface TimelineProps {
  items: TimelineItem[];
  orientation?: TimelineOrientation;
  className?: string;
}

export function Timeline({
  items,
  orientation = 'vertical',
  className = ''
}: TimelineProps) {
  return (
    <div className={`${styles.timeline} ${styles[orientation]} ${className}`}>
      {items.map((item, index) => (
        <div key={item.id} className={styles.timelineItem}>
          <div className={`${styles.timelineMarker} ${item.color ? styles[item.color] : styles.default}`}>
            {item.icon ? (
              <span className={styles.icon}>{item.icon}</span>
            ) : (
              <span className={styles.dot}></span>
            )}
          </div>
          {index < items.length - 1 && (
            <div className={`${styles.timelineConnector} ${item.color ? styles[item.color] : styles.default}`}></div>
          )}
          <div className={styles.timelineContent}>
            {item.date && <span className={styles.date}>{item.date}</span>}
            <h4 className={styles.title}>{item.title}</h4>
            {item.description && <p className={styles.description}>{item.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
