'use client';

import { useState } from 'react';
import { REFERENCES } from '@/lib/data';
import { ClassifiedCard } from '@/components/ui/ClassifiedCard';
import { soundFx } from '@/lib/sound';
import { useAppDispatch } from '@/store/hooks';
import { setTargetSection } from '@/store/navigationSlice';

export function ReferencesSection() {
  const dispatch = useAppDispatch();
  const [allDeclassified, setAllDeclassified] = useState(false);

  const handleToggleAll = () => {
    soundFx.playMechanicalClick();
    setAllDeclassified(!allDeclassified);
  };

  const goToNextProgram = () => {
    soundFx.playWarpChirp();
    dispatch(setTargetSection(5)); // Navigate to Contact
  };

  return (
    <div className="w-full flex flex-col font-mono select-text space-y-4 md:space-y-6">
      {/* Header */}
      <div className="border-b border-[#7A4210] pb-2 sm:pb-3 flex flex-wrap items-center justify-between gap-2">
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
            className={`min-h-[40px] px-3 text-[10px] uppercase tracking-wider border font-bold transition-all ${
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
      <div className="border border-[#7A4210] p-3 sm:p-4 bg-[#120B05]">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase tracking-widest text-[#FF3B1F] font-bold">
            [RESTRICTED ARCHIVE // PROFESSIONAL REFERENCES]
          </span>
          <span className="text-[9px] text-[#7A4210]">LEVEL-4</span>
        </div>
        <p className="text-xs sm:text-sm text-[#FF8C24]/85 leading-relaxed">
          Verified professional references from senior technology leaders who have directly evaluated Shameen&apos;s technical execution. Tap any card or use the master declassify button to reveal direct contact phone numbers.
        </p>
      </div>

      {/* Cards Grid: Single Column Mobile Stack, 2-Col on Tablet/Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
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

      {/* Deliberate Bottom-of-Section Terminal Button */}
      <div className="border-t border-[#7A4210] pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-[9px] text-[#7A4210] uppercase tracking-widest text-center sm:text-left">
          AUTHENTICATED REFERENCES PER OFFICIAL RESUME DOSSIER
        </span>
        <button
          type="button"
          onClick={goToNextProgram}
          className="tva-button primary w-full sm:w-auto text-xs font-bold"
        >
          [NEXT PROGRAM: MISSIVES -&gt;]
        </button>
      </div>
    </div>
  );
}

ReferencesSection.displayName = 'ReferencesSection';
