import React from 'react';
import { useSettings } from '../../context/SettingsContext';

export const DesktopWallpaper = () => {
  const { wallpaper } = useSettings();

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: wallpaper.bg,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0,
        overflow: 'hidden'
      }}
    >
      {/* Decorative KDE Plasma Wave Accents */}
      <svg
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.18,
          pointerEvents: 'none'
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="plasmaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3daee9" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#1d99f3" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#9b59b6" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          fill="url(#plasmaGrad)"
          d="M0,288L48,272C96,256,192,224,288,224C384,224,480,256,576,282.7C672,309,768,331,864,309.3C960,288,1056,224,1152,202.7C1248,181,1344,203,1392,213.3L1440,224L1440,900L1392,900C1344,900,1248,900,1152,900C1056,900,960,900,864,900C768,900,672,900,576,900C480,900,384,900,288,900C192,900,96,900,48,900L0,900Z"
        />
        <path
          fill="#3daee9"
          fillOpacity="0.08"
          d="M0,450L60,430C120,410,240,370,360,385C480,400,600,470,720,490C840,510,960,480,1080,440C1200,400,1320,350,1380,325L1440,300L1440,900L1380,900C1320,900,1200,900,1080,900C960,900,840,900,720,900C600,900,480,900,360,900C240,900,120,900,60,900L0,900Z"
        />
      </svg>
    </div>
  );
};
