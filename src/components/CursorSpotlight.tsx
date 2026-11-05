import React, { useEffect, useRef, useState } from 'react';

const CursorSpotlight: React.FC = () => {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check once on mount
    if (window.innerWidth < 1024) return;
    setIsDesktop(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <div
      className="cursor-spotlight"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        pointerEvents: 'none',
      }}
    />
  );
};

export default CursorSpotlight;
