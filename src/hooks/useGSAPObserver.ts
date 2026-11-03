'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTargetSection, navigateNext, navigatePrev } from '@/store/navigationSlice';
import { SECTIONS, SECTION_METADATA } from '@/lib/constants';
import { soundFx } from '@/lib/sound';

export function useGSAPObserver() {
  const dispatch = useAppDispatch();
  const { isTransitioning, currentSection } = useAppSelector((state) => state.navigation);

  const currentSectionRef = useRef(currentSection);
  const isTransitioningRef = useRef(isTransitioning);
  const lastActionTime = useRef(0);

  useEffect(() => {
    currentSectionRef.current = currentSection;
  }, [currentSection]);

  useEffect(() => {
    isTransitioningRef.current = isTransitioning;
  }, [isTransitioning]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // ─────────────────────────────────────────────────────────────
    // 1. GLOBAL KEYBOARD NAVIGATION (1-6, Arrows, Shortcuts)
    // ─────────────────────────────────────────────────────────────
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') {
        return;
      }

      // Help Modal Toggle ('?' or 'h')
      if (e.key === '?' || e.key === 'h' || e.key === 'H') {
        window.dispatchEvent(new CustomEvent('tva-toggle-help'));
        return;
      }

      // Audio Toggle ('m')
      if (e.key === 'm' || e.key === 'M') {
        window.dispatchEvent(new CustomEvent('tva-toggle-audio'));
        return;
      }

      const now = Date.now();
      if (now - lastActionTime.current < 250) return;

      // Number keys 1-6 for instant program jumping
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= SECTIONS.length) {
        lastActionTime.current = now;
        e.preventDefault();
        const targetIndex = num - 1;
        soundFx.playWarpChirp();
        dispatch(setTargetSection(targetIndex));
        const hash = SECTION_METADATA[SECTIONS[targetIndex]]?.hash;
        if (hash) {
          window.history.replaceState(null, '', hash);
        }
        return;
      }

      // Arrow keys (Desktop and hardware keyboards)
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (!isTransitioningRef.current && currentSectionRef.current < SECTIONS.length - 1) {
          lastActionTime.current = now;
          e.preventDefault();
          soundFx.playWarpChirp();
          dispatch(navigateNext());
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (!isTransitioningRef.current && currentSectionRef.current > 0) {
          lastActionTime.current = now;
          e.preventDefault();
          soundFx.playWarpChirp();
          dispatch(navigatePrev());
        }
      }
    };

    // ─────────────────────────────────────────────────────────────
    // 2. DESKTOP-ONLY WHEEL BOUNDARY LISTENER (≥ 1024px)
    // Mobile viewports (< 1024px) have 100% native touch scrolling!
    // ─────────────────────────────────────────────────────────────
    const handleWheel = (e: WheelEvent) => {
      // Disable completely on mobile & tablets (< 1024px)
      if (window.innerWidth < 1024) return;
      if (isTransitioningRef.current) return;

      const now = Date.now();
      if (now - lastActionTime.current < 450) return;

      // Ignore horizontal or tiny delta
      if (Math.abs(e.deltaY) < 35) return;

      // Find active scroll container
      const target = e.target as HTMLElement | null;
      const scrollContainer =
        target?.closest('.overflow-y-auto') ||
        (document.querySelector('main .overflow-y-auto') as HTMLElement | null);

      if (!scrollContainer) return;

      const atExactTop = scrollContainer.scrollTop === 0;
      const atExactBottom =
        scrollContainer.scrollTop + scrollContainer.clientHeight >=
        scrollContainer.scrollHeight - 2;

      // Scrolling Down -> Only warp if at exact bottom boundary
      if (e.deltaY > 0 && atExactBottom) {
        if (currentSectionRef.current < SECTIONS.length - 1) {
          lastActionTime.current = now;
          soundFx.playWarpChirp();
          dispatch(navigateNext());
        }
      }
      // Scrolling Up -> Only warp if at exact top boundary
      else if (e.deltaY < 0 && atExactTop) {
        if (currentSectionRef.current > 0) {
          lastActionTime.current = now;
          soundFx.playWarpChirp();
          dispatch(navigatePrev());
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [dispatch]);

  return null;
}
