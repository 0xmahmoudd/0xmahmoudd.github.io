import React, { useState } from 'react';
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaCopy,
  FaCheckCircle,
  FaPaperPlane
} from 'react-icons/fa';
import { aboutData } from '../../data/aboutData';
import styles from './Apps.module.css';

export const ContactApp = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(aboutData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.sectionBlock}>
        <h3 className={styles.sectionHeader}>Get In Touch</h3>
        <p className={styles.bioText}>
          I am actively seeking backend software engineering roles, cloud architecture opportunities, and technical collaborations. Feel free to connect directly through any of the verified channels below.
        </p>
      </div>

      <div className={styles.contactGrid} style={{ gridTemplateColumns: '1fr' }}>
        {/* Direct Contact Cards */}
        <div className="plasma-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Email Card */}
          <div className={styles.contactItemRow}>
            <div className={styles.contactIconBox}>
              <FaEnvelope />
            </div>
            <div style={{ flex: 1 }}>
              <span className={styles.contactItemLabel}>Direct Email</span>
              <a
                href={`mailto:${aboutData.email}?subject=Opportunity%20/%20Inquiry`}
                className={styles.contactItemVal}
                style={{ color: 'var(--accent-color)', fontSize: '1rem' }}
              >
                {aboutData.email}
              </a>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className="plasma-btn"
                onClick={handleCopyEmail}
                title="Copy Email to Clipboard"
              >
                {copied ? <FaCheckCircle style={{ color: '#2ecc71' }} /> : <FaCopy />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <a
                href={`mailto:${aboutData.email}?subject=Opportunity%20/%20Inquiry`}
                className="plasma-btn plasma-btn-primary"
              >
                <FaPaperPlane /> Send Email
              </a>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)' }} />

          {/* GitHub Card */}
          <div className={styles.contactItemRow}>
            <div className={styles.contactIconBox}>
              <FaGithub />
            </div>
            <div style={{ flex: 1 }}>
              <span className={styles.contactItemLabel}>GitHub Profile</span>
              <a
                href={aboutData.github}
                target="_blank"
                rel="noreferrer"
                className={styles.contactItemVal}
              >
                github.com/0xmahmoudd
              </a>
            </div>
            <a
              href={aboutData.github}
              target="_blank"
              rel="noreferrer"
              className="plasma-btn"
            >
              Open GitHub →
            </a>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)' }} />

          {/* LinkedIn Card */}
          <div className={styles.contactItemRow}>
            <div className={styles.contactIconBox}>
              <FaLinkedin />
            </div>
            <div style={{ flex: 1 }}>
              <span className={styles.contactItemLabel}>LinkedIn Network</span>
              <a
                href={aboutData.linkedin}
                target="_blank"
                rel="noreferrer"
                className={styles.contactItemVal}
              >
                linkedin.com/in/0xmahmoudd
              </a>
            </div>
            <a
              href={aboutData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="plasma-btn"
            >
              Open LinkedIn →
            </a>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)' }} />

          {/* Location Card */}
          <div className={styles.contactItemRow}>
            <div className={styles.contactIconBox}>
              <FaMapMarkerAlt />
            </div>
            <div style={{ flex: 1 }}>
              <span className={styles.contactItemLabel}>Current Location</span>
              <span className={styles.contactItemVal}>
                {aboutData.location}
              </span>
            </div>
            <span className="plasma-badge">EET / Cairo Time</span>
          </div>

        </div>
      </div>
    </div>
  );
};
