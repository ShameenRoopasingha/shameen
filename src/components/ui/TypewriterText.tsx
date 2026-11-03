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
  speed = 0.018, // High speed so recruiters aren't blocked
  delay = 0,
  showCursor = true,
  onComplete,
}: TypewriterTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    let currentIndex = 0;
    const tl = gsap.timeline({
      delay,
      onComplete: () => {
        setIsComplete(true);
        onComplete?.();
      },
    });

    const step = Math.max(1, Math.floor(text.length / 50));
    for (let i = 0; i <= text.length; i += step) {
      const targetIndex = Math.min(i, text.length);
      tl.call(
        () => {
          currentIndex = targetIndex;
          setDisplayText(text.substring(0, currentIndex));
        },
        [],
        (targetIndex / text.length) * (text.length * speed)
      );
    }
    // Ensure 100% finished
    tl.call(() => setDisplayText(text), [], text.length * speed);

    return () => {
      tl.kill();
    };
  }, [text, speed, delay, onComplete]);

  return (
    <span ref={containerRef} className={className}>
      {displayText}
      {showCursor && <span className="tva-cursor">█</span>}
    </span>
  );
}

TypewriterText.displayName = 'TypewriterText';
