import React from 'react';
import GlassPanel from '../common/GlassPanel';
import { Layers, Database, Compass, CheckCircle2 } from 'lucide-react';

export default function DataInsightSection() {
  const steps = [
    {
      badge: '01',
      title: 'satellite data',
      desc: 'ingesting global constellation feeds across multi-spectral, thermal, and sar bands.',
    },
    {
      badge: '02',
      title: 'spatial layers',
      desc: 'normalizing resolution, orthorectifying projections, and layering vector boundaries.',
    },
    {
      badge: '03',
      title: 'temporal comparison',
      desc: 'computing pixel-level diff matrices across multi-year observation epochs.',
    },
    {
      badge: '04',
      title: 'analysis',
      desc: 'applying machine-learning segmentation and spatial topology heuristics.',
    },
    {
      badge: '05',
      title: 'insight',
      desc: 'delivering actionable intelligence reports directly into your command workflow.',
    },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 py-32 z-10 pointer-events-none">
      <div className="max-w-6xl mx-auto w-full pointer-events-auto space-y-16">
        {/* Section marker */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-sky-400">08</span>
          <div className="w-8 h-[1px] bg-sky-400/40" />
          <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
            data → insight
          </span>
        </div>

        {/* Section header */}
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl md:text-5xl font-normal text-white lowercase tracking-tight">
            the end-to-end geospatial intelligence pipeline.
          </h2>
          <p className="text-base text-gray-400 font-light lowercase">
            transparent progression from constellation signals to decisive planetary insight.
          </p>
        </div>

        {/* Pipeline horizontal progression */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((step, idx) => (
            <GlassPanel
              key={idx}
              variant="subtle"
              className="p-6 space-y-4 hover:border-sky-400/30 transition-all"
            >
              <span className="text-xs font-mono text-sky-400">step {step.badge}</span>
              <h3 className="text-lg font-medium text-white lowercase">{step.title}</h3>
              <p className="text-xs text-gray-400 font-light lowercase leading-relaxed">
                {step.desc}
              </p>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
