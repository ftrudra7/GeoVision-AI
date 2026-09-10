import React from 'react';
import { motion } from 'framer-motion';
import GlassPanel from '../common/GlassPanel';
import { Sparkles, Brain, Cpu, Eye, FileText, ArrowDown } from 'lucide-react';

export default function QuestionIntelligenceSection() {
  const steps = [
    {
      title: 'question',
      desc: '“what changed in this region between 2020 and 2024?”',
      icon: Sparkles,
      color: 'text-sky-400',
    },
    {
      title: 'understand',
      desc: 'parse intent, resolve geographic bounds (delhi ncr), and extract temporal range',
      icon: Brain,
      color: 'text-blue-400',
    },
    {
      title: 'analyze',
      desc: 'query optical multispectral satellite passes & compute ndvi / ndbi differential',
      icon: Cpu,
      color: 'text-cyan-400',
    },
    {
      title: 'explain',
      desc: 'generate geo-statistical vectors & contextualize urban density expansion',
      icon: Eye,
      color: 'text-indigo-400',
    },
    {
      title: 'insight',
      desc: 'actionable spatial report with verified telemetry & confidence bounds',
      icon: FileText,
      color: 'text-emerald-400',
    },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 py-32 z-10 pointer-events-none">
      <div className="max-w-6xl mx-auto w-full pointer-events-auto space-y-12">
        {/* Section marker */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-sky-400">03</span>
          <div className="w-8 h-[1px] bg-sky-400/40" />
          <span className="text-xs font-mono text-gray-400 lowercase tracking-wider">
            question → intelligence
          </span>
        </div>

        {/* Header */}
        <div className="max-w-3xl space-y-4 p-6 rounded-2xl text-readable-backdrop">
          <h2 className="text-3xl md:text-5xl font-normal text-white lowercase tracking-tight">
            ask in natural language. receive structured geospatial intelligence.
          </h2>
          <p className="text-gray-300/90 text-base font-normal lowercase">
            from ambiguous spatial questions to multi-step geoprocessing pipelines.
          </p>
        </div>

        {/* Animated flow chain */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <GlassPanel
                key={idx}
                variant="subtle"
                className="p-5 flex flex-col justify-between space-y-4 relative group hover:border-sky-400/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-500">
                      stage 0{idx + 1}
                    </span>
                    <Icon className={`w-4 h-4 ${step.color}`} />
                  </div>
                  <h3 className="text-base font-medium text-white lowercase">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-light lowercase leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 text-gray-600">
                    →
                  </div>
                )}
              </GlassPanel>
            );
          })}
        </div>
      </div>
    </section>
  );
}
