import React, { useState } from 'react';
import {
  FaUser,
  FaFolderOpen,
  FaFileAlt,
  FaCode,
  FaAward,
  FaGraduationCap,
  FaEnvelope,
  FaTerminal,
  FaCog
} from 'react-icons/fa';
import { useWindowManager } from '../../context/WindowManagerContext';
import { DesktopWallpaper } from './DesktopWallpaper';
import { DesktopIcon } from './DesktopIcon';
import { Panel } from '../Panel/Panel';
import { Window } from '../Window/Window';

import { AboutApp } from '../Apps/AboutApp';
import { ProjectsApp } from '../Apps/ProjectsApp';
import { ArticlesApp } from '../Apps/ArticlesApp';
import { SkillsApp } from '../Apps/SkillsApp';
import { CertificatesApp } from '../Apps/CertificatesApp';
import { ResumeApp } from '../Apps/ResumeApp';
import { ContactApp } from '../Apps/ContactApp';
import { TerminalApp } from '../Apps/TerminalApp';
import { SettingsApp } from '../Apps/SettingsApp';

import styles from './Desktop.module.css';

const DESKTOP_ITEMS = [
  { id: 'about', label: 'About Me', iconKey: 'about' },
  { id: 'projects', label: 'Projects', iconKey: 'projects' },
  { id: 'articles', label: 'Articles', iconKey: 'articles' },
  { id: 'skills', label: 'Skills', iconKey: 'skills' },
  { id: 'certificates', label: 'Certificates', iconKey: 'certificates' },
  { id: 'resume', label: 'Resume', iconKey: 'resume' },
  { id: 'contact', label: 'Contact', iconKey: 'contact' },
  { id: 'terminal', label: 'Terminal', iconKey: 'terminal' },
  { id: 'settings', label: 'Settings', iconKey: 'settings' }
];

export const Desktop = () => {
  const { openWindow, setLauncherOpen } = useWindowManager();
  const [selectedIconId, setSelectedIconId] = useState(null);

  const handleDesktopClick = () => {
    setLauncherOpen(false);
    setSelectedIconId(null);
  };

  return (
    <div
      className={styles.desktopContainer}
      onClick={handleDesktopClick}
    >
      {/* Dynamic Desktop Wallpaper */}
      <DesktopWallpaper />

      {/* Grid of Desktop Icons */}
      <div className={styles.desktopArea}>
        {DESKTOP_ITEMS.map((item) => (
          <DesktopIcon
            key={item.id}
            id={item.id}
            label={item.label}
            iconKey={item.iconKey}
            isSelected={selectedIconId === item.id}
            onSelect={setSelectedIconId}
            onOpen={(id) => {
              setSelectedIconId(id);
              openWindow(id);
            }}
          />
        ))}
      </div>

      {/* Render All Window Apps */}
      <Window id="about" icon={FaUser}>
        <AboutApp />
      </Window>

      <Window id="projects" icon={FaFolderOpen}>
        <ProjectsApp />
      </Window>

      <Window id="articles" icon={FaFileAlt}>
        <ArticlesApp />
      </Window>

      <Window id="skills" icon={FaCode}>
        <SkillsApp />
      </Window>

      <Window id="certificates" icon={FaAward}>
        <CertificatesApp />
      </Window>

      <Window id="resume" icon={FaGraduationCap}>
        <ResumeApp />
      </Window>

      <Window id="contact" icon={FaEnvelope}>
        <ContactApp />
      </Window>

      <Window id="terminal" icon={FaTerminal}>
        <TerminalApp />
      </Window>

      <Window id="settings" icon={FaCog}>
        <SettingsApp />
      </Window>

      {/* KDE Plasma Bottom Panel */}
      <Panel />
    </div>
  );
};
