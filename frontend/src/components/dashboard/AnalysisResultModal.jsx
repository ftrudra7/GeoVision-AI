import React, { useState } from 'react';
import GlassPanel from '../common/GlassPanel';
import GlassButton from '../common/GlassButton';
import { X, MapPin, Calendar, Layers, GitCommit, CheckCircle2, ShieldCheck, Download, SlidersHorizontal, AlertCircle, Share2 } from 'lucide-react';

export default function AnalysisResultModal({
  analysis,
  isOpen,
  onClose,
}) {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeTab, setActiveTab] = useState('overview'); // overview | provenance | comparison

  if (!isOpen || !analysis) return null;

  const region = analysis.region || 'delhi ncr, india';
  const startYear = analysis.start_year || 2020;
  const endYear = analysis.end_year || 2024;
  const query = analysis.query || 'temporal change detection across target region';
  const dataset = analysis.dataset || 'sentinel-2 optical l2a';
  const analysisId = analysis.id ? `gv-analysis-${analysis.id}` : 'gv-analysis-live';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <GlassPanel variant="level-3" className="p-6 md:p-8 space-y-6 border border-sky-400/30 shadow-2xl">
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-sky-400 lowercase tracking-wider">
                  analysis result • {analysisId}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-normal text-white lowercase tracking-tight">
                {query}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-400/20 lowercase">
                prototype demonstration
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3 text-xs font-mono">
            {['overview', 'temporal comparison', 'workflow provenance'].map((tab) => {
              const key = tab.startsWith('temporal') ? 'comparison' : tab.startsWith('workflow') ? 'provenance' : 'overview';
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-3 py-1.5 rounded-lg transition-colors lowercase ${
                    isActive
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              {/* Intelligence Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                  <div className="flex items-center gap-1.5 text-gray-400 text-[11px] lowercase">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    geographic region
                  </div>
                  <div className="text-white font-medium lowercase truncate">{region}</div>
                  <div className="text-gray-500 text-[10px]">bounds: [28.6139° n, 77.2090° e]</div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                  <div className="flex items-center gap-1.5 text-gray-400 text-[11px] lowercase">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    temporal epoch
                  </div>
                  <div className="text-white font-medium lowercase">{startYear} → {endYear}</div>
                  <div className="text-gray-500 text-[10px]">multi-year comparison</div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                  <div className="flex items-center gap-1.5 text-gray-400 text-[11px] lowercase">
                    <Layers className="w-3.5 h-3.5 text-sky-400" />
                    imagery provider
                  </div>
                  <div className="text-white font-medium lowercase truncate">{dataset}</div>
                  <div className="text-gray-500 text-[10px]">10m multispectral bands</div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                  <div className="flex items-center gap-1.5 text-gray-400 text-[11px] lowercase">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    execution status
                  </div>
                  <div className="text-emerald-400 font-medium lowercase">completed</div>
                  <div className="text-gray-500 text-[10px]">trace validated</div>
                </div>
              </div>

              {/* Spatial Synthesis Box */}
              <div className="p-5 rounded-xl bg-black/40 border border-white/[0.08] space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-gray-300">
                  <span className="text-sky-300 font-semibold lowercase">executive synthesis</span>
                  <span className="text-[10px] text-gray-500">pipeline output</span>
                </div>
                <p className="text-gray-300/90 leading-relaxed font-light lowercase">
                  temporal change detection pipeline processed multispectral rasters across {region} between {startYear} and {endYear}. surface differentials indicate localized built-up expansion in peripheral transit corridors and agricultural land-use transitions.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-2.5 py-1 rounded bg-sky-500/15 border border-sky-400/30 text-[11px] text-sky-300 font-mono lowercase">
                    built-up index differential
                  </span>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/15 border border-emerald-400/30 text-[11px] text-emerald-300 font-mono lowercase">
                    vegetation canopy tracking
                  </span>
                  <span className="px-2.5 py-1 rounded bg-white/10 border border-white/20 text-[11px] text-gray-300 font-mono lowercase">
                    coordinate-grounded vectors
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Temporal Comparison Split */}
          {activeTab === 'comparison' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <span>baseline: {startYear} (optical reference)</span>
                <span>observation: {endYear} (updated pass)</span>
              </div>

              {/* Interactive Comparison Canvas */}
              <div className="relative w-full h-80 rounded-xl overflow-hidden bg-black/80 border border-white/10 select-none">
                {/* End Year Observation (Underneath) */}
                <div className="absolute inset-0 bg-[#050b18] flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="text-xs font-mono text-sky-400 tracking-wider lowercase">
                      {endYear} — observation layer
                    </div>
                    <div className="text-[11px] font-mono text-gray-400 max-w-sm mx-auto lowercase">
                      [sentinel-2 optical l2a • cloud mask: filtered]
                    </div>
                    <div className="pt-2 flex justify-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-sky-500/20 border border-sky-400/30 text-[11px] text-sky-300 font-mono lowercase">
                        built-up surface: updated
                      </span>
                    </div>
                  </div>
                </div>

                {/* Start Year Baseline (Clipped on top) */}
                <div
                  className="absolute inset-0 bg-[#030610] flex items-center justify-center border-r-2 border-sky-400"
                  style={{ width: `${sliderPos}%`, overflow: 'hidden' }}
                >
                  <div className="w-full text-center space-y-2">
                    <div className="text-xs font-mono text-gray-300 tracking-wider lowercase">
                      {startYear} — baseline reference
                    </div>
                    <div className="text-[11px] font-mono text-gray-400 max-w-sm mx-auto lowercase">
                      [historical multispectral pass]
                    </div>
                    <div className="pt-2 flex justify-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-white/10 border border-white/20 text-[11px] text-gray-300 font-mono lowercase">
                        built-up surface: baseline
                      </span>
                    </div>
                  </div>
                </div>

                {/* Slider bar overlay */}
                <div
                  className="absolute top-0 bottom-0 -ml-3 flex items-center justify-center cursor-ew-resize pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="w-6 h-12 rounded-full bg-sky-500/30 backdrop-blur-md border border-sky-400 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.5)]">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                {/* Invisible Slider Input */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                />
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-gray-500">
                <span>drag slider horizontally to inspect temporal shift</span>
                <span>epoch delta: {sliderPos}%</span>
              </div>
            </div>
          )}

          {/* Tab 3: Workflow Provenance Trace */}
          {activeTab === 'provenance' && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-xs font-mono text-gray-300 lowercase">
                observable pipeline execution trace
              </div>

              <div className="space-y-3 font-mono text-xs">
                {[
                  { step: '01', name: 'query received', desc: `query: "${query}"`, status: 'completed' },
                  { step: '02', name: 'region resolved', desc: `aoi bounds computed for ${region}`, status: 'completed' },
                  { step: '03', name: 'imagery selected', desc: `sentinel-2 optical l2a passes for ${startYear} & ${endYear}`, status: 'completed' },
                  { step: '04', name: 'preprocessing', desc: 'cloud masking, atmospheric correction, orthorectification', status: 'completed' },
                  { step: '05', name: 'change detection', desc: 'normalized difference built-up index raster algebra differential', status: 'completed' },
                  { step: '06', name: 'spatial analysis', desc: 'spatial vector generation & statistical parcel aggregation', status: 'completed' },
                  { step: '07', name: 'result generated', desc: 'traceable insight synthesized with full data provenance', status: 'completed' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-sky-400 font-semibold text-[11px]">{item.step}</span>
                      <div className="space-y-0.5">
                        <div className="text-white font-medium lowercase">{item.name}</div>
                        <div className="text-gray-400 text-[11px] lowercase font-light">{item.desc}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-400/20 lowercase">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400 lowercase">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>data provenance: esa copernicus sentinel-2 • geovision v2</span>
            </div>

            <div className="flex items-center gap-3">
              <GlassButton
                size="md"
                variant="secondary"
                onClick={onClose}
              >
                close view
              </GlassButton>
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
