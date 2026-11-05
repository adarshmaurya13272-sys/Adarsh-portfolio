import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import { personalInfo, navLinks } from '../data/portfolioData';

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#020817]/80">
      {/* Top glow line */}
      <div className="glow-line w-full" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg border border-cyan-400/50 flex items-center justify-center">
                <span className="text-cyan-400 font-black text-lg">A</span>
              </div>
              <div>
                <p className="font-bold text-white text-sm">Adarsh Maurya</p>
                <p className="text-slate-500 text-xs">B.Tech Student & Developer</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Passionate about technology, programming, and building meaningful digital experiences. Currently learning, growing, and building.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              Connect
            </h3>
            <div className="flex gap-3 mb-4">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-300"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={personalInfo.email}
                className="w-10 h-10 rounded-lg glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
            <p className="text-slate-500 text-xs">
              adarshmaurya13272@gmail.com
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="glow-line w-full mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <p className="flex items-center gap-1.5">
            © {year} Adarsh Maurya. Made with{' '}
            <Heart size={12} className="text-red-500 fill-red-500" /> using React & Tailwind CSS.
          </p>
          <p className="text-slate-600">
            Designed & Developed by Adarsh Maurya
          </p>
        </div>
      </div>
    </footer>
  );
}
