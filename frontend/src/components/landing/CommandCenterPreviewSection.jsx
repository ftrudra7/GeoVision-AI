import React from 'react';
import { motion } from 'framer-motion';
import GlassPanel from '../common/GlassPanel';
import GlassButton from '../common/GlassButton';
import { LayoutDashboard, ArrowRight, Layers, Sliders, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CommandCenterPreviewSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 py-32 z-10 pointer-events-none">
      <div className="max-w-6xl mx-auto w-full pointer-events-auto space-y-12">
        {/* Section marker */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-sky-400">09</span>
          <div className="w-8 h-[1px] bg-sky-400/40" />
          <span className="text-xs font-mono text-gray-400 lowercase tracking-wider">
            command center preview
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 p-6 rounded-2xl text-readable-backdrop">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-3xl md:text-5xl font-normal text-white lowercase tracking-tight">
              a planetary command center, not a generic dashboard.
            </h2>
            <p className="text-base text-gray-300/90 font-normal lowercase">
              the cesium globe is your primary canvas. floating glass surfaces give you real-time access to layers, workflow traces, and natural language spatial processing.
            </p>
          </div>

          <Link to="/dashboard">
            <GlassButton size="lg" variant="primary" icon={ArrowRight}>
              enter command center
            </GlassButton>
          </Link>
        </div>

        {/* Visual Preview Shell */}
        <GlassPanel className="p-4 md:p-6 border border-white/10 shadow-2xl relative overflow-hidden group">
          <div className="aspect-[16/9] w-full rounded-xl bg-[#020408] border border-white/[0.08] relative overflow-hidden flex flex-col justify-between p-6">
            {/* Top Bar Preview */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-gray-300">
                <Activity className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                <span>delhi ncr — 28.6139° n, 77.2090° e [cesium live]</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                <span className="px-2.5 py-1 rounded bg-sky-500/10 border border-sky-400/20 text-sky-300">
                  optical composite 10m
                </span>
              </div>
            </div>

            {/* Center prompt preview */}
            <div className="max-w-xl mx-auto w-full p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/15 text-center space-y-2">
              <div className="text-xs font-mono text-sky-400 lowercase">
                natural language spatial input
              </div>
              <div className="text-sm md:text-base text-white font-mono lowercase">
                “what changed in this region between 2020 and 2024?”
              </div>
            </div>

            {/* Bottom floating widgets */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-gray-400">
                  layers: satellite • urban • ndvi
                </span>
              </div>
              <div className="text-[11px] font-mono text-gray-500">
                timeline: 2020 ────●──── 2024
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
