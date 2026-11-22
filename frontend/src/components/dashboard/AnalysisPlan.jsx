import React from 'react';
import GlassPanel from '../common/GlassPanel';
import GlassButton from '../common/GlassButton';
import { Play, Sparkles, Layers, MapPin, Calendar, GitCommit, ShieldCheck } from 'lucide-react';

export default function AnalysisPlan({ plan, onApproveAndRun, isRunning = false, onCancel }) {
  if (!plan) return null;

  const steps = [
    { step: '01', title: 'query captured', desc: 'store the natural-language request' },
    { step: '02', title: 'region preview', desc: 'show the currently recognized area of interest' },
    { step: '03', title: 'dataset suggestion', desc: 'suggest a source from the README data foundation' },
    { step: '04', title: 'processing integration', desc: 'planned: data discovery and preprocessing' },
    { step: '05', title: 'analysis execution', desc: 'planned: validated raster / vector operations' },
  ];

  return (
    <GlassPanel variant="level-3" className="p-6 md:p-8 space-y-6 border border-sky-400/30 shadow-2xl animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-xs font-mono text-sky-400 lowercase tracking-wider">analysis request • preview</span>
          </div>
          <h2 className="text-xl md:text-2xl font-normal text-white lowercase tracking-tight">review analysis request</h2>
        </div>
        <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-400/20 lowercase">prototype • not executed</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
          <div className="flex items-center gap-1.5 text-gray-400 text-[11px] lowercase"><MapPin className="w-3.5 h-3.5 text-sky-400" />region (aoi)</div>
          <div className="text-white font-medium lowercase truncate">{plan.region}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
          <div className="flex items-center gap-1.5 text-gray-400 text-[11px] lowercase"><Calendar className="w-3.5 h-3.5 text-sky-400" />temporal range</div>
          <div className="text-white font-medium lowercase">{plan.start_year} → {plan.end_year}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
          <div className="flex items-center gap-1.5 text-gray-400 text-[11px] lowercase"><Layers className="w-3.5 h-3.5 text-sky-400" />suggested source</div>
          <div className="text-white font-medium lowercase truncate">{plan.dataset}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
          <div className="flex items-center gap-1.5 text-gray-400 text-[11px] lowercase"><GitCommit className="w-3.5 h-3.5 text-sky-400" />analysis intent</div>
          <div className="text-white font-medium lowercase truncate">{plan.analysis_type}</div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-xs font-mono text-gray-300 lowercase flex items-center justify-between">
          <span>request lifecycle</span><span className="text-amber-300 text-[10px]">execution service not connected</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 font-mono text-[11px]">
          {steps.map((op) => (
            <div key={op.step} className="p-3 rounded-lg bg-black/40 border border-white/[0.06] space-y-1">
              <div className="text-sky-400 font-semibold">{op.step}</div>
              <div className="text-gray-200 font-medium lowercase">{op.title}</div>
              <div className="text-gray-400 text-[10px] lowercase font-light">{op.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.08]">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400 lowercase">
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <span>save request to mission history • no satellite processing yet</span>
        </div>
        <div className="flex items-center gap-3">
          {onCancel && <GlassButton size="md" variant="secondary" onClick={onCancel} disabled={isRunning}>modify request</GlassButton>}
          <GlassButton size="lg" variant="primary" onClick={onApproveAndRun} disabled={isRunning} icon={Play}>
            {isRunning ? 'saving request...' : 'save analysis request'}
          </GlassButton>
        </div>
      </div>
    </GlassPanel>
  );
}
