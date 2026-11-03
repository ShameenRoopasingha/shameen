'use client';

import { useState } from 'react';
import { EXPERIENCE } from '@/lib/data';
import { tvaSound } from '@/lib/tvaSound';
import { useAppDispatch } from '@/store/hooks';
import { setTargetSection } from '@/store/navigationSlice';

export function ExperienceSection() {
  const dispatch = useAppDispatch();
  const [activeNodeId, setActiveNodeId] = useState<string>(EXPERIENCE[0]?.id || '');

  const goToNextProgram = () => {
    tvaSound.playConfirm();
    dispatch(setTargetSection(3)); // Navigate to Skills
  };

  const handleSelectNode = (id: string) => {
    tvaSound.playConfirm();
    setActiveNodeId(id);
  };

  return (
    <div className="w-full flex flex-col font-mono select-text space-y-4 md:space-y-6">
      {/* Top Header */}
      <div className="border-b border-[#7A4210] pb-2 sm:pb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-[#FF8C24] text-[#120B05] text-[10px] font-bold tracking-widest font-mono">
            [03] // SACRED_TIMELINE
          </span>
          <span className="tva-meta-label hidden sm:inline">
            CHRONO_REF // CANONICAL_INCIDENTS
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#7A4210]">
          <span className="text-[#FFB84D] font-mono tabular-nums font-bold">
            COUNT // {EXPERIENCE.length} INCIDENTS
          </span>
          <span className="text-[#00FF66] font-mono font-bold hidden sm:inline">
            SYS_STATUS // VERIFIED
          </span>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* VERTICAL GLOWING AMBER TIMELINE WAVE (Mobile-First Architecture)*/}
      {/* pl-6 border-l-2 border-[#FF8C24] down the left edge on mobile  */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <div className="relative pl-5 sm:pl-7 border-l-2 border-[#FF8C24] shadow-[-2px_0_12px_rgba(255,140,36,0.3)] space-y-6 sm:space-y-8 ml-2 sm:ml-4">
        {EXPERIENCE.map((exp, index) => {
          const isActive = exp.id === activeNodeId;
          return (
            <div
              key={exp.id}
              onMouseEnter={() => tvaSound.playHover()}
              onClick={() => handleSelectNode(exp.id)}
              className="relative group cursor-pointer"
            >
              {/* Timeline Reticle Node on the Left Border */}
              <div
                className={`absolute -left-[27px] sm:-left-[35px] top-1.5 w-4 h-4 border transition-all duration-100 flex items-center justify-center ${
                  isActive
                    ? 'border-[#FFB84D] bg-[#FF8C24] shadow-[0_0_14px_#FF8C24]'
                    : 'border-[#7A4210] bg-[#120B05] group-hover:border-[#FF8C24]'
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 ${
                    isActive ? 'bg-[#120B05]' : 'bg-[#FF8C24]'
                  }`}
                />
              </div>

              {/* Milestone Details Card */}
              <div
                className={`border p-3.5 sm:p-5 bg-[#120B05] transition-all duration-100 relative ${
                  isActive
                    ? 'border-[#FF8C24] shadow-[0_0_18px_rgba(255,140,36,0.18)]'
                    : 'border-[#7A4210] hover:border-[#FF8C24]/80'
                }`}
              >
                {/* Corner reticle ticks */}
                <span className="absolute -top-1.5 -left-1.5 text-xs text-[#FF8C24] select-none">+</span>
                <span className="absolute -top-1.5 -right-1.5 text-xs text-[#FF8C24] select-none">+</span>
                <span className="absolute -bottom-1.5 -left-1.5 text-xs text-[#FF8C24] select-none">+</span>
                <span className="absolute -bottom-1.5 -right-1.5 text-xs text-[#FF8C24] select-none">+</span>

                {/* Status Bar */}
                <div className="flex flex-wrap items-center justify-between border-b border-[#7A4210] pb-2 mb-2 text-[10px] gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.2 border border-[#FF8C24] text-[#FF8C24] font-mono font-bold tabular-nums">
                      INCIDENT #{(index + 1).toString().padStart(3, '0')} // RECORD
                    </span>
                    <span className="text-[#00FF66] font-mono font-bold">● VERIFIED</span>
                  </div>
                  <span className="text-[#FFB84D] font-bold font-mono tabular-nums tva-telemetry text-xs">
                    {exp.year}
                  </span>
                </div>

                {/* Role and Organization */}
                <h3 className="tva-heading-md mb-0.5">
                  {exp.role}
                </h3>
                <div className="tva-meta-label text-[11px] mb-3">
                  &gt;&gt; ORGANIZATION // {exp.company}
                </div>

                {/* Summary */}
                <p className="tva-dossier-copy mb-3">
                  {exp.description}
                </p>

                {/* Key Achievements */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="mb-3">
                    <span className="tva-meta-label block text-[10px] text-[#FFB84D] mb-1.5 font-bold">
                      CAREER_ACHIEVEMENTS //
                    </span>
                    <ul className="space-y-1.5 text-xs">
                      {exp.achievements.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#FF8C24] font-bold flex-shrink-0">&gt;</span>
                          <span className="tva-dossier-copy">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div>
                    <span className="tva-meta-label block text-[10px] mb-1">
                      TECH_TELEMETRY //
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-[10px] border border-[#7A4210] text-[#FF8C24] bg-[#120B05] font-mono uppercase"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Deliberate Bottom-of-Section Terminal Button */}
      <div className="border-t border-[#7A4210] pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-[9px] text-[#7A4210] uppercase tracking-widest text-center sm:text-left">
          ALL CAREER INCIDENTS AUTHENTICATED VIA OFFICIAL EMPLOYMENT RECORDS
        </span>
        <button
          type="button"
          onMouseEnter={() => tvaSound.playHover()}
          onClick={goToNextProgram}
          className="tva-button primary w-full sm:w-auto text-xs font-bold"
        >
          [NEXT PROGRAM: CAPABILITY MATRIX -&gt;]
        </button>
      </div>
    </div>
  );
}

ExperienceSection.displayName = 'ExperienceSection';
