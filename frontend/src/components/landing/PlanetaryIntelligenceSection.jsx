import React from 'react';
import { motion } from 'framer-motion';
import GlassPanel from '../common/GlassPanel';
import { Database, Cpu, Radio, ShieldCheck } from 'lucide-react';

export default function PlanetaryIntelligenceSection() {
  const telemetry = [
    {
      icon: Database,
      value: '100+ tb',
      label: 'multispectral satellite data streamed daily',
    },
    {
      icon: Cpu,
      value: 'sub-second',
      label: 'spatial query decomposition & workflow planning',
    },
    {
      icon: Radio,
      value: 'temporal',
      label: 'continuous multi-sensor change detection layers',
    },
    {
      icon: ShieldCheck,
      value: 'verifiable',
      label: 'transparent GIS processing trace on every insight',
    },
  ];

  return (
    <section id="story" className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 py-32 z-10 pointer-events-none">
      <div className="max-w-6xl mx-auto w-full pointer-events-auto space-y-16">
        {/* Section marker */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-sky-400">02</span>
          <div className="w-8 h-[1px] bg-sky-400/40" />
          <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
            planetary intelligence
          </span>
        </div>

        {/* Editorial statement */}
        <div className="space-y-6 max-w-3xl">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal text-white lowercase tracking-tight leading-tight">
            the planet generates more data than humans can understand.
          </h2>
          <p className="text-base md:text-lg text-gray-400 font-light lowercase leading-relaxed">
            satellites, sensors, and spatial records capture every square meter of earth continuously. geovision transforms raw petabytes into structured geographic intelligence through autonomous GIS workflows.
          </p>
        </div>

        {/* Telemetry glass cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {telemetry.map((item, idx) => {
            const Icon = item.icon;
            return (
              <GlassPanel
                key={idx}
                variant="subtle"
                className="p-6 space-y-3 group hover:border-sky-400/30 transition-colors"
              >
                <div className="flex items-center justify-between text-gray-400">
                  <Icon className="w-5 h-5 text-sky-400/80 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-mono text-gray-600">0{idx + 1}</span>
                </div>
                <div className="text-2xl font-mono font-medium text-white lowercase">
                  {item.value}
                </div>
                <p className="text-xs text-gray-400 lowercase leading-relaxed font-light">
                  {item.label}
                </p>
              </GlassPanel>
            );
          })}
        </div>
      </div>
    </section>
  );
}
