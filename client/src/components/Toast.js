import React, { useState, useEffect, useCallback } from 'react';

/**
 * Toast — Lightweight notification component for action feedback.
 * Auto-dismisses after a configurable duration.
 *
 * @param {Object} props
 * @param {string} props.message - The message to display.
 * @param {'success'|'error'|'info'} props.type - Toast variant.
 * @param {Function} props.onClose - Callback when the toast is dismissed.
 * @param {number} [props.duration=3000] - Auto-dismiss duration in ms.
 */
const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  const dismiss = useCallback(() => {
    setIsVisible(false);
    // Wait for fade-out animation before removing from DOM
    setTimeout(() => onClose(), 250);
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(dismiss, duration);
    return () => clearTimeout(timer);
  }, [dismiss, duration]);

  const iconMap = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
  };

  return (
    <div className={`toast toast-${type} ${isVisible ? 'toast-enter' : 'toast-exit'}`}>
      <span className="toast-icon">{iconMap[type]}</span>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={dismiss} aria-label="Dismiss notification">
        ×
      </button>
    </div>
  );
};

/**
 * ToastContainer — Manages a stack of toast notifications.
 * Use the returned `addToast` function to show notifications imperatively.
 */
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const ToastContainer = () => (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );

  return { addToast, ToastContainer };
};

export default Toast;
