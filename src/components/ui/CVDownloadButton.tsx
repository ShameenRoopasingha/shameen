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
            <a
                href={profile.resumeUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="cv-btn"
                title="Download CV"
            >
                {/* Download arrow icon - simple and clear */}
                <svg className="cv-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v12m0 0l-4-4m4 4l4-4"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 17v2a1 1 0 001 1h14a1 1 0 001-1v-2"
                    />
                </svg>
            </a>

            <style jsx>{`
                .cv-btn {
                    position: fixed;
                    right: 26px;
                    bottom: 75px;
                    z-index: 20;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    border: 1px solid rgba(255, 153, 0, 0.4);
                    background: rgba(255, 153, 0, 0.08);
                    text-decoration: none;
                    cursor: pointer;
                    opacity: 0;
                    animation: fadeInCV 0.5s ease forwards;
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
                    width: 18px;
                    height: 18px;
                    stroke: var(--tva-amber);
                    transition: all 0.3s ease;
                }
                
                .cv-btn:hover .cv-icon {
                    filter: drop-shadow(0 0 4px rgba(255, 153, 0, 0.8));
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
                    .cv-btn {
                        right: 12px;
                        bottom: 55px;
                        width: 32px;
                        height: 32px;
                    }
                    .cv-icon {
                        width: 16px;
                        height: 16px;
                    }
                }
            `}</style>
        </>
    );
}

CVDownloadButton.displayName = 'CVDownloadButton';
