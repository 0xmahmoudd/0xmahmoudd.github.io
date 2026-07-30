import React from 'react';
import { useSettings, WALLPAPERS, ACCENT_COLORS } from '../../context/SettingsContext';
import styles from './Apps.module.css';

export const SettingsApp = () => {
  const {
    wallpaper,
    setWallpaper,
    accentColor,
    setAccentColor,
    blurEnabled,
    setBlurEnabled,
    soundEnabled,
    setSoundEnabled
  } = useSettings();

  return (
    <div className={styles.appContainer}>
      <div className={styles.sectionBlock}>
        <h3 className={styles.sectionHeader}>KDE Plasma Desktop Customization</h3>
        <p className={styles.bioText}>
          Personalize your desktop experience by changing wallpapers, accent colors, acrylic blur intensity, and UI sound options.
        </p>
      </div>

      {/* Wallpapers Section */}
      <div className={styles.sectionBlock}>
        <h4 className={styles.settingSecTitle}>Desktop Wallpaper</h4>
        <div className={styles.wallpaperGrid}>
          {WALLPAPERS.map((wp) => (
            <div
              key={wp.id}
              className={`${styles.wallpaperCard} ${
                wallpaper.id === wp.id ? styles.wallpaperActive : ''
              }`}
              onClick={() => setWallpaper(wp)}
            >
              <div
                className={styles.wallpaperPreview}
                style={{ background: wp.bg }}
              />
              <span className={styles.wallpaperName}>{wp.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Accent Color Section */}
      <div className={styles.sectionBlock}>
        <h4 className={styles.settingSecTitle}>Plasma Accent Color</h4>
        <div className={styles.accentGrid}>
          {ACCENT_COLORS.map((ac) => (
            <button
              key={ac.id}
              className={`${styles.accentChip} ${
                accentColor.id === ac.id ? styles.accentChipActive : ''
              }`}
              onClick={() => setAccentColor(ac)}
            >
              <span
                className={styles.colorDot}
                style={{ background: ac.value }}
              />
              <span>{ac.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Performance & Effects Toggles */}
      <div className={styles.sectionBlock}>
        <h4 className={styles.settingSecTitle}>Effects & Performance</h4>
        <div className="plasma-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label className={styles.toggleRow}>
            <span>Enable Frosted Glass Blur (Acrylic Backdrop)</span>
            <input
              type="checkbox"
              checked={blurEnabled}
              onChange={(e) => setBlurEnabled(e.target.checked)}
            />
          </label>

          <label className={styles.toggleRow}>
            <span>Enable Desktop Audio Feedback</span>
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
            />
          </label>
        </div>
      </div>
    </div>
  );
};
