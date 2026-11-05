import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  BookOpen,
  Lightbulb,
  Target,
  Rocket,
  Star,
  Heart,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { aboutHighlights } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

// ─── Dynamic icon resolver ────────────────────────────────────────────────────
const iconMap: Record<string, LucideIcon> = {
  Code2,
  BookOpen,
  Lightbulb,
  Target,
  Rocket,
  Star,
  Heart,
  Zap,
};

function DynamicIcon({ name, size = 24, className = '' }: { name: string; size?: number; className?: string }) {
  const Icon = iconMap[name] ?? Code2;
  return <Icon size={size} className={className} />;
}

// ─── Learning ticker items ────────────────────────────────────────────────────
const learningTech = [
  'React.js', 'TypeScript', 'Tailwind CSS', 'Node.js',
  'Data Structures', 'Algorithms', 'Git & GitHub', 'Python',
  'C++', 'JavaScript ES6+', 'Problem Solving', 'Open Source',
];

// ─── About component ─────────────────────────────────────────────────────────
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const tickerRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Section header reveal ──────────────────────────────────────────────
      gsap.fromTo(
        '#about-header > *',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#about-header',
            start: 'top 80%',
          },
        }
      );

      // ── Left text paragraphs ──────────────────────────────────────────────
      gsap.fromTo(
        '#about-left > *',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#about-left',
            start: 'top 78%',
          },
        }
      );

      // ── Right cards ───────────────────────────────────────────────────────
      gsap.fromTo(
        '#about-right .highlight-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#about-right',
            start: 'top 78%',
          },
        }
      );

      // ── Ticker ────────────────────────────────────────────────────────────
      gsap.fromTo(
        '#about-ticker',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#about-ticker',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: 'rgba(5, 14, 31, 0.6)' }}
    >
      {/* Background accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 w-72 h-72 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 w-72 h-72 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ── Section header ── */}
        <div id="about-header" className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] font-semibold text-cyan-400 uppercase">
            About Me
          </span>
          <div className="glow-line w-16 mx-auto my-3" />
          <h2 className="section-heading text-white mt-2">
            My <span className="text-gradient">Story</span>
          </h2>
          <p className="section-subtext mt-3">
            The journey of a passionate developer just getting started.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ════ LEFT — Personal story ════ */}
          <div id="about-left" className="flex flex-col gap-5">

            {/* Chapter badge */}
            <div className="flex items-center gap-3 mb-1">
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-cyan-400"
                style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)' }}
              >
                <Rocket size={12} /> Chapter 1 · First Year
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed text-base">
              Hey! I'm <span className="text-white font-semibold">Adarsh Maurya</span> — a first-year
              B.Tech student who took one look at a blinking cursor on a screen and thought,{' '}
              <em className="text-cyan-300">"I want to make things with this."</em> That curiosity turned
              into late-night coding sessions, tutorials, and a growing love for how software can shape
              the world around us.
            </p>

            <p className="text-slate-400 leading-relaxed text-base">
              My journey started with the fundamentals — C, C++, and Python — learning how computers
              think at a lower level before climbing toward the web. HTML, CSS, and JavaScript opened
              the door to building things you can actually <em>see</em> and <em>use</em>, and that
              feeling of shipping something, however small, is endlessly motivating.
            </p>

            <p className="text-slate-400 leading-relaxed text-base">
              I'm at the very beginning of a long road, and I embrace that completely. Every bug I
              fix, every concept I finally understand, and every project I build — no matter how
              humble — is a stepping stone. My goal is simple: to become a skilled software engineer
              by working hard, staying curious, and contributing to something meaningful.
            </p>

            {/* Values pills */}
            <div className="flex flex-wrap gap-2 mt-2">
              {['Curious', 'Persistent', 'Detail-Oriented', 'Collaborative', 'Growth Mindset'].map((v) => (
                <span
                  key={v}
                  className="px-3 py-1 rounded-full text-xs font-medium text-cyan-300"
                  style={{
                    background: 'rgba(0,212,255,0.07)',
                    border: '1px solid rgba(0,212,255,0.18)',
                  }}
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* ════ RIGHT — Highlight cards 2×2 ════ */}
          <div
            id="about-right"
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {aboutHighlights.map((h) => (
              <div
                key={h.title}
                className="highlight-card glass rounded-2xl p-6 card-hover flex flex-col gap-3 group"
                style={{ transition: 'border-color 0.3s, box-shadow 0.3s' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.4)';
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 0 24px rgba(0,212,255,0.12)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '';
                  (e.currentTarget as HTMLElement).style.boxShadow = '';
                }}
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(0,212,255,0.1)' }}
                >
                  <DynamicIcon name={h.icon} size={20} className="text-cyan-400" />
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-bold text-white text-base mb-1">{h.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Learning ticker ── */}
        <div id="about-ticker" className="mt-20">
          <p className="text-center text-xs text-slate-500 tracking-[0.25em] uppercase mb-6">
            Currently Exploring &amp; Learning
          </p>

          <div className="relative overflow-hidden">
            {/* Fade masks */}
            <div
              className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10"
              style={{ background: 'linear-gradient(to right, #020817, transparent)' }}
            />
            <div
              className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10"
              style={{ background: 'linear-gradient(to left, #020817, transparent)' }}
            />

            {/* Scrolling track */}
            <div
              ref={tickerRef}
              className="flex gap-3"
              style={{ animation: 'tickerScroll 28s linear infinite', width: 'max-content' }}
            >
              {/* Duplicate for seamless loop */}
              {[...learningTech, ...learningTech].map((tech, i) => (
                <span
                  key={`${tech}-${i}`}
                  className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium text-cyan-300 whitespace-nowrap"
                  style={{
                    background: 'rgba(0,212,255,0.07)',
                    border: '1px solid rgba(0,212,255,0.15)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Ticker keyframe */}
      <style>{`
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
