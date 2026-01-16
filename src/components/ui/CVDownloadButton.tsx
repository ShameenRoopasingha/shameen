'use client';

import { useState, useEffect } from 'react';
import { useProfile } from '@/lib/data';

/**
 * CV Download Button - Circular highlighted design
 * Aligned with navigation dots, more visible with amber glow
 */
export function CVDownloadButton() {
    const profile = useProfile();
    const [isVisible, setIsVisible] = useState(false);

    // Delay appearance to after boot sequence
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    // Only show if resumeUrl is set and after delay
    if (!profile?.resumeUrl || !isVisible) return null;

    return (
        <>
            <div className="cv-btn-wrapper">
                <a
                    href={profile.resumeUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cv-btn"
                    title="Download CV"
                >
                    {/* Document/File icon - more suitable for CV */}
                    <svg className="cv-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                </a>
                <span className="cv-label">CV</span>
            </div>

            <style jsx>{`
                .cv-btn-wrapper {
                    position: fixed;
                    right: 13px;
                    bottom: 106px;
                    z-index: 20;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 6px;
                    opacity: 0;
                    animation: fadeInCV 0.5s ease forwards;
                }
                
                .cv-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 42px;
                    height: 42px;
                    border-radius: 50%;
                    border: 1px solid rgba(255, 153, 0, 0.4);
                    background: rgba(255, 153, 0, 0.08);
                    text-decoration: none;
                    cursor: pointer;
                    box-shadow: 0 0 15px rgba(255, 153, 0, 0.15);
                    transition: all 0.3s ease;
                }
                
                .cv-btn:hover {
                    border-color: var(--tva-amber);
                    background: rgba(255, 153, 0, 0.15);
                    box-shadow: 0 0 25px rgba(255, 153, 0, 0.4);
                    transform: scale(1.1);
                }
                
                .cv-icon {
                    width: 20px;
                    height: 20px;
                    stroke: var(--tva-amber);
                    transition: all 0.3s ease;
                }
                
                .cv-btn:hover .cv-icon {
                    filter: drop-shadow(0 0 4px rgba(255, 153, 0, 0.8));
                }
                
                .cv-label {
                    font-size: 9px;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    color: rgba(255, 153, 0, 0.5);
                    font-family: var(--font-mono);
                }
                
                @keyframes fadeInCV {
                    from { 
                        opacity: 0; 
                        transform: translateY(10px);
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0);
                    }
                }
                
                @media (max-width: 768px) {
                    .cv-btn-wrapper {
                        right: 10px;
                        bottom: 50px;
                        gap: 4px;
                    }
                    .cv-btn {
                        width: 36px;
                        height: 36px;
                    }
                    .cv-icon {
                        width: 18px;
                        height: 18px;
                    }
                    .cv-label {
                        font-size: 8px;
                    }
                }
            `}</style>
        </>
    );
}

CVDownloadButton.displayName = 'CVDownloadButton';
