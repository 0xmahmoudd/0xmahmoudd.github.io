import React, { useState } from 'react';
import { FaSearch, FaCode, FaServer, FaDatabase, FaCloud, FaLaptopCode, FaTools, FaTerminal } from 'react-icons/fa';
import { skillsData } from '../../data/skillsData';
import styles from './Apps.module.css';

const CAT_ICONS = {
  Backend: FaServer,
  'Programming Languages': FaCode,
  Databases: FaDatabase,
  'Cloud & DevOps': FaCloud,
  Frontend: FaLaptopCode,
  'Tools & Libraries': FaTools,
  'Operating Systems': FaTerminal
};

export const SkillsApp = () => {
  const [search, setSearch] = useState('');

  return (
    <div className={styles.appContainer}>
      {/* Search Header */}
      <div className={styles.toolbarRow}>
        <div className={styles.searchBox} style={{ width: '100%' }}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            className="plasma-input"
            placeholder="Search skills by name, technology, framework..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Categorized Skill Sections */}
      <div className={styles.skillsSectionContainer}>
        {skillsData.map((catGroup, idx) => {
          const IconComp = CAT_ICONS[catGroup.category] || FaCode;
          const filteredSkills = catGroup.skills.filter(
            (s) =>
              s.name.toLowerCase().includes(search.toLowerCase()) ||
              s.highlight.toLowerCase().includes(search.toLowerCase())
          );

          if (filteredSkills.length === 0) return null;

          return (
            <div key={idx} className={styles.sectionBlock}>
              <div className={styles.catTitleRow}>
                <IconComp className={styles.catIcon} />
                <h3 className={styles.sectionHeader}>{catGroup.category}</h3>
              </div>
              <p className={styles.catDesc}>{catGroup.description}</p>

              <div className={styles.skillGrid}>
                {filteredSkills.map((skill, sIdx) => (
                  <div key={sIdx} className="plasma-card">
                    <div className={styles.skillHeaderRow}>
                      <span className={styles.skillName}>{skill.name}</span>
                      <span className="plasma-badge">{skill.highlight}</span>
                    </div>

                    <div className={styles.progressTrack}>
                      <div
                        className={styles.progressBar}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
