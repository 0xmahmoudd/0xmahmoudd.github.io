import React, { useState } from 'react';
import { FaDownload, FaFileCode, FaEye, FaGraduationCap, FaBriefcase, FaCode, FaAward } from 'react-icons/fa';
import { aboutData } from '../../data/aboutData';
import { projectsData } from '../../data/projectsData';
import { skillsData } from '../../data/skillsData';
import styles from './Apps.module.css';

export const ResumeApp = () => {
  const [activeTab, setActiveTab] = useState('preview');

  const handleDownload = () => {
    // Generate text blob of resume data
    const resumeText = `MAHMOUD AYMAN - Backend Developer | Software Engineer
Cairo, Egypt | mahmoud.ayman.fcai@gmail.com | +201155020441
LinkedIn: https://www.linkedin.com/in/0xmahmoudd | GitHub: https://github.com/0xmahmoudd

SUMMARY
${aboutData.bio}

EDUCATION
${aboutData.education.university} - ${aboutData.education.degree} (${aboutData.education.period})
GPA: ${aboutData.education.gpa}

PROJECTS
${projectsData.map(p => `- ${p.title}: ${p.shortDescription}\n  Technologies: ${p.technologies.join(', ')}\n  GitHub: ${p.github}`).join('\n\n')}

SKILLS
${skillsData.map(s => `${s.category}: ${s.skills.map(k => k.name).join(', ')}`).join('\n')}
`;

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Mahmoud_Ayman_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.appContainer}>
      {/* Resume Top Actions */}
      <div className={styles.detailHeader}>
        <div className={styles.categoryFilters}>
          <button
            className={`${styles.filterBtn} ${
              activeTab === 'preview' ? styles.filterActive : ''
            }`}
            onClick={() => setActiveTab('preview')}
          >
            <FaEye /> Formatted Resume
          </button>

          <button
            className={`${styles.filterBtn} ${
              activeTab === 'latex' ? styles.filterActive : ''
            }`}
            onClick={() => setActiveTab('latex')}
          >
            <FaFileCode /> LaTeX Source (v1.tex)
          </button>
        </div>

        <button className="plasma-btn plasma-btn-primary" onClick={handleDownload}>
          <FaDownload /> Download Resume
        </button>
      </div>

      {activeTab === 'preview' ? (
        <div className={styles.resumePaper}>
          {/* Header */}
          <div className={styles.resumeHeader}>
            <h1 className={styles.resumeName}>{aboutData.name}</h1>
            <p className={styles.resumeSubTitle}>{aboutData.title}</p>
            <p className={styles.resumeContactLine}>
              {aboutData.location} • {aboutData.email} • {aboutData.phone}
            </p>
            <p className={styles.resumeContactLine}>
              <a href={aboutData.linkedin} target="_blank" rel="noreferrer">
                linkedin.com/in/0xmahmoudd
              </a>{' '}
              •{' '}
              <a href={aboutData.github} target="_blank" rel="noreferrer">
                github.com/0xmahmoudd
              </a>
            </p>
          </div>

          <hr className={styles.resumeDivider} />

          {/* Summary */}
          <div className={styles.resumeSection}>
            <h2 className={styles.resumeSecTitle}>Summary</h2>
            <p className={styles.resumeBodyText}>{aboutData.bio}</p>
          </div>

          {/* Education */}
          <div className={styles.resumeSection}>
            <h2 className={styles.resumeSecTitle}>Education</h2>
            <div className={styles.resumeItemRow}>
              <div>
                <strong>{aboutData.education.university}</strong> —{' '}
                <em>{aboutData.education.degree}</em>
              </div>
              <div>{aboutData.education.period}</div>
            </div>
            <p className={styles.resumeBodyText}>
              <strong>GPA:</strong> {aboutData.education.gpa} |{' '}
              <strong>Relevant Coursework:</strong>{' '}
              {aboutData.education.coursework.join(', ')}
            </p>
          </div>

          {/* Projects */}
          <div className={styles.resumeSection}>
            <h2 className={styles.resumeSecTitle}>Projects</h2>
            {projectsData.map((p) => (
              <div key={p.id} className={styles.resumeProjBox}>
                <div className={styles.resumeItemRow}>
                  <strong>
                    {p.title} | {p.technologies.join(', ')}
                  </strong>
                  <em>{p.badge}</em>
                </div>
                <ul className={styles.resumeBulletList}>
                  {p.features.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Technical Skills */}
          <div className={styles.resumeSection}>
            <h2 className={styles.resumeSecTitle}>Technical Skills</h2>
            <ul className={styles.resumeBulletList}>
              {skillsData.map((s, idx) => (
                <li key={idx}>
                  <strong>{s.category}:</strong>{' '}
                  {s.skills.map((k) => k.name).join(', ')}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="plasma-card" style={{ fontFamily: 'monospace', fontSize: '0.82rem', background: '#14171a', overflowX: 'auto' }}>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#3daee9' }}>
{`% Resume in LaTeX - Mahmoud Ayman
\\documentclass[letterpaper,11pt]{article}
\\usepackage{latexsym, fullpage, titlesec, hyperref, enumitem}

\\begin{document}
\\begin{center}
  \\textbf{\\Huge Mahmoud Ayman} \\\\
  \\textit{\\Large Backend Developer | Software Engineer} \\\\
  Cairo, Egypt | +201155020441 | mahmoud.ayman.fcai@gmail.com
\\end{center}

\\section{Education}
Beni Suef University - B.Sc. in Computer Science (Sep. 2022 -- Aug. 2026)
GPA: 3.25 / 4.00

\\section{Projects}
- Quiz Monitor: ASP.NET Core 9, PostgreSQL, EF Core, Docker
- MockAPIs: ASP.NET Core, React, PostgreSQL, Railway, Vercel
- AskFm Backend: ASP.NET Core, SignalR, SQL Server
- pgwatch Copilot: Golang, PostgreSQL, Cobra, pg_query AST
- MechanicShop API: ASP.NET Core 9, Clean Architecture, k6

\\end{document}`}
          </pre>
        </div>
      )}
    </div>
  );
};
