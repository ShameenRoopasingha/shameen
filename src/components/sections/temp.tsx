'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { REFERENCES } from '@/lib/data';

export function ReferencesSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentRef.current) return;

        gsap.fromTo(
            contentRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.8, ease: 'power3.out' }
        );
    }, []);

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
            {/* Section Title */}
            <div
                className="absolute top-8 left-8 z-10"
                style={{ color: 'rgba(255, 153, 0, 0.6)' }}
            >
                <span className="text-xs uppercase tracking-[0.3em]">Personnel Archive</span>
                <div
                    className="mt-2 w-12 h-px"
                    style={{ background: 'var(--tva-amber)' }}
                />
            </div>

            {/* Main Content */}
            <div ref={contentRef} className="h-full flex items-center px-8 lg:px-20">
                <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-20">

                    {/* Left Side - Header */}
                    <div className="lg:w-1/3 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-6">
                            <div
                                className="w-4 h-4 rounded-full"
                                style={{
                                    background: 'var(--tva-red)',
                                    boxShadow: '0 0 20px var(--tva-red)',
                                }}
                            />
                            <span
                                className="text-sm uppercase tracking-[0.3em]"
                                style={{ color: 'var(--tva-red)' }}
                            >
                                Restricted Access
                            </span>
                        </div>

                        <h2
                            className="text-4xl lg:text-5xl uppercase tracking-wider mb-6 crt-glow"
                            style={{ color: 'var(--tva-amber)' }}
                        >
                            Classified<br />Files
                        </h2>

                        <p
                            className="text-sm leading-relaxed mb-8"
                            style={{ color: 'rgba(255, 153, 0, 0.5)' }}
                        >
                            Authorized personnel who can verify variant credentials and timeline contributions.
                        </p>

                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest"
                            style={{
                                border: '1px solid var(--tva-red)',
                                color: 'var(--tva-red)',
                            }}
                        >
                            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--tva-red)' }} />
                            Hover to declassify
                        </div>
                    </div>

                    {/* Right Side - File Cards */}
                    <div className="lg:w-2/3 flex flex-col gap-8">
                        {REFERENCES.map((ref, index) => (
                            <FileCard
                                key={ref.id}
                                name={ref.name}
                                company={ref.company}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid Background */}
            <div
                className="absolute inset-0 pointer-events-none opacity-5"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255, 153, 0, 0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 153, 0, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                }}
            />
        </div>
    );
}

interface FileCardProps {
    name: string;
    company: string;
    index: number;
}

function FileCard({ name, company, index }: FileCardProps) {
    const [isRevealed, setIsRevealed] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={cardRef}
            className="relative p-8 cursor-pointer transition-all duration-300"
            style={{
                background: isRevealed ? 'rgba(255, 153, 0, 0.05)' : 'rgba(5, 4, 4, 0.8)',
                border: `1px solid ${isRevealed ? 'var(--tva-amber)' : 'rgba(255, 153, 0, 0.2)'}`,
                boxShadow: isRevealed ? '0 0 30px rgba(255, 153, 0, 0.1)' : 'none',
            }}
            onMouseEnter={() => setIsRevealed(true)}
            onMouseLeave={() => setIsRevealed(false)}
        >
            {/* File Tab */}
            <div
                className="absolute -top-4 left-8 px-4 py-2 text-xs uppercase tracking-widest"
                style={{
                    background: 'var(--tva-void)',
                    border: '1px solid rgba(255, 153, 0, 0.3)',
                    borderBottom: 'none',
                    color: 'rgba(255, 153, 0, 0.6)',
                }}
            >
                File #{(index + 1).toString().padStart(3, '0')}
            </div>

            <div className="flex justify-between items-start">
                <div className="flex-1">
                    {/* Name */}
                    <div className="relative mb-4">
                        <h3
                            className="text-2xl lg:text-3xl uppercase tracking-wider font-bold transition-all duration-500"
                            style={{
                                color: isRevealed ? 'var(--tva-amber)' : 'transparent',
                                textShadow: isRevealed ? '0 0 15px rgba(255, 153, 0, 0.5)' : 'none',
                            }}
                        >
                            {name}
                        </h3>
                        {/* Redaction bars */}
                        <div
                            className="absolute inset-0 flex flex-col gap-2 transition-transform duration-500"
                            style={{
                                transform: isRevealed ? 'translateX(120%)' : 'translateX(0)',
                            }}
                        >
                            <div className="h-4 w-3/4" style={{ background: 'var(--tva-void)' }} />
                            <div className="h-4 w-1/2" style={{ background: 'var(--tva-void)' }} />
                        </div>
                    </div>

                    {/* Company */}
                    <div className="relative">
                        <p
                            className="text-lg uppercase tracking-widest transition-all duration-500 delay-100"
                            style={{
                                color: isRevealed ? 'rgba(255, 153, 0, 0.7)' : 'transparent',
                            }}
                        >
                            {company}
                        </p>
                        {/* Redaction bars */}
                        <div
                            className="absolute inset-0 transition-transform duration-500 delay-100"
                            style={{
                                transform: isRevealed ? 'translateX(120%)' : 'translateX(0)',
                            }}
                        >
                            <div className="h-4 w-2/3" style={{ background: 'var(--tva-void)' }} />
                        </div>
                    </div>
                </div>

                {/* Cleared Stamp */}
                <div
                    className="transition-all duration-500 delay-200"
                    style={{
                        opacity: isRevealed ? 1 : 0,
                        transform: isRevealed ? 'rotate(-5deg) scale(1)' : 'rotate(-5deg) scale(0.8)',
                    }}
                >
                    <div
                        className="px-4 py-2 text-lg font-bold uppercase tracking-widest"
                        style={{
                            color: 'var(--tva-red)',
                            border: '3px solid var(--tva-red)',
                        }}
                    >
                        CLEARED
                    </div>
                </div>
            </div>
        </div>
    );
}


ReferencesSection.displayName = 'ReferencesSection';
FileCard.displayName = 'FileCard';


