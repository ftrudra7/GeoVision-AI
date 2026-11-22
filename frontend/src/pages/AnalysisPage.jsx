import React, { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import GlassPanel from '../components/common/GlassPanel';
import GlassButton from '../components/common/GlassButton';
import CesiumGlobe from '../components/cesium/CesiumGlobe';
import AnalysisPlan from '../components/dashboard/AnalysisPlan';
import { analysisService } from '../services/analysisService';
import { Sparkles, MapPin, Calendar, Layers, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

function interpretQuery(text) {
  const lower = text.toLowerCase();
  let region = 'delhi ncr, india';
  if (lower.includes('mumbai')) region = 'mumbai metropolitan region, india';
  else if (lower.includes('bengaluru') || lower.includes('bangalore')) region = 'bengaluru urban, india';
  else if (lower.includes('singapore')) region = 'singapore central, singapore';

  let startYear = 2020;
  let endYear = 2024;
  const years = text.match(/\b(20\d\d)\b/g);
  if (years?.length >= 2) {
    startYear = Number(years[0]);
    endYear = Number(years[1]);
  } else if (years?.length === 1) {
    endYear = Number(years[0]);
    startYear = endYear - 4;
  }

  let analysisType = 'temporal comparison (planned)';
  let dataset = 'Sentinel-2 (planned source)';
  if (lower.includes('flood') || lower.includes('water')) {
    analysisType = 'flood extent mapping (planned)';
    dataset = 'Sentinel-1 GRD (planned source)';
  } else if (lower.includes('vegetation') || lower.includes('ndvi') || lower.includes('canopy')) {
    analysisType = 'vegetation monitoring (planned)';
    dataset = 'Sentinel-2 / MODIS (planned sources)';
  } else if (lower.includes('temperature')) {
    analysisType = 'land-surface temperature (planned)';
    dataset = 'MODIS Terra / Aqua (planned sources)';
  } else if (lower.includes('urban') || lower.includes('built-up')) {
    analysisType = 'urban expansion (planned)';
    dataset = 'Sentinel-2 (planned source)';
  }

  return { query: text, region, start_year: startYear, end_year: endYear, dataset, analysis_type: analysisType };
}

export default function AnalysisPage() {
  const [query, setQuery] = useState('what changed in delhi ncr between 2020 and 2024?');
  const [showPlan, setShowPlan] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [statusError, setStatusError] = useState(false);

  const currentPlan = interpretQuery(query);

  const handleReviewPlan = (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    setStatusMsg('');
    setStatusError(false);
    setShowPlan(true);
  };

  const handleSaveRequest = async () => {
    try {
      setIsSaving(true);
      setStatusMsg('');
      setStatusError(false);
      await analysisService.createAnalysis({
        query: currentPlan.query,
        region: currentPlan.region,
        start_year: currentPlan.start_year,
        end_year: currentPlan.end_year,
        status: 'planned',
      });
      setStatusMsg('analysis request saved to mission history. satellite discovery and geospatial execution are not connected yet.');
      setShowPlan(false);
    } catch (error) {
      setStatusError(true);
      setStatusMsg(error.response?.data?.error || error.message || 'could not save analysis request');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#020408] text-white">
      <div className="absolute inset-0 z-0">
        <CesiumGlobe
          cameraTarget={{ lng: 77.2090, lat: 28.6139, height: 750000, pitch: -60, heading: 0 }}
          interactive
          autoRotate={false}
          highlightRegion={{ lng: 77.2090, lat: 28.6139, radius: 50000.0, name: 'delhi ncr' }}
          markers={[{ lng: 77.2090, lat: 28.6139, title: 'analysis request preview: delhi ncr' }]}
        />
      </div>
      <Sidebar />
      <div className="absolute top-16 lg:top-8 left-4 lg:left-72 right-4 lg:right-8 bottom-4 lg:bottom-8 z-20 pointer-events-none overflow-y-auto">
        <div className="max-w-3xl pointer-events-auto space-y-6">
          <div className="p-4 rounded-2xl text-readable-backdrop space-y-1">
            <span className="text-xs font-mono text-sky-400 lowercase tracking-wider">analysis request • prototype workspace</span>
            <h1 className="text-3xl font-normal text-white lowercase tracking-tight">what do you want to understand?</h1>
            <p className="text-xs text-gray-300 font-light lowercase">
              describe a spatial question. the current interface previews a region, time range, and possible data source; it does not run satellite analysis yet.
            </p>
          </div>

          {statusMsg && (
            <div className={`flex items-start gap-2 p-4 rounded-xl border text-xs font-mono ${statusError ? 'bg-red-500/10 border-red-400/30 text-red-200' : 'bg-sky-500/15 border-sky-400/30 text-sky-200'}`}>
              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" /><span>{statusMsg}</span>
            </div>
          )}

          <GlassPanel variant="level-2" className="p-6 md:p-8 space-y-6 border border-white/10 shadow-2xl">
            <form onSubmit={handleReviewPlan} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-xs font-mono text-gray-300 lowercase">enter spatial question</label>
                <div className="relative">
                  <input
                    type="text"
                    value={query}
                    onChange={(event) => { setQuery(event.target.value); setStatusMsg(''); }}
                    placeholder="what changed in delhi ncr between 2020 and 2024?"
                    required
                    className="w-full pl-11 pr-4 py-4 rounded-xl glass-input text-sm font-mono text-white placeholder-gray-500 lowercase tracking-tight focus:border-sky-400"
                  />
                  <Sparkles className="w-5 h-5 text-sky-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-sky-400 lowercase">request preview</span>
                  <span className="text-[10px] text-amber-300 lowercase">heuristic prototype</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  <div className="flex items-center gap-2 p-2 rounded bg-white/[0.02]"><MapPin className="w-3.5 h-3.5 text-sky-400" /><span className="text-gray-400">region:</span><span className="text-white truncate">{currentPlan.region}</span></div>
                  <div className="flex items-center gap-2 p-2 rounded bg-white/[0.02]"><Calendar className="w-3.5 h-3.5 text-sky-400" /><span className="text-gray-400">range:</span><span className="text-white">{currentPlan.start_year} → {currentPlan.end_year}</span></div>
                  <div className="flex items-center gap-2 p-2 rounded bg-white/[0.02]"><Layers className="w-3.5 h-3.5 text-sky-400" /><span className="text-gray-400">suggested source:</span><span className="text-white truncate">{currentPlan.dataset}</span></div>
                  <div className="flex items-center gap-2 p-2 rounded bg-white/[0.02]"><ShieldCheck className="w-3.5 h-3.5 text-sky-400" /><span className="text-gray-400">intent:</span><span className="text-white truncate">{currentPlan.analysis_type}</span></div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400"><ShieldCheck className="w-4 h-4 text-sky-400" /><span>preview only • no imagery retrieved</span></div>
                <GlassButton type="submit" size="lg" variant="primary" icon={ArrowRight}>review request</GlassButton>
              </div>
            </form>
          </GlassPanel>

          {showPlan && (
            <AnalysisPlan
              plan={currentPlan}
              onApproveAndRun={handleSaveRequest}
              isRunning={isSaving}
              onCancel={() => setShowPlan(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
