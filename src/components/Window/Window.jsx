import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowManager } from '../../context/WindowManagerContext';
import { WindowControls } from './WindowControls';
import styles from './Window.module.css';

export const Window = ({ id, title, icon: IconComponent, children }) => {
  const {
    windows,
    activeWindowId,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow
  } = useWindowManager();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const win = windows[id];

  if (!win || !win.isOpen) return null;

  const isActive = activeWindowId === id;
  const isMax = win.isMaximized || isMobile;

  const windowVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 }
  };

  return (
    <AnimatePresence>
      {!win.isMinimized && (
        <motion.div
          className={`${styles.windowFrame} ${isActive ? styles.active : ''} ${
            isMax ? styles.maximized : ''
          }`}
          style={{
            zIndex: win.zIndex,
            width: isMax ? '100vw' : `${win.defaultSize.width}px`,
            height: isMax
              ? 'calc(100vh - var(--panel-height))'
              : `${win.defaultSize.height}px`,
            left: isMax ? 0 : `${win.defaultPosition.x}px`,
            top: isMax ? 0 : `${win.defaultPosition.y}px`
          }}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={windowVariants}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onMouseDown={() => focusWindow(id)}
          onTouchStart={() => focusWindow(id)}
          drag={!isMax}
          dragMomentum={false}
          dragElastic={0.05}
        >
          {/* Window Titlebar */}
          <div
            className={styles.titlebar}
            onDoubleClick={() => maximizeWindow(id)}
          >
            <div className={styles.titleContent}>
              {IconComponent && <IconComponent className={styles.titleIcon} />}
              <span className={styles.titleText}>{title || win.title}</span>
            </div>

            <WindowControls
              onMinimize={() => minimizeWindow(id)}
              onMaximize={() => maximizeWindow(id)}
              onClose={() => closeWindow(id)}
              isMaximized={win.isMaximized}
            />
          </div>

          {/* Window Content Container */}
          <div className={styles.windowContent}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
