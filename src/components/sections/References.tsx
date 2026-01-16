'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useReferences } from '@/lib/data';

type Phase = 'init' | 'access' | 'granted' | 'complete';

export function ReferencesSection() {
    const REFERENCES = useReferences();
    const containerRef = useRef<HTMLDivElement>(null);
    const [phase, setPhase] = useState<Phase>('init');

    useEffect(() => {
        const sequence = async () => {
            await delay(300);
            setPhase('access');
            await delay(1000);
            setPhase('granted');
            await delay(600);
            setPhase('complete');
        };
        sequence();
    }, []);

    useEffect(() => {
        if (phase !== 'complete') return;

        gsap.fromTo('.file-card',
            { opacity: 0, y: 30, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
        );

        if (window.innerWidth > 768) {
            const handleMouse = (e: MouseEvent) => {
                const content = document.querySelector('.refs-parallax');
                if (!content) return;
                const x = (e.clientX / window.innerWidth - 0.5) * 15;
                const y = (e.clientY / window.innerHeight - 0.5) * 10;
                gsap.to(content, { x, y, duration: 0.6, ease: 'power2.out' });
            };
            window.addEventListener('mousemove', handleMouse);
            return () => window.removeEventListener('mousemove', handleMouse);
        }
    }, [phase]);

    const showContent = phase === 'complete';

    return (
        <div ref={containerRef} className="refs-section">
            <BackgroundLayers />

            {phase === 'access' && (
                <div className="boot-overlay">
                    <div className="access-row">
                        <div className="access-dot" />
                        <span className="access-text">Restricted Access</span>
                    </div>
                </div>
            )}

            {phase === 'granted' && (
                <div className="boot-overlay granted-flash">
                    <span className="granted-text">Access Granted</span>
                </div>
            )}

            <div className="refs-parallax refs-main" style={{ opacity: showContent ? 1 : 0 }}>
                <div className="refs-content">
                    {/* LEFT: CLASSIFIED PANEL */}
                    <div className="refs-left">
                        <div className="status-badge red">
                            <div className="status-dot red" />
                            <span className="status-text red">Classified Records</span>
                        </div>

                        <h1 className="refs-title">Personnel<br />Archive</h1>

                        <p className="refs-desc">
                            Authorized personnel who can verify variant credentials and timeline contributions.
                        </p>

                        <div className="instructions-card">
                            <div className="instructions-header">
                                <div className="instructions-dot" />
                                <span>Instructions</span>
                            </div>
                            <p>Hover over classified files to initiate declassification protocol.</p>
                        </div>

                        <div className="files-count">
                            <span className="count-label">Files Available</span>
                            <span className="count-value">{REFERENCES.length.toString().padStart(2, '0')}</span>
                        </div>
                    </div>

                    {/* RIGHT: FILE CARDS */}
                    <div className="refs-right">
                        <div className="grid-header">
                            <span className="grid-label">Classified Dossiers</span>
                            <div className="grid-line" />
                        </div>

                        <div className="cards-container">
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
                </div>
            </div>

            <HUDOverlay show={showContent} />
            <CornerBrackets />

            <style jsx>{`
                .refs-section {
                    position: relative;
                    height: 100vh;
                    width: 100vw;
                    overflow: hidden;
                    background: #020202;
                }
                
                .boot-overlay {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    z-index: 50;
                }
                
                .access-row { display: flex; align-items: center; gap: 12px; }
                .access-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: var(--tva-red);
                    box-shadow: 0 0 15px var(--tva-red), 0 0 30px var(--tva-red);
                    animation: pulse 0.4s ease-in-out infinite;
                }
                .access-text {
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 0.4em;
                    color: var(--tva-red);
                }
                @media (max-width: 480px) { .access-text { font-size: 11px; letter-spacing: 0.3em; } }
                
                .granted-flash { animation: crtFlash 0.15s ease-out; }
                .granted-text {
                    font-size: 16px;
                    text-transform: uppercase;
                    letter-spacing: 0.5em;
                    color: #00FF00;
                    text-shadow: 0 0 20px #00FF00, 0 0 40px #00FF00;
                }
                @media (max-width: 480px) { .granted-text { font-size: 13px; letter-spacing: 0.35em; } }
                
                @keyframes crtFlash {
                    0% { background: rgba(0, 255, 0, 0.1); }
                    100% { background: transparent; }
                }
                
                .refs-main {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    padding: 0 80px;
                    transition: opacity 0.6s ease;
                }
                @media (max-width: 1024px) { .refs-main { padding: 0 40px; } }
                @media (max-width: 768px) { .refs-main { padding: 80px 25px 40px; align-items: flex-start; overflow-y: auto; } }
                
                .refs-content {
                    display: flex;
                    gap: 80px;
                    max-width: 1400px;
                    width: 100%;
                    margin: 0 auto;
                }
                @media (max-width: 1024px) { .refs-content { gap: 40px; } }
                @media (max-width: 768px) { .refs-content { flex-direction: column; gap: 30px; } }
                
                .refs-left { width: 350px; flex-shrink: 0; }
                @media (max-width: 1024px) { .refs-left { width: 280px; } }
                @media (max-width: 768px) { .refs-left { width: 100%; text-align: center; } }
                
                .status-badge { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
                @media (max-width: 768px) { .status-badge { justify-content: center; } }
                .status-dot { width: 8px; height: 8px; border-radius: 50%; animation: pulse 1.5s ease-in-out infinite; }
                .status-dot.red { background: var(--tva-red); box-shadow: 0 0 10px var(--tva-red); }
                .status-text { font-size: 10px; text-transform: uppercase; letter-spacing: 0.35em; }
                .status-text.red { color: var(--tva-red); }
                
                .refs-title {
                    font-size: 48px;
                    font-weight: 200;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    color: var(--tva-amber);
                    text-shadow: 0 0 50px rgba(255, 153, 0, 0.3);
                    line-height: 1.05;
                    margin-bottom: 25px;
                }
                @media (max-width: 1024px) { .refs-title { font-size: 38px; } }
                @media (max-width: 768px) { .refs-title { font-size: 32px; margin-bottom: 20px; } }
                @media (max-width: 480px) { .refs-title { font-size: 26px; } }
                
                .refs-desc {
                    font-size: 13px;
                    line-height: 1.9;
                    color: rgba(255, 153, 0, 0.45);
                    margin-bottom: 35px;
                    max-width: 280px;
                }
                @media (max-width: 768px) { .refs-desc { max-width: 100%; margin: 0 auto 25px; } }
                
                .instructions-card {
                    padding: 18px 22px;
                    background: rgba(255, 51, 51, 0.03);
                    border: 1px solid rgba(255, 51, 51, 0.2);
                }
                @media (max-width: 768px) { .instructions-card { max-width: 300px; margin: 0 auto; } }
                .instructions-header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
                .instructions-header span { font-size: 9px; text-transform: uppercase; letter-spacing: 0.3em; color: var(--tva-red); }
                .instructions-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--tva-red); animation: pulse 1s ease-in-out infinite; }
                .instructions-card p { font-size: 11px; color: rgba(255, 153, 0, 0.4); line-height: 1.7; }
                
                .files-count { margin-top: 30px; display: flex; align-items: center; gap: 15px; }
                @media (max-width: 768px) { .files-count { justify-content: center; } }
                .count-label { font-size: 9px; text-transform: uppercase; letter-spacing: 0.3em; color: rgba(255, 153, 0, 0.35); }
                .count-value { font-size: 18px; color: var(--tva-amber); font-family: monospace; }
                
                .refs-right { flex: 1; display: flex; flex-direction: column; gap: 20px; }
                
                .grid-header {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    margin-bottom: 10px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid rgba(255, 153, 0, 0.1);
                }
                @media (max-width: 768px) { .grid-header { justify-content: center; } }
                .grid-label { font-size: 9px; text-transform: uppercase; letter-spacing: 0.35em; color: rgba(255, 153, 0, 0.4); }
                .grid-line { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(255, 153, 0, 0.15), transparent); }
                @media (max-width: 768px) { .grid-line { display: none; } }
                
                .cards-container { display: flex; flex-direction: column; gap: 20px; }
                @media (max-width: 768px) { .cards-container { gap: 15px; } }
            `}</style>
        </div>
    );
}

interface ClassifiedCardProps {
    name: string;
    company: string;
    index: number;
}

function ClassifiedCard({ name, company, index }: ClassifiedCardProps) {
    const [isRevealed, setIsRevealed] = useState(false);

    return (
        <div
            className="file-card card"
            onMouseEnter={() => setIsRevealed(true)}
            onMouseLeave={() => setIsRevealed(false)}
            onTouchStart={() => setIsRevealed(true)}
            onTouchEnd={() => setTimeout(() => setIsRevealed(false), 2000)}
        >
            <div className="shimmer" style={{ transform: isRevealed ? 'translateX(100%)' : 'translateX(-100%)' }} />

            <div className="file-tab" style={{ color: isRevealed ? 'var(--tva-amber)' : 'rgba(255, 153, 0, 0.35)' }}>
                File #{(index + 1).toString().padStart(3, '0')}
            </div>

            <div className="card-content">
                <div className="card-info">
                    <div className="name-container">
                        <h3 style={{ color: isRevealed ? 'var(--tva-amber)' : 'transparent', textShadow: isRevealed ? '0 0 30px rgba(255, 153, 0, 0.4)' : 'none' }}>
                            {name}
                        </h3>
                        <div className="redaction" style={{ transform: isRevealed ? 'translateX(110%)' : 'translateX(0)' }}>
                            <div className="redact-bar long" />
                            <div className="redact-bar short" />
                        </div>
                    </div>
                    <div className="company-container">
                        <p style={{ color: isRevealed ? 'rgba(255, 153, 0, 0.55)' : 'transparent' }}>
                            {company}
                        </p>
                        <div className="redaction delay" style={{ transform: isRevealed ? 'translateX(110%)' : 'translateX(0)' }}>
                            <div className="redact-bar medium" />
                        </div>
                    </div>
                </div>

                <div className="stamp" style={{ opacity: isRevealed ? 1 : 0, transform: isRevealed ? 'rotate(-6deg) scale(1)' : 'rotate(-6deg) scale(0.85)' }}>
                    CLEARED
                </div>
            </div>

            <style jsx>{`
                .card {
                    position: relative;
                    padding: 30px 35px;
                    background: ${isRevealed ? 'linear-gradient(135deg, rgba(255, 153, 0, 0.08) 0%, rgba(255, 153, 0, 0.02) 100%)' : 'rgba(255, 153, 0, 0.015)'};
                    border: 1px solid ${isRevealed ? 'rgba(255, 153, 0, 0.4)' : 'rgba(255, 153, 0, 0.08)'};
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: ${isRevealed ? '0 0 40px rgba(255, 153, 0, 0.1), inset 0 0 30px rgba(255, 153, 0, 0.03)' : 'none'};
                    overflow: hidden;
                }
                @media (max-width: 768px) { .card { padding: 25px 20px; } }
                
                .shimmer {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(90deg, transparent, rgba(255, 153, 0, 0.08), transparent);
                    transition: transform 0.8s ease;
                    pointer-events: none;
                }
                
                .file-tab {
                    position: absolute;
                    top: -1px;
                    left: 30px;
                    padding: 6px 15px;
                    background: #020202;
                    border: 1px solid rgba(255, 153, 0, 0.15);
                    border-top: none;
                    font-size: 9px;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    transition: color 0.3s ease;
                }
                @media (max-width: 768px) { .file-tab { left: 20px; padding: 5px 12px; font-size: 8px; } }
                
                .card-content { display: flex; align-items: center; justify-content: space-between; margin-top: 10px; }
                @media (max-width: 600px) { .card-content { flex-direction: column; align-items: flex-start; gap: 15px; } }
                
                .card-info { flex: 1; }
                
                .name-container { position: relative; margin-bottom: 8px; }
                .name-container h3 {
                    font-size: 26px;
                    font-weight: 500;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    transition: all 0.4s ease;
                }
                @media (max-width: 768px) { .name-container h3 { font-size: 20px; } }
                @media (max-width: 480px) { .name-container h3 { font-size: 18px; } }
                
                .company-container { position: relative; }
                .company-container p {
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    transition: all 0.4s ease 0.1s;
                }
                @media (max-width: 480px) { .company-container p { font-size: 11px; } }
                
                .redaction {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    justify-content: center;
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .redaction.delay { transition-delay: 0.1s; }
                
                .redact-bar { height: 8px; background: rgba(255, 153, 0, 0.08); border-radius: 2px; }
                .redact-bar.long { width: 80%; }
                .redact-bar.short { width: 50%; }
                .redact-bar.medium { width: 60%; height: 6px; }
                
                .stamp {
                    padding: 10px 20px;
                    border: 3px solid #00FF00;
                    color: #00FF00;
                    font-size: 14px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    text-shadow: 0 0 10px #00FF00;
                    box-shadow: 0 0 20px rgba(0, 255, 0, 0.2);
                    transition: all 0.4s ease 0.15s;
                    flex-shrink: 0;
                }
                @media (max-width: 768px) { .stamp { padding: 8px 15px; font-size: 12px; } }
                @media (max-width: 600px) { .stamp { align-self: flex-end; } }
            `}</style>
        </div>
    );
}

function BackgroundLayers() {
    return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 90% 70% at 15% 40%, rgba(255, 51, 51, 0.02) 0%, transparent 45%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 85% 60%, rgba(255, 153, 0, 0.02) 0%, transparent 40%)' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255, 153, 0, 0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 153, 0, 0.012) 1px, transparent 1px)', backgroundSize: '65px 65px' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 25%, rgba(0,0,0,0.55) 100%)' }} />
        </div>
    );
}

function HUDOverlay({ show }: { show: boolean }) {
    if (!show) return null;
    return (
        <>
            <div className="hud hud-tl"><div className="hud-label">ARCHIVE</div><div className="hud-value">PERSONNEL RECORDS</div></div>
            <div className="hud hud-tr">
                <div className="hud-label">CLEARANCE</div>
                <div className="hud-status"><div className="hud-dot" /><span>AUTHORIZED</span></div>
            </div>
            <div className="hud hud-br"><div className="hud-dot" /><span className="hud-small">Archive Secure</span></div>
            <style jsx>{`
                .hud { position: absolute; opacity: 0; animation: fadeIn 0.5s ease 0.5s forwards; }
                .hud-tl { top: 30px; left: 35px; }
                .hud-tr { top: 30px; right: 35px; text-align: right; }
                .hud-br { bottom: 30px; right: 35px; display: flex; align-items: center; gap: 10px; animation-delay: 0.8s; }
                .hud-label { font-size: 8px; color: rgba(255, 153, 0, 0.3); letter-spacing: 0.3em; margin-bottom: 4px; }
                .hud-value { font-size: 10px; color: rgba(255, 153, 0, 0.5); letter-spacing: 0.2em; }
                .hud-status { display: flex; align-items: center; justify-content: flex-end; gap: 6px; }
                .hud-status span { font-size: 9px; color: #00FF00; letter-spacing: 0.15em; }
                .hud-dot { width: 6px; height: 6px; border-radius: 50%; background: #00FF00; box-shadow: 0 0 8px #00FF00; }
                .hud-small { font-size: 9px; text-transform: uppercase; letter-spacing: 0.25em; color: rgba(255, 153, 0, 0.35); }
                @media (max-width: 768px) { .hud { display: none; } }
            `}</style>
        </>
    );
}

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

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

ReferencesSection.displayName = 'ReferencesSection';
ClassifiedCard.displayName = 'ClassifiedCard';
BackgroundLayers.displayName = 'BackgroundLayers';
HUDOverlay.displayName = 'HUDOverlay';
CornerBrackets.displayName = 'CornerBrackets';
