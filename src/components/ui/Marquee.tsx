'use client';

import React, { useRef, useEffect, useState } from 'react';

interface MarqueeProps {
    children: React.ReactNode;
    speed?: number; // pixels per second
    pauseOnHover?: boolean;
    direction?: 'up' | 'down';
    className?: string;
    gap?: number;
}

export function Marquee({
    children,
    speed = 30,
    pauseOnHover = true,
    direction = 'up',
    className = '',
    gap = 16,
}: MarqueeProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            const firstChild = containerRef.current.querySelector('.marquee-content');
            if (firstChild) {
                setContentHeight(firstChild.scrollHeight);
            }
        }
    }, [children]);

    const duration = contentHeight > 0 ? contentHeight / speed : 10;

    return (
        <div
            className={`marquee-wrapper ${className}`}
            onMouseEnter={() => pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => pauseOnHover && setIsPaused(false)}
            style={{
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                width: '100%',
            }}
        >
            {/* Fade overlays */}
            <div className="marquee-fade-top" />
            <div className="marquee-fade-bottom" />

            {/* Scrolling container */}
            <div
                ref={containerRef}
                className="marquee-scroll"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: `${gap}px`,
                    animationName: `marquee-scroll-${direction}`,
                    animationDuration: `${duration}s`,
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite',
                    animationPlayState: isPaused ? 'paused' : 'running',
                }}
            >
                {/* Original content */}
                <div className="marquee-content" style={{ display: 'flex', flexDirection: 'column', gap: `${gap}px` }}>
                    {children}
                </div>
                {/* Duplicated content for seamless loop */}
                <div className="marquee-content" style={{ display: 'flex', flexDirection: 'column', gap: `${gap}px` }}>
                    {children}
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee-scroll-up {
                    0% {
                        transform: translateY(0);
                    }
                    100% {
                        transform: translateY(-50%);
                    }
                }
                
                @keyframes marquee-scroll-down {
                    0% {
                        transform: translateY(-50%);
                    }
                    100% {
                        transform: translateY(0);
                    }
                }

                .marquee-fade-top,
                .marquee-fade-bottom {
                    position: absolute;
                    left: 0;
                    right: 0;
                    height: 60px;
                    pointer-events: none;
                    z-index: 10;
                }

                .marquee-fade-top {
                    top: 0;
                    background: linear-gradient(
                        180deg,
                        rgba(3, 3, 3, 1) 0%,
                        rgba(3, 3, 3, 0.8) 30%,
                        rgba(3, 3, 3, 0) 100%
                    );
                }

                .marquee-fade-bottom {
                    bottom: 0;
                    background: linear-gradient(
                        0deg,
                        rgba(3, 3, 3, 1) 0%,
                        rgba(3, 3, 3, 0.8) 30%,
                        rgba(3, 3, 3, 0) 100%
                    );
                }

                .marquee-scroll {
                    will-change: transform;
                }

                .marquee-wrapper:hover .marquee-scroll {
                    animation-play-state: ${pauseOnHover ? 'paused' : 'running'};
                }
            `}</style>
        </div>
    );
}

Marquee.displayName = 'Marquee';
