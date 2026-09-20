import { useCallback, useEffect, useRef } from 'react';

interface ITextScrambleOptions {
  characters?: string;
  speed?: number; // interval ms per frame
  revealDuration?: number; // total reveal time ms
  revealDelay?: number; // delay per character reveal ms
}

export default function useTextScramble(selector: string) {
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimers = useCallback(() => {
    intervalsRef.current.forEach(clearInterval);
    timeoutsRef.current.forEach(clearTimeout);
    intervalsRef.current = [];
    timeoutsRef.current = [];
  }, []);

  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  const scramble = useCallback(
    (options: ITextScrambleOptions = {}) => {
      clearAllTimers();

      const {
        characters = 'xxxxxxxxxxxx',
        speed = 100,
        revealDuration = 1000,
        revealDelay = 100,
      } = options;

      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) return;

      elements.forEach((el) => {
        const originalText = el.textContent ?? '';
        if (!originalText) return;

        const chars = characters.split('');
        let revealedCount = 0;

        // Scramble phase
        const scrambleInterval = setInterval(() => {
          const scrambled = originalText
            .split('')
            .map((char, i) => {
              if (i < revealedCount) return originalText[i];
              if (char === ' ') return ' ';
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
          el.textContent = scrambled;
        }, speed);
        intervalsRef.current.push(scrambleInterval);

        // Progressive reveal phase
        const revealInterval = setInterval(() => {
          revealedCount++;
          if (revealedCount >= originalText.length) {
            clearInterval(revealInterval);
            clearInterval(scrambleInterval);
            el.textContent = originalText;
          }
        }, revealDelay);
        intervalsRef.current.push(revealInterval);

        // Safety fallback timer
        const safetyTimer = setTimeout(
          () => {
            clearInterval(scrambleInterval);
            clearInterval(revealInterval);
            el.textContent = originalText;
          },
          revealDuration + revealDelay * originalText.length
        );
        timeoutsRef.current.push(safetyTimer);
      });
    },
    [selector, clearAllTimers]
  );

  return { scramble };
}
