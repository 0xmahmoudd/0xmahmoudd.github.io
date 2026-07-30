import React, { useState } from 'react';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaSearch,
  FaTachometerAlt,
  FaLayerGroup,
  FaArrowLeft,
  FaCheckCircle
} from 'react-icons/fa';
import { projectsData } from '../../data/projectsData';
import styles from './Apps.module.css';

export const ProjectsApp = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Backend', 'Full Stack', 'DevTools / Go', 'AI'];

  const filteredProjects = projectsData.filter((proj) => {
    const matchesCat =
      filter === 'All' || proj.category.toLowerCase().includes(filter.toLowerCase());
    const matchesSearch =
      proj.title.toLowerCase().includes(search.toLowerCase()) ||
      proj.fullDescription.toLowerCase().includes(search.toLowerCase()) ||
      proj.technologies.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  if (selectedProject) {
    return (
      <div className={styles.appContainer}>
        {/* Back Button Header */}
        <div className={styles.detailHeader}>
          <button
            className="plasma-btn"
            onClick={() => setSelectedProject(null)}
          >
            <FaArrowLeft /> Back to Projects Grid
          </button>
          <span className="plasma-badge">{selectedProject.badge}</span>
        </div>

        {/* Project Title & Links */}
        <div className={styles.projectHero}>
          <h1 className={styles.projectTitle}>{selectedProject.title}</h1>
          <p className={styles.projectSub}>{selectedProject.category}</p>

          <div className={styles.projectLinks}>
            {selectedProject.github && (
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noreferrer"
                className="plasma-btn plasma-btn-primary"
              >
                <FaGithub /> View Source on GitHub
              </a>
            )}
            {selectedProject.liveDemo && (
              <a
                href={selectedProject.liveDemo}
                target="_blank"
                rel="noreferrer"
                className="plasma-btn"
              >
                <FaExternalLinkAlt /> Open Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Technologies Cloud */}
        <div className={styles.sectionBlock}>
          <h3 className={styles.sectionHeader}>Technologies & Stack</h3>
          <div className={styles.skillsTagCloud}>
            {selectedProject.technologies.map((tech, idx) => (
              <span key={idx} className={styles.techBadge}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Full Overview */}
        <div className={styles.sectionBlock}>
          <h3 className={styles.sectionHeader}>Overview & Mission</h3>
          <p className={styles.bioText}>{selectedProject.fullDescription}</p>
        </div>

        {/* Architecture Spec */}
        <div className={styles.sectionBlock}>
          <h3 className={styles.sectionHeader}>
            <FaLayerGroup /> Architecture Specification
          </h3>
          <div className="plasma-card">
            <p className={styles.archText}>{selectedProject.architecture}</p>
          </div>
        </div>

        {/* Benchmark Metrics Grid */}
        <div className={styles.sectionBlock}>
          <h3 className={styles.sectionHeader}>
            <FaTachometerAlt /> Performance & System Metrics
          </h3>
          <div className={styles.highlightsGrid}>
            {selectedProject.metrics.map((m, idx) => (
              <div key={idx} className="plasma-card">
                <span className={styles.metricVal}>{m.value}</span>
                <span className={styles.metricLabel}>{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features List */}
        <div className={styles.sectionBlock}>
          <h3 className={styles.sectionHeader}>Key Engineering Features</h3>
          <div className={styles.featuresList}>
            {selectedProject.features.map((feat, idx) => (
              <div key={idx} className={styles.featureItem}>
                <FaCheckCircle className={styles.checkIcon} />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.appContainer}>
      {/* Search & Filter Header */}
      <div className={styles.toolbarRow}>
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            className="plasma-input"
            placeholder="Search projects by tech, title, keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.categoryFilters}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${
                filter === cat ? styles.filterActive : ''
              }`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className={styles.projectsGrid}>
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="plasma-card"
            style={{ cursor: 'pointer' }}
            onClick={() => setSelectedProject(proj)}
          >
            <div className={styles.cardHeader}>
              <span className="plasma-badge">{proj.badge}</span>
              <span className={styles.cardCat}>{proj.category}</span>
            </div>

            <h3 className={styles.cardTitle}>{proj.title}</h3>
            <p className={styles.cardDesc}>{proj.shortDescription}</p>

            <div className={styles.techTagsInline}>
              {proj.technologies.slice(0, 4).map((t, idx) => (
                <span key={idx} className={styles.miniTag}>
                  {t}
                </span>
              ))}
            </div>

            <div className={styles.cardFooter}>
              <button className="plasma-btn" style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}>
                View Project Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
