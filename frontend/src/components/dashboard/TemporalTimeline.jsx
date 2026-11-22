import React from 'react';
import GlassPanel from '../common/GlassPanel';
import { Calendar } from 'lucide-react';

export default function TemporalTimeline({ selectedYear = 2024, onChangeYear }) {
  const years = [2020, 2021, 2022, 2023, 2024];

  return (
    <GlassPanel className="p-3.5 md:p-4 border border-white/10 shadow-2xl backdrop-blur-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-300 lowercase">
          <Calendar className="w-3.5 h-3.5 text-sky-400" />
          <span>reference year (interface preview):</span>
          <span className="text-sky-300 font-semibold px-2 py-0.5 rounded bg-sky-500/10 border border-sky-400/20">{selectedYear}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/[0.08]">
          {years.map((year) => (
            <button
              key={year}
              type="button"
              onClick={() => onChangeYear?.(year)}
              aria-pressed={selectedYear === year}
              className={`px-3 py-1 text-xs font-mono rounded-lg transition-all lowercase ${selectedYear === year ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30 font-medium' : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'}`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-2 text-[10px] font-mono text-amber-300/80 lowercase">no satellite time-series is loaded; this control is a UI preview only</p>
    </GlassPanel>
  );
}
