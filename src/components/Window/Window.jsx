import React, { useRef } from 'react';
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

  const win = windows[id];
  const constraintsRef = useRef(null);

  if (!win || !win.isOpen) return null;

  const isActive = activeWindowId === id;

  const windowVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.85, y: 30 }
  };

  return (
    <AnimatePresence>
      {!win.isMinimized && (
        <motion.div
          className={`${styles.windowFrame} ${isActive ? styles.active : ''} ${
            win.isMaximized ? styles.maximized : ''
          }`}
          style={{
            zIndex: win.zIndex,
            width: win.isMaximized ? '100vw' : `${win.defaultSize.width}px`,
            height: win.isMaximized
              ? 'calc(100vh - var(--panel-height))'
              : `${win.defaultSize.height}px`,
            left: win.isMaximized ? 0 : `${win.defaultPosition.x}px`,
            top: win.isMaximized ? 0 : `${win.defaultPosition.y}px`
          }}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={windowVariants}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onMouseDown={() => focusWindow(id)}
          drag={!win.isMaximized}
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
