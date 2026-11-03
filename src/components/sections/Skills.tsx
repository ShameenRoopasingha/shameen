'use client';

import { useState, useMemo } from 'react';
import { PORTFOLIO_DATA } from '@/lib/data';
import { VoltageBar } from '@/components/ui/VoltageBar';
import { tvaSound } from '@/lib/tvaSound';
import { useAppDispatch } from '@/store/hooks';
import { setTargetSection } from '@/store/navigationSlice';

export function SkillsSection() {
  const dispatch = useAppDispatch();
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

  const goToNextProgram = () => {
    tvaSound.playConfirm();
    dispatch(setTargetSection(4)); // Navigate to References
  };

  return (
    <div className="w-full flex flex-col font-mono select-text space-y-4 md:space-y-6">
      {/* Header */}
      <div className="border-b border-[#7A4210] pb-2 sm:pb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-[#FF8C24] text-[#120B05] text-[10px] font-bold tracking-widest font-mono">
            [04] // CAPABILITY_MATRIX
          </span>
          <span className="tva-meta-label hidden sm:inline">
            METRIC_REF // VOLTAGE_DIAGNOSTICS
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#7A4210]">
          <span className="text-[#FFB84D] font-mono tabular-nums font-bold">
            ACTIVE // {filteredSkills.length} OF {allSkills.length} METRICS
          </span>
          <span className="text-[#00FF66] font-mono font-bold hidden sm:inline">SYS_STATUS // CALIBRATED</span>
        </div>
      </div>

      {/* Filter Tabs + Search Input Bar */}
      <div className="flex flex-col md:flex-row gap-2.5 sm:gap-3 items-stretch md:items-center justify-between">
        {/* Category Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 custom-scrollbar -mx-1 px-1 flex-shrink-0">
          <button
            type="button"
            onMouseEnter={() => tvaSound.playHover()}
            onClick={() => {
              tvaSound.playConfirm();
              setSelectedGroupCode('ALL');
            }}
            className={`min-h-[40px] px-2.5 sm:px-3 text-[10px] sm:text-xs uppercase tracking-widest border transition-all font-mono ${
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
              onMouseEnter={() => tvaSound.playHover()}
              onClick={() => {
                tvaSound.playConfirm();
                setSelectedGroupCode(g.code);
              }}
              className={`min-h-[40px] px-2.5 sm:px-3 text-[10px] sm:text-xs uppercase tracking-widest border transition-all whitespace-nowrap font-mono ${
                selectedGroupCode === g.code
                  ? 'border-[#FF8C24] bg-[#FF8C24] text-[#120B05] font-bold'
                  : 'border-[#7A4210] text-[#FF8C24] hover:border-[#FF8C24]'
              }`}
            >
              {g.code} [{g.skills.length}]
            </button>
          ))}
        </div>

        {/* Real-Time Terminal Search Filter (text-base on mobile to prevent iOS zoom, IBM Plex Mono) */}
        <div className="relative flex-1 max-w-md">
          <div className="flex items-center border border-[#7A4210] bg-[#120B05] px-3 py-2 focus-within:border-[#FF8C24] focus-within:shadow-[0_0_10px_rgba(255,140,36,0.2)]">
            <span className="text-[#FF8C24] text-xs mr-2 select-none font-mono">&gt;</span>
            <input
              type="text"
              value={searchQuery}
              onKeyDown={() => tvaSound.playKeystroke()}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('tva-input-active'));
                }
              }}
              placeholder="FILTER CAPABILITIES [e.g. React, Mongo, Node]..."
              className="w-full bg-transparent text-base sm:text-xs text-[#FFD29D] placeholder-[#7A4210] focus:outline-hidden font-[family-name:var(--font-tva-body)] uppercase tracking-wider"
            />
            {searchQuery && (
              <button
                type="button"
                onMouseEnter={() => tvaSound.playHover()}
                onClick={() => {
                  tvaSound.playConfirm();
                  setSearchQuery('');
                }}
                className="text-[10px] text-[#7A4210] hover:text-[#FF8C24] ml-2 select-none min-h-[32px] px-1 font-mono"
              >
                [CLEAR]
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Voltage Meters Grid: Single Column Mobile, 2-Col Tablet/Desktop */}
      {filteredSkills.length === 0 ? (
        <div className="border border-[#7A4210] p-6 text-center bg-[#120B05] my-4">
          <div className="text-xs font-bold text-[#FF3B1F] tracking-widest mb-1">
            NO MATCHING TELEMETRY METRICS LOCATED
          </div>
          <p className="text-[11px] text-[#7A4210] mb-3">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="border border-[#7A4210] p-3 sm:p-4 bg-[#120B05] hover:border-[#FF8C24] transition-all relative"
            >
              <span className="absolute -top-1.5 -left-1.5 text-[10px] text-[#FF8C24] select-none">+</span>
              <span className="absolute -top-1.5 -right-1.5 text-[10px] text-[#FF8C24] select-none">+</span>

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

      {/* Deliberate Bottom-of-Section Terminal Button */}
      <div className="border-t border-[#7A4210] pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-[9px] text-[#7A4210] uppercase tracking-widest text-center sm:text-left">
          ALL 18 CAPABILITIES DERIVED DIRECTLY FROM OFFICIAL CV BENCHMARKS
        </span>
        <button
          type="button"
          onMouseEnter={() => tvaSound.playHover()}
          onClick={goToNextProgram}
          className="tva-button primary w-full sm:w-auto text-xs font-bold"
        >
          [NEXT PROGRAM: CHRONO-LOGS -&gt;]
        </button>
      </div>
    </div>
  );
}

SkillsSection.displayName = 'SkillsSection';
