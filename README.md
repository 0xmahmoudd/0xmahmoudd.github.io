# Mahmoud Ayman — KDE Plasma 6 Desktop Portfolio

A production-ready Linux KDE Plasma Desktop Environment simulation built from scratch using React, Vite, Framer Motion, and CSS Modules.

![KDE Plasma Portfolio](https://raw.githubusercontent.com/0xmahmoudd/portfolio/main/public/preview.png)

## 🌟 Key Features

- 🖥️ **Authentic KDE Plasma Desktop Experience**:
  - Translucent Frosted Acrylic Panels with `backdrop-filter: blur(24px)`.
  - Floating Plasma Windows with Breeze Dark window controls (Minimize, Maximize/Restore, Close).
  - Window Manager with active `zIndex` focus control, dragging via Framer Motion, and window snapping.
  - Plasma Kickoff Launcher featuring search, app categories, user profile, and power options.
  - Interactive System Panel with live digital clock, system tray, taskbar window indicators, and volume toggle.

- 💻 **Fake Linux Konsole Terminal (`mahmoud@portfolio:~$)`**:
  - Interactive shell supporting: `help`, `about`, `skills`, `projects`, `articles`, `resume`, `github`, `linkedin`, `contact`, `clear`, `theme`, `date`, `whoami`, `pwd`, `ls`, `cat`, `history`, and `open <app>`.
  - Command history navigation (Up/Down arrow keys), tab completion, and error handling.

- 📚 **Markdown Articles & Tech Notes**:
  - Automatically loads `.md` articles from `/public/articles`.
  - Instant search, category tags filter, reading time calculation, auto-generated Table of Contents, and PrismJS syntax highlighting.

- ⚙️ **KDE Plasma System Settings**:
  - Dynamic Wallpaper switcher (Plasma Dark Wave, Breeze Neon Cyan, KDE Cosmic Violet, KDE Arch Forest, Minimal Slate).
  - Accent Color picker (Plasma Cyan, Breeze Blue, KDE Emerald, Plasma Purple, Solarized Amber).
  - Frosted Glass backdrop blur & audio feedback toggles.

- 💼 **Portfolio Content (Mahmoud Ayman)**:
  - **About**: Bio, education (Beni Suef University), GPA 3.25/4.00, key metrics.
  - **Projects**: Quiz Monitor (Graduation Project), MockAPIs ($O(N)$ pagination fix cut latency by 98.4%), AskFm Backend (SignalR), pgwatch Copilot (Go + pg_query AST validation), MechanicShop API.
  - **Skills**: Categorized into Backend, Programming Languages, Databases, Cloud & DevOps, Frontend, Tools, Operating Systems.
  - **Certificates**: ASP.NET Core APIs, AWS Solutions Architect Associate (SAA-C03), Meta React Professional.
  - **Resume**: Formatted CV preview, LaTeX source code viewer (`v1.tex`), download options.
  - **Contact**: Interactive message form with confetti physics, social links, location (Cairo, Egypt).

---

## 🛠️ Tech Stack

- **Framework**: React 18 (JavaScript, No TypeScript)
- **Build Tool**: Vite 5
- **Routing**: React Router 6 (`react-router-dom`)
- **Animations**: Framer Motion 11 (`framer-motion`)
- **Icons**: React Icons (`react-icons`)
- **Markdown & Code Highlighting**: `react-markdown`, `remark-gfm`, `prismjs`
- **Effects**: `canvas-confetti`
- **Styling**: SCSS / CSS Modules with KDE Breeze Dark Tokens (No Tailwind)

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Clone the repository
git clone https://github.com/0xmahmoudd/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open `http://localhost:5173` in your browser to view the desktop portfolio.

---

## 📦 Building for Production & GitHub Pages Deployment

This project is pre-configured for seamless deployment to **GitHub Pages**.

### 1. Build Production Bundle
```bash
npm run build
```

### 2. Deploy to GitHub Pages
```bash
npm run deploy
```
*(Runs `npm run build` and automatically pushes the build output to the `gh-pages` branch via the `gh-pages` npm package).*

---

## 📜 License

MIT License © 2026 Mahmoud Ayman
