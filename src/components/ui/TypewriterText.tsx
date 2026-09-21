'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface TypewriterTextProps {
    text: string;
    className?: string;
    speed?: number;
    delay?: number;
    showCursor?: boolean;
    onComplete?: () => void;
}

export function TypewriterText({
    text,
    className = '',
    speed = 0.04,
    delay = 0,
    showCursor = true,
    onComplete,
}: TypewriterTextProps) {
    const containerRef = useRef<HTMLSpanElement>(null);
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (!containerRef.current) return;

        const chars = text.split('');
        let currentIndex = 0;

        const tl = gsap.timeline({
            delay,
            onComplete: () => {
                setIsComplete(true);
                onComplete?.();
            },
        });

        chars.forEach((_, index) => {
            tl.call(
                () => {
                    currentIndex = index + 1;
                    setDisplayText(text.substring(0, currentIndex));
                },
                [],
                index * speed
            );
        });

        return () => {
            tl.kill();
        };
    }, [text, speed, delay, onComplete]);

    return (
        <span ref={containerRef} className={className}>
            {displayText}
            {showCursor && (
                <span
                    className={`typewriter-cursor ${isComplete ? '' : ''}`}
                    style={{ opacity: 1 }}
                />
            )}
        </span>
    );
}


TypewriterText.displayName = 'TypewriterText';

