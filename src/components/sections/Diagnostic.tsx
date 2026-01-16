'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { VoltageBar } from '@/components/ui/VoltageBar';
import { ClassifiedCard } from '@/components/ui/ClassifiedCard';
import { TerminalInput } from '@/components/ui/TerminalInput';
import { useSkills, useReferences } from '@/lib/data';

export function DiagnosticSection() {
    const SKILLS = useSkills();
    const REFERENCES = useReferences();
    const containerRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSubmitted(true);

        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', message: '' });
        }, 3000);
    };

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
                <span className="text-xs uppercase tracking-[0.3em]">System Diagnostic</span>
                <div
                    className="mt-2 w-12 h-px"
                    style={{ background: 'var(--tva-amber)' }}
                />
            </div>

            {/* Main Content - Two Column Layout */}
            <div className="h-full flex items-center justify-center px-8 lg:px-16">
                <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* Left Column - Skills (Takes 50% width) */}
                    <div className="lg:w-1/2">
                        <div
                            className="h-full p-8 lg:p-10"
                            style={{
                                background: 'rgba(5, 4, 4, 0.8)',
                                border: '1px solid rgba(255, 153, 0, 0.3)',
                            }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div
                                    className="w-3 h-3 rounded-full animate-pulse"
                                    style={{
                                        background: 'var(--tva-amber)',
                                        boxShadow: '0 0 10px var(--tva-amber)',
                                    }}
                                />
                                <h3
                                    className="text-lg uppercase tracking-[0.2em]"
                                    style={{ color: 'var(--tva-amber)' }}
                                >
                                    Voltage Readings
                                </h3>
                            </div>

                            <div className="space-y-6">
                                {SKILLS.map((skill, index) => (
                                    <VoltageBar
                                        key={skill.name}
                                        name={skill.name}
                                        level={skill.level}
                                        index={index}
                                    />
                                ))}
                            </div>

                            {/* Skills Summary */}
                            <div
                                className="mt-8 pt-6 text-xs uppercase tracking-widest"
                                style={{
                                    borderTop: '1px solid rgba(255, 153, 0, 0.2)',
                                    color: 'rgba(255, 153, 0, 0.5)',
                                }}
                            >
                                All systems operational
                            </div>
                        </div>
                    </div>

                    {/* Right Column - References + Contact (Stacked) */}
                    <div className="lg:w-1/2 flex flex-col gap-8">

                        {/* References Panel */}
                        <div
                            className="p-8"
                            style={{
                                background: 'rgba(5, 4, 4, 0.8)',
                                border: '1px solid rgba(255, 153, 0, 0.3)',
                            }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{
                                        background: 'var(--tva-red)',
                                        boxShadow: '0 0 10px var(--tva-red)',
                                    }}
                                />
                                <h3
                                    className="text-lg uppercase tracking-[0.2em]"
                                    style={{ color: 'var(--tva-amber)' }}
                                >
                                    Classified Files
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {REFERENCES.map((ref, index) => (
                                    <ClassifiedCard
                                        key={ref.id}
                                        name={ref.name}
                                        company={ref.company}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Contact Panel */}
                        <div
                            className="flex-1 p-8"
                            style={{
                                background: 'rgba(5, 4, 4, 0.8)',
                                border: '1px solid rgba(255, 153, 0, 0.3)',
                            }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{
                                        background: '#00FF00',
                                        boxShadow: '0 0 10px #00FF00',
                                    }}
                                />
                                <h3
                                    className="text-lg uppercase tracking-[0.2em]"
                                    style={{ color: 'var(--tva-amber)' }}
                                >
                                    Secure Uplink Terminal
                                </h3>
                            </div>

                            {isSubmitted ? (
                                <SubmissionSuccess />
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <TerminalInput
                                            label="Designation"
                                            name="name"
                                            value={formData.name}
                                            onChange={(value) => setFormData({ ...formData, name: value })}
                                        />

                                        <TerminalInput
                                            label="Uplink Address"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(value) => setFormData({ ...formData, email: value })}
                                        />
                                    </div>

                                    <TerminalInput
                                        label="Transmission"
                                        name="message"
                                        type="textarea"
                                        value={formData.message}
                                        onChange={(value) => setFormData({ ...formData, message: value })}
                                        rows={3}
                                    />

                                    <button
                                        type="submit"
                                        className="w-full mt-4 py-3 text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:shadow-lg"
                                        style={{
                                            background: isSubmitting ? 'rgba(255, 153, 0, 0.2)' : 'transparent',
                                            border: '2px solid var(--tva-amber)',
                                            color: 'var(--tva-amber)',
                                            boxShadow: isSubmitting ? '0 0 20px rgba(255, 153, 0, 0.3)' : 'none',
                                        }}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center gap-3">
                                                <span className="w-2 h-2 rounded-full animate-ping" style={{ background: 'var(--tva-amber)' }} />
                                                Establishing Uplink...
                                            </span>
                                        ) : (
                                            'TRANSMIT'
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline Status */}
            <TimelineStatus />

            {/* Decorative Grid */}
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

function SubmissionSuccess() {
    const messageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!messageRef.current) return;

        gsap.fromTo(
            messageRef.current,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.5, ease: 'power4.out' }
        );
    }, []);

    return (
        <div
            ref={messageRef}
            className="flex flex-col items-center justify-center py-8 text-center"
        >
            <div
                className="w-16 h-16 rounded-full mb-4 flex items-center justify-center"
                style={{
                    border: '2px solid #00FF00',
                    boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)',
                }}
            >
                <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="#00FF00"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            </div>

            <span
                className="text-lg uppercase tracking-widest mb-1"
                style={{ color: '#00FF00' }}
            >
                Transmission Complete
            </span>

            <span
                className="text-xs uppercase tracking-widest"
                style={{ color: 'rgba(0, 255, 0, 0.6)' }}
            >
                Uplink Established
            </span>
        </div>
    );
}

function TimelineStatus() {
    const statusRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!statusRef.current) return;

        gsap.fromTo(
            statusRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1, delay: 1 }
        );
    }, []);

    return (
        <div
            ref={statusRef}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3"
            style={{
                background: 'rgba(5, 4, 4, 0.8)',
                border: '1px solid rgba(0, 255, 0, 0.3)',
            }}
        >
            <div
                className="w-3 h-3 rounded-full animate-pulse"
                style={{
                    background: '#00FF00',
                    boxShadow: '0 0 15px #00FF00',
                }}
            />
            <span
                className="text-sm uppercase tracking-[0.3em]"
                style={{ color: '#00FF00' }}
            >
                Timeline Stable
            </span>
        </div>
    );
}
