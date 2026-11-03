'use client';

import { useState, useEffect } from 'react';
import { PROFILE, SKILLS, PORTFOLIO_DATA } from '@/lib/data';
import { VoltageBar } from '@/components/ui/VoltageBar';
import { ToastNotification } from '@/components/ui/ToastNotification';
import { tvaSound } from '@/lib/tvaSound';
import { useAppDispatch } from '@/store/hooks';
import { setTargetSection } from '@/store/navigationSlice';

type BootPhase = 'booting' | 'ready';

export function Hero() {
  const dispatch = useAppDispatch();
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
    tvaSound.playConfirm();
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      setToastMsg(`COPIED: ${label}`);
    }
  };

  const goToNextProgram = () => {
    tvaSound.playConfirm();
    dispatch(setTargetSection(1)); // Navigate to Projects
  };

  const keySkills = SKILLS.slice(0, 5);

  return (
    <div className="relative w-full flex flex-col font-mono select-text space-y-4 md:space-y-6">
      <ToastNotification message={toastMsg} onClear={() => setToastMsg(null)} />

      {/* Booting Flash Overlay */}
      {bootPhase === 'booting' && (
        <div
          onClick={handleSkip}
          className="fixed inset-0 z-50 bg-[#120B05] flex flex-col items-center justify-center cursor-pointer p-4"
        >
          <div className="w-full max-w-md border border-[#FF8C24] p-4 sm:p-6 bg-[#120B05] shadow-[0_0_20px_rgba(255,140,36,0.3)]">
            <div className="flex items-center justify-between border-b border-[#7A4210] pb-2 mb-3">
              <span className="text-[10px] sm:text-xs text-[#FF8C24] tracking-widest font-bold">
                TVA-OS BOOTSTRAP // TEMPAD 4.02
              </span>
              <span className="w-2 h-2 bg-[#FF3B1F] animate-pulse" />
            </div>

            <p className="text-[11px] sm:text-xs text-[#FF8C24] mb-3 leading-relaxed">
              &gt; CALIBRATING QUANTUM COORDINATES...<br />
              &gt; QUERYING VARIANT RECORD: SHAMEEN ROOPASINGHA...<br />
              &gt; CLEARANCE VERIFIED: LEVEL-4 FULL-STACK ENGINEER
            </p>

            <div className="w-full h-1.5 bg-[#7A4210]/30 border border-[#7A4210] mb-3 overflow-hidden">
              <div className="h-full bg-[#FF8C24] animate-[pulse_0.8s_ease-in-out_infinite] w-3/4" />
            </div>

            <div className="text-[9px] sm:text-[10px] text-[#FFB84D] tracking-widest text-center border-t border-[#7A4210]/60 pt-2">
              [TAP TO BYPASS BOOT SEQUENCE]
            </div>
          </div>
        </div>
      )}

      {/* Top Dossier Title Banner */}
      <div className="border-b border-[#7A4210] pb-3">
        <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
          <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px]">
            <span className="tva-stamp text-[9px]">
              OFFICIAL CV DOSSIER
            </span>
            <span className="text-[#FF8C24] tracking-wider font-mono">
              {PROFILE.variantId}
            </span>
            <span className="text-[#00FF66] font-bold hidden sm:inline">
              ● VERIFIED
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] text-[#FFB84D] font-bold">
            {PROFILE.location}
          </span>
        </div>

        <h1 className="tva-h1 font-bold text-[#FF8C24] tva-glow-strong">
          {PROFILE.name}
        </h1>
        <p className="tva-h3 text-[#FFB84D] mt-0.5">
          &gt;&gt; {PROFILE.role}
        </p>
      </div>

      {/* Main Grid: Left Dossier / Right System Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        {/* Left Column: Photo + Bio & Education & Core Competencies (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Bio Box with Photo Frame */}
          <div className="border border-[#7A4210] p-3 sm:p-5 bg-[#120B05]/90 relative">
            <span className="absolute -top-1.5 -left-1.5 text-xs text-[#FF8C24]">+</span>
            <span className="absolute -top-1.5 -right-1.5 text-xs text-[#FF8C24]">+</span>
            <span className="absolute -bottom-1.5 -left-1.5 text-xs text-[#FF8C24]">+</span>
            <span className="absolute -bottom-1.5 -right-1.5 text-xs text-[#FF8C24]">+</span>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Photo Frame */}
              <div className="relative w-28 h-36 sm:w-32 sm:h-40 flex-shrink-0 border border-[#FF8C24] p-1 bg-[#120B05] overflow-hidden group mx-auto sm:mx-0 flex items-center justify-center">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[#7A4210] pointer-events-none">
                  <span className="text-xl">⬡</span>
                  <span className="text-[8px] uppercase tracking-widest mt-1">VARIANT AVATAR</span>
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
                <div className="absolute bottom-1 left-1 right-1 bg-[#120B05]/95 border border-[#FF8C24]/40 text-[8px] text-[#FF8C24] text-center tracking-widest py-0.5 z-3">
                  ID: SR-2025
                </div>
              </div>

              {/* Bio summary in High-Contrast Sentence Case */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-[#7A4210] tracking-wider md:tracking-widest border-b border-[#7A4210]/40 pb-1 mb-2">
                    <span>CANDIDATE PROFILE SUMMARY</span>
                    <span className="text-[#00FF66] font-bold">READY FOR HIRE</span>
                  </div>
                  <p className="tva-body text-xs sm:text-sm text-[#FFE2B8] leading-relaxed max-w-[65ch]">
                    {PROFILE.summary}
                  </p>
                </div>

                {/* Recruiter Quick Actions (min 44px touch targets) */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 pt-3 mt-2 border-t border-[#7A4210]/40">
                  <a
                    href={PROFILE.socialLinks.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => tvaSound.playHover()}
                    onClick={() => tvaSound.playConfirm()}
                    className="tva-button primary text-[10px] sm:text-xs"
                  >
                    <span>▼</span> CV (PDF)
                  </a>
                  <button
                    type="button"
                    onMouseEnter={() => tvaSound.playHover()}
                    onClick={() => copyToClipboard(PROFILE.socialLinks.email, 'Email')}
                    title="Click to copy email address"
                    className="tva-button text-[10px] sm:text-xs"
                  >
                    <span>✉</span> COPY EMAIL
                  </button>
                  <button
                    type="button"
                    onMouseEnter={() => tvaSound.playHover()}
                    onClick={() => copyToClipboard(PROFILE.socialLinks.phone, 'Phone')}
                    title="Click to copy phone number"
                    className="tva-button text-[10px] sm:text-xs"
                  >
                    <span>☎</span> COPY PHONE
                  </button>
                  <a
                    href={PROFILE.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => tvaSound.playHover()}
                    onClick={() => tvaSound.playConfirm()}
                    className="tva-button text-[10px] sm:text-xs"
                  >
                    GITHUB ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Education Records Box */}
          <div className="border border-[#7A4210] p-3 sm:p-4 bg-[#120B05]/90">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#FFB84D] tracking-wider md:tracking-widest border-b border-[#7A4210]/60 pb-1.5 mb-2.5">
              <span>CANONICAL EDUCATION DOSSIER</span>
              <span className="text-[#00FF66] text-[9px] font-bold">ACCREDITED</span>
            </div>
            <div className="space-y-2">
              {PROFILE.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="border border-[#7A4210]/60 p-2 sm:p-2.5 bg-[#120B05] hover:border-[#FF8C24] transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-1 text-[9px] sm:text-[10px] text-[#7A4210] mb-0.5">
                    <span className="text-[#FF8C24] font-bold">{edu.institution}</span>
                    <span className="text-[#FFB84D] font-mono tva-nums">{edu.year}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-[#FFE2B8] font-bold">
                    {edu.degree}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Competencies Box */}
          <div className="border border-[#7A4210] p-3 sm:p-4 bg-[#120B05]/90">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#FFB84D] tracking-wider md:tracking-widest border-b border-[#7A4210]/60 pb-1.5 mb-2.5">
              <span>CORE TECHNICAL COMPETENCIES</span>
              <span className="text-[#7A4210] text-[9px]">OFFICIAL CV</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {PORTFOLIO_DATA.variant.coreCompetencies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-[10px] sm:text-xs border border-[#7A4210] bg-[#120B05] text-[#FFE2B8] font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live System Diagnostic & Voltage Telemetry (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="border border-[#FF8C24] p-3 sm:p-4 bg-[#120B05] shadow-[0_0_15px_rgba(255,140,36,0.15)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#7A4210] pb-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FF8C24] animate-ping" />
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider md:tracking-widest font-bold text-[#FF8C24]">
                    VOLTAGE TELEMETRY
                  </span>
                </div>
                <span className="text-[9px] text-[#00FF66] tracking-widest font-bold">
                  VERIFIED %
                </span>
              </div>

              {/* Voltage Readings */}
              <div className="mb-3">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider md:tracking-widest text-[#7A4210] block mb-2">
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
            <div className="border-t border-[#7A4210] pt-2 text-[9px] sm:text-[10px] space-y-1 font-mono">
              <div className="flex justify-between text-[#7A4210]">
                <span>TOTAL ASSESSED METRICS:</span>
                <span className="text-[#FF8C24] font-bold tva-nums">{SKILLS.length} SKILLS</span>
              </div>
              <div className="flex justify-between text-[#7A4210]">
                <span>FOCUS:</span>
                <span className="text-[#FFE2B8]">FULL-STACK & SAAS</span>
              </div>
              <div className="flex justify-between text-[#7A4210]">
                <span>WORK PREFERENCE:</span>
                <span className="text-[#00FF66]">PROJECT-BASED / REMOTE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deliberate Bottom-of-Section Terminal Button */}
      <div className="border-t border-[#7A4210] pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-[9px] text-[#7A4210] uppercase tracking-widest text-center sm:text-left">
          END OF DOSSIER // RECRUITER VERIFIED RECORD
        </span>
        <button
          type="button"
          onMouseEnter={() => tvaSound.playHover()}
          onClick={goToNextProgram}
          className="tva-button primary w-full sm:w-auto text-xs font-bold"
        >
          [NEXT PROGRAM: TIMEDOOR PROJECTS -&gt;]
        </button>
      </div>
    </div>
  );
}

Hero.displayName = 'Hero';
