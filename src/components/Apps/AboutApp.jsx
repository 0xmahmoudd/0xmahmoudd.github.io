import React from 'react';
import {
  FaGraduationCap,
  FaMapMarkerAlt,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaCode,
  FaAws,
  FaDatabase,
  FaTerminal
} from 'react-icons/fa';
import { aboutData } from '../../data/aboutData';
import { useWindowManager } from '../../context/WindowManagerContext';
import styles from './Apps.module.css';

export const AboutApp = () => {
  const { openWindow } = useWindowManager();

  return (
    <div className={styles.appContainer}>
      {/* Hero Profile Banner */}
      <div className={styles.aboutHero}>
        <div className={styles.heroAvatarBox}>
          <FaTerminal className={styles.avatarIcon} />
        </div>

        <div className={styles.heroDetails}>
          <h1 className={styles.heroName}>{aboutData.name}</h1>
          <h2 className={styles.heroTitle}>{aboutData.title}</h2>
          
          <div className={styles.metaRow}>
            <span className={styles.metaBadge}>
              <FaMapMarkerAlt /> {aboutData.location}
            </span>
            <span className={styles.metaBadge}>
              <FaGraduationCap /> Graduating {aboutData.graduation}
            </span>
          </div>

          <div className={styles.heroActionBtns}>
            <button
              className="plasma-btn plasma-btn-primary"
              onClick={() => openWindow('projects')}
            >
              Explore Projects
            </button>
            <button
              className="plasma-btn"
              onClick={() => openWindow('contact')}
            >
              Contact Me
            </button>
            <a
              href={aboutData.github}
              target="_blank"
              rel="noreferrer"
              className="plasma-btn"
            >
              <FaGithub /> GitHub
            </a>
            <a
              href={aboutData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="plasma-btn"
            >
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Summary Biography */}
      <div className={styles.sectionBlock}>
        <h3 className={styles.sectionHeader}>Biography & Overview</h3>
        <p className={styles.bioText}>{aboutData.bio}</p>
      </div>

      {/* Metric Highlights Grid */}
      <div className={styles.highlightsGrid}>
        {aboutData.highlights.map((h, i) => (
          <div key={i} className="plasma-card">
            <h4 className={styles.highlightTitle}>{h.title}</h4>
            <p className={styles.highlightDesc}>{h.desc}</p>
          </div>
        ))}
      </div>

      {/* Education Timeline */}
      <div className={styles.sectionBlock}>
        <h3 className={styles.sectionHeader}>Education</h3>
        <div className="plasma-card">
          <div className={styles.eduHeader}>
            <div>
              <h4 className={styles.eduSchool}>{aboutData.education.university}</h4>
              <p className={styles.eduDegree}>{aboutData.education.degree}</p>
            </div>
            <div className={styles.eduMeta}>
              <span className="plasma-badge">GPA: {aboutData.education.gpa}</span>
              <span className={styles.eduPeriod}>{aboutData.education.period}</span>
            </div>
          </div>

          <h5 className={styles.courseworkLabel}>Relevant Coursework:</h5>
          <div className={styles.skillsTagCloud}>
            {aboutData.education.coursework.map((course, idx) => (
              <span key={idx} className={styles.courseChip}>
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
