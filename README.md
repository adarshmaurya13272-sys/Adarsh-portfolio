# Adarsh Maurya — Developer Portfolio

A cinematic, futuristic developer portfolio website built for **Adarsh Maurya** (B.Tech Student & Aspiring Software Developer). Designed with an Awwwards-inspired dark aesthetic, electric blue and cyan accents, interactive GSAP animations, particle effects, and 3D card tilts.

---

## 🌟 Features

- **Futuristic Dark Theme**: Deep navy/near-black backgrounds (`#020817`) paired with electric blue (`#00d4ff`), cyan (`#00fff7`), and purple (`#7c3aed`) accents.
- **Cinematic Hero**:
  - Rotating orbital rings and animated glowing photo frame holding your real uploaded photograph.
  - Role text with smooth typing animation cycling across roles.
  - Animated live counters for projects, skills, learning days, and commits.
  - Interactive magnetic/glow action buttons and social links.
- **Interactive Experience**:
  - Interactive canvas-based dynamic particle network with auto-connecting nodes.
  - Desktop cursor spotlight tracker.
  - Smooth top scroll progress bar and back-to-top button.
  - 3D card tilt effect on project cards.
  - Interactive modal dialogs for in-depth project inspection.
  - Category filters for projects ("All", "Web", "Programming").
- **Clear & Transparent Data**:
  - Verified social links (`github.com/adarshmaurya13272-sys`, `linkedin.com/in/adarsh-maurya-a72102400`, `adarshmaurya13272@gmail.com`).
  - Realistic beginner-to-intermediate skill representation with color-coded badges.
  - Transparent placeholder markings for academic and project details pending your inputs.
  - Functional contact form validation with direct email fallbacks.
- **Performance & Accessibility**:
  - Fully responsive across desktop, tablet, Android, and iOS devices.
  - Strict `prefers-reduced-motion` compliance.
  - Optimized production bundle with code splitting and lazy asset handling.

---

## 📁 Project Structure

```
personal portfolio/
├── dist/                    # Production build output
├── public/
│   ├── favicon.svg          # Custom neon "A" brand favicon
│   ├── profile.jpg          # Your original uploaded portrait
│   └── resume.pdf           # Resume download PDF placeholder
├── src/
│   ├── components/
│   │   ├── BackToTop.tsx          # Floating smooth back-to-top button
│   │   ├── CursorSpotlight.tsx    # Desktop radial cursor tracker
│   │   ├── Footer.tsx             # Brand footer with quick navigation
│   │   ├── Loader.tsx             # Cinematic startup loading screen
│   │   ├── Navbar.tsx             # Sticky blur navbar with active highlights & mobile menu
│   │   ├── ParticleBackground.tsx # Canvas particle network animation
│   │   └── ScrollProgress.tsx     # Top scroll percentage indicator
│   ├── data/
│   │   └── portfolioData.ts       # ⭐ CENTRAL DATA FILE — edit all your info here
│   ├── sections/
│   │   ├── About.tsx              # Story, values, and live learning ticker
│   │   ├── Achievements.tsx       # Milestones, certificates, and quotes
│   │   ├── Contact.tsx            # Validated form and direct contact channels
│   │   ├── Education.tsx          # Dual-sided responsive timeline
│   │   ├── Hero.tsx               # Cinematic hero with orbital photo & counters
│   │   ├── Projects.tsx           # 3D tilt cards, category filters, and detail modals
│   │   └── Skills.tsx             # Animated progress bars & category cards
│   ├── App.tsx                    # Main layout and intersection observer
│   ├── index.css                  # Tailwind directives and custom animation keyframes
│   └── main.tsx                   # React 18 DOM root
├── index.html               # Semantic HTML with SEO & Open Graph meta tags
├── package.json
├── tailwind.config.js       # Color tokens and animation definitions
├── tsconfig.json
└── vite.config.ts           # Vite bundler configuration
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- `npm` (included with Node.js)

### Installation
```bash
# Navigate to the project directory
cd "personal portfolio"

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Production Build
```bash
npm run build
```
This runs TypeScript checking (`tsc`) followed by Vite's production optimizer to output the optimized bundle into `dist/`.

To preview the production build locally:
```bash
npm run preview
```

---

## ☁️ Deployment Instructions (Vercel)

Deploying this portfolio on [Vercel](https://vercel.com/) is quick and free:

### Option A: Via Vercel Web Dashboard (Recommended)
1. Push this folder to a GitHub repository on your GitHub account (`https://github.com/adarshmaurya13272-sys/portfolio` or similar):
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of Adarsh Maurya portfolio"
   git branch -M main
   git remote add origin https://github.com/adarshmaurya13272-sys/YOUR_REPO_NAME.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com/) and sign in with your GitHub account.
3. Click **"Add New"** > **"Project"**.
4. Select your newly pushed repository and click **Import**.
5. Vercel automatically detects **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click **Deploy**. Your site will be live on a secure `.vercel.app` domain in ~30 seconds!

### Option B: Via Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy directly from terminal
vercel
```
Follow the interactive prompts (defaults work automatically).

---

## 📝 Checklist: Personal Information to Fill In

All personal details are organized in a single file: `src/data/portfolioData.ts`. Here are the items you should update as you progress:

1. **Education Details** (`src/data/portfolioData.ts`):
   - Replace `[Your College Name Here]` with your actual engineering institution.
   - Replace `[Your Branch Here]` with your engineering discipline (e.g., Computer Science, Information Technology, Electronics, etc.).
   - Update 10th and 12th school names and completion years.
2. **Projects** (`src/data/portfolioData.ts`):
   - Add your actual GitHub project repositories in the `github` field.
   - Add live demo URLs in `demo` (or keep `"#"` if no demo exists yet).
   - Place project screenshots in `public/projects/` and reference their paths in the `image` field.
3. **Achievements & Certifications** (`src/data/portfolioData.ts`):
   - As you earn certifications (e.g., Coursera, NPTEL, HackerRank, freeCodeCamp), add them to the `achievements` array.
4. **Resume** (`public/resume.pdf`):
   - Replace the provided placeholder file at `public/resume.pdf` with your real resume PDF.
5. **Contact Backend** (`src/sections/Contact.tsx`):
   - If you want the contact form to deliver messages directly to your inbox without opening an email client, connect a free service like [Formspree](https://formspree.io/) or [EmailJS](https://www.emailjs.com/).
