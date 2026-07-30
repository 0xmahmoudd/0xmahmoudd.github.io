import React from 'react';
import {
  FaUser,
  FaFolderOpen,
  FaFileAlt,
  FaTerminal,
  FaCode,
  FaAward,
  FaGraduationCap,
  FaEnvelope,
  FaCog
} from 'react-icons/fa';
import { useWindowManager } from '../../context/WindowManagerContext';
import styles from './Panel.module.css';

const TASK_ICONS = {
  about: FaUser,
  projects: FaFolderOpen,
  articles: FaFileAlt,
  skills: FaCode,
  certificates: FaAward,
  resume: FaGraduationCap,
  contact: FaEnvelope,
  terminal: FaTerminal,
  settings: FaCog
};

export const Taskbar = () => {
  const { windows, activeWindowId, toggleMinimize } = useWindowManager();

  const openWindows = Object.values(windows).filter((w) => w.isOpen);

  return (
    <div className={styles.taskbarContainer}>
      {openWindows.map((win) => {
        const IconComp = TASK_ICONS[win.id] || FaFolderOpen;
        const isActive = activeWindowId === win.id && !win.isMinimized;
        const isMinimized = win.isMinimized;

        return (
          <button
            key={win.id}
            className={`${styles.taskbarItem} ${
              isActive ? styles.taskActive : ''
            } ${isMinimized ? styles.taskMinimized : ''}`}
            onClick={() => toggleMinimize(win.id)}
            title={win.title}
          >
            <IconComp className={styles.taskIcon} />
            <span className={styles.taskTitle}>{win.id}</span>
            <div className={styles.taskIndicator} />
          </button>
        );
      })}
    </div>
  );
};
