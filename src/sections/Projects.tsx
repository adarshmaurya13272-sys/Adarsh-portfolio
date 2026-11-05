import { useEffect, useRef, useState, useCallback } from "react";
import { Github, ExternalLink, X, Info, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// Projects Section
// PLACEHOLDER NOTE: These are placeholder project cards.
// Update src/data/portfolioData.ts with your real projects.
// ─────────────────────────────────────────────────────────────────────────────

type Project = (typeof projects)[number];
type Filter = "All" | "Web" | "Programming";

// ── Placeholder image component shown when project.image is empty ─────────────
function PlaceholderImage({ title }: { title: string }) {
  const initials = title
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase()
    .replace(/[\[\]]/g, "?");

  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden select-none"
      style={{
        background: "linear-gradient(135deg, #0a0f1e 0%, #0d1a2e 50%, #0a0f1e 100%)",
      }}
    >
      {/* Dot-grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, #00d4ff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Subtle diagonal lines */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #7c3aed 0px, #7c3aed 1px, transparent 1px, transparent 20px)",
        }}
      />
      {/* Initials */}
      <span
        className="relative z-10 text-4xl font-black tracking-widest"
        style={{
          color: "#00d4ff",
          textShadow: "0 0 30px rgba(0,212,255,0.6), 0 0 60px rgba(0,212,255,0.3)",
        }}
      >
        {initials}
      </span>
    </div>
  );
}

// ── Card tilt effect ─────────────────────────────────────────────────────────
function useTilt() {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    }
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}

// ── Single Project Card ───────────────────────────────────────────────────────
function ProjectCard({
  project,
  onViewDetails,
}: {
  project: Project;
  onViewDetails: (p: Project) => void;
}) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt();
  const hasDemo = project.demo && project.demo !== "#";

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-card glass rounded-2xl overflow-hidden card-hover flex flex-col"
      style={{
        border: "1px solid rgba(0,212,255,0.1)",
        transition: "transform 0.15s ease, box-shadow 0.3s ease",
        willChange: "transform",
      }}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden" style={{ height: 220 }}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <PlaceholderImage title={project.title} />
        )}

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(0,212,255,0.15)",
                border: "1px solid rgba(0,212,255,0.4)",
                color: "#00d4ff",
                backdropFilter: "blur(8px)",
              }}
            >
              <Star size={10} fill="#00d4ff" />
              Featured
            </span>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(124,58,237,0.2)",
              border: "1px solid rgba(124,58,237,0.35)",
              color: "#a78bfa",
              backdropFilter: "blur(8px)",
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Image overlay gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(2,8,23,0.6) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Title */}
        <h3 className="text-base font-bold text-white mb-2 leading-snug">
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm mb-4 leading-relaxed flex-1"
          style={{
            color: "#94a3b8",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.description}
        </p>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-0.5 rounded-full font-medium"
              style={{
                background: "rgba(0,212,255,0.07)",
                border: "1px solid rgba(0,212,255,0.2)",
                color: "#00d4ff",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 mt-auto">
          {/* GitHub */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#e2e8f0",
            }}
            aria-label="View on GitHub"
          >
            <Github size={13} />
            GitHub
          </a>

          {/* Demo */}
          {hasDemo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105"
              style={{
                background: "rgba(0,212,255,0.1)",
                border: "1px solid rgba(0,212,255,0.3)",
                color: "#00d4ff",
              }}
              aria-label="View live demo"
            >
              <ExternalLink size={13} />
              Demo
            </a>
          ) : (
            <span
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg cursor-not-allowed"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "#475569",
              }}
              title="Demo not available"
            >
              <ExternalLink size={13} />
              Demo
            </span>
          )}

          {/* View Details — spacer push to right */}
          <button
            onClick={() => onViewDetails(project)}
            className="ml-auto text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105"
            style={{
              background: "rgba(124,58,237,0.12)",
              border: "1px solid rgba(124,58,237,0.3)",
              color: "#a78bfa",
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Project Detail Modal ──────────────────────────────────────────────────────
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const hasDemo = project.demo && project.demo !== "#";

  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${project.title}`}
    >
      <div className="modal-content glass-strong rounded-2xl max-w-2xl w-full mx-4 p-0 overflow-hidden relative">
        {/* Modal image header */}
        <div className="relative overflow-hidden" style={{ height: 220 }}>
          {project.image ? (
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <PlaceholderImage title={project.title} />
          )}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(2,8,23,0.9) 0%, transparent 60%)",
            }}
          />
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full transition-all duration-200 hover:scale-110"
            style={{
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#e2e8f0",
              backdropFilter: "blur(8px)",
            }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
          {/* Featured badge */}
          {project.featured && (
            <div className="absolute bottom-4 left-5 z-10">
              <span
                className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(0,212,255,0.2)",
                  border: "1px solid rgba(0,212,255,0.4)",
                  color: "#00d4ff",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Star size={10} fill="#00d4ff" />
                Featured Project
              </span>
            </div>
          )}
        </div>

        {/* Modal body */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: "60vh" }}>
          {/* Category + Title */}
          <div className="mb-1">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#7c3aed" }}>
              {project.category}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">{project.title}</h2>

          {/* Long description */}
          <p className="text-sm leading-relaxed mb-6" style={{ color: "#94a3b8" }}>
            {project.longDescription || project.description}
          </p>

          {/* Tech stack */}
          <div className="mb-6">
            <h4 className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#00d4ff" }}>
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-sm px-3 py-1 rounded-full font-medium"
                  style={{
                    background: "rgba(0,212,255,0.08)",
                    border: "1px solid rgba(0,212,255,0.25)",
                    color: "#00d4ff",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action links */}
          <div className="flex gap-3 flex-wrap">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-2 text-sm"
            >
              <Github size={16} />
              View on GitHub
            </a>
            {hasDemo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 text-sm"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Projects Section ─────────────────────────────────────────────────────
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filters: Filter[] = ["All", "Web", "Programming"];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  // GSAP stagger reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".project-card");
      if (!cards) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "#020817" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-bold tracking-[0.3em] uppercase mb-4 px-4 py-2 rounded-full"
            style={{
              color: "#7c3aed",
              background: "rgba(124,58,237,0.08)",
              border: "1px solid rgba(124,58,237,0.2)",
            }}
          >
            PROJECTS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-gradient">My Work</span>
          </h2>
          <p className="mt-4 text-base" style={{ color: "#94a3b8" }}>
            A showcase of projects I've built while learning
          </p>
          <div className="glow-line mt-6 mx-auto" />
        </div>

        {/* ── Placeholder Notice ── */}
        <div
          className="glass rounded-xl p-4 mb-10 flex items-start gap-3 max-w-2xl mx-auto"
          style={{
            border: "1px solid rgba(124,58,237,0.25)",
            background: "rgba(124,58,237,0.04)",
          }}
        >
          <Info size={16} style={{ color: "#a78bfa", flexShrink: 0, marginTop: 2 }} />
          <p className="text-sm" style={{ color: "#94a3b8" }}>
            <span className="font-semibold" style={{ color: "#a78bfa" }}>Placeholder projects: </span>
            Update{" "}
            <code
              className="px-1.5 py-0.5 rounded text-xs"
              style={{ background: "rgba(124,58,237,0.15)", color: "#a78bfa" }}
            >
              src/data/portfolioData.ts
            </code>{" "}
            with your real projects, GitHub links, screenshots, and descriptions.
          </p>
        </div>

        {/* ── Filter Tabs ── */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 hover:scale-105"
              style={
                activeFilter === filter
                  ? {
                      background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                      color: "#020817",
                      border: "none",
                      boxShadow: "0 0 20px rgba(0,212,255,0.3)",
                    }
                  : {
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#94a3b8",
                    }
              }
            >
              {filter}
              {filter !== "All" && (
                <span className="ml-1.5 text-xs opacity-70">
                  ({projects.filter((p) => p.category === filter).length})
                </span>
              )}
              {filter === "All" && (
                <span className="ml-1.5 text-xs opacity-70">({projects.length})</span>
              )}
            </button>
          ))}
        </div>

        {/* ── Project Grid ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetails={setSelectedProject}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-lg" style={{ color: "#64748b" }}>
                No projects in this category yet.
              </p>
            </div>
          )}
        </div>

        {/* ── CTA ── */}
        <div className="mt-16 text-center">
          <p className="text-sm mb-4" style={{ color: "#64748b" }}>
            More projects coming soon. Follow my GitHub for updates!
          </p>
          <a
            href="https://github.com/adarshmaurya13272-sys"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            <Github size={16} />
            Visit My GitHub
          </a>
        </div>
      </div>

      {/* ── Detail Modal ── */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
