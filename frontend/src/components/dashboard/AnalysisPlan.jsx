import React from 'react';
import GlassPanel from '../common/GlassPanel';
import GlassButton from '../common/GlassButton';
import { Play, Sparkles, CheckCircle2, Layers, MapPin, Calendar, GitCommit, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AnalysisPlan({
  plan,
  onApproveAndRun,
  isRunning = false,
  onCancel,
}) {
  if (!plan) return null;

  return (
    <GlassPanel variant="level-3" className="p-6 md:p-8 space-y-6 border border-sky-400/30 shadow-2xl animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-xs font-mono text-sky-400 lowercase tracking-wider">
              analysis plan • mission preview
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-normal text-white lowercase tracking-tight">
            workflow interpretation & execution plan
          </h2>
        </div>

        <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-sky-500/15 text-sky-300 border border-sky-400/30 lowercase">
          prototype interpretation
        </span>
      </div>

      {/* Interpreted Parameters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
          <div className="flex items-center gap-1.5 text-gray-400 text-[11px] lowercase">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            region (aoi)
          </div>
          <div className="text-white font-medium lowercase truncate">
            {plan.region || 'delhi ncr, india'}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
          <div className="flex items-center gap-1.5 text-gray-400 text-[11px] lowercase">
            <Calendar className="w-3.5 h-3.5 text-sky-400" />
            temporal range
          </div>
          <div className="text-white font-medium lowercase">
            {plan.start_year || '2020'} → {plan.end_year || '2024'}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
          <div className="flex items-center gap-1.5 text-gray-400 text-[11px] lowercase">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            dataset
          </div>
          <div className="text-white font-medium lowercase truncate">
            {plan.dataset || 'sentinel-2 optical (10m)'}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
          <div className="flex items-center gap-1.5 text-gray-400 text-[11px] lowercase">
            <GitCommit className="w-3.5 h-3.5 text-emerald-400" />
            method
          </div>
          <div className="text-white font-medium lowercase truncate">
            {plan.analysis_type || 'temporal change detection'}
          </div>
        </div>
      </div>

      {/* Workflow Operations Trace */}
      <div className="space-y-3">
        <div className="text-xs font-mono text-gray-300 lowercase flex items-center justify-between">
          <span>planned workflow operations (5 operations)</span>
          <span className="text-gray-500 text-[10px]">deterministic geoprocessing pipeline</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 font-mono text-[11px]">
          {[
            { step: '01', title: 'query parsing', desc: 'extract spatial & temporal bounds' },
            { step: '02', title: 'aoi resolution', desc: 'compute coordinate bounding box' },
            { step: '03', title: 'raster retrieval', desc: 'sentinel-2 optical l2a surface tiles' },
            { step: '04', title: 'cloud masking', desc: 'apply scene classification layer' },
            { step: '05', title: 'temporal diff', desc: 'compute pixel delta & vector summary' },
          ].map((op, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-black/40 border border-white/[0.06] space-y-1">
              <div className="text-sky-400 font-semibold">{op.step}</div>
              <div className="text-gray-200 font-medium lowercase">{op.title}</div>
              <div className="text-gray-400 text-[10px] lowercase font-light">{op.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation & Dispatch */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.08]">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400 lowercase">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>traceable workflow • persistent mission history</span>
        </div>

        <div className="flex items-center gap-3">
          {onCancel && (
            <GlassButton
              size="md"
              variant="secondary"
              onClick={onCancel}
              disabled={isRunning}
            >
              modify query
            </GlassButton>
          )}

          <GlassButton
            size="lg"
            variant="primary"
            onClick={onApproveAndRun}
            disabled={isRunning}
            icon={Play}
          >
            {isRunning ? 'executing workflow...' : 'approve & run'}
          </GlassButton>
        </div>
      </div>
    </GlassPanel>
  );
}
