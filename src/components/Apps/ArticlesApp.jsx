import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Prism from 'prismjs';
import {
  FaSearch,
  FaClock,
  FaTag,
  FaArrowLeft,
  FaList,
  FaBookOpen
} from 'react-icons/fa';
import { articlesData } from '../../data/articlesData';
import styles from './Apps.module.css';

export const ArticlesApp = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [markdownContent, setMarkdownContent] = useState('');
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [toc, setToc] = useState([]);

  // Load Markdown File content when an article is selected
  useEffect(() => {
    if (!selectedArticle) return;

    fetch(`./${selectedArticle.file}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.text();
      })
      .then((text) => {
        setMarkdownContent(text);
        
        // Extract headings for Table of Contents
        const headingLines = text
          .split('\n')
          .filter((line) => line.startsWith('#'));
        
        const parsedToc = headingLines.map((line) => {
          const level = line.match(/^#+/)[0].length;
          const title = line.replace(/^#+\s*/, '');
          const id = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
          return { level, title, id };
        });
        
        setToc(parsedToc);
      })
      .catch((err) => {
        setMarkdownContent(`# Failed to load article\n\nUnable to fetch markdown file: \`${selectedArticle.file}\``);
      });
  }, [selectedArticle]);

  // Apply PrismJS syntax highlighting safely on rendered Markdown
  useEffect(() => {
    if (markdownContent) {
      setTimeout(() => {
        if (typeof Prism?.highlightAll === 'function') {
          Prism.highlightAll();
        } else if (typeof Prism?.default?.highlightAll === 'function') {
          Prism.default.highlightAll();
        }
      }, 100);
    }
  }, [markdownContent]);

  // Extract all unique tags across articles
  const allTags = ['All', ...new Set(articlesData.flatMap((a) => a.tags))];

  const filteredArticles = articlesData.filter((art) => {
    const matchesTag = selectedTag === 'All' || art.tags.includes(selectedTag);
    const matchesSearch =
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.summary.toLowerCase().includes(search.toLowerCase()) ||
      art.category.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  if (selectedArticle) {
    return (
      <div className={styles.appContainer}>
        {/* Detail Header / Nav */}
        <div className={styles.detailHeader}>
          <button
            className="plasma-btn"
            onClick={() => {
              setSelectedArticle(null);
              setMarkdownContent('');
            }}
          >
            <FaArrowLeft /> Back to Articles List
          </button>

          <div className={styles.metaRow}>
            <span className={styles.metaBadge}>
              <FaClock /> {selectedArticle.readTime}
            </span>
            <span className="plasma-badge">{selectedArticle.category}</span>
          </div>
        </div>

        {/* Article Reader Grid (Content + TOC Sidebar) */}
        <div className={styles.articleReaderLayout}>
          {/* Main Markdown Body */}
          <div className={styles.articleContentColumn}>
            <div className="markdown-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdownContent}
              </ReactMarkdown>
            </div>
          </div>

          {/* Table of Contents Sidebar */}
          {toc.length > 0 && (
            <div className={styles.tocSidebar}>
              <div className={styles.tocHeader}>
                <FaList /> Table of Contents
              </div>
              <ul className={styles.tocList}>
                {toc.map((item, idx) => (
                  <li
                    key={idx}
                    className={styles.tocItem}
                    style={{ paddingLeft: `${(item.level - 1) * 0.75}rem` }}
                  >
                    <a href={`#${item.id}`}>{item.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.appContainer}>
      {/* Toolbar Search & Tags */}
      <div className={styles.toolbarRow}>
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            className="plasma-input"
            placeholder="Search articles by title, tag, or topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.categoryFilters}>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`${styles.filterBtn} ${
                selectedTag === tag ? styles.filterActive : ''
              }`}
              onClick={() => setSelectedTag(tag)}
            >
              <FaTag style={{ fontSize: '0.7rem', marginRight: '0.2rem' }} />
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Cards Grid */}
      <div className={styles.projectsGrid}>
        {filteredArticles.map((art) => (
          <div
            key={art.slug}
            className="plasma-card"
            style={{ cursor: 'pointer' }}
            onClick={() => setSelectedArticle(art)}
          >
            <div className={styles.cardHeader}>
              <span className="plasma-badge">{art.category}</span>
              <span className={styles.cardCat}>
                <FaClock /> {art.readTime}
              </span>
            </div>

            <h3 className={styles.cardTitle}>{art.title}</h3>
            <p className={styles.cardDesc}>{art.summary}</p>

            <div className={styles.techTagsInline}>
              {art.tags.map((t, idx) => (
                <span key={idx} className={styles.miniTag}>
                  #{t}
                </span>
              ))}
            </div>

            <div className={styles.cardFooter}>
              <span className={styles.eduPeriod}>{art.date}</span>
              <button className="plasma-btn" style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}>
                <FaBookOpen /> Read Article →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
