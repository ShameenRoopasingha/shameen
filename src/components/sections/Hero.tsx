'use client';

import { useState, useEffect } from 'react';
import { PROFILE, SKILLS, PORTFOLIO_DATA } from '@/lib/data';
import { VoltageBar } from '@/components/ui/VoltageBar';
import { ToastNotification } from '@/components/ui/ToastNotification';
import { soundFx } from '@/lib/sound';

type BootPhase = 'booting' | 'ready';

export function Hero() {
  const [bootPhase, setBootPhase] = useState<BootPhase>('booting');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Check sessionStorage for fast boot bypass
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasBooted = sessionStorage.getItem('tva_tempad_booted');
      if (hasBooted === 'true') {
        setBootPhase('ready');
        return;
      }

      // Fast boot under 1.1s
      const timer = setTimeout(() => {
        setBootPhase('ready');
        sessionStorage.setItem('tva_tempad_booted', 'true');
      }, 1000);

      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          clearTimeout(timer);
          setBootPhase('ready');
          sessionStorage.setItem('tva_tempad_booted', 'true');
        }
      };

      window.addEventListener('keydown', handleKey);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKey);
      };
    }
  }, []);

  const handleSkip = () => {
    setBootPhase('ready');
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('tva_tempad_booted', 'true');
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    soundFx.playMechanicalClick();
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      setToastMsg(`COPIED TO CLIPBOARD: ${label}`);
    }
  };

  const keySkills = SKILLS.slice(0, 5);

  return (
    <div className="relative w-full flex flex-col p-3 sm:p-4 md:p-8 font-mono overflow-y-auto custom-scrollbar select-text">
      <ToastNotification message={toastMsg} onClear={() => setToastMsg(null)} />

      {/* Booting Flash Overlay */}
      {bootPhase === 'booting' && (
        <div
          onClick={handleSkip}
          className="absolute inset-0 z-50 bg-[#120B05] flex flex-col items-center justify-center cursor-pointer p-4 sm:p-6"
        >
          <div className="w-full max-w-md border border-[#FF8C24] p-4 sm:p-6 bg-[#120B05] shadow-[0_0_20px_rgba(255,140,36,0.3)]">
            <div className="flex items-center justify-between border-b border-[#7A4210] pb-2 mb-4">
              <span className="text-[10px] sm:text-xs text-[#FF8C24] tracking-widest font-bold">
                TVA-OS BOOTSTRAP // TEMPAD 4.02
              </span>
              <span className="w-2 h-2 bg-[#FF3B1F] animate-pulse" />
            </div>

            <p className="text-[11px] sm:text-xs text-[#FF8C24] mb-3">
              &gt; CALIBRATING QUANTUM COORDINATES...<br />
              &gt; QUERYING VARIANT RECORD: SHAMEEN ROOPASINGHA...<br />
              &gt; CLEARANCE VERIFIED: LEVEL-4 FULL-STACK ENGINEER
            </p>

            <div className="w-full h-2 bg-[#7A4210]/30 border border-[#7A4210] mb-4 overflow-hidden">
              <div className="h-full bg-[#FF8C24] animate-[pulse_0.8s_ease-in-out_infinite] w-3/4" />
            </div>

            <div className="text-[10px] text-[#FFB84D] tracking-widest text-center border-t border-[#7A4210]/60 pt-2">
              [TAP OR PRESS ESC TO SKIP]
            </div>
          </div>
        </div>
      )}

      {/* Top Dossier Title Banner */}
      <div className="border-b border-[#7A4210] pb-3 sm:pb-4 mb-4 sm:mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 bg-[#FF3B1F] text-[#120B05] text-[10px] font-bold tracking-widest">
              OFFICIAL CV DOSSIER
            </span>
            <span className="text-[10px] sm:text-xs text-[#FF8C24] tracking-widest">
              DOC-ID: {PROFILE.variantId}
            </span>
            <span className="text-[#7A4210]">|</span>
            <span className="text-[10px] sm:text-xs text-[#00FF66] font-bold">
              ● VERIFIED DATA
            </span>
          </div>
          <div className="text-[10px] text-[#7A4210] tracking-wider">
            <span>LOCATION:</span>{' '}
            <span className="text-[#FFB84D] font-bold">{PROFILE.location}</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-5xl font-light uppercase tracking-wider text-[#FF8C24] crt-glow">
          {PROFILE.name}
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-[#FFB84D] tracking-widest mt-1">
          &gt;&gt; {PROFILE.role}
        </p>
      </div>

      {/* Main Grid: Left Dossier / Right System Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left Col: Photo + Bio & Education & Core Competencies (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6">
          {/* Bio Box with Photo */}
          <div className="border border-[#7A4210] p-3 sm:p-5 bg-[#120B05]/90 relative">
            <span className="absolute -top-1.5 -left-1.5 text-xs text-[#FF8C24]">+</span>
            <span className="absolute -top-1.5 -right-1.5 text-xs text-[#FF8C24]">+</span>
            <span className="absolute -bottom-1.5 -left-1.5 text-xs text-[#FF8C24]">+</span>
            <span className="absolute -bottom-1.5 -right-1.5 text-xs text-[#FF8C24]">+</span>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              {/* Photo Frame */}
              <div className="relative w-28 h-36 sm:w-36 sm:h-44 flex-shrink-0 border border-[#FF8C24] p-1 bg-[#120B05] overflow-hidden group mx-auto sm:mx-0 flex items-center justify-center">
                {/* Fallback wireframe hologram icon */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[#7A4210] group-hover:text-[#FF8C24] transition-colors p-2 text-center pointer-events-none">
                  <span className="text-2xl mb-1">⬡</span>
                  <span className="text-[9px] uppercase tracking-widest">VARIANT AVATAR</span>
                </div>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/profile.png"
                  alt={PROFILE.name}
                  className="w-full h-full object-cover filter contrast-125 brightness-90 grayscale group-hover:grayscale-0 transition-all duration-150 relative z-1"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-[#FF8C24]/10 pointer-events-none z-2" />
                <div className="absolute bottom-1 left-1 right-1 bg-[#120B05]/90 border border-[#FF8C24]/40 text-[9px] text-[#FF8C24] text-center tracking-widest py-0.5 z-3">
                  ID: SR-2025
                </div>
              </div>

              {/* Bio summary */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-[#7A4210] tracking-widest border-b border-[#7A4210]/40 pb-1 mb-2">
                    <span>CANDIDATE PROFILE SUMMARY</span>
                    <span className="text-[#00FF66] font-bold">AUTHENTICATED</span>
                  </div>
                  <p className="text-[11px] sm:text-xs md:text-sm text-[#FF8C24]/90 leading-relaxed">
                    {PROFILE.summary}
                  </p>
                </div>

                {/* Recruiter Quick Actions */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3 sm:pt-4 mt-2 border-t border-[#7A4210]/40">
                  <a
                    href={PROFILE.socialLinks.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tva-button primary text-[10px] sm:text-xs"
                  >
                    <span>▼</span> CV (PDF)
                  </a>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(PROFILE.socialLinks.email, PROFILE.socialLinks.email)}
                    title="Click to copy email address"
                    className="tva-button text-[10px] sm:text-xs"
                  >
                    <span>✉</span> COPY EMAIL
                  </button>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(PROFILE.socialLinks.phone, PROFILE.socialLinks.phone)}
                    title="Click to copy phone number"
                    className="tva-button text-[10px] sm:text-xs"
                  >
                    <span>☎</span> COPY PHONE
                  </button>
                  <a
                    href={PROFILE.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tva-button text-[10px] sm:text-xs"
                  >
                    GITHUB
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Education Records Box */}
          <div className="border border-[#7A4210] p-3 sm:p-4 bg-[#120B05]/90">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#FFB84D] tracking-widest border-b border-[#7A4210]/60 pb-2 mb-3">
              <span>CANONICAL EDUCATION DOSSIER</span>
              <span className="text-[#00FF66] text-[10px]">VERIFIED RECORDS</span>
            </div>
            <div className="space-y-2.5">
              {PROFILE.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="border border-[#7A4210]/60 p-2.5 bg-[#120B05] hover:border-[#FF8C24] transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] text-[#7A4210] mb-0.5">
                    <span className="text-[#FF8C24] font-bold">{edu.institution}</span>
                    <span className="text-[#FFB84D] font-mono">{edu.year}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-[#FFB84D] font-bold">
                    {edu.degree}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Competencies Box */}
          <div className="border border-[#7A4210] p-3 sm:p-4 bg-[#120B05]/90">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#FFB84D] tracking-widest border-b border-[#7A4210]/60 pb-2 mb-3">
              <span>SPECIALIZED COMPETENCIES</span>
              <span className="text-[#7A4210]">FROM CV</span>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {PORTFOLIO_DATA.variant.coreCompetencies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-[10px] sm:text-xs border border-[#7A4210] bg-[#120B05] text-[#FF8C24] hover:border-[#FF8C24] hover:bg-[#FF8C24]/10 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Live System Diagnostic & Voltage Telemetry (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="border border-[#FF8C24] p-3 sm:p-4 bg-[#120B05] shadow-[0_0_15px_rgba(255,140,36,0.15)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#7A4210] pb-2 mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FF8C24] animate-ping" />
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-[#FF8C24]">
                    SKILLS VOLTAGE READINGS
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-[#00FF66] tracking-widest font-bold">
                  VERIFIED %
                </span>
              </div>

              {/* Voltage Readings with exact CV percentages */}
              <div className="mb-3 sm:mb-4">
                <span className="text-[10px] uppercase tracking-widest text-[#7A4210] block mb-2">
                  FLAGSHIP PROFICIENCY VOLTAGES
                </span>
                <div className="space-y-1">
                  {keySkills.map((skill, index) => (
                    <VoltageBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      index={index}
                      tag={skill.tag || `${skill.level}%`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Diagnostic readout table */}
            <div className="border-t border-[#7A4210] pt-2 sm:pt-3 text-[9px] sm:text-[10px] space-y-1">
              <div className="flex justify-between text-[#7A4210]">
                <span>TOTAL ASSESSED SKILLS:</span>
                <span className="text-[#FF8C24]">{SKILLS.length} METRICS</span>
              </div>
              <div className="flex justify-between text-[#7A4210]">
                <span>ACADEMIC FOCUS:</span>
                <span className="text-[#FFB84D]">COMP SCI (APPLIED AI)</span>
              </div>
              <div className="flex justify-between text-[#7A4210]">
                <span>AVAILABILITY:</span>
                <span className="text-[#00FF66]">PROJECT-BASED & REMOTE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Technical Bar */}
      <div className="border-t border-[#7A4210] pt-3 mt-4 sm:mt-6 flex flex-wrap items-center justify-between text-[9px] sm:text-[10px] text-[#7A4210] tracking-widest gap-2">
        <span>TVA-ARCHIVE // ALL DATA SOURCED DIRECTLY FROM OFFICIAL CV</span>
        <span className="text-[#FF8C24] hidden sm:inline">PRESS [?] FOR KEYBOARD SHORTCUTS MANUAL</span>
      </div>
    </div>
  );
}

Hero.displayName = 'Hero';
