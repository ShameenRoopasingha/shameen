'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { EXPERIENCE, type Experience } from '@/lib/data';

export function ExperienceSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const lastWheelTime = useRef(0);

    const jumpToExperience = useCallback((newIndex: number) => {
        if (isJumping || newIndex === activeIndex || newIndex < 0 || newIndex >= EXPERIENCE.length) {
            return;
        }

        setIsJumping(true);

        // Cinematic jump animation
        const timeline = gsap.timeline({
            onComplete: () => {
                setActiveIndex(newIndex);
                setIsJumping(false);
            }
        });

        // Dramatic flash with chromatic aberration feel
        timeline.to('.jump-flash', {
            opacity: 1,
            duration: 0.1,
            ease: 'power4.in',
        });

        // Content fade out with distortion
        timeline.to('.content-panel', {
            opacity: 0,
            scale: 0.95,
            filter: 'blur(4px)',
            duration: 0.15,
            ease: 'power2.in',
        }, '<');

        // Timeline warp
        timeline.to('.timeline-container', {
            scaleX: 1.1,
            opacity: 0.5,
            duration: 0.1,
            ease: 'power2.in',
        }, '<');

        // Flash peak
        timeline.set('.jump-flash', { opacity: 0 }, '+=0.05');

        // Content fade in
        timeline.fromTo('.content-panel',
            { opacity: 0, scale: 1.05, filter: 'blur(4px)' },
            { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.3, ease: 'power3.out' }
        );

        timeline.to('.timeline-container', {
            scaleX: 1,
            opacity: 1,
            duration: 0.2,
            ease: 'power2.out',
        }, '<');

    }, [activeIndex, isJumping]);

    // Handle scroll within section
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            const now = Date.now();
            if (now - lastWheelTime.current < 900) return;

            if (Math.abs(e.deltaY) > 30) {
                lastWheelTime.current = now;

                if (e.deltaY > 0 && activeIndex < EXPERIENCE.length - 1) {
                    jumpToExperience(activeIndex + 1);
                    e.preventDefault();
                    e.stopPropagation();
                } else if (e.deltaY < 0 && activeIndex > 0) {
                    jumpToExperience(activeIndex - 1);
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
    }, [activeIndex, jumpToExperience]);

    const currentExperience = EXPERIENCE[activeIndex];

    return (
        <div
            ref={containerRef}
            className="section-container relative"
            style={{
                height: '100dvh',
                width: '100%',
                overflow: 'hidden',
            }}
        >
            {/* Cinematic Background Layers */}
            <div className="absolute inset-0">
                {/* Radial gradient backdrop */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255, 153, 0, 0.06) 0%, transparent 60%)',
                    }}
                />

                {/* Horizontal scan lines */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 153, 0, 0.03) 2px, rgba(255, 153, 0, 0.03) 4px)',
                    }}
                />
            </div>

            {/* Jump Flash Overlay */}
            <div
                className="jump-flash absolute inset-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(90deg, transparent 20%, var(--tva-amber) 50%, transparent 80%)',
                    opacity: 0,
                    zIndex: 100,
                    mixBlendMode: 'screen',
                }}
            />

            {/* Top HUD Bar */}
            <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-4 lg:px-16" style={{ borderBottom: '1px solid rgba(255, 153, 0, 0.1)' }}>
                <div className="flex items-center gap-2 lg:gap-4">
                    <div className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ background: 'var(--tva-amber)', boxShadow: '0 0 10px var(--tva-amber)' }} />
                    <span className="text-[9px] lg:text-xs uppercase tracking-[0.2em] lg:tracking-[0.4em] hidden sm:block" style={{ color: 'rgba(255, 153, 0, 0.5)' }}>
                        Sacred Timeline
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.2em] sm:hidden" style={{ color: 'rgba(255, 153, 0, 0.5)' }}>
                        Timeline
                    </span>
                </div>

                <div className="flex items-center gap-4 lg:gap-8">
                    <span className="text-[9px] lg:text-xs uppercase tracking-widest hidden sm:block" style={{ color: 'rgba(255, 153, 0, 0.4)' }}>
                        Temporal Coordinate
                    </span>
                    <span className="text-xl lg:text-2xl font-light tracking-widest flex-shrink-0" style={{ color: 'var(--tva-amber)' }}>
                        {(activeIndex + 1).toString().padStart(2, '0')}
                        <span style={{ color: 'rgba(255, 153, 0, 0.3)' }}> / </span>
                        {EXPERIENCE.length.toString().padStart(2, '0')}
                    </span>
                </div>
            </div>

            {/* Desktop Layout - Cinematic */}
            <div className="h-full flex-col pt-20 md:pt-24 pb-4 md:pb-8 hidden md:flex desktop-experience">
                <div className="content-panel flex-1 flex items-center justify-center px-4 md:px-8 lg:px-24 mt-4">
                    <div className="w-full max-w-5xl">
                        <ExperiencePanel experience={currentExperience} index={activeIndex} />
                    </div>
                </div>
                <div className="timeline-container h-24 md:h-32 lg:h-40 relative flex-shrink-0">
                    <TimelineStrip
                        experiences={EXPERIENCE}
                        activeIndex={activeIndex}
                        onSelect={jumpToExperience}
                    />
                </div>
            </div>

            {/* Mobile Layout - Vertical Feed */}
            <div className="h-full flex flex-col pt-20 pb-4 md:hidden overflow-y-auto px-4 custom-scrollbar">
                <div className="flex flex-col gap-12 pb-20 mt-4 relative">
                    {/* Vertical line connecting nodes */}
                    <div 
                        className="absolute left-[9px] top-4 bottom-0 w-px"
                        style={{ background: 'linear-gradient(180deg, var(--tva-amber), transparent)' }}
                    />
                    
                    {EXPERIENCE.map((exp, idx) => (
                        <div key={exp.id} className="flex gap-6 relative z-10">
                            {/* Node */}
                            <div className="flex flex-col items-center flex-shrink-0 pt-2">
                                <div className="w-5 h-5 rounded-full border-2 bg-black border-amber-500 shadow-[0_0_10px_rgba(255,153,0,0.5)]" />
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1">
                                <div className="text-[10px] font-mono tracking-widest mb-2" style={{ color: 'var(--tva-amber)' }}>
                                    {exp.year}
                                </div>
                                <h2 className="text-2xl uppercase tracking-wide mb-1 font-light leading-tight" style={{ color: 'var(--tva-amber)' }}>
                                    {exp.role}
                                </h2>
                                <div className="text-xs uppercase tracking-[0.1em] mb-3" style={{ color: 'rgba(255, 153, 0, 0.6)' }}>
                                    {exp.company}
                                </div>
                                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255, 153, 0, 0.5)' }}>
                                    {exp.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Corner Decorations */}
            <CornerBrackets />
        </div>
    );
}

interface ExperiencePanelProps {
    experience: Experience;
    index: number;
}

function ExperiencePanel({ experience, index }: ExperiencePanelProps) {
    return (
        <div className="flex gap-16 lg:gap-24 items-center">
            {/* Left - Visual Element */}
            <div className="hidden lg:flex flex-col items-center">
                {/* Large incident number */}
                <div
                    className="text-8xl font-thin tracking-tight mb-4"
                    style={{
                        color: 'transparent',
                        WebkitTextStroke: '1px var(--tva-amber)',
                        opacity: 0.3,
                    }}
                >
                    {(index + 1).toString().padStart(2, '0')}
                </div>

                {/* Vertical line */}
                <div
                    className="w-px h-32"
                    style={{
                        background: 'linear-gradient(180deg, var(--tva-amber), transparent)',
                    }}
                />
            </div>

            {/* Right - Content */}
            <div className="flex-1">
                {/* Status Badge */}
                <div className="flex items-center gap-2 lg:gap-4 mb-4 lg:mb-6 flex-wrap">
                    <div
                        className="px-3 py-1 lg:px-4 lg:py-1.5 text-[10px] lg:text-xs uppercase tracking-[0.2em] lg:tracking-[0.3em]"
                        style={{
                            border: '1px solid rgba(255, 153, 0, 0.4)',
                            color: 'var(--tva-amber)',
                        }}
                    >
                        Incident #{(index + 1).toString().padStart(3, '0')}
                    </div>
                    <div
                        className="flex items-center gap-1.5 lg:gap-2 text-[10px] lg:text-xs uppercase tracking-widest"
                        style={{ color: '#00FF00' }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#00FF00' }} />
                        Verified
                    </div>
                </div>

                {/* Role Title */}
                <h2
                    className="text-3xl md:text-4xl lg:text-6xl uppercase tracking-wide mb-2 lg:mb-4 font-light leading-tight"
                    style={{
                        color: 'var(--tva-amber)',
                        textShadow: '0 0 40px rgba(255, 153, 0, 0.3)',
                    }}
                >
                    {experience.role}
                </h2>

                {/* Company & Date */}
                <div
                    className="text-sm md:text-lg lg:text-xl uppercase tracking-[0.1em] md:tracking-[0.2em] mb-4 md:mb-6 lg:mb-8 flex items-center gap-2 md:gap-4 flex-wrap"
                    style={{ color: 'rgba(255, 153, 0, 0.6)' }}
                >
                    <span>{experience.company}</span>
                    <span style={{ color: 'rgba(255, 153, 0, 0.3)' }}>•</span>
                    <span style={{ color: 'rgba(255, 153, 0, 0.4)' }}>{experience.year}</span>
                </div>

                {/* Description */}
                <p
                    className="text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl"
                    style={{
                        color: 'rgba(255, 153, 0, 0.5)',
                        lineHeight: '1.8',
                    }}
                >
                    {experience.description}
                </p>
            </div>
        </div>
    );
}

interface TimelineStripProps {
    experiences: Experience[];
    activeIndex: number;
    onSelect: (index: number) => void;
}

function TimelineStrip({ experiences, activeIndex, onSelect }: TimelineStripProps) {
    return (
        <div className="absolute inset-0 flex flex-col justify-center px-8 lg:px-24">
            {/* Main Timeline Line */}
            <div className="relative h-20 flex items-center">
                {/* Background line */}
                <div
                    className="absolute left-0 right-0 h-px top-1/2 -translate-y-1/2"
                    style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 153, 0, 0.3) 10%, rgba(255, 153, 0, 0.3) 90%, transparent 100%)',
                    }}
                />

                {/* Energy pulse */}
                <div
                    className="absolute left-0 right-0 h-px top-1/2 -translate-y-1/2 overflow-hidden"
                >
                    <div
                        className="h-full w-1/3"
                        style={{
                            background: 'linear-gradient(90deg, transparent, var(--tva-amber), transparent)',
                            animation: 'pulseFlow 4s ease-in-out infinite',
                        }}
                    />
                </div>

                {/* Timeline Nodes */}
                <div className="relative w-full flex justify-between items-center">
                    {experiences.map((exp, index) => (
                        <TimelineNode
                            key={exp.id}
                            experience={exp}
                            index={index}
                            isActive={index === activeIndex}
                            isPast={index < activeIndex}
                            onClick={() => onSelect(index)}
                        />
                    ))}
                </div>
            </div>

            {/* Navigation hint */}
            <div className="text-center mt-4">
                <span className="text-xs uppercase tracking-[0.3em]" style={{ color: 'rgba(255, 153, 0, 0.3)' }}>
                    Scroll to navigate timeline
                </span>
            </div>
        </div>
    );
}

interface TimelineNodeProps {
    experience: Experience;
    index: number;
    isActive: boolean;
    isPast: boolean;
    onClick: () => void;
}

function TimelineNode({ experience, index, isActive, isPast, onClick }: TimelineNodeProps) {
    return (
        <div 
            className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${isActive ? 'scale-110' : 'opacity-50 hover:opacity-100'}`}
            onClick={onClick}
            style={{ minWidth: '40px' }}
        >
            <div 
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 transition-all duration-300 ${isActive ? 'border-amber-500 bg-amber-500 shadow-[0_0_15px_rgba(255,153,0,0.8)]' : isPast ? 'border-amber-500 bg-amber-900' : 'border-neutral-600 bg-black'}`}
                style={isActive ? { borderColor: 'var(--tva-amber)', backgroundColor: 'var(--tva-amber)' } : isPast ? { borderColor: 'var(--tva-amber)' } : {}}
            />
            <div className={`mt-2 md:mt-4 text-center ${isActive ? 'block' : 'hidden md:block'}`}>
                <div 
                    className="text-[8px] md:text-xs font-mono tracking-wider md:tracking-widest max-w-[70px] md:max-w-[120px]" 
                    style={{ color: isActive ? 'var(--tva-amber)' : 'rgba(255, 255, 255, 0.5)' }}
                >
                    {experience.year}
                </div>
            </div>
        </div>
    );
}

ExperienceSection.displayName = 'ExperienceSection';
ExperiencePanel.displayName = 'ExperiencePanel';
TimelineStrip.displayName = 'TimelineStrip';
TimelineNode.displayName = 'TimelineNode';

function CornerBrackets() {
    return (
        <>
            <div className="cb cb-tl" /><div className="cb cb-tr" /><div className="cb cb-bl" /><div className="cb cb-br" />
            <style jsx>{`
                .cb { position: absolute; width: 35px; height: 35px; }
                .cb-tl { top: 25px; left: 25px; border-top: 1px solid rgba(255, 153, 0, 0.12); border-left: 1px solid rgba(255, 153, 0, 0.12); }
                .cb-tr { top: 25px; right: 25px; border-top: 1px solid rgba(255, 153, 0, 0.12); border-right: 1px solid rgba(255, 153, 0, 0.12); }
                .cb-bl { bottom: 25px; left: 25px; border-bottom: 1px solid rgba(255, 153, 0, 0.12); border-left: 1px solid rgba(255, 153, 0, 0.12); }
                .cb-br { bottom: 25px; right: 25px; border-bottom: 1px solid rgba(255, 153, 0, 0.12); border-right: 1px solid rgba(255, 153, 0, 0.12); }
                @media (max-width: 768px) { .cb { width: 25px; height: 25px; } .cb-tl, .cb-bl { left: 15px; } .cb-tr, .cb-br { right: 15px; } .cb-tl, .cb-tr { top: 15px; } .cb-bl, .cb-br { bottom: 15px; } }
            `}</style>
        </>
    );
}

CornerBrackets.displayName = 'CornerBrackets';