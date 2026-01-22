'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { Hero } from '@/components/sections/Hero';
import { ExperienceSection } from '@/components/sections/Experience';
import { ProjectsSection } from '@/components/sections/Projects';
import { SkillsSection } from '@/components/sections/Skills';
import { FeedbacksSection } from '@/components/sections/Feedbacks';
import { ContactSection } from '@/components/sections/Contact';
import { useAppSelector } from '@/store/hooks';
import { useWarpTransition } from '@/hooks/useWarpTransition';
import { useGSAPObserver } from '@/hooks/useGSAPObserver';
import { WarpFlash } from '@/components/ui/WarpFlash';
import { CVDownloadButton } from '@/components/ui/CVDownloadButton';

const sections = [
    { id: 'hero', Component: Hero, label: 'Variant' },
    { id: 'experience', Component: ExperienceSection, label: 'Timeline' },
    { id: 'projects', Component: ProjectsSection, label: 'Evidence' },
    { id: 'skills', Component: SkillsSection, label: 'Skills' },
    { id: 'feedbacks', Component: FeedbacksSection, label: 'Reports' },
    { id: 'contact', Component: ContactSection, label: 'Uplink' },
];


export function SectionController() {
    const containerRef = useRef<HTMLDivElement>(null);
    const flashRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const { currentSection, targetSection, isTransitioning } = useAppSelector(
        (state) => state.navigation
    );
    const { setFlashRef } = useWarpTransition();

    // Detect mobile screen
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Initialize GSAP Observer
    useGSAPObserver();

    // Set flash ref
    useEffect(() => {
        setFlashRef(flashRef.current);
    }, [setFlashRef]);

    // Handle section transitions (desktop only)
    useEffect(() => {
        // Skip on mobile - no transitions needed, all sections visible
        if (isMobile) return;
        if (!containerRef.current) return;

        const sectionElements = containerRef.current.children;

        // Animate out current section
        if (isTransitioning && sectionElements[currentSection]) {
            gsap.to(sectionElements[currentSection], {
                opacity: 0,
                scale: 0.95,
                duration: 0.4,
                ease: 'power2.in',
            });
        }

        // Animate in target section
        if (sectionElements[targetSection]) {
            gsap.fromTo(
                sectionElements[targetSection],
                {
                    opacity: 0,
                    scale: 1.05,
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    delay: isTransitioning ? 0.6 : 0,
                    ease: 'power3.out',
                }
            );
        }
    }, [currentSection, targetSection, isTransitioning, isMobile]);

    return (
        <>
            <WarpFlash ref={flashRef} />

            <style jsx global>{`
                @media (max-width: 768px) {
                    .section-container-wrapper {
                        position: relative !important;
                        height: auto !important;
                        width: 100% !important;
                        display: flex !important;
                        flex-direction: column !important;
                        overflow: visible !important;
                        background: #000;
                    }
                    .section-wrapper {
                        position: relative !important;
                        inset: auto !important;
                        width: 100% !important;
                        height: auto !important;
                        opacity: 1 !important;
                        pointer-events: auto !important;
                        z-index: 1 !important;
                        transform: none !important;
                        display: block !important;
                    }
                    .section-indicators {
                        display: none !important;
                    }
                }
            `}</style>

            <div
                ref={containerRef}
                className="relative section-container-wrapper"
                style={isMobile ? {
                    position: 'relative',
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#000',
                } : {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 10,
                }}
            >
                {sections.map(({ id, Component }, index) => (
                    <div
                        key={id}
                        className={isMobile ? "section-wrapper-mobile" : "absolute inset-0 section-wrapper"}
                        style={isMobile ? {
                            position: 'relative',
                            width: '100%',
                            height: 'auto',
                        } : {
                            opacity: index === currentSection ? 1 : 0,
                            pointerEvents: index === currentSection ? 'auto' : 'none',
                            zIndex: index === currentSection ? 1 : 0,
                        }}
                    >
                        <Component />
                    </div>
                ))}
            </div>

            {/* Section Indicators */}
            <div className="section-indicators">
                <SectionIndicators currentSection={currentSection} />
            </div>

            {/* CV Download Button - Fixed position on right edge */}
            <CVDownloadButton />
        </>
    );
}

interface SectionIndicatorsProps {
    currentSection: number;
}

function SectionIndicators({ currentSection }: SectionIndicatorsProps) {
    return (
        <div
            className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4"
            style={{ zIndex: 20 }}
        >
            {sections.map((section, index) => (
                <div
                    key={section.id}
                    className="relative group flex items-center justify-end gap-3"
                >
                    {/* Label */}
                    <span
                        className="text-xs uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ color: 'rgba(255, 153, 0, 0.7)' }}
                    >
                        {section.label}
                    </span>

                    {/* Indicator dot */}
                    <div
                        className="w-2 h-2 rounded-full transition-all duration-300"
                        style={{
                            background:
                                index === currentSection
                                    ? 'var(--tva-amber)'
                                    : 'rgba(255, 153, 0, 0.3)',
                            boxShadow:
                                index === currentSection
                                    ? '0 0 10px var(--tva-amber)'
                                    : 'none',
                            transform: index === currentSection ? 'scale(1.5)' : 'scale(1)',
                        }}
                    />
                </div>
            ))}
        </div>
    );
}

SectionController.displayName = 'SectionController';
SectionIndicators.displayName = 'SectionIndicators';

