'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/dist/Observer';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { navigateNext, navigatePrev } from '@/store/navigationSlice';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(Observer);
}

export function useGSAPObserver() {
    const dispatch = useAppDispatch();
    const { isTransitioning } = useAppSelector((state) => state.navigation);
    const observerRef = useRef<Observer | null>(null);
    const lastScrollTime = useRef(0);
    const scrollCooldown = 1600; // ms

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleNavigation = (direction: 'next' | 'prev') => {
            const now = Date.now();
            if (isTransitioning || now - lastScrollTime.current < scrollCooldown) {
                return;
            }
            lastScrollTime.current = now;

            if (direction === 'next') {
                dispatch(navigateNext());
            } else {
                dispatch(navigatePrev());
            }
        };

        // Disable observer on mobile (allow native scrolling)
        if (window.innerWidth <= 768) return;

        observerRef.current = Observer.create({
            target: window,
            type: 'wheel,touch,pointer',
            wheelSpeed: -1,
            onUp: () => handleNavigation('next'),
            onDown: () => handleNavigation('prev'),
            tolerance: 10,
            preventDefault: true,
        });

        // Keyboard navigation
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                handleNavigation('next');
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                handleNavigation('prev');
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            if (observerRef.current) {
                observerRef.current.kill();
            }
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [dispatch, isTransitioning]);

    return null;
}
