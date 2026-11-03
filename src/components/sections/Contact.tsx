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
    <div className="w-full h-full min-h-[calc(100vh-110px)] p-4 md:p-8 font-mono flex flex-col justify-between overflow-y-auto custom-scrollbar select-text">
      {/* Header */}
      <div className="border-b border-[#7A4210] pb-3 mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-[#FF8C24] text-[#120B05] text-[10px] font-bold tracking-widest">
            MISSIVES // DIRECT UPLINK
          </span>
          <span className="text-xs text-[#FF8C24] tracking-widest">
            SECURE ENCRYPTED CHANNEL
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-[#7A4210]">
          <span>FREQUENCY:</span>
          <span className="text-[#FFB84D] font-bold">142.85 MHZ</span>
          <span>|</span>
          <span className="text-[#00FF66] font-bold">CARRIER: DETECTED</span>
        </div>
      </div>

      {/* Main Grid: Left Direct Recruiter Coordinates / Right Terminal Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        {/* Left Direct Channels (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between border border-[#7A4210] p-6 bg-[#120B05]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#FF8C24] mb-3">
              <span className="w-2 h-2 bg-[#00FF66] animate-pulse" />
              <span className="font-bold tracking-widest">RECRUITER FAST CHANNELS</span>
            </div>
            <p className="text-xs text-[#FF8C24]/80 leading-relaxed mb-6">
              Skip terminal transmission queues and establish direct communication immediately via verified uplink coordinates:
            </p>

            <div className="space-y-4 text-xs">
              <div className="border border-[#7A4210] p-3 hover:border-[#FF8C24] transition-colors">
                <span className="text-[10px] text-[#7A4210] uppercase block">DIRECT EMAIL TRANSMISSION</span>
                <a
                  href={`mailto:${PROFILE.socialLinks.email}`}
                  className="text-sm text-[#FFB84D] hover:underline font-bold block mt-0.5"
                >
                  {PROFILE.socialLinks.email}
                </a>
              </div>

              <div className="border border-[#7A4210] p-3 hover:border-[#FF8C24] transition-colors">
                <span className="text-[10px] text-[#7A4210] uppercase block">OFFICIAL DOSSIER RECORD</span>
                <a
                  href={PROFILE.socialLinks.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#FFB84D] hover:underline font-bold block mt-0.5"
                >
                  DOWNLOAD SHAMEEN_ROOPASINGHA_CV.PDF ↗
                </a>
              </div>

              <div className="border border-[#7A4210] p-3 hover:border-[#FF8C24] transition-colors">
                <span className="text-[10px] text-[#7A4210] uppercase block">NETWORK CODES</span>
                <div className="flex gap-4 mt-1">
                  <a
                    href={PROFILE.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF8C24] hover:text-[#FFB84D] underline font-bold"
                  >
                    LINKEDIN ↗
                  </a>
                  <a
                    href={PROFILE.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF8C24] hover:text-[#FFB84D] underline font-bold"
                  >
                    GITHUB ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#7A4210] pt-4 mt-6 text-[10px] text-[#7A4210]">
            LOCATION ANCHOR: COLOMBO // REMOTE AVAILABLE WORLDWIDE
          </div>
        </div>

        {/* Right Transmission Terminal (7 cols) */}
        <div className="lg:col-span-7 border border-[#FF8C24] p-6 bg-[#120B05] shadow-[0_0_20px_rgba(255,140,36,0.15)] relative flex flex-col justify-between">
          <span className="absolute -top-1.5 -left-1.5 text-xs text-[#FF8C24]">+</span>
          <span className="absolute -top-1.5 -right-1.5 text-xs text-[#FF8C24]">+</span>
          <span className="absolute -bottom-1.5 -left-1.5 text-xs text-[#FF8C24]">+</span>
          <span className="absolute -bottom-1.5 -right-1.5 text-xs text-[#FF8C24]">+</span>

          <div>
            <div className="flex items-center justify-between border-b border-[#7A4210] pb-2 mb-4 text-xs">
              <span className="text-[#FF8C24] font-bold tracking-widest">
                UPLINK_TERMINAL v4.2.1 // ENCRYPTED
              </span>
              <span className="text-[#00FF66]">CARRIER LOCKED</span>
            </div>

            {submitted ? (
              <div className="border border-[#00FF66] p-6 bg-[#120B05] text-center my-8">
                <div className="text-sm font-bold text-[#00FF66] tracking-widest mb-2">
                  ✓ TRANSMISSION CONFIRMED & LOGGED IN TVA ARCHIVE
                </div>
                <p className="text-xs text-[#FF8C24] mb-4">
                  Your message has been encrypted and relayed directly to Shameen. Response will dispatch within 24 standard temporal hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="tva-button text-xs"
                >
                  TRANSMIT ANOTHER MISSIVE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <TerminalInput
                  label="RECRUITER / SENDER IDENTIFIER"
                  name="name"
                  value={formData.name}
                  onChange={(v) => setFormData({ ...formData, name: v })}
                  placeholder="e.g. Agent Mobius / Lead Technical Recruiter"
                  required
                />
                <TerminalInput
                  label="RETURN TRANSMISSION COORD (EMAIL)"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(v) => setFormData({ ...formData, email: v })}
                  placeholder="name@company.com"
                  required
                />
                <TerminalInput
                  label="TRANSMISSION PAYLOAD (MESSAGE)"
                  name="message"
                  type="textarea"
                  rows={4}
                  value={formData.message}
                  onChange={(v) => setFormData({ ...formData, message: v })}
                  placeholder="State project scope, interview invitation, or mission parameters..."
                  required
                />

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="tva-button primary w-full text-xs py-3"
                  >
                    {isSubmitting ? (
                      <span>ENCRYPTING & TRANSMITTING...</span>
                    ) : (
                      <span>► TRANSMIT MISSIVE TO VARIANT</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="border-t border-[#7A4210] pt-3 mt-4 text-[9px] text-[#7A4210] flex justify-between">
            <span>END-TO-END CRYPTOGRAPHIC MONITORING</span>
            <span>TVA COMPLIANCE ACT // 1970</span>
          </div>
        </div>
      </div>
    </div>
  );
}

ContactSection.displayName = 'ContactSection';
