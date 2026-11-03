'use client';

import { REFERENCES } from '@/lib/data';
import { ClassifiedCard } from '@/components/ui/ClassifiedCard';

export function ReferencesSection() {
  return (
    <div className="w-full h-full min-h-[calc(100vh-110px)] p-4 md:p-8 font-mono flex flex-col justify-between overflow-y-auto custom-scrollbar select-text">
      {/* Header */}
      <div className="border-b border-[#7A4210] pb-3 mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-[#FF8C24] text-[#120B05] text-[10px] font-bold tracking-widest">
            CHRONO-LOGS // REFERENCES
          </span>
          <span className="text-xs text-[#FF8C24] tracking-widest">
            AUTHENTICATED PERSONNEL DOSSIERS
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-[#7A4210]">
          <span>FILES ON RECORD:</span>
          <span className="text-[#FFB84D] font-bold">{REFERENCES.length.toString().padStart(2, '0')}</span>
          <span>|</span>
          <span className="text-[#00FF66] font-bold">CLEARANCE: GRANTED</span>
        </div>
      </div>

      {/* Description / Instructions */}
      <div className="border border-[#7A4210] p-4 bg-[#120B05] mb-6">
        <span className="text-[10px] uppercase tracking-widest text-[#FF3B1F] block mb-1 font-bold">
          [RESTRICTED ACCESS ARCHIVE // PROTOCOL 1970-REF]
        </span>
        <p className="text-xs md:text-sm text-[#FF8C24]/85 leading-relaxed">
          The following records contain verified endorsements from senior technology leaders who have directly evaluated this variant&apos;s architectural output, code reliability, and cross-functional team delivery. Hover or tap any file card to declassify.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {REFERENCES.map((ref, idx) => (
          <ClassifiedCard
            key={ref.id}
            name={ref.name}
            company={ref.company}
            role={ref.role}
            fileNumber={ref.fileNumber}
            endorsement={ref.endorsement}
            status={ref.status}
            index={idx}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-[#7A4210] pt-4 mt-6 flex flex-wrap items-center justify-between text-[10px] text-[#7A4210]">
        <span>ALL ENDORSEMENTS DIGITALLY SIGNED & VERIFIED BY TVA ARCHIVES</span>
        <span className="text-[#00FF66]">CRYPTOGRAPHIC INTEGRITY: 100%</span>
      </div>
    </div>
  );
}

ReferencesSection.displayName = 'ReferencesSection';
