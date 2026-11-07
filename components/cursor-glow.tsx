'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      if (!glowRef.current) return;

      glowRef.current.style.transform =
        `translate3d(${event.clientX - 180}px, ${event.clientY - 180}px, 0)`;
    };

    window.addEventListener('pointermove', handleMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener('pointermove', handleMove);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="cursor-glow"
      aria-hidden="true"
    />
  );
}
