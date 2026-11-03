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
    <div className="w-full h-full min-h-[calc(100vh-110px)] p-4 md:p-8 font-mono flex flex-col justify-between overflow-y-auto custom-scrollbar select-text">
      {/* Header */}
      <div className="border-b border-[#7A4210] pb-3 mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-[#FF8C24] text-[#120B05] text-[10px] font-bold tracking-widest">
            CAPABILITY MATRIX
          </span>
          <span className="text-xs text-[#FF8C24] tracking-widest">
            VOLTAGE DIAGNOSTICS & TELEMETRY
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-[#7A4210]">
          <span>TOTAL METRICS:</span>
          <span className="text-[#FFB84D] font-bold">
            {groups.reduce((acc, g) => acc + g.skills.length, 0)}
          </span>
          <span>|</span>
          <span className="text-[#00FF66] font-bold">STATUS: CALIBRATED</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          onClick={() => setSelectedGroupCode('ALL')}
          className={`px-3 py-1.5 text-xs uppercase tracking-widest border transition-all ${
            selectedGroupCode === 'ALL'
              ? 'border-[#FF8C24] bg-[#FF8C24] text-[#120B05] font-bold'
              : 'border-[#7A4210] text-[#FF8C24] hover:border-[#FF8C24]'
          }`}
        >
          [ALL CAPABILITIES]
        </button>
        {groups.map((g) => (
          <button
            key={g.code}
            type="button"
            onClick={() => setSelectedGroupCode(g.code)}
            className={`px-3 py-1.5 text-xs uppercase tracking-widest border transition-all ${
              selectedGroupCode === g.code
                ? 'border-[#FF8C24] bg-[#FF8C24] text-[#120B05] font-bold'
                : 'border-[#7A4210] text-[#FF8C24] hover:border-[#FF8C24]'
            }`}
          >
            {g.code} // {g.category.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Voltage Meters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {filteredSkills.map((skill, index) => (
          <div
            key={skill.name}
            className="border border-[#7A4210] p-4 bg-[#120B05] hover:border-[#FF8C24] transition-all relative"
          >
            <span className="absolute -top-1.5 -left-1.5 text-[10px] text-[#FF8C24]">+</span>
            <span className="absolute -top-1.5 -right-1.5 text-[10px] text-[#FF8C24]">+</span>

            <div className="text-[9px] uppercase tracking-widest text-[#7A4210] mb-1">
              CATEGORY: {skill.category || 'RUNTIME'}
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
      <div className="border-t border-[#7A4210] pt-4 mt-6 flex flex-wrap items-center justify-between text-[10px] text-[#7A4210]">
        <span>ALL CAPABILITIES MEASURED AGAINST PRODUCTION BENCHMARKS</span>
        <span className="text-[#FF8C24]">TVA VOLTMETER // 60 FPS FLUID SAMPLING</span>
      </div>
    </div>
  );
}

SkillsSection.displayName = 'SkillsSection';
