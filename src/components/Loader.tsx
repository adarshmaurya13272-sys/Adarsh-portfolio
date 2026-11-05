import React, { useEffect, useRef } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  const name = 'ADARSH MAURYA';

  useEffect(() => {
    // Stagger letter fade-in
    lettersRef.current.forEach((el, i) => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.4s ease ${0.3 + i * 0.07}s, transform 0.4s ease ${0.3 + i * 0.07}s`;
        // Trigger reflow
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 50);
      }
    });

    // Fade out and complete
    const timer = setTimeout(() => {
      if (loaderRef.current) {
        loaderRef.current.style.transition = 'opacity 0.6s ease';
        loaderRef.current.style.opacity = '0';
        setTimeout(() => {
          onComplete();
        }, 600);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{
        backgroundColor: '#020817',
        zIndex: 9999,
        opacity: 1,
      }}
    >
      {/* Large "A" letter */}
      <div
        className="relative mb-6 flex items-center justify-center"
        style={{
          width: '100px',
          height: '100px',
        }}
      >
        {/* Outer glow ring */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '2px solid rgba(0, 212, 255, 0.3)',
            animation: 'pulse-ring 2s ease-in-out infinite',
          }}
        />
        {/* Inner glow ring */}
        <div
          style={{
            position: 'absolute',
            inset: '10px',
            borderRadius: '50%',
            border: '1px solid rgba(0, 255, 247, 0.2)',
            animation: 'pulse-ring 2s ease-in-out infinite 0.5s',
          }}
        />
        {/* "A" Letter */}
        <span
          style={{
            fontSize: '56px',
            fontWeight: 900,
            fontFamily: "'Inter', sans-serif",
            background: 'linear-gradient(135deg, #00d4ff, #00fff7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: 'none',
            filter: 'drop-shadow(0 0 20px rgba(0, 212, 255, 0.8)) drop-shadow(0 0 40px rgba(0, 212, 255, 0.4))',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }}
        >
          A
        </span>
      </div>

      {/* "ADARSH MAURYA" letter-by-letter */}
      <div className="flex gap-1 mb-8">
        {name.split('').map((char, i) => (
          <span
            key={i}
            ref={el => {
              if (el) lettersRef.current[i] = el;
            }}
            style={{
              display: 'inline-block',
              fontSize: char === ' ' ? '0px' : '18px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: '#e2e8f0',
              fontFamily: "'Inter', sans-serif",
              width: char === ' ' ? '10px' : 'auto',
              opacity: 0,
              transform: 'translateY(20px)',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      {/* 3 vertical loader bars */}
      <div className="flex gap-2 mb-6">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            style={{
              width: '4px',
              height: '32px',
              borderRadius: '2px',
              background: 'linear-gradient(180deg, #00d4ff, #7c3aed)',
              animation: `loader-bar 1.2s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
              opacity: 0.8,
            }}
          />
        ))}
      </div>

      {/* Loading text */}
      <p
        style={{
          color: '#94a3b8',
          fontSize: '13px',
          letterSpacing: '0.2em',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          animation: 'fade-in-slow 1s ease 0.5s both',
        }}
      >
        Loading Portfolio...
      </p>

      {/* Inline keyframes */}
      <style>{`
        @keyframes pulse-ring {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes pulse-glow {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.8)) drop-shadow(0 0 40px rgba(0, 212, 255, 0.4)); }
          50% { filter: drop-shadow(0 0 30px rgba(0, 212, 255, 1)) drop-shadow(0 0 60px rgba(0, 212, 255, 0.6)); }
        }
        @keyframes loader-bar {
          0%, 100% { transform: scaleY(0.4); opacity: 0.4; }
          50% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes fade-in-slow {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Loader;
