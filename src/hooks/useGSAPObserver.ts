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

  // Keep refs up-to-date to avoid re-binding window listeners on every section change
  useEffect(() => {
    currentSectionRef.current = currentSection;
  }, [currentSection]);

  useEffect(() => {
    isTransitioningRef.current = isTransitioning;
  }, [isTransitioning]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // ─────────────────────────────────────────────────────────────
    // 1. GLOBAL KEYBOARD NAVIGATION
    // ─────────────────────────────────────────────────────────────
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') {
        return;
      }

      // Toggle Help overlay on '?' or 'h'
      if (e.key === '?' || e.key === 'h' || e.key === 'H') {
        window.dispatchEvent(new CustomEvent('tva-toggle-help'));
        return;
      }

      // Toggle Audio on 'm'
      if (e.key === 'm' || e.key === 'M') {
        window.dispatchEvent(new CustomEvent('tva-toggle-audio'));
        return;
      }

      const now = Date.now();
      if (now - lastActionTime.current < 250) return;

      // Number keys 1-6 for instant module jumping
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

      // Arrow navigation
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'ArrowRight') {
        if (!isTransitioningRef.current && currentSectionRef.current < SECTIONS.length - 1) {
          lastActionTime.current = now;
          e.preventDefault();
          soundFx.playWarpChirp();
          dispatch(navigateNext());
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'ArrowLeft') {
        if (!isTransitioningRef.current && currentSectionRef.current > 0) {
          lastActionTime.current = now;
          e.preventDefault();
          soundFx.playWarpChirp();
          dispatch(navigatePrev());
        }
      }
    };

    // ─────────────────────────────────────────────────────────────
    // 2. MOBILE SWIPE NAVIGATION (TOUCH GESTURES)
    // ─────────────────────────────────────────────────────────────
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let startedAtBottom = false;
    let startedAtTop = false;
    let isInsideHScroll = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;

      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      // Ignore if user is touching an interactive form input
      if (tag === 'input' || tag === 'textarea' || tag === 'select') {
        return;
      }

      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchStartTime = Date.now();

      // Check if vertical scroll container is already at boundary
      const scrollContainer =
        target?.closest('.overflow-y-auto') ||
        (document.querySelector('main .overflow-y-auto') as HTMLElement | null);

      if (scrollContainer) {
        startedAtTop = scrollContainer.scrollTop <= 8;
        startedAtBottom =
          scrollContainer.scrollTop + scrollContainer.clientHeight >=
          scrollContainer.scrollHeight - 12;
      } else {
        startedAtTop = true;
        startedAtBottom = true;
      }

      // Check if user is touching inside an actively scrollable horizontal element (e.g. tabs)
      const hScroll = target?.closest('.overflow-x-auto') as HTMLElement | null;
      isInsideHScroll = !!(hScroll && hScroll.scrollWidth > hScroll.clientWidth);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length !== 1) return;
      if (isTransitioningRef.current) return;

      const now = Date.now();
      if (now - lastActionTime.current < 350) return;

      const touch = e.changedTouches[0];
      const diffX = touch.clientX - touchStartX;
      const diffY = touch.clientY - touchStartY;
      const elapsed = now - touchStartTime;

      // Ignore if gesture took too long (user was holding or slow-dragging)
      if (elapsed > 700) return;

      const absX = Math.abs(diffX);
      const absY = Math.abs(diffY);

      // A) PRIMARY: Horizontal Swipe (Left = Next, Right = Prev)
      if (absX >= 45 && absX > absY * 1.3 && !isInsideHScroll) {
        if (diffX < 0) {
          // Swipe Left -> Next Section
          if (currentSectionRef.current < SECTIONS.length - 1) {
            lastActionTime.current = now;
            soundFx.playWarpChirp();
            dispatch(navigateNext());
          }
        } else {
          // Swipe Right -> Prev Section
          if (currentSectionRef.current > 0) {
            lastActionTime.current = now;
            soundFx.playWarpChirp();
            dispatch(navigatePrev());
          }
        }
        return;
      }

      // B) SECONDARY: Vertical Boundary Overscroll
      if (absY >= 75 && absY > absX * 1.5) {
        if (diffY < 0 && startedAtBottom) {
          if (currentSectionRef.current < SECTIONS.length - 1) {
            lastActionTime.current = now;
            soundFx.playWarpChirp();
            dispatch(navigateNext());
          }
        } else if (diffY > 0 && startedAtTop) {
          if (currentSectionRef.current > 0) {
            lastActionTime.current = now;
            soundFx.playWarpChirp();
            dispatch(navigatePrev());
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [dispatch]);

  return null;
}
