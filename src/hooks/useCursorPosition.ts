'use client';

import { useMotionValue } from 'framer-motion';
import { useEffect, useRef } from 'react';

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, .magnetic-item, .cursor-pointer, .group\\/skill, .section-header';

export default function useCursorPosition() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorScale = useMotionValue(1);
  const cursorOpacity = useMotionValue(0);

  const rafIdRef = useRef<number | null>(null);
  const latestPos = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const hoveredElRef = useRef<HTMLElement | null>(null);
  const isPressingRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Guard for touch/coarse devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const clearMagnetic = (el: HTMLElement | null) => {
      if (!el) return;
      el.style.removeProperty('--parallax-x');
      el.style.removeProperty('--parallax-y');
    };

    const handleMove = (e: MouseEvent | PointerEvent) => {
      latestPos.current = { x: e.clientX - 12, y: e.clientY - 12 };

      // Check if hovering interactive element via elementFromPoint
      const hoveredNode = document.elementFromPoint(e.clientX, e.clientY);
      const interactiveEl = hoveredNode?.closest(
        INTERACTIVE_SELECTOR
      ) as HTMLElement | null;

      if (interactiveEl) {
        // Cursor dot dissolves directly into component with smooth fluid shrink
        cursorOpacity.set(0);
        cursorScale.set(0);

        // Calculate magnetic parallax offset on the hovered element
        if (hoveredElRef.current && hoveredElRef.current !== interactiveEl) {
          clearMagnetic(hoveredElRef.current);
        }
        hoveredElRef.current = interactiveEl;

        const rect = interactiveEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const isHeader = interactiveEl.classList.contains('section-header');
        const maxOffset = 3.5; // subtle 3.5px magnetic pull
        const minNx = isHeader ? 0 : -1;
        const nx = Math.max(minNx, Math.min(1, dx / (rect.width / 2 || 1)));
        const ny = Math.max(-1, Math.min(1, dy / (rect.height / 2 || 1)));

        interactiveEl.style.setProperty(
          '--parallax-x',
          `${(nx * maxOffset).toFixed(1)}px`
        );
        interactiveEl.style.setProperty(
          '--parallax-y',
          `${(ny * maxOffset).toFixed(1)}px`
        );
      } else {
        // Not on interactive element
        if (hoveredElRef.current) {
          clearMagnetic(hoveredElRef.current);
          hoveredElRef.current = null;
        }
        cursorOpacity.set(1);
        cursorScale.set(isPressingRef.current ? 0.85 : 1);
      }

      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(() => {
          cursorX.set(latestPos.current.x);
          cursorY.set(latestPos.current.y);
          rafIdRef.current = null;
        });
      }
    };

    const handlePointerDown = () => {
      isPressingRef.current = true;
      if (!hoveredElRef.current) {
        cursorScale.set(0.85);
      }
    };

    const handlePointerUp = () => {
      isPressingRef.current = false;
      if (!hoveredElRef.current) {
        cursorScale.set(1);
      }
    };

    const handleMouseLeave = () => {
      cursorOpacity.set(0);
      if (hoveredElRef.current) {
        clearMagnetic(hoveredElRef.current);
        hoveredElRef.current = null;
      }
    };

    const handleMouseEnter = () => {
      cursorOpacity.set(1);
    };

    window.addEventListener('pointermove', handleMove as EventListener, {
      passive: true,
    });
    window.addEventListener('mousemove', handleMove as EventListener, {
      passive: true,
    });
    window.addEventListener('pointerdown', handlePointerDown, {
      passive: true,
    });
    window.addEventListener('mousedown', handlePointerDown, {
      passive: true,
    });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('mouseup', handlePointerUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('pointermove', handleMove as EventListener);
      window.removeEventListener('mousemove', handleMove as EventListener);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('mouseup', handlePointerUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (hoveredElRef.current) {
        clearMagnetic(hoveredElRef.current);
      }
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [cursorX, cursorY, cursorScale, cursorOpacity]);

  return { cursorX, cursorY, cursorScale, cursorOpacity };
}
