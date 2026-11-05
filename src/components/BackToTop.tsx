import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        zIndex: 50,
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        border: '1.5px solid rgba(0, 212, 255, 0.5)',
        background: 'rgba(2, 8, 23, 0.8)',
        backdropFilter: 'blur(12px)',
        color: '#00d4ff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: visible
          ? '0 0 16px rgba(0, 212, 255, 0.3), 0 0 4px rgba(0, 212, 255, 0.2) inset'
          : 'none',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      onMouseEnter={e => {
        const btn = e.currentTarget as HTMLButtonElement;
        btn.style.background = 'rgba(0, 212, 255, 0.15)';
        btn.style.boxShadow = '0 0 24px rgba(0, 212, 255, 0.5), 0 0 8px rgba(0, 212, 255, 0.3) inset';
        btn.style.borderColor = 'rgba(0, 212, 255, 0.9)';
        btn.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        const btn = e.currentTarget as HTMLButtonElement;
        btn.style.background = 'rgba(2, 8, 23, 0.8)';
        btn.style.boxShadow = '0 0 16px rgba(0, 212, 255, 0.3), 0 0 4px rgba(0, 212, 255, 0.2) inset';
        btn.style.borderColor = 'rgba(0, 212, 255, 0.5)';
        btn.style.transform = 'translateY(0)';
      }}
    >
      <ArrowUp size={20} strokeWidth={2.5} />
    </button>
  );
};

export default BackToTop;
