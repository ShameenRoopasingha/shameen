'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useAppSelector } from '@/store/hooks';

interface VoltageBarProps {
  name: string;
  level: number;
  index?: number;
  category?: string;
  tag?: string;
}

export function VoltageBar({
  name,
  level,
  index = 0,
  tag = 'CALIBRATED',
}: VoltageBarProps) {
  const fillRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isSpiking, setIsSpiking] = useState(false);
  const isTransitioning = useAppSelector((state) => state.navigation.isTransitioning);

  // Baseline fill animation
  useEffect(() => {
    if (!fillRef.current) return;

    gsap.fromTo(
      fillRef.current,
      { width: '0%' },
      {
        width: `${level}%`,
        duration: 0.8,
        delay: index * 0.04,
        ease: 'steps(8)',
      }
    );
  }, [level, index]);

  // Dynamic voltage spike during section transitions (warp) or active terminal input
  useEffect(() => {
    if (isTransitioning) {
      setIsSpiking(true);
      if (fillRef.current) {
        gsap.to(fillRef.current, {
          width: `${Math.min(100, level + 20)}%`,
          duration: 0.1,
          ease: 'steps(2)',
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            gsap.to(fillRef.current, { width: `${level}%`, duration: 0.2 });
            setIsSpiking(false);
          },
        });
      }
    }
  }, [isTransitioning, level]);

  // Listen to input-active surge event
  useEffect(() => {
    const handleInputSurge = () => {
      setIsSpiking(true);
      if (fillRef.current) {
        gsap.to(fillRef.current, {
          width: `${Math.min(100, level + 12)}%`,
          duration: 0.08,
          ease: 'steps(2)',
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            gsap.to(fillRef.current, { width: `${level}%`, duration: 0.15 });
            setIsSpiking(false);
          },
        });
      }
    };

    window.addEventListener('tva-input-active', handleInputSurge);
    return () => window.removeEventListener('tva-input-active', handleInputSurge);
  }, [level]);

  const displayLevel = isSpiking ? Math.min(100, level + 15) : level;

  return (
    <div
      className="mb-3 font-mono group cursor-default select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center text-xs tracking-wider mb-1">
        <div className="flex items-center gap-2">
          <span
            className={`font-bold transition-colors ${
              isSpiking ? 'text-[#FF3B1F]' : 'text-[#FFB84D] group-hover:text-[#FF8C24]'
            }`}
          >
            {name}
          </span>
          <span
            className={`text-[9px] px-1 py-0.2 border transition-all ${
              isSpiking
                ? 'bg-[#FF3B1F]/20 border-[#FF3B1F] text-[#FF3B1F]'
                : 'bg-[#FF8C24]/10 border-[#7A4210] text-[#7A4210] group-hover:text-[#FF8C24] group-hover:border-[#FF8C24]'
            }`}
          >
            {isSpiking ? 'SURGE' : tag}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#7A4210] font-mono text-[10px]">VLT:</span>
          <span
            className={`font-bold min-w-[38px] text-right tva-telemetry tabular-nums transition-colors ${
              isSpiking ? 'text-[#FF3B1F]' : 'text-[#FF8C24]'
            }`}
          >
            {(displayLevel * 2.4).toFixed(1)}V
          </span>
          <span className="text-[#FFB84D] font-bold min-w-[32px] text-right tva-telemetry tabular-nums">
            {displayLevel}%
          </span>
        </div>
      </div>

      {/* Meter track with segmented ticks */}
      <div
        className={`relative h-3 w-full bg-[#120B05] border transition-colors overflow-hidden ${
          isSpiking ? 'border-[#FF3B1F]' : 'border-[#7A4210] group-hover:border-[#FF8C24]'
        }`}
      >
        {/* Fill bar */}
        <div
          ref={fillRef}
          className={`h-full transition-colors duration-75 relative ${
            isSpiking ? 'bg-[#FF3B1F]' : 'bg-[#FF8C24]'
          }`}
          style={{
            boxShadow: isSpiking
              ? '0 0 12px #FF3B1F, 0 0 24px rgba(255,59,31,0.6)'
              : isHovered
              ? '0 0 10px #FF8C24, 0 0 20px rgba(255,140,36,0.5)'
              : '0 0 4px rgba(255,140,36,0.3)',
          }}
        >
          {/* Subtle horizontal phosphor scan */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFB84D]/40 to-transparent" />
        </div>

        {/* Segmented Tick Overlay (10-segment voltmeter grid) */}
        <div className="absolute inset-0 grid grid-cols-10 pointer-events-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="border-r border-[#120B05]/60 h-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

VoltageBar.displayName = 'VoltageBar';
