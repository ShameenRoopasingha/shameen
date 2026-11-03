'use client';

import { useState } from 'react';
import { PROJECTS } from '@/lib/data';
import { soundFx } from '@/lib/sound';
import { useAppDispatch } from '@/store/hooks';
import { setTargetSection } from '@/store/navigationSlice';
import { ToastNotification } from '@/components/ui/ToastNotification';

export function ProjectsSection() {
  const dispatch = useAppDispatch();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const copyLink = (url: string, title: string) => {
    soundFx.playMechanicalClick();
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(url);
      setToastMsg(`COPIED CODEBASE LINK: ${title}`);
    }
  };

  const goToNextProgram = () => {
    soundFx.playWarpChirp();
    dispatch(setTargetSection(2)); // Navigate to Experience
  };

  return (
    <div className="w-full flex flex-col font-mono select-text space-y-4 md:space-y-6">
      <ToastNotification message={toastMsg} onClear={() => setToastMsg(null)} />

      {/* Header Bar */}
      <div className="border-b border-[#7A4210] pb-2 sm:pb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-[#FF8C24] text-[#120B05] text-[10px] font-bold tracking-widest">
            TIMEDOOR EVIDENCE
          </span>
          <span className="text-[10px] sm:text-xs text-[#FF8C24] tracking-widest hidden sm:inline">
            CANONICAL ARCHIVE: SEC-04
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#7A4210]">
          <span className="text-[#FFB84D] font-bold">{PROJECTS.length} VERIFIED CASES</span>
          <span className="text-[#00FF66] font-bold hidden sm:inline">DECLASSIFIED</span>
        </div>
      </div>

      {/* Mobile-First Project Cards: Single Column Vertical Stack on Mobile, expanding to 2-Col on md/lg */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {PROJECTS.map((proj, idx) => (
          <div
            key={proj.id}
            className="border border-[#FF8C24] bg-[#120B05] p-4 sm:p-5 shadow-[0_0_15px_rgba(255,140,36,0.12)] relative flex flex-col justify-between"
          >
            {/* Corner Reticle Ticks */}
            <span className="absolute -top-1.5 -left-1.5 text-xs text-[#FF8C24] select-none">+</span>
            <span className="absolute -top-1.5 -right-1.5 text-xs text-[#FF8C24] select-none">+</span>
            <span className="absolute -bottom-1.5 -left-1.5 text-xs text-[#FF8C24] select-none">+</span>
            <span className="absolute -bottom-1.5 -right-1.5 text-xs text-[#FF8C24] select-none">+</span>

            <div>
              {/* Header Metadata */}
              <div className="flex items-center justify-between border-b border-[#7A4210] pb-2 mb-3 text-[10px]">
                <span className="text-[#FFB84D] font-bold tracking-widest">
                  {proj.codeName || `CASE-${idx + 1}`}
                </span>
                <span className="px-1.5 py-0.2 border border-[#7A4210] text-[#00FF66] text-[9px] font-bold">
                  {proj.status || 'VERIFIED'}
                </span>
              </div>

              {/* Title & Category */}
              <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-[#FF8C24] crt-glow mb-1">
                {proj.title}
              </h2>
              <div className="text-[10px] uppercase tracking-widest text-[#FFB84D] mb-3">
                &gt;&gt; {proj.category}
              </div>

              {/* Problem Solved & Mission */}
              {proj.problemSolved && (
                <div className="border border-[#7A4210] p-2.5 sm:p-3 mb-3 bg-[#120B05]/80">
                  <span className="text-[9px] uppercase tracking-widest text-[#FF3B1F] block mb-1 font-bold">
                    [MISSION & PROBLEM SOLVED]
                  </span>
                  <p className="text-xs text-[#FF8C24]/90 leading-relaxed">
                    {proj.problemSolved}
                  </p>
                </div>
              )}

              {/* Summary Description */}
              <p className="text-xs text-[#FF8C24]/80 leading-relaxed mb-3">
                {proj.summary}
              </p>

              {/* Architecture Highlights */}
              {proj.architectureHighlights && proj.architectureHighlights.length > 0 && (
                <div className="mb-3">
                  <span className="text-[9px] uppercase tracking-widest text-[#FFB84D] block mb-1.5 font-bold">
                    ENGINEERING HIGHLIGHTS:
                  </span>
                  <ul className="space-y-1 text-xs text-[#FF8C24]/90">
                    {proj.architectureHighlights.slice(0, 3).map((hl, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#FFB84D] font-bold flex-shrink-0">&gt;</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Wrapping Tech Stack Badges */}
              <div className="mb-4">
                <span className="text-[9px] uppercase tracking-widest text-[#7A4210] block mb-1.5">
                  TECH STACK
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] border border-[#FF8C24] bg-[#FF8C24]/10 text-[#FFB84D]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Full-width Mobile Action Buttons (min-h-[44px]) */}
            <div className="border-t border-[#7A4210] pt-3 flex flex-col sm:flex-row gap-2">
              {proj.githubUrl && (
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tva-button primary w-full sm:flex-1 text-xs"
                >
                  <span>⚡</span> SOURCE CODE ↗
                </a>
              )}
              <button
                type="button"
                onClick={() => copyLink(proj.githubUrl || '', proj.title)}
                className="tva-button w-full sm:w-auto text-xs"
              >
                <span>📋</span> COPY LINK
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Deliberate Bottom-of-Section Terminal Button */}
      <div className="border-t border-[#7A4210] pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-[9px] text-[#7A4210] uppercase tracking-widest text-center sm:text-left">
          ALL EVIDENCE SOURCED DIRECTLY FROM PRODUCTION & REPO RECORDS
        </span>
        <button
          type="button"
          onClick={goToNextProgram}
          className="tva-button primary w-full sm:w-auto text-xs font-bold"
        >
          [NEXT PROGRAM: SACRED TIMELINE -&gt;]
        </button>
      </div>
    </div>
  );
}

ProjectsSection.displayName = 'ProjectsSection';
