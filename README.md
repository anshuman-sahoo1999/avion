# AVION VISUAL INTELLIGENCE — ADVANCED INTERACTIVE STUDIO EXPERIENCE

A bespoke, responsive web presence designed and engineered for **Avion Visual Intelligence** — a visual communication studio combining strategic thinking, storytelling, film, photography, aerial visuals, and post-production.

Crafted in the spirit of top-tier international digital studios (inspired by Swiss typography, architectural minimalism, and cinematic monochrome photography).

---

## 1. Creative Direction & Identity

- **Monochrome Palette**:
  - Primary Background: `#FFFFFF`
  - Secondary Background: `#F3F3F3`
  - Surface Accent: `#FAFAFA`
  - Dark Accent / Deep Charcoal: `#111111` & `#0B0B0B`
  - Muted Dark Section: `#1A1A1A`
  - Primary Text: `#111111`
  - Secondary Text: `#707070`
  - Subtle Hairline Borders: `#D9D9D9` / `#ECECEC`
  - Inverse Text: `#FFFFFF`
- **Typography**:
  - Primary Display & Body: `Inter` (variable weights from 300 to 800) with optical stylistic sets (`cv02`, `cv03`, `cv04`, `cv11`).
  - Monospaced Metadata & Technical Labels: `Space Grotesk`.
  - Tight letter spacing on large display titles (`-0.045em`), uppercase micro-labels (`letter-spacing: 0.16em`), generous line heights (`1.65–1.72`).
- **Visual Style & Atmospheric Elements**:
  - **35mm Analog Film Grain Texture**: Subtle hardware-accelerated SVG noise overlay (`assets/images/grain.svg`) providing tactile darkroom depth.
  - **Swiss Architectural Hairline Grid**: 4-column reference guides aligned with the container grid.
  - **1px Top Reading Progress Bar**: Real-time reading depth tracker.
  - **Oversized Background Watermarks**: Monospaced numbers (`01` through `12`) floating softly with multi-layer mouse parallax.
  - **Optical Corner Reticles & Viewfinder HUDs**: Technical framing with corner brackets `┌ ┐ └ ┘` and optical metadata.

---

## 2. Technology Constraints

- **100% Vanilla Tech Stack**:
  - **HTML5**: Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<aside>`).
  - **CSS3**: CSS Custom Properties (Tokens), Flexbox, CSS Grid, `clamp()` fluid typography, and media queries (`prefers-reduced-motion`).
  - **JavaScript (ES6+)**: Zero external JS libraries, zero frameworks (no React, Vue, Bootstrap, Tailwind, or jQuery).
- **Zero Build Step Required**:
  - Runs directly in any modern web browser.
  - Ready for immediate drag-and-drop deployment to static platforms like Netlify, Vercel, or GitHub Pages.

---

## 3. Directory & File Architecture

```
AVION VISUAL INTELLIGENCE/
├── index.html                  # Semantic single-page studio experience
├── favicon.ico                 # Multi-resolution studio favicon (16/32/48/64)
├── image copy.png              # Original master light brand asset
├── css/
│   └── style.css               # Architectural design system & responsive layout
├── js/
│   └── main.js                 # ES6+ interactive features & submission adapter
├── assets/
│   ├── images/
│   │   ├── logo-dark.png       # Transparent cropped dark logo for header (1x & @2x)
│   │   ├── logo-light.png      # Transparent cropped white logo for dark footer (1x & @2x)
│   │   ├── favicon.png         # Standard 32x32 transparent favicon
│   │   ├── favicon-16x16.png   # 16x16 tab icon
│   │   ├── favicon-32x32.png   # 32x32 tab icon
│   │   ├── apple-touch-icon.png# 180x180 iOS / mobile touch icon
│   │   ├── favicon-512x512.png # 512x512 PWA high-res icon
│   │   ├── grain.svg           # 35mm analog film grain noise texture
│   │   └── fallback.svg        # Standalone vector fallback for offline/image errors
│   └── icons/                  # Bespoke Swiss SVG icon set
│       ├── arrow-right.svg
│       ├── arrow-down.svg
│       ├── arrow-up.svg
│       ├── plus.svg
│       ├── minus.svg
│       ├── check.svg
│       ├── copy.svg
│       ├── mail.svg
│       └── crosshair.svg
└── README.md                   # Technical documentation & deployment guide
```

---

## 4. Key Sections & Interactive Features

1. **Global Site Header & Responsive Mobile Navigation**:
   - Official transparent `AVION VISUAL INTELLIGENCE` brand mark with golden star.
   - Glassmorphic backdrop blur on scroll with dynamic hairline border.
   - Active section detection via `IntersectionObserver`.
   - Animated mobile hamburger menu with bidirectional open/collapse toggle, backdrop dismissal, and body scroll locking.
2. **Cinematic Hero**:
   - Oversized editorial typography: *“Make complex work easier to understand.”*
   - Clean, uncluttered composition with generous negative space and tight letter spacing.
   - Real-time mouse-tracking optical crosshair displaying live viewport coordinates (`X: [val] Y: [val] // FOCAL LOCK`).
   - High-impact architectural monochrome imagery with animated line scan scroll indicator.
3. **The Thinking Behind the Image**:
   - Editorial split layout: *“The camera is not where the story begins.”*
   - Clear typography contrasted against curated industrial monochrome photography with subtle parallax depth.
4. **Our Process (5-Stage Cinematic Timeline with Dynamic Previews)**:
   - Interactive 5-stage timeline (`01 — UNDERSTAND`, `02 — PLAN`, `03 — CAPTURE`, `04 — EDIT`, `05 — DELIVER`).
   - Dynamic stage panel with cinema split: left side highlights core questions, deliverables, and studio focus; right side dynamically updates with matching high-resolution archival plates with crossfade animation.
   - Closing principle: *“Every creative decision serves a reason.”*
5. **What We Help Communicate (6 Asymmetric Exhibition Plates)**:
   - Covers 6 distinct communication challenges:
     1. Explain Something Complex
     2. Bring an Idea to Life
     3. Show What’s Behind the Work
     4. Build a Stronger Brand Story
     5. Document Progress and Change
     6. Leave a Lasting Impression
   - Interactive 3D tilt with dynamic specular sheen on mouse move.
   - Fullscreen inspection modal on plate click.
6. **Strategy Before Production**:
   - High-contrast charcoal section (`#111111`) highlighting research and scripting as the core creative work.
7. **Selected Spatial Archive (Interactive 35mm Film Strip)**:
   - Continuous horizontal film strip of 6 curated widescreen cinematic frames.
   - **Mouse-Movement-Based Scrubbing**: moving the mouse horizontally across the viewport scrubs the film strip with fluid inertial physics.
   - Includes frame timecodes (`TC: 00:01:24:18`, `00:02:45:12`, etc.) and lens metadata.
8. **How We Think (Core Principles)**:
   - 4 large editorial rows with oversized numbering:
     - 01. Purpose Before Production
     - 02. Story Before Footage
     - 03. Plan Before Shoot
     - 04. Clarity Over Spectacle
9. **Capabilities (Museum-Grade Expandable Accordions)**:
   - 5 service areas with smooth CSS Grid height transitions:
     - Communication Strategy and Scripting
     - Production Planning
     - Film and Photography
     - Aerial Visuals
     - Post-Production
   - Detailed deliverable tags for each service.
10. **The Spatial Perspective Matrix (Scale Architecture)**:
    - Interactive 3-Tier Perspective Viewer demonstrating how Avion chooses the exact camera elevation:
      - **Tier 01: Macro Precision** (mechanical tolerances, physical craft).
      - **Tier 02: Operational Workflow** (35mm cinema dynamic range, specialists in motion).
      - **Tier 03: Monumental Topography** (400ft AGL UAV drone, geographic context).
    - Mouse-hover and click switching with smooth optical crossfades.
11. **Technical Production Standards (Studio Repertoire)**:
    - 4 technical pillars:
      - Large-Format Monochrome Cine (16+ stops dynamic range, anamorphic primes).
      - Licensed Aerial UAV Drone Fleet (CAA/FAA certified, heavy-lift & micro platforms).
      - Ambisonic Acoustic Sound Architecture (field binaural & contact microphones).
      - 12-Bit ACES Log Color & Multi-Ratio Master Archiving.
12. **About Avion**:
    - Honest, factual studio manifesto.
    - Zero fabricated awards, client lists, or fake team rosters.
    - Core ambition & working principle: *“Think clearly. Tell the story. Execute with purpose.”*
13. **Start a Project (Progressive 3-Step Brief Wizard)**:
    - Centered, focused 3-step brief wizard with project focus chips (`Complex Systems`, `Infrastructure`, `Industrial Craft`, `Brand Narrative`, `Aerial Survey`).
    - **Honest Demo Adapter**: Pre-filled `mailto:` email draft button and 1-click clipboard brief copier with floating toast confirmation.
14. **Streamlined Section Spacing & Editorial Rhythm**:
    - Responsive, tightened vertical spacing (`clamp(3.25rem, 5.5vw, 5.25rem)`) eliminating awkward dead space while preserving architectural breathing room.
15. **Fullscreen Image Lightbox Inspection Modal**:
    - Clicking photographic work across the website opens a high-resolution, full-screen monochrome lightbox with plate title, metadata, and keyboard `ESC` dismissal.
16. **Desktop Contextual Cursor**:
    - Custom fluid cursor circle that morphs to show a `VIEW` label when hovering inspectable media, and magnetic state when hovering buttons.

---

## 5. Form Submission Adapter Integration

To connect the enquiry form to a live backend or third-party email provider:

### Option A: Netlify Forms
Add `data-netlify="true"` to `<form id="project-enquiry-form">` in `index.html`.

### Option B: Formspree / Custom REST API
In `js/main.js`, locate the `handleFormSubmission` function and replace the `setTimeout` block with:

```javascript
fetch("https://formspree.io/f/YOUR_FORM_ID", {
  method: "POST",
  headers: { "Content-Type": "application/json", "Accept": "application/json" },
  body: JSON.stringify({
    name: nameInput.value.trim(),
    organisation: orgInput.value.trim(),
    contact: contactInput.value.trim(),
    selected_scopes: selectedScopes,
    working_on: workingOnInput.value.trim(),
    communication_need: communicateInput.value.trim(),
    deadline: deadlineInput.value.trim()
  })
})
.then(response => {
  if (response.ok) {
    showToast('Enquiry dispatched successfully');
  }
});
```

---

## 6. Accessibility & Performance Audit

- **Lighthouse Performance Optimization**:
  - Native lazy-loading (`loading="lazy"`) and asynchronous image decoding (`decoding="async"`).
  - Explicit aspect ratios on media wrappers to prevent Cumulative Layout Shift (CLS).
  - Preconnected Google Fonts origins for rapid font display.
- **Accessibility (WCAG 2.1 AA Compliant)**:
  - Skip-to-content anchor link.
  - High contrast ratio (pure black `#111111` on `#FFFFFF` = 16.1:1; white on `#111111` = 16.1:1).
  - Distinct `:focus-visible` outlines.
  - Proper ARIA attributes (`aria-expanded`, `aria-controls`, `aria-selected`, `aria-live`).
  - Full support for `prefers-reduced-motion: reduce`.
  - Offline / image-error graceful fallback vector icon.

---

## 7. Deployment Instructions

### Deploy to Netlify
1. Drag and drop the `AVION VISUAL INTELLIGENCE` directory into the Netlify Drop dashboard at `app.netlify.com/drop`.
2. The site is live within seconds.

### Deploy to Vercel
1. Run `npx vercel` in the project root directory, or push to GitHub and import into Vercel.

### Deploy to GitHub Pages
1. Push the repository to GitHub.
2. In Repository Settings → Pages, select the `main` branch root folder `/` and save.

---

*“Think clearly. Tell the story. Execute with purpose.”* — **Avion Visual Intelligence**
