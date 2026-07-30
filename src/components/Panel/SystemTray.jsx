import React, { useState } from 'react';
import {
  FaWifi,
  FaVolumeUp,
  FaVolumeMute,
  FaBell,
  FaSlidersH
} from 'react-icons/fa';
import { useSettings } from '../../context/SettingsContext';
import { useWindowManager } from '../../context/WindowManagerContext';
import styles from './Panel.module.css';

export const SystemTray = () => {
  const { soundEnabled, setSoundEnabled } = useSettings();
  const { openWindow } = useWindowManager();
  const [showVolumePopup, setShowVolumePopup] = useState(false);
  const [volume, setVolume] = useState(80);

  return (
    <div className={styles.systemTray}>
      {/* Network Indicator */}
      <div className={styles.trayIcon} title="Connected: 1 Gbps Fiber (Cairo, EG)">
        <FaWifi style={{ color: '#2ecc71' }} />
      </div>

      {/* Volume Indicator */}
      <div
        className={styles.trayIcon}
        onClick={() => {
          setSoundEnabled(!soundEnabled);
          setShowVolumePopup(!showVolumePopup);
        }}
        title={`Volume: ${soundEnabled ? `${volume}%` : 'Muted'}`}
      >
        {soundEnabled ? <FaVolumeUp /> : <FaVolumeMute style={{ color: '#e74c3c' }} />}
      </div>

      {/* Settings Shortcut */}
      <div
        className={styles.trayIcon}
        onClick={() => openWindow('settings')}
        title="KDE System Settings"
      >
        <FaSlidersH />
      </div>

      {/* Notification Bell */}
      <div
        className={styles.trayIcon}
        onClick={() => openWindow('terminal')}
        title="Notifications: Mahmoud's Portfolio is live"
      >
        <FaBell />
        <span className={styles.notificationDot} />
      </div>
    </div>
  );
};
