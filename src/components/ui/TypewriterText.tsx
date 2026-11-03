'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { tvaSound } from '@/lib/tvaSound';

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
  speed = 0.015,
  delay = 0,
  showCursor = true,
  onComplete,
}: TypewriterTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

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
    timelineRef.current = tl;

    const step = Math.max(1, Math.floor(text.length / 45));
    for (let i = 0; i <= text.length; i += step) {
      const targetIndex = Math.min(i, text.length);
      tl.call(
        () => {
          currentIndex = targetIndex;
          setDisplayText(text.substring(0, currentIndex));
          // Play CRT keystroke sound on every 3rd tick
          if (currentIndex % 3 === 0) {
            tvaSound.playKeystroke();
          }
        },
        [],
        (targetIndex / text.length) * (text.length * speed)
      );
    }
    // Ensure final text is complete
    tl.call(() => setDisplayText(text), [], text.length * speed);

    return () => {
      tl.kill();
    };
  }, [text, speed, delay, onComplete]);

  // Tap or click anywhere on the text to finish typing immediately
  const handleFastFinish = () => {
    if (!isComplete) {
      timelineRef.current?.kill();
      setDisplayText(text);
      setIsComplete(true);
      tvaSound.playConfirm();
      onComplete?.();
    }
  };

  return (
    <span
      ref={containerRef}
      onClick={handleFastFinish}
      className={`relative inline-block cursor-pointer ${className}`}
      title="Click/tap to complete text"
    >
      {/* Invisible static skeleton locks the exact bounding box height and line wrapping */}
      <span className="invisible select-none pointer-events-none" aria-hidden="true">
        {text}
        {showCursor && <span className="inline-block opacity-0">█</span>}
      </span>

      {/* Absolute overlay renders live animated typing text without causing layout shifts */}
      <span className="absolute inset-0">
        {displayText}
        {showCursor && !isComplete && <span className="tva-cursor">█</span>}
      </span>
    </span>
  );
}

TypewriterText.displayName = 'TypewriterText';
