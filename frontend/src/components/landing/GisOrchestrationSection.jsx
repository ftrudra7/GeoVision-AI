import React, { useState, useEffect, useRef } from 'react';
import GlassPanel from '../common/GlassPanel';
import { CheckCircle2, Circle, Loader2, Terminal } from 'lucide-react';
import GlassButton from '../common/GlassButton';

export default function GisOrchestrationSection() {
  const [currentStep, setCurrentStep] = useState(2);
  const [isRunning, setIsRunning] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const workflowSteps = [
    { title: 'understanding query', desc: 'decomposing temporal & spatial boundaries via llm' },
    { title: 'selecting region', desc: 'bounding box: delhi ncr [28.6139° n, 77.2090° e]' },
    { title: 'loading imagery', desc: 'selecting sentinel-2 multispectral data (planned integration)' },
    { title: 'comparing temporal layers', desc: 'planning normalized difference built-up index change' },
    { title: 'running spatial analysis', desc: 'preparing cloud masks & spatial aggregation steps' },
    { title: 'generating analysis', desc: 'assembling a report structure and provenance metadata' },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '120px 0px', threshold: 0 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isRunning || !isVisible) return undefined;
    const timer = window.setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % workflowSteps.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, [isRunning, isVisible, workflowSteps.length]);

  return (
    <section ref={sectionRef} id="orchestration" className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 py-32 z-10 pointer-events-none">
      <div className="max-w-6xl mx-auto w-full pointer-events-auto space-y-12">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-sky-400">04</span>
          <div className="w-8 h-[1px] bg-sky-400/40" />
          <span className="text-xs font-mono text-gray-400 lowercase tracking-wider">
            intelligent gis orchestration
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-6 p-6 rounded-2xl text-readable-backdrop">
            <h2 className="text-3xl md:text-5xl font-normal text-white lowercase tracking-tight leading-tight">
              query reasoning converted into deterministic geoprocessing.
            </h2>
            <p className="text-base text-gray-300/90 font-normal lowercase leading-relaxed">
              geovision is building a bridge between natural-language requests and reproducible GIS operations. this trace is a UI simulation; satellite retrieval and spatial processing are planned integrations.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <GlassButton
                size="sm"
                variant={isRunning ? 'secondary' : 'primary'}
                onClick={() => setIsRunning(!isRunning)}
              >
                {isRunning ? 'pause trace simulation' : 'resume trace simulation'}
              </GlassButton>
            </div>
          </div>

          <div className="lg:col-span-7">
            <GlassPanel className="p-6 md:p-8 space-y-6 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-mono text-gray-300 lowercase">
                    simulated workflow trace — execution preview
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-400/20 lowercase">
                  status: demo
                </span>
              </div>

              <div className="space-y-4">
                {workflowSteps.map((step, idx) => {
                  const isDone = idx < currentStep;
                  const isCurrent = idx === currentStep;

                  return (
                    <div
                      key={idx}
                      className={`flex items-start gap-4 p-3 rounded-xl transition-all ${
                        isCurrent
                          ? 'bg-sky-500/[0.08] border border-sky-400/30'
                          : isDone
                          ? 'bg-white/[0.02] opacity-75'
                          : 'opacity-30'
                      }`}
                    >
                      <div className="mt-0.5">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : isCurrent ? (
                          <Loader2 className="w-4 h-4 text-sky-400 animate-spin" />
                        ) : (
                          <Circle className="w-4 h-4 text-gray-600" />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs font-medium text-white lowercase">{step.title}</div>
                        <div className="text-[11px] font-mono text-gray-400 lowercase">{step.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  );
}
