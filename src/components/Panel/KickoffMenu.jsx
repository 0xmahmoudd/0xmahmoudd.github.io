import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSearch,
  FaUser,
  FaFolderOpen,
  FaFileAlt,
  FaTerminal,
  FaCode,
  FaAward,
  FaGraduationCap,
  FaEnvelope,
  FaCog,
  FaPowerOff,
  FaRedo,
  FaLock
} from 'react-icons/fa';
import { useWindowManager } from '../../context/WindowManagerContext';
import styles from './Panel.module.css';

const APPS = [
  { id: 'about', title: 'About Me', desc: 'Mahmoud Ayman Biography & Education', icon: FaUser, cat: 'System' },
  { id: 'projects', title: 'Projects Showcase', desc: 'ASP.NET Core & Go Systems', icon: FaFolderOpen, cat: 'Development' },
  { id: 'articles', title: 'Technical Articles', desc: 'Performance Engineering & ASTs', icon: FaFileAlt, cat: 'Documentation' },
  { id: 'skills', title: 'Skills Matrix', desc: 'Backend, Cloud & Databases', icon: FaCode, cat: 'Development' },
  { id: 'certificates', title: 'Certificates', desc: 'AWS & ASP.NET Qualifications', icon: FaAward, cat: 'System' },
  { id: 'resume', title: 'Resume / CV', desc: 'Curriculum Vitae Preview & PDF', icon: FaGraduationCap, cat: 'Documentation' },
  { id: 'contact', title: 'Contact Me', desc: 'Email, LinkedIn & GitHub', icon: FaEnvelope, cat: 'Utilities' },
  { id: 'terminal', title: 'Konsole Terminal', desc: 'Fake Linux Command Line', icon: FaTerminal, cat: 'Utilities' },
  { id: 'settings', title: 'System Settings', desc: 'KDE Plasma Desktop Customization', icon: FaCog, cat: 'System' }
];

export const KickoffMenu = ({ isOpen, onClose }) => {
  const { openWindow } = useWindowManager();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  if (!isOpen) return null;

  const categories = ['All', 'Development', 'System', 'Documentation', 'Utilities'];

  const filteredApps = APPS.filter((app) => {
    const matchesCategory = activeCategory === 'All' || app.cat === activeCategory;
    const matchesSearch =
      app.title.toLowerCase().includes(search.toLowerCase()) ||
      app.desc.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AnimatePresence>
      <motion.div
        className={styles.kickoffOverlay}
        initial={{ opacity: 0, y: 15, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.96 }}
        transition={{ duration: 0.18 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* User Header Profile */}
        <div className={styles.kickoffHeader}>
          <div className={styles.avatarBox}>
            <FaUser className={styles.avatarIcon} />
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Mahmoud Ayman</span>
            <span className={styles.userRole}>Backend Engineer @ KDE Plasma</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Type to search applications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>

        {/* Kickoff Body: Categories & App Grid */}
        <div className={styles.kickoffBody}>
          {/* Category List */}
          <div className={styles.categoryColumn}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.catBtn} ${
                  activeCategory === cat ? styles.catActive : ''
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* App List */}
          <div className={styles.appGrid}>
            {filteredApps.map((app) => {
              const IconComp = app.icon;
              return (
                <div
                  key={app.id}
                  className={styles.appCard}
                  onClick={() => {
                    openWindow(app.id);
                    onClose();
                  }}
                >
                  <div className={styles.appIconBox}>
                    <IconComp />
                  </div>
                  <div className={styles.appText}>
                    <span className={styles.appTitle}>{app.title}</span>
                    <span className={styles.appDesc}>{app.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Kickoff Footer: Session / Power Actions */}
        <div className={styles.kickoffFooter}>
          <button
            className={styles.powerBtn}
            onClick={() => {
              alert('KDE Plasma Lock: Portfolio view is active!');
              onClose();
            }}
            title="Lock Session"
          >
            <FaLock /> Lock
          </button>

          <button
            className={styles.powerBtn}
            onClick={() => {
              window.location.reload();
            }}
            title="Restart Portfolio Desktop"
          >
            <FaRedo /> Restart
          </button>

          <button
            className={styles.powerBtn}
            onClick={() => {
              openWindow('contact');
              onClose();
            }}
            title="Leave Feedback"
          >
            <FaPowerOff /> Shutdown
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
