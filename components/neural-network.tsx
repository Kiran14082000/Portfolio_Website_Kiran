'use client';

import { useEffect, useRef } from 'react';

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let width = 0;
    let height = 0;
    let frame = 0;
    let time = 0;
    let nodes: { x: number; y: number; phase: number }[] = [];
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(16, Math.min(34, Math.round(width / 18)));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: ((i * 67.7 + 23) % 100) / 100 * width,
        y: ((i * 43.3 + 17) % 100) / 100 * height,
        phase: i * 1.7,
      }));
      draw();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      if (reducedMotion) draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const points = nodes.map((node) => {
        const drift = reducedMotion ? 0 : time;
        const x = node.x + Math.sin(drift * 0.0007 + node.phase) * 10;
        const y = node.y + Math.cos(drift * 0.0006 + node.phase) * 9;
        const dx = mouse.x - x;
        const dy = mouse.y - y;
        const distance = Math.hypot(dx, dy);
        const influence = distance < 150 ? (1 - distance / 150) * 7 : 0;
        return {
          x: x + (distance ? dx / distance * influence : 0),
          y: y + (distance ? dy / distance * influence : 0),
          phase: node.phase,
        };
      });

      points.forEach((point, i) => {
        for (let j = i + 1; j < points.length; j++) {
          const other = points[j];
          const distance = Math.hypot(point.x - other.x, point.y - other.y);
          if (distance > 115) continue;

          const opacity = (1 - distance / 115) * 0.3;
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(99, 230, 226, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // A small light pulse travels along selected connections.
          if (!reducedMotion && (i + j) % 4 === 0) {
            const progress = ((time * 0.00022 + point.phase * 0.13) % 1);
            const pulseX = point.x + (other.x - point.x) * progress;
            const pulseY = point.y + (other.y - point.y) * progress;

            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 1.7, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(140, 255, 250, 0.95)';
            ctx.shadowColor = 'rgba(99, 230, 226, 0.8)';
            ctx.shadowBlur = 7;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      });

      points.forEach((point) => {
        const pulse = reducedMotion
          ? 1
          : 1 + (Math.sin(time * 0.002 + point.phase) + 1) * 0.45;

        ctx.beginPath();
        ctx.arc(point.x, point.y, pulse, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99, 230, 226, 0.8)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(point.x, point.y, pulse * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99, 230, 226, 0.07)';
        ctx.fill();
      });
    };

    const animate = (now: number) => {
      time = now;
      draw();
      frame = window.requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    resize();

    if (!reducedMotion) {
      frame = window.requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
