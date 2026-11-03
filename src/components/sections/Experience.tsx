'use client';

import { useState } from 'react';
import { EXPERIENCE, LegacyExperience } from '@/lib/data';

export function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentExp: LegacyExperience = EXPERIENCE[activeIndex] || EXPERIENCE[0];

  return (
    <div className="w-full h-full min-h-[calc(100vh-110px)] p-4 md:p-8 font-mono flex flex-col justify-between overflow-y-auto custom-scrollbar select-text">
      {/* Top Header */}
      <div className="border-b border-[#7A4210] pb-3 mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-[#FF8C24] text-[#120B05] text-[10px] font-bold tracking-widest">
            SACRED TIMELINE
          </span>
          <span className="text-xs text-[#FF8C24] tracking-widest">
            CANONICAL CAREER DISPATCHES
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-[#7A4210]">
          <span>COORDINATE:</span>
          <span className="text-[#FFB84D] font-bold">
            {currentExp.coordinate || `TC-${(activeIndex + 1).toString().padStart(3, '0')}`}
          </span>
          <span>|</span>
          <span className="text-[#00FF66] font-bold">VERIFIED</span>
        </div>
      </div>

      {/* Interactive Sacred Timeline Oscilloscope SVG Track */}
      <div className="border border-[#7A4210] p-4 bg-[#120B05] mb-6">
        <div className="flex items-center justify-between text-[11px] text-[#7A4210] tracking-widest mb-3">
          <span>INTERACTIVE TEMPORAL WAVEFORM /// SELECT INCIDENT NODE</span>
          <span className="text-[#FF8C24]">
            NODE: [0{activeIndex + 1} / 0{EXPERIENCE.length}]
          </span>
        </div>

        {/* SVG Oscilloscope Timeline */}
        <div className="relative py-4">
          <svg
            className="w-full h-16 overflow-visible"
            viewBox="0 0 600 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background sine wave */}
            <path
              d="M 0 30 Q 150 10 300 30 T 600 30"
              stroke="#7A4210"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* Active strand glow */}
            <path
              d="M 0 30 Q 150 10 300 30 T 600 30"
              stroke="#FF8C24"
              strokeWidth="2"
              className="opacity-70"
            />

            {/* Interactive nodes along timeline */}
            {EXPERIENCE.map((exp, index) => {
              const xPos = 80 + index * 220;
              const yPos = index % 2 === 0 ? 20 : 40;
              const isActive = index === activeIndex;

              return (
                <g
                  key={exp.id}
                  onClick={() => setActiveIndex(index)}
                  className="cursor-pointer group"
                >
                  {/* Outer pulse when active */}
                  {isActive && (
                    <circle
                      cx={xPos}
                      cy={yPos}
                      r="14"
                      fill="none"
                      stroke="#FF8C24"
                      strokeWidth="1"
                      className="animate-ping opacity-40"
                    />
                  )}
                  {/* Reticle box */}
                  <rect
                    x={xPos - 8}
                    y={yPos - 8}
                    width="16"
                    height="16"
                    fill={isActive ? '#FF8C24' : '#120B05'}
                    stroke={isActive ? '#FFB84D' : '#7A4210'}
                    strokeWidth="1.5"
                    className="transition-all"
                  />
                  {/* Center Dot */}
                  <circle
                    cx={xPos}
                    cy={yPos}
                    r="2.5"
                    fill={isActive ? '#120B05' : '#FF8C24'}
                  />
                  {/* Label */}
                  <text
                    x={xPos}
                    y={yPos + 22}
                    textAnchor="middle"
                    fill={isActive ? '#FFB84D' : '#7A4210'}
                    fontSize="9"
                    fontFamily="monospace"
                    letterSpacing="1"
                  >
                    {exp.year}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Detailed Milestone Inspection Panel */}
      <div className="border border-[#FF8C24] p-5 md:p-7 bg-[#120B05] shadow-[0_0_20px_rgba(255,140,36,0.15)] flex-1 flex flex-col justify-between relative">
        <span className="absolute -top-1.5 -left-1.5 text-xs text-[#FF8C24]">+</span>
        <span className="absolute -top-1.5 -right-1.5 text-xs text-[#FF8C24]">+</span>
        <span className="absolute -bottom-1.5 -left-1.5 text-xs text-[#FF8C24]">+</span>
        <span className="absolute -bottom-1.5 -right-1.5 text-xs text-[#FF8C24]">+</span>

        <div>
          {/* Status badge */}
          <div className="flex flex-wrap items-center justify-between border-b border-[#7A4210] pb-2 mb-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 border border-[#FF8C24] text-[#FF8C24] text-[10px] font-bold">
                INCIDENT #{(activeIndex + 1).toString().padStart(3, '0')}
              </span>
              <span className="text-[#00FF66] font-bold">● VERIFIED</span>
            </div>
            <span className="text-[#7A4210]">TEMPORAL DURATION: {currentExp.year}</span>
          </div>

          {/* Role and Company */}
          <h2 className="text-2xl md:text-4xl font-light uppercase tracking-wide text-[#FF8C24] crt-glow mb-1">
            {currentExp.role}
          </h2>
          <div className="text-sm md:text-base uppercase tracking-widest text-[#FFB84D] mb-4">
            &gt;&gt; {currentExp.company}
          </div>

          {/* Summary */}
          <p className="text-xs md:text-sm text-[#FF8C24]/85 leading-relaxed mb-4">
            {currentExp.description}
          </p>

          {/* Key Achievements */}
          {currentExp.achievements && currentExp.achievements.length > 0 && (
            <div className="mb-4">
              <span className="text-[10px] uppercase tracking-widest text-[#FFB84D] block mb-2 font-bold">
                TIMELINE CONTRIBUTIONS & ENGINEERING ACHIEVEMENTS:
              </span>
              <ul className="space-y-1.5 text-xs text-[#FF8C24]/90">
                {currentExp.achievements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#FF8C24] font-bold">&gt;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies Used */}
          {currentExp.technologies && currentExp.technologies.length > 0 && (
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#7A4210] block mb-2">
                TECHNOLOGY TELEMETRY
              </span>
              <div className="flex flex-wrap gap-2">
                {currentExp.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-xs border border-[#7A4210] text-[#FF8C24] bg-[#120B05]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Milestone Navigation Deck */}
        <div className="border-t border-[#7A4210] pt-4 mt-6 flex items-center justify-between">
          <button
            type="button"
            disabled={activeIndex === 0}
            onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
            className="tva-button text-xs disabled:opacity-30 disabled:pointer-events-none"
          >
            ◄ PREVIOUS INCIDENT
          </button>
          <span className="text-[10px] text-[#7A4210]">
            INCIDENT {activeIndex + 1} OF {EXPERIENCE.length}
          </span>
          <button
            type="button"
            disabled={activeIndex === EXPERIENCE.length - 1}
            onClick={() => setActiveIndex(Math.min(EXPERIENCE.length - 1, activeIndex + 1))}
            className="tva-button text-xs disabled:opacity-30 disabled:pointer-events-none"
          >
            NEXT INCIDENT ►
          </button>
        </div>
      </div>
    </div>
  );
}

ExperienceSection.displayName = 'ExperienceSection';
