import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  Globe,
  Wrench,
  Terminal,
  GitBranch,
  Cpu,
  FileCode2,
  Database,
  type LucideIcon,
} from 'lucide-react';
import { skills } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

// ─── Icon resolver ───────────────────────────────────────────────────────────
const iconMap: Record<string, LucideIcon> = {
  Code2,
  Globe,
  Wrench,
  Terminal,
  GitBranch,
  Cpu,
  FileCode2,
  Database,
};

function DynamicIcon({ name, size = 20, className = '' }: { name: string; size?: number; className?: string }) {
  const Icon = iconMap[name] ?? Code2;
  return <Icon size={size} className={className} />;
}

// ─── Tag colour map ───────────────────────────────────────────────────────────
const tagColour: Record<string, { bg: string; text: string; border: string }> = {
  'Beginner':              { bg: 'rgba(16,185,129,0.1)',  text: '#34d399', border: 'rgba(16,185,129,0.25)' },
  'Beginner-Intermediate': { bg: 'rgba(0,212,255,0.08)', text: '#67e8f9', border: 'rgba(0,212,255,0.2)'  },
  'Intermediate':          { bg: 'rgba(99,102,241,0.1)', text: '#a5b4fc', border: 'rgba(99,102,241,0.25)' },
  'Comfortable':           { bg: 'rgba(0,212,255,0.12)', text: '#00d4ff', border: 'rgba(0,212,255,0.3)'  },
  'Learning':              { bg: 'rgba(245,158,11,0.1)', text: '#fcd34d', border: 'rgba(245,158,11,0.25)' },
};

function tagStyle(tag: string) {
  return tagColour[tag] ?? { bg: 'rgba(100,116,139,0.12)', text: '#94a3b8', border: 'rgba(100,116,139,0.25)' };
}

// ─── Single animated skill bar ────────────────────────────────────────────────
function SkillBar({ name, level, tag }: { name: string; level: number; tag: string }) {
  const [filled, setFilled] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const { bg, text, border } = tagStyle(tag);

  useEffect(() => {
    if (!barRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFilled(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(barRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={barRef} className="flex flex-col gap-1.5">
      {/* Row: name + tag + percentage */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-slate-200">{name}</span>
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: bg, color: text, border: `1px solid ${border}` }}
          >
            {tag}
          </span>
          <span className="text-xs font-mono text-slate-400 w-8 text-right">{level}%</span>
        </div>
      </div>

      {/* Bar track */}
      <div
        className="h-1.5 w-full rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        <div
          className="h-full rounded-full skill-bar-fill"
          style={{
            width: filled ? `${level}%` : '0%',
            background: 'linear-gradient(90deg, #00d4ff, #00fff7)',
            boxShadow: filled ? '0 0 8px rgba(0,212,255,0.5)' : 'none',
          }}
        />
      </div>
    </div>
  );
}

// ─── Tools & Technologies icon grid pills ─────────────────────────────────────
const toolPills = [
  { name: 'VS Code',    icon: <FileCode2 size={16} className="text-cyan-400" /> },
  { name: 'Git',        icon: <GitBranch size={16} className="text-cyan-400" /> },
  { name: 'GitHub',     icon: <Globe    size={16} className="text-cyan-400" /> },
  { name: 'Python',     icon: <Code2    size={16} className="text-cyan-400" /> },
  { name: 'C / C++',   icon: <Cpu      size={16} className="text-cyan-400" /> },
  { name: 'Terminal',   icon: <Terminal size={16} className="text-cyan-400" /> },
  { name: 'HTML & CSS', icon: <Globe    size={16} className="text-cyan-400" /> },
  { name: 'AI Tools',   icon: <Database size={16} className="text-cyan-400" /> },
];

// ─── Skills component ─────────────────────────────────────────────────────────
export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(
        '#skills-header > *',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.85, stagger: 0.14, ease: 'power3.out',
          scrollTrigger: { trigger: '#skills-header', start: 'top 80%' },
        }
      );

      // Category cards — stagger reveal
      gsap.fromTo(
        '.skills-category-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#skills-grid',
            start: 'top 78%',
          },
        }
      );

      // Tools grid
      gsap.fromTo(
        '#tools-grid > *',
        { opacity: 0, scale: 0.88, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '#tools-grid',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: '#020817' }}
    >
      {/* Background accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 left-0 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-1/4 right-0 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ── Section header ── */}
        <div id="skills-header" className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] font-semibold text-cyan-400 uppercase">
            Skills
          </span>
          <div className="glow-line w-16 mx-auto my-3" />
          <h2 className="section-heading text-white mt-2">
            What I <span className="text-gradient">Know</span>
          </h2>
          <p className="section-subtext mt-3">
            I'm a beginner passionate about continuous growth. Here's where I stand right now — 
            every bar represents progress, not a ceiling.
          </p>
        </div>

        {/* ── Skill category cards ── */}
        <div id="skills-grid" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 mb-16">
          {skills.map((cat) => (
            <div
              key={cat.category}
              className="skills-category-card glass rounded-2xl p-7 card-hover flex flex-col gap-5"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(0,212,255,0.1)' }}
                >
                  <DynamicIcon name={cat.icon} size={18} className="text-cyan-400" />
                </div>
                <h3 className="font-bold text-white text-base">{cat.category}</h3>
                <span
                  className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full text-slate-400"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  {cat.items.length} skills
                </span>
              </div>

              {/* Skill bars */}
              <div className="flex flex-col gap-4">
                {cat.items.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    tag={skill.tag}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Tools & Technologies grid ── */}
        <div className="mt-10">
          <p className="text-center text-xs text-slate-500 tracking-[0.25em] uppercase mb-7">
            Tools &amp; Technologies I Use
          </p>
          <div
            id="tools-grid"
            className="flex flex-wrap justify-center gap-3"
          >
            {toolPills.map(({ name, icon }) => (
              <div
                key={name}
                className="glass flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm font-medium text-slate-300 card-hover cursor-default select-none"
                style={{ transition: 'border-color 0.3s, box-shadow 0.3s' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.4)';
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 0 16px rgba(0,212,255,0.12)';
                  (e.currentTarget as HTMLElement).style.color = '#e2e8f0';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '';
                  (e.currentTarget as HTMLElement).style.boxShadow = '';
                  (e.currentTarget as HTMLElement).style.color = '';
                }}
              >
                {icon}
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mindset footer card ── */}
        <div className="mt-16 glass-strong rounded-2xl px-8 py-6 text-center max-w-2xl mx-auto">
          <p className="text-slate-400 text-sm leading-relaxed">
            <span className="text-cyan-300 font-semibold">Skill levels reflect honest self-assessment.</span>{' '}
            I'm actively building stronger foundations every day — through coursework, personal
            projects, and open-source exploration. The journey is the destination.
          </p>
        </div>

      </div>
    </section>
  );
}
