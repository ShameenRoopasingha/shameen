'use client';

import { useState } from 'react';
import { PROFILE } from '@/lib/data';
import { TerminalInput } from '@/components/ui/TerminalInput';
import { ToastNotification } from '@/components/ui/ToastNotification';
import { tvaSound } from '@/lib/tvaSound';
import { useAppDispatch } from '@/store/hooks';
import { setTargetSection } from '@/store/navigationSlice';

export function ContactSection() {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    tvaSound.playConfirm();
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      setToastMsg(`COPIED TO CLIPBOARD: ${label}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    tvaSound.playConfirm();
    setIsSubmitting(true);

    // Simulate snappy terminal transmission
    await new Promise((r) => setTimeout(r, 600));

    tvaSound.playConfirm();
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const returnToStart = () => {
    tvaSound.playConfirm();
    dispatch(setTargetSection(0)); // Return to Dossier
  };

  return (
    <div className="w-full flex flex-col font-mono select-text space-y-4 md:space-y-6">
      <ToastNotification message={toastMsg} onClear={() => setToastMsg(null)} />

      {/* Header */}
      <div className="border-b border-[#7A4210] pb-2 sm:pb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-[#FF8C24] text-[#120B05] text-[10px] font-bold tracking-widest">
            MISSIVES
          </span>
          <span className="text-[10px] sm:text-xs text-[#FF8C24] tracking-widest hidden sm:inline">
            SECURE DIRECT UPLINK
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#7A4210]">
          <span className="text-[#00FF66] font-bold">READY FOR INQUIRIES</span>
        </div>
      </div>

      {/* Main Grid: Left Direct Recruiter Coordinates / Right Terminal Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
        {/* Left Direct Channels (5 cols on lg:) */}
        <div className="lg:col-span-5 flex flex-col border border-[#7A4210] p-4 sm:p-5 bg-[#120B05]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#FF8C24] mb-2 sm:mb-3">
              <span className="w-2 h-2 bg-[#00FF66] animate-pulse" />
              <span className="font-bold tracking-widest">VERIFIED CONTACT CHANNELS</span>
            </div>
            <p className="text-xs text-[#FF8C24]/80 leading-relaxed mb-4">
              Connect directly with Shameen regarding project-based roles, full-stack web engineering, or SaaS collaborations:
            </p>

            <div className="space-y-3 text-xs">
              {/* Email Card with 1-Tap Copy */}
              <div className="border border-[#7A4210] p-3 hover:border-[#FF8C24] transition-colors flex items-center justify-between gap-2">
                <div className="truncate">
                  <span className="text-[9px] sm:text-[10px] text-[#7A4210] uppercase block">OFFICIAL EMAIL</span>
                  <a
                    href={`mailto:${PROFILE.socialLinks.email}`}
                    className="text-xs sm:text-sm text-[#FFB84D] font-bold block mt-0.5 truncate hover:underline"
                  >
                    {PROFILE.socialLinks.email}
                  </a>
                </div>
                <button
                  type="button"
                  onMouseEnter={() => tvaSound.playHover()}
                  onClick={() => copyToClipboard(PROFILE.socialLinks.email, 'Email')}
                  className="min-h-[44px] min-w-[50px] px-2 text-[10px] border border-[#7A4210] text-[#FF8C24] hover:border-[#FF8C24] flex-shrink-0 inline-flex items-center justify-center font-bold"
                >
                  COPY
                </button>
              </div>

              {/* Phone Card with 1-Tap Copy */}
              <div className="border border-[#7A4210] p-3 hover:border-[#FF8C24] transition-colors flex items-center justify-between gap-2">
                <div>
                  <span className="text-[9px] sm:text-[10px] text-[#7A4210] uppercase block">PHONE / DIRECT LINE</span>
                  <a
                    href={`tel:${PROFILE.socialLinks.phone}`}
                    className="text-xs sm:text-sm text-[#FFB84D] font-bold block mt-0.5 hover:underline"
                  >
                    {PROFILE.socialLinks.phone}
                  </a>
                </div>
                <button
                  type="button"
                  onMouseEnter={() => tvaSound.playHover()}
                  onClick={() => copyToClipboard(PROFILE.socialLinks.phone, 'Phone')}
                  className="min-h-[44px] min-w-[50px] px-2 text-[10px] border border-[#7A4210] text-[#FF8C24] hover:border-[#FF8C24] flex-shrink-0 inline-flex items-center justify-center font-bold"
                >
                  COPY
                </button>
              </div>

              {/* Resume Card */}
              <a
                href={PROFILE.socialLinks.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => tvaSound.playHover()}
                onClick={() => tvaSound.playConfirm()}
                className="block border border-[#7A4210] p-3 hover:border-[#FF8C24] transition-colors"
              >
                <span className="text-[9px] sm:text-[10px] text-[#7A4210] uppercase block">OFFICIAL RESUME RECORD</span>
                <span className="text-xs sm:text-sm text-[#FFB84D] font-bold block mt-0.5">
                  DOWNLOAD SHAMEEN_ROOPASINGHA_CV.PDF ↗
                </span>
              </a>

              {/* Networks */}
              <div className="border border-[#7A4210] p-3 hover:border-[#FF8C24] transition-colors">
                <span className="text-[9px] sm:text-[10px] text-[#7A4210] uppercase block mb-1">PROFESSIONAL NETWORKS</span>
                <div className="flex gap-4">
                  <a
                    href={PROFILE.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => tvaSound.playHover()}
                    onClick={() => tvaSound.playConfirm()}
                    className="text-[#FF8C24] hover:text-[#FFB84D] underline font-bold text-xs sm:text-sm"
                  >
                    LINKEDIN ↗
                  </a>
                  <a
                    href={PROFILE.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => tvaSound.playHover()}
                    onClick={() => tvaSound.playConfirm()}
                    className="text-[#FF8C24] hover:text-[#FFB84D] underline font-bold text-xs sm:text-sm"
                  >
                    GITHUB ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#7A4210] pt-3 mt-4 text-[9px] sm:text-[10px] text-[#7A4210]">
            LOCATION: {PROFILE.location.toUpperCase()} // REMOTE WORLDWIDE
          </div>
        </div>

        {/* Right Transmission Terminal (7 cols on lg:) */}
        <div className="lg:col-span-7 border border-[#FF8C24] p-4 sm:p-6 bg-[#120B05] shadow-[0_0_20px_rgba(255,140,36,0.15)] relative flex flex-col justify-between">
          <span className="absolute -top-1.5 -left-1.5 text-xs text-[#FF8C24] select-none">+</span>
          <span className="absolute -top-1.5 -right-1.5 text-xs text-[#FF8C24] select-none">+</span>
          <span className="absolute -bottom-1.5 -left-1.5 text-xs text-[#FF8C24] select-none">+</span>
          <span className="absolute -bottom-1.5 -right-1.5 text-xs text-[#FF8C24] select-none">+</span>

          <div>
            <div className="flex items-center justify-between border-b border-[#7A4210] pb-2 mb-4 text-xs">
              <span className="text-[#FF8C24] font-bold tracking-widest text-[11px] sm:text-xs">
                DIRECT TRANSMISSION TERMINAL
              </span>
              <span className="text-[#00FF66] text-[10px]">CARRIER ACTIVE</span>
            </div>

            {submitted ? (
              <div className="border border-[#00FF66] p-4 sm:p-6 bg-[#120B05] text-center my-4">
                <div className="text-xs sm:text-sm font-bold text-[#00FF66] tracking-widest mb-2">
                  ✓ TRANSMISSION CONFIRMED & LOGGED
                </div>
                <p className="text-xs text-[#FF8C24] mb-4">
                  Your message has been dispatched to {PROFILE.socialLinks.email}. Shameen will follow up shortly.
                </p>
                <button
                  type="button"
                  onMouseEnter={() => tvaSound.playHover()}
                  onClick={() => {
                    tvaSound.playConfirm();
                    setSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="tva-button text-xs"
                >
                  DISPATCH ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-1">
                <TerminalInput
                  label="RECRUITER / SENDER NAME"
                  name="name"
                  value={formData.name}
                  onChange={(v) => setFormData({ ...formData, name: v })}
                  placeholder="e.g. Lead Technical Recruiter / Engineering Manager"
                  required
                />
                <TerminalInput
                  label="RETURN CONTACT EMAIL"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(v) => setFormData({ ...formData, email: v })}
                  placeholder="recruiter@company.com"
                  required
                />
                <TerminalInput
                  label="PROJECT PARAMETERS / INQUIRY"
                  name="message"
                  type="textarea"
                  rows={3}
                  value={formData.message}
                  onChange={(v) => setFormData({ ...formData, message: v })}
                  placeholder="State project scope, technical requirements, or opportunity details..."
                  required
                />

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={() => tvaSound.playHover()}
                    className="tva-button primary w-full text-xs py-3"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING MISSIVE...</span>
                    ) : (
                      <span>► TRANSMIT MISSIVE TO SHAMEEN</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="border-t border-[#7A4210] pt-2 mt-3 text-[9px] text-[#7A4210] flex justify-between">
            <span>OFFICIAL CV COMMUNICATION PROTOCOL</span>
            <span>TEMPAD 4.02</span>
          </div>
        </div>
      </div>

      {/* Deliberate Bottom-of-Section Terminal Button */}
      <div className="border-t border-[#7A4210] pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-[9px] text-[#7A4210] uppercase tracking-widest text-center sm:text-left">
          ALL CHANNELS DIRECTLY MONITORED BY SHAMEEN ROOPASINGHA
        </span>
        <button
          type="button"
          onMouseEnter={() => tvaSound.playHover()}
          onClick={returnToStart}
          className="tva-button primary w-full sm:w-auto text-xs font-bold"
        >
          [◄ RETURN TO PROGRAM 01: DOSSIER]
        </button>
      </div>
    </div>
  );
}

ContactSection.displayName = 'ContactSection';
