'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { TerminalInput } from '@/components/ui/TerminalInput';

type Phase = 'init' | 'connecting' | 'connected' | 'ready';

export function ContactSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [phase, setPhase] = useState<Phase>('init');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const sequence = async () => {
            await delay(300);
            setPhase('connecting');
            await delay(1200);
            setPhase('connected');
            await delay(500);
            setPhase('ready');
        };
        sequence();
    }, []);

    useEffect(() => {
        if (phase !== 'ready') return;

        gsap.fromTo('.contact-element',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
        );

        if (window.innerWidth > 768) {
            const handleMouse = (e: MouseEvent) => {
                const content = document.querySelector('.contact-parallax');
                if (!content) return;
                const x = (e.clientX / window.innerWidth - 0.5) * 12;
                const y = (e.clientY / window.innerHeight - 0.5) * 8;
                gsap.to(content, { x, y, duration: 0.6, ease: 'power2.out' });
            };
            window.addEventListener('mousemove', handleMouse);
            return () => window.removeEventListener('mousemove', handleMouse);
        }
    }, [phase]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await delay(2500);
        setIsSubmitting(false);
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', message: '' });
        }, 4000);
    };

    const showContent = phase === 'ready';

    return (
        <div ref={containerRef} className="contact-section">
            <BackgroundLayers />

            {phase === 'connecting' && (
                <div className="boot-overlay">
                    <div className="connecting-row">
                        <div className="connecting-dot" />
                        <span className="connecting-text">Establishing Uplink</span>
                    </div>
                    <ConnectionProgress />
                </div>
            )}

            {phase === 'connected' && (
                <div className="boot-overlay">
                    <span className="connected-text">Channel Open</span>
                </div>
            )}

            <div className="contact-parallax contact-main" style={{ opacity: showContent ? 1 : 0 }}>
                <div className="contact-content">
                    {/* LEFT: UPLINK INFO */}
                    <div className="contact-element contact-left">
                        <div className="status-badge">
                            <div className="status-dot green" />
                            <span className="status-text green">Channel Open</span>
                        </div>

                        <h1 className="contact-title">Secure<br />Uplink</h1>

                        <p className="contact-desc">
                            Establish a direct communication channel with this variant. All transmissions are encrypted and monitored.
                        </p>

                        <div className="status-panel">
                            <div className="panel-header">
                                <div className="panel-dot" />
                                <span>Timeline Status</span>
                            </div>
                            <div className="panel-value">STABLE</div>
                            <div className="panel-latency">Latency: 0.003ms</div>
                        </div>
                    </div>

                    {/* RIGHT: TERMINAL */}
                    <div className="contact-element contact-right">
                        <div className="terminal">
                            <div className="terminal-header">
                                <div className="terminal-left">
                                    <div className="traffic-lights">
                                        <span className="light red" />
                                        <span className="light amber" />
                                        <span className="light green" />
                                    </div>
                                    <span className="terminal-version">UPLINK_TERMINAL v4.2.1</span>
                                </div>
                                <div className="terminal-status">
                                    <div className={`status-indicator ${isSubmitting ? 'amber' : 'green'}`} />
                                    <span className={isSubmitting ? 'amber' : 'green'}>{isSubmitting ? 'TRANSMITTING' : 'READY'}</span>
                                </div>
                            </div>

                            {isSubmitted ? (
                                <SubmissionSuccess />
                            ) : (
                                <form onSubmit={handleSubmit}>
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
                                    <TerminalInput
                                        label="Transmission"
                                        name="message"
                                        type="textarea"
                                        value={formData.message}
                                        onChange={(value) => setFormData({ ...formData, message: value })}
                                        rows={4}
                                    />

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                                    >
                                        {isSubmitting ? (
                                            <span className="btn-content">
                                                <span className="btn-dot" />
                                                Establishing Uplink...
                                            </span>
                                        ) : '► TRANSMIT'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <HUDOverlay show={showContent} />
            <CornerBrackets />

            <style jsx>{`
                .contact-section {
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
                
                .connecting-row { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
                .connecting-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: var(--tva-amber);
                    box-shadow: 0 0 15px var(--tva-amber), 0 0 30px var(--tva-amber);
                    animation: pulse 0.4s ease-in-out infinite;
                }
                .connecting-text {
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.4em;
                    color: var(--tva-amber);
                }
                @media (max-width: 480px) { .connecting-text { font-size: 10px; letter-spacing: 0.3em; } }
                
                .connected-text {
                    font-size: 16px;
                    text-transform: uppercase;
                    letter-spacing: 0.5em;
                    color: #00FF00;
                    text-shadow: 0 0 20px #00FF00, 0 0 40px #00FF00;
                }
                @media (max-width: 480px) { .connected-text { font-size: 13px; letter-spacing: 0.35em; } }
                
                .contact-main {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    padding: 0 80px;
                    transition: opacity 0.6s ease;
                }
                @media (max-width: 1024px) { .contact-main { padding: 0 40px; } }
                @media (max-width: 768px) { .contact-main { padding: 80px 25px 40px; align-items: flex-start; overflow-y: auto; } }
                
                .contact-content {
                    display: flex;
                    gap: 70px;
                    max-width: 1300px;
                    width: 100%;
                    margin: 0 auto;
                }
                @media (max-width: 1024px) { .contact-content { gap: 40px; } }
                @media (max-width: 768px) { .contact-content { flex-direction: column; gap: 30px; } }
                
                .contact-left { width: 350px; flex-shrink: 0; }
                @media (max-width: 1024px) { .contact-left { width: 280px; } }
                @media (max-width: 768px) { .contact-left { width: 100%; text-align: center; } }
                
                .status-badge { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
                @media (max-width: 768px) { .status-badge { justify-content: center; } }
                .status-dot { width: 10px; height: 10px; border-radius: 50%; animation: pulse 1.5s ease-in-out infinite; }
                .status-dot.green { background: #00FF00; box-shadow: 0 0 12px #00FF00; }
                .status-text { font-size: 11px; text-transform: uppercase; letter-spacing: 0.35em; }
                .status-text.green { color: #00FF00; }
                
                .contact-title {
                    font-size: 48px;
                    font-weight: 200;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    color: var(--tva-amber);
                    text-shadow: 0 0 50px rgba(255, 153, 0, 0.3);
                    line-height: 1.05;
                    margin-bottom: 25px;
                    animation: titleGlow 3s ease-in-out infinite;
                }
                @media (max-width: 1024px) { .contact-title { font-size: 38px; } }
                @media (max-width: 768px) { .contact-title { font-size: 32px; margin-bottom: 20px; } }
                @media (max-width: 480px) { .contact-title { font-size: 26px; } }
                
                .contact-desc {
                    font-size: 13px;
                    line-height: 1.9;
                    color: rgba(255, 153, 0, 0.45);
                    margin-bottom: 35px;
                    max-width: 280px;
                }
                @media (max-width: 768px) { .contact-desc { max-width: 100%; margin: 0 auto 25px; } }
                
                .status-panel {
                    padding: 20px 22px;
                    background: rgba(0, 255, 0, 0.02);
                    border: 1px solid rgba(0, 255, 0, 0.15);
                }
                @media (max-width: 768px) { .status-panel { max-width: 300px; margin: 0 auto; } }
                .panel-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 15px;
                    padding-bottom: 12px;
                    border-bottom: 1px solid rgba(0, 255, 0, 0.08);
                }
                .panel-header span { font-size: 9px; text-transform: uppercase; letter-spacing: 0.3em; color: #00FF00; }
                .panel-dot { width: 6px; height: 6px; border-radius: 50%; background: #00FF00; animation: pulse 1s ease-in-out infinite; }
                .panel-value {
                    font-size: 26px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    color: #00FF00;
                    text-shadow: 0 0 20px rgba(0, 255, 0, 0.4);
                }
                @media (max-width: 480px) { .panel-value { font-size: 22px; } }
                .panel-latency { margin-top: 12px; font-size: 10px; color: rgba(0, 255, 0, 0.5); letter-spacing: 0.15em; }
                
                .contact-right { flex: 1; }
                
                .terminal {
                    padding: 35px 40px;
                    background: rgba(5, 4, 4, 0.95);
                    border: 1px solid rgba(255, 153, 0, 0.2);
                    box-shadow: 0 0 60px rgba(255, 153, 0, 0.03), inset 0 0 40px rgba(0, 0, 0, 0.5);
                }
                @media (max-width: 768px) { .terminal { padding: 25px 20px; } }
                
                .terminal-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 30px;
                    padding-bottom: 20px;
                    border-bottom: 1px solid rgba(255, 153, 0, 0.12);
                    flex-wrap: wrap;
                    gap: 15px;
                }
                @media (max-width: 600px) { .terminal-header { margin-bottom: 20px; padding-bottom: 15px; } }
                
                .terminal-left { display: flex; align-items: center; gap: 15px; }
                .traffic-lights { display: flex; gap: 8px; }
                .light { width: 10px; height: 10px; border-radius: 50%; }
                .light.red { background: var(--tva-red); }
                .light.amber { background: var(--tva-amber); }
                .light.green { background: #00FF00; }
                .terminal-version { font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255, 153, 0, 0.5); }
                @media (max-width: 600px) { .terminal-version { display: none; } }
                
                .terminal-status { display: flex; align-items: center; gap: 8px; }
                .status-indicator { width: 6px; height: 6px; border-radius: 50%; }
                .status-indicator.green { background: #00FF00; box-shadow: 0 0 8px #00FF00; }
                .status-indicator.amber { background: var(--tva-amber); box-shadow: 0 0 8px var(--tva-amber); animation: pulse 0.3s ease-in-out infinite; }
                .terminal-status span { font-size: 9px; text-transform: uppercase; letter-spacing: 0.2em; }
                .terminal-status span.green { color: #00FF00; }
                .terminal-status span.amber { color: var(--tva-amber); }
                
                .submit-btn {
                    width: 100%;
                    margin-top: 25px;
                    padding: 20px 30px;
                    font-size: 14px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.3em;
                    color: var(--tva-amber);
                    background: linear-gradient(90deg, rgba(255, 153, 0, 0.12) 0%, rgba(255, 153, 0, 0.04) 50%, rgba(255, 153, 0, 0.12) 100%);
                    border: 2px solid var(--tva-amber);
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 0 20px rgba(255, 153, 0, 0.15), inset 0 0 30px rgba(255, 153, 0, 0.05);
                }
                .submit-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 153, 0, 0.2), transparent);
                    transition: left 0.6s ease;
                }
                .submit-btn:hover:not(:disabled)::before {
                    left: 100%;
                }
                .submit-btn:hover:not(:disabled) {
                    background: linear-gradient(90deg, rgba(255, 153, 0, 0.25) 0%, rgba(255, 153, 0, 0.15) 50%, rgba(255, 153, 0, 0.25) 100%);
                    box-shadow: 0 0 40px rgba(255, 153, 0, 0.3), 0 0 80px rgba(255, 153, 0, 0.15), inset 0 0 40px rgba(255, 153, 0, 0.1);
                    text-shadow: 0 0 20px var(--tva-amber);
                    transform: translateY(-2px);
                }
                .submit-btn.submitting {
                    background: rgba(255, 153, 0, 0.2);
                    animation: btnPulse 1s ease-in-out infinite;
                    box-shadow: 0 0 50px rgba(255, 153, 0, 0.4);
                }
                @keyframes btnPulse {
                    0%, 100% { box-shadow: 0 0 30px rgba(255, 153, 0, 0.3); }
                    50% { box-shadow: 0 0 60px rgba(255, 153, 0, 0.5); }
                }
                @media (max-width: 480px) { .submit-btn { padding: 16px 20px; font-size: 12px; margin-top: 20px; letter-spacing: 0.2em; } }
                
                .btn-content { display: flex; align-items: center; justify-content: center; gap: 12px; }
                .btn-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--tva-amber); animation: pulse 0.3s ease-in-out infinite; box-shadow: 0 0 10px var(--tva-amber); }
            `}</style>
        </div>
    );
}

function ConnectionProgress() {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => setProgress(p => Math.min(p + 8, 100)), 80);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="progress-container">
            <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <style jsx>{`
                .progress-container { width: 180px; }
                @media (max-width: 480px) { .progress-container { width: 150px; } }
                .progress-track { height: 3px; background: rgba(255, 153, 0, 0.1); border: 1px solid rgba(255, 153, 0, 0.2); }
                .progress-fill { height: 100%; background: var(--tva-amber); box-shadow: 0 0 10px var(--tva-amber); transition: width 0.08s linear; }
            `}</style>
        </div>
    );
}

function SubmissionSuccess() {
    const messageRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!messageRef.current) return;
        gsap.fromTo(messageRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power4.out' });
    }, []);
    return (
        <div ref={messageRef} className="success">
            <div className="success-icon">
                <svg width="36" height="36" fill="none" stroke="#00FF00" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <span className="success-title">Transmission Complete</span>
            <span className="success-sub">Secure uplink established successfully</span>
            <style jsx>{`
                .success { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 20px; text-align: center; }
                @media (max-width: 480px) { .success { padding: 40px 15px; } }
                .success-icon {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    margin-bottom: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 3px solid #00FF00;
                    box-shadow: 0 0 40px rgba(0, 255, 0, 0.3), inset 0 0 20px rgba(0, 255, 0, 0.1);
                }
                @media (max-width: 480px) { .success-icon { width: 60px; height: 60px; margin-bottom: 20px; } .success-icon svg { width: 28px; height: 28px; } }
                .success-title { font-size: 24px; text-transform: uppercase; letter-spacing: 0.2em; color: #00FF00; margin-bottom: 10px; text-shadow: 0 0 20px rgba(0, 255, 0, 0.4); }
                @media (max-width: 480px) { .success-title { font-size: 18px; } }
                .success-sub { font-size: 11px; text-transform: uppercase; letter-spacing: 0.25em; color: rgba(0, 255, 0, 0.6); }
                @media (max-width: 480px) { .success-sub { font-size: 10px; } }
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
            <div className="hud hud-tl"><div className="hud-label">INTERFACE</div><div className="hud-value">COMMUNICATION HUB</div></div>
            <div className="hud hud-tr">
                <div className="hud-label">ENCRYPTION</div>
                <div className="hud-status"><div className="hud-dot" /><span>ACTIVE</span></div>
            </div>
            <div className="hud hud-br"><div className="hud-dot" /><span className="hud-small">Connection Secure</span></div>
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

ContactSection.displayName = 'ContactSection';
ConnectionProgress.displayName = 'ConnectionProgress';
SubmissionSuccess.displayName = 'SubmissionSuccess';
BackgroundLayers.displayName = 'BackgroundLayers';
HUDOverlay.displayName = 'HUDOverlay';
CornerBrackets.displayName = 'CornerBrackets';
