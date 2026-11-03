'use client';

import { useState } from 'react';
import { PROJECTS, LegacyProject } from '@/lib/data';

export function ProjectsSection() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(PROJECTS[0]?.id || '');
  const activeProject: LegacyProject =
    PROJECTS.find((p) => p.id === selectedProjectId) || PROJECTS[0];

  return (
    <div className="w-full h-full min-h-[calc(100vh-110px)] p-4 md:p-8 font-mono flex flex-col justify-between overflow-y-auto custom-scrollbar select-text">
      {/* Header Bar */}
      <div className="border-b border-[#7A4210] pb-3 mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-[#FF8C24] text-[#120B05] text-[10px] font-bold tracking-widest">
            TIMEDOOR EVIDENCE
          </span>
          <span className="text-xs text-[#FF8C24] tracking-widest">
            ARCHIVE CLASSIFICATION: SEC-04
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-[#7A4210]">
          <span>RECORD COUNT:</span>
          <span className="text-[#FFB84D] font-bold">{PROJECTS.length.toString().padStart(2, '0')}</span>
          <span>|</span>
          <span className="text-[#00FF66] font-bold">STATUS: DECLASSIFIED</span>
        </div>
      </div>

      {/* Main Grid: Left Case List / Right Detailed Schematic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        {/* Left Case Index (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
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

        {/* Right Project Schematic View (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between border border-[#FF8C24] bg-[#120B05] p-5 md:p-7 shadow-[0_0_20px_rgba(255,140,36,0.15)] relative">
          {/* Corner Reticle Ticks */}
          <span className="absolute -top-1.5 -left-1.5 text-xs text-[#FF8C24]">+</span>
          <span className="absolute -top-1.5 -right-1.5 text-xs text-[#FF8C24]">+</span>
          <span className="absolute -bottom-1.5 -left-1.5 text-xs text-[#FF8C24]">+</span>
          <span className="absolute -bottom-1.5 -right-1.5 text-xs text-[#FF8C24]">+</span>

          <div>
            {/* Header Readout */}
            <div className="flex flex-wrap items-center justify-between border-b border-[#7A4210] pb-2 mb-4 text-xs">
              <span className="text-[#FFB84D] font-bold tracking-widest">
                {activeProject.codeName || 'TIMEDOOR CASE SPECIFICATION'}
              </span>
              <span className="text-[10px] text-[#00FF66]">
                AUTHENTICATION: VERIFIED [OK]
              </span>
            </div>

            {/* Title & Category */}
            <h2 className="text-2xl md:text-3xl font-light uppercase tracking-wide text-[#FF8C24] crt-glow mb-1">
              {activeProject.title}
            </h2>
            <div className="text-xs uppercase tracking-widest text-[#FFB84D] mb-4">
              &gt;&gt; CATEGORY: {activeProject.category || 'ENTERPRISE SYSTEM'}
            </div>

            {/* Problem Solved */}
            {activeProject.problemSolved && (
              <div className="border border-[#7A4210] p-3 mb-4 bg-[#120B05]/80">
                <span className="text-[10px] uppercase tracking-widest text-[#FF3B1F] block mb-1 font-bold">
                  [PROBLEM SOLVED & MISSION OBJECTIVE]
                </span>
                <p className="text-xs md:text-sm text-[#FF8C24]/90 leading-relaxed">
                  {activeProject.problemSolved}
                </p>
              </div>
            )}

            {/* Summary */}
            <div className="mb-4">
              <span className="text-[10px] uppercase tracking-widest text-[#7A4210] block mb-1">
                SYSTEM SUMMARY
              </span>
              <p className="text-xs md:text-sm text-[#FF8C24]/80 leading-relaxed">
                {activeProject.description || activeProject.summary}
              </p>
            </div>

            {/* Architecture Highlights */}
            {activeProject.architectureHighlights && activeProject.architectureHighlights.length > 0 && (
              <div className="mb-4">
                <span className="text-[10px] uppercase tracking-widest text-[#FFB84D] block mb-2 font-bold">
                  ARCHITECTURE & ENGINEERING HIGHLIGHTS:
                </span>
                <ul className="space-y-1.5 text-xs text-[#FF8C24]/90">
                  {activeProject.architectureHighlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#FFB84D] font-bold">&gt;</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack Artifacts */}
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-widest text-[#7A4210] block mb-2">
                TECHNOLOGY ARTIFACTS
              </span>
              <div className="flex flex-wrap gap-2">
                {activeProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs border border-[#FF8C24] bg-[#FF8C24]/10 text-[#FFB84D]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons: Live Demo + GitHub */}
          <div className="border-t border-[#7A4210] pt-4 flex flex-wrap gap-3">
            {activeProject.liveUrl ? (
              <a
                href={activeProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tva-button primary text-xs"
              >
                <span>⚡</span> OPEN TIMEDOOR // LIVE DEMO
              </a>
            ) : null}

            {activeProject.githubUrl ? (
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tva-button text-xs"
              >
                <span>⌨</span> SOURCE CODE // GITHUB
              </a>
            ) : null}

            <button
              type="button"
              onClick={() => {
                alert(`TIMEDOOR CASE ${activeProject.temporalTag || 'EVD'}: Verified by TVA Archive.`);
              }}
              className="tva-button text-xs text-[#7A4210] border-[#7A4210] hover:border-[#FF8C24]"
            >
              INSPECT TELEMETRY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ProjectsSection.displayName = 'ProjectsSection';
