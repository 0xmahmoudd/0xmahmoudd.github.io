import React from 'react';
import { FaAward, FaExternalLinkAlt, FaCalendarAlt, FaBuilding, FaCheck } from 'react-icons/fa';
import { certificatesData } from '../../data/certificatesData';
import styles from './Apps.module.css';

export const CertificatesApp = () => {
  return (
    <div className={styles.appContainer}>
      <div className={styles.sectionBlock}>
        <h3 className={styles.sectionHeader}>Certificates & Professional Qualifications</h3>
        <p className={styles.bioText}>
          Verified course completions and cloud architecture training certificates earned by Mahmoud Ayman.
        </p>
      </div>

      <div className={styles.projectsGrid}>
        {certificatesData.map((cert) => (
          <div key={cert.id} className="plasma-card">
            <div className={styles.cardHeader}>
              <span className="plasma-badge">
                <FaAward /> {cert.badge}
              </span>
              <span className={styles.cardCat}>
                <FaCalendarAlt /> {cert.date}
              </span>
            </div>

            <h3 className={styles.cardTitle}>{cert.title}</h3>
            <p className={styles.certProvider}>
              <FaBuilding /> {cert.provider}
            </p>
            <p className={styles.cardDesc}>{cert.description}</p>

            <div className={styles.skillsTagCloud}>
              {cert.skillsCovered.map((sk, idx) => (
                <span key={idx} className={styles.courseChip}>
                  <FaCheck style={{ fontSize: '0.65rem', marginRight: '0.25rem' }} />
                  {sk}
                </span>
              ))}
            </div>

            <div className={styles.cardFooter}>
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noreferrer"
                className="plasma-btn"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
              >
                <FaExternalLinkAlt /> Verify Credential
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
