'use client';

import { useEffect, useState } from 'react';

export function DeviceOrientationAdvice() {
    const [isPortraitMobile, setIsPortraitMobile] = useState(false);

    useEffect(() => {
        const checkOrientation = () => {
            // Check if it's a mobile device (width <= 768px or max-device-width <= 768px) 
            // AND in portrait mode.
            const isMobile = window.innerWidth <= 768 || window.screen.width <= 768;
            const isPortrait = window.innerHeight > window.innerWidth;
            
            setIsPortraitMobile(isMobile && isPortrait);
        };

        // Initial check
        checkOrientation();

        // Listen for resize and orientation changes
        window.addEventListener('resize', checkOrientation);
        window.addEventListener('orientationchange', checkOrientation);

        return () => {
            window.removeEventListener('resize', checkOrientation);
            window.removeEventListener('orientationchange', checkOrientation);
        };
    }, []);

    if (!isPortraitMobile) return null;

    return (
        <div className="orientation-overlay">
            <div className="orientation-content">
                <div className="rotate-icon-container">
                    {/* SVG Icon for rotating device */}
                    <svg 
                        className="rotate-icon"
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                        <path d="M12 18h.01" />
                    </svg>
                    <div className="rotate-arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                            <path d="M3 3v5h5" />
                        </svg>
                    </div>
                </div>

                <div className="status-badge">
                    <div className="status-dot" />
                    <span>CALIBRATION REQUIRED</span>
                </div>

                <h2 className="title">TemPad Configuration</h2>
                <p className="message">
                    For optimal variant tracking and timeline interaction, please rotate your device to landscape orientation.
                </p>
                
                <div className="scanline" />
            </div>

            <style jsx>{`
                .orientation-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 9999;
                    background: rgba(2, 2, 2, 0.95);
                    backdrop-filter: blur(10px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 30px;
                    text-align: center;
                    animation: fadeIn 0.5s ease-out;
                }

                .orientation-content {
                    position: relative;
                    max-width: 320px;
                    padding: 40px 30px;
                    background: rgba(255, 153, 0, 0.03);
                    border: 1px solid rgba(255, 153, 0, 0.2);
                    box-shadow: 0 0 40px rgba(255, 153, 0, 0.1), inset 0 0 20px rgba(0, 0, 0, 0.5);
                    overflow: hidden;
                }

                .rotate-icon-container {
                    position: relative;
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 30px;
                    color: var(--tva-amber);
                }

                .rotate-icon {
                    width: 100%;
                    height: 100%;
                    animation: tiltPhone 2.5s ease-in-out infinite;
                }

                .rotate-arrow {
                    position: absolute;
                    inset: -10px;
                    color: var(--tva-amber);
                    opacity: 0.5;
                    animation: spinArrow 2.5s ease-in-out infinite;
                }

                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 12px;
                    background: rgba(255, 0, 0, 0.1);
                    border: 1px solid rgba(255, 0, 0, 0.3);
                    margin-bottom: 20px;
                }

                .status-badge span {
                    font-size: 10px;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    color: var(--tva-red);
                }

                .status-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: var(--tva-red);
                    box-shadow: 0 0 8px var(--tva-red);
                    animation: pulse 1s ease-in-out infinite;
                }

                .title {
                    font-size: 20px;
                    font-weight: 400;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: var(--tva-amber);
                    margin-bottom: 15px;
                    text-shadow: 0 0 10px rgba(255, 153, 0, 0.3);
                }

                .message {
                    font-size: 12px;
                    line-height: 1.8;
                    color: rgba(255, 153, 0, 0.6);
                    letter-spacing: 0.05em;
                }

                .scanline {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: rgba(255, 153, 0, 0.3);
                    box-shadow: 0 0 10px var(--tva-amber);
                    animation: scan 3s linear infinite;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes tiltPhone {
                    0%, 100% { transform: rotate(0deg); }
                    40%, 60% { transform: rotate(-90deg); }
                }

                @keyframes spinArrow {
                    0%, 20% { opacity: 0; transform: rotate(0deg); }
                    40%, 60% { opacity: 0.8; transform: rotate(-90deg); }
                    80%, 100% { opacity: 0; transform: rotate(-90deg); }
                }

                @keyframes scan {
                    0% { top: -10%; }
                    100% { top: 110%; }
                }
            `}</style>
        </div>
    );
}
