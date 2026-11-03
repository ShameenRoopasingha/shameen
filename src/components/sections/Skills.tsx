'use client';

import { useState, useMemo } from 'react';
import { PORTFOLIO_DATA } from '@/lib/data';
import { VoltageBar } from '@/components/ui/VoltageBar';
import { soundFx } from '@/lib/sound';

export function SkillsSection() {
  const [selectedGroupCode, setSelectedGroupCode] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const groups = PORTFOLIO_DATA.skillGroups;
  const allSkills = useMemo(
    () => groups.flatMap((g) => g.skills.map((s) => ({ ...s, category: g.category, groupCode: g.code }))),
    [groups]
  );

  const filteredSkills = useMemo(() => {
    return allSkills.filter((skill) => {
      const matchesGroup = selectedGroupCode === 'ALL' || skill.groupCode === selectedGroupCode;
      const matchesSearch =
        searchQuery.trim() === '' ||
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesGroup && matchesSearch;
    });
  }, [allSkills, selectedGroupCode, searchQuery]);

  return (
    <div className="w-full p-3 sm:p-4 md:p-8 font-mono flex flex-col overflow-y-auto custom-scrollbar select-text">
      {/* Header */}
      <div className="border-b border-[#7A4210] pb-2 sm:pb-3 mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-[#FF8C24] text-[#120B05] text-[10px] font-bold tracking-widest">
            CAPABILITY MATRIX
          </span>
          <span className="text-[10px] sm:text-xs text-[#FF8C24] tracking-widest hidden sm:inline">
            VOLTAGE DIAGNOSTICS & BENCHMARKS
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#7A4210]">
          <span className="text-[#FFB84D] font-bold">
            SHOWING {filteredSkills.length} OF {allSkills.length} METRICS
          </span>
          <span className="text-[#00FF66] font-bold hidden sm:inline">CALIBRATED</span>
        </div>
      </div>

      {/* Filter Tabs + Search Input Bar */}
      <div className="flex flex-col md:flex-row gap-3 mb-4 sm:mb-6 items-stretch md:items-center justify-between">
        {/* Category Tabs */}
        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 custom-scrollbar -mx-1 px-1 flex-shrink-0">
          <button
            type="button"
            onClick={() => {
              soundFx.playMechanicalClick();
              setSelectedGroupCode('ALL');
            }}
            className={`flex-shrink-0 px-2.5 sm:px-3 py-2 text-[10px] sm:text-xs uppercase tracking-widest border transition-all ${
              selectedGroupCode === 'ALL'
                ? 'border-[#FF8C24] bg-[#FF8C24] text-[#120B05] font-bold'
                : 'border-[#7A4210] text-[#FF8C24] hover:border-[#FF8C24]'
            }`}
          >
            ALL [{allSkills.length}]
          </button>
          {groups.map((g) => (
            <button
              key={g.code}
              type="button"
              onClick={() => {
                soundFx.playMechanicalClick();
                setSelectedGroupCode(g.code);
              }}
              className={`flex-shrink-0 px-2.5 sm:px-3 py-2 text-[10px] sm:text-xs uppercase tracking-widest border transition-all whitespace-nowrap ${
                selectedGroupCode === g.code
                  ? 'border-[#FF8C24] bg-[#FF8C24] text-[#120B05] font-bold'
                  : 'border-[#7A4210] text-[#FF8C24] hover:border-[#FF8C24]'
              }`}
            >
              {g.code} [{g.skills.length}]
            </button>
          ))}
        </div>

        {/* Real-Time Terminal Search Filter */}
        <div className="relative flex-1 max-w-md">
          <div className="flex items-center border border-[#7A4210] bg-[#120B05] px-2.5 py-1.5 focus-within:border-[#FF8C24] focus-within:shadow-[0_0_10px_rgba(255,140,36,0.2)]">
            <span className="text-[#FF8C24] text-xs mr-2 select-none">&gt;</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="FILTER CAPABILITIES [e.g. React, Mongo, Node]..."
              className="w-full bg-transparent text-xs text-[#FF8C24] placeholder-[#7A4210] focus:outline-hidden font-mono uppercase tracking-wider"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-[10px] text-[#7A4210] hover:text-[#FF8C24] ml-2 select-none"
              >
                [CLEAR]
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Voltage Meters Grid */}
      {filteredSkills.length === 0 ? (
        <div className="border border-[#7A4210] p-8 text-center bg-[#120B05] my-6">
          <div className="text-sm font-bold text-[#FF3B1F] tracking-widest mb-1">
            NO MATCHING TELEMETRY METRICS LOCATED
          </div>
          <p className="text-xs text-[#7A4210] mb-3">
            Zero capabilities found matching query &quot;{searchQuery}&quot;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedGroupCode('ALL');
            }}
            className="tva-button text-xs"
          >
            RESET ALL FILTERS
          </button>
        </div>
      ) : (
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
      )}

      {/* Footer Notes */}
      <div className="border-t border-[#7A4210] pt-3 mt-4 sm:mt-6 flex flex-wrap items-center justify-between text-[9px] sm:text-[10px] text-[#7A4210] gap-2">
        <span>ALL 18 CAPABILITIES DERIVED DIRECTLY FROM OFFICIAL CV BENCHMARKS</span>
        <span className="text-[#FF8C24] hidden sm:inline">TVA VOLTMETER // 60 FPS SAMPLING</span>
      </div>
    </div>
  );
}

SkillsSection.displayName = 'SkillsSection';
