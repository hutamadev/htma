'use client';

import clsx from 'clsx';
import { useCallback } from 'react';

import {
  morphPoints,
  type ShapePoint,
} from '@components/ui/loading-spin-shapes';

/**
 * Material 3 Expressive loading indicator (active indicator only).
 *
 * Spec: "a looping shape morph sequence composed of seven unique Material 3
 * shapes", morphing every 650ms, the shape rotating a constant 50deg per shape
 * plus an extra 90deg settle spring (stiffness 200, damping ratio 0.6), inside a
 * 48dp box with a 38dp shape — hence the 0.79 shape ratio
 * (source: m3.material.io/components/loading-indicator/guidelines and /specs).
 *
 * Rendered on a canvas because the reference morph lerps the same number of
 * points per shape; CSS `d` interpolation cannot (the outlines differ in cubic
 * count and start point). See `loading-spin-shapes.ts`.
 */

const MORPH_MS_PER_SHAPE = 650;
const ROTATION_PER_SHAPE_DEG = 50;
const ROTATION_SPRING_DEG = 90;
const SPRING_STIFFNESS = 200;
const SPRING_DAMPING = 2 * 0.6 * Math.sqrt(SPRING_STIFFNESS);
const SPRING_SUBSTEPS = 12;
const SHAPE_SCALE_RATIO = 0.79;
const MAX_FRAME_SECONDS = 0.1;
const REDUCED_MOTION_FADE_MS = 1400;
const M3_BASELINE_PRIMARY = '#6750a4';

function runIndicator(canvas: HTMLCanvasElement): () => void {
  const context = canvas.getContext('2d');
  if (context === null) {
    return () => {};
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let indicatorColor = M3_BASELINE_PRIMARY;
  let elapsedMs = 0;
  let lastTimestamp = 0;
  let cycles = 0;
  let springPosition = 0;
  let springVelocity = 0;
  let springTarget = 1;
  let frame = 0;

  // Canvas cannot inherit a colour, so the theme token is read back from CSS
  // and re-read whenever the theme toggle flips the `dark` class on <html>.
  const refreshColor = () => {
    const token = getComputedStyle(canvas)
      .getPropertyValue('--color-primary')
      .trim();
    indicatorColor = token.length > 0 ? token : M3_BASELINE_PRIMARY;
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    const width = Math.max(1, Math.round(rect.width * ratio));
    const height = Math.max(1, Math.round(rect.height * ratio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  };

  const draw = (
    points: readonly ShapePoint[],
    rotationDeg: number,
    alpha: number
  ) => {
    const { width, height } = canvas;
    const scale = (Math.min(width, height) / 2) * SHAPE_SCALE_RATIO;

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, width, height);
    context.save();
    context.translate(width / 2, height / 2);
    context.rotate((rotationDeg * Math.PI) / 180);
    context.globalAlpha = alpha;
    context.fillStyle = indicatorColor;
    context.beginPath();
    for (let i = 0; i < points.length; i++) {
      const x = points[i][0] * scale;
      const y = points[i][1] * scale;
      if (i === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    }
    context.closePath();
    context.fill();
    context.restore();
  };

  const renderFrame = (timestamp: number) => {
    frame = requestAnimationFrame(renderFrame);

    // Clamped so a backgrounded tab does not resume with one huge jump.
    const seconds =
      lastTimestamp === 0
        ? 0
        : Math.min((timestamp - lastTimestamp) / 1000, MAX_FRAME_SECONDS);
    lastTimestamp = timestamp;

    if (reducedMotion.matches) {
      // Rotation and morphing are the vestibular triggers, so under
      // `prefers-reduced-motion` the burst stays put and fades instead.
      elapsedMs = (elapsedMs + seconds * 1000) % REDUCED_MOTION_FADE_MS;
      const wave =
        0.5 +
        0.5 * Math.sin((elapsedMs / REDUCED_MOTION_FADE_MS) * Math.PI * 2);
      draw(morphPoints(0), 0, 0.55 + 0.45 * wave);
      return;
    }

    elapsedMs += seconds * 1000;
    const cycle = Math.floor(elapsedMs / MORPH_MS_PER_SHAPE);
    if (cycle > cycles) {
      cycles = cycle;
      springTarget = cycles + 1;
    }

    const substep = seconds / SPRING_SUBSTEPS;
    for (let step = 0; step < SPRING_SUBSTEPS; step++) {
      const acceleration =
        -SPRING_STIFFNESS * (springPosition - springTarget) -
        SPRING_DAMPING * springVelocity;
      springVelocity += acceleration * substep;
      springPosition += springVelocity * substep;
    }

    const fraction = (elapsedMs % MORPH_MS_PER_SHAPE) / MORPH_MS_PER_SHAPE;
    const settled = Math.min(springPosition - cycles, 1);
    const rotation =
      (ROTATION_PER_SHAPE_DEG + ROTATION_SPRING_DEG) * cycles +
      ROTATION_PER_SHAPE_DEG * fraction +
      ROTATION_SPRING_DEG * settled;

    draw(morphPoints(springPosition), rotation, 1);
  };

  const resizeObserver = new ResizeObserver(() => resize());
  resizeObserver.observe(canvas);

  const themeObserver = new MutationObserver(() => refreshColor());
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });

  refreshColor();
  resize();
  // Painted synchronously so the first frame lands before the browser paints
  // the mounted element, then the loop takes over.
  draw(morphPoints(0), 0, 1);
  frame = requestAnimationFrame(renderFrame);

  return () => {
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    themeObserver.disconnect();
  };
}

interface ILoadingSpinProps {
  readonly className?: string;
}

export default function LoadingSpin({
  className,
}: Readonly<ILoadingSpinProps>) {
  // React 19 calls the returned cleanup on unmount, so no effect is needed.
  const attach = useCallback((canvas: HTMLCanvasElement | null) => {
    if (canvas === null) {
      return;
    }
    return runIndicator(canvas);
  }, []);

  return (
    <>
      <canvas
        ref={attach}
        aria-hidden='true'
        className={clsx('block', className)}
      />
      {/* Indeterminate progress lives on a real element: `role` cannot say this
          and stay semantic. */}
      <progress aria-label='Loading' className='sr-only' />
    </>
  );
}
