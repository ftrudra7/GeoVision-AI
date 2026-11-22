import React from 'react';
import GlassPanel from '../common/GlassPanel';
import { Circle, Terminal, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function WorkflowTrace({ steps = [], currentStepIndex = 0, isRunning = false, resultSummary = null }) {
  const defaultSteps = [
    { title: 'request interpretation', desc: 'basic client-side preview; no LLM planner connected' },
    { title: 'area of interest', desc: 'known demo regions can be previewed on the Cesium globe' },
    { title: 'dataset discovery', desc: 'MODIS and Sentinel discovery integration is planned' },
    { title: 'geospatial processing', desc: 'Python processing service and raster / vector operations are planned' },
    { title: 'report generation', desc: 'evidence-backed results require a completed processing pipeline' },
  ];
  const activeSteps = steps.length > 0 ? steps : defaultSteps;

  return (
    <GlassPanel className="p-4 md:p-5 border border-white/10 shadow-2xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2"><Terminal className="w-3.5 h-3.5 text-sky-400" /><span className="text-xs font-mono text-gray-200 lowercase">workflow roadmap</span></div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-400/20 lowercase">{isRunning ? 'saving request' : 'prototype'}</span>
      </div>
      <div className="space-y-2.5">
        {activeSteps.map((step, idx) => (
          <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="mt-0.5">
              {isRunning && idx === currentStepIndex ? <Loader2 className="w-3.5 h-3.5 text-sky-400 animate-spin" /> : idx === 0 ? <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" /> : <Circle className="w-3.5 h-3.5 text-gray-600" />}
            </div>
            <div className="space-y-0.5">
              <div className="text-xs font-medium text-white lowercase">{step.title}</div>
              <div className="text-[10px] font-mono text-gray-400 lowercase">{step.desc}</div>
            </div>
          </div>
        ))}
      </div>
      {resultSummary && (
        <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-400/20 space-y-2 text-xs font-mono">
          <div className="text-sky-300 font-medium lowercase">request status</div>
          <p className="text-gray-300 lowercase leading-relaxed font-light text-[11px]">{resultSummary}</p>
          <div className="flex items-center gap-1.5 pt-1 text-[10px] text-amber-300/80"><AlertCircle className="w-3 h-3" /><span>not a satellite analysis result</span></div>
        </div>
      )}
    </GlassPanel>
  );
}
