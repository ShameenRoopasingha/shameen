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
import { soundFx } from '@/lib/sound';

const sectionComponents = [
  Hero,
  ProjectsSection,
  ExperienceSection,
  SkillsSection,
  ReferencesSection,
  ContactSection,
];

export function SectionController() {
  const flashRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { currentSection } = useAppSelector((state) => state.navigation);
  const { setFlashRef } = useWarpTransition();
  const [chronoTime, setChronoTime] = useState<string>('00:00:00 // 616');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Register observer
  useGSAPObserver();

  // Set flash ref
  useEffect(() => {
    setFlashRef(flashRef.current);
  }, [setFlashRef]);

  // Audio state initialization & listeners
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAudioEnabled(soundFx.isEnabled());
    }

    const toggleHelp = () => setHelpOpen((prev) => !prev);
    const toggleAudio = () => {
      const next = soundFx.toggle();
      setAudioEnabled(next);
    };

    window.addEventListener('tva-toggle-help', toggleHelp);
    window.addEventListener('tva-toggle-audio', toggleAudio);

    return () => {
      window.removeEventListener('tva-toggle-help', toggleHelp);
      window.removeEventListener('tva-toggle-audio', toggleAudio);
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

  // Close mobile menu on section change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentSection]);

  const handleSelectSection = (idx: number) => {
    soundFx.playMechanicalClick();
    dispatch(setTargetSection(idx));
  };

  const handleAudioToggle = () => {
    const next = soundFx.toggle();
    setAudioEnabled(next);
  };

  const ActiveComponent = sectionComponents[currentSection] || Hero;
  const currentMeta = SECTION_METADATA[SECTIONS[currentSection]];

  return (
    <div className="relative w-full h-[100dvh] h-screen overflow-hidden flex flex-col bg-[#120B05] font-mono select-none">
      <WarpFlash ref={flashRef} />

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* 1. TOP TEMPAD HARDWARE STATUS BAR                              */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <header className="h-11 md:h-12 border-b border-[#7A4210] bg-[#120B05] flex items-center justify-between px-2 sm:px-3 md:px-6 z-20 flex-shrink-0">
        {/* Left: System Identification */}
        <div className="flex items-center gap-1.5 md:gap-3 text-[10px] md:text-xs">
          <div className="flex items-center gap-1 md:gap-1.5">
            <span className="w-2 h-2 bg-[#FF8C24] shadow-[0_0_8px_#FF8C24]" />
            <span className="font-bold tracking-widest text-[#FF8C24]">
              TVA-OS
            </span>
          </div>
          <span className="text-[#7A4210] hidden sm:inline">|</span>
          <span className="text-[#FFB84D] tracking-wider text-[10px] hidden sm:inline truncate max-w-[160px]">
            {PROFILE.name.toUpperCase()}
          </span>
        </div>

        {/* Center: Live Chrono Ticker */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-[#FF8C24]">
          <span className="text-[#7A4210]">TEMPORAL ANCHOR:</span>
          <span className="text-[#FFB84D] font-bold tracking-widest">{chronoTime}</span>
        </div>

        {/* Right: Audio Toggle + Help + Recruiter 1-Click Fast Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] md:text-xs">
          {/* Retro Audio Toggle */}
          <button
            type="button"
            onClick={handleAudioToggle}
            title="Toggle mechanical relay clicks [Key: M]"
            className={`px-2 py-1 text-[9px] md:text-[10px] border tracking-wider transition-all hidden sm:inline-flex items-center gap-1 ${
              audioEnabled
                ? 'border-[#00FF66] text-[#00FF66] bg-[#00FF66]/10 font-bold'
                : 'border-[#7A4210] text-[#7A4210] hover:text-[#FF8C24]'
            }`}
          >
            <span>AUDIO:</span>
            <span>{audioEnabled ? 'ON' : 'OFF'}</span>
          </button>

          {/* Quick Help Shortcut */}
          <button
            type="button"
            onClick={() => setHelpOpen(true)}
            title="TemPad Help & Keyboard Shortcuts [Key: ?]"
            className="px-2 py-1 border border-[#7A4210] text-[#7A4210] hover:border-[#FF8C24] hover:text-[#FF8C24] transition-all text-[9px] md:text-[10px] tracking-wider font-bold"
          >
            HELP [?]
          </button>

          <a
            href={PROFILE.socialLinks.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-1.5 border border-[#FF8C24] text-[#FF8C24] hover:bg-[#FF8C24] hover:text-[#120B05] transition-all text-[10px] md:text-xs font-bold tracking-wider flex items-center"
          >
            CV ↗
          </a>
          <a
            href={PROFILE.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-1.5 border border-[#7A4210] text-[#FF8C24] hover:border-[#FF8C24] transition-all text-[10px] md:text-xs tracking-wider hidden sm:flex items-center"
          >
            GITHUB
          </a>
          <a
            href={PROFILE.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-1.5 border border-[#7A4210] text-[#FF8C24] hover:border-[#FF8C24] transition-all text-[10px] md:text-xs tracking-wider hidden sm:flex items-center"
          >
            LINKEDIN
          </a>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* 2. SPLIT-BEZEL BODY: LEFT ACTION LIST /// + MAIN VIEWPORT     */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* DESKTOP PERSISTENT SIDEBAR: ACTION LIST /// */}
        <aside className="hidden md:flex w-64 lg:w-72 xl:w-80 border-r border-[#7A4210] bg-[#120B05]/95 flex-col justify-between p-3 lg:p-4 flex-shrink-0 z-10">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#7A4210] pb-2 mb-3">
              <span className="text-xs font-bold tracking-widest text-[#FF8C24]">
                ACTION LIST ///
              </span>
              <span className="tva-cursor">█</span>
            </div>

            {/* Menu Items with Inverted Amber Block Hover */}
            <nav className="space-y-1.5" aria-label="TemPad Navigation">
              {SECTIONS.map((secId, idx) => {
                const meta = SECTION_METADATA[secId];
                const isActive = idx === currentSection;

                return (
                  <button
                    key={secId}
                    type="button"
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

          {/* Bottom Sidebar Diagnostic Readout */}
          <div className="border-t border-[#7A4210] pt-3 text-[10px] text-[#7A4210] space-y-1.5">
            <div className="flex justify-between">
              <span>HOTKEYS:</span>
              <span className="text-[#FF8C24] font-bold">[1 - 6] // [?] HELP</span>
            </div>
            <div className="flex justify-between">
              <span>CALIBRATION:</span>
              <span className="text-[#00FF66]">EARTH-616 // NORMALIZED</span>
            </div>
            <div className="flex justify-between">
              <span>CLEARANCE:</span>
              <span className="text-[#FFB84D]">LEVEL-4 RECRUITER</span>
            </div>
          </div>
        </aside>

        {/* MAIN VIEWPORT: ACTIVE MODULE WITH INTERNAL SCROLLING */}
        <main className="flex-1 h-full overflow-hidden relative flex flex-col">
          {/* CRT Module Header Ticker */}
          <div className="h-7 border-b border-[#7A4210]/60 bg-[#120B05] px-3 md:px-4 flex items-center justify-between text-[9px] md:text-[10px] text-[#7A4210] flex-shrink-0">
            <div className="flex items-center gap-1.5 md:gap-2 truncate">
              <span className="text-[#FF8C24]">&gt;&gt;</span>
              <span className="text-[#FFB84D] font-bold truncate">
                {currentMeta?.tvaLabel} // {currentMeta?.recruiterLabel}
              </span>
            </div>
            <span className="hidden sm:inline text-[#7A4210] flex-shrink-0 ml-2">
              TEMPORAL COORDINATE: {String(currentSection + 1).padStart(2, '0')} / {String(SECTIONS.length).padStart(2, '0')}
            </span>
            <span className="sm:hidden text-[#FF8C24]/75 text-[9px] flex-shrink-0 flex items-center gap-1 font-bold">
              SWIPE ◄ ►
            </span>
          </div>

          {/* Scrollable Viewport Container */}
          <div className="flex-1 w-full h-full overflow-y-auto custom-scrollbar relative -webkit-overflow-scrolling-touch">
            <ActiveComponent />
          </div>
        </main>
      </div>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* 3. MOBILE BOTTOM HANDHELD SCANNER CONTROL DECK (< 768px)       */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <div className="md:hidden flex-shrink-0 z-30">
        {/* Compact Bottom Bar: Current section + Menu toggle */}
        <div className="border-t border-[#FF8C24] bg-[#120B05] flex items-center justify-between px-3 py-2">
          {/* Prev */}
          <button
            type="button"
            disabled={currentSection === 0}
            onClick={() => handleSelectSection(Math.max(0, currentSection - 1))}
            className="px-3 py-2 text-[11px] border border-[#7A4210] text-[#FF8C24] disabled:opacity-30 disabled:pointer-events-none flex items-center"
            aria-label="Previous section"
          >
            ◄
          </button>

          {/* Current Section Label (tappable to open menu) */}
          <button
            type="button"
            onClick={() => {
              soundFx.playMechanicalClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="flex-1 mx-2 px-3 py-2 text-[11px] uppercase tracking-wider border border-[#FF8C24] text-[#FF8C24] font-bold text-center flex items-center justify-center gap-2"
          >
            <span className="text-[#FFB84D]">{currentMeta?.code}</span>
            <span className="truncate">{currentMeta?.tvaLabel}</span>
            <span className="text-[#7A4210] ml-1">{mobileMenuOpen ? '▼' : '▲'}</span>
          </button>

          {/* Next */}
          <button
            type="button"
            disabled={currentSection === SECTIONS.length - 1}
            onClick={() => handleSelectSection(Math.min(SECTIONS.length - 1, currentSection + 1))}
            className="px-3 py-2 text-[11px] border border-[#7A4210] text-[#FF8C24] disabled:opacity-30 disabled:pointer-events-none flex items-center"
            aria-label="Next section"
          >
            ►
          </button>
        </div>

        {/* Expandable Menu Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-[#7A4210] bg-[#120B05] px-2 py-2 space-y-1 max-h-[50vh] overflow-y-auto">
            {SECTIONS.map((secId, idx) => {
              const meta = SECTION_METADATA[secId];
              const isActive = idx === currentSection;

              return (
                <button
                  key={secId}
                  type="button"
                  onClick={() => handleSelectSection(idx)}
                  className={`w-full text-left px-3 py-3 flex items-center gap-3 text-[11px] uppercase tracking-wider border transition-all ${
                    isActive
                      ? 'border-[#FF8C24] bg-[#FF8C24] text-[#120B05] font-bold'
                      : 'border-[#7A4210]/50 text-[#FF8C24] bg-[#120B05]'
                  }`}
                >
                  <span className={`text-[10px] px-1.5 py-0.5 border ${
                    isActive
                      ? 'border-[#120B05] text-[#120B05]'
                      : 'border-[#7A4210] text-[#FFB84D]'
                  }`}>
                    {meta.code}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-bold">{meta.tvaLabel}</span>
                    <span className={`text-[9px] ${isActive ? 'text-[#120B05]/70' : 'text-[#7A4210]'}`}>
                      {meta.recruiterLabel}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* 4. TEMPAD USER OPERATIONS HELP MODAL ([?] OR 'H')               */}
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

            <div className="space-y-3 text-xs">
              <div className="border border-[#7A4210]/50 p-2.5 bg-[#120B05]">
                <div className="text-[10px] text-[#7A4210] uppercase mb-1">DIRECT MODULE JUMP</div>
                <div className="text-[#FFB84D] font-mono">
                  Press <span className="text-[#FF8C24] font-bold">[1 - 6]</span> to jump directly to any TemPad module.
                </div>
              </div>

              <div className="border border-[#7A4210]/50 p-2.5 bg-[#120B05]">
                <div className="text-[10px] text-[#7A4210] uppercase mb-1">SEQUENTIAL PAGING</div>
                <div className="text-[#FFB84D] font-mono">
                  Use <span className="text-[#FF8C24] font-bold">[Arrow Keys]</span> or <span className="text-[#FF8C24] font-bold">[PageUp / PageDn]</span> to step through modules.
                </div>
              </div>

              <div className="border border-[#7A4210]/50 p-2.5 bg-[#120B05]">
                <div className="text-[10px] text-[#7A4210] uppercase mb-1">TOUCH & MOBILE SWIPE</div>
                <div className="text-[#FFB84D] font-mono">
                  Swipe <span className="text-[#FF8C24] font-bold">LEFT</span> to go next, swipe <span className="text-[#FF8C24] font-bold">RIGHT</span> to go previous.
                </div>
              </div>

              <div className="border border-[#7A4210]/50 p-2.5 bg-[#120B05]">
                <div className="text-[10px] text-[#7A4210] uppercase mb-1">AUDIO HARDWARE RELAY</div>
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
                className="tva-button text-[10px]"
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
