import React, { useState, useRef, useEffect } from 'react';
import { useWindowManager } from '../../context/WindowManagerContext';
import { aboutData } from '../../data/aboutData';
import { projectsData } from '../../data/projectsData';
import { skillsData } from '../../data/skillsData';
import { articlesData } from '../../data/articlesData';
import styles from './Apps.module.css';

export const TerminalApp = () => {
  const { openWindow } = useWindowManager();
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'Welcome to Konsole Terminal (KDE Plasma 6.1)\nType "help" to list available commands.'
    }
  ]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    // Add to history list
    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const newEntries = [{ type: 'input', text: `mahmoud@portfolio:~$ ${trimmed}` }];

    switch (mainCmd) {
      case 'help':
        newEntries.push({
          type: 'output',
          text: `Available commands:
  help       - Display this help message
  about      - Show Mahmoud's summary & education
  skills     - List technical skills matrix
  projects   - Show portfolio projects list
  articles   - List technical markdown articles
  resume     - Print resume summary
  github     - Open GitHub profile
  linkedin   - Open LinkedIn profile
  contact    - Display contact details
  open <app> - Launch window (about|projects|articles|skills|certificates|resume|contact|settings)
  whoami     - Print current user info
  pwd        - Print working directory
  ls         - List files in current directory
  cat <file> - Display file contents
  history    - Show command history
  date       - Print system date and time
  clear      - Clear terminal screen`
        });
        break;

      case 'about':
        newEntries.push({
          type: 'output',
          text: `${aboutData.name} - ${aboutData.title}
Location: ${aboutData.location} | Graduation: ${aboutData.graduation}
${aboutData.bio}`
        });
        break;

      case 'skills':
        const skillText = skillsData
          .map(
            (cat) =>
              `[${cat.category}]\n  ${cat.skills.map((s) => s.name).join(', ')}`
          )
          .join('\n\n');
        newEntries.push({ type: 'output', text: skillText });
        break;

      case 'projects':
        const projText = projectsData
          .map(
            (p) =>
              `• ${p.title} (${p.category})\n  Tech: ${p.technologies.join(', ')}\n  GitHub: ${p.github}`
          )
          .join('\n\n');
        newEntries.push({ type: 'output', text: projText });
        break;

      case 'articles':
        const artText = articlesData
          .map((a) => `• ${a.title} [${a.category}] (${a.readTime})`)
          .join('\n');
        newEntries.push({ type: 'output', text: artText });
        break;

      case 'resume':
        openWindow('resume');
        newEntries.push({ type: 'output', text: 'Opening Resume window...' });
        break;

      case 'github':
        window.open(aboutData.github, '_blank');
        newEntries.push({ type: 'output', text: `Opening ${aboutData.github}...` });
        break;

      case 'linkedin':
        window.open(aboutData.linkedin, '_blank');
        newEntries.push({ type: 'output', text: `Opening ${aboutData.linkedin}...` });
        break;

      case 'contact':
        newEntries.push({
          type: 'output',
          text: `Email: ${aboutData.email}\nPhone: ${aboutData.phone}\nLocation: ${aboutData.location}`
        });
        break;

      case 'whoami':
        newEntries.push({
          type: 'output',
          text: 'mahmoud (Backend Developer | Software Engineer @ KDE Plasma)'
        });
        break;

      case 'pwd':
        newEntries.push({ type: 'output', text: '/home/mahmoud/portfolio' });
        break;

      case 'date':
        newEntries.push({ type: 'output', text: new Date().toString() });
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'history':
        newEntries.push({
          type: 'output',
          text: cmdHistory.map((c, i) => ` ${i + 1}  ${c}`).join('\n')
        });
        break;

      case 'ls':
        newEntries.push({
          type: 'output',
          text: 'about.txt   projects/   articles/   skills.json   resume.tex   contact.cfg'
        });
        break;

      case 'cat':
        if (!args[0]) {
          newEntries.push({ type: 'error', text: 'cat: missing file argument' });
        } else if (args[0] === 'about.txt') {
          newEntries.push({ type: 'output', text: aboutData.bio });
        } else if (args[0] === 'resume.tex') {
          newEntries.push({ type: 'output', text: '\\documentclass{article} ... (Mahmoud Ayman Resume)' });
        } else {
          newEntries.push({
            type: 'error',
            text: `cat: ${args[0]}: No such file or directory`
          });
        }
        break;

      case 'open':
        if (!args[0]) {
          newEntries.push({
            type: 'error',
            text: 'open: specify app name (about, projects, articles, skills, certificates, resume, contact, settings)'
          });
        } else {
          const appName = args[0].toLowerCase();
          openWindow(appName);
          newEntries.push({
            type: 'output',
            text: `Launching desktop application [${appName}]...`
          });
        }
        break;

      default:
        newEntries.push({
          type: 'error',
          text: `bash: command not found: ${mainCmd}. Type 'help' for available commands.`
        });
        break;
    }

    setHistory((prev) => [...prev, ...newEntries]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(cmdHistory[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    }
  };

  return (
    <div className={styles.terminalContainer} onClick={() => inputRef.current?.focus()}>
      <div className={styles.terminalOutput}>
        {history.map((item, idx) => (
          <div
            key={idx}
            className={`${styles.termLine} ${
              item.type === 'error' ? styles.termError : item.type === 'input' ? styles.termInputLine : ''
            }`}
          >
            {item.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className={styles.terminalInputRow}>
        <span className={styles.promptLabel}>mahmoud@portfolio:~$</span>
        <input
          ref={inputRef}
          type="text"
          className={styles.termInput}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>
    </div>
  );
};
