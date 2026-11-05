import { useEffect, useRef } from "react";
import { Calendar, GraduationCap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { education } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// Education Timeline Section
// PLACEHOLDER NOTE: Replace data in src/data/portfolioData.ts with your actual
// college information before deploying this portfolio.
// ─────────────────────────────────────────────────────────────────────────────

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = timelineRef.current?.querySelectorAll(".timeline-item");
      if (!items) return;

      items.forEach((item, index) => {
        const isLeft = index % 2 === 0;
        const xFrom = isLeft ? -80 : 80;

        gsap.fromTo(
          item,
          { opacity: 0, x: xFrom, y: 30 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Animate the vertical timeline line drawing in
      const line = sectionRef.current?.querySelector(".timeline-line");
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            duration: 1.4,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: line,
              start: "top 80%",
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
      id="education"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #020817 0%, #0a0f1e 50%, #020817 100%)" }}
    >
      {/* Background decorative blobs */}
      <div
        className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-20 right-10 w-72 h-72 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="text-center mb-20">
          <span
            className="inline-block text-xs font-bold tracking-[0.3em] uppercase mb-4 px-4 py-2 rounded-full"
            style={{
              color: "#00d4ff",
              background: "rgba(0, 212, 255, 0.08)",
              border: "1px solid rgba(0, 212, 255, 0.2)",
            }}
          >
            EDUCATION
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-gradient">Academic Journey</span>
          </h2>
          <p className="mt-4 text-base" style={{ color: "#94a3b8" }}>
            Building foundations for a lifetime of learning
          </p>
          <div className="glow-line mt-6 mx-auto" />
        </div>

        {/* ── Placeholder Notice ── */}
        <div
          className="glass rounded-2xl p-4 mb-14 flex items-start gap-3 max-w-2xl mx-auto"
          style={{ borderColor: "rgba(0, 212, 255, 0.2)", borderWidth: 1 }}
        >
          <GraduationCap size={18} style={{ color: "#00d4ff", flexShrink: 0, marginTop: 2 }} />
          <p className="text-sm" style={{ color: "#94a3b8" }}>
            <span className="font-semibold" style={{ color: "#00d4ff" }}>Placeholder data: </span>
            Replace entries in{" "}
            <code
              className="px-1.5 py-0.5 rounded text-xs"
              style={{ background: "rgba(0,212,255,0.1)", color: "#00d4ff" }}
            >
              src/data/portfolioData.ts
            </code>{" "}
            with your actual college information.
          </p>
        </div>

        {/* ── Timeline ── */}
        <div ref={timelineRef} className="relative">

          {/* Vertical centre line — hidden on mobile, visible on md+ */}
          <div
            className="timeline-line hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
            style={{
              background: "linear-gradient(to bottom, transparent, #00d4ff 15%, #7c3aed 85%, transparent)",
            }}
          />

          {/* Mobile left line */}
          <div
            className="timeline-line block md:hidden absolute left-5 top-0 bottom-0 w-0.5"
            style={{
              background: "linear-gradient(to bottom, transparent, #00d4ff 15%, #7c3aed 85%, transparent)",
            }}
          />

          <div className="space-y-16">
            {education.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`timeline-item relative flex items-center gap-0 md:gap-8 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col`}
                >
                  {/* ── Card ── */}
                  <div className={`w-full md:w-5/12 pl-14 md:pl-0 ${isLeft ? "md:text-right" : "md:text-left"}`}>
                    <div
                      className="glass rounded-2xl p-6 card-hover group transition-all duration-300"
                      style={{
                        border: "1px solid rgba(0,212,255,0.12)",
                        background: "rgba(255,255,255,0.03)",
                      }}
                    >
                      {/* Year badge */}
                      <div className={`flex mb-3 ${isLeft ? "md:justify-end justify-start" : "justify-start"}`}>
                        <span
                          className="text-xs font-semibold px-3 py-1 rounded-full"
                          style={{
                            background: "rgba(124,58,237,0.15)",
                            border: "1px solid rgba(124,58,237,0.3)",
                            color: "#a78bfa",
                          }}
                        >
                          {item.year}
                        </span>
                      </div>

                      {/* Degree */}
                      <h3 className="text-lg font-bold text-white mb-1 leading-snug">
                        {item.degree}
                      </h3>

                      {/* Institution */}
                      <p
                        className="text-sm font-semibold mb-3"
                        style={{ color: "#00d4ff" }}
                      >
                        {item.institution}
                      </p>

                      {/* Duration */}
                      <div
                        className={`flex items-center gap-1.5 text-xs mb-3 ${
                          isLeft ? "md:justify-end justify-start" : "justify-start"
                        }`}
                        style={{ color: "#94a3b8" }}
                      >
                        <Calendar size={12} />
                        <span>{item.duration}</span>
                      </div>

                      {/* Description */}
                      <p className="text-sm mb-4 leading-relaxed" style={{ color: "#94a3b8" }}>
                        {item.description}
                      </p>

                      {/* Status badge */}
                      <div className={`flex ${isLeft ? "md:justify-end justify-start" : "justify-start"}`}>
                        {item.status === "ongoing" ? (
                          <span
                            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
                            style={{
                              background: "rgba(16,185,129,0.12)",
                              border: "1px solid rgba(16,185,129,0.3)",
                              color: "#34d399",
                            }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full animate-pulse"
                              style={{ background: "#34d399" }}
                            />
                            Ongoing
                          </span>
                        ) : (
                          <span
                            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
                            style={{
                              background: "rgba(0,212,255,0.1)",
                              border: "1px solid rgba(0,212,255,0.25)",
                              color: "#00d4ff",
                            }}
                          >
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ── Timeline Dot (desktop) ── */}
                  <div className="hidden md:flex relative z-10 w-2/12 justify-center items-center">
                    <div
                      className="w-5 h-5 rounded-full border-4 flex-shrink-0"
                      style={{
                        background: "#020817",
                        borderColor: "#00d4ff",
                        boxShadow: "0 0 0 4px rgba(0,212,255,0.15), 0 0 20px rgba(0,212,255,0.4)",
                      }}
                    />
                  </div>

                  {/* ── Timeline Dot (mobile — left side) ── */}
                  <div
                    className="md:hidden absolute left-5 top-7 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10"
                    style={{
                      background: "#020817",
                      borderColor: "#00d4ff",
                      boxShadow: "0 0 0 3px rgba(0,212,255,0.15), 0 0 12px rgba(0,212,255,0.4)",
                    }}
                  />

                  {/* Spacer for the other side on desktop */}
                  <div className="hidden md:block w-5/12" />
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom motivational nudge ── */}
        <div className="mt-20 text-center">
          <p className="text-sm italic" style={{ color: "#64748b" }}>
            "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
          </p>
        </div>
      </div>
    </section>
  );
}
