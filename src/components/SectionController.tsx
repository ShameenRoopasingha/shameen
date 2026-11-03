'use client';

import { useRef, useEffect, useState } from 'react';
import { Hero } from '@/components/sections/Hero';
import { ProjectsSection } from '@/components/sections/Projects';
import { ExperienceSection } from '@/components/sections/Experience';
import { SkillsSection } from '@/components/sections/Skills';
import { ReferencesSection } from '@/components/sections/References';
import { ContactSection } from '@/components/sections/Contact';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setTargetSection, setSectionByHash } from '@/store/navigationSlice';
import { useWarpTransition } from '@/hooks/useWarpTransition';
import { useGSAPObserver } from '@/hooks/useGSAPObserver';
import { WarpFlash } from '@/components/ui/WarpFlash';
import { SECTIONS, SECTION_METADATA } from '@/lib/constants';
import { PROFILE } from '@/lib/data';
import { tvaSound } from '@/lib/tvaSound';

const sectionComponents = [
  Hero,
  ProjectsSection,
  ExperienceSection,
  SkillsSection,
  ReferencesSection,
  ContactSection,
];

// Mobile 2-row x 3-column thumb keypad configuration
const MOBILE_THUMB_KEYS = [
  { id: 0, label: '01 // DOSSIER' },
  { id: 1, label: '02 // PROJECTS' },
  { id: 2, label: '03 // TIMELINE' },
  { id: 3, label: '04 // SKILLS' },
  { id: 4, label: '05 // LOGS' },
  { id: 5, label: '06 // CONTACT' },
];

export function SectionController() {
  const flashRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { currentSection, isTransitioning } = useAppSelector((state) => state.navigation);
  const { setFlashRef } = useWarpTransition();
  const [chronoTime, setChronoTime] = useState<string>('00:00:00 // 616');
  const [helpOpen, setHelpOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [inputSurge, setInputSurge] = useState(false);

  // Register observer
  useGSAPObserver();

  // Set flash ref
  useEffect(() => {
    setFlashRef(flashRef.current);
  }, [setFlashRef]);

  // Audio state initialization & listeners
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAudioEnabled(!tvaSound.getMuted());
    }

    const toggleHelp = () => setHelpOpen((prev) => !prev);
    const toggleAudio = () => {
      const muted = tvaSound.toggleMute();
      setAudioEnabled(!muted);
    };

    const handleInputSurge = () => {
      setInputSurge(true);
      setTimeout(() => setInputSurge(false), 200);
    };

    window.addEventListener('tva-toggle-help', toggleHelp);
    window.addEventListener('tva-toggle-audio', toggleAudio);
    window.addEventListener('tva-input-active', handleInputSurge);

    return () => {
      window.removeEventListener('tva-toggle-help', toggleHelp);
      window.removeEventListener('tva-toggle-audio', toggleAudio);
      window.removeEventListener('tva-input-active', handleInputSurge);
    };
  }, []);

  // Live Chrono-ticker
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const timeStr = d.toTimeString().split(' ')[0];
      setChronoTime(`${timeStr} // TC-616`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync with URL Hash state on mount & back/forward navigation
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        dispatch(setSectionByHash(hash));
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [dispatch]);

  // Update hash when currentSection changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const currentMeta = SECTION_METADATA[SECTIONS[currentSection]];
    if (currentMeta && window.location.hash !== currentMeta.hash) {
      window.history.replaceState(null, '', currentMeta.hash);
    }
  }, [currentSection]);

  const handleSelectSection = (idx: number) => {
    tvaSound.playConfirm();
    dispatch(setTargetSection(idx));
  };

  const handleAudioToggle = () => {
    const muted = tvaSound.toggleMute();
    setAudioEnabled(!muted);
  };

  const isSurging = isTransitioning || inputSurge;
  const ActiveComponent = sectionComponents[currentSection] || Hero;
  const currentMeta = SECTION_METADATA[SECTIONS[currentSection]];

  return (
    <div className="relative w-full h-dvh max-h-dvh overflow-hidden flex flex-col lg:grid lg:grid-cols-[300px_1fr] lg:grid-rows-[auto_1fr] bg-[#120B05] font-mono select-none">
      <WarpFlash ref={flashRef} />

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* 1. TOP TEMPAD BEZEL BAR (h-12 across mobile & desktop)          */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <header className="h-12 border-b border-[#7A4210] bg-[#120B05] flex items-center justify-between px-3 md:px-5 z-20 flex-shrink-0 lg:col-span-2">
        {/* Left: System Identification & Mini Voltmeter */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-[#FF8C24] shadow-[0_0_8px_#FF8C24]" />
            <span className="font-bold tracking-widest text-[#FF8C24] text-[11px] sm:text-xs">
              TVA-OS // S.ROOPASINGHA
            </span>
          </div>

          {/* Dynamic Hardware Voltage Indicator */}
          <div
            className={`hidden sm:flex items-center gap-1.5 px-2 py-0.5 border text-[10px] transition-colors ${
              isSurging
                ? 'border-[#FF3B1F] bg-[#FF3B1F]/15 text-[#FF3B1F]'
                : 'border-[#7A4210] bg-[#120B05]'
            }`}
          >
            <span className={isSurging ? 'text-[#FF3B1F]' : 'text-[#7A4210]'}>VLT:</span>
            <div className="w-12 h-1.5 bg-[#7A4210]/40 overflow-hidden relative">
              <div
                className={`h-full transition-all duration-100 ${
                  isSurging ? 'w-full bg-[#FF3B1F]' : 'w-4/5 bg-[#FF8C24]'
                }`}
              />
            </div>
            <span
              className={`font-bold font-mono transition-colors ${
                isSurging ? 'text-[#FF3B1F]' : 'text-[#FF8C24]'
              }`}
            >
              {isSurging ? '28.8V' : '24.2V'}
            </span>
          </div>
        </div>

        {/* Center: Live Chrono Ticker (Desktop Only) */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-[#FF8C24]">
          <span className="text-[#7A4210]">TEMPORAL ANCHOR:</span>
          <span className="text-[#FFB84D] font-bold tracking-widest">{chronoTime}</span>
        </div>

        {/* Right: Audio + Help + 1-Tap CV & GITHUB (min 44px touch targets) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Audio Relay Toggle */}
          <button
            type="button"
            onClick={handleAudioToggle}
            title="Toggle authentic TVA audio synthesis [Key: M]"
            className={`min-h-[44px] min-w-[44px] px-2 text-[10px] border tracking-wider transition-all inline-flex items-center justify-center gap-1 ${
              audioEnabled
                ? 'border-[#00FF66] text-[#00FF66] bg-[#00FF66]/10 font-bold shadow-[0_0_8px_rgba(0,255,102,0.2)]'
                : 'border-[#7A4210] text-[#7A4210] hover:text-[#FF8C24]'
            }`}
          >
            <span className="hidden xs:inline">AUDIO:</span>
            <span className="xs:hidden">AUD:</span>
            <span>{audioEnabled ? 'ON' : 'OFF'}</span>
          </button>

          {/* Help Manual Shortcut */}
          <button
            type="button"
            onClick={() => setHelpOpen(true)}
            title="TemPad Help & Shortcuts [Key: ?]"
            className="min-h-[44px] min-w-[44px] px-2 border border-[#7A4210] text-[#7A4210] hover:border-[#FF8C24] hover:text-[#FF8C24] transition-all text-[10px] tracking-wider font-bold inline-flex items-center justify-center"
          >
            [?]
          </button>

          {/* 1-Tap CV (min 44px x 44px touch target) */}
          <a
            href={PROFILE.socialLinks.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-3 border border-[#FF8C24] text-[#FF8C24] hover:bg-[#FF8C24] hover:text-[#120B05] transition-all text-[11px] font-bold tracking-wider inline-flex items-center justify-center"
          >
            CV ↗
          </a>

          {/* 1-Tap GitHub (min 44px x 44px touch target) */}
          <a
            href={PROFILE.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-3 border border-[#7A4210] text-[#FF8C24] hover:border-[#FF8C24] transition-all text-[11px] tracking-wider hidden sm:inline-flex items-center justify-center"
          >
            GITHUB
          </a>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* 2. DESKTOP PERSISTENT TERMINAL SIDEBAR (lg: Only)              */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <aside className="hidden lg:flex border-r border-[#7A4210] bg-[#120B05]/95 flex-col justify-between p-4 flex-shrink-0 z-10">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#7A4210] pb-2 mb-3">
            <span className="text-xs font-bold tracking-widest text-[#FF8C24]">
              ACTION LIST ///
            </span>
            <span className="tva-cursor">█</span>
          </div>

          {/* Desktop Dual-Labeled Menu Items */}
          <nav className="space-y-1.5" aria-label="TemPad Navigation">
            {SECTIONS.map((secId, idx) => {
              const meta = SECTION_METADATA[secId];
              const isActive = idx === currentSection;

              return (
                <button
                  key={secId}
                  type="button"
                  onMouseEnter={() => tvaSound.playHover()}
                  onClick={() => handleSelectSection(idx)}
                  className={`w-full text-left tva-action-item ${
                    isActive ? 'active' : ''
                  }`}
                >
                  <span className="badge text-[10px] px-1 py-0.2 bg-[#FF8C24]/10 border border-[#7A4210] text-[#FFB84D]">
                    {meta.code}
                  </span>
                  <div className="flex flex-col truncate">
                    <span className="text-xs font-bold truncate">
                      {meta.tvaLabel}
                    </span>
                    <span className="text-[9px] opacity-75 truncate">
                      {meta.recruiterLabel}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Readout */}
        <div className="border-t border-[#7A4210] pt-3 text-[10px] text-[#7A4210] space-y-1.5">
          <div className="flex justify-between">
            <span>KEYPAD COMMANDS:</span>
            <span className="text-[#FF8C24] font-bold">[1 - 6] // [?] HELP</span>
          </div>
          <div className="flex justify-between">
            <span>GRID SYNCHRONIZATION:</span>
            <span className="text-[#00FF66]">LOCKED // 24x24</span>
          </div>
          <div className="flex justify-between">
            <span>CLEARANCE:</span>
            <span className="text-[#FFB84D]">LEVEL-4 RECRUITER</span>
          </div>
        </div>
      </aside>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* 3. CENTER CRT VIEWPORT (Smooth touch scrolling, overscroll)    */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <main className="flex-1 overflow-hidden relative flex flex-col min-h-0">
        {/* Module Header Ticker */}
        <div className="h-7 border-b border-[#7A4210]/60 bg-[#120B05] px-3 md:px-4 flex items-center justify-between text-[9px] md:text-[10px] text-[#7A4210] flex-shrink-0">
          <div className="flex items-center gap-1.5 md:gap-2 truncate">
            <span className="text-[#FF8C24]">&gt;&gt;</span>
            <span className="text-[#FFB84D] font-bold truncate">
              {currentMeta?.tvaLabel} // {currentMeta?.recruiterLabel}
            </span>
          </div>
          <span className="text-[#7A4210] flex-shrink-0 text-[9px]">
            PRG {String(currentSection + 1).padStart(2, '0')}/06
          </span>
        </div>

        {/* Center Scroll Container with native touch inertia */}
        <div className="flex-1 w-full overflow-y-auto overscroll-contain px-3 py-4 md:p-6 custom-scrollbar relative -webkit-overflow-scrolling-touch">
          <ActiveComponent />
        </div>
      </main>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* 4. BOTTOM THUMB-DECK (ACTION LIST ///: 2-Row x 3-Col Keypad)   */}
      {/* Fixed/docked in the natural mobile thumb zone (< lg)            */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <nav
        className="lg:hidden border-t-2 border-[#FF8C24] bg-[#120B05] grid grid-cols-3 grid-rows-2 gap-1 p-1 z-30 flex-shrink-0"
        aria-label="Mobile Action List Keypad"
      >
        {MOBILE_THUMB_KEYS.map((key) => {
          const isActive = key.id === currentSection;
          return (
            <button
              key={key.id}
              type="button"
              onMouseEnter={() => tvaSound.playHover()}
              onClick={() => handleSelectSection(key.id)}
              className={`tva-thumb-key text-[10px] ${
                isActive ? 'active' : ''
              }`}
            >
              <span className="font-bold tracking-wider">{key.label}</span>
            </button>
          );
        })}
      </nav>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* 5. TEMPAD USER OPERATIONS HELP MODAL ([?] OR 'H')               */}
      {/* ════════════════════════════════════════════════════════════════ */}
      {helpOpen && (
        <div
          onClick={() => setHelpOpen(false)}
          className="fixed inset-0 z-50 bg-[#120B05]/85 backdrop-blur-xs flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg border border-[#FF8C24] bg-[#120B05] p-5 md:p-6 shadow-[0_0_25px_rgba(255,140,36,0.25)] relative cursor-default"
          >
            <span className="absolute -top-1.5 -left-1.5 text-xs text-[#FF8C24]">+</span>
            <span className="absolute -top-1.5 -right-1.5 text-xs text-[#FF8C24]">+</span>
            <span className="absolute -bottom-1.5 -left-1.5 text-xs text-[#FF8C24]">+</span>
            <span className="absolute -bottom-1.5 -right-1.5 text-xs text-[#FF8C24]">+</span>

            <div className="flex items-center justify-between border-b border-[#7A4210] pb-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF8C24]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#FF8C24]">
                  TEMPAD OPERATOR MANUAL // SHORTCUTS
                </span>
              </div>
              <button
                type="button"
                onClick={() => setHelpOpen(false)}
                className="text-xs text-[#7A4210] hover:text-[#FF8C24] font-bold"
              >
                [ESC / CLOSE]
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="border border-[#7A4210]/50 p-2 bg-[#120B05]">
                <div className="text-[10px] text-[#7A4210] uppercase mb-0.5">MOBILE THUMB-DECK</div>
                <div className="text-[#FFB84D] font-mono">
                  Tap any key on the bottom 2x3 wireframe keypad to instantly load that program module.
                </div>
              </div>

              <div className="border border-[#7A4210]/50 p-2 bg-[#120B05]">
                <div className="text-[10px] text-[#7A4210] uppercase mb-0.5">DIRECT MODULE JUMP (KEYBOARD)</div>
                <div className="text-[#FFB84D] font-mono">
                  Press <span className="text-[#FF8C24] font-bold">[1 - 6]</span> to jump directly to any TemPad module.
                </div>
              </div>

              <div className="border border-[#7A4210]/50 p-2 bg-[#120B05]">
                <div className="text-[10px] text-[#7A4210] uppercase mb-0.5">DESKTOP SCROLL WHEEL</div>
                <div className="text-[#FFB84D] font-mono">
                  Wheel scrolling navigates internal page content. Warping only triggers when scrolled to the exact top or bottom boundary.
                </div>
              </div>

              <div className="border border-[#7A4210]/50 p-2 bg-[#120B05]">
                <div className="text-[10px] text-[#7A4210] uppercase mb-0.5">AUDIO HARDWARE RELAY</div>
                <div className="text-[#FFB84D] font-mono">
                  Press <span className="text-[#FF8C24] font-bold">[M]</span> to toggle authentic 1970s relay click feedback.
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#7A4210] flex items-center justify-between text-[10px] text-[#7A4210]">
              <span>TVA COMPLIANCE // CANTINA CREATIVE</span>
              <button
                type="button"
                onClick={() => setHelpOpen(false)}
                className="tva-button text-[10px] py-1"
              >
                DISMISS MANUAL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

SectionController.displayName = 'SectionController';
