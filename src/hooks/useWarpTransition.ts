'use client';

import { useEffect, useCallback, useRef } from 'react';
import gsap from 'gsap';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setWarpSpeed, completeTransition } from '@/store/navigationSlice';

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
      const tl = gsap.timeline({
        onComplete: () => {
          dispatch(completeTransition());
          dispatch(setWarpSpeed(1.0));
        },
      });

      dispatch(setWarpSpeed(3.0));

      if (el) {
        // Crisp 180ms stepped CRT scan-wipe / timedoor wireframe expansion
        tl.fromTo(
          el,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 0.85,
            scale: 1,
            duration: 0.09,
            ease: 'steps(2)',
          }
        ).to(el, {
          opacity: 0,
          scale: 1.05,
          duration: 0.09,
          ease: 'steps(2)',
        });
      } else {
        tl.to({}, { duration: 0.18 });
      }

      return () => {
        tl.kill();
      };
    }
  }, [isTransitioning, targetSection, currentSection, dispatch]);

  return { setFlashRef };
}
