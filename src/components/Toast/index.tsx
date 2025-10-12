import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import styles from './styles.module.scss';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface ToastOptions {
  variant?: ToastVariant;
  duration?: number;
  dismissible?: boolean;
}

interface ToastItem extends ToastOptions {
  id: string;
  message: string;
}

interface ToastContextValue {
  showToast: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
}

export function ToastProvider({
  children,
  position = 'top-right',
  maxToasts = 5
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, options: ToastOptions = {}) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastItem = {
      id,
      message,
      variant: options.variant || 'info',
      duration: options.duration ?? 5000,
      dismissible: options.dismissible ?? true,
    };

    setToasts((prev) => {
      const updated = [...prev, newToast];
      return updated.slice(-maxToasts);
    });

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }
  }, [maxToasts]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const getPositionClasses = () => {
    const positionMap: Record<ToastPosition, string> = {
      'top-left': styles.topLeft,
      'top-center': styles.topCenter,
      'top-right': styles.topRight,
      'bottom-left': styles.bottomLeft,
      'bottom-center': styles.bottomCenter,
      'bottom-right': styles.bottomRight,
    };
    return positionMap[position];
  };

  const getIcon = (variant: ToastVariant) => {
    const icons = {
      info: 'ℹ',
      success: '✓',
      warning: '⚠',
      error: '✕',
    };
    return icons[variant];
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className={`${styles.toastContainer} ${getPositionClasses()}`}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${styles.toast} ${styles[toast.variant || 'info']}`}
            role="alert"
            aria-live="polite"
          >
            <div className={styles.icon}>{getIcon(toast.variant || 'info')}</div>
            <div className={styles.message}>{toast.message}</div>
            {toast.dismissible && (
              <button
                className={styles.closeButton}
                onClick={() => removeToast(toast.id)}
                aria-label="Close"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
