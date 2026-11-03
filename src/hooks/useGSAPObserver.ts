'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTargetSection, navigateNext, navigatePrev } from '@/store/navigationSlice';
import { SECTIONS, SECTION_METADATA } from '@/lib/constants';

export function useGSAPObserver() {
  const dispatch = useAppDispatch();
  const { isTransitioning, currentSection } = useAppSelector((state) => state.navigation);
  const lastKeyTime = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Global Keyboard Navigation (1-6, ArrowUp/ArrowDown, Enter, Escape)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't hijack if user is typing in form inputs or textareas
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') {
        return;
      }

      const now = Date.now();
      if (now - lastKeyTime.current < 200) return;

      // Number keys 1-6 for instant module jumping
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= SECTIONS.length) {
        lastKeyTime.current = now;
        e.preventDefault();
        const targetIndex = num - 1;
        dispatch(setTargetSection(targetIndex));
        const hash = SECTION_METADATA[SECTIONS[targetIndex]]?.hash;
        if (hash) {
          window.history.replaceState(null, '', hash);
        }
        return;
      }

      // Arrow navigation
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (!isTransitioning && currentSection < SECTIONS.length - 1) {
          lastKeyTime.current = now;
          e.preventDefault();
          dispatch(navigateNext());
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (!isTransitioning && currentSection > 0) {
          lastKeyTime.current = now;
          e.preventDefault();
          dispatch(navigatePrev());
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch, isTransitioning, currentSection]);

  return null;
}
