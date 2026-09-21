'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTargetSection } from '@/store/navigationSlice';

const SECTIONS = [
    { id: 0, label: 'VARIANT', short: 'VAR' },
    { id: 1, label: 'TIMELINE', short: 'TML' },
    { id: 2, label: 'EVIDENCE', short: 'EVD' },
    { id: 3, label: 'SKILLS', short: 'SKL' },
    { id: 4, label: 'FILES', short: 'DOC' },
    { id: 5, label: 'UPLINK', short: 'COM' },
];

export function TempadLandscapeMode({ children }: { children: React.ReactNode }) {
    const [isLandscapeMobile, setIsLandscapeMobile] = useState(false);
    const dispatch = useAppDispatch();
    const { currentSection, isTransitioning } = useAppSelector((state) => state.navigation);

    useEffect(() => {
        const checkOrientation = () => {
            const isMobile = window.innerWidth <= 932 || window.screen.width <= 932;
            const isLandscape = window.innerWidth > window.innerHeight;
            setIsLandscapeMobile(isMobile && isLandscape);
        };

        checkOrientation();
        window.addEventListener('resize', checkOrientation);
        window.addEventListener('orientationchange', checkOrientation);

        return () => {
            window.removeEventListener('resize', checkOrientation);
            window.removeEventListener('orientationchange', checkOrientation);
        };
    }, []);

    const handleNavigate = (index: number) => {
        if (index === currentSection || isTransitioning) return;
        dispatch(setTargetSection(index));
    };

    if (!isLandscapeMobile) {
        return <>{children}</>;
    }

    return (
        <div className="tempad-device-wrapper">
            {/* The physical device background */}
            <div className="tempad-hardware-bg" />

            {/* Left Side: The Screen Container */}
            <div className="tempad-screen-area">
                <div className="tempad-crt-bezel">
                    <div className="tempad-crt-glass">
                        {/* 
                            We scale down the original 100vw/100vh app to fit inside the CRT screen.
                            Using a CSS transform approach allows the original app to function normally 
                            while visually appearing smaller.
                        */}
                        <div className="tempad-viewport-scaler">
                            {children}
                        </div>
                        
                        {/* CRT Effects */}
                        <div className="crt-scanlines" />
                        <div className="crt-vignette" />
                        <div className="crt-glare" />
                    </div>
                </div>
            </div>

            {/* Right Side: The Physical Keypad */}
            <div className="tempad-keypad-area">
                <div className="keypad-panel">
                    <div className="keypad-header">
                        <div className="tva-logo-small">TVA</div>
                        <div className="status-led active" />
                    </div>

                    <div className="button-grid">
                        {SECTIONS.map((sec) => (
                            <button
                                key={sec.id}
                                className={`tempad-btn ${currentSection === sec.id ? 'active' : ''}`}
                                onClick={() => handleNavigate(sec.id)}
                            >
                                <span className="btn-number">0{sec.id + 1}</span>
                                <span className="btn-label">{sec.short}</span>
                            </button>
                        ))}
                    </div>

                    <button 
                        className="timedoor-btn"
                        onClick={() => handleNavigate(currentSection === 5 ? 0 : currentSection + 1)}
                    >
                        <div className="timedoor-inner">
                            <span className="door-icon" />
                            TIME DOOR
                        </div>
                    </button>
                </div>
            </div>

            <style jsx>{`
                .tempad-device-wrapper {
                    position: fixed;
                    inset: 0;
                    z-index: 99999;
                    display: flex;
                    background: #000;
                    overflow: hidden;
                }

                .tempad-hardware-bg {
                    position: absolute;
                    inset: 0;
                    background: 
                        linear-gradient(to bottom, #2a2a2a, #1a1a1a),
                        repeating-linear-gradient(45deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 2px, transparent 2px, transparent 4px);
                    box-shadow: inset 0 0 50px rgba(0,0,0,0.8);
                    z-index: -1;
                }

                /* Left Side - Screen (72% width) */
                .tempad-screen-area {
                    width: 72%;
                    height: 100%;
                    padding: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .tempad-crt-bezel {
                    width: 100%;
                    height: 100%;
                    background: #050505;
                    border-radius: 20px;
                    padding: 20px;
                    box-shadow: 
                        inset 0 0 20px #000,
                        0 0 10px rgba(255, 153, 0, 0.1),
                        -5px -5px 15px rgba(255,255,255,0.05),
                        5px 5px 15px rgba(0,0,0,0.8);
                    border: 2px solid #333;
                    border-top-color: #444;
                    border-left-color: #444;
                    position: relative;
                }

                .tempad-crt-glass {
                    width: 100%;
                    height: 100%;
                    background: #020202;
                    border-radius: 12px;
                    position: relative;
                    overflow: hidden;
                    border: 1px solid rgba(255, 153, 0, 0.2);
                    box-shadow: inset 0 0 40px rgba(255, 153, 0, 0.1);
                }

                /* Magic scaler to make the 100vw app fit */
                .tempad-viewport-scaler {
                    width: 100vw;
                    height: 100vh;
                    transform-origin: top left;
                    /* Using scale proportional to container */
                    transform: scale(calc(72vw / 100vw)); 
                    pointer-events: auto;
                }
                
                /* We actually need exact scaling via CSS variables if possible, 
                   but since it's inside a flex container that is 72% wide minus paddings:
                   Viewport is 100vw, container is roughly 72vw - 30px (outer pad) - 40px (bezel pad).
                   Let's use a cleaner scale transform in React inline style or just simple fixed scale.
                   Actually, let's use zoom or transform: scale(0.65). 
                   We will refine the transform below to ensure it fits.
                */
                @media (orientation: landscape) {
                    .tempad-viewport-scaler {
                        transform: scale(0.65);
                    }
                }

                .crt-scanlines {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
                    background-size: 100% 3px, 3px 100%;
                    pointer-events: none;
                    z-index: 100;
                }

                .crt-vignette {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.8) 100%);
                    pointer-events: none;
                    z-index: 101;
                }
                
                .crt-glare {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 40%);
                    pointer-events: none;
                    z-index: 102;
                    border-radius: 12px;
                }

                /* Right Side - Keypad (28% width) */
                .tempad-keypad-area {
                    width: 28%;
                    height: 100%;
                    padding: 20px 20px 20px 5px;
                    display: flex;
                    flex-direction: column;
                }

                .keypad-panel {
                    flex: 1;
                    background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
                    border-radius: 12px;
                    border: 2px solid #333;
                    border-top-color: #4a4a4a;
                    border-left-color: #4a4a4a;
                    box-shadow: 
                        5px 5px 15px rgba(0,0,0,0.5),
                        inset -2px -2px 5px rgba(0,0,0,0.5),
                        inset 2px 2px 5px rgba(255,255,255,0.05);
                    padding: 15px;
                    display: flex;
                    flex-direction: column;
                }

                .keypad-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    padding-bottom: 10px;
                    border-bottom: 2px solid rgba(0,0,0,0.3);
                    box-shadow: 0 2px 0 rgba(255,255,255,0.02);
                }

                .tva-logo-small {
                    font-family: var(--font-mono);
                    color: var(--tva-amber);
                    font-size: 14px;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    text-shadow: 0 0 5px rgba(255, 153, 0, 0.5);
                }

                .status-led {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #222;
                    box-shadow: inset 0 1px 3px #000;
                }
                .status-led.active {
                    background: #00FF00;
                    box-shadow: 0 0 10px #00FF00, inset 0 -1px 3px rgba(0,0,0,0.3);
                }

                .button-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                    margin-bottom: auto;
                }

                .tempad-btn {
                    background: linear-gradient(to bottom, #333, #222);
                    border: 2px solid #111;
                    border-top-color: #444;
                    border-left-color: #444;
                    border-radius: 6px;
                    padding: 10px 5px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 4px;
                    box-shadow: 
                        0 4px 0 #111,
                        0 5px 5px rgba(0,0,0,0.5);
                    transition: all 0.1s;
                    cursor: pointer;
                }

                .tempad-btn:active {
                    transform: translateY(4px);
                    box-shadow: 0 0 0 #111, 0 1px 2px rgba(0,0,0,0.5);
                    border-top-color: #222;
                    border-left-color: #222;
                }

                .tempad-btn.active {
                    background: linear-gradient(to bottom, rgba(255, 153, 0, 0.2), rgba(255, 153, 0, 0.05));
                    border-color: rgba(255, 153, 0, 0.4);
                }

                .btn-number {
                    font-size: 10px;
                    color: rgba(255,255,255,0.3);
                    font-family: var(--font-mono);
                }
                .tempad-btn.active .btn-number { color: var(--tva-amber); }

                .btn-label {
                    font-size: 11px;
                    font-weight: 700;
                    color: #888;
                    font-family: var(--font-mono);
                    letter-spacing: 0.05em;
                }
                .tempad-btn.active .btn-label { 
                    color: var(--tva-amber);
                    text-shadow: 0 0 5px rgba(255, 153, 0, 0.5);
                }

                .timedoor-btn {
                    width: 100%;
                    background: linear-gradient(to bottom, #d47e00, #a36100);
                    border: 2px solid #523100;
                    border-top-color: #ff9d1a;
                    border-left-color: #ff9d1a;
                    border-radius: 8px;
                    padding: 4px;
                    box-shadow: 
                        0 6px 0 #523100,
                        0 8px 10px rgba(0,0,0,0.6);
                    cursor: pointer;
                    transition: all 0.1s;
                    margin-top: 15px;
                }

                .timedoor-btn:active {
                    transform: translateY(6px);
                    box-shadow: 0 0 0 #523100, 0 2px 4px rgba(0,0,0,0.6);
                }

                .timedoor-inner {
                    background: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px);
                    padding: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    font-family: var(--font-mono);
                    font-weight: 700;
                    color: #fff;
                    letter-spacing: 0.1em;
                    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
                }

                .door-icon {
                    width: 12px;
                    height: 12px;
                    background: #fff;
                    border-radius: 2px;
                    box-shadow: 0 0 10px rgba(255,255,255,0.8);
                }
            `}</style>
        </div>
    );
}
