'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Hero } from '@/components/sections/Hero';
import { ExperienceSection } from '@/components/sections/Experience';
import { ProjectsSection } from '@/components/sections/Projects';
import { SkillsSection } from '@/components/sections/Skills';
import { ReferencesSection } from '@/components/sections/References';
import { ContactSection } from '@/components/sections/Contact';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useWarpTransition } from '@/hooks/useWarpTransition';
import { useGSAPObserver } from '@/hooks/useGSAPObserver';
import { WarpFlash } from '@/components/ui/WarpFlash';

const sections = [
    { id: 'hero', Component: Hero, label: 'Variant' },
    { id: 'experience', Component: ExperienceSection, label: 'Timeline' },
    { id: 'projects', Component: ProjectsSection, label: 'Evidence' },
    { id: 'skills', Component: SkillsSection, label: 'Skills' },
    { id: 'references', Component: ReferencesSection, label: 'Files' },
    { id: 'contact', Component: ContactSection, label: 'Uplink' },
];

export function SectionController() {
    const containerRef = useRef<HTMLDivElement>(null);
    const flashRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const { currentSection, targetSection, isTransitioning } = useAppSelector(
        (state) => state.navigation
    );
    const { setFlashRef } = useWarpTransition();

    // Initialize GSAP Observer
    useGSAPObserver();

    // Set flash ref
    useEffect(() => {
        setFlashRef(flashRef.current);
    }, [setFlashRef]);

    // Handle section transitions for desktop
    useEffect(() => {
        if (!containerRef.current) return;
        if (typeof window !== 'undefined' && window.innerWidth <= 768) return;

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
    }, [currentSection, targetSection, isTransitioning]);

    // Handle mobile scroll sync
    useEffect(() => {
        if (typeof window === 'undefined' || window.innerWidth > 768) return;
        if (!containerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Array.from(containerRef.current!.children).indexOf(entry.target);
                        if (index !== -1 && index !== currentSection) {
                            dispatch({ type: 'navigation/setCurrentSection', payload: index });
                        }
                    }
                });
            },
            { threshold: 0.5 }
        );

        Array.from(containerRef.current.children).forEach((child) => observer.observe(child));

        return () => observer.disconnect();
    }, [dispatch, currentSection]);

    return (
        <>
            <WarpFlash ref={flashRef} />

            <div
                ref={containerRef}
                className="section-controller-container"
            >
                {sections.map(({ id, Component }, index) => (
                    <div
                        key={id}
                        className="section-wrapper"
                        style={{
                            '--desktop-opacity': index === currentSection ? 1 : 0,
                            '--desktop-pointer': index === currentSection ? 'auto' : 'none',
                            '--desktop-z': index === currentSection ? 1 : 0,
                        } as React.CSSProperties}
                    >
                        <Component />
                    </div>
                ))}
            </div>

            <style jsx>{`
                .section-controller-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100dvh;
                    z-index: 10;
                }
                .section-wrapper {
                    position: absolute;
                    inset: 0;
                    opacity: var(--desktop-opacity);
                    pointer-events: var(--desktop-pointer);
                    z-index: var(--desktop-z);
                }
                
                @media (max-width: 768px) {
                    .section-controller-container {
                        position: relative;
                        height: auto;
                        display: flex;
                        flex-direction: column;
                    }
                    .section-wrapper {
                        position: relative;
                        height: auto;
                        min-height: 100dvh;
                        opacity: 1 !important;
                        pointer-events: auto !important;
                        z-index: 1 !important;
                        transform: none !important;
                    }
                }
            `}</style>

            {/* Section Indicators */}
            <SectionIndicators currentSection={currentSection} />
        </>
    );
}

interface SectionIndicatorsProps {
    currentSection: number;
}

function SectionIndicators({ currentSection }: SectionIndicatorsProps) {
    const dispatch = useAppDispatch();
    return (
        <div
            className="fixed right-2 md:right-4 lg:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 cursor-pointer"
            style={{ zIndex: 20 }}
        >
            {sections.map((section, index) => (
                <div
                    key={section.id}
                    className="relative group flex items-center justify-end gap-3"
                    onClick={() => {
                        if (typeof window !== 'undefined' && window.innerWidth <= 768) {
                            const wrappers = document.querySelectorAll('.section-wrapper');
                            if (wrappers[index]) {
                                wrappers[index].scrollIntoView({ behavior: 'smooth' });
                            }
                        } else {
                            dispatch({ type: 'navigation/setTargetSection', payload: index });
                        }
                    }}
                >
                    {/* Label */}
                    <span
                        className="text-xs uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:block"
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

