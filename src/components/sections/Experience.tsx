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
    const [isMobile, setIsMobile] = useState(false);
    const lastWheelTime = useRef(0);

    // Detect mobile screen
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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

    // Handle scroll within section (desktop only)
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Skip on mobile - let native scrolling work
        if (window.innerWidth <= 768) return;

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
            className="section-container relative experience-section"
            style={{
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
            <div className="experience-header absolute top-0 left-0 right-0 h-14 lg:h-16 flex items-center justify-between px-4 lg:px-16" style={{ borderBottom: '1px solid rgba(255, 153, 0, 0.1)' }}>
                <div className="flex items-center gap-3 lg:gap-4">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--tva-amber)', boxShadow: '0 0 10px var(--tva-amber)' }} />
                    <span className="text-[10px] lg:text-xs uppercase tracking-[0.2em] lg:tracking-[0.4em]" style={{ color: 'rgba(255, 153, 0, 0.5)' }}>
                        Sacred Timeline
                    </span>
                </div>

                <div className="flex items-center gap-4 lg:gap-8">
                    <span className="hidden sm:inline text-xs uppercase tracking-widest" style={{ color: 'rgba(255, 153, 0, 0.4)' }}>
                        Temporal Coordinate
                    </span>
                    <span className="text-lg lg:text-2xl font-light tracking-widest" style={{ color: 'var(--tva-amber)' }}>
                        {(activeIndex + 1).toString().padStart(2, '0')}
                        <span style={{ color: 'rgba(255, 153, 0, 0.3)' }}> / </span>
                        {EXPERIENCE.length.toString().padStart(2, '0')}
                    </span>
                </div>
            </div>

            {/* Main Content - Responsive Layout */}
            <div className="experience-content h-full flex flex-col pt-16 lg:pt-24 pb-4 lg:pb-8">

                {/* Desktop: Single Experience Panel */}
                {!isMobile && (
                    <div className="content-panel flex flex-1 items-center justify-center px-4 lg:px-24 overflow-y-auto">
                        <div className="w-full max-w-5xl py-4 lg:py-0">
                            {currentExperience && <ExperiencePanel experience={currentExperience} index={activeIndex} />}
                        </div>
                    </div>
                )}

                {/* Desktop: Timeline Strip */}
                {!isMobile && (
                    <div className="timeline-container h-24 lg:h-40 relative flex-shrink-0">
                        <TimelineStrip
                            experiences={EXPERIENCE}
                            activeIndex={activeIndex}
                            onSelect={jumpToExperience}
                        />
                    </div>
                )}

                {/* Mobile: Swipeable Timeline Carousel */}
                {isMobile && (
                    <MobileTimelineCarousel
                        experiences={EXPERIENCE}
                        activeIndex={activeIndex}
                        onNavigate={setActiveIndex}
                    />
                )}
            </div>

            {/* Corner Decorations */}
            <CornerBrackets />

            <style jsx>{`
                .experience-section {
                    height: 100vh;
                }
                @media (max-width: 768px) {
                    .experience-section {
                        height: auto !important;
                        min-height: 100dvh;
                    }
                }
            `}</style>
        </div>
    );
}

interface ExperiencePanelProps {
    experience: Experience;
    index: number;
}

function ExperiencePanel({ experience, index }: ExperiencePanelProps) {
    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-start lg:items-center">
            {/* Left - Visual Element (Hidden on mobile to save space) */}
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
            <div className="flex-1 w-full">
                {/* Status Badge */}
                <div className="flex items-center gap-4 mb-4 lg:mb-6">
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
                        className="flex items-center gap-2 text-[10px] lg:text-xs uppercase tracking-widest"
                        style={{ color: '#00FF00' }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#00FF00' }} />
                        Verified
                    </div>
                </div>

                {/* Role Title */}
                <h2
                    className="text-3xl sm:text-4xl lg:text-6xl uppercase tracking-wide mb-3 lg:mb-4 font-light leading-tight"
                    style={{
                        color: 'var(--tva-amber)',
                        textShadow: '0 0 40px rgba(255, 153, 0, 0.3)',
                    }}
                >
                    {experience.role}
                </h2>

                {/* Company & Date */}
                <div
                    className="text-sm sm:text-base lg:text-xl uppercase tracking-[0.15em] lg:tracking-[0.2em] mb-6 lg:mb-8 flex flex-wrap items-center gap-2 lg:gap-4"
                    style={{ color: 'rgba(255, 153, 0, 0.6)' }}
                >
                    <span className="font-semibold">{experience.company}</span>
                    <span className="hidden sm:inline" style={{ color: 'rgba(255, 153, 0, 0.3)' }}>•</span>
                    <span className="w-full sm:w-auto mt-1 sm:mt-0" style={{ color: 'rgba(255, 153, 0, 0.4)' }}>
                        {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Present'}
                    </span>
                </div>

                {/* Description */}
                <p
                    className="text-base lg:text-lg leading-relaxed max-w-2xl"
                    style={{
                        color: 'rgba(255, 153, 0, 0.5)',
                        lineHeight: '1.6',
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

// Single Node Timeline with Fade Animations
function MobileTimelineCarousel({
    experiences,
}: {
    experiences: Experience[];
    activeIndex: number;
    onNavigate: (index: number) => void;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [fadeState, setFadeState] = useState<'visible' | 'fadeOut' | 'fadeIn'>('visible');
    const touchStartY = useRef(0);
    const lastScrollTime = useRef(0);

    const navigateToIndex = useCallback((newIndex: number) => {
        if (newIndex < 0 || newIndex >= experiences.length || isAnimating) return;

        setIsAnimating(true);
        setFadeState('fadeOut');

        // After fade out, change index and fade in
        setTimeout(() => {
            setCurrentIndex(newIndex);
            setFadeState('fadeIn');

            setTimeout(() => {
                setFadeState('visible');
                setIsAnimating(false);
            }, 300);
        }, 300);
    }, [experiences.length, isAnimating]);

    // Handle touch scroll
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const diff = touchStartY.current - e.changedTouches[0].clientY;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Scroll down -> next
                navigateToIndex(currentIndex + 1);
            } else {
                // Scroll up -> prev
                navigateToIndex(currentIndex - 1);
            }
        }
    };

    // Handle wheel scroll (for testing on desktop)
    const handleWheel = useCallback((e: WheelEvent) => {
        const now = Date.now();
        if (now - lastScrollTime.current < 800) return; // Debounce
        lastScrollTime.current = now;

        if (e.deltaY > 0) {
            navigateToIndex(currentIndex + 1);
        } else if (e.deltaY < 0) {
            navigateToIndex(currentIndex - 1);
        }
    }, [currentIndex, navigateToIndex]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener('wheel', handleWheel, { passive: true });
        return () => container.removeEventListener('wheel', handleWheel);
    }, [handleWheel]);

    const currentExp = experiences[currentIndex];
    if (!currentExp) return null;

    // Calculate timeline offset for horizontal slide
    const nodeWidth = 60; // px per node
    const timelineOffset = -currentIndex * nodeWidth;

    return (
        <div
            ref={containerRef}
            className="flex-1 flex flex-col overflow-hidden"
            style={{ height: '100%', touchAction: 'none' }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Title Section - Above Node */}
            <div
                className="text-center py-6 px-4"
                style={{
                    opacity: fadeState === 'fadeOut' ? 0 : 1,
                    transform: fadeState === 'fadeOut' ? 'translateY(-10px)' : 'translateY(0)',
                    transition: 'all 0.3s ease-out',
                }}
            >
                {currentIndex === 0 && (
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <div
                            className="w-2 h-2 rounded-full animate-pulse"
                            style={{
                                background: '#00FF00',
                                boxShadow: '0 0 10px #00FF00',
                            }}
                        />
                        <span
                            className="text-xs uppercase tracking-wider"
                            style={{ color: '#00FF00' }}
                        >
                            Current
                        </span>
                    </div>
                )}
                <h2
                    className="text-xl uppercase tracking-widest mb-2 font-semibold"
                    style={{ color: 'var(--tva-amber)' }}
                >
                    {currentExp.role}
                </h2>
                <p
                    className="text-sm uppercase tracking-wider"
                    style={{ color: 'rgba(255, 153, 0, 0.6)' }}
                >
                    {currentExp.company}
                </p>
            </div>

            {/* Single Centered Node with Horizontal Timeline */}
            <div
                className="relative py-6"
                style={{
                    background: 'rgba(5,4,4,0.9)',
                    borderTop: '1px solid rgba(255, 153, 0, 0.2)',
                    borderBottom: '1px solid rgba(255, 153, 0, 0.2)',
                }}
            >
                {/* Timeline Track - Slides Horizontally */}
                <div
                    className="flex items-center justify-center overflow-visible"
                    style={{
                        transform: `translateX(${timelineOffset}px)`,
                        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    {experiences.map((exp, index) => (
                        <div
                            key={exp.id}
                            className="flex flex-col items-center"
                            style={{
                                width: `${nodeWidth}px`,
                                flexShrink: 0,
                            }}
                        >
                            {/* Connecting Line Left */}
                            {index > 0 && (
                                <div
                                    className="absolute h-px"
                                    style={{
                                        width: `${nodeWidth}px`,
                                        left: `calc(50% - ${nodeWidth}px)`,
                                        top: '50%',
                                        background: 'rgba(255, 153, 0, 0.3)',
                                        transform: `translateX(${(index - currentIndex) * nodeWidth}px)`,
                                    }}
                                />
                            )}

                            {/* Node */}
                            <div
                                className="relative z-10 rounded-full border-2 transition-all duration-500 flex items-center justify-center"
                                style={{
                                    width: index === currentIndex ? '24px' : '12px',
                                    height: index === currentIndex ? '24px' : '12px',
                                    borderColor: index === currentIndex ? 'var(--tva-amber)' : 'rgba(255, 153, 0, 0.3)',
                                    background: index === currentIndex ? 'var(--tva-amber)' : 'rgba(5,4,4,1)',
                                    boxShadow: index === currentIndex
                                        ? '0 0 20px var(--tva-amber), 0 0 40px rgba(255,153,0,0.4), inset 0 0 10px rgba(0,0,0,0.3)'
                                        : 'none',
                                }}
                            >
                                {index === currentIndex && (
                                    <div className="w-2 h-2 rounded-full bg-black/50" />
                                )}
                            </div>

                            {/* Year Label */}
                            <span
                                className="mt-3 text-xs transition-all duration-300"
                                style={{
                                    color: index === currentIndex ? 'var(--tva-amber)' : 'rgba(255, 153, 0, 0.2)',
                                    fontWeight: index === currentIndex ? '700' : '400',
                                    fontSize: index === currentIndex ? '14px' : '10px',
                                }}
                            >
                                {new Date(exp.startDate).getFullYear()}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Position Counter */}
                <div
                    className="text-center mt-4 text-xs uppercase tracking-widest"
                    style={{ color: 'rgba(255, 153, 0, 0.4)' }}
                >
                    {(currentIndex + 1).toString().padStart(2, '0')} / {experiences.length.toString().padStart(2, '0')}
                </div>
            </div>

            {/* Experience Card - Fades In/Out */}
            <div
                className="flex-1 p-4 overflow-auto"
                style={{
                    opacity: fadeState === 'fadeOut' ? 0 : 1,
                    transform: fadeState === 'fadeOut' ? 'translateY(20px) scale(0.95)' : 'translateY(0) scale(1)',
                    transition: 'all 0.3s ease-out',
                }}
            >
                <div
                    className="relative mx-auto w-full max-w-md h-full"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255, 153, 0, 0.1) 0%, rgba(255, 153, 0, 0.02) 100%)',
                        border: '1px solid rgba(255, 153, 0, 0.3)',
                        padding: '20px',
                    }}
                >
                    {/* Date Range */}
                    <div
                        className="text-sm uppercase tracking-wider mb-4 pb-3"
                        style={{
                            color: 'rgba(255, 153, 0, 0.6)',
                            borderBottom: '1px solid rgba(255, 153, 0, 0.15)',
                        }}
                    >
                        <span style={{ color: 'rgba(255, 153, 0, 0.4)' }}>
                            {formatDate(currentExp.startDate)} - {currentExp.endDate ? formatDate(currentExp.endDate) : 'Present'}
                        </span>
                    </div>

                    {/* Description */}
                    <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'rgba(255, 153, 0, 0.6)', lineHeight: '1.9' }}
                    >
                        {currentExp.description}
                    </p>

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-5 h-5" style={{ borderTop: '2px solid var(--tva-amber)', borderLeft: '2px solid var(--tva-amber)' }} />
                    <div className="absolute top-0 right-0 w-5 h-5" style={{ borderTop: '2px solid var(--tva-amber)', borderRight: '2px solid var(--tva-amber)' }} />
                    <div className="absolute bottom-0 left-0 w-5 h-5" style={{ borderBottom: '2px solid var(--tva-amber)', borderLeft: '2px solid var(--tva-amber)' }} />
                    <div className="absolute bottom-0 right-0 w-5 h-5" style={{ borderBottom: '2px solid var(--tva-amber)', borderRight: '2px solid var(--tva-amber)' }} />
                </div>
            </div>

            {/* Scroll Hint */}
            {currentIndex < experiences.length - 1 && (
                <div
                    className="text-center pb-4 text-xs uppercase tracking-wider animate-pulse"
                    style={{ color: 'rgba(255, 153, 0, 0.4)' }}
                >
                    ↓ Scroll for Next Experience ↓
                </div>
            )}
            {currentIndex === experiences.length - 1 && (
                <div
                    className="text-center pb-4 text-xs uppercase tracking-wider"
                    style={{ color: 'rgba(255, 153, 0, 0.3)' }}
                >
                    End of Timeline
                </div>
            )}
        </div>
    );
}

ExperienceSection.displayName = 'ExperienceSection';
ExperiencePanel.displayName = 'ExperiencePanel';
TimelineStrip.displayName = 'TimelineStrip';
TimelineNode.displayName = 'TimelineNode';
CornerBrackets.displayName = 'CornerBrackets';
MobileTimelineCarousel.displayName = 'MobileTimelineCarousel';
