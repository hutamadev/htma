/**
 * Material 3 Expressive Motion Physics System
 * Reference: https://m3.material.io/styles/motion/overview/specs
 * Reference: https://m3.material.io/blog/m3-expressive-motion-theming
 */

export const m3Motion = {
  // Spatial: position, scale, layout, border-radius (with calibrated natural overshoot)
  spatial: {
    fast: { type: 'spring', stiffness: 1400, damping: 22 },
    default: { type: 'spring', stiffness: 700, damping: 16 },
    slow: { type: 'spring', stiffness: 300, damping: 10 },
  },
  // Effects: opacity, background color, filter (no bounce, clean settling)
  effect: {
    fast: { type: 'spring', stiffness: 3800, damping: 120 },
    default: { type: 'spring', stiffness: 1600, damping: 80 },
    slow: { type: 'spring', stiffness: 800, damping: 55 },
  },
} as const;

export const m3Easing = {
  emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
  emphasizedDecel: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
  emphasizedAccel: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
  standard: 'cubic-bezier(0.2, 0, 0, 1)',
} as const;
