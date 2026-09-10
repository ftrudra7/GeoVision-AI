import React from 'react';
import GlassPanel from '../common/GlassPanel';
import { CheckCircle2, Loader2, Circle, Terminal, AlertCircle } from 'lucide-react';

export default function WorkflowTrace({
  steps = [],
  currentStepIndex = 0,
  isRunning = false,
  resultSummary = null,
}) {
  const defaultSteps = [
    { title: 'understanding query', desc: 'decomposing query intent and temporal bounds' },
    { title: 'selecting region', desc: 'locking bounding coordinates: [28.6139° n, 77.2090° e]' },
    { title: 'loading imagery', desc: 'fetching optical bands (b02, b03, b04, b08) from archive' },
    { title: 'comparing temporal layers', desc: 'computing normalized difference built-up index (ndbi)' },
    { title: 'generating analysis', desc: 'synthesizing geo-spatial insight and change vectors' },
  ];

  const activeSteps = steps.length > 0 ? steps : defaultSteps;

  return (
    <GlassPanel className="p-4 md:p-5 border border-white/10 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-xs font-mono text-gray-200 lowercase">
            workflow execution trace
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded-full lowercase ${
              isRunning
                ? 'bg-sky-500/10 text-sky-300 border border-sky-400/20 animate-pulse'
                : 'bg-emerald-500/10 text-emerald-300 border border-emerald-400/20'
            }`}
          >
            {isRunning ? 'executing' : 'idle / completed'}
          </span>
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-2.5">
        {activeSteps.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex && isRunning;

          return (
            <div
              key={idx}
              className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                isCurrent
                  ? 'bg-sky-500/10 border border-sky-400/30'
                  : isDone
                  ? 'bg-white/[0.02] opacity-80'
                  : 'opacity-35'
              }`}
            >
              <div className="mt-0.5">
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-3.5 h-3.5 text-sky-400 animate-spin" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-gray-600" />
                )}
              </div>
              <div className="space-y-0.5">
                <div className="text-xs font-medium text-white lowercase">
                  {step.title}
                </div>
                <div className="text-[10px] font-mono text-gray-400 lowercase">
                  {step.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Result Insight Box */}
      {resultSummary && (
        <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-400/20 space-y-2 text-xs font-mono">
          <div className="text-sky-300 font-medium lowercase flex items-center justify-between">
            <span>generated insight summary</span>
            <span className="text-[9px] text-gray-400">workflow traceable</span>
          </div>
          <p className="text-gray-300 lowercase leading-relaxed font-light text-[11px]">
            {resultSummary}
          </p>
          <div className="flex items-center gap-1.5 pt-1 text-[10px] text-amber-300/80">
            <AlertCircle className="w-3 h-3" />
            <span>demo analysis — imagery source demonstration</span>
          </div>
        </div>
      )}
    </GlassPanel>
  );
}
