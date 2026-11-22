import React from 'react';
import GlassPanel from '../common/GlassPanel';
import { Layers, Database, Compass, CheckCircle2 } from 'lucide-react';

export default function DataInsightSection() {
  const steps = [
    {
      badge: '01',
      title: 'data sources',
      desc: 'identify suitable MODIS Terra, MODIS Aqua, Sentinel-1, and Sentinel-2 collections.',
    },
    {
      badge: '02',
      title: 'data preparation',
      desc: 'plan coordinate checks, cloud masking, calibration, and raster preprocessing.',
    },
    {
      badge: '03',
      title: 'temporal analysis',
      desc: 'compare observations from selected time periods using reproducible methods.',
    },
    {
      badge: '04',
      title: 'spatial analysis',
      desc: 'apply raster and vector operations with documented assumptions and validation.',
    },
    {
      badge: '05',
      title: 'evidence & insight',
      desc: 'report source provenance, methodology, limitations, and analytical outputs.',
    },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 py-32 z-10 pointer-events-none">
      <div className="max-w-6xl mx-auto w-full pointer-events-auto space-y-16">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-sky-400">08</span>
          <div className="w-8 h-[1px] bg-sky-400/40" />
          <span className="text-xs font-mono text-gray-400 lowercase tracking-wider">
            data → insight
          </span>
        </div>

        <div className="max-w-3xl space-y-4 p-6 rounded-2xl text-readable-backdrop">
          <h2 className="text-3xl md:text-5xl font-normal text-white lowercase tracking-tight">
            a transparent geospatial intelligence pipeline.
          </h2>
          <p className="text-base text-gray-300/90 font-normal lowercase">
            the planned workflow keeps dataset provenance, processing steps, and analytical limitations visible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((step) => (
            <GlassPanel
              key={step.badge}
              variant="subtle"
              className="p-6 space-y-4 hover:border-sky-400/30 transition-all"
            >
              <span className="text-xs font-mono text-sky-400">step {step.badge}</span>
              <h3 className="text-lg font-medium text-white lowercase">{step.title}</h3>
              <p className="text-xs text-gray-400 font-light lowercase leading-relaxed">{step.desc}</p>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
