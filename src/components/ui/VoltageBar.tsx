'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface VoltageBarProps {
    name: string;
    level: number;
    index?: number;
}

export function VoltageBar({ name, level, index = 0 }: VoltageBarProps) {
    const barRef = useRef<HTMLDivElement>(null);
    const fillRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const jitterRef = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        if (!fillRef.current) return;

        // Entry animation
        gsap.fromTo(
            fillRef.current,
            { width: '0%' },
            {
                width: `${level}%`,
                duration: 1,
                delay: index * 0.1,
                ease: 'power2.out',
            }
        );

        // Jitter animation
        jitterRef.current = gsap.to(fillRef.current, {
            x: '+=2',
            yoyo: true,
            repeat: -1,
            duration: 0.1,
            ease: 'steps(2)',
        });

        return () => {
            if (jitterRef.current) {
                jitterRef.current.kill();
            }
        };
    }, [level, index]);

    useEffect(() => {
        if (!jitterRef.current) return;

        if (isHovered) {
            jitterRef.current.pause();
            gsap.to(fillRef.current, { x: 0, duration: 0.1 });
        } else {
            jitterRef.current.resume();
        }
    }, [isHovered]);

    return (
        <div
            ref={barRef}
            className="mb-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm uppercase tracking-widest text-[color:var(--tva-amber)]">
                    {name}
                </span>
                <span
                    className={`text-xs transition-opacity duration-200 text-[color:var(--tva-amber)] ${isHovered ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    {level}%
                </span>
            </div>
            <div
                className="h-2 w-full"
                style={{
                    background: 'rgba(255, 153, 0, 0.1)',
                    border: '1px solid rgba(255, 153, 0, 0.3)',
                }}
            >
                <div
                    ref={fillRef}
                    className="h-full"
                    style={{
                        background: 'var(--tva-amber)',
                        boxShadow: isHovered
                            ? '0 0 10px var(--tva-amber), 0 0 20px rgba(255, 153, 0, 0.5)'
                            : '0 0 5px rgba(255, 153, 0, 0.3)',
                        transition: 'box-shadow 0.2s ease',
                    }}
                />
            </div>
        </div>
    );
}


VoltageBar.displayName = 'VoltageBar';

