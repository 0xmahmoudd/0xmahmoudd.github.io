import React from 'react';
import { SiKde } from 'react-icons/si';
import { useWindowManager } from '../../context/WindowManagerContext';
import { KickoffMenu } from './KickoffMenu';
import { Taskbar } from './Taskbar';
import { SystemTray } from './SystemTray';
import { ClockWidget } from './ClockWidget';
import styles from './Panel.module.css';

export const Panel = () => {
  const { launcherOpen, setLauncherOpen } = useWindowManager();

  return (
    <div className={styles.panelBar}>
      {/* Plasma Kickoff Launcher Button */}
      <button
        className={`${styles.launcherBtn} ${launcherOpen ? styles.launcherActive : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          setLauncherOpen(!launcherOpen);
        }}
        title="Application Launcher (Kickoff)"
        aria-label="Application Launcher"
      >
        <SiKde className={styles.kdeGearIcon} />
      </button>

      {/* Taskbar Items */}
      <Taskbar />

      {/* System Tray */}
      <SystemTray />

      {/* Digital Clock */}
      <ClockWidget />

      {/* Kickoff Popover */}
      <KickoffMenu
        isOpen={launcherOpen}
        onClose={() => setLauncherOpen(false)}
      />
    </div>
  );
};
