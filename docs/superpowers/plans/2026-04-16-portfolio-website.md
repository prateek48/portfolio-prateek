# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page React portfolio website with dark techy aesthetic, multi-accent warm colors, and heavy scroll-driven animations.

**Architecture:** Vite + React single-page app. 6 full-viewport sections with scroll snapping. GSAP ScrollTrigger for scroll-based animations, Framer Motion for component-level interactions. CSS Modules for scoped styling. Data extracted into JS modules for clean separation.

**Tech Stack:** React 18, Vite, GSAP + ScrollTrigger, Framer Motion, CSS Modules, React Icons

---

## File Structure

```
portfolio-prateek/
├── public/
│   └── assets/                    # photo, favicon
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx         # glassmorphism fixed nav
│   │   │   └── Navbar.module.css
│   │   ├── Hero/
│   │   │   ├── Hero.jsx           # hero section with particles
│   │   │   └── Hero.module.css
│   │   ├── About/
│   │   │   ├── About.jsx          # about section with stats
│   │   │   └── About.module.css
│   │   ├── Skills/
│   │   │   ├── Skills.jsx         # skills grid + orbit
│   │   │   └── Skills.module.css
│   │   ├── Experience/
│   │   │   ├── Experience.jsx     # road journey timeline
│   │   │   └── Experience.module.css
│   │   ├── Projects/
│   │   │   ├── Projects.jsx       # project cards
│   │   │   └── Projects.module.css
│   │   ├── Contact/
│   │   │   ├── Contact.jsx        # contact cards + footer
│   │   │   └── Contact.module.css
│   │   └── common/
│   │       ├── SectionLabel.jsx   # reusable "01 — ABOUT" label
│   │       ├── GradientText.jsx   # text with gradient fill
│   │       └── common.module.css
│   ├── hooks/
│   │   └── useMouseParallax.js    # tracks mouse for parallax
│   ├── data/
│   │   ├── skills.js              # skill categories + items
│   │   ├── experience.js          # career timeline entries
│   │   └── projects.js            # project info
│   ├── styles/
│   │   ├── global.css             # resets, variables, base styles
│   │   └── variables.css          # CSS custom properties
│   ├── App.jsx                    # main app, scroll container
│   ├── App.module.css             # scroll snap container styles
│   └── main.jsx                   # entry point
├── index.html
├── package.json
└── vite.config.js
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/App.module.css`

- [ ] **Step 1: Scaffold Vite React project**

Run:
```bash
cd /Users/prateekagrawal/portfolio-prateek
npm create vite@latest . -- --template react
```

Expected: Vite scaffolds React project in current directory.

- [ ] **Step 2: Install dependencies**

Run:
```bash
npm install gsap @gsap/react framer-motion react-icons
```

- [ ] **Step 3: Clean up scaffolded files**

Delete `src/App.css`, `src/index.css`, `src/assets/react.svg`, `public/vite.svg`. Clear contents of `src/App.jsx` to a blank component (will be built in later tasks).

Replace `src/App.jsx` with:

```jsx
function App() {
  return <div>Portfolio</div>;
}

export default App;
```

Replace `src/main.jsx` with:

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 4: Verify dev server starts**

Run: `npm run dev`

Expected: Vite dev server starts, page shows "Portfolio" in browser.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: scaffold Vite React project with dependencies"
```

---

### Task 2: Global Styles & CSS Variables

**Files:**
- Create: `src/styles/variables.css`, `src/styles/global.css`
- Modify: `src/main.jsx`

- [ ] **Step 1: Create CSS variables**

Create `src/styles/variables.css`:

```css
:root {
  --bg-primary: #0d0d0d;
  --bg-secondary: #111111;
  --bg-card: rgba(255, 255, 255, 0.02);
  --bg-card-border: rgba(255, 255, 255, 0.06);

  --text-primary: #f0f0f0;
  --text-secondary: #888888;
  --text-muted: #666666;
  --text-dim: #555555;

  --accent-red: #ff6b6b;
  --accent-gold: #ffd93d;
  --accent-green: #6bcb77;

  --accent-red-bg: rgba(255, 107, 107, 0.1);
  --accent-red-border: rgba(255, 107, 107, 0.2);
  --accent-gold-bg: rgba(255, 217, 61, 0.1);
  --accent-gold-border: rgba(255, 217, 61, 0.2);
  --accent-green-bg: rgba(107, 203, 119, 0.1);
  --accent-green-border: rgba(107, 203, 119, 0.2);

  --nav-blur: blur(12px);
  --nav-bg: rgba(13, 13, 13, 0.5);
  --nav-border: rgba(255, 255, 255, 0.05);

  --font-primary: 'Segoe UI', system-ui, -apple-system, sans-serif;
  --font-mono: 'SF Mono', 'Fira Code', monospace;

  --section-padding: 50px;
  --nav-height: 60px;
}
```

- [ ] **Step 2: Create global styles**

Create `src/styles/global.css`:

```css
@import './variables.css';

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-primary);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
}

ul, ol {
  list-style: none;
}

::selection {
  background: var(--accent-red);
  color: var(--bg-primary);
}
```

- [ ] **Step 3: Import global styles in main.jsx**

Update `src/main.jsx`:

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 4: Verify styles apply**

Run dev server, confirm dark background and correct font rendering.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add global styles and CSS variables"
```

---

### Task 3: Data Files

**Files:**
- Create: `src/data/skills.js`, `src/data/experience.js`, `src/data/projects.js`

- [ ] **Step 1: Create skills data**

Create `src/data/skills.js`:

```js
export const skillCategories = [
  {
    id: 'frontend',
    label: 'FRONTEND',
    accent: 'red',
    skills: ['React.js', 'Next.js', 'Redux Toolkit', 'JavaScript', 'HTML5', 'CSS3', 'React Native'],
  },
  {
    id: 'backend',
    label: 'BACKEND',
    accent: 'gold',
    skills: ['Node.js', 'Express.js', 'Spring Boot', 'Django', 'Java'],
  },
  {
    id: 'database-tools',
    label: 'DATABASE & TOOLS',
    accent: 'green',
    skills: ['MongoDB', 'MySQL', 'Git', 'Jest', 'Socket.io', 'C / C++'],
  },
];

export const coreStack = ['React', 'Node', 'MongoDB', 'Next.js'];
```

- [ ] **Step 2: Create experience data**

Create `src/data/experience.js`:

```js
export const experiences = [
  {
    id: 'rippling',
    company: 'Rippling',
    role: 'SWE 2 (Frontend)',
    period: 'Mar 2024 – Present',
    description:
      'Building zero-to-one products on the Billing team. Variable compensation, contract flows, and the infrastructure powering massive ARR.',
    accent: 'red',
    badge: 'CURRENT',
  },
  {
    id: 'flipkart',
    company: 'Flipkart (Cleartrip)',
    role: 'UI Engineer',
    period: 'Jun 2022 – Mar 2024',
    description:
      'Built the coupon engine from scratch. Optimized Core Web Vitals (CLS, LCP). Shipped user management systems, auth flows, and extensive Jest test coverage.',
    accent: 'gold',
    badge: null,
  },
  {
    id: 'airbus',
    company: 'Airbus',
    role: 'Associate Software Engineer',
    period: 'Jul 2021 – Jun 2022',
    description:
      'Built production React components. Created internal G-sites for collaboration. Resolved ETL pipeline issues and deployed SSIS packages.',
    accent: 'green',
    badge: null,
  },
  {
    id: 'ascian',
    company: 'Ascian Solutions',
    role: 'React Developer Intern',
    period: 'Mar 2021 – Jul 2021',
    description:
      'Built the complete front-end for Rabbit Forms (SaaS). Django REST API integration. JWT auth.',
    accent: 'red',
    badge: null,
  },
  {
    id: 'inkflix',
    company: 'Inkflix',
    role: 'Back End Developer',
    period: 'Aug 2020 – Jan 2021',
    description:
      'Built APIs with Strapi (headless CMS). Database schema design. Where it all began.',
    accent: 'gold',
    badge: 'START',
  },
];
```

- [ ] **Step 3: Create projects data**

Create `src/data/projects.js`:

```js
export const projects = [
  {
    id: 'drawing-tool',
    title: 'Drawing Tool',
    description:
      'Real-time collaborative drawing app with Next.js. Drawing, erasing, undo/redo, canvas download. WebSocket sync for multi-user collaboration.',
    tech: ['Next.js', 'Redux', 'Socket.io'],
    techAccents: ['red', 'gold', 'green'],
    liveUrl: null,
    githubUrl: 'https://github.com/prateek48',
  },
  {
    id: 'crown-clothing',
    title: 'Crown Clothing',
    description:
      'Full e-commerce site for fashion & lifestyle. Firebase auth, React Router, Redux for state, Stripe payment integration.',
    tech: ['React', 'Redux', 'Stripe'],
    techAccents: ['red', 'gold', 'green'],
    liveUrl: null,
    githubUrl: 'https://github.com/prateek48',
  },
];
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add data files for skills, experience, and projects"
```

---

### Task 4: Common Components

**Files:**
- Create: `src/components/common/SectionLabel.jsx`, `src/components/common/GradientText.jsx`, `src/components/common/common.module.css`

- [ ] **Step 1: Create SectionLabel component**

Create `src/components/common/SectionLabel.jsx`:

```jsx
import styles from './common.module.css';

const accentColors = {
  red: 'var(--accent-red)',
  gold: 'var(--accent-gold)',
  green: 'var(--accent-green)',
};

export default function SectionLabel({ number, text, accent = 'red' }) {
  return (
    <div className={styles.sectionLabel} style={{ color: accentColors[accent] }}>
      {number} &mdash; {text}
    </div>
  );
}
```

- [ ] **Step 2: Create GradientText component**

Create `src/components/common/GradientText.jsx`:

```jsx
import styles from './common.module.css';

export default function GradientText({ children, from = 'var(--accent-red)', to = 'var(--accent-gold)' }) {
  return (
    <span
      className={styles.gradientText}
      style={{ backgroundImage: `linear-gradient(90deg, ${from}, ${to})` }}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 3: Create common styles**

Create `src/components/common/common.module.css`:

```css
.sectionLabel {
  font-size: 10px;
  letter-spacing: 3px;
  margin-bottom: 8px;
  font-weight: 500;
  text-transform: uppercase;
}

.gradientText {
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add SectionLabel and GradientText common components"
```

---

### Task 5: Mouse Parallax Hook

**Files:**
- Create: `src/hooks/useMouseParallax.js`

- [ ] **Step 1: Create the hook**

Create `src/hooks/useMouseParallax.js`:

```js
import { useState, useEffect, useCallback } from 'react';

export default function useMouseParallax(strength = 0.02) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setPosition({
        x: (e.clientX - centerX) * strength,
        y: (e.clientY - centerY) * strength,
      });
    },
    [strength]
  );

  useEffect(() => {
    let rafId;
    const throttledHandler = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        handleMouseMove(e);
        rafId = null;
      });
    };

    window.addEventListener('mousemove', throttledHandler);
    return () => {
      window.removeEventListener('mousemove', throttledHandler);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [handleMouseMove]);

  return position;
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: add useMouseParallax hook"
```

---

### Task 6: Navbar Component

**Files:**
- Create: `src/components/Navbar/Navbar.jsx`, `src/components/Navbar/Navbar.module.css`

- [ ] **Step 1: Create Navbar component**

Create `src/components/Navbar/Navbar.jsx`:

```jsx
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'HOME', href: '#hero' },
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'CAREER', href: '#experience' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const container = document.getElementById('scroll-container');
    if (!container) return;

    const handleScroll = () => {
      const currentY = container.scrollTop;
      setHidden(currentY > lastScrollY && currentY > 100);
      setLastScrollY(currentY);

      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(id);
          break;
        }
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`${styles.nav} ${hidden ? styles.hidden : ''}`}>
      <div className={styles.logo}>
        PRATEEK<span className={styles.dot}>.</span>
      </div>

      <button
        className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`${styles.links} ${menuOpen ? styles.linksOpen : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`${styles.link} ${activeSection === link.href.replace('#', '') ? styles.active : ''}`}
            onClick={(e) => handleClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Create Navbar styles**

Create `src/components/Navbar/Navbar.module.css`:

```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 40px;
  height: var(--nav-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--nav-bg);
  backdrop-filter: var(--nav-blur);
  -webkit-backdrop-filter: var(--nav-blur);
  border-bottom: 1px solid var(--nav-border);
  transition: transform 0.3s ease;
}

.hidden {
  transform: translateY(-100%);
}

.logo {
  font-size: 18px;
  font-weight: 300;
  letter-spacing: 3px;
  color: var(--text-primary);
}

.dot {
  color: var(--accent-red);
  font-weight: 600;
}

.links {
  display: flex;
  gap: 28px;
}

.link {
  font-size: 11px;
  color: var(--text-secondary);
  letter-spacing: 1.5px;
  font-weight: 400;
  padding-bottom: 2px;
  border-bottom: 1px solid transparent;
  transition: color 0.3s ease, border-color 0.3s ease;
}

.link:hover {
  color: var(--text-primary);
}

.active {
  color: var(--text-primary);
  border-bottom-color: var(--accent-red);
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
  z-index: 101;
}

.hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text-primary);
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.hamburgerOpen span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburgerOpen span:nth-child(2) {
  opacity: 0;
}

.hamburgerOpen span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

@media (max-width: 768px) {
  .nav {
    padding: 0 20px;
  }

  .hamburger {
    display: flex;
  }

  .links {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 260px;
    flex-direction: column;
    background: rgba(13, 13, 13, 0.95);
    backdrop-filter: blur(20px);
    padding: 80px 30px;
    gap: 24px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }

  .linksOpen {
    transform: translateX(0);
  }
}
```

- [ ] **Step 3: Verify navbar renders**

Temporarily add `<Navbar />` to `App.jsx`, verify it renders correctly with glassmorphism effect.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add glassmorphism Navbar with scroll hide/show"
```

---

### Task 7: Hero Section

**Files:**
- Create: `src/components/Hero/Hero.jsx`, `src/components/Hero/Hero.module.css`

- [ ] **Step 1: Create Hero component**

Create `src/components/Hero/Hero.jsx`:

```jsx
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import useMouseParallax from '../../hooks/useMouseParallax';
import styles from './Hero.module.css';

const subtitles = ['BEAUTIFUL INTERFACES', 'SCALABLE APPS', 'GREAT EXPERIENCES'];

export default function Hero() {
  const sectionRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const subtitleIndex = useRef(0);
  const mouse = useMouseParallax(0.02);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        nameRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.6, ease: 'power3.out', delay: 0.5 }
      );
    }, sectionRef);

    const interval = setInterval(() => {
      subtitleIndex.current = (subtitleIndex.current + 1) % subtitles.length;
      if (subtitleRef.current) {
        gsap.to(subtitleRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.3,
          onComplete: () => {
            if (subtitleRef.current) {
              subtitleRef.current.textContent = subtitles[subtitleIndex.current];
              gsap.fromTo(subtitleRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 });
            }
          },
        });
      }
    }, 3000);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  const nameLetters = 'PRATEEK AGRAWAL'.split('');

  const socialLinks = [
    { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/prateekagrawal1999/', label: 'LinkedIn' },
    { icon: <FiGithub />, href: 'https://github.com/prateek48', label: 'GitHub' },
    { icon: <FiMail />, href: 'mailto:prateekag1999@gmail.com', label: 'Email' },
  ];

  return (
    <section id="hero" ref={sectionRef} className={styles.hero}>
      <div className={styles.background} style={{ transform: `translate(${mouse.x}px, ${mouse.y}px)` }}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />
        <div className={styles.blob3} />
        <div className={styles.grid} />
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={styles.orb}
            style={{
              top: `${15 + i * 14}%`,
              left: `${18 + ((i * 17) % 70)}%`,
              animationDelay: `${i * 0.5}s`,
              background: [
                'var(--accent-red)',
                'var(--accent-gold)',
                'var(--accent-green)',
              ][i % 3],
              boxShadow: `0 0 12px 3px ${
                ['rgba(255,107,107,0.3)', 'rgba(255,217,61,0.3)', 'rgba(107,203,119,0.3)'][i % 3]
              }`,
            }}
          />
        ))}
      </div>

      <div className={styles.content}>
        <motion.div
          className={styles.greeting}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          HELLO, I'M
        </motion.div>

        <div className={styles.name} ref={nameRef}>
          {nameLetters.map((letter, i) => (
            <span key={i} className={letter === ' ' ? styles.space : styles.letter}>
              {letter}
            </span>
          ))}
        </div>

        <div className={styles.underline} />

        <div className={styles.subtitle}>
          I BUILD{' '}
          <span ref={subtitleRef} className={styles.rotatingText}>
            {subtitles[0]}
          </span>
        </div>

        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          UI Engineer at Rippling with 5+ years crafting performant,
          <br />
          user-centric web experiences with React & modern JavaScript.
        </motion.p>

        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <a href="#projects" className={styles.ctaPrimary}>
            VIEW MY WORK
          </a>
          <a href="#contact" className={styles.ctaSecondary}>
            GET IN TOUCH
          </a>
        </motion.div>

        <motion.div
          className={styles.socials}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </motion.div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}>
          <div className={styles.wheel} />
        </div>
        <span>SCROLL</span>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create Hero styles**

Create `src/components/Hero/Hero.module.css`:

```css
.hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  scroll-snap-align: start;
}

.background {
  position: absolute;
  inset: -50px;
  pointer-events: none;
  transition: transform 0.1s ease-out;
}

.blob1 {
  position: absolute;
  top: -20%;
  right: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(255, 107, 107, 0.12) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(60px);
}

.blob2 {
  position: absolute;
  bottom: -15%;
  left: -5%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(107, 203, 119, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(50px);
}

.blob3 {
  position: absolute;
  top: 30%;
  left: 40%;
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(255, 217, 61, 0.06) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(40px);
}

.grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 40px 40px;
}

.orb {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 700px;
  padding: 0 20px;
}

.greeting {
  font-size: 13px;
  color: var(--accent-green);
  letter-spacing: 3px;
  margin-bottom: 16px;
  font-weight: 300;
}

.name {
  font-size: clamp(32px, 6vw, 52px);
  letter-spacing: 8px;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 4px;
}

.letter, .space {
  display: inline-block;
  opacity: 0;
}

.space {
  width: 0.3em;
}

.underline {
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-red), var(--accent-gold), var(--accent-green));
  margin: 12px auto 20px;
  border-radius: 2px;
}

.subtitle {
  font-size: 15px;
  color: var(--text-secondary);
  letter-spacing: 2px;
  margin-bottom: 24px;
  font-weight: 300;
}

.rotatingText {
  color: var(--accent-gold);
  font-weight: 500;
  display: inline-block;
}

.tagline {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.8;
  max-width: 500px;
  margin: 0 auto 28px;
  letter-spacing: 0.5px;
}

.ctas {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 28px;
}

.ctaPrimary {
  padding: 10px 28px;
  background: linear-gradient(135deg, var(--accent-red), #ff8e8e);
  color: var(--bg-primary);
  font-size: 12px;
  letter-spacing: 1.5px;
  font-weight: 600;
  border-radius: 6px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.ctaPrimary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(255, 107, 107, 0.3);
}

.ctaSecondary {
  padding: 10px 28px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #ccc;
  font-size: 12px;
  letter-spacing: 1.5px;
  border-radius: 6px;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.ctaSecondary:hover {
  border-color: var(--accent-gold);
  color: var(--accent-gold);
}

.socials {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.socialIcon {
  width: 36px;
  height: 36px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.03);
  transition: border-color 0.3s ease, color 0.3s ease, transform 0.2s ease;
}

.socialIcon:hover {
  border-color: var(--accent-red);
  color: var(--accent-red);
  transform: translateY(-3px);
}

.scrollIndicator {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 2;
}

.mouse {
  width: 20px;
  height: 32px;
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  margin: 0 auto 6px;
  position: relative;
}

.wheel {
  width: 3px;
  height: 6px;
  background: var(--accent-red);
  border-radius: 2px;
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%, 100% { opacity: 1; top: 6px; }
  50% { opacity: 0.3; top: 14px; }
}

.scrollIndicator span {
  font-size: 9px;
  color: var(--text-dim);
  letter-spacing: 2px;
}

@media (max-width: 768px) {
  .name {
    letter-spacing: 4px;
  }

  .ctas {
    flex-direction: column;
    align-items: center;
  }
}
```

- [ ] **Step 3: Verify Hero section renders**

Add Hero to App.jsx, verify: background effects, name animation, rotating subtitle, CTA buttons, social icons, scroll indicator.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Hero section with animations and parallax"
```

---

### Task 8: About Section

**Files:**
- Create: `src/components/About/About.jsx`, `src/components/About/About.module.css`

- [ ] **Step 1: Create About component**

Create `src/components/About/About.jsx`:

```jsx
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '../common/SectionLabel';
import GradientText from '../common/GradientText';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 5, suffix: '+', label: 'YEARS', accent: 'var(--accent-red)' },
  { value: 4, suffix: '', label: 'COMPANIES', accent: 'var(--accent-gold)' },
  { value: 0, suffix: '→1', label: 'PRODUCTS', accent: 'var(--accent-green)' },
];

const pills = [
  { text: '📍 Bengaluru, India', accent: 'red' },
  { text: '🎓 B.Tech IT — JEC', accent: 'gold' },
  { text: '⭐ 4-Star CodeChef', accent: 'green' },
  { text: '🎯 GATE CSE Qualified', accent: 'red' },
];

export default function About() {
  const sectionRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scroller = document.getElementById('scroll-container');

      gsap.from(`.${styles.photoCard}`, {
        x: -80,
        opacity: 0,
        rotation: -5,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller,
          start: 'top 80%',
        },
      });

      gsap.from(`.${styles.textContent} > *`, {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller,
          start: 'top 70%',
        },
      });

      stats.forEach((stat, i) => {
        const el = statsRef.current[i];
        if (!el || stat.value === 0) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller,
            start: 'top 70%',
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + stat.suffix;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className={styles.about}>
      <div className={styles.bgAccent1} />
      <div className={styles.bgAccent2} />

      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.photoCard}>
            <div className={styles.cornerTL} />
            <div className={styles.cornerBR} />
            <div className={styles.photoPlaceholder}>YOUR PHOTO</div>
          </div>

          <div className={styles.stats}>
            {stats.map((stat, i) => (
              <div key={stat.label} className={styles.stat}>
                <div
                  className={styles.statValue}
                  ref={(el) => (statsRef.current[i] = el)}
                  style={{ color: stat.accent }}
                >
                  {stat.value === 0 ? `0${stat.suffix}` : '0'}
                </div>
                <div className={styles.statLabel}>{stat.label}</div>
                {i < stats.length - 1 && <div className={styles.statDivider} />}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.textContent}>
          <SectionLabel number="01" text="ABOUT ME" accent="red" />

          <h2 className={styles.heading}>
            Crafting pixels into
            <br />
            <GradientText>meaningful experiences</GradientText>
          </h2>

          <p className={styles.paragraph}>
            Software Engineer 2 (Frontend) at <strong>Rippling</strong>, where I'm building
            zero-to-one products on the Billing team — powering variable compensation, contract
            flows, and the infrastructure behind massive ARR. I care about shipping things that
            scale.
          </p>

          <p className={styles.paragraph}>
            Before Rippling, I built coupon engines at <strong>Flipkart (Cleartrip)</strong>,
            shipped production components at <strong>Airbus</strong>, and developed SaaS products at{' '}
            <strong>Ascian Solutions</strong>. 5+ years of React, performance obsession, and a
            competitive coding background that keeps my problem-solving sharp.
          </p>

          <div className={styles.pills}>
            {pills.map((pill) => (
              <span key={pill.text} className={`${styles.pill} ${styles[`pill_${pill.accent}`]}`}>
                {pill.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create About styles**

Create `src/components/About/About.module.css`:

```css
.about {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  scroll-snap-align: start;
  padding: 0 var(--section-padding);
}

.bgAccent1 {
  position: absolute;
  top: 10%;
  right: -5%;
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(255, 217, 61, 0.06) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(50px);
  pointer-events: none;
}

.bgAccent2 {
  position: absolute;
  bottom: 5%;
  left: 10%;
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(255, 107, 107, 0.05) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(40px);
  pointer-events: none;
}

.container {
  display: flex;
  gap: 60px;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  z-index: 1;
}

.left {
  flex-shrink: 0;
}

.photoCard {
  width: 220px;
  height: 260px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.15), rgba(255, 217, 61, 0.1));
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cornerTL {
  position: absolute;
  top: -8px;
  left: -8px;
  width: 40px;
  height: 40px;
  border-top: 2px solid var(--accent-red);
  border-left: 2px solid var(--accent-red);
}

.cornerBR {
  position: absolute;
  bottom: -8px;
  right: -8px;
  width: 40px;
  height: 40px;
  border-bottom: 2px solid var(--accent-green);
  border-right: 2px solid var(--accent-green);
}

.photoPlaceholder {
  color: var(--text-dim);
  font-size: 12px;
  letter-spacing: 1px;
}

.stats {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  justify-content: center;
}

.stat {
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.statValue {
  font-size: 22px;
  font-weight: 700;
}

.statLabel {
  font-size: 9px;
  color: var(--text-muted);
  letter-spacing: 1px;
}

.statDivider {
  position: absolute;
  right: -8px;
  top: 5px;
  width: 1px;
  height: 30px;
  background: rgba(255, 255, 255, 0.08);
}

.textContent {
  flex: 1;
}

.heading {
  font-size: clamp(22px, 3vw, 28px);
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 20px;
  line-height: 1.3;
}

.paragraph {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.9;
  margin-bottom: 16px;
  max-width: 500px;
}

.paragraph strong {
  color: #ccc;
  font-weight: 500;
}

.pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
}

.pill {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 11px;
  letter-spacing: 0.5px;
}

.pill_red {
  background: var(--accent-red-bg);
  border: 1px solid var(--accent-red-border);
  color: var(--accent-red);
}

.pill_gold {
  background: var(--accent-gold-bg);
  border: 1px solid var(--accent-gold-border);
  color: var(--accent-gold);
}

.pill_green {
  background: var(--accent-green-bg);
  border: 1px solid var(--accent-green-border);
  color: var(--accent-green);
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    gap: 30px;
    padding-top: 80px;
  }

  .about {
    height: auto;
    min-height: 100vh;
    padding: 20px;
  }
}
```

- [ ] **Step 3: Verify About section renders with scroll animations**

Add About to App.jsx after Hero. Verify: photo card slide-in, counter animation, text reveals, pill pop-ins.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add About section with counter animations and scroll reveals"
```

---

### Task 9: Skills Section

**Files:**
- Create: `src/components/Skills/Skills.jsx`, `src/components/Skills/Skills.module.css`

- [ ] **Step 1: Create Skills component**

Create `src/components/Skills/Skills.jsx` with:
- Import `skillCategories` and `coreStack` from `../../data/skills`
- 3 category cards using data, each with accent-colored dot, label, and skill pills
- Orbit ring at the bottom with `coreStack` labels positioned around an ellipse, animated with GSAP infinite rotation
- ScrollTrigger animations: staggered card fade-in, pill pop-in
- Hover: scale + glow on pills

- [ ] **Step 2: Create Skills styles**

Create `src/components/Skills/Skills.module.css` with:
- `.skills` section: full viewport, scroll-snap-align, flex center
- `.grid`: 3-column grid for category cards
- `.card`: accent-colored subtle background and border, rounded corners
- `.dot`: small glowing circle with pulse animation
- `.skillPill`: pill with accent background/border, hover scale transform
- `.orbit`: relative container for the ellipse + orbiting labels
- `.orbitRing`: border ellipse
- `.orbitItem`: absolutely positioned labels that rotate
- Mobile: single-column grid

- [ ] **Step 3: Verify Skills section renders**

Add Skills to App.jsx. Verify: cards appear, pills render, orbit ring rotates.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Skills section with orbit animation and category cards"
```

---

### Task 10: Experience Section (Road Journey)

**Files:**
- Create: `src/components/Experience/Experience.jsx`, `src/components/Experience/Experience.module.css`

- [ ] **Step 1: Create Experience component**

Create `src/components/Experience/Experience.jsx` with:
- Import `experiences` from `../../data/experience`
- SVG winding road path on the left with a gradient stroke and dash pattern
- Road path draws itself via GSAP ScrollTrigger `stroke-dashoffset` animation
- A glowing dot element that moves along the path using GSAP `motionPath` (or manual offset)
- 5 stop nodes with glowing circles, each connected to a company card
- Cards slide in with stagger; "CURRENT" badge pulses on Rippling; "START" badge on Inkflix
- Each card shows: company name, role, period, description, accent-colored border

- [ ] **Step 2: Create Experience styles**

Create `src/components/Experience/Experience.module.css` with:
- `.experience` section: full viewport, scroll-snap-align
- `.road`: absolute positioned SVG container
- `.stop`: relative positioned with left padding for the road
- `.node`: glowing circle at each stop
- `.card`: accent-colored background/border, rounded corners
- `.badge`: small pill for CURRENT/START labels
- `.badgeCurrent`: pulsing animation
- Mobile: cards stack, road simplified to a straight line

- [ ] **Step 3: Verify Experience section renders**

Add Experience to App.jsx. Verify: road draws on scroll, stops light up, cards slide in.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Experience section with road journey animation"
```

---

### Task 11: Projects Section

**Files:**
- Create: `src/components/Projects/Projects.jsx`, `src/components/Projects/Projects.module.css`

- [ ] **Step 1: Create Projects component**

Create `src/components/Projects/Projects.jsx` with:
- Import `projects` from `../../data/projects`
- 2-column grid of project cards
- Each card: preview area (SVG illustration for drawing tool, colored grid for e-commerce), tech pills overlay, title + description, live link + GitHub icon buttons
- ScrollTrigger: cards rise with 3D perspective tilt
- Hover: card lifts, shadow enhances, border shimmer
- Links open in new tab

- [ ] **Step 2: Create Projects styles**

Create `src/components/Projects/Projects.module.css` with:
- `.projects` section: full viewport, scroll-snap-align
- `.grid`: 2-column grid
- `.card`: rounded corners, overflow hidden, subtle border, hover transform
- `.preview`: fixed height with gradient background for visual content
- `.techPill`: small pill positioned in preview corner
- `.info`: padding with title, description, link icons
- `.iconButton`: rounded square icon buttons for links
- Mobile: single column

- [ ] **Step 3: Verify Projects section renders**

Add Projects to App.jsx. Verify: cards appear with previews, hover effects work, links clickable.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Projects section with 3D card animations"
```

---

### Task 12: Contact Section

**Files:**
- Create: `src/components/Contact/Contact.jsx`, `src/components/Contact/Contact.module.css`

- [ ] **Step 1: Create Contact component**

Create `src/components/Contact/Contact.jsx` with:
- Import `FiMail`, `FiLinkedin`, `FiGithub`, `FiPhone` from `react-icons/fi`
- Centered layout with section label, large gradient heading, subtitle
- 4 contact cards: Email, LinkedIn, GitHub, Phone — each with SVG icon, label, value
- Magnetic tilt hover effect using `onMouseMove` to calculate tilt angle
- Footer with gradient line and attribution text
- ScrollTrigger: staggered card entrance, heading word reveal

- [ ] **Step 2: Create Contact styles**

Create `src/components/Contact/Contact.module.css` with:
- `.contact` section: full viewport, centered flex, scroll-snap-align
- `.heading`: large font, gradient text on "Together"
- `.cards`: flex row with gap
- `.card`: rounded, accent background/border, text-align center, hover lift + glow
- `.iconWrapper`: rounded square with accent background for icon
- `.footer`: gradient line, small attribution text
- Mobile: cards wrap 2x2

- [ ] **Step 3: Verify Contact section renders**

Add Contact to App.jsx. Verify: cards render with icons, hover tilt works, footer visible.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Contact section with magnetic hover cards"
```

---

### Task 13: App Assembly & Scroll Snapping

**Files:**
- Modify: `src/App.jsx`
- Create: `src/App.module.css`

- [ ] **Step 1: Assemble all sections in App**

Update `src/App.jsx`:

```jsx
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import styles from './App.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    ScrollTrigger.defaults({
      scroller: '#scroll-container',
    });
    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      <Navbar />
      <main id="scroll-container" className={styles.container}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
```

- [ ] **Step 2: Create App styles with scroll snapping**

Create `src/App.module.css`:

```css
.container {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}
```

- [ ] **Step 3: Verify full site works end-to-end**

Run dev server. Verify:
- All 6 sections render in order
- Scroll snapping works between sections
- Nav links scroll to correct sections
- Nav hides/shows on scroll
- All scroll-triggered animations fire correctly
- Hover effects work on all interactive elements

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: assemble full portfolio with scroll snapping"
```

---

### Task 14: Polish & Responsiveness

**Files:**
- Modify: all component CSS modules as needed

- [ ] **Step 1: Test and fix mobile responsiveness**

Open dev tools, test at 375px, 768px, 1024px widths. Fix any layout issues:
- Hero: name font size scales, CTA buttons stack
- About: columns stack vertically
- Skills: grid goes single column
- Experience: road simplifies
- Projects: single column
- Contact: cards wrap 2x2

- [ ] **Step 2: Add smooth page load transition**

Add a brief fade-in on the body to prevent layout flash:

Update `src/styles/global.css` — add:

```css
body {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

- [ ] **Step 3: Update index.html meta tags**

Update `index.html`:
- Title: "Prateek Agrawal — Frontend Engineer"
- Meta description
- Favicon placeholder
- OG tags

- [ ] **Step 4: Final visual review**

Run through the full site one more time. Check:
- All animations trigger at the right time
- No layout shifts or overflow issues
- Colors consistent with spec
- Links work (Gmail, LinkedIn, GitHub)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: polish responsive design and add meta tags"
```
