import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassPanel from '../common/GlassPanel';
import { SlidersHorizontal, AlertCircle, Calendar, Eye } from 'lucide-react';

export default function ChangeDetectionSection() {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <section id="temporal" className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 py-32 z-10 pointer-events-none">
      <div className="max-w-6xl mx-auto w-full pointer-events-auto space-y-12">
        {/* Section marker */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-sky-400">05</span>
          <div className="w-8 h-[1px] bg-sky-400/40" />
          <span className="text-xs font-mono text-gray-400 lowercase tracking-wider">
            change detection
          </span>
        </div>

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 p-6 rounded-2xl text-readable-backdrop">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-3xl md:text-5xl font-normal text-white lowercase tracking-tight">
              temporal comparison & surface differential.
            </h2>
            <p className="text-base text-gray-300/90 font-normal lowercase">
              inspect geographic boundaries across time. compare baseline passes against current satellite observations.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-xs font-mono">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>demo analysis — prototype demonstration</span>
          </div>
        </div>

        {/* Interactive Comparison Split Box */}
        <GlassPanel className="p-6 md:p-8 space-y-6 border border-white/10 shadow-2xl">
          {/* Top Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-gray-300">
                <Calendar className="w-3.5 h-3.5 text-sky-400" />
                baseline: 2020
              </span>
              <span className="text-gray-600">→</span>
              <span className="flex items-center gap-1.5 text-sky-300">
                <Calendar className="w-3.5 h-3.5 text-sky-400" />
                observation: 2024
              </span>
            </div>

            <div className="text-xs font-mono text-gray-400">
              region: delhi ncr [28.6139° n, 77.2090° e]
            </div>
          </div>

          {/* Simulated Comparison Canvas */}
          <div className="relative w-full h-[380px] md:h-[460px] rounded-xl overflow-hidden bg-black/80 border border-white/10 select-none">
            {/* 2024 Layer (Underneath) */}
            <div className="absolute inset-0 bg-[#050b18] flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="text-xs font-mono text-sky-400 tracking-widest uppercase">
                  2024 — updated surface observation
                </div>
                <div className="text-[11px] font-mono text-gray-500 max-w-sm mx-auto">
                  [optical multispectral composite • cloud cover: 1.2% • sensor: sentinel-2b]
                </div>
                <div className="pt-4 flex justify-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-sky-500/20 border border-sky-400/30 text-[11px] text-sky-300 font-mono">
                    built-up density: high
                  </span>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-400/30 text-[11px] text-emerald-300 font-mono">
                    canopy: 18.4%
                  </span>
                </div>
              </div>
            </div>

            {/* 2020 Layer (Clipped on top) */}
            <div
              className="absolute inset-0 bg-[#030610] flex items-center justify-center border-r-2 border-sky-400"
              style={{ width: `${sliderPos}%`, overflow: 'hidden' }}
            >
              <div className="w-full text-center space-y-2">
                <div className="text-xs font-mono text-gray-300 tracking-widest uppercase">
                  2020 — baseline reference
                </div>
                <div className="text-[11px] font-mono text-gray-500 max-w-sm mx-auto">
                  [historical raster archive • sensor: sentinel-2a]
                </div>
                <div className="pt-4 flex justify-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-white/10 border border-white/20 text-[11px] text-gray-300 font-mono">
                    built-up density: baseline
                  </span>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-400/30 text-[11px] text-emerald-300 font-mono">
                    canopy: 24.1%
                  </span>
                </div>
              </div>
            </div>

            {/* Slider bar overlay */}
            <div
              className="absolute top-0 bottom-0 -ml-3 flex items-center justify-center cursor-ew-resize pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-6 h-12 rounded-full bg-sky-500/30 backdrop-blur-md border border-sky-400 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.5)]">
                <SlidersHorizontal className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            {/* Invisible Range Input on top */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-gray-500">
            <span>drag slider horizontally to inspect temporal shift</span>
            <span>temporal index: {sliderPos}%</span>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
