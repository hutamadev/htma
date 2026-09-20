'use client';

import { motion, useSpring } from 'framer-motion';

import useCursorPosition from '@hooks/useCursorPosition';

export default function CustomCursor() {
  const { cursorX, cursorY } = useCursorPosition();

  const springConfig = { damping: 30, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  return (
    <motion.div
      className='cursor'
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
      aria-hidden='true'
    />
  );
}
