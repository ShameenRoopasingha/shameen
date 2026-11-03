'use client';

import { useState } from 'react';
import { PROFILE } from '@/lib/data';
import { TerminalInput } from '@/components/ui/TerminalInput';

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate snappy terminal transmission
    await new Promise((r) => setTimeout(r, 600));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="w-full p-3 sm:p-4 md:p-8 font-mono flex flex-col overflow-y-auto custom-scrollbar select-text">
      {/* Header */}
      <div className="border-b border-[#7A4210] pb-2 sm:pb-3 mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-[#FF8C24] text-[#120B05] text-[10px] font-bold tracking-widest">
            MISSIVES
          </span>
          <span className="text-[10px] sm:text-xs text-[#FF8C24] tracking-widest hidden sm:inline">
            SECURE ENCRYPTED CHANNEL
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#7A4210]">
          <span className="text-[#00FF66] font-bold">CARRIER: DETECTED</span>
        </div>
      </div>

      {/* Main Grid: Left Direct Recruiter Coordinates / Right Terminal Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
        {/* Left Direct Channels (5 cols) */}
        <div className="lg:col-span-5 flex flex-col border border-[#7A4210] p-3 sm:p-4 md:p-6 bg-[#120B05]">
          <div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#FF8C24] mb-2 sm:mb-3">
              <span className="w-2 h-2 bg-[#00FF66] animate-pulse" />
              <span className="font-bold tracking-widest">FAST CHANNELS</span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#FF8C24]/80 leading-relaxed mb-4 sm:mb-6">
              Direct communication via verified uplink coordinates:
            </p>

            <div className="space-y-3 sm:space-y-4 text-xs">
              <a
                href={`mailto:${PROFILE.socialLinks.email}`}
                className="block border border-[#7A4210] p-3 hover:border-[#FF8C24] transition-colors"
              >
                <span className="text-[10px] text-[#7A4210] uppercase block">EMAIL</span>
                <span className="text-xs sm:text-sm text-[#FFB84D] font-bold block mt-0.5 break-all">
                  {PROFILE.socialLinks.email}
                </span>
              </a>

              <a
                href={PROFILE.socialLinks.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-[#7A4210] p-3 hover:border-[#FF8C24] transition-colors"
              >
                <span className="text-[10px] text-[#7A4210] uppercase block">RESUME</span>
                <span className="text-xs sm:text-sm text-[#FFB84D] font-bold block mt-0.5">
                  DOWNLOAD CV (PDF) ↗
                </span>
              </a>

              <div className="border border-[#7A4210] p-3 hover:border-[#FF8C24] transition-colors">
                <span className="text-[10px] text-[#7A4210] uppercase block mb-1">NETWORK</span>
                <div className="flex gap-3 sm:gap-4">
                  <a
                    href={PROFILE.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF8C24] hover:text-[#FFB84D] underline font-bold text-xs sm:text-sm"
                  >
                    LINKEDIN ↗
                  </a>
                  <a
                    href={PROFILE.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF8C24] hover:text-[#FFB84D] underline font-bold text-xs sm:text-sm"
                  >
                    GITHUB ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#7A4210] pt-3 mt-4 sm:mt-6 text-[9px] sm:text-[10px] text-[#7A4210]">
            COLOMBO // REMOTE WORLDWIDE
          </div>
        </div>

        {/* Right Transmission Terminal (7 cols) */}
        <div className="lg:col-span-7 border border-[#FF8C24] p-3 sm:p-4 md:p-6 bg-[#120B05] shadow-[0_0_20px_rgba(255,140,36,0.15)] relative flex flex-col">
          <span className="absolute -top-1.5 -left-1.5 text-xs text-[#FF8C24]">+</span>
          <span className="absolute -top-1.5 -right-1.5 text-xs text-[#FF8C24]">+</span>
          <span className="absolute -bottom-1.5 -left-1.5 text-xs text-[#FF8C24]">+</span>
          <span className="absolute -bottom-1.5 -right-1.5 text-xs text-[#FF8C24]">+</span>

          <div>
            <div className="flex items-center justify-between border-b border-[#7A4210] pb-2 mb-3 sm:mb-4 text-[10px] sm:text-xs">
              <span className="text-[#FF8C24] font-bold tracking-widest">
                UPLINK TERMINAL
              </span>
              <span className="text-[#00FF66]">ENCRYPTED</span>
            </div>

            {submitted ? (
              <div className="border border-[#00FF66] p-4 sm:p-6 bg-[#120B05] text-center my-4 sm:my-8">
                <div className="text-xs sm:text-sm font-bold text-[#00FF66] tracking-widest mb-2">
                  ✓ TRANSMISSION CONFIRMED
                </div>
                <p className="text-[11px] sm:text-xs text-[#FF8C24] mb-4">
                  Message encrypted and relayed. Response within 24 temporal hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="tva-button text-[10px] sm:text-xs"
                >
                  SEND ANOTHER
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <TerminalInput
                  label="SENDER"
                  name="name"
                  value={formData.name}
                  onChange={(v) => setFormData({ ...formData, name: v })}
                  placeholder="Your name / company"
                  required
                />
                <TerminalInput
                  label="EMAIL"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(v) => setFormData({ ...formData, email: v })}
                  placeholder="name@company.com"
                  required
                />
                <TerminalInput
                  label="MESSAGE"
                  name="message"
                  type="textarea"
                  rows={3}
                  value={formData.message}
                  onChange={(v) => setFormData({ ...formData, message: v })}
                  placeholder="Project scope, interview invite, or mission parameters..."
                  required
                />

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="tva-button primary w-full text-[10px] sm:text-xs py-3"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING...</span>
                    ) : (
                      <span>► TRANSMIT MISSIVE</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="border-t border-[#7A4210] pt-2 sm:pt-3 mt-3 sm:mt-4 text-[9px] text-[#7A4210] flex justify-between">
            <span>E2E ENCRYPTED</span>
            <span>TVA // 1970</span>
          </div>
        </div>
      </div>
    </div>
  );
}

ContactSection.displayName = 'ContactSection';
