'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useProjects, type Project } from '@/lib/data';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setActiveProject } from '@/store/navigationSlice';
import { Marquee } from '@/components/ui/Marquee';

export function ProjectsSection() {
    const PROJECTS = useProjects();
    const dispatch = useAppDispatch();
    const activeProject = useAppSelector((state) => state.navigation.activeProject);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleProjectSelect = useCallback((projectId: string) => {
        if (activeProject === projectId) {
            dispatch(setActiveProject(null));
        } else {
            dispatch(setActiveProject(projectId));
        }
    }, [activeProject, dispatch]);

    const currentProject = PROJECTS.find((p) => p.id === activeProject);
    const activeIndex = PROJECTS.findIndex((p) => p.id === activeProject);

    return (
        <div
            ref={containerRef}
            className="section-container projects-section"
            style={{
                position: 'relative',
                height: '100vh',
                width: '100vw',
                overflow: 'hidden',
                background: '#030303',
            }}
        >
            {/* === LAYERED BACKGROUND EFFECTS === */}

            {/* Deep space void gradient - ENHANCED */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse 100% 60% at 50% 40%, rgba(255, 153, 0, 0.12) 0%, rgba(255, 100, 0, 0.04) 40%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            {/* Secondary glow */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse 80% 60% at 70% 80%, rgba(255, 153, 0, 0.02) 0%, transparent 40%)',
                pointerEvents: 'none',
            }} />

            {/* Grid pattern overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
                    linear-gradient(rgba(255, 153, 0, 0.015) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 153, 0, 0.015) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px',
                pointerEvents: 'none',
                opacity: 0.5,
            }} />

            {/* CRT Scanlines */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 153, 0, 0.03) 2px, rgba(255, 153, 0, 0.03) 4px)',
                pointerEvents: 'none',
                zIndex: 100,
            }} />

            {/* Vignette effect */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 0%, rgba(0,0,0,0.2) 100%)',
                pointerEvents: 'none',
                zIndex: 50,
            }} />

            {/* === TOP HEADER BAR === */}
            <header className="projects-header" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '55px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 50px',
                background: 'linear-gradient(180deg, rgba(5,4,4,0.95) 0%, rgba(5,4,4,0.8) 100%)',
                borderBottom: '1px solid rgba(255, 153, 0, 0.2)',
                backdropFilter: 'blur(10px)',
                zIndex: 20,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    {/* Animated status dots */}
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: 'var(--tva-red)',
                            boxShadow: '0 0 10px var(--tva-red), 0 0 20px var(--tva-red)',
                            animation: 'pulse 2s ease-in-out infinite',
                        }} />
                        <div style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: 'var(--tva-amber)',
                            opacity: 0.6,
                        }} />
                        <div style={{
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            background: 'var(--tva-amber)',
                            opacity: 0.3,
                        }} />
                    </div>
                    <div style={{ width: '1px', height: '20px', background: 'rgba(255, 153, 0, 0.15)' }} />
                    <span style={{
                        fontSize: '10px',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5em',
                        color: 'rgba(255, 153, 0, 0.6)',
                    }}>
                        Evidence Vault
                    </span>
                    <span style={{
                        fontSize: '9px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.3em',
                        color: 'rgba(255, 153, 0, 0.3)',
                        padding: '3px 10px',
                        border: '1px solid rgba(255, 153, 0, 0.15)',
                    }}>
                        SEC-04
                    </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                    {/* File count */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                            fontSize: '9px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            color: 'rgba(255, 153, 0, 0.4)',
                        }}>
                            Files
                        </span>
                        <span style={{
                            fontSize: '14px',
                            fontWeight: 300,
                            color: 'var(--tva-amber)',
                        }}>
                            {PROJECTS.length.toString().padStart(2, '0')}
                        </span>
                    </div>

                    <div style={{ width: '1px', height: '20px', background: 'rgba(255, 153, 0, 0.15)' }} />

                    {/* Status */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#00FF00',
                            boxShadow: '0 0 8px #00FF00, 0 0 16px #00FF00',
                            animation: 'pulse 3s ease-in-out infinite',
                        }} />
                        <span style={{
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            color: '#00FF00',
                        }}>
                            Vault Accessible
                        </span>
                    </div>
                </div>
            </header>

            {/* === MAIN CONTENT GRID === */}
            <div className="projects-grid" style={{
                position: 'absolute',
                top: '55px',
                left: '50px',
                right: '50px',
                bottom: '50px',
                display: 'grid',
                gridTemplateColumns: '340px 1fr',
                gap: '50px',
                animation: 'fadeIn 0.5s ease forwards',
            }}>
                {/* === LEFT SIDEBAR === */}
                <aside className="projects-sidebar" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    borderRight: '1px solid rgba(255, 153, 0, 0.12)',
                    paddingRight: '40px',
                    position: 'relative',
                }}>
                    {/* Decorative line */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '1px',
                        height: '100%',
                        background: 'linear-gradient(180deg, transparent, rgba(255, 153, 0, 0.2) 20%, rgba(255, 153, 0, 0.2) 80%, transparent)',
                    }} />

                    {/* Section Title */}
                    <div style={{ marginBottom: '25px', paddingTop: '20px' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '10px',
                        }}>
                            <div style={{
                                width: '40px',
                                height: '2px',
                                background: 'linear-gradient(90deg, var(--tva-amber), transparent)',
                            }} />
                            <span style={{
                                fontSize: '9px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.4em',
                                color: 'rgba(255, 153, 0, 0.5)',
                            }}>
                                Project Archive
                            </span>
                        </div>

                        <h1 className="evidence-title" style={{
                            fontSize: '42px',
                            fontWeight: 300,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            color: 'var(--tva-amber)',
                            animation: 'titleGlow 3s ease-in-out infinite',
                            lineHeight: 1.05,
                            marginBottom: '8px',
                        }}>
                            Evidence<br />Archive
                        </h1>

                        <p style={{
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.25em',
                            color: 'rgba(255, 153, 0, 0.4)',
                        }}>
                            Select case file to declassify
                        </p>
                    </div>

                    {/* File List - Marquee */}
                    <div style={{
                        flex: 1,
                        position: 'relative',
                        minHeight: 0,
                    }}>
                        <Marquee speed={25} pauseOnHover={true} direction="up" gap={10}>
                            {PROJECTS.map((project, index) => (
                                <CaseFileCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                    isActive={activeProject === project.id}
                                    onClick={() => handleProjectSelect(project.id)}
                                />
                            ))}
                        </Marquee>
                    </div>

                    {/* Footer */}
                    <div style={{
                        marginTop: '20px',
                        paddingTop: '15px',
                        borderTop: '1px solid rgba(255, 153, 0, 0.1)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                    }}>
                        <div>
                            <span style={{
                                display: 'block',
                                fontSize: '8px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.3em',
                                color: 'rgba(255, 153, 0, 0.35)',
                                marginBottom: '4px',
                            }}>
                                Archive Total
                            </span>
                            <span style={{
                                fontSize: '9px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.2em',
                                color: 'rgba(255, 153, 0, 0.5)',
                            }}>
                                {PROJECTS.length} Case{PROJECTS.length !== 1 ? 's' : ''} on Record
                            </span>
                        </div>
                        <span style={{
                            fontSize: '36px',
                            fontWeight: 100,
                            color: 'var(--tva-amber)',
                            opacity: 0.6,
                            lineHeight: 1,
                        }}>
                            {PROJECTS.length.toString().padStart(2, '0')}
                        </span>
                    </div>
                </aside>

                {/* === RIGHT PANEL === */}
                <main className="projects-main" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: '25px',
                    position: 'relative',
                    height: '100%',
                }}>
                    {currentProject ? (
                        <CaseDetails project={currentProject} index={activeIndex} />
                    ) : (
                        <EmptyState />
                    )}
                </main>
            </div>

            {/* Corner Brackets */}
            <CornerBrackets />

            {/* Floating particles effect */}
            <FloatingParticles />

            {/* Responsive Styles */}
            <style jsx global>{`
                /* Custom Scrollbar - Override global hidden scrollbar */
                .custom-scrollbar {
                    scrollbar-width: thin !important;
                    scrollbar-color: var(--tva-amber) rgba(255, 153, 0, 0.08) !important;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    display: block !important;
                    width: 8px !important;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 153, 0, 0.08) !important;
                    border-left: 1px solid rgba(255, 153, 0, 0.15) !important;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(180deg, var(--tva-amber) 0%, rgba(255, 130, 0, 0.8) 100%) !important;
                    border: 1px solid rgba(0, 0, 0, 0.5) !important;
                    box-shadow: 0 0 8px rgba(255, 153, 0, 0.3), inset 1px 1px 2px rgba(255, 255, 255, 0.2) !important;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(180deg, #FFAA33 0%, var(--tva-amber) 100%) !important;
                    box-shadow: 0 0 15px var(--tva-amber) !important;
                }

                @media (max-width: 1024px) {
                    .projects-header { padding: 0 25px !important; }
                    .projects-grid { left: 25px !important; right: 25px !important; gap: 30px !important; }
                    .projects-sidebar { padding-right: 25px !important; }
                }
                @media (max-width: 900px) {
                    .projects-grid { grid-template-columns: 280px 1fr !important; }
                }
                @media (max-width: 768px) {
                    .projects-section { height: auto !important; min-height: 100vh !important; }
                    .projects-header { 
                        padding: 0 15px !important; 
                        height: 50px !important;
                        position: relative !important;
                    }
                    .projects-header > div:first-child { gap: 10px !important; }
                    .projects-header > div:last-child { gap: 15px !important; }
                    .projects-header > div:last-child > div:first-child { display: none !important; }
                    .projects-grid {
                        position: relative !important;
                        grid-template-columns: 1fr !important;
                        grid-template-rows: auto 1fr !important;
                        left: 15px !important;
                        right: 15px !important;
                        top: 55px !important;
                        bottom: auto !important;
                        gap: 20px !important;
                        overflow-y: visible !important;
                        padding-bottom: 30px !important;
                    }
                    .projects-sidebar {
                        border-right: none !important;
                        padding-right: 0 !important;
                        border-bottom: 1px solid rgba(255, 153, 0, 0.12) !important;
                        padding-bottom: 20px !important;
                        max-height: 280px !important;
                        overflow-y: auto !important;
                    }
                    .projects-main { 
                        padding: 15px !important;
                        min-height: 400px !important;
                    }
                    .holo-panel {
                        animation: none !important;
                    }
                    .evidence-title {
                        font-size: 32px !important;
                    }
                }
                @media (max-width: 480px) {
                    .projects-header span { font-size: 9px !important; letter-spacing: 0.1em !important; }
                    .projects-grid { left: 10px !important; right: 10px !important; }
                    .projects-sidebar { max-height: 220px !important; }
                    .projects-main { 
                        padding: 12px !important;
                        min-height: 350px !important;
                    }
                    .evidence-title {
                        font-size: 26px !important;
                    }
                }
                @media (max-width: 360px) {
                    .projects-header > div:first-child > span:last-child { display: none !important; }
                    .evidence-title {
                        font-size: 22px !important;
                    }
                }
            `}</style>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CASE FILE CARD
═══════════════════════════════════════════════════════════════════════════ */

interface CaseFileCardProps {
    project: Project;
    index: number;
    isActive: boolean;
    onClick: () => void;
}

function CaseFileCard({ project, index, isActive, onClick }: CaseFileCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!cardRef.current) return;
        gsap.to(cardRef.current, {
            x: isActive ? 12 : 0,
            scale: isActive ? 1.02 : 1,
            duration: 0.35,
            ease: 'power3.out',
        });
    }, [isActive]);

    return (
        <div
            ref={cardRef}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                position: 'relative',
                padding: '10px 12px',
                cursor: 'pointer',
                background: isActive
                    ? 'linear-gradient(135deg, rgba(255, 153, 0, 0.15) 0%, rgba(255, 153, 0, 0.05) 100%)'
                    : isHovered
                        ? 'rgba(255, 153, 0, 0.04)'
                        : 'rgba(255, 153, 0, 0.015)',
                border: `1px solid ${isActive ? 'rgba(255, 153, 0, 0.7)' : isHovered ? 'rgba(255, 153, 0, 0.3)' : 'rgba(255, 153, 0, 0.12)'}`,

                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                animation: isActive ? 'selectedGlow 2.5s ease-in-out infinite' : 'none',
                overflow: 'hidden',
            }}
        >
            {/* Glowing left bar */}
            <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: isActive ? '4px' : '2px',
                background: isActive ? 'var(--tva-amber)' : isHovered ? 'rgba(255, 153, 0, 0.4)' : 'transparent',
                boxShadow: isActive ? '0 0 20px var(--tva-amber), 0 0 40px var(--tva-amber)' : 'none',
                transition: 'all 0.35s ease',
            }} />

            {/* Scanline sweep effect on hover */}
            {isHovered && (
                <div style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 153, 0, 0.6), transparent)',
                    animation: 'scanlineSweep 0.8s ease-out',
                    pointerEvents: 'none',
                }} />
            )}

            {/* Shimmer effect on hover */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255, 153, 0, 0.05), transparent)',
                transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
                transition: 'transform 0.6s ease',
                pointerEvents: 'none',
            }} />

            {/* Header Row */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '10px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span style={{
                        fontSize: '18px',
                        fontWeight: 100,
                        color: isActive ? 'var(--tva-amber)' : 'rgba(255, 153, 0, 0.25)',
                        transition: 'color 0.3s ease',
                        textShadow: isActive ? '0 0 20px var(--tva-amber)' : 'none',
                    }}>
                        {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <div style={{ width: '1px', height: '14px', background: 'rgba(255, 153, 0, 0.2)' }} />
                    <span style={{
                        fontSize: '8px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        padding: '4px 8px',
                        border: '1px solid rgba(255, 153, 0, 0.25)',
                        color: 'rgba(255, 153, 0, 0.55)',
                        background: 'rgba(255, 153, 0, 0.03)',
                    }}>
                        EVD-{(index + 1).toString().padStart(3, '0')}
                    </span>
                </div>

                {/* Status indicator */}
                <div style={{
                    position: 'relative',
                    width: '12px',
                    height: '12px',
                }}>
                    {isActive && (
                        <div style={{
                            position: 'absolute',
                            inset: '-4px',
                            borderRadius: '50%',
                            background: 'var(--tva-amber)',
                            opacity: 0.2,
                            animation: 'pulse 1.5s ease-in-out infinite',
                        }} />
                    )}
                    <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: isActive ? 'var(--tva-amber)' : 'transparent',
                        border: `2px solid ${isActive ? 'var(--tva-amber)' : 'rgba(255, 153, 0, 0.25)'}`,
                        boxShadow: isActive ? '0 0 15px var(--tva-amber)' : 'none',
                        transition: 'all 0.3s ease',
                    }} />
                </div>
            </div>

            {/* Project Title */}
            <h3 style={{
                fontSize: '13px',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: isActive ? 'var(--tva-amber)' : 'rgba(255, 153, 0, 0.65)',
                transition: 'color 0.3s ease',
                marginBottom: '6px',
            }}>
                {project.title}
            </h3>

            {/* Status Badge - In Development */}
            {project.inDevelopment && (
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 8px',
                    marginBottom: '8px',
                    background: 'rgba(255, 153, 0, 0.1)',
                    border: '1px solid rgba(255, 153, 0, 0.3)',
                }}>
                    <div style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: 'var(--tva-amber)',
                        boxShadow: '0 0 5px var(--tva-amber)',
                        animation: 'pulse 1s ease-in-out infinite',
                    }} />
                    <span style={{
                        fontSize: '7px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'var(--tva-amber)',
                        fontWeight: 600,
                    }}>
                        In Dev
                    </span>
                </div>
            )}

            {/* Tech Tags */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {project.techStack.map((tech) => (
                    <span
                        key={tech}
                        style={{
                            fontSize: '7.5px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            padding: '3px 8px',
                            background: 'rgba(255, 153, 0, 0.04)',
                            border: '1px solid rgba(255, 153, 0, 0.15)',
                            color: 'rgba(255, 153, 0, 0.5)',
                        }}
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CASE DETAILS
═══════════════════════════════════════════════════════════════════════════ */

interface CaseDetailsProps {
    project: Project;
    index: number;
}

function CaseDetails({ project, index }: CaseDetailsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [displayTitle, setDisplayTitle] = useState('');
    const [showCursor, setShowCursor] = useState(true);

    // CRT Flicker effect
    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const tl = gsap.timeline();

        tl.set(container, { opacity: 0, filter: 'brightness(2) blur(2px)' })
            .to(container, { opacity: 1, duration: 0.03 })
            .to(container, { opacity: 0.4, filter: 'brightness(1.5) blur(1px)', duration: 0.02 })
            .to(container, { opacity: 1, filter: 'brightness(1) blur(0px)', duration: 0.03 })
            .to(container, { opacity: 0.8, duration: 0.02 })
            .to(container, { opacity: 1, duration: 0.1 });
    }, [project.id]);

    // Typewriter effect
    useEffect(() => {
        setDisplayTitle('');
        setShowCursor(true);
        let i = 0;
        const text = project.title;
        const timer = setInterval(() => {
            if (i <= text.length) {
                setDisplayTitle(text.slice(0, i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 35);
        return () => clearInterval(timer);
    }, [project.title]);

    return (
        <div
            ref={containerRef}
            className="custom-scrollbar"
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                paddingRight: '10px',
            }}
        >
            {/* Reader Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '18px',
                marginBottom: '30px',
                borderBottom: '1px solid rgba(255, 153, 0, 0.12)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--tva-red)', boxShadow: '0 0 8px var(--tva-red)' }} />
                        <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--tva-amber)', boxShadow: '0 0 8px var(--tva-amber)' }} />
                        <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#00FF00', boxShadow: '0 0 8px #00FF00' }} />
                    </div>
                    <div style={{ width: '1px', height: '16px', background: 'rgba(255, 153, 0, 0.2)' }} />
                    <span style={{
                        fontSize: '10px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        color: 'rgba(255, 153, 0, 0.5)',
                    }}>
                        Evidence Reader v4.7.2
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#00FF00',
                        boxShadow: '0 0 10px #00FF00, 0 0 20px #00FF00',
                        animation: 'pulse 2s ease-in-out infinite',
                    }} />
                    <span style={{
                        fontSize: '10px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        color: '#00FF00',
                    }}>
                        File Loaded
                    </span>
                </div>
            </div>

            {/* Case Header */}
            <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '30px',
                marginBottom: '35px',
            }}>
                {/* Large number */}
                <div style={{ position: 'relative' }}>
                    <span style={{
                        fontSize: '100px',
                        fontWeight: 100,
                        lineHeight: 0.85,
                        color: 'transparent',
                        WebkitTextStroke: '1px rgba(255, 153, 0, 0.15)',
                    }}>
                        {(index + 1).toString().padStart(2, '0')}
                    </span>
                    {/* Glow behind number */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        filter: 'blur(30px)',
                        opacity: 0.3,
                    }}>
                        <span style={{
                            fontSize: '100px',
                            fontWeight: 100,
                            color: 'var(--tva-amber)',
                        }}>
                            {(index + 1).toString().padStart(2, '0')}
                        </span>
                    </div>
                </div>

                <div style={{ paddingTop: '15px' }}>
                    {/* Case Badge */}
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '8px 18px',
                        border: '1px solid rgba(255, 153, 0, 0.5)',
                        background: 'rgba(255, 153, 0, 0.05)',
                        marginBottom: '12px',
                    }}>
                        <span style={{
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.25em',
                            color: 'var(--tva-amber)',
                        }}>
                            Case #{(index + 1).toString().padStart(3, '0')}
                        </span>
                        <div style={{ width: '1px', height: '12px', background: 'rgba(255, 153, 0, 0.3)' }} />
                        <span style={{
                            fontSize: '9px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            color: 'rgba(255, 153, 0, 0.5)',
                        }}>
                            Priority: Standard
                        </span>
                    </div>

                    {/* Status */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: project.inDevelopment ? 'var(--tva-amber)' : '#00FF00',
                            boxShadow: project.inDevelopment ? '0 0 8px var(--tva-amber)' : '0 0 8px #00FF00',
                        }} />
                        <span style={{
                            fontSize: '11px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                            color: project.inDevelopment ? 'var(--tva-amber)' : '#00FF00',
                        }}>
                            {project.inDevelopment ? 'STATUS: IN DEV' : 'STATUS: READY'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Title */}
            <h2 style={{
                fontSize: '42px',
                fontWeight: 200,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--tva-amber)',
                textShadow: '0 0 50px rgba(255, 153, 0, 0.3), 0 0 100px rgba(255, 153, 0, 0.15)',
                marginBottom: '25px',
                minHeight: '55px',
            }}>
                {displayTitle}
                {showCursor && (
                    <span style={{
                        display: 'inline-block',
                        width: '3px',
                        height: '38px',
                        background: 'var(--tva-amber)',
                        marginLeft: '6px',
                        verticalAlign: 'middle',
                        animation: 'blink 1s step-end infinite',
                        boxShadow: '0 0 10px var(--tva-amber)',
                    }} />
                )}
            </h2>

            {/* Description */}
            <p style={{
                fontSize: '15px',
                lineHeight: 2,
                color: 'rgba(255, 153, 0, 0.55)',
                maxWidth: '650px',
                marginBottom: '40px',
            }}>
                {project.description}
            </p>

            {/* Tech Stack */}
            <div style={{ marginBottom: '40px' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '18px',
                }}>
                    <div style={{ width: '25px', height: '1px', background: 'rgba(255, 153, 0, 0.3)' }} />
                    <span style={{
                        fontSize: '9px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.35em',
                        color: 'rgba(255, 153, 0, 0.45)',
                    }}>
                        Technology Artifacts
                    </span>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255, 153, 0, 0.1)' }} />
                </div>
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                    {project.techStack.map((tech, i) => (
                        <TechBadge key={tech} name={tech} delay={i * 0.1} />
                    ))}
                </div>
            </div>

            {/* Actions - Now placed after tech stack so they're visible */}
            <div style={{
                display: 'flex',
                gap: '18px',
                paddingTop: '25px',
                borderTop: '1px solid rgba(255, 153, 0, 0.1)',
                marginBottom: '20px',
            }}>
                {project.demoUrl ? (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ActionButton primary>View Live Demo</ActionButton>
                    </a>
                ) : (
                    <ActionButton primary disabled>
                        {project.inDevelopment ? 'Coming Soon' : 'View Live Demo'}
                    </ActionButton>
                )}

                {project.repoUrl ? (
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        <ActionButton>View Source Code</ActionButton>
                    </a>
                ) : (
                    <ActionButton disabled>View Source Code</ActionButton>
                )}
            </div>

            {/* Spacer pushes content up */}
            <div style={{ flex: 1 }} />
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ACTION BUTTON
═══════════════════════════════════════════════════════════════════════════ */

function ActionButton({ children, primary, disabled }: { children: React.ReactNode; primary?: boolean; disabled?: boolean }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            onMouseEnter={() => !disabled && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={disabled}
            style={{
                position: 'relative',
                padding: '14px 35px',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                background: disabled
                    ? 'rgba(255, 153, 0, 0.03)'
                    : primary
                        ? isHovered ? 'var(--tva-amber)' : 'rgba(255, 153, 0, 0.1)'
                        : isHovered ? 'rgba(255, 153, 0, 0.08)' : 'transparent',
                border: `1px solid ${disabled ? 'rgba(255, 153, 0, 0.1)' : primary ? 'var(--tva-amber)' : 'rgba(255, 153, 0, 0.3)'}`,
                color: disabled
                    ? 'rgba(255, 153, 0, 0.25)'
                    : primary
                        ? isHovered ? '#030303' : 'var(--tva-amber)'
                        : 'rgba(255, 153, 0, 0.6)',
                cursor: disabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                overflow: 'hidden',
                boxShadow: !disabled && primary && isHovered ? '0 0 30px rgba(255, 153, 0, 0.4)' : 'none',
                opacity: disabled ? 0.7 : 1,
            }}
        >
            {children}
        </button>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TECH BADGE
═══════════════════════════════════════════════════════════════════════════ */

function TechBadge({ name, delay }: { name: string; delay: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!ref.current) return;
        gsap.fromTo(ref.current,
            { opacity: 0, y: 15, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.4, delay, ease: 'back.out(1.5)' }
        );
    }, [delay]);

    return (
        <div
            ref={ref}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                padding: '12px 24px',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                background: isHovered ? 'rgba(255, 153, 0, 0.12)' : 'rgba(255, 153, 0, 0.05)',
                border: `1px solid ${isHovered ? 'rgba(255, 153, 0, 0.5)' : 'rgba(255, 153, 0, 0.25)'}`,
                color: 'var(--tva-amber)',
                cursor: 'default',
                transition: 'all 0.25s ease',
                boxShadow: isHovered ? '0 0 20px rgba(255, 153, 0, 0.15)' : 'none',
            }}
        >
            {name}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   EMPTY STATE
═══════════════════════════════════════════════════════════════════════════ */

function EmptyState() {
    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            zIndex: 5,
        }}>
            {/* Animated icon */}
            <div style={{
                position: 'relative',
                width: '120px',
                height: '120px',
                marginBottom: '30px',
            }}>
                {/* Rotating scan ring */}
                <div style={{
                    position: 'absolute',
                    inset: '-5px',
                    borderRadius: '50%',
                    border: '1px dashed rgba(255, 153, 0, 0.2)',
                    animation: 'rotateScan 8s linear infinite',
                }} />
                {/* Outer ring */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: '1px solid rgba(255, 153, 0, 0.25)',
                    animation: 'pulse 3s ease-in-out infinite',
                    boxShadow: '0 0 30px rgba(255, 153, 0, 0.1), inset 0 0 20px rgba(255, 153, 0, 0.05)',
                }} />
                {/* Inner ring */}
                <div style={{
                    position: 'absolute',
                    inset: '15px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255, 153, 0, 0.15)',
                    background: 'radial-gradient(circle, rgba(255, 153, 0, 0.05) 0%, transparent 70%)',
                }} />
                {/* Scan line */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '50%',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 153, 0, 0.5), transparent)',
                    transformOrigin: 'left center',
                    animation: 'rotateScan 4s linear infinite',
                }} />
                {/* Icon */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgba(255, 153, 0, 0.35)"
                        strokeWidth="0.5"
                    >
                        <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                </div>
            </div>

            <h3 style={{
                fontSize: '24px',
                fontWeight: 200,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'rgba(255, 153, 0, 0.35)',
                marginBottom: '12px',
            }}>
                Awaiting Selection
            </h3>
            <p style={{
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                color: 'rgba(255, 153, 0, 0.2)',
                maxWidth: '300px',
            }}>
                Select a case file from the archive to declassify evidence
            </p>

            {/* Decorative line */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginTop: '35px',
            }}>
                <div style={{ width: '50px', height: '1px', background: 'rgba(255, 153, 0, 0.1)' }} />
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', border: '1px solid rgba(255, 153, 0, 0.15)' }} />
                <div style={{ width: '50px', height: '1px', background: 'rgba(255, 153, 0, 0.1)' }} />
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CORNER BRACKETS
═══════════════════════════════════════════════════════════════════════════ */

function CornerBrackets() {
    const size = 30;
    const offset = 20;
    const color = 'rgba(255, 153, 0, 0.3)';

    const baseStyle = {
        position: 'absolute' as const,
        width: size,
        height: size,
        animation: 'cornerPop 0.6s ease-out forwards',
    };

    return (
        <>
            <div style={{
                ...baseStyle,
                top: offset,
                left: offset,
                borderTop: `1px solid ${color}`,
                borderLeft: `1px solid ${color}`,
                animationDelay: '0.1s',
                opacity: 0,
            }} />
            <div style={{
                ...baseStyle,
                top: offset,
                right: offset,
                borderTop: `1px solid ${color}`,
                borderRight: `1px solid ${color}`,
                animationDelay: '0.2s',
                opacity: 0,
            }} />
            <div style={{
                ...baseStyle,
                bottom: offset,
                left: offset,
                borderBottom: `1px solid ${color}`,
                borderLeft: `1px solid ${color}`,
                animationDelay: '0.3s',
                opacity: 0,
            }} />
            <div style={{
                ...baseStyle,
                bottom: offset,
                right: offset,
                borderBottom: `1px solid ${color}`,
                borderRight: `1px solid ${color}`,
                animationDelay: '0.4s',
                opacity: 0,
            }} />
        </>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FLOATING PARTICLES
═══════════════════════════════════════════════════════════════════════════ */

function FloatingParticles() {
    return (
        <div style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 5,
        }}>
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        width: '2px',
                        height: '2px',
                        borderRadius: '50%',
                        background: 'var(--tva-amber)',
                        opacity: 0.3,
                        left: `${15 + i * 15}%`,
                        top: `${20 + i * 10}%`,
                        animation: `float ${4 + i}s ease-in-out infinite`,
                        animationDelay: `${i * 0.5}s`,
                    }}
                />
            ))}
        </div>
    );
}

// Display names
ProjectsSection.displayName = 'ProjectsSection';
CaseFileCard.displayName = 'CaseFileCard';
CaseDetails.displayName = 'CaseDetails';
ActionButton.displayName = 'ActionButton';
TechBadge.displayName = 'TechBadge';
EmptyState.displayName = 'EmptyState';
CornerBrackets.displayName = 'CornerBrackets';
FloatingParticles.displayName = 'FloatingParticles';
