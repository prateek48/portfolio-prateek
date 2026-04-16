import { useState, useEffect, useCallback } from 'react';

export default function useMouseParallax(strength = 0.02) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setPosition({
        x: (e.clientX - centerX) * strength,
        y: (e.clientY - centerY) * strength,
      });
    },
    [strength]
  );

  useEffect(() => {
    let rafId;
    const throttledHandler = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        handleMouseMove(e);
        rafId = null;
      });
    };

    window.addEventListener('mousemove', throttledHandler);
    return () => {
      window.removeEventListener('mousemove', throttledHandler);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [handleMouseMove]);

  return position;
}
