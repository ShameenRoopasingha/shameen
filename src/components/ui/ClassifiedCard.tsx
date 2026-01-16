'use client';

import { useState } from 'react';

interface ClassifiedCardProps {
    name: string;
    company: string;
    index?: number;
}

export function ClassifiedCard({ name, company, index = 0 }: ClassifiedCardProps) {
    const [isRevealed, setIsRevealed] = useState(false);

    return (
        <div
            className="relative p-6 transition-all duration-300"
            style={{
                background: 'rgba(255, 153, 0, 0.05)',
                border: '1px solid rgba(255, 153, 0, 0.2)',
            }}
            onMouseEnter={() => setIsRevealed(true)}
            onMouseLeave={() => setIsRevealed(false)}
        >
            {/* Folder Tab */}
            <div
                className="absolute -top-3 left-4 px-2 py-1 text-xs uppercase tracking-widest"
                style={{
                    background: 'var(--tva-void)',
                    border: '1px solid rgba(255, 153, 0, 0.3)',
                    borderBottom: 'none',
                    color: 'var(--tva-amber)',
                }}
            >
                Ref #{(index + 1).toString().padStart(3, '0')}
            </div>

            {/* Content */}
            <div className="mt-2 space-y-2">
                <div className="relative overflow-hidden">
                    <span
                        className="block text-lg font-bold uppercase tracking-wider transition-all duration-300"
                        style={{
                            color: isRevealed ? 'var(--tva-amber)' : 'transparent',
                            background: isRevealed ? 'transparent' : 'var(--tva-void)',
                            textShadow: isRevealed ? '0 0 10px rgba(255, 153, 0, 0.5)' : 'none',
                        }}
                    >
                        {name}
                    </span>
                    {/* Redaction overlay */}
                    <div
                        className="absolute inset-0 transition-transform duration-300"
                        style={{
                            background: 'var(--tva-void)',
                            transform: isRevealed ? 'translateX(100%)' : 'translateX(0)',
                        }}
                    />
                </div>

                <div className="relative overflow-hidden">
                    <span
                        className="block text-sm uppercase tracking-widest transition-all duration-300"
                        style={{
                            color: isRevealed ? 'rgba(255, 153, 0, 0.7)' : 'transparent',
                            background: isRevealed ? 'transparent' : 'var(--tva-void)',
                        }}
                    >
                        {company}
                    </span>
                    {/* Redaction overlay */}
                    <div
                        className="absolute inset-0 transition-transform duration-300 delay-75"
                        style={{
                            background: 'var(--tva-void)',
                            transform: isRevealed ? 'translateX(100%)' : 'translateX(0)',
                        }}
                    />
                </div>
            </div>

            {/* Cleared Stamp */}
            <div
                className="absolute bottom-4 right-4 transition-all duration-300"
                style={{
                    opacity: isRevealed ? 1 : 0,
                    transform: isRevealed ? 'rotate(-5deg) scale(1)' : 'rotate(-5deg) scale(0.8)',
                }}
            >
                <span
                    className="inline-block px-2 py-1 text-xs font-bold uppercase"
                    style={{
                        color: 'var(--tva-red)',
                        border: '2px solid var(--tva-red)',
                        letterSpacing: '0.1em',
                    }}
                >
                    CLEARED
                </span>
            </div>
        </div>
    );
}


ClassifiedCard.displayName = 'ClassifiedCard';

