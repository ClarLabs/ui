import React from 'react';
import styles from './styles.module.scss';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  status?: 'online' | 'offline' | 'busy' | 'away';
  className?: string;
}

export function Avatar({
  src,
  alt = 'Avatar',
  initials,
  size = 'md',
  status,
  className = ''
}: AvatarProps) {
  const getInitials = () => {
    if (initials) return initials;
    if (alt) {
      const words = alt.split(' ');
      if (words.length >= 2) {
        return `${words[0][0]}${words[1][0]}`.toUpperCase();
      }
      return alt.slice(0, 2).toUpperCase();
    }
    return '?';
  };

  return (
    <div className={`${styles.avatar} ${styles[size]} ${className}`}>
      {src ? (
        <img src={src} alt={alt} className={styles.image} />
      ) : (
        <div className={styles.initials}>{getInitials()}</div>
      )}
      {status && (
        <span className={`${styles.status} ${styles[status]}`} aria-label={`Status: ${status}`} />
      )}
    </div>
  );
}
