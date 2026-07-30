import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const WALLPAPERS = [
  { id: 'plasma-default', name: 'Plasma Dark Wave', bg: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 35%, #0f172a 70%, #030712 100%)' },
  { id: 'breeze-cyan', name: 'Breeze Neon Cyan', bg: 'linear-gradient(135deg, #06101e 0%, #0c2a4a 40%, #05192d 80%, #020b14 100%)' },
  { id: 'plasma-purple', name: 'KDE Cosmic Violet', bg: 'linear-gradient(135deg, #180928 0%, #2e1065 40%, #150529 80%, #090214 100%)' },
  { id: 'plasma-emerald', name: 'KDE Arch Forest', bg: 'linear-gradient(135deg, #022c22 0%, #064e3b 40%, #022c22 80%, #01140e 100%)' },
  { id: 'minimal-slate', name: 'Minimal Deep Slate', bg: '#16191d' }
];

export const ACCENT_COLORS = [
  { id: 'cyan', name: 'Plasma Cyan', value: '#3daee9' },
  { id: 'blue', name: 'Breeze Blue', value: '#1d99f3' },
  { id: 'emerald', name: 'KDE Emerald', value: '#2ecc71' },
  { id: 'purple', name: 'Plasma Purple', value: '#9b59b6' },
  { id: 'amber', name: 'Solarized Amber', value: '#f39c12' }
];

export const SettingsProvider = ({ children }) => {
  const [wallpaper, setWallpaper] = useState(WALLPAPERS[0]);
  const [accentColor, setAccentColor] = useState(ACCENT_COLORS[0]);
  const [blurEnabled, setBlurEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', accentColor.value);
    document.documentElement.style.setProperty(
      '--accent-glow',
      `${accentColor.value}40`
    );
  }, [accentColor]);

  return (
    <SettingsContext.Provider
      value={{
        wallpaper,
        setWallpaper,
        accentColor,
        setAccentColor,
        blurEnabled,
        setBlurEnabled,
        soundEnabled,
        setSoundEnabled,
        compactMode,
        setCompactMode
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};
