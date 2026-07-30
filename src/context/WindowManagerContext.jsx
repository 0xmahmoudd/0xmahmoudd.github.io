import React, { createContext, useContext, useState } from 'react';

const WindowManagerContext = createContext();

export const INITIAL_WINDOWS = {
  about: {
    id: 'about',
    title: 'About Me — Mahmoud Ayman',
    icon: 'user',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultSize: { width: 780, height: 560 },
    defaultPosition: { x: 80, y: 50 },
    params: {}
  },
  projects: {
    id: 'projects',
    title: 'Projects Showcase',
    icon: 'folder-code',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    defaultSize: { width: 920, height: 620 },
    defaultPosition: { x: 120, y: 60 },
    params: {}
  },
  articles: {
    id: 'articles',
    title: 'Articles & Tech Notes',
    icon: 'file-text',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    defaultSize: { width: 900, height: 600 },
    defaultPosition: { x: 140, y: 70 },
    params: {}
  },
  skills: {
    id: 'skills',
    title: 'Technical Skills Matrix',
    icon: 'cpu',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    defaultSize: { width: 850, height: 580 },
    defaultPosition: { x: 160, y: 80 },
    params: {}
  },
  certificates: {
    id: 'certificates',
    title: 'Certificates & Credentials',
    icon: 'award',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    defaultSize: { width: 800, height: 540 },
    defaultPosition: { x: 180, y: 90 },
    params: {}
  },
  resume: {
    id: 'resume',
    title: 'Resume / Curriculum Vitae',
    icon: 'file-badge',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    defaultSize: { width: 850, height: 650 },
    defaultPosition: { x: 200, y: 50 },
    params: {}
  },
  contact: {
    id: 'contact',
    title: 'Contact Mahmoud',
    icon: 'mail',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    defaultSize: { width: 720, height: 520 },
    defaultPosition: { x: 220, y: 100 },
    params: {}
  },
  terminal: {
    id: 'terminal',
    title: 'Konsole — Konsole Linux Terminal',
    icon: 'terminal',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 12,
    defaultSize: { width: 750, height: 480 },
    defaultPosition: { x: 260, y: 120 },
    params: {}
  },
  settings: {
    id: 'settings',
    title: 'System Settings — Plasma Desktop',
    icon: 'sliders',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    defaultSize: { width: 760, height: 520 },
    defaultPosition: { x: 240, y: 110 },
    params: {}
  }
};

export const WindowManagerProvider = ({ children }) => {
  const [windows, setWindows] = useState(INITIAL_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState('terminal');
  const [launcherOpen, setLauncherOpen] = useState(false);

  const getHighestZIndex = () => {
    const indices = Object.values(windows).map((w) => w.zIndex || 0);
    return Math.max(...indices, 10);
  };

  const openWindow = (id, params = {}) => {
    if (!windows[id]) return;
    const maxZ = getHighestZIndex() + 1;
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        zIndex: maxZ,
        params: { ...prev[id].params, ...params }
      }
    }));
    setActiveWindowId(id);
    setLauncherOpen(false);
  };

  const closeWindow = (id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false }
    }));
  };

  const minimizeWindow = (id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true }
    }));
  };

  const maximizeWindow = (id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized }
    }));
  };

  const focusWindow = (id) => {
    if (!windows[id]) return;
    const maxZ = getHighestZIndex() + 1;
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: false,
        zIndex: maxZ
      }
    }));
    setActiveWindowId(id);
  };

  const toggleMinimize = (id) => {
    const win = windows[id];
    if (!win) return;
    if (win.isMinimized) {
      focusWindow(id);
    } else if (activeWindowId === id) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  const closeAllWindows = () => {
    setWindows((prev) => {
      const next = {};
      Object.keys(prev).forEach((key) => {
        next[key] = { ...prev[key], isOpen: false };
      });
      return next;
    });
  };

  return (
    <WindowManagerContext.Provider
      value={{
        windows,
        activeWindowId,
        launcherOpen,
        setLauncherOpen,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        toggleMinimize,
        closeAllWindows
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
};

export const useWindowManager = () => {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error('useWindowManager must be used within WindowManagerProvider');
  }
  return context;
};
