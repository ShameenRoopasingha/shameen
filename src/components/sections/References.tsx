'use client';

import { REFERENCES } from '@/lib/data';
import { ClassifiedCard } from '@/components/ui/ClassifiedCard';

export function ReferencesSection() {
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
        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#7A4210]">
          <span className="text-[#FFB84D] font-bold">{REFERENCES.length} FILES</span>
          <span className="text-[#00FF66] font-bold hidden sm:inline">VERIFIED</span>
        </div>
      </div>

      {/* Description / Instructions */}
      <div className="border border-[#7A4210] p-3 sm:p-4 bg-[#120B05] mb-4 sm:mb-6">
        <span className="text-[10px] uppercase tracking-widest text-[#FF3B1F] block mb-1 font-bold">
          [RESTRICTED ARCHIVE // PROFESSIONAL REFERENCES]
        </span>
        <p className="text-[11px] sm:text-xs md:text-sm text-[#FF8C24]/85 leading-relaxed">
          Verified professional references from senior technology leaders who have directly evaluated Shameen&apos;s technical execution and delivery. Tap or hover any dossier to declassify official contact details.
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
