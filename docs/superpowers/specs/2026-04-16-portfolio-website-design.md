# Portfolio Website — Design Spec

**Author:** Prateek Agrawal  
**Date:** 2026-04-16  
**Status:** Approved

---

## Overview

A single-page portfolio website for a front-end engineer. Dark & techy aesthetic with multi-accent warm colors (red, gold, green). Heavy animation throughout — scroll-driven, interactive, and cinematic. Full-screen sections with scroll snapping.

## Tech Stack

- **React 18** via **Vite** (no SSR needed)
- **GSAP** + ScrollTrigger for scroll-driven animations, timelines, and complex sequences
- **Framer Motion** for component-level animations (hover, entrance, layout)
- **CSS Modules** for scoped styling
- **React Icons** for social/contact icons (SVGs)
- Deploy target: Vercel / Netlify / GitHub Pages (static)

## Design Decisions

- **Single page, full-viewport sections** with scroll snapping (`scroll-snap-type: y mandatory`)
- **Dark base** (`#0d0d0d`) with three accent colors cycled per section:
  - Red: `#ff6b6b`
  - Gold: `#ffd93d`
  - Green: `#6bcb77`
- **Glassmorphism nav** fixed at top with blur backdrop
- **Consistent section labeling**: numbered labels like "01 — ABOUT ME" with accent color per section
- **Gradient headings** using accent pairs for visual punch
- **Font**: System font stack (`'Segoe UI', system-ui, -apple-system, sans-serif`) with monospace accents where appropriate

## Sections

### 1. Hero (Full Viewport)

**Layout:**
- Fixed glassmorphism nav bar: logo "PRATEEK." (red accent dot) on left, section links on right (HOME, ABOUT, SKILLS, CAREER, PROJECTS, CONTACT)
- Center content: greeting "HELLO, I'M", large name "PRATEEK AGRAWAL" with gradient underline (all 3 accents), rotating subtitle ("BEAUTIFUL INTERFACES" / "SCALABLE APPS" / "GREAT EXPERIENCES"), brief tagline, two CTA buttons ("VIEW MY WORK" gradient fill, "GET IN TOUCH" ghost), social icons row (LinkedIn, GitHub, Gmail)
- Mouse-style scroll indicator at bottom

**Background:**
- Gradient mesh blobs (soft red, green, gold radial gradients with blur)
- Floating orbs with glow, connected by faint constellation lines (SVG)
- Subtle grain texture overlay
- Subtle grid with parallax on mouse move

**Animations:**
- Background blobs slowly drift and morph (GSAP continuous)
- Orbs float with parallax on mouse move
- Name reveals letter-by-letter with staggered fade-up
- Subtitle text rotates with typewriter effect
- Nav links slide in from top with staggered delay
- CTA buttons + social icons pop in with spring physics
- Scroll indicator pulses gently

### 2. About Me (Full Viewport)

**Layout:**
- Two-column: photo/avatar on left, text content on right
- Photo in a rounded card with decorative corner accents (SVG drawn lines)
- Below photo: 3 stat counters — "5+" years, "4" companies, "0→1" products
- Right side: section label "01 — ABOUT ME", gradient heading "Crafting pixels into meaningful experiences", two paragraphs about career, info pills (Bengaluru, B.Tech IT — JEC, 4-Star CodeChef, GATE CSE Qualified)

**Content (bio):**
- Paragraph 1: Software Engineer 2 (Frontend) at Rippling. Billing team. Zero-to-one product builds. Variable compensation, contract flows, massive ARR infrastructure.
- Paragraph 2: Previously Flipkart (Cleartrip) coupon engine, Airbus production components, Ascian Solutions SaaS products. 5+ years React, performance obsession, competitive coding background.

**Animations:**
- Photo frame slides in from left with slight rotation
- Stat counters animate from 0 to final value
- Section label and heading reveal line-by-line with fade-up
- Paragraphs fade in with staggered delay
- Info pills pop in one-by-one with spring bounce
- Corner lines on photo frame draw themselves (SVG path animation)

### 3. Skills (Full Viewport)

**Layout:**
- Section label "02 — SKILLS", gradient heading "My Tech Arsenal"
- 3 category cards in a grid (3 columns):
  - **Frontend** (red accent): React.js, Next.js, Redux Toolkit, JavaScript, HTML5, CSS3, React Native
  - **Backend** (gold accent): Node.js, Express.js, Spring Boot, Django, Java
  - **Database & Tools** (green accent): MongoDB, MySQL, Git, Jest, Socket.io, C/C++
- Each card: accent-colored dot + label, pill-style skill tags inside
- Orbit ring below: core stack labels (React, Node, MongoDB, Next.js) continuously rotating around an ellipse

**Animations:**
- Category cards fade in from below with staggered timing
- Skill pills pop in one-by-one with micro-bounce
- Category dot pulses when card is in view
- Orbit ring: labels continuously rotate (GSAP infinite tween)
- Hover on skill pill: scale-up + glow in category color
- Card borders shimmer with traveling gradient on scroll-enter

### 4. Career Journey (Full Viewport)

**Layout:**
- Section label "03 — CAREER PATH", gradient heading "The Road So Far"
- Winding dashed SVG road path down the left side, multi-color gradient (red → gold → green)
- 5 stops along the road, each with a glowing node and a company card:
  1. **Rippling** — SWE 2 (Frontend), Mar 2024 – Present. Billing team, zero-to-one, variable comp, contract flows, huge ARR. Badge: "CURRENT" (pulsing)
  2. **Flipkart (Cleartrip)** — UI Engineer, Jun 2022 – Mar 2024. Coupon engine, Core Web Vitals, user management, Jest coverage.
  3. **Airbus** — Associate Software Engineer, Jul 2021 – Jun 2022. React components, G-sites, ETL/SSIS fixes.
  4. **Ascian Solutions** — React Developer Intern, Mar 2021 – Jul 2021. Rabbit Forms SaaS front-end, Django REST, JWT auth.
  5. **Inkflix** — Back End Developer, Aug 2020 – Jan 2021. Strapi APIs, database schema. Badge: "START"

**Animations:**
- SVG road path draws itself as user scrolls (GSAP stroke-dashoffset via ScrollTrigger)
- A glowing dot travels along the road path (like GPS navigation)
- Each stop node lights up with a glow burst when the road reaches it
- Company cards slide in alternating left/right
- "CURRENT" badge pulses continuously
- Text within each card fades in with staggered reveal after card appears

### 5. Projects (Full Viewport)

**Layout:**
- Section label "04 — PROJECTS", gradient heading "Things I've Built"
- 2 project cards in a 2-column grid:
  - **Drawing Tool**: visual preview area showing faux canvas with SVG strokes, tech pills (Next.js, Redux, Socket.io), description, live link + GitHub icon. Description: real-time collaborative drawing app with drawing, erasing, undo/redo, canvas download, WebSocket sync.
  - **Crown Clothing**: visual preview area showing faux product grid, tech pills (React, Redux, Stripe), description, live link + GitHub icon. Description: full e-commerce site, Firebase auth, React Router, Redux state, Stripe payments.

**Animations:**
- Cards rise from below with 3D tilt (perspective transform) and fade in
- Preview area content animates (drawing strokes draw themselves, grid items pop in)
- Tech stack pills slide in from right on card entrance
- Hover: card lifts with enhanced shadow, preview brightness boost
- Link/GitHub icons rotate-in on hover
- Card border gets traveling gradient shimmer on hover

### 6. Contact (Full Viewport)

**Layout:**
- Centered layout. Section label "05 — CONTACT"
- Large heading: "Let's Build Something Together" (tri-color gradient on "Together")
- Subtitle paragraph inviting contact
- 4 contact cards in a row:
  - **Email** (red): SVG mail icon, prateekag1999@gmail.com
  - **LinkedIn** (gold): "in" icon, /prateekagrawal1999
  - **GitHub** (green): GitHub SVG icon, /prateek48
  - **Phone** (red): phone SVG icon, +91 9009422473
- Footer: gradient line + "Designed & Built by Prateek Agrawal · 2026"

**Animations:**
- Heading fades up word-by-word, "Together" gradient shimmers on reveal
- Contact cards rise with staggered spring physics (left to right)
- Hover: card lifts, border glows brighter in accent color, icon scales up
- Magnetic hover effect — card tilts slightly toward cursor position
- Background blobs drift slowly (continuous GSAP tween)
- Footer gradient line animates width from 0 to full on section enter

## Global Behaviors

### Navigation
- Glassmorphism nav bar fixed at top across all sections
- Clicking a nav link smooth-scrolls to that section
- Active section highlighted in nav (accent color, underline)
- Nav hides on scroll down, reappears on scroll up

### Scroll
- Full-page scroll snapping (`scroll-snap-type: y mandatory` on container, `scroll-snap-align: start` on sections)
- Each section is `100vh`
- GSAP ScrollTrigger manages all scroll-based animations

### Responsiveness
- Desktop-first design, responsive down to mobile
- On mobile: single-column layouts, reduced animation complexity, hamburger nav menu
- Skills grid collapses to single column
- Project cards stack vertically
- Contact cards wrap to 2x2 grid

### Performance
- Lazy-load heavy animations (only activate when section is near viewport)
- Use `will-change` and `transform` for GPU-accelerated animations
- Debounce mouse move handlers
- Keep total bundle lean — no unnecessary dependencies

## Project Structure

```
portfolio-prateek/
├── public/
│   └── assets/          # photo, favicon, OG image
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Hero/
│   │   ├── About/
│   │   ├── Skills/
│   │   ├── Experience/
│   │   ├── Projects/
│   │   ├── Contact/
│   │   └── common/      # shared UI pieces (SectionLabel, GradientText, etc.)
│   ├── hooks/            # useScrollTrigger, useMouseParallax, etc.
│   ├── styles/           # global styles, variables, resets
│   ├── data/             # skills, experience, projects data as JS objects
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Links

- Gmail: prateekag1999@gmail.com
- LinkedIn: https://www.linkedin.com/in/prateekagrawal1999/
- GitHub: https://github.com/prateek48
- Phone: +91 9009422473
