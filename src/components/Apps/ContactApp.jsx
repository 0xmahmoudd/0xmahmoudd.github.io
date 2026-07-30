import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheckCircle
} from 'react-icons/fa';
import { aboutData } from '../../data/aboutData';
import styles from './Apps.module.css';

export const ContactApp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.contactGrid}>
        {/* Left Side: Direct Contact Details & Links */}
        <div className={styles.contactInfoCol}>
          <div className="plasma-card">
            <h3 className={styles.sectionHeader}>Get In Touch</h3>
            <p className={styles.bioText}>
              I'm open to backend software engineering roles, cloud architecture projects, and technical collaborations. Feel free to reach out directly!
            </p>

            <div className={styles.contactItemRow}>
              <div className={styles.contactIconBox}>
                <FaEnvelope />
              </div>
              <div>
                <span className={styles.contactItemLabel}>Email</span>
                <a
                  href={`mailto:${aboutData.email}`}
                  className={styles.contactItemVal}
                >
                  {aboutData.email}
                </a>
              </div>
            </div>

            <div className={styles.contactItemRow}>
              <div className={styles.contactIconBox}>
                <FaMapMarkerAlt />
              </div>
              <div>
                <span className={styles.contactItemLabel}>Location</span>
                <span className={styles.contactItemVal}>
                  {aboutData.location}
                </span>
              </div>
            </div>

            <div className={styles.contactItemRow}>
              <div className={styles.contactIconBox}>
                <FaGithub />
              </div>
              <div>
                <span className={styles.contactItemLabel}>GitHub</span>
                <a
                  href={aboutData.github}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.contactItemVal}
                >
                  github.com/0xmahmoudd
                </a>
              </div>
            </div>

            <div className={styles.contactItemRow}>
              <div className={styles.contactIconBox}>
                <FaLinkedin />
              </div>
              <div>
                <span className={styles.contactItemLabel}>LinkedIn</span>
                <a
                  href={aboutData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.contactItemVal}
                >
                  linkedin.com/in/0xmahmoudd
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Form */}
        <div className={styles.contactFormCol}>
          <div className="plasma-card">
            <h3 className={styles.sectionHeader}>Send a Message</h3>

            {submitted ? (
              <div className={styles.successBox}>
                <FaCheckCircle className={styles.successIcon} />
                <h4>Message Received!</h4>
                <p>
                  Thank you for reaching out, {formData.name}. I will get back to you shortly at {formData.email}.
                </p>
                <button
                  className="plasma-btn"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.formContainer}>
                <div>
                  <label className={styles.formLabel}>Your Name *</label>
                  <input
                    type="text"
                    required
                    className="plasma-input"
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className={styles.formLabel}>Your Email *</label>
                  <input
                    type="email"
                    required
                    className="plasma-input"
                    placeholder="e.g. john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className={styles.formLabel}>Subject</label>
                  <input
                    type="text"
                    className="plasma-input"
                    placeholder="e.g. Backend Developer Opportunity"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className={styles.formLabel}>Message *</label>
                  <textarea
                    required
                    rows={4}
                    className="plasma-input"
                    placeholder="Type your message here..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="plasma-btn plasma-btn-primary"
                  style={{ width: '100%' }}
                >
                  <FaPaperPlane /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
