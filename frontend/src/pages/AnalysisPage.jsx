import React, { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import GlassPanel from '../components/common/GlassPanel';
import GlassButton from '../components/common/GlassButton';
import CesiumGlobe from '../components/cesium/CesiumGlobe';
import AnalysisPlan from '../components/dashboard/AnalysisPlan';
import AnalysisResultModal from '../components/dashboard/AnalysisResultModal';
import { analysisService } from '../services/analysisService';
import { Sparkles, Play, MapPin, Calendar, Layers, CheckCircle2, AlertCircle, ArrowRight, Eye, ShieldCheck } from 'lucide-react';

export default function AnalysisPage() {
  const [query, setQuery] = useState('what changed in delhi ncr between 2020 and 2024?');
  const [hasInterpreted, setHasInterpreted] = useState(true);
  const [showPlan, setShowPlan] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [createdAnalysis, setCreatedAnalysis] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);

  // Dynamic interpretation parsing from query
  const interpretQuery = (text) => {
    const lower = text.toLowerCase();
    let reg = 'delhi ncr, india';
    if (lower.includes('mumbai')) reg = 'mumbai metropolitan region, india';
    else if (lower.includes('bengaluru') || lower.includes('bangalore')) reg = 'bengaluru urban, india';
    else if (lower.includes('singapore')) reg = 'singapore central, singapore';

    let sYear = 2020;
    let eYear = 2024;
    const years = text.match(/\b(20\d\d)\b/g);
    if (years && years.length >= 2) {
      sYear = parseInt(years[0], 10);
      eYear = parseInt(years[1], 10);
    } else if (years && years.length === 1) {
      eYear = parseInt(years[0], 10);
      sYear = eYear - 4;
    }

    let aType = 'temporal change detection';
    if (lower.includes('vegetation') || lower.includes('ndvi') || lower.includes('canopy')) {
      aType = 'vegetation index (ndvi) differential';
    } else if (lower.includes('flood') || lower.includes('water')) {
      aType = 'hydrological surface water mapping';
    } else if (lower.includes('urban') || lower.includes('built-up')) {
      aType = 'built-up density expansion';
    }

    return {
      query: text,
      region: reg,
      start_year: sYear,
      end_year: eYear,
      dataset: 'sentinel-2 optical l2a (10m)',
      analysis_type: aType,
    };
  };

  const currentPlan = interpretQuery(query);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setHasInterpreted(true);
    setStatusMsg('');
  };

  const handleReviewPlan = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setShowPlan(true);
  };

  const handleApproveAndRun = async () => {
    try {
      setIsRunning(true);
      setStatusMsg('');

      const result = await analysisService.createAnalysis({
        query: currentPlan.query,
        region: currentPlan.region,
        start_year: currentPlan.start_year,
        end_year: currentPlan.end_year,
        status: 'completed',
      });

      setCreatedAnalysis({
        ...currentPlan,
        id: result?.data?.id || 'live',
      });

      setStatusMsg('workflow successfully executed. analysis saved to mission history.');
      setShowPlan(false);
      setShowResultModal(true);
    } catch (err) {
      setStatusMsg('error running analysis: ' + (err.response?.data?.error || err.message));
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#020408] text-white">
      {/* Background Cesium Globe */}
      <div className="absolute inset-0 z-0">
        <CesiumGlobe
          cameraTarget={{ lng: 77.2090, lat: 28.6139, height: 750000, pitch: -60, heading: 0 }}
          interactive={true}
          autoRotate={false}
          highlightRegion={{
            lng: 77.2090,
            lat: 28.6139,
            radius: 50000.0,
            name: 'delhi ncr'
          }}
          markers={[{ lng: 77.2090, lat: 28.6139, title: 'analysis target: delhi ncr' }]}
        />
      </div>

      <Sidebar />

      {/* Main Content Layout */}
      <div className="absolute top-8 left-72 right-8 bottom-8 z-20 pointer-events-none overflow-y-auto">
        <div className="max-w-3xl pointer-events-auto space-y-6">
          {/* Header */}
          <div className="p-4 rounded-2xl text-readable-backdrop space-y-1">
            <span className="text-xs font-mono text-sky-400 lowercase tracking-wider">
              new analysis • natural language gis
            </span>
            <h1 className="text-3xl font-normal text-white lowercase tracking-tight">
              what do you want to understand?
            </h1>
            <p className="text-xs text-gray-300 font-light lowercase">
              ask any spatial question. geovision infers the region, temporal range, and suitable satellite workflows.
            </p>
          </div>

          {statusMsg && (
            <div className="flex items-center justify-between p-4 rounded-xl bg-sky-500/15 border border-sky-400/30 text-xs font-mono text-sky-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{statusMsg}</span>
              </div>
              {createdAnalysis && (
                <button
                  onClick={() => setShowResultModal(true)}
                  className="px-3 py-1 rounded bg-sky-500/20 hover:bg-sky-500/40 text-sky-300 border border-sky-400/30 text-xs"
                >
                  open result view
                </button>
              )}
            </div>
          )}

          {/* Primary Natural Language Query Card */}
          <GlassPanel variant="level-2" className="p-6 md:p-8 space-y-6 border border-white/10 shadow-2xl">
            <form onSubmit={handleReviewPlan} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-xs font-mono text-gray-300 lowercase">
                  enter spatial question
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={query}
                    onChange={handleQueryChange}
                    placeholder="what changed in delhi ncr between 2020 and 2024?"
                    required
                    className="w-full pl-11 pr-4 py-4 rounded-xl glass-input text-sm font-mono text-white placeholder-gray-500 lowercase tracking-tight focus:border-sky-400"
                  />
                  <Sparkles className="w-5 h-5 text-sky-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Interpretation preview badges */}
              {hasInterpreted && (
                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-sky-400 lowercase">geovision interpreted your request</span>
                    <span className="text-[10px] text-gray-500 lowercase">prototype interpretation</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    <div className="flex items-center gap-2 p-2 rounded bg-white/[0.02] text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span className="text-gray-400">region:</span>
                      <span className="text-white font-medium truncate">{currentPlan.region}</span>
                    </div>

                    <div className="flex items-center gap-2 p-2 rounded bg-white/[0.02] text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span className="text-gray-400">range:</span>
                      <span className="text-white font-medium">{currentPlan.start_year} → {currentPlan.end_year}</span>
                    </div>

                    <div className="flex items-center gap-2 p-2 rounded bg-white/[0.02] text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span className="text-gray-400">analysis:</span>
                      <span className="text-white font-medium truncate">{currentPlan.analysis_type}</span>
                    </div>

                    <div className="flex items-center gap-2 p-2 rounded bg-white/[0.02] text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span className="text-gray-400">imagery:</span>
                      <span className="text-white font-medium truncate">{currentPlan.dataset}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                  <span>workflow preview ready</span>
                </div>

                <GlassButton
                  type="submit"
                  size="lg"
                  variant="primary"
                  icon={ArrowRight}
                >
                  review analysis plan
                </GlassButton>
              </div>
            </form>
          </GlassPanel>

          {/* Analysis Plan Modal / Box */}
          {showPlan && (
            <AnalysisPlan
              plan={currentPlan}
              onApproveAndRun={handleApproveAndRun}
              isRunning={isRunning}
              onCancel={() => setShowPlan(false)}
            />
          )}
        </div>
      </div>

      {/* Result Modal */}
      <AnalysisResultModal
        analysis={createdAnalysis}
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
      />
    </div>
  );
}
