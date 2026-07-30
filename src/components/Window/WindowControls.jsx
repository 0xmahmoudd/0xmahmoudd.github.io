import React from 'react';
import { FaMinus, FaExpand, FaCompress, FaTimes } from 'react-icons/fa';
import styles from './Window.module.css';

export const WindowControls = ({
  onMinimize,
  onMaximize,
  onClose,
  isMaximized
}) => {
  return (
    <div className={styles.windowControls}>
      <button
        className={`${styles.controlBtn} ${styles.minimizeBtn}`}
        onClick={(e) => {
          e.stopPropagation();
          onMinimize();
        }}
        title="Minimize"
        aria-label="Minimize Window"
      >
        <FaMinus className={styles.controlIcon} />
      </button>

      <button
        className={`${styles.controlBtn} ${styles.maximizeBtn}`}
        onClick={(e) => {
          e.stopPropagation();
          onMaximize();
        }}
        title={isMaximized ? 'Restore' : 'Maximize'}
        aria-label="Maximize or Restore Window"
      >
        {isMaximized ? (
          <FaCompress className={styles.controlIcon} />
        ) : (
          <FaExpand className={styles.controlIcon} />
        )}
      </button>

      <button
        className={`${styles.controlBtn} ${styles.closeBtn}`}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        title="Close"
        aria-label="Close Window"
      >
        <FaTimes className={styles.controlIcon} />
      </button>
    </div>
  );
};
