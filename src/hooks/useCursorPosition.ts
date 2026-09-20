'use client';

import { useMotionValue } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function useCursorPosition() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const rafIdRef = useRef<number | null>(null);
  const latestPos = useRef<{ x: number; y: number }>({ x: -100, y: -100 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Guard for touch/coarse devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handlePointerMove = (e: PointerEvent) => {
      latestPos.current = { x: e.clientX - 12, y: e.clientY - 12 };

      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(() => {
          cursorX.set(latestPos.current.x);
          cursorY.set(latestPos.current.y);
          rafIdRef.current = null;
        });
      }
    };

    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [cursorX, cursorY]);

  return { cursorX, cursorY };
}
