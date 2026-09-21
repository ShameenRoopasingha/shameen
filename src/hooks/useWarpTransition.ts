'use client';

import { useEffect, useCallback, useRef } from 'react';
import gsap from 'gsap';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setWarpSpeed, completeTransition } from '@/store/navigationSlice';
import { WARP_SPEED_IDLE, WARP_SPEED_PEAK, TRANSITION_DURATION } from '@/lib/constants';

export function useWarpTransition() {
    const dispatch = useAppDispatch();
    const { isTransitioning, targetSection, currentSection } = useAppSelector(
        (state) => state.navigation
    );
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const flashRef = useRef<HTMLDivElement | null>(null);

    const setFlashRef = useCallback((ref: HTMLDivElement | null) => {
        flashRef.current = ref;
    }, []);

    useEffect(() => {
        if (isTransitioning && targetSection !== currentSection) {
            // Kill any existing timeline
            if (timelineRef.current) {
                timelineRef.current.kill();
            }

            // Create warp transition timeline
            const tl = gsap.timeline({
                onComplete: () => {
                    dispatch(completeTransition());
                },
            });

            // Ramp up warp speed
            tl.to(
                {},
                {
                    duration: TRANSITION_DURATION / 2,
                    ease: 'power4.in',
                    onUpdate: function () {
                        const progress = this.progress();
                        const speed = WARP_SPEED_IDLE + (WARP_SPEED_PEAK - WARP_SPEED_IDLE) * progress;
                        dispatch(setWarpSpeed(speed));
                    },
                }
            );

            // Flash effect
            if (flashRef.current) {
                tl.to(
                    flashRef.current,
                    {
                        opacity: 0.6,
                        duration: 0.1,
                        ease: 'power2.out',
                    },
                    '-=0.1'
                );
                tl.to(flashRef.current, {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            }

            // Ramp down warp speed
            tl.to(
                {},
                {
                    duration: TRANSITION_DURATION / 2,
                    ease: 'power4.out',
                    onUpdate: function () {
                        const progress = this.progress();
                        const speed = WARP_SPEED_PEAK - (WARP_SPEED_PEAK - WARP_SPEED_IDLE) * progress;
                        dispatch(setWarpSpeed(speed));
                    },
                },
                '-=0.2'
            );

            timelineRef.current = tl;
        }

        return () => {
            if (timelineRef.current) {
                timelineRef.current.kill();
            }
        };
    }, [isTransitioning, targetSection, currentSection, dispatch]);

    return { setFlashRef };
}
