'use client';

import { useState } from 'react';
import { PROJECTS, LegacyProject } from '@/lib/data';

export function ProjectsSection() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(PROJECTS[0]?.id || '');
  const [showList, setShowList] = useState(false);
  const activeProject: LegacyProject =
    PROJECTS.find((p) => p.id === selectedProjectId) || PROJECTS[0];

  return (
    <div className="w-full p-3 sm:p-4 md:p-8 font-mono flex flex-col overflow-y-auto custom-scrollbar select-text">
      {/* Header Bar */}
      <div className="border-b border-[#7A4210] pb-2 sm:pb-3 mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-[#FF8C24] text-[#120B05] text-[10px] font-bold tracking-widest">
            TIMEDOOR EVIDENCE
          </span>
          <span className="text-[10px] sm:text-xs text-[#FF8C24] tracking-widest hidden sm:inline">
            ARCHIVE: SEC-04
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#7A4210]">
          <span className="text-[#FFB84D] font-bold">{PROJECTS.length} RECORDS</span>
          <span className="text-[#00FF66] font-bold hidden sm:inline">DECLASSIFIED</span>
        </div>
      </div>

      {/* Mobile: Project selector dropdown / Desktop: split grid */}
      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => setShowList(!showList)}
          className="w-full px-3 py-3 border border-[#FF8C24] bg-[#120B05] text-[#FF8C24] text-xs uppercase tracking-wider flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <span className="text-[#FFB84D]">{activeProject.temporalTag || 'EVD-001'}</span>
            <span className="truncate font-bold">{activeProject.title}</span>
          </span>
          <span>{showList ? '▼' : '▶'}</span>
        </button>

        {showList && (
          <div className="border border-[#7A4210] border-t-0 bg-[#120B05] max-h-[40vh] overflow-y-auto custom-scrollbar">
            {PROJECTS.map((proj, idx) => {
              const isSelected = proj.id === activeProject.id;
              return (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => {
                    setSelectedProjectId(proj.id);
                    setShowList(false);
                  }}
                  className={`w-full text-left p-3 border-b border-[#7A4210]/30 text-xs transition-all flex items-center gap-3 ${
                    isSelected
                      ? 'bg-[#FF8C24] text-[#120B05] font-bold'
                      : 'text-[#FF8C24]'
                  }`}
                >
                  <span className={`text-[10px] px-1.5 py-0.5 border ${
                    isSelected ? 'border-[#120B05] text-[#120B05]' : 'border-[#7A4210] text-[#FFB84D]'
                  }`}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col truncate">
                    <span className="uppercase tracking-wide truncate">{proj.title}</span>
                    <span className={`text-[9px] ${isSelected ? 'text-[#120B05]/70' : 'text-[#7A4210]'}`}>
                      {proj.techStack.slice(0, 3).join(' • ')}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Grid: Left Case List (desktop) / Right Detailed Schematic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left Case Index — desktop only */}
        <div className="hidden lg:flex lg:col-span-4 flex-col gap-3">
          <div className="text-[11px] uppercase tracking-widest text-[#7A4210] border-b border-[#7A4210]/40 pb-1">
            TIMEDOOR CASE FILES /// SELECT TO DECLASSIFY
          </div>

          <div className="space-y-2">
            {PROJECTS.map((proj, idx) => {
              const isSelected = proj.id === activeProject.id;
              return (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProjectId(proj.id)}
                  className={`p-3 border cursor-pointer transition-all duration-75 ${
                    isSelected
                      ? 'border-[#FF8C24] bg-[#FF8C24] text-[#120B05] font-bold shadow-[0_0_12px_rgba(255,140,36,0.3)]'
                      : 'border-[#7A4210] bg-[#120B05] text-[#FF8C24] hover:border-[#FF8C24]/80'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] tracking-wider mb-1">
                    <span className={isSelected ? 'text-[#120B05]' : 'text-[#FFB84D]'}>
                      {proj.temporalTag || `EVD-00${idx + 1}`}
                    </span>
                    <span className={isSelected ? 'text-[#120B05]' : 'text-[#7A4210]'}>
                      [{(idx + 1).toString().padStart(2, '0')}]
                    </span>
                  </div>

                  <h3 className="text-sm uppercase tracking-wide truncate">
                    {proj.title}
                  </h3>

                  <div className="mt-1 flex flex-wrap gap-1">
                    {proj.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className={`text-[9px] px-1 py-0.2 border ${
                          isSelected
                            ? 'border-[#120B05] bg-[#120B05] text-[#FF8C24]'
                            : 'border-[#7A4210] bg-[#120B05] text-[#7A4210]'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Project Schematic View */}
        <div className="lg:col-span-8 flex flex-col border border-[#FF8C24] bg-[#120B05] p-3 sm:p-5 md:p-7 shadow-[0_0_20px_rgba(255,140,36,0.15)] relative">
          {/* Corner Reticle Ticks */}
          <span className="absolute -top-1.5 -left-1.5 text-xs text-[#FF8C24]">+</span>
          <span className="absolute -top-1.5 -right-1.5 text-xs text-[#FF8C24]">+</span>
          <span className="absolute -bottom-1.5 -left-1.5 text-xs text-[#FF8C24]">+</span>
          <span className="absolute -bottom-1.5 -right-1.5 text-xs text-[#FF8C24]">+</span>

          <div>
            {/* Header Readout */}
            <div className="flex flex-wrap items-center justify-between border-b border-[#7A4210] pb-2 mb-3 sm:mb-4 text-[10px] sm:text-xs gap-2">
              <span className="text-[#FFB84D] font-bold tracking-widest">
                {activeProject.codeName || 'CASE SPECIFICATION'}
              </span>
              <span className="text-[10px] text-[#00FF66]">
                VERIFIED [OK]
              </span>
            </div>

            {/* Title & Category */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-light uppercase tracking-wide text-[#FF8C24] crt-glow mb-1">
              {activeProject.title}
            </h2>
            <div className="text-[10px] sm:text-xs uppercase tracking-widest text-[#FFB84D] mb-3 sm:mb-4">
              &gt;&gt; {activeProject.category || 'ENTERPRISE SYSTEM'}
            </div>

            {/* Problem Solved */}
            {activeProject.problemSolved && (
              <div className="border border-[#7A4210] p-2.5 sm:p-3 mb-3 sm:mb-4 bg-[#120B05]/80">
                <span className="text-[10px] uppercase tracking-widest text-[#FF3B1F] block mb-1 font-bold">
                  [PROBLEM SOLVED]
                </span>
                <p className="text-[11px] sm:text-xs md:text-sm text-[#FF8C24]/90 leading-relaxed">
                  {activeProject.problemSolved}
                </p>
              </div>
            )}

            {/* Summary */}
            <div className="mb-3 sm:mb-4">
              <span className="text-[10px] uppercase tracking-widest text-[#7A4210] block mb-1">
                SYSTEM SUMMARY
              </span>
              <p className="text-[11px] sm:text-xs md:text-sm text-[#FF8C24]/80 leading-relaxed">
                {activeProject.description || activeProject.summary}
              </p>
            </div>

            {/* Architecture Highlights */}
            {activeProject.architectureHighlights && activeProject.architectureHighlights.length > 0 && (
              <div className="mb-3 sm:mb-4">
                <span className="text-[10px] uppercase tracking-widest text-[#FFB84D] block mb-2 font-bold">
                  ARCHITECTURE HIGHLIGHTS:
                </span>
                <ul className="space-y-1.5 text-[11px] sm:text-xs text-[#FF8C24]/90">
                  {activeProject.architectureHighlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#FFB84D] font-bold flex-shrink-0">&gt;</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack Artifacts */}
            <div className="mb-4 sm:mb-6">
              <span className="text-[10px] uppercase tracking-widest text-[#7A4210] block mb-2">
                TECH STACK
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {activeProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs border border-[#FF8C24] bg-[#FF8C24]/10 text-[#FFB84D]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons: Live Demo + GitHub */}
          <div className="border-t border-[#7A4210] pt-3 sm:pt-4 flex flex-wrap gap-2 sm:gap-3">
            {activeProject.liveUrl ? (
              <a
                href={activeProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tva-button primary text-[10px] sm:text-xs"
              >
                <span>⚡</span> LIVE DEMO
              </a>
            ) : null}

            {activeProject.githubUrl ? (
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tva-button text-[10px] sm:text-xs"
              >
                <span>⌨</span> SOURCE CODE
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

ProjectsSection.displayName = 'ProjectsSection';
