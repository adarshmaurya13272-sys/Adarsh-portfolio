import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease',
          background: scrolled ? 'rgba(2, 8, 23, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0, 212, 255, 0.1)' : '1px solid transparent',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'none',
            }}
          >
            {/* AM Box */}
            <div
              style={{
                width: '38px',
                height: '38px',
                border: '1.5px solid #00d4ff',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0, 212, 255, 0.08)',
                boxShadow: '0 0 12px rgba(0, 212, 255, 0.2)',
              }}
            >
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #00d4ff, #00fff7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                AM
              </span>
            </div>
            {/* Name */}
            <span
              className="hidden sm:block"
              style={{
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                color: '#e2e8f0',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              ADARSH MAURYA
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div
            className="hidden lg:flex"
            style={{ alignItems: 'center', gap: '8px' }}
          >
            {navLinks.map(link => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  style={{
                    position: 'relative',
                    padding: '8px 16px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#00d4ff' : '#94a3b8',
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: '0.03em',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = '#e2e8f0';
                  }}
                  onMouseLeave={e => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = '#94a3b8';
                  }}
                >
                  {link.label}
                  {/* Active indicator dot */}
                  {isActive && (
                    <>
                      {/* Underline */}
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '4px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '20px',
                          height: '2px',
                          borderRadius: '1px',
                          background: '#00d4ff',
                          boxShadow: '0 0 6px rgba(0, 212, 255, 0.6)',
                        }}
                      />
                      {/* Dot */}
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '3px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          background: '#00d4ff',
                          boxShadow: '0 0 8px rgba(0, 212, 255, 0.8)',
                        }}
                      />
                    </>
                  )}
                </button>
              );
            })}

            {/* Hire Me CTA */}
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-primary"
              style={{ marginLeft: '12px', fontSize: '14px' }}
            >
              Hire Me
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(prev => !prev)}
            style={{
              background: 'none',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              borderRadius: '8px',
              padding: '8px',
              color: '#00d4ff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className="lg:hidden"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '280px',
          zIndex: 99,
          background: 'rgba(2, 8, 23, 0.97)',
          backdropFilter: 'blur(20px)',
          borderLeft: '1px solid rgba(0, 212, 255, 0.15)',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '100px',
          paddingLeft: '32px',
          paddingRight: '32px',
          gap: '8px',
        }}
      >
        {navLinks.map((link, i) => {
          const isActive = activeSection === link.id;
          return (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              style={{
                textAlign: 'left',
                padding: '14px 0',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#00d4ff' : '#e2e8f0',
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'color 0.2s ease',
                transitionDelay: mobileOpen ? `${i * 0.05}s` : '0s',
                transform: mobileOpen ? 'translateX(0)' : 'translateX(20px)',
                opacity: mobileOpen ? 1 : 0,
              }}
            >
              {isActive && (
                <span
                  style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: '#00d4ff',
                    boxShadow: '0 0 6px rgba(0, 212, 255, 0.8)',
                    flexShrink: 0,
                  }}
                />
              )}
              {link.label}
            </button>
          );
        })}

        {/* Hire Me in mobile menu */}
        <button
          onClick={() => scrollToSection('contact')}
          className="btn-primary"
          style={{ marginTop: '24px', textAlign: 'center', width: '100%' }}
        >
          Hire Me
        </button>
      </div>

      {/* Backdrop when mobile menu is open */}
      {mobileOpen && (
        <div
          className="lg:hidden"
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 98,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(2px)',
          }}
        />
      )}
    </>
  );
};

export default Navbar;
