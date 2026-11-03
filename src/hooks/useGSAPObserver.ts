'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTargetSection, navigateNext, navigatePrev } from '@/store/navigationSlice';
import { SECTIONS, SECTION_METADATA } from '@/lib/constants';
import { tvaSound } from '@/lib/tvaSound';

export function useGSAPObserver() {
  const dispatch = useAppDispatch();
  const { isTransitioning, currentSection } = useAppSelector((state) => state.navigation);

  const currentSectionRef = useRef(currentSection);
  const isTransitioningRef = useRef(isTransitioning);
  const lastActionTime = useRef(0);
  const touchStart = useRef<{ y: number; x: number; atTop: boolean; atBottom: boolean } | null>(null);

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
        tvaSound.playConfirm();
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
          tvaSound.playConfirm();
          dispatch(navigateNext());
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (!isTransitioningRef.current && currentSectionRef.current > 0) {
          lastActionTime.current = now;
          e.preventDefault();
          tvaSound.playConfirm();
          dispatch(navigatePrev());
        }
      }
    };

    // Helper: Find active scroll container
    const getScrollContainer = (target: EventTarget | null): HTMLElement | null => {
      const el = target as HTMLElement | null;
      return (
        el?.closest('.overflow-y-auto') ||
        (document.querySelector('main .overflow-y-auto') as HTMLElement | null)
      );
    };

    // ─────────────────────────────────────────────────────────────
    // 2. BOUNDARY-AWARE DESKTOP WHEEL LISTENER
    // Allows natural internal scrolling; triggers warp ONLY at boundaries
    // ─────────────────────────────────────────────────────────────
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioningRef.current) return;

      const now = Date.now();
      if (now - lastActionTime.current < 450) return;

      // Ignore horizontal or tiny delta
      if (Math.abs(e.deltaY) < 30) return;

      const scrollContainer = getScrollContainer(e.target);
      if (!scrollContainer) return;

      const atExactTop = scrollContainer.scrollTop <= 2;
      const atExactBottom =
        scrollContainer.scrollTop + scrollContainer.clientHeight >=
        scrollContainer.scrollHeight - 3;

      // Scrolling Down -> Only warp if at exact bottom boundary
      if (e.deltaY > 0 && atExactBottom) {
        if (currentSectionRef.current < SECTIONS.length - 1) {
          lastActionTime.current = now;
          tvaSound.playConfirm();
          dispatch(navigateNext());
        }
      }
      // Scrolling Up -> Only warp if at exact top boundary
      else if (e.deltaY < 0 && atExactTop) {
        if (currentSectionRef.current > 0) {
          lastActionTime.current = now;
          tvaSound.playConfirm();
          dispatch(navigatePrev());
        }
      }
    };

    // ─────────────────────────────────────────────────────────────
    // 3. BOUNDARY-AWARE MOBILE TOUCH SWIPE
    // Free internal scrolling; warps to next/prev section when swiping past boundaries
    // ─────────────────────────────────────────────────────────────
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      const scrollContainer = getScrollContainer(e.target);
      const atTop = scrollContainer ? scrollContainer.scrollTop <= 2 : true;
      const atBottom = scrollContainer
        ? scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 3
        : true;

      touchStart.current = {
        y: t.clientY,
        x: t.clientX,
        atTop,
        atBottom,
      };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStart.current || e.changedTouches.length !== 1) return;
      if (isTransitioningRef.current) {
        touchStart.current = null;
        return;
      }

      const t = e.changedTouches[0];
      const deltaY = touchStart.current.y - t.clientY;
      const deltaX = touchStart.current.x - t.clientX;
      const now = Date.now();

      // Ensure deliberate vertical swipe (> 60px, dominant over horizontal movement)
      if (Math.abs(deltaY) > 60 && Math.abs(deltaY) > Math.abs(deltaX) * 1.4) {
        if (now - lastActionTime.current >= 400) {
          const scrollContainer = getScrollContainer(e.target);
          const currentAtTop = scrollContainer ? scrollContainer.scrollTop <= 2 : true;
          const currentAtBottom = scrollContainer
            ? scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 3
            : true;

          // Swiping UP (finger moves upward, content pulled to bottom) -> Go next
          if (deltaY > 0 && touchStart.current.atBottom && currentAtBottom) {
            if (currentSectionRef.current < SECTIONS.length - 1) {
              lastActionTime.current = now;
              tvaSound.playConfirm();
              dispatch(navigateNext());
            }
          }
          // Swiping DOWN (finger moves downward, content pulled to top) -> Go prev
          else if (deltaY < 0 && touchStart.current.atTop && currentAtTop) {
            if (currentSectionRef.current > 0) {
              lastActionTime.current = now;
              tvaSound.playConfirm();
              dispatch(navigatePrev());
            }
          }
        }
      }

      touchStart.current = null;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [dispatch]);

  return null;
}
