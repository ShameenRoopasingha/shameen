'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { TerminalInput } from '@/components/ui/TerminalInput';

type Phase = 'init' | 'scanning' | 'ready';

interface Feedback {
    id: string;
    name: string;
    company: string | null;
    message: string;
    rating: number;
    createdAt: Date;
}

interface FeedbacksSectionProps {
    feedbacks?: Feedback[];
}

export function FeedbacksSection({ feedbacks = [] }: FeedbacksSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [phase, setPhase] = useState<Phase>('init');
    const [formData, setFormData] = useState({ name: '', company: '', message: '', rating: 5 });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const sequence = async () => {
            await delay(300);
            setPhase('scanning');
            await delay(1000);
            setPhase('ready');
        };
        sequence();
    }, []);

    useEffect(() => {
        if (phase !== 'ready') return;

        gsap.fromTo('.feedback-element',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
        );

        if (window.innerWidth > 768) {
            const handleMouse = (e: MouseEvent) => {
                const content = document.querySelector('.feedback-parallax');
                if (!content) return;
                const x = (e.clientX / window.innerWidth - 0.5) * 10;
                const y = (e.clientY / window.innerHeight - 0.5) * 6;
                gsap.to(content, { x, y, duration: 0.6, ease: 'power2.out' });
            };
            window.addEventListener('mousemove', handleMouse);
            return () => window.removeEventListener('mousemove', handleMouse);
        }
    }, [phase]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setIsSubmitted(true);
                setTimeout(() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', company: '', message: '', rating: 5 });
                    setShowForm(false);
                }, 4000);
            }
        } catch {
            // Fallback for demo mode
            await delay(2000);
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({ name: '', company: '', message: '', rating: 5 });
                setShowForm(false);
            }, 4000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const showContent = phase === 'ready';

    return (
        <div ref={containerRef} className="feedbacks-section">
            <BackgroundLayers />

            {phase === 'scanning' && (
                <div className="boot-overlay">
                    <div className="scanning-row">
                        <div className="scanning-dot" />
                        <span className="scanning-text">Loading Field Reports</span>
                    </div>
                    <ScanProgress />
                </div>
            )}

            <div className="feedback-parallax feedback-main" style={{ opacity: showContent ? 1 : 0 }}>
                <div className="feedback-content">
                    {/* Header */}
                    <div className="feedback-element feedback-header">
                        <div className="status-badge">
                            <div className="status-dot" />
                            <span className="status-text">Verified Reports</span>
                        </div>
                        <h1 className="feedback-title">Field<br />Reports</h1>
                        <p className="feedback-desc">
                            Documented assessments from verified contacts who have collaborated with this variant across multiple timelines.
                        </p>
                        <button
                            className="submit-report-btn"
                            onClick={() => setShowForm(!showForm)}
                        >
                            {showForm ? '◄ VIEW REPORTS' : '► SUBMIT REPORT'}
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="feedback-element feedback-area">
                        {showForm ? (
                            <div className="terminal">
                                <div className="terminal-header">
                                    <div className="terminal-left">
                                        <div className="traffic-lights">
                                            <span className="light red" />
                                            <span className="light amber" />
                                            <span className="light green" />
                                        </div>
                                        <span className="terminal-version">REPORT_TERMINAL v2.1.0</span>
                                    </div>
                                    <div className="terminal-status">
                                        <div className={`status-indicator ${isSubmitting ? 'amber' : 'green'}`} />
                                        <span className={isSubmitting ? 'amber' : 'green'}>{isSubmitting ? 'PROCESSING' : 'READY'}</span>
                                    </div>
                                </div>

                                {isSubmitted ? (
                                    <SubmissionSuccess />
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        <TerminalInput
                                            label="Your Designation"
                                            name="name"
                                            value={formData.name}
                                            onChange={(value) => setFormData({ ...formData, name: value })}
                                        />
                                        <TerminalInput
                                            label="Organization (Optional)"
                                            name="company"
                                            value={formData.company}
                                            onChange={(value) => setFormData({ ...formData, company: value })}
                                        />
                                        <div className="rating-field">
                                            <label className="rating-label">Assessment Rating</label>
                                            <div className="rating-stars">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        className={`star-btn ${formData.rating >= star ? 'active' : ''}`}
                                                        onClick={() => setFormData({ ...formData, rating: star })}
                                                    >
                                                        ★
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <TerminalInput
                                            label="Field Report"
                                            name="message"
                                            type="textarea"
                                            value={formData.message}
                                            onChange={(value) => setFormData({ ...formData, message: value })}
                                            rows={4}
                                        />
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !formData.name || !formData.message}
                                            className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                                        >
                                            {isSubmitting ? (
                                                <span className="btn-content">
                                                    <span className="btn-dot" />
                                                    Processing Report...
                                                </span>
                                            ) : '► SUBMIT REPORT'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        ) : (
                            <div className="reports-grid">
                                {feedbacks.length > 0 ? (
                                    feedbacks.map((feedback) => (
                                        <FeedbackCard key={feedback.id} feedback={feedback} />
                                    ))
                                ) : (
                                    <div className="no-reports">
                                        <div className="no-reports-icon">📋</div>
                                        <span className="no-reports-text">No verified reports yet</span>
                                        <span className="no-reports-sub">Be the first to submit a field report</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <HUDOverlay show={showContent} />
            <CornerBrackets />

            <style jsx>{`
                .feedbacks-section {
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

                .scanning-row { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
                .scanning-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: var(--tva-amber);
                    box-shadow: 0 0 15px var(--tva-amber), 0 0 30px var(--tva-amber);
                    animation: pulse 0.4s ease-in-out infinite;
                }
                .scanning-text {
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.4em;
                    color: var(--tva-amber);
                }

                .feedback-main {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    padding: 0 80px;
                    transition: opacity 0.6s ease;
                }
                @media (max-width: 1024px) { .feedback-main { padding: 0 40px; } }
                @media (max-width: 768px) { .feedback-main { padding: 80px 25px 40px; align-items: flex-start; overflow-y: auto; } }

                .feedback-content {
                    display: flex;
                    gap: 60px;
                    max-width: 1300px;
                    width: 100%;
                    margin: 0 auto;
                }
                @media (max-width: 1024px) { .feedback-content { gap: 40px; } }
                @media (max-width: 768px) { .feedback-content { flex-direction: column; gap: 30px; } }

                .feedback-header { width: 320px; flex-shrink: 0; }
                @media (max-width: 1024px) { .feedback-header { width: 260px; } }
                @media (max-width: 768px) { .feedback-header { width: 100%; text-align: center; } }

                .status-badge { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
                @media (max-width: 768px) { .status-badge { justify-content: center; } }
                .status-dot { 
                    width: 10px; 
                    height: 10px; 
                    border-radius: 50%; 
                    background: #00FF00; 
                    box-shadow: 0 0 12px #00FF00;
                    animation: pulse 1.5s ease-in-out infinite; 
                }
                .status-text { font-size: 11px; text-transform: uppercase; letter-spacing: 0.35em; color: #00FF00; }

                .feedback-title {
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
                @media (max-width: 1024px) { .feedback-title { font-size: 38px; } }
                @media (max-width: 768px) { .feedback-title { font-size: 32px; margin-bottom: 20px; } }
                @media (max-width: 480px) { .feedback-title { font-size: 26px; } }

                .feedback-desc {
                    font-size: 13px;
                    line-height: 1.9;
                    color: rgba(255, 153, 0, 0.45);
                    margin-bottom: 30px;
                    max-width: 280px;
                }
                @media (max-width: 768px) { .feedback-desc { max-width: 100%; margin: 0 auto 25px; } }

                .submit-report-btn {
                    padding: 14px 28px;
                    font-size: 12px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.25em;
                    color: var(--tva-amber);
                    background: rgba(255, 153, 0, 0.08);
                    border: 1px solid rgba(255, 153, 0, 0.3);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .submit-report-btn:hover {
                    background: rgba(255, 153, 0, 0.15);
                    border-color: var(--tva-amber);
                    box-shadow: 0 0 30px rgba(255, 153, 0, 0.2);
                }

                .feedback-area { flex: 1; min-height: 400px; }

                .reports-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 20px;
                    max-height: 70vh;
                    overflow-y: auto;
                    padding-right: 10px;
                }
                .reports-grid::-webkit-scrollbar { width: 4px; }
                .reports-grid::-webkit-scrollbar-track { background: rgba(255, 153, 0, 0.05); }
                .reports-grid::-webkit-scrollbar-thumb { background: rgba(255, 153, 0, 0.3); border-radius: 2px; }

                .no-reports {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 80px 40px;
                    background: rgba(255, 153, 0, 0.02);
                    border: 1px dashed rgba(255, 153, 0, 0.15);
                }
                .no-reports-icon { font-size: 48px; margin-bottom: 20px; opacity: 0.5; }
                .no-reports-text {
                    font-size: 14px;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    color: rgba(255, 153, 0, 0.5);
                    margin-bottom: 8px;
                }
                .no-reports-sub {
                    font-size: 11px;
                    color: rgba(255, 153, 0, 0.3);
                    letter-spacing: 0.15em;
                }

                .terminal {
                    padding: 30px 35px;
                    background: rgba(5, 4, 4, 0.95);
                    border: 1px solid rgba(255, 153, 0, 0.2);
                    box-shadow: 0 0 60px rgba(255, 153, 0, 0.03), inset 0 0 40px rgba(0, 0, 0, 0.5);
                }
                @media (max-width: 768px) { .terminal { padding: 20px 18px; } }

                .terminal-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 25px;
                    padding-bottom: 18px;
                    border-bottom: 1px solid rgba(255, 153, 0, 0.12);
                    flex-wrap: wrap;
                    gap: 12px;
                }

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

                .rating-field {
                    margin-bottom: 20px;
                }
                .rating-label {
                    display: block;
                    font-size: 9px;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    color: rgba(255, 153, 0, 0.5);
                    margin-bottom: 10px;
                }
                .rating-stars {
                    display: flex;
                    gap: 8px;
                }
                .star-btn {
                    font-size: 24px;
                    background: none;
                    border: none;
                    color: rgba(255, 153, 0, 0.2);
                    cursor: pointer;
                    transition: all 0.2s ease;
                    padding: 0;
                }
                .star-btn.active {
                    color: var(--tva-amber);
                    text-shadow: 0 0 15px var(--tva-amber);
                }
                .star-btn:hover {
                    color: var(--tva-amber);
                    transform: scale(1.1);
                }

                .submit-btn {
                    width: 100%;
                    margin-top: 20px;
                    padding: 18px 28px;
                    font-size: 13px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.25em;
                    color: var(--tva-amber);
                    background: linear-gradient(90deg, rgba(255, 153, 0, 0.1) 0%, rgba(255, 153, 0, 0.03) 50%, rgba(255, 153, 0, 0.1) 100%);
                    border: 2px solid var(--tva-amber);
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }
                .submit-btn:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                }
                .submit-btn:hover:not(:disabled) {
                    background: rgba(255, 153, 0, 0.2);
                    box-shadow: 0 0 40px rgba(255, 153, 0, 0.3);
                }
                .submit-btn.submitting {
                    background: rgba(255, 153, 0, 0.2);
                    animation: btnPulse 1s ease-in-out infinite;
                }
                @keyframes btnPulse {
                    0%, 100% { box-shadow: 0 0 30px rgba(255, 153, 0, 0.3); }
                    50% { box-shadow: 0 0 60px rgba(255, 153, 0, 0.5); }
                }

                .btn-content { display: flex; align-items: center; justify-content: center; gap: 12px; }
                .btn-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--tva-amber); animation: pulse 0.3s ease-in-out infinite; }

                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
}

function FeedbackCard({ feedback }: { feedback: Feedback }) {
    return (
        <div className="feedback-card">
            <div className="card-header">
                <div className="card-rating">
                    {Array.from({ length: feedback.rating }).map((_, i) => (
                        <span key={i} className="star">★</span>
                    ))}
                </div>
                <span className="card-date">{new Date(feedback.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
            </div>
            <p className="card-message">&ldquo;{feedback.message}&rdquo;</p>
            <div className="card-footer">
                <span className="card-name">{feedback.name}</span>
                {feedback.company && <span className="card-company">{feedback.company}</span>}
            </div>
            <style jsx>{`
                .feedback-card {
                    padding: 24px;
                    background: rgba(255, 153, 0, 0.02);
                    border: 1px solid rgba(255, 153, 0, 0.12);
                    transition: all 0.3s ease;
                }
                .feedback-card:hover {
                    border-color: rgba(255, 153, 0, 0.25);
                    box-shadow: 0 0 30px rgba(255, 153, 0, 0.05);
                }
                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 16px;
                }
                .card-rating { display: flex; gap: 2px; }
                .star { color: var(--tva-amber); font-size: 14px; }
                .card-date { font-size: 9px; color: rgba(255, 153, 0, 0.4); letter-spacing: 0.15em; text-transform: uppercase; }
                .card-message {
                    font-size: 13px;
                    line-height: 1.8;
                    color: rgba(255, 153, 0, 0.7);
                    margin-bottom: 20px;
                    font-style: italic;
                }
                .card-footer { border-top: 1px solid rgba(255, 153, 0, 0.08); padding-top: 14px; }
                .card-name {
                    display: block;
                    font-size: 12px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    color: var(--tva-amber);
                    margin-bottom: 4px;
                }
                .card-company {
                    font-size: 10px;
                    color: rgba(255, 153, 0, 0.4);
                    letter-spacing: 0.1em;
                }
            `}</style>
        </div>
    );
}

function ScanProgress() {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => setProgress(p => Math.min(p + 10, 100)), 80);
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
            <span className="success-title">Report Submitted</span>
            <span className="success-sub">Pending verification by TVA analysts</span>
            <style jsx>{`
                .success { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 50px 20px; text-align: center; }
                .success-icon {
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    margin-bottom: 25px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 3px solid #00FF00;
                    box-shadow: 0 0 40px rgba(0, 255, 0, 0.3), inset 0 0 20px rgba(0, 255, 0, 0.1);
                }
                .success-title { font-size: 22px; text-transform: uppercase; letter-spacing: 0.2em; color: #00FF00; margin-bottom: 10px; text-shadow: 0 0 20px rgba(0, 255, 0, 0.4); }
                .success-sub { font-size: 10px; text-transform: uppercase; letter-spacing: 0.25em; color: rgba(0, 255, 0, 0.6); }
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
            <div className="hud hud-tl"><div className="hud-label">INTERFACE</div><div className="hud-value">FIELD REPORTS</div></div>
            <div className="hud hud-tr">
                <div className="hud-label">VERIFICATION</div>
                <div className="hud-status"><div className="hud-dot" /><span>ACTIVE</span></div>
            </div>
            <div className="hud hud-br"><div className="hud-dot" /><span className="hud-small">Reports Verified</span></div>
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

FeedbacksSection.displayName = 'FeedbacksSection';
FeedbackCard.displayName = 'FeedbackCard';
ScanProgress.displayName = 'ScanProgress';
SubmissionSuccess.displayName = 'SubmissionSuccess';
BackgroundLayers.displayName = 'BackgroundLayers';
HUDOverlay.displayName = 'HUDOverlay';
CornerBrackets.displayName = 'CornerBrackets';
