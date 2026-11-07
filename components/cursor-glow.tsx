'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let currentSpeed = 0;
    let targetSpeed = 0;
    let particleOffset = 0;
    let frameId = 0;
    let lastTime = 0;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const handleMove = (event: PointerEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.transform =
        `translate3d(${event.clientX - 180}px, ${event.clientY - 180}px, 0)`;
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;
      lastScrollY = currentY;

      // Downward scrolling moves particles upward; upward scrolling reverses them.
      targetSpeed = Math.max(-2, Math.min(2, delta * 0.08));
    };

    const animate = (time: number) => {
      const deltaTime = lastTime ? Math.min(time - lastTime, 32) : 16;
      lastTime = time;

      if (!reduceMotion) {
        // Smooth acceleration and deceleration as scrolling starts and stops.
        currentSpeed += (targetSpeed - currentSpeed) * 0.045;
        targetSpeed *= 0.96;

        document.documentElement.style.setProperty(
          '--scroll-particle-speed',
          `${Math.abs(currentSpeed)}`
        );
        particleOffset += currentSpeed * deltaTime * 0.025;

        document.documentElement.style.setProperty(
          '--scroll-particle-offset',
          `${particleOffset}px`
        );
      }

      frameId = window.requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    if (!reduceMotion) {
      frameId = window.requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('scroll', handleScroll);
      window.cancelAnimationFrame(frameId);
      document.documentElement.style.removeProperty('--scroll-particle-speed');
      document.documentElement.style.removeProperty('--scroll-particle-offset');
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
