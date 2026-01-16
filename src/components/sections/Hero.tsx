'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { useProfile } from '@/lib/data';
import Image from 'next/image';
const myImage = '/images/image.png';

type Phase = 'init' | 'scanning' | 'detected' | 'processing' | 'reveal' | 'complete';

export function Hero() {
    const PROFILE = useProfile();
    const [phase, setPhase] = useState<Phase>('init');
    const [typedName, setTypedName] = useState('');
    const [typedRole, setTypedRole] = useState('');
    const [scanProgress, setScanProgress] = useState(0);

    // Image source state with fallback logic
    const imgSrc = PROFILE.imageUrl || myImage;


    // Cinematic boot sequence
    useEffect(() => {
        const sequence = async () => {
            // Init - blank (0.5s)
            await delay(500);

            // Scanning with progress (1.2s)
            setPhase('scanning');
            const progressInterval = setInterval(() => {
                setScanProgress(prev => Math.min(prev + 8, 100));
            }, 80);
            await delay(1200);
            clearInterval(progressInterval);
            setScanProgress(100);

            // Detected alert (0.8s)
            setPhase('detected');
            await delay(800);

            // Processing (0.5s)
            setPhase('processing');
            await delay(500);

            // Reveal content
            setPhase('reveal');
            await delay(100);
            setPhase('complete');
        };
        sequence();
    }, []);

    // Typewriter for name and role
    useEffect(() => {
        if (phase !== 'complete') return;

        const typeText = async () => {
            for (let i = 0; i <= PROFILE.name.length; i++) {
                setTypedName(PROFILE.name.slice(0, i));
                await delay(35);
            }
            await delay(200);
            for (let i = 0; i <= PROFILE.role.length; i++) {
                setTypedRole(PROFILE.role.slice(0, i));
                await delay(20);
            }
        };
        typeText();
    }, [phase, PROFILE.name, PROFILE.role]);

    // GSAP reveals
    useEffect(() => {
        if (phase !== 'complete') return;

        const tl = gsap.timeline({ delay: 1.2 });
        tl.fromTo('.reveal-item',
            { opacity: 0, y: 20, filter: 'blur(4px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, stagger: 0.1, ease: 'power3.out' }
        );

        // Parallax only on desktop
        if (window.innerWidth > 768) {
            const handleMouse = (e: MouseEvent) => {
                const main = document.querySelector('.hero-parallax');
                if (!main) return;
                const x = (e.clientX / window.innerWidth - 0.5) * 25;
                const y = (e.clientY / window.innerHeight - 0.5) * 18;
                gsap.to(main, { x, y, duration: 0.8, ease: 'power2.out' });
            };
            window.addEventListener('mousemove', handleMouse);
            return () => window.removeEventListener('mousemove', handleMouse);
        }
    }, [phase]);

    const showMain = phase === 'reveal' || phase === 'complete';

    return (
        <div className="hero-section">
            {/* === CINEMATIC BACKGROUND LAYERS === */}
            <BackgroundLayers />

            {/* === BOOT SEQUENCE PHASES === */}

            {/* Phase: Init */}
            {phase === 'init' && (
                <div className="boot-overlay">
                    <div className="init-dot" />
                </div>
            )}

            {/* Phase: Scanning */}
            {phase === 'scanning' && (
                <div className="boot-overlay">
                    <div className="scan-dot" />
                    <div className="progress-bar">
                        <div className="progress-track">
                            <div className="progress-fill" style={{ width: `${scanProgress}%` }} />
                        </div>
                    </div>
                    <span className="scan-text">Scanning Timeline...</span>
                </div>
            )}

            {/* Phase: Detected */}
            {phase === 'detected' && (
                <div className="boot-overlay detected-flash">
                    <div className="detected-row">
                        <div className="detected-dot" />
                        <span className="detected-text">Variant Detected</span>
                    </div>
                </div>
            )}

            {/* Phase: Processing */}
            {phase === 'processing' && (
                <div className="boot-overlay">
                    <span className="processing-text">Loading Variant Record...</span>
                </div>
            )}

            {/* === MAIN CONTENT === */}
            <div
                className="hero-parallax hero-main"
                style={{
                    opacity: showMain ? 1 : 0,
                    transform: showMain ? 'scale(1)' : 'scale(0.98)',
                }}
            >
                <div className="hero-content">
                    {/* === LEFT: HOLOGRAM DOSSIER === */}
                    <div className="hero-left">
                        {/* Status Header */}
                        <div className="status-header">
                            <div className="status-dot red" />
                            <span className="status-text red">Variant Detected</span>
                        </div>

                        {/* Hologram Container */}
                        <div className="hologram-container">
                            <div className="hologram-glow" />
                            <div className="hologram-frame">
                                <CornerAccents />
                                <div className="image-container">
                                    <Image
                                        src={imgSrc}
                                        alt={PROFILE.name}
                                        width={320}
                                        height={400}
                                        priority
                                        onError={() => { }}
                                        className="profile-image"
                                    />
                                    <div className="image-overlay gradient" />
                                    <div className="image-overlay scanlines" />
                                    <div className="image-overlay vignette" />
                                </div>
                                <div className="frame-readout top-right">
                                    <div className="readout-label">SCAN</div>
                                    <div className="readout-value">100%</div>
                                </div>
                                <div className="frame-readout bottom-left">
                                    <div className="readout-label">STATUS</div>
                                    <div className="readout-value green">VERIFIED</div>
                                </div>
                            </div>
                            <div className="id-badge">
                                <span>Variant ID: SR-2024</span>
                            </div>
                        </div>
                    </div>

                    {/* === RIGHT: VARIANT DATA === */}
                    <div className="hero-right">
                        {/* Classification bar */}
                        <div className="classification-bar">
                            <span className="class-label">TVA Dossier</span>
                            <div className="class-line" />
                            <div className="class-status">
                                <div className="status-dot small green" />
                                <span className="status-text small green">Accessible</span>
                            </div>
                        </div>

                        {/* Name */}
                        <h1 className="hero-name">
                            {typedName}
                            {typedName.length < PROFILE.name.length && <span className="cursor" />}
                        </h1>

                        {/* Role */}
                        <h2 className="hero-role">{typedRole}</h2>

                        {/* Divider */}
                        <div className="reveal-item hero-divider" />

                        {/* Summary */}
                        <p className="reveal-item hero-summary">{PROFILE.summary}</p>

                        {/* Skills */}
                        <div className="reveal-item skills-section">
                            <div className="skills-label">Core Competencies</div>
                            <div className="skills-list">
                                {['React', 'Next.js', 'Node.js', 'Three.js', 'UI/UX'].map((skill, i) => (
                                    <span key={skill} className="skill-tag" style={{ animationDelay: `${2 + i * 0.1}s` }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Download CV Button - Removed in favor of global floating button */}
                    </div>
                </div>
            </div>

            {/* === HUD ELEMENTS === */}
            <HUDOverlay phase={phase} />

            {/* === CORNER BRACKETS === */}
            <CornerBrackets />

            {/* === SCROLL INDICATOR === */}
            {phase === 'complete' && <ScrollIndicator />}

            <style jsx>{`
                .hero-section {
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
                    z-index: 100;
                }
                
                .init-dot {
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    background: var(--tva-amber);
                    box-shadow: 0 0 30px var(--tva-amber);
                    animation: pulse 0.4s ease-in-out infinite;
                }
                
                .scan-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: var(--tva-amber);
                    box-shadow: 0 0 20px var(--tva-amber), 0 0 40px var(--tva-amber);
                    margin-bottom: 30px;
                    animation: pulse 0.6s ease-in-out infinite;
                }
                
                .progress-bar { width: 200px; margin-bottom: 18px; }
                @media (max-width: 480px) { .progress-bar { width: 160px; } }
                
                .progress-track {
                    height: 3px;
                    background: rgba(255, 153, 0, 0.08);
                    border: 1px solid rgba(255, 153, 0, 0.2);
                }
                
                .progress-fill {
                    height: 100%;
                    background: var(--tva-amber);
                    box-shadow: 0 0 10px var(--tva-amber);
                    transition: width 0.08s linear;
                }
                
                .scan-text {
                    font-size: 10px;
                    text-transform: uppercase;
                    letter-spacing: 0.4em;
                    color: rgba(255, 153, 0, 0.5);
                }
                @media (max-width: 480px) { .scan-text { font-size: 9px; letter-spacing: 0.3em; } }
                
                .detected-flash { animation: crtFlicker 0.1s ease-in-out 3; }
                .detected-row { display: flex; align-items: center; gap: 15px; }
                @media (max-width: 480px) { .detected-row { gap: 10px; } }
                
                .detected-dot {
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    background: var(--tva-red);
                    box-shadow: 0 0 20px var(--tva-red), 0 0 40px var(--tva-red);
                    animation: alertPulse 0.3s ease-in-out infinite;
                }
                @media (max-width: 480px) { .detected-dot { width: 10px; height: 10px; } }
                
                .detected-text {
                    font-size: 20px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.3em;
                    color: var(--tva-red);
                    text-shadow: 0 0 30px var(--tva-red);
                }
                @media (max-width: 480px) { .detected-text { font-size: 14px; letter-spacing: 0.2em; } }
                
                .processing-text {
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.35em;
                    color: rgba(255, 153, 0, 0.5);
                    animation: textFlicker 0.15s ease-in-out infinite;
                }
                
                .hero-main {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0 80px;
                    transition: opacity 0.8s ease, transform 0.8s ease;
                }
                @media (max-width: 1024px) { .hero-main { padding: 0 40px; } }
                @media (max-width: 768px) { .hero-main { padding: 80px 25px 40px; align-items: flex-start; overflow-y: auto; } }
                
                .hero-content {
                    display: flex;
                    align-items: stretch;
                    gap: 70px;
                    max-width: 1300px;
                    width: 100%;
                }
                @media (max-width: 1024px) { .hero-content { gap: 40px; } }
                @media (max-width: 768px) { 
                    .hero-content { 
                        flex-direction: column; 
                        gap: 35px;
                        align-items: center;
                    } 
                }
                
                .hero-left { width: 340px; flex-shrink: 0; }
                @media (max-width: 1024px) { .hero-left { width: 280px; } }
                @media (max-width: 768px) { .hero-left { width: 100%; max-width: 280px; } }
                
                .status-header { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
                @media (max-width: 768px) { .status-header { justify-content: center; margin-bottom: 12px; } }
                
                .status-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    animation: pulse 1.2s ease-in-out infinite;
                }
                .status-dot.red { background: var(--tva-red); box-shadow: 0 0 12px var(--tva-red); }
                .status-dot.green { background: #00FF00; box-shadow: 0 0 12px #00FF00; }
                .status-dot.small { width: 6px; height: 6px; }
                
                .status-text { font-size: 11px; text-transform: uppercase; letter-spacing: 0.3em; }
                .status-text.red { color: var(--tva-red); }
                .status-text.green { color: #00FF00; }
                .status-text.small { font-size: 9px; letter-spacing: 0.2em; }
                
                .hologram-container { position: relative; aspect-ratio: 3/4; width: 100%; }
                
                .hologram-glow {
                    position: absolute;
                    inset: -8px;
                    border: 1px solid rgba(255, 153, 0, 0.15);
                    box-shadow: 0 0 60px rgba(255, 153, 0, 0.08);
                }
                
                .hologram-frame {
                    position: absolute;
                    inset: 0;
                    border: 2px solid rgba(255, 153, 0, 0.5);
                    background: rgba(255, 153, 0, 0.02);
                }
                
                .image-container { position: absolute; inset: 10px; overflow: hidden; }
                
                .profile-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: top;
                    filter: ${PROFILE.colorFilter === 'bw'
                    ? 'grayscale(100%) contrast(1.2) brightness(0.9)'
                    : PROFILE.colorFilter === 'matrix'
                        ? 'sepia(100%) hue-rotate(90deg) saturate(300%) contrast(1.2)'
                        : PROFILE.colorFilter === 'none'
                            ? 'none'
                            : 'sepia(100%) saturate(180%) brightness(0.85) hue-rotate(-5deg)'
                };
                    mix-blend-mode: ${PROFILE.colorFilter === 'none' ? 'normal' : 'screen'};
                }
                
                .image-overlay { position: absolute; inset: 0; }
                .image-overlay.gradient {
                    background: linear-gradient(180deg, rgba(255, 153, 0, 0.05) 0%, rgba(255, 153, 0, 0.12) 100%);
                    mix-blend-mode: overlay;
                }
                .image-overlay.scanlines {
                    background: repeating-linear-gradient(0deg, transparent 0, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 6px);
                }
                .image-overlay.vignette { box-shadow: inset 0 0 80px rgba(2, 2, 2, 0.9); }
                
                .frame-readout { position: absolute; }
                .frame-readout.top-right { top: 15px; right: 15px; text-align: right; }
                .frame-readout.bottom-left { bottom: 15px; left: 15px; }
                .readout-label { font-size: 8px; color: rgba(255, 153, 0, 0.4); letter-spacing: 0.2em; }
                .readout-value { font-size: 11px; color: var(--tva-amber); font-family: monospace; }
                .readout-value.green { font-size: 9px; color: #00FF00; letter-spacing: 0.15em; }
                
                .id-badge {
                    position: absolute;
                    bottom: -20px;
                    left: 50%;
                    transform: translateX(-50%);
                    padding: 10px 25px;
                    background: #020202;
                    border: 1px solid rgba(255, 153, 0, 0.4);
                    white-space: nowrap;
                }
                .id-badge span { font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: var(--tva-amber); }
                @media (max-width: 480px) { 
                    .id-badge { padding: 8px 18px; }
                    .id-badge span { font-size: 9px; }
                }
                
                .hero-right { flex: 1; display: flex; flex-direction: column; justify-content: center; }
                @media (max-width: 768px) { 
                    .hero-right { 
                        width: 100%; 
                        align-items: center; 
                        text-align: center;
                        margin-top: 20px;
                    } 
                }
                
                .classification-bar {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    margin-bottom: 25px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid rgba(255, 153, 0, 0.12);
                }
                @media (max-width: 768px) { 
                    .classification-bar { 
                        justify-content: center; 
                        gap: 12px;
                        flex-wrap: wrap;
                    } 
                }
                
                .class-label { font-size: 9px; text-transform: uppercase; letter-spacing: 0.35em; color: rgba(255, 153, 0, 0.4); }
                .class-line { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(255, 153, 0, 0.2), transparent); }
                @media (max-width: 768px) { .class-line { display: none; } }
                .class-status { display: flex; align-items: center; gap: 6px; }
                
                .hero-name {
                    font-size: 58px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: var(--tva-amber);
                    text-shadow: 0 0 50px rgba(255, 153, 0, 0.3);
                    margin-bottom: 12px;
                    line-height: 1.05;
                    min-height: 135px;
                }
                @media (max-width: 1024px) { .hero-name { font-size: 42px; min-height: 100px; } }
                @media (max-width: 768px) { .hero-name { font-size: 32px; min-height: auto; margin-bottom: 8px; } }
                @media (max-width: 480px) { .hero-name { font-size: 26px; } }
                
                .cursor {
                    display: inline-block;
                    width: 4px;
                    height: 50px;
                    background: var(--tva-amber);
                    margin-left: 4px;
                    vertical-align: middle;
                    animation: blink 0.7s step-end infinite;
                    box-shadow: 0 0 10px var(--tva-amber);
                }
                @media (max-width: 768px) { .cursor { height: 30px; width: 3px; } }
                
                .hero-role {
                    font-size: 18px;
                    font-weight: 400;
                    text-transform: uppercase;
                    letter-spacing: 0.35em;
                    color: rgba(255, 153, 0, 0.65);
                    margin-bottom: 35px;
                    min-height: 24px;
                }
                @media (max-width: 768px) { .hero-role { font-size: 14px; margin-bottom: 25px; letter-spacing: 0.25em; } }
                @media (max-width: 480px) { .hero-role { font-size: 12px; } }
                
                .hero-divider {
                    width: 70px;
                    height: 2px;
                    background: var(--tva-amber);
                    margin-bottom: 25px;
                    box-shadow: 0 0 15px var(--tva-amber);
                }
                @media (max-width: 768px) { .hero-divider { margin: 0 auto 20px; } }
                
                .hero-summary {
                    font-size: 14px;
                    line-height: 2;
                    color: rgba(255, 153, 0, 0.5);
                    margin-bottom: 35px;
                    max-width: 500px;
                }
                @media (max-width: 768px) { .hero-summary { font-size: 13px; margin-bottom: 25px; line-height: 1.8; } }
                
                .skills-section { margin-bottom: 8px; }
                .skills-label {
                    font-size: 9px;
                    text-transform: uppercase;
                    letter-spacing: 0.35em;
                    color: rgba(255, 153, 0, 0.35);
                    margin-bottom: 15px;
                }
                
                .skills-list { display: flex; flex-wrap: wrap; gap: 12px; }
                @media (max-width: 768px) { .skills-list { justify-content: center; gap: 8px; } }
                
                .skill-tag {
                    padding: 12px 22px;
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.12em;
                    color: var(--tva-amber);
                    border: 1px solid rgba(255, 153, 0, 0.3);
                    background: rgba(255, 153, 0, 0.03);
                    opacity: 0;
                    animation: fadeSlideIn 0.4s ease forwards;
                }
                @media (max-width: 768px) { .skill-tag { padding: 10px 16px; font-size: 10px; } }
                
                .cv-download-btn {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    margin-top: 25px;
                    padding: 14px 28px;
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    color: var(--tva-amber);
                    background: rgba(255, 153, 0, 0.08);
                    border: 1px solid rgba(255, 153, 0, 0.4);
                    cursor: pointer;
                    text-decoration: none;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }
                .cv-download-btn:hover {
                    background: rgba(255, 153, 0, 0.15);
                    border-color: rgba(255, 153, 0, 0.7);
                    box-shadow: 0 0 25px rgba(255, 153, 0, 0.25), inset 0 0 20px rgba(255, 153, 0, 0.05);
                    transform: translateY(-2px);
                }
                .cv-download-btn:active {
                    transform: translateY(0);
                }
                .cv-icon {
                    width: 18px;
                    height: 18px;
                    stroke: var(--tva-amber);
                }
                .cv-btn-glow {
                    position: absolute;
                    top: 50%;
                    left: -20%;
                    width: 20%;
                    height: 200%;
                    background: linear-gradient(90deg, transparent, rgba(255, 153, 0, 0.2), transparent);
                    transform: translateY(-50%) skewX(-15deg);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .cv-download-btn:hover .cv-btn-glow {
                    opacity: 1;
                    animation: btnGlowSweep 1s ease-in-out infinite;
                }
                @keyframes btnGlowSweep {
                    from { left: -20%; }
                    to { left: 120%; }
                }
                @media (max-width: 768px) { 
                    .cv-download-btn { 
                        padding: 12px 22px; 
                        font-size: 10px; 
                        gap: 10px;
                        justify-content: center;
                    }
                    .cv-icon { width: 16px; height: 16px; }
                }
                
                @keyframes crtFlicker {
                    0%, 100% { filter: brightness(1); }
                    50% { filter: brightness(1.3); }
                }
                @keyframes alertPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.15); }
                }
                @keyframes textFlicker {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 0.8; }
                }
                @keyframes fadeSlideIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

/* === BACKGROUND LAYERS === */
function BackgroundLayers() {
    return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse 100% 80% at 25% 35%, rgba(255, 153, 0, 0.035) 0%, transparent 55%)',
            }} />
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse 60% 50% at 75% 70%, rgba(255, 153, 0, 0.02) 0%, transparent 50%)',
            }} />
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'linear-gradient(rgba(255, 153, 0, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 153, 0, 0.015) 1px, transparent 1px)',
                backgroundSize: '80px 80px',
            }} />
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)',
            }} />
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.6) 100%)',
            }} />
        </div>
    );
}

/* === CORNER ACCENTS FOR FRAME === */
function CornerAccents() {
    const size = 30;
    const positions = [
        { top: 0, left: 0, borderTop: '3px solid var(--tva-amber)', borderLeft: '3px solid var(--tva-amber)' },
        { top: 0, right: 0, borderTop: '3px solid var(--tva-amber)', borderRight: '3px solid var(--tva-amber)' },
        { bottom: 0, left: 0, borderBottom: '3px solid var(--tva-amber)', borderLeft: '3px solid var(--tva-amber)' },
        { bottom: 0, right: 0, borderBottom: '3px solid var(--tva-amber)', borderRight: '3px solid var(--tva-amber)' },
    ];
    return (
        <>
            {positions.map((style, i) => (
                <div key={i} style={{ position: 'absolute', width: size, height: size, ...style }} />
            ))}
        </>
    );
}

/* === HUD OVERLAY === */
function HUDOverlay({ phase }: { phase: Phase }) {
    if (phase !== 'complete') return null;

    return (
        <>
            <div className="hud-element hud-top-left">
                <div className="hud-label">LOCATION</div>
                <div className="hud-value">SACRED TIMELINE</div>
            </div>
            <div className="hud-element hud-top-right">
                <div className="hud-label">THREAT LEVEL</div>
                <div className="hud-value green">MINIMAL</div>
            </div>
            <style jsx>{`
                .hud-element {
                    position: absolute;
                    opacity: 0;
                    animation: fadeIn 0.5s ease 2.5s forwards;
                }
                .hud-top-left { top: 30px; left: 35px; }
                .hud-top-right { top: 30px; right: 35px; text-align: right; }
                .hud-label { font-size: 8px; color: rgba(255, 153, 0, 0.3); letter-spacing: 0.25em; margin-bottom: 4px; }
                .hud-value { font-size: 10px; color: rgba(255, 153, 0, 0.5); letter-spacing: 0.15em; }
                .hud-value.green { color: #00FF00; }
                @media (max-width: 768px) {
                    .hud-top-left, .hud-top-right { display: none; }
                }
            `}</style>
        </>
    );
}

/* === CORNER BRACKETS === */
function CornerBrackets() {
    return (
        <>
            <div className="corner-bracket tl" />
            <div className="corner-bracket tr" />
            <div className="corner-bracket bl" />
            <div className="corner-bracket br" />
            <style jsx>{`
                .corner-bracket {
                    position: absolute;
                    width: 40px;
                    height: 40px;
                }
                .corner-bracket.tl { top: 25px; left: 25px; border-top: 1px solid rgba(255, 153, 0, 0.15); border-left: 1px solid rgba(255, 153, 0, 0.15); }
                .corner-bracket.tr { top: 25px; right: 25px; border-top: 1px solid rgba(255, 153, 0, 0.15); border-right: 1px solid rgba(255, 153, 0, 0.15); }
                .corner-bracket.bl { bottom: 25px; left: 25px; border-bottom: 1px solid rgba(255, 153, 0, 0.15); border-left: 1px solid rgba(255, 153, 0, 0.15); }
                .corner-bracket.br { bottom: 25px; right: 25px; border-bottom: 1px solid rgba(255, 153, 0, 0.15); border-right: 1px solid rgba(255, 153, 0, 0.15); }
                @media (max-width: 768px) {
                    .corner-bracket { width: 25px; height: 25px; }
                    .corner-bracket.tl { top: 15px; left: 15px; }
                    .corner-bracket.tr { top: 15px; right: 15px; }
                    .corner-bracket.bl { bottom: 15px; left: 15px; }
                    .corner-bracket.br { bottom: 15px; right: 15px; }
                }
            `}</style>
        </>
    );
}

/* === SCROLL INDICATOR === */
function ScrollIndicator() {
    return (
        <div className="scroll-indicator">
            <span className="scroll-text">Scroll to Explore</span>
            <div className="scroll-mouse">
                <div className="scroll-dot" />
            </div>
            <style jsx>{`
                .scroll-indicator {
                    position: absolute;
                    bottom: 35px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                    opacity: 0;
                    animation: fadeIn 0.6s ease 3s forwards;
                }
                .scroll-text {
                    font-size: 9px;
                    text-transform: uppercase;
                    letter-spacing: 0.35em;
                    color: rgba(255, 153, 0, 0.3);
                }
                .scroll-mouse {
                    width: 18px;
                    height: 28px;
                    border-radius: 9px;
                    border: 1px solid rgba(255, 153, 0, 0.2);
                    display: flex;
                    justify-content: center;
                    padding-top: 6px;
                }
                .scroll-dot {
                    width: 3px;
                    height: 6px;
                    border-radius: 2px;
                    background: var(--tva-amber);
                    animation: scrollPulse 1.5s ease-in-out infinite;
                }
                @keyframes scrollPulse {
                    0%, 100% { transform: translateY(0); opacity: 1; }
                    50% { transform: translateY(5px); opacity: 0.4; }
                }
                @media (max-width: 768px) {
                    .scroll-indicator { bottom: 20px; }
                }
            `}</style>
        </div>
    );
}

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

Hero.displayName = 'Hero';
BackgroundLayers.displayName = 'BackgroundLayers';
CornerAccents.displayName = 'CornerAccents';
HUDOverlay.displayName = 'HUDOverlay';
CornerBrackets.displayName = 'CornerBrackets';
ScrollIndicator.displayName = 'ScrollIndicator';
