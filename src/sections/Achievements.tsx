import { useEffect, useRef } from "react";
import { Trophy, Award, CalendarDays, AlertTriangle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { achievements } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// Achievements Section
// PLACEHOLDER NOTE: All entries below are placeholder data.
// Update src/data/portfolioData.ts with your real achievements, certifications,
// and awards when you earn them. Never fabricate credentials.
// ─────────────────────────────────────────────────────────────────────────────

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header
      const header = sectionRef.current?.querySelector(".achievements-header");
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: header,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Achievement cards stagger
      const cards = cardsRef.current?.querySelectorAll(".achievement-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Quote section
      const quote = sectionRef.current?.querySelector(".achievements-quote");
      if (quote) {
        gsap.fromTo(
          quote,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: quote,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #020817 0%, #0a0f1e 50%, #020817 100%)",
      }}
    >
      {/* Background decorations */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="achievements-header text-center mb-14">
          <span
            className="inline-block text-xs font-bold tracking-[0.3em] uppercase mb-4 px-4 py-2 rounded-full"
            style={{
              color: "#00d4ff",
              background: "rgba(0,212,255,0.08)",
              border: "1px solid rgba(0,212,255,0.2)",
            }}
          >
            ACHIEVEMENTS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-gradient">Milestones &amp; Recognition</span>
          </h2>
          <p className="mt-4 text-base" style={{ color: "#94a3b8" }}>
            Certifications, awards, and moments that mark the journey
          </p>
          <div className="glow-line mt-6 mx-auto" />
        </div>

        {/* ── Important Placeholder Notice Banner ── */}
        <div
          className="glass-strong rounded-2xl p-5 mb-14 flex items-start gap-4 max-w-3xl mx-auto"
          style={{
            border: "1px solid rgba(245,158,11,0.35)",
            background: "rgba(245,158,11,0.05)",
          }}
        >
          <div
            className="p-2 rounded-xl flex-shrink-0"
            style={{ background: "rgba(245,158,11,0.15)" }}
          >
            <AlertTriangle size={18} style={{ color: "#fbbf24" }} />
          </div>
          <div>
            <p className="text-sm font-bold mb-1" style={{ color: "#fbbf24" }}>
              Placeholder Entries — Action Required
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
              These are placeholder entries to show the layout. Update{" "}
              <code
                className="px-1.5 py-0.5 rounded text-xs"
                style={{ background: "rgba(245,158,11,0.15)", color: "#fbbf24" }}
              >
                src/data/portfolioData.ts
              </code>{" "}
              with your real achievements, certifications, and awards when you earn them.{" "}
              <span className="font-semibold text-white">
                Never fabricate credentials — only add real ones.
              </span>
            </p>
          </div>
        </div>

        {/* ── Achievements Grid (masonry-like 2 col) ── */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20"
        >
          {achievements.map((item) => {
            const isCertificate = item.type === "certificate";
            const IconComponent = item.icon === "Trophy" ? Trophy : Award;

            return (
              <div
                key={item.id}
                className="achievement-card glass rounded-2xl p-6 card-hover group transition-all duration-300"
                style={{
                  border: isCertificate
                    ? "1px solid rgba(0,212,255,0.12)"
                    : "1px solid rgba(124,58,237,0.12)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                {/* Top row: Icon + type badge */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="p-3 rounded-2xl transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: isCertificate
                        ? "rgba(0,212,255,0.1)"
                        : "rgba(124,58,237,0.12)",
                    }}
                  >
                    <IconComponent
                      size={28}
                      style={{ color: isCertificate ? "#00d4ff" : "#a78bfa" }}
                    />
                  </div>

                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full capitalize"
                    style={
                      isCertificate
                        ? {
                            background: "rgba(0,212,255,0.1)",
                            border: "1px solid rgba(0,212,255,0.25)",
                            color: "#00d4ff",
                          }
                        : {
                            background: "rgba(124,58,237,0.12)",
                            border: "1px solid rgba(124,58,237,0.3)",
                            color: "#a78bfa",
                          }
                    }
                  >
                    {item.type}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white mb-1 leading-snug">
                  {item.title}
                </h3>

                {/* Issuer */}
                <p
                  className="text-sm font-semibold mb-3"
                  style={{ color: isCertificate ? "#00d4ff" : "#a78bfa" }}
                >
                  {item.issuer}
                </p>

                {/* Date */}
                <div
                  className="flex items-center gap-1.5 text-xs mb-3"
                  style={{ color: "#94a3b8" }}
                >
                  <CalendarDays size={12} />
                  <span>{item.date}</span>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                  {item.description}
                </p>

                {/* Bottom decorative line */}
                <div
                  className="mt-5 h-px w-full"
                  style={{
                    background: isCertificate
                      ? "linear-gradient(to right, rgba(0,212,255,0.2), transparent)"
                      : "linear-gradient(to right, rgba(124,58,237,0.2), transparent)",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* ── Motivational Quote ── */}
        <div className="achievements-quote text-center relative max-w-3xl mx-auto">
          {/* Decorative border */}
          <div
            className="glass rounded-3xl p-10 relative overflow-hidden"
            style={{
              border: "1px solid rgba(0,212,255,0.1)",
              background: "rgba(0,212,255,0.02)",
            }}
          >
            {/* Large opening quotation mark */}
            <span
              className="absolute top-4 left-6 text-8xl font-serif leading-none select-none pointer-events-none"
              style={{
                color: "rgba(0,212,255,0.12)",
                lineHeight: 1,
              }}
            >
              &ldquo;
            </span>

            {/* Large closing quotation mark */}
            <span
              className="absolute bottom-0 right-6 text-8xl font-serif leading-none select-none pointer-events-none"
              style={{
                color: "rgba(124,58,237,0.12)",
                lineHeight: 1,
              }}
            >
              &rdquo;
            </span>

            <p
              className="text-xl md:text-2xl font-light italic leading-relaxed relative z-10"
              style={{ color: "#e2e8f0" }}
            >
              The journey of a thousand miles begins with a single step.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <div
                className="h-px w-10"
                style={{ background: "rgba(0,212,255,0.4)" }}
              />
              <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#00d4ff" }}>
                Lao Tzu
              </span>
              <div
                className="h-px w-10"
                style={{ background: "rgba(0,212,255,0.4)" }}
              />
            </div>
          </div>

          <p className="mt-8 text-sm" style={{ color: "#64748b" }}>
            Every expert was once a beginner. Keep building, keep learning.
          </p>
        </div>
      </div>
    </section>
  );
}
