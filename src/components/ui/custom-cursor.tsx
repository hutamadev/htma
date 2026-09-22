'use client';

import { motion, useSpring } from 'framer-motion';

import useCursorPosition from '@hooks/useCursorPosition';

export default function CustomCursor() {
  const { cursorX, cursorY, cursorScale, cursorOpacity } = useCursorPosition();

  const springConfig = { damping: 30, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const cursorScaleSpring = useSpring(cursorScale, {
    damping: 24,
    stiffness: 280,
  });
  const cursorOpacitySpring = useSpring(cursorOpacity, {
    damping: 24,
    stiffness: 280,
  });

  return (
    <motion.div
      className='cursor'
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        scale: cursorScaleSpring,
        opacity: cursorOpacitySpring,
      }}
      aria-hidden='true'
    />
  );
}
