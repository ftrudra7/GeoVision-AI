import React from 'react';
import GlassPanel from '../common/GlassPanel';
import { Calendar, Play, Pause, RotateCcw } from 'lucide-react';

export default function TemporalTimeline({
  selectedYear = 2024,
  onChangeYear,
  startYear = 2020,
  endYear = 2024,
  isPlaying = false,
  onTogglePlay,
}) {
  const years = [2020, 2021, 2022, 2023, 2024];

  return (
    <GlassPanel className="p-3.5 md:p-4 border border-white/10 shadow-2xl backdrop-blur-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Play / Pause & Label */}
        <div className="flex items-center gap-3">
          <button
            onClick={onTogglePlay}
            className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-400/30 hover:bg-sky-500/30 flex items-center justify-center text-sky-300 transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 translate-x-0.5" />}
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-gray-300 lowercase">
            <Calendar className="w-3.5 h-3.5 text-sky-400" />
            <span>temporal observation epoch:</span>
            <span className="text-sky-300 font-semibold px-2 py-0.5 rounded bg-sky-500/10 border border-sky-400/20">
              {selectedYear}
            </span>
          </div>
        </div>

        {/* Timeline Slider / Buttons */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/[0.08]">
          {years.map((y) => {
            const isSelected = selectedYear === y;
            return (
              <button
                key={y}
                onClick={() => onChangeYear && onChangeYear(y)}
                className={`px-3 py-1 text-xs font-mono rounded-lg transition-all lowercase ${
                  isSelected
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30 shadow-[0_0_10px_rgba(56,189,248,0.2)] font-medium'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {y}
              </button>
            );
          })}
        </div>
      </div>
    </GlassPanel>
  );
}
