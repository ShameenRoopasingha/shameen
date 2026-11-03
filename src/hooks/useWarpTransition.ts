'use client';

import { useEffect, useCallback, useRef } from 'react';
import gsap from 'gsap';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setWarpSpeed, completeTransition } from '@/store/navigationSlice';
import { tvaSound } from '@/lib/tvaSound';

export function useWarpTransition() {
  const dispatch = useAppDispatch();
  const { isTransitioning, targetSection, currentSection } = useAppSelector(
    (state) => state.navigation
  );
  const flashRef = useRef<HTMLDivElement | null>(null);

  const setFlashRef = useCallback((ref: HTMLDivElement | null) => {
    flashRef.current = ref;
  }, []);

  useEffect(() => {
    if (isTransitioning && targetSection !== currentSection) {
      const el = flashRef.current;

      // Play analog synthesizer low-pass warp sweep
      tvaSound.playWarp();

      const tl = gsap.timeline({
        onComplete: () => {
          // Scroll active container back to top
          if (typeof document !== 'undefined') {
            const scrollContainers = document.querySelectorAll('.overflow-y-auto');
            scrollContainers.forEach((c) => {
              c.scrollTop = 0;
            });
          }
          dispatch(completeTransition());
          dispatch(setWarpSpeed(1.0));
        },
      });

      dispatch(setWarpSpeed(2.5));

      if (el) {
        // Fast 150ms stepped CRT scan-wipe
        tl.fromTo(
          el,
          { opacity: 0, scale: 0.98 },
          {
            opacity: 0.9,
            scale: 1,
            duration: 0.075,
            ease: 'steps(3)',
          }
        ).to(el, {
          opacity: 0,
          scale: 1.02,
          duration: 0.075,
          ease: 'steps(3)',
        });
      } else {
        tl.to({}, { duration: 0.15 });
      }

      return () => {
        tl.kill();
      };
    }
  }, [isTransitioning, targetSection, currentSection, dispatch]);

  return { setFlashRef };
}
