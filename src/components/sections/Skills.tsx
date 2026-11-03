'use client';

import { useState } from 'react';
import { PORTFOLIO_DATA } from '@/lib/data';
import { VoltageBar } from '@/components/ui/VoltageBar';

export function SkillsSection() {
  const [selectedGroupCode, setSelectedGroupCode] = useState<string>('ALL');

  const groups = PORTFOLIO_DATA.skillGroups;
  const filteredSkills =
    selectedGroupCode === 'ALL'
      ? groups.flatMap((g) => g.skills.map((s) => ({ ...s, category: g.category })))
      : groups
          .find((g) => g.code === selectedGroupCode)
          ?.skills.map((s) => ({ ...s, category: groups.find((g) => g.code === selectedGroupCode)?.category })) || [];

  return (
    <div className="w-full p-3 sm:p-4 md:p-8 font-mono flex flex-col overflow-y-auto custom-scrollbar select-text">
      {/* Header */}
      <div className="border-b border-[#7A4210] pb-2 sm:pb-3 mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-[#FF8C24] text-[#120B05] text-[10px] font-bold tracking-widest">
            CAPABILITY MATRIX
          </span>
          <span className="text-[10px] sm:text-xs text-[#FF8C24] tracking-widest hidden sm:inline">
            VOLTAGE DIAGNOSTICS
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#7A4210]">
          <span className="text-[#FFB84D] font-bold">
            {groups.reduce((acc, g) => acc + g.skills.length, 0)} METRICS
          </span>
          <span className="text-[#00FF66] font-bold hidden sm:inline">CALIBRATED</span>
        </div>
      </div>

      {/* Filter Tabs — horizontal scroll on mobile */}
      <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2 custom-scrollbar -mx-1 px-1">
        <button
          type="button"
          onClick={() => setSelectedGroupCode('ALL')}
          className={`flex-shrink-0 px-2.5 sm:px-3 py-2 text-[10px] sm:text-xs uppercase tracking-widest border transition-all ${
            selectedGroupCode === 'ALL'
              ? 'border-[#FF8C24] bg-[#FF8C24] text-[#120B05] font-bold'
              : 'border-[#7A4210] text-[#FF8C24] hover:border-[#FF8C24]'
          }`}
        >
          ALL
        </button>
        {groups.map((g) => (
          <button
            key={g.code}
            type="button"
            onClick={() => setSelectedGroupCode(g.code)}
            className={`flex-shrink-0 px-2.5 sm:px-3 py-2 text-[10px] sm:text-xs uppercase tracking-widest border transition-all whitespace-nowrap ${
              selectedGroupCode === g.code
                ? 'border-[#FF8C24] bg-[#FF8C24] text-[#120B05] font-bold'
                : 'border-[#7A4210] text-[#FF8C24] hover:border-[#FF8C24]'
            }`}
          >
            {g.code}
          </button>
        ))}
      </div>

      {/* Voltage Meters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {filteredSkills.map((skill, index) => (
          <div
            key={skill.name}
            className="border border-[#7A4210] p-3 sm:p-4 bg-[#120B05] hover:border-[#FF8C24] transition-all relative"
          >
            <span className="absolute -top-1.5 -left-1.5 text-[10px] text-[#FF8C24]">+</span>
            <span className="absolute -top-1.5 -right-1.5 text-[10px] text-[#FF8C24]">+</span>

            <div className="text-[9px] uppercase tracking-widest text-[#7A4210] mb-1">
              {skill.category || 'RUNTIME'}
            </div>
            <VoltageBar
              name={skill.name}
              level={skill.level}
              index={index}
              tag={skill.tag}
            />
          </div>
        ))}
      </div>

      {/* Footer Notes */}
      <div className="border-t border-[#7A4210] pt-3 mt-4 sm:mt-6 flex flex-wrap items-center justify-between text-[9px] sm:text-[10px] text-[#7A4210] gap-2">
        <span>CAPABILITIES MEASURED AGAINST PRODUCTION BENCHMARKS</span>
        <span className="text-[#FF8C24] hidden sm:inline">TVA VOLTMETER // 60 FPS</span>
      </div>
    </div>
  );
}

SkillsSection.displayName = 'SkillsSection';
