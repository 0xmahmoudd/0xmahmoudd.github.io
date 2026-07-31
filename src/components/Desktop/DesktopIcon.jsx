import React from 'react';
import { motion } from 'framer-motion';
import {
  FaUser,
  FaFolderOpen,
  FaFileAlt,
  FaTerminal,
  FaGraduationCap,
  FaAward,
  FaEnvelope,
  FaCog,
  FaCode
} from 'react-icons/fa';
import styles from './Desktop.module.css';

const ICON_MAP = {
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

export const DesktopIcon = ({ id, label, iconKey, isSelected, onSelect, onOpen }) => {
  const IconComponent = ICON_MAP[iconKey] || FaFolderOpen;

  const handleClick = (e) => {
    e.stopPropagation();
    const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window && window.navigator.maxTouchPoints > 0);
    
    if (isMobile) {
      onSelect(id);
      onOpen(id);
    } else if (isSelected) {
      onOpen(id);
    } else {
      onSelect(id);
    }
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    onOpen(id);
  };

  return (
    <motion.div
      className={`${styles.desktopIcon} ${isSelected ? styles.selected : ''}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onOpen(id);
      }}
    >
      <div className={styles.iconBox}>
        <IconComponent className={styles.iconSymbol} />
      </div>
      <span className={styles.iconLabel}>{label}</span>
    </motion.div>
  );
};
