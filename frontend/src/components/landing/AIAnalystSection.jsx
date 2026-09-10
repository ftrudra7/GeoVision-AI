import React from 'react';
import GlassPanel from '../common/GlassPanel';
import { Bot, User, Sparkles, AlertCircle, ArrowUpRight } from 'lucide-react';
import GlassButton from '../common/GlassButton';
import { Link } from 'react-router-dom';

export default function AIAnalystSection() {
  return (
    <section id="analyst" className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 py-32 z-10 pointer-events-none">
      <div className="max-w-6xl mx-auto w-full pointer-events-auto space-y-12">
        {/* Section marker */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-sky-400">07</span>
          <div className="w-8 h-[1px] bg-sky-400/40" />
          <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
            ai analyst
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl md:text-5xl font-normal text-white lowercase tracking-tight leading-tight">
              meet your autonomous geospatial analyst.
            </h2>
            <p className="text-base text-gray-400 font-light lowercase leading-relaxed">
              ask about land use transformation, environmental metrics, flood risks, or urban sprawl. the ai analyst builds the execution plan, queries satellite rasters, and delivers structured briefings.
            </p>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-300 text-xs font-mono">
              <Sparkles className="w-4 h-4 flex-shrink-0" />
              <span>context-aware with spatial coordinate grounding</span>
            </div>

            <Link to="/dashboard" className="inline-block pt-2">
              <GlassButton size="md" variant="primary" icon={ArrowUpRight}>
                try analyst in command center
              </GlassButton>
            </Link>
          </div>

          {/* Right Simulated Conversational Interface */}
          <div className="lg:col-span-7">
            <GlassPanel className="p-6 md:p-8 space-y-6 border border-white/10 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono text-gray-200 lowercase">
                    geovision intelligence assistant
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-400/20 lowercase">
                  prototype demonstration
                </span>
              </div>

              {/* Chat Thread */}
              <div className="space-y-4">
                {/* User Message */}
                <div className="flex items-start gap-3 justify-end">
                  <div className="max-w-md p-4 rounded-2xl rounded-tr-sm bg-sky-500/15 border border-sky-400/30 text-xs text-sky-100 font-mono lowercase leading-relaxed">
                    what changed in this region between 2020 and 2024?
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-gray-400 flex-shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                </div>

                {/* Assistant Message */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300 flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="max-w-lg p-5 rounded-2xl rounded-tl-sm bg-white/[0.03] border border-white/10 text-xs text-gray-300 font-mono lowercase space-y-3">
                    <p className="text-gray-200">
                      i’m comparing the selected region across available temporal layers for delhi ncr [2020 → 2024].
                    </p>

                    <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06] space-y-2 text-[11px] text-gray-400">
                      <div className="flex justify-between">
                        <span>• spatial bounds:</span>
                        <span className="text-sky-300">28.6139° n, 77.2090° e</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• imagery archive:</span>
                        <span className="text-sky-300">sentinel-2 optical l2a</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• workflow status:</span>
                        <span className="text-emerald-400">spatial trace completed</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-gray-400 font-light">
                      notice: demonstration synthesis. connected pipelines yield real-time ndvi / built-up differential raster grids.
                    </p>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  );
}
