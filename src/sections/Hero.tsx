import { useState, useEffect, useRef } from 'react';
import { Download, Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { personalInfo, roles, stats } from '../data/portfolioData';

// ─── Animated counter hook ───────────────────────────────────────────────────
function useAnimatedCounter(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  const start = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startRef.current = null;

    const step = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  return { count, start };
}

// ─── Single stat item with its own counter ───────────────────────────────────
function StatItem({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  const { count, start } = useAnimatedCounter(value);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { start(); observer.disconnect(); } },
      { threshold: 0.4 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl md:text-3xl font-black text-gradient-blue tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-xs text-slate-500 mt-1 tracking-wide uppercase">{label}</div>
    </div>
  );
}

// ─── Main Hero component ──────────────────────────────────────────────────────
export default function Hero() {
  const [displayedText, setDisplayedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  // ── Typing animation ────────────────────────────────────────────────────────
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayedText.length < currentRole.length) {
      timeout = setTimeout(() => setDisplayedText(currentRole.slice(0, displayedText.length + 1)), 70);
    } else if (!isDeleting && displayedText.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => setDisplayedText(currentRole.slice(0, displayedText.length - 1)), 40);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex]);

  // ── GSAP entrance ───────────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left side — stagger from bottom
      gsap.fromTo(
        '#hero-left > *',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.3,
        }
      );

      // Right side — scale up
      gsap.fromTo(
        '#hero-right',
        { opacity: 0, scale: 0.82 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power3.out', delay: 0.4 }
      );

      // Scroll indicator
      gsap.fromTo(
        '#hero-scroll-indicator',
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 1.4 }
      );

      // Chevron bounce loop
      gsap.to('#hero-chevron', {
        y: 8,
        duration: 0.9,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 1.8,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      className="bg-hero-radial min-h-screen flex items-center relative overflow-hidden"
    >
      {/* ── Background decorative blobs ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full py-20 lg:py-0">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-14 lg:gap-0">

          {/* ══════════ LEFT — Content ══════════ */}
          <div
            id="hero-left"
            ref={leftRef}
            className="flex-1 lg:w-3/5 flex flex-col gap-5 order-2 lg:order-1"
          >
            {/* Label */}
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-cyan-400/60" />
              <span className="text-xs tracking-[0.25em] font-semibold text-cyan-400 uppercase">
                {personalInfo.greeting}
              </span>
              <span className="h-px w-10 bg-cyan-400/60" />
            </div>

            {/* Name */}
            <div className="leading-none">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight">
                <span className="block text-white">ADARSH</span>
                <span className="block text-gradient-blue">MAURYA</span>
              </h1>
            </div>

            {/* Animated role */}
            <div className="font-mono text-xl md:text-2xl text-cyan-300 h-9 flex items-center">
              <span>{displayedText}</span>
              <span className="typing-cursor" aria-hidden />
            </div>

            {/* Bio */}
            <p className="text-slate-400 text-base leading-relaxed max-w-lg">
              {personalInfo.bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-1">
              <a
                href="#projects"
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore My Work
              </a>
              <a
                href={personalInfo.resumeUrl}
                download
                className="btn-outline flex items-center gap-2"
              >
                <Download size={16} />
                Download Resume
              </a>
            </div>

            {/* Social icons */}
            <div className="flex gap-3 mt-1">
              {[
                { href: personalInfo.github, icon: Github, label: 'GitHub' },
                { href: personalInfo.linkedin, icon: Linkedin, label: 'LinkedIn' },
                { href: personalInfo.email, icon: Mail, label: 'Email' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass flex items-center justify-center rounded-full transition-all duration-300"
                  style={{
                    width: 42,
                    height: 42,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      '0 0 20px rgba(0,212,255,0.5)';
                    (e.currentTarget as HTMLElement).style.borderColor =
                      'rgba(0,212,255,0.6)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '';
                    (e.currentTarget as HTMLElement).style.borderColor = '';
                  }}
                >
                  <Icon size={18} className="text-cyan-400" />
                </a>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-5">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass rounded-xl py-4 px-2 flex flex-col items-center"
                >
                  <StatItem label={s.label} value={s.value} suffix={s.suffix} />
                </div>
              ))}
            </div>
          </div>

          {/* ══════════ RIGHT — Photo ══════════ */}
          <div
            id="hero-right"
            ref={rightRef}
            className="flex-shrink-0 lg:w-2/5 flex justify-center items-center order-1 lg:order-2"
          >
            <div className="relative flex items-center justify-center" style={{ width: 360, height: 360 }}>

              {/* Background glow */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-full pointer-events-none -z-10"
                style={{
                  background: 'radial-gradient(circle, rgba(0,212,255,0.18) 0%, transparent 70%)',
                  filter: 'blur(32px)',
                }}
              />

              {/* Orbital ring 1 — cyan, clockwise, 280px */}
              <div
                className="orbital-ring absolute"
                style={{ width: 280, height: 280 }}
              >
                {/* Dot */}
                <span
                  className="absolute"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#00d4ff',
                    boxShadow: '0 0 10px #00d4ff, 0 0 20px #00d4ff',
                    top: -4,
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                />
              </div>

              {/* Orbital ring 2 — purple, counter-clockwise, 340px */}
              <div
                className="orbital-ring-reverse absolute"
                style={{ width: 340, height: 340 }}
              >
                {/* Dot */}
                <span
                  className="absolute"
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#7c3aed',
                    boxShadow: '0 0 10px #7c3aed, 0 0 20px #7c3aed',
                    top: '50%',
                    right: -3.5,
                    transform: 'translateY(-50%)',
                  }}
                />
              </div>

              {/* Animate-float wrapper */}
              <div
                className="relative z-10 animate-bounce"
                style={{
                  /* Use custom inline animation to override Tailwind's bounce if needed */
                  animation: 'heroFloat 4s ease-in-out infinite',
                }}
              >
                {/* Glowing border ring */}
                <div
                  className="rounded-full p-[3px]"
                  style={{
                    background: 'linear-gradient(135deg, #00d4ff, #7c3aed, #00fff7)',
                    boxShadow:
                      '0 0 40px rgba(0,212,255,0.4), 0 0 80px rgba(0,212,255,0.2)',
                  }}
                >
                  {/* Photo circle */}
                  <div
                    className="rounded-full overflow-hidden"
                    style={{ width: 220, height: 220, background: '#020817' }}
                  >
                    <img
                      src={personalInfo.profilePhoto}
                      alt="Adarsh Maurya"
                      className="w-full h-full object-cover object-top"
                      loading="eager"
                      onError={(e) => {
                        // Fallback: initials avatar
                        const el = e.currentTarget as HTMLImageElement;
                        el.style.display = 'none';
                        const parent = el.parentElement;
                        if (parent && !parent.querySelector('.avatar-fallback')) {
                          const fb = document.createElement('div');
                          fb.className = 'avatar-fallback';
                          fb.style.cssText =
                            'width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3rem;font-weight:900;color:#00d4ff;letter-spacing:-2px;';
                          fb.textContent = 'AM';
                          parent.appendChild(fb);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        id="hero-scroll-indicator"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 cursor-pointer select-none"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
        <ChevronDown id="hero-chevron" size={18} className="text-cyan-400" />
      </div>

      {/* ── Keyframe for float animation ── */}
      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spinReverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
      `}</style>
    </section>
  );
}
