import { useEffect, useRef, useState } from "react";
import {
  Mail,
  Github,
  Linkedin,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  ExternalLink,
  Info,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo, contactInfo } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// Contact Section
// NOTE: The contact form is NOT connected to a backend.
// Please email adarshmaurya13272@gmail.com directly for now.
// ─────────────────────────────────────────────────────────────────────────────

// ── Icon helper (maps string icon names from portfolioData to lucide components)
function ContactIcon({ name, size = 20 }: { name: string; size?: number }) {
  const style = { color: "#00d4ff" };
  switch (name) {
    case "Mail":
      return <Mail size={size} style={style} />;
    case "Github":
      return <Github size={size} style={style} />;
    case "Linkedin":
      return <Linkedin size={size} style={style} />;
    default:
      return <Mail size={size} style={style} />;
  }
}

// ── Form field types ──────────────────────────────────────────────────────────
interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.message.trim()) {
    errors.message = "Message is required.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

// ── Inline error display ──────────────────────────────────────────────────────
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-xs flex items-center gap-1" style={{ color: "#f87171" }}>
      <AlertCircle size={12} />
      {message}
    </p>
  );
}

// ── Success state card ────────────────────────────────────────────────────────
function SuccessCard({ email }: { email: string }) {
  return (
    <div
      className="glass rounded-2xl p-8 flex flex-col items-center text-center"
      style={{
        border: "1px solid rgba(16,185,129,0.25)",
        background: "rgba(16,185,129,0.04)",
      }}
    >
      <div
        className="mb-5 p-4 rounded-full"
        style={{ background: "rgba(16,185,129,0.12)" }}
      >
        <CheckCircle size={40} style={{ color: "#34d399" }} />
      </div>

      <h3 className="text-xl font-bold text-white mb-3">
        Thank you for your message!
      </h3>

      <p className="text-sm leading-relaxed mb-6" style={{ color: "#94a3b8" }}>
        Since this form isn't connected to a backend yet, please email me
        directly. I'll make sure to connect this form to a real service very
        soon. I appreciate your patience!
      </p>

      <a
        href={`mailto:${email}`}
        className="btn-primary inline-flex items-center gap-2 text-sm"
      >
        <Mail size={15} />
        Send Email Directly
      </a>

      <p className="mt-4 text-xs" style={{ color: "#64748b" }}>
        {email}
      </p>
    </div>
  );
}

// ── Main Contact Section ──────────────────────────────────────────────────────
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // ── GSAP Animations ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      const leftCol = sectionRef.current?.querySelector(".contact-left");
      const rightCol = sectionRef.current?.querySelector(".contact-right");
      const header = sectionRef.current?.querySelector(".contact-header");

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

      if (leftCol) {
        gsap.fromTo(
          leftCol,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftCol,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (rightCol) {
        gsap.fromTo(
          rightCol,
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.15,
            scrollTrigger: {
              trigger: rightCol,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Handlers ──
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Live re-validate touched fields
    if (touched[name]) {
      const updated = { ...values, [name]: value };
      const newErrors = validateForm(updated);
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validateForm(values);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched to show all errors
    setTouched({ name: true, email: true, subject: true, message: true });

    const newErrors = validateForm(values);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    // Simulate loading (since no backend)
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    setIsSuccess(true);
  };

  const directEmail = "adarshmaurya13272@gmail.com";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "#020817" }}
    >
      {/* Background radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 100%, rgba(0,212,255,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-10 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="contact-header text-center mb-16">
          <span
            className="inline-block text-xs font-bold tracking-[0.3em] uppercase mb-4 px-4 py-2 rounded-full"
            style={{
              color: "#00d4ff",
              background: "rgba(0,212,255,0.08)",
              border: "1px solid rgba(0,212,255,0.2)",
            }}
          >
            CONTACT
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-gradient">Let's Connect</span>
          </h2>
          <p className="mt-4 text-base" style={{ color: "#94a3b8" }}>
            Open to opportunities, collaborations, and conversations
          </p>
          <div className="glow-line mt-6 mx-auto" />
        </div>

        {/* ── Two Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ══ LEFT — Contact Info ══ */}
          <div className="contact-left space-y-8">

            {/* Personal message */}
            <div>
              <h3 className="text-xl font-bold text-white mb-3">
                Get In Touch
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                I'm always open to discussing new opportunities, collaborations,
                or just having a good tech conversation. Whether you have a
                project idea, want to collaborate on something exciting, or just
                want to connect — feel free to reach out!
              </p>
            </div>

            {/* Contact info cards */}
            <div className="space-y-3">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith("mailto") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 glass rounded-xl p-4 card-hover group transition-all duration-200"
                  style={{
                    border: "1px solid rgba(0,212,255,0.1)",
                    textDecoration: "none",
                  }}
                >
                  <div
                    className="p-2.5 rounded-xl transition-all duration-200 group-hover:scale-110 flex-shrink-0"
                    style={{ background: "rgba(0,212,255,0.08)" }}
                  >
                    <ContactIcon name={info.icon} size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: "#64748b" }}>
                      {info.label}
                    </p>
                    <p className="text-sm font-medium text-white truncate">{info.value}</p>
                  </div>
                  <ExternalLink
                    size={14}
                    className="ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "#00d4ff" }}
                  />
                </a>
              ))}
            </div>

            {/* Social icon buttons */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#64748b" }}>
                Find me on
              </p>
              <div className="flex gap-3">
                {/* GitHub */}
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl transition-all duration-200 hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#e2e8f0",
                  }}
                  aria-label="GitHub"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 20px rgba(0,212,255,0.3)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(0,212,255,0.4)";
                    (e.currentTarget as HTMLElement).style.color = "#00d4ff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLElement).style.color = "#e2e8f0";
                  }}
                >
                  <Github size={20} />
                </a>

                {/* LinkedIn */}
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl transition-all duration-200 hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#e2e8f0",
                  }}
                  aria-label="LinkedIn"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 20px rgba(0,212,255,0.3)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(0,212,255,0.4)";
                    (e.currentTarget as HTMLElement).style.color = "#00d4ff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLElement).style.color = "#e2e8f0";
                  }}
                >
                  <Linkedin size={20} />
                </a>

                {/* Email */}
                <a
                  href={personalInfo.email}
                  className="p-3 rounded-xl transition-all duration-200 hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#e2e8f0",
                  }}
                  aria-label="Email"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 20px rgba(0,212,255,0.3)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(0,212,255,0.4)";
                    (e.currentTarget as HTMLElement).style.color = "#00d4ff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLElement).style.color = "#e2e8f0";
                  }}
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* ══ RIGHT — Contact Form ══ */}
          <div className="contact-right">

            {/* Backend notice */}
            <div
              className="glass rounded-xl p-4 mb-6 flex items-start gap-3"
              style={{
                border: "1px solid rgba(245,158,11,0.25)",
                background: "rgba(245,158,11,0.04)",
              }}
            >
              <Info size={15} style={{ color: "#fbbf24", flexShrink: 0, marginTop: 1 }} />
              <p className="text-xs leading-relaxed" style={{ color: "#94a3b8" }}>
                <span className="font-semibold" style={{ color: "#fbbf24" }}>Note: </span>
                This form is not connected to a backend yet. Please email
                directly at{" "}
                <a
                  href={`mailto:${directEmail}`}
                  className="underline underline-offset-2"
                  style={{ color: "#fbbf24" }}
                >
                  {directEmail}
                </a>{" "}
                for now. I am working on setting this up.
              </p>
            </div>

            {/* Success state */}
            {isSuccess ? (
              <SuccessCard email={directEmail} />
            ) : (
              /* ── Form ── */
              <form
                onSubmit={handleSubmit}
                noValidate
                className="glass rounded-2xl p-6 space-y-5"
                style={{
                  border: "1px solid rgba(0,212,255,0.1)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: "#94a3b8" }}
                  >
                    Name <span style={{ color: "#f87171" }}>*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your full name"
                    className="form-input w-full"
                    style={errors.name && touched.name ? { borderColor: "rgba(248,113,113,0.5)" } : {}}
                    autoComplete="name"
                  />
                  {touched.name && <FieldError message={errors.name} />}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: "#94a3b8" }}
                  >
                    Email <span style={{ color: "#f87171" }}>*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="your.email@example.com"
                    className="form-input w-full"
                    style={errors.email && touched.email ? { borderColor: "rgba(248,113,113,0.5)" } : {}}
                    autoComplete="email"
                  />
                  {touched.email && <FieldError message={errors.email} />}
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: "#94a3b8" }}
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={values.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="What's this about?"
                    className="form-input w-full"
                    autoComplete="off"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: "#94a3b8" }}
                  >
                    Message <span style={{ color: "#f87171" }}>*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tell me what's on your mind..."
                    className="form-input w-full resize-none"
                    style={
                      errors.message && touched.message
                        ? { borderColor: "rgba(248,113,113,0.5)" }
                        : {}
                    }
                  />
                  {touched.message && <FieldError message={errors.message} />}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-xs text-center" style={{ color: "#475569" }}>
                  By submitting, you agree that your message may be stored for
                  future reply.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* ── Footer note ── */}
        <div className="mt-20 text-center border-t pt-10" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          <p className="text-sm" style={{ color: "#64748b" }}>
            Designed &amp; built by{" "}
            <span className="font-semibold" style={{ color: "#00d4ff" }}>
              {personalInfo.name}
            </span>{" "}
            with React, TypeScript &amp; Tailwind CSS
          </p>
          <p className="text-xs mt-2" style={{ color: "#334155" }}>
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
