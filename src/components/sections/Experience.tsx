'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useExperience, type Experience } from '@/lib/data';

const formatDate = (date: Date | string) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export function ExperienceSection() {
    const EXPERIENCE = useExperience();
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

    }, [activeIndex, isJumping, EXPERIENCE.length]);

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
    }, [activeIndex, jumpToExperience, EXPERIENCE.length]);

    const currentExperience = EXPERIENCE[activeIndex];

    return (
        <div
            ref={containerRef}
            className="section-container relative"
            style={{
                height: '100vh',
                width: '100vw',
                overflow: 'hidden',
            }}
        >
            {/* Cinematic Background Layers - Enhanced to match Projects */}
            <div className="absolute inset-0">
                {/* Deep radial gradient - Enhanced */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse 100% 60% at 50% 40%, rgba(255, 153, 0, 0.12) 0%, rgba(255, 100, 0, 0.04) 40%, transparent 70%)',
                    }}
                />

                {/* Secondary glow */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse 80% 60% at 70% 80%, rgba(255, 153, 0, 0.02) 0%, transparent 40%)',
                    }}
                />

                {/* Grid pattern overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255, 153, 0, 0.015) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 153, 0, 0.015) 1px, transparent 1px)
                        `,
                        backgroundSize: '80px 80px',
                        opacity: 0.5,
                    }}
                />

                {/* CRT Scanlines - Enhanced */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 153, 0, 0.03) 2px, rgba(255, 153, 0, 0.03) 4px)',
                        zIndex: 100,
                        pointerEvents: 'none',
                    }}
                />

                {/* Vignette effect */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 0%, rgba(0,0,0,0.2) 100%)',
                        zIndex: 50,
                        pointerEvents: 'none',
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
            <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-8 lg:px-16" style={{ borderBottom: '1px solid rgba(255, 153, 0, 0.1)' }}>
                <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--tva-amber)', boxShadow: '0 0 10px var(--tva-amber)' }} />
                    <span className="text-xs uppercase tracking-[0.4em]" style={{ color: 'rgba(255, 153, 0, 0.5)' }}>
                        Sacred Timeline
                    </span>
                </div>

                <div className="flex items-center gap-8">
                    <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255, 153, 0, 0.4)' }}>
                        Temporal Coordinate
                    </span>
                    <span className="text-2xl font-light tracking-widest" style={{ color: 'var(--tva-amber)' }}>
                        {(activeIndex + 1).toString().padStart(2, '0')}
                        <span style={{ color: 'rgba(255, 153, 0, 0.3)' }}> / </span>
                        {EXPERIENCE.length.toString().padStart(2, '0')}
                    </span>
                </div>
            </div>

            {/* Main Content - Cinematic Layout */}
            <div className="h-full flex flex-col pt-24 pb-8">

                {/* Experience Content Panel - Upper 2/3 */}
                <div className="content-panel flex-1 flex items-center justify-center px-8 lg:px-24">
                    <div className="w-full max-w-5xl">
                        {currentExperience && <ExperiencePanel experience={currentExperience} index={activeIndex} />}
                    </div>
                </div>

                {/* Timeline Strip - Lower Section */}
                <div className="timeline-container h-40 relative">
                    <TimelineStrip
                        experiences={EXPERIENCE}
                        activeIndex={activeIndex}
                        onSelect={jumpToExperience}
                    />
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
                <div className="flex items-center gap-4 mb-6">
                    <div
                        className="px-4 py-1.5 text-xs uppercase tracking-[0.3em]"
                        style={{
                            border: '1px solid rgba(255, 153, 0, 0.4)',
                            color: 'var(--tva-amber)',
                        }}
                    >
                        Incident #{(index + 1).toString().padStart(3, '0')}
                    </div>
                    <div
                        className="flex items-center gap-2 text-xs uppercase tracking-widest"
                        style={{ color: '#00FF00' }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#00FF00' }} />
                        Verified
                    </div>
                </div>

                {/* Role Title */}
                <h2
                    className="text-5xl lg:text-6xl uppercase tracking-wide mb-4 font-light"
                    style={{
                        color: 'var(--tva-amber)',
                        textShadow: '0 0 40px rgba(255, 153, 0, 0.3)',
                        animation: 'titleGlow 3s ease-in-out infinite',
                    }}
                >
                    {experience.role}
                </h2>

                {/* Company & Date */}
                <div
                    className="text-xl uppercase tracking-[0.2em] mb-8 flex items-center gap-4"
                    style={{ color: 'rgba(255, 153, 0, 0.6)' }}
                >
                    <span>{experience.company}</span>
                    <span style={{ color: 'rgba(255, 153, 0, 0.3)' }}>•</span>
                    <span style={{ color: 'rgba(255, 153, 0, 0.4)' }}>
                        {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Present'}
                    </span>
                </div>

                {/* Description */}
                <p
                    className="text-lg leading-relaxed max-w-2xl"
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

            <style jsx>{`
                @keyframes pulseFlow {
                    0%, 100% { transform: translateX(-100%); opacity: 0.3; }
                    50% { transform: translateX(300%); opacity: 0.6; }
                }
            `}</style>
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
    const nodeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!nodeRef.current) return;

        gsap.to(nodeRef.current, {
            scale: isActive ? 1.2 : 1,
            duration: 0.4,
            ease: isActive ? 'elastic.out(1, 0.5)' : 'power2.out',
        });
    }, [isActive]);

    return (
        <div
            ref={nodeRef}
            className="relative cursor-pointer group"
            onClick={onClick}
        >
            {/* Year label above */}
            <div
                className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm uppercase tracking-wider transition-all duration-300"
                style={{
                    color: isActive ? 'var(--tva-amber)' : 'rgba(255, 153, 0, 0.4)',
                    fontWeight: isActive ? '600' : '400',
                }}
            >
                {new Date(experience.startDate).getFullYear()}
            </div>

            {/* Node */}
            <div
                className="relative w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                    background: isActive ? 'var(--tva-amber)' : 'transparent',
                    border: `2px solid ${isActive ? 'var(--tva-amber)' : isPast ? 'rgba(255, 153, 0, 0.6)' : 'rgba(255, 153, 0, 0.3)'}`,
                    boxShadow: isActive ? '0 0 30px var(--tva-amber), 0 0 60px rgba(255, 153, 0, 0.3)' : 'none',
                }}
            >
                {isActive && (
                    <>
                        {/* Outer ring pulse */}
                        <div
                            className="absolute inset-0 rounded-full animate-ping"
                            style={{
                                border: '1px solid var(--tva-amber)',
                                opacity: 0.5,
                            }}
                        />
                        {/* Inner glow */}
                        <div
                            className="w-2 h-2 rounded-full"
                            style={{
                                background: 'white',
                                boxShadow: '0 0 10px white',
                            }}
                        />
                    </>
                )}
            </div>

            {/* Company label below */}
            <div
                className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs uppercase tracking-widest transition-all duration-300"
                style={{
                    color: isActive ? 'rgba(255, 153, 0, 0.8)' : 'rgba(255, 153, 0, 0.3)',
                }}
            >
                {experience.company.split(' ')[0]}
            </div>
        </div>
    );
}

function CornerBrackets() {
    const bracketStyle = {
        position: 'absolute' as const,
        width: '40px',
        height: '40px',
        borderColor: 'rgba(255, 153, 0, 0.2)',
        borderStyle: 'solid',
        borderWidth: '0',
    };

    return (
        <>
            <div style={{ ...bracketStyle, top: 24, left: 24, borderTopWidth: '1px', borderLeftWidth: '1px' }} />
            <div style={{ ...bracketStyle, top: 24, right: 24, borderTopWidth: '1px', borderRightWidth: '1px' }} />
            <div style={{ ...bracketStyle, bottom: 24, left: 24, borderBottomWidth: '1px', borderLeftWidth: '1px' }} />
            <div style={{ ...bracketStyle, bottom: 24, right: 24, borderBottomWidth: '1px', borderRightWidth: '1px' }} />
        </>
    );
}

ExperienceSection.displayName = 'ExperienceSection';
ExperiencePanel.displayName = 'ExperiencePanel';
TimelineStrip.displayName = 'TimelineStrip';
TimelineNode.displayName = 'TimelineNode';
CornerBrackets.displayName = 'CornerBrackets';
