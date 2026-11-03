'use client';

import { useState } from 'react';
import { REFERENCES } from '@/lib/data';
import { ClassifiedCard } from '@/components/ui/ClassifiedCard';
import { soundFx } from '@/lib/sound';

export function ReferencesSection() {
  const [allDeclassified, setAllDeclassified] = useState(false);

  const handleToggleAll = () => {
    soundFx.playMechanicalClick();
    setAllDeclassified(!allDeclassified);
  };

  return (
    <div className="w-full p-3 sm:p-4 md:p-8 font-mono flex flex-col overflow-y-auto custom-scrollbar select-text">
      {/* Header */}
      <div className="border-b border-[#7A4210] pb-2 sm:pb-3 mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-[#FF8C24] text-[#120B05] text-[10px] font-bold tracking-widest">
            CHRONO-LOGS
          </span>
          <span className="text-[10px] sm:text-xs text-[#FF8C24] tracking-widest hidden sm:inline">
            AUTHENTICATED PERSONNEL DOSSIERS
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px] sm:text-xs">
          <button
            type="button"
            onClick={handleToggleAll}
            className={`px-2.5 py-1 text-[10px] uppercase tracking-wider border font-bold transition-all ${
              allDeclassified
                ? 'border-[#00FF66] bg-[#00FF66]/15 text-[#00FF66]'
                : 'border-[#FF8C24] text-[#FF8C24] hover:bg-[#FF8C24] hover:text-[#120B05]'
            }`}
          >
            {allDeclassified ? '✓ ALL DECLASSIFIED' : '⚡ DECLASSIFY ALL DOSSIERS'}
          </button>
          <span className="text-[#7A4210] hidden sm:inline">|</span>
          <span className="text-[#00FF66] font-bold hidden sm:inline">VERIFIED</span>
        </div>
      </div>

      {/* Description / Instructions */}
      <div className="border border-[#7A4210] p-3 sm:p-4 bg-[#120B05] mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase tracking-widest text-[#FF3B1F] font-bold">
            [RESTRICTED ARCHIVE // PROFESSIONAL REFERENCES]
          </span>
          <span className="text-[10px] text-[#7A4210]">ARCHIVE CLEARANCE: LEVEL-4</span>
        </div>
        <p className="text-[11px] sm:text-xs md:text-sm text-[#FF8C24]/85 leading-relaxed">
          Verified professional references from senior technology leaders who have directly evaluated Shameen&apos;s technical execution and delivery. Tap any card or use the master button above to reveal full contact records.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {REFERENCES.map((ref, idx) => (
          <ClassifiedCard
            key={ref.id}
            name={ref.name}
            company={ref.company}
            role={ref.role}
            phone={ref.phone}
            fileNumber={ref.fileNumber}
            endorsement={ref.endorsement}
            status={ref.status}
            index={idx}
            forceReveal={allDeclassified ? true : undefined}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-[#7A4210] pt-3 mt-4 sm:mt-6 flex flex-wrap items-center justify-between text-[9px] sm:text-[10px] text-[#7A4210] gap-2">
        <span>AUTHENTICATED REFERENCES PER RESUME DOSSIER</span>
        <span className="text-[#00FF66] hidden sm:inline">INTEGRITY: 100%</span>
      </div>
    </div>
  );
}

ReferencesSection.displayName = 'ReferencesSection';
