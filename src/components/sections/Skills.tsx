'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useSkills } from '@/lib/data';

type Phase = 'init' | 'analyzing' | 'complete';

export function SkillsSection() {
    const SKILLS = useSkills();
    const containerRef = useRef<HTMLDivElement>(null);
    const [phase, setPhase] = useState<Phase>('init');
    const [analysisProgress, setAnalysisProgress] = useState(0);

    useEffect(() => {
        const sequence = async () => {
            await delay(300);
            setPhase('analyzing');

            const progressInterval = setInterval(() => {
                setAnalysisProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(progressInterval);
                        return 100;
                    }
                    return prev + 5;
                });
            }, 50);

            await delay(1200);
            setPhase('complete');
        };
        sequence();
    }, []);

    useEffect(() => {
        if (phase !== 'complete') return;

        gsap.fromTo('.skill-row',
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
        );

        if (window.innerWidth > 768) {
            const handleMouse = (e: MouseEvent) => {
                const content = document.querySelector('.skills-parallax');
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
        <div ref={containerRef} className="skills-section">
            <BackgroundLayers />

            {phase === 'analyzing' && (
                <div className="boot-overlay">
                    <div className="analyzing-row">
                        <div className="analyzing-dot" />
                        <span className="analyzing-text">Analyzing Capabilities</span>
                    </div>
                    <div className="progress-container">
                        <div className="progress-track">
                            <div className="progress-fill" style={{ width: `${analysisProgress}%` }} />
                        </div>
                        <div className="progress-value">{analysisProgress}%</div>
                    </div>
                </div>
            )}

            <div
                className="skills-parallax skills-main"
                style={{ opacity: showContent ? 1 : 0 }}
            >
                <div className="skills-content">
                    {/* LEFT: DIAGNOSTIC PANEL */}
                    <div className="skills-left">
                        <div className="status-badge">
                            <div className="status-dot green" />
                            <span className="status-text green">Analysis Complete</span>
                        </div>

                        <h1 className="skills-title">Voltage<br />Readings</h1>

                        <p className="skills-desc">
                            Technical proficiency levels measured and calibrated for optimal timeline operations.
                        </p>

                        <div className="stats-card">
                            <div className="stat-row">
                                <span className="stat-label">Total Metrics</span>
                                <span className="stat-value">{SKILLS.length}</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">Avg Proficiency</span>
                                <span className="stat-value">{Math.round(SKILLS.reduce((a, b) => a + b.level, 0) / SKILLS.length)}%</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">Status</span>
                                <span className="stat-value green">Operational</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: SKILL METERS */}
                    <div className="skills-right">
                        <div className="grid-header">
                            <span className="grid-label">Capability Matrix</span>
                            <div className="grid-line" />
                            <span className="grid-status">Live Readings</span>
                        </div>

                        <div className="skills-grid">
                            {SKILLS.map((skill, index) => (
                                <SkillMeter
                                    key={skill.name}
                                    name={skill.name}
                                    level={skill.level}
                                    index={index}
                                    isComplete={showContent}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <HUDOverlay show={showContent} />
            <CornerBrackets />

            <style jsx>{`
                .skills-section {
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
                
                .analyzing-row { display: flex; align-items: center; gap: 12px; margin-bottom: 25px; }
                .analyzing-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: var(--tva-amber);
                    box-shadow: 0 0 15px var(--tva-amber), 0 0 30px var(--tva-amber);
                    animation: pulse 0.5s ease-in-out infinite;
                }
                .analyzing-text {
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.4em;
                    color: var(--tva-amber);
                }
                @media (max-width: 480px) { .analyzing-text { font-size: 10px; letter-spacing: 0.3em; } }
                
                .progress-container { width: 220px; }
                @media (max-width: 480px) { .progress-container { width: 180px; } }
                .progress-track {
                    height: 3px;
                    background: rgba(255, 153, 0, 0.1);
                    border: 1px solid rgba(255, 153, 0, 0.2);
                }
                .progress-fill {
                    height: 100%;
                    background: var(--tva-amber);
                    box-shadow: 0 0 10px var(--tva-amber);
                    transition: width 0.05s linear;
                }
                .progress-value {
                    margin-top: 8px;
                    text-align: center;
                    font-size: 10px;
                    color: rgba(255, 153, 0, 0.5);
                    font-family: monospace;
                }
                
                .skills-main {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    padding: 0 80px;
                    transition: opacity 0.6s ease;
                }
                @media (max-width: 1024px) { .skills-main { padding: 0 40px; } }
                @media (max-width: 768px) { .skills-main { padding: 80px 25px 40px; align-items: flex-start; overflow-y: auto; } }
                
                .skills-content {
                    display: flex;
                    gap: 80px;
                    max-width: 1400px;
                    width: 100%;
                    margin: 0 auto;
                }
                @media (max-width: 1024px) { .skills-content { gap: 40px; } }
                @media (max-width: 768px) { .skills-content { flex-direction: column; gap: 30px; } }
                
                .skills-left { width: 380px; flex-shrink: 0; }
                @media (max-width: 1024px) { .skills-left { width: 300px; } }
                @media (max-width: 768px) { .skills-left { width: 100%; text-align: center; } }
                
                .status-badge { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
                @media (max-width: 768px) { .status-badge { justify-content: center; } }
                .status-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                }
                .status-dot.green { background: #00FF00; box-shadow: 0 0 10px #00FF00; }
                .status-text {
                    font-size: 10px;
                    text-transform: uppercase;
                    letter-spacing: 0.35em;
                }
                .status-text.green { color: #00FF00; }
                
                .skills-title {
                    font-size: 52px;
                    font-weight: 200;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    color: var(--tva-amber);
                    text-shadow: 0 0 50px rgba(255, 153, 0, 0.3);
                    line-height: 1.05;
                    margin-bottom: 25px;
                    animation: titleGlow 3s ease-in-out infinite;
                }
                @media (max-width: 1024px) { .skills-title { font-size: 40px; } }
                @media (max-width: 768px) { .skills-title { font-size: 36px; margin-bottom: 20px; } }
                @media (max-width: 480px) { .skills-title { font-size: 28px; } }
                
                .skills-desc {
                    font-size: 13px;
                    line-height: 1.9;
                    color: rgba(255, 153, 0, 0.45);
                    margin-bottom: 30px;
                    max-width: 300px;
                }
                @media (max-width: 768px) { .skills-desc { max-width: 100%; margin: 0 auto 25px; } }
                
                .stats-card {
                    padding: 20px;
                    background: rgba(255, 153, 0, 0.02);
                    border: 1px solid rgba(255, 153, 0, 0.12);
                    overflow: hidden;
                }
                .stats-card::before { display: none; }
                @media (max-width: 768px) { .stats-card { max-width: 300px; margin: 0 auto; } }
                
                .stat-row { display: flex; justify-content: space-between; margin-bottom: 12px; }
                .stat-row.border { margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid rgba(255, 153, 0, 0.08); }
                .stat-row:last-child { margin-bottom: 0; }
                .stat-label { font-size: 9px; text-transform: uppercase; letter-spacing: 0.3em; color: rgba(255, 153, 0, 0.4); }
                .stat-value { font-size: 11px; color: var(--tva-amber); font-family: monospace; }
                .stat-value.green { font-size: 9px; color: #00FF00; letter-spacing: 0.15em; }
                
                .skills-right { flex: 1; }
                
                .grid-header {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    margin-bottom: 25px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid rgba(255, 153, 0, 0.1);
                }
                @media (max-width: 768px) { .grid-header { justify-content: center; flex-wrap: wrap; gap: 10px; } }
                .grid-label { font-size: 9px; text-transform: uppercase; letter-spacing: 0.35em; color: rgba(255, 153, 0, 0.4); }
                .grid-line { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(255, 153, 0, 0.15), transparent); }
                @media (max-width: 768px) { .grid-line { display: none; } }
                .grid-status { font-size: 9px; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255, 153, 0, 0.3); }
                
                .skills-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 12px 30px;
                }
                @media (max-width: 900px) { .skills-grid { gap: 10px 20px; } }
                @media (max-width: 600px) { .skills-grid { grid-template-columns: 1fr; gap: 10px; } }
            `}</style>
        </div>
    );
}

interface SkillMeterProps {
    name: string;
    level: number;
    index: number;
    isComplete: boolean;
}

function SkillMeter({ name, level, index, isComplete }: SkillMeterProps) {
    const fillRef = useRef<HTMLDivElement>(null);
    const [displayLevel, setDisplayLevel] = useState(0);

    useEffect(() => {
        if (!isComplete || !fillRef.current) return;

        gsap.fromTo(fillRef.current,
            { width: '0%' },
            { width: `${level}%`, duration: 1, delay: 0.3 + index * 0.1, ease: 'power3.out' }
        );

        const delayMs = 300 + index * 100;
        const duration = 1000;

        setTimeout(() => {
            const startTime = Date.now();
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                setDisplayLevel(Math.round(level * progress));
                if (progress < 1) requestAnimationFrame(animate);
            };
            animate();
        }, delayMs);
    }, [isComplete, level, index]);

    return (
        <div className="skill-row meter-card">
            <div className="meter-header">
                <span className="meter-name">{name}</span>
                <span className="meter-value">{displayLevel}%</span>
            </div>
            <div className="meter-track">
                <div ref={fillRef} className="meter-fill">
                    <div className="meter-tip" />
                </div>
            </div>
            <style jsx>{`
                .meter-card {
                    padding: 16px 20px;
                    background: rgba(255, 153, 0, 0.015);
                    border: 1px solid rgba(255, 153, 0, 0.1);
                    transition: all 0.3s ease;
                }
                .meter-card:hover {
                    background: rgba(255, 153, 0, 0.04);
                    border-color: rgba(255, 153, 0, 0.25);
                }
                .meter-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
                .meter-name { font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--tva-amber); font-weight: 500; }
                .meter-value { font-size: 16px; font-weight: 600; color: var(--tva-amber); font-family: monospace; text-shadow: 0 0 15px rgba(255, 153, 0, 0.3); }
                @media (max-width: 480px) { .meter-name { font-size: 11px; } .meter-value { font-size: 14px; } }
                .meter-track {
                    height: 6px;
                    background: rgba(255, 153, 0, 0.08);
                    border: 1px solid rgba(255, 153, 0, 0.15);
                    position: relative;
                    overflow: hidden;
                }
                .meter-fill {
                    height: 100%;
                    width: 0%;
                    background: linear-gradient(90deg, rgba(255, 153, 0, 0.6), var(--tva-amber));
                    box-shadow: 0 0 20px rgba(255, 153, 0, 0.4);
                    position: relative;
                }
                .meter-tip {
                    position: absolute;
                    right: 0;
                    top: -2px;
                    bottom: -2px;
                    width: 4px;
                    background: var(--tva-amber);
                    box-shadow: 0 0 15px var(--tva-amber), 0 0 30px var(--tva-amber);
                }
            `}</style>
        </div>
    );
}

function BackgroundLayers() {
    return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {/* Deep radial gradient - Enhanced */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 100% 60% at 50% 40%, rgba(255, 153, 0, 0.12) 0%, rgba(255, 100, 0, 0.04) 40%, transparent 70%)' }} />
            {/* Secondary glow */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 70% 80%, rgba(255, 153, 0, 0.02) 0%, transparent 40%)' }} />
            {/* Grid pattern overlay */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255, 153, 0, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 153, 0, 0.015) 1px, transparent 1px)', backgroundSize: '80px 80px', opacity: 0.5 }} />
            {/* CRT Scanlines */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(255, 153, 0, 0.03) 2px, rgba(255, 153, 0, 0.03) 4px)', zIndex: 100 }} />
            {/* Vignette effect */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 0%, rgba(0,0,0,0.2) 100%)', zIndex: 50 }} />
        </div>
    );
}

function HUDOverlay({ show }: { show: boolean }) {
    if (!show) return null;
    return (
        <>
            <div className="hud hud-tl"><div className="hud-label">DIAGNOSTIC</div><div className="hud-value">SKILL MATRIX</div></div>
            <div className="hud hud-tr">
                <div className="hud-label">CALIBRATION</div>
                <div className="hud-status"><div className="hud-dot" /><span>VERIFIED</span></div>
            </div>
            <div className="hud hud-br"><div className="hud-dot" /><span className="hud-small">Systems Nominal</span></div>
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

SkillsSection.displayName = 'SkillsSection';
SkillMeter.displayName = 'SkillMeter';
BackgroundLayers.displayName = 'BackgroundLayers';
HUDOverlay.displayName = 'HUDOverlay';
CornerBrackets.displayName = 'CornerBrackets';
