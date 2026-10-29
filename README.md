# Nguyen Van An | Human-Centric AI & Applied Systems Portfolio

> **Academic & Engineering Positioning:** Bridging human service empathy (3 semesters in Hospitality Management at HUIT, 2024–2025) with rigorous Computer Science & Applied AI Engineering (1st-Year IT Undergraduate at Lac Hong University - LHU). Aspiring International Master's Candidate in Human-Centric AI.

---

## 🎨 Design Philosophy (Swiss Minimalist & Academic Editorial)

This portfolio is engineered following **Swiss Minimalist** and **Academic Editorial** principles (inspired by Stanford AI Lab, Distill.pub, and Andrew Ng's personal hub):

### 1. Color System (Monochromatic Discipline + Single Accent)

- **Light Mode (Academic Paper Palette):**
  - Primary Surface: Pure White (`#FFFFFF`)
  - Secondary / Editorial Surface: Warm Academic Paper (`#FAF9F6` & `#F9FAFB`)
  - Typography: Deep Charcoal (`#0f0f23` / `#111827`) & Neutral Slate (`#4B5563` / `#6B7280`)
  - Hairline Borders: Crisp 1px solid (`#E5E7EB`)
- **Dark Mode (Obsidian Research Theme):**
  - Primary Surface: Deep Obsidian (`#0B0F17`) & Elevated Slate (`#111726`)
- **Primary Accent:** Deep Burnt Orange (`#C25E00` in Light Mode / `#D95D1E` in Dark Mode, subtle tint `#FFF8F0`, border `#FBE3CC`).

### 2. Typography Hierarchy (Unified Roboto Stack)

- **Display & Academic Headings (`--font-serif` / `--font-heading`):** **Roboto** — Clean, unified neo-grotesque typography across all headings and editorial statements.
- **UI & Body Prose (`--font-sans`):** **Roboto** — Crisp, high-legibility geometric proportions for technical specifications, cards, and long-form reading.
- **Technical Metadata & Code (`--font-mono`):** **Roboto Mono** — Tabular numerals, uppercase badges, latency benchmarks, and pipeline specifications.

---

## 🏛️ Information Architecture (Multi-Page Academic Hub)

1. **[index.html](file:///d:/adley/index.html) — About & Academic Vision:**
   - Asymmetric Hero section with executive positioning, core academic milestones, and portrait showcase.
   - Detailed narrative of the transition from **HUIT Hospitality (2024–2025)** to **LHU Information Technology (2025–Present)**.
   - Structured Academic Quick-Facts & 4 Transferable Competencies.
2. **[research.html](file:///d:/adley/research.html) — Scientific Research & Pre-Master's Direction:**
   - **Stage 1 Faculty Research Contribution (HUIT, 2024–2025):** *Winter Tourism Consumer Behavior in Da Nang City* — Transparent documentation of literature retrieval (Google Scholar & AI discovery tools), abstract extraction, and systematic **Excel Literature Cataloging** prior to transitioning into Computer Science at LHU.
   - **Pre-Master's Research Roadmap:** Focus on Human-Centric Applied AI, Prompt Engineering, Retrieval-Augmented Generation (RAG), Smart Home IoT, and Assistive Technologies.
3. **[projects.html](file:///d:/adley/projects.html) — Applied Engineering & Case Studies:**
   - Interactive category filtering (`All`, `AI & Computer Vision`, `Academic R&D`, `Web Systems`).
   - Structured project cards displaying **Problem → Architecture → Key Metrics → Direct Action Links**.
   - **In-Depth Engineering Case Study:** *Smart Gesture Slide Controller* featuring a 4-stage visual architecture pipeline, Euclidean distance gesture classification specs, 3-layer Finite State Machine (FSM) debouncer analysis, and empirical engineering trade-offs.
4. **[contact.html](file:///d:/adley/contact.html) — Academic Inquiries, Speaking Profile & Printable CV:**
   - Direct communication channels with one-click copy utilities (`WCAG 2.2 AA` 44×44px touch targets).
   - Interactive **Academic CV Preview & Print-to-PDF Modal** alongside a functional `mailto:` inquiry dispatcher.

---

## 📁 Repository Structure

```text
d:\adley/
├── index.html                  # Pillar 01: About, Transition Story & Academic Roadmap
├── research.html               # Pillar 02: Literature Cataloging (Excel Matrix) & Pre-Master's AI Focus
├── projects.html               # Pillar 03: Applied Engineering Systems & Case Study Deep-Dive
├── contact.html                # Pillar 04: Academic Inquiries, MC Profile & Printable Academic CV
├── README.md                   # Project documentation & architectural specifications
├── package.json                # Tailwind CSS build scripts (zero runtime bloat)
├── tailwind.config.js          # Design tokens & typography configuration
├── css/
│   ├── tailwind.min.css        # Precompiled & minified production Tailwind CSS
│   └── styles.css              # Custom Swiss Minimalist tokens, print stylesheet & A11y rules
├── js/
│   ├── i18n.js                 # Bilingual (EN/VI) engine with zero-FOUC early resolution
│   └── main.js                 # Modular controllers: Theme, Nav, Filter, Accordion, CV Modal, Mailto Form
└── assets/
    └── images/
        ├── favicon.svg         # Branded terminal (>_) vector icon
        └── avarta.jpg          # Author portrait
```

---

## 🚀 Local Usage & Build Commands

- **Direct Preview:** Open [index.html](file:///d:/adley/index.html) directly in any modern browser, or serve via VS Code Live Server.
- **Rebuild Production CSS:**

```bash
npm run build:css
```
