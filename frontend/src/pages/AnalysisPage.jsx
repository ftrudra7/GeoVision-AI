import React, { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import GlassPanel from '../components/common/GlassPanel';
import GlassButton from '../components/common/GlassButton';
import CesiumGlobe from '../components/cesium/CesiumGlobe';
import { analysisService } from '../services/analysisService';
import { Sparkles, Play, MapPin, Calendar, Layers, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AnalysisPage() {
  const [query, setQuery] = useState('what changed in this region between 2020 and 2024?');
  const [region, setRegion] = useState('delhi ncr, india');
  const [startYear, setStartYear] = useState('2020');
  const [endYear, setEndYear] = useState('2024');
  const [dataset, setDataset] = useState('sentinel-2 optical (10m)');
  const [analysisType, setAnalysisType] = useState('change detection');
  const [statusMsg, setStatusMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      setStatusMsg('');
      await analysisService.createAnalysis({
        query: query.trim(),
        region,
        start_year: parseInt(startYear, 10),
        end_year: parseInt(endYear, 10),
        status: 'completed',
      });
      setStatusMsg('analysis workflow dispatched & saved to history. (demo prototype execution)');
    } catch (err) {
      setStatusMsg('error dispatching analysis: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#020408] text-white">
      {/* Background Cesium Globe */}
      <div className="absolute inset-0 z-0">
        <CesiumGlobe
          cameraTarget={{ lng: 77.2090, lat: 28.6139, height: 600000, pitch: -60, heading: 0 }}
          interactive={true}
          autoRotate={false}
          markers={[{ lng: 77.2090, lat: 28.6139, title: 'analysis target: delhi ncr' }]}
        />
      </div>

      <Sidebar />

      {/* Main Content Layout */}
      <div className="absolute top-8 left-72 right-8 bottom-8 z-20 pointer-events-none overflow-y-auto">
        <div className="max-w-3xl pointer-events-auto space-y-6">
          <div>
            <span className="text-xs font-mono text-sky-400">new analysis</span>
            <h1 className="text-3xl font-normal text-white lowercase tracking-tight">
              spatial query & workflow dispatch
            </h1>
          </div>

          {statusMsg && (
            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-sky-500/10 border border-sky-400/20 text-xs font-mono text-sky-300">
              <CheckCircle2 className="w-4 h-4" />
              <span>{statusMsg}</span>
            </div>
          )}

          <GlassPanel className="p-6 md:p-8 space-y-6 border border-white/10 shadow-2xl backdrop-blur-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-gray-300 lowercase">
                  natural language geospatial question
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="what changed in this region between 2020 and 2024?"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-xs font-mono text-white placeholder-gray-500 lowercase"
                  />
                  <Sparkles className="w-4 h-4 text-sky-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-gray-300 lowercase">
                    geographic region (aoi)
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl glass-input text-xs font-mono text-gray-200 lowercase bg-[#060b18]"
                  >
                    <option value="delhi ncr, india">delhi ncr, india</option>
                    <option value="mumbai metropolitan region, india">mumbai metropolitan region, india</option>
                    <option value="bengaluru urban, india">bengaluru urban, india</option>
                    <option value="singapore central, singapore">singapore central, singapore</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-gray-300 lowercase">
                    analysis algorithm
                  </label>
                  <select
                    value={analysisType}
                    onChange={(e) => setAnalysisType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl glass-input text-xs font-mono text-gray-200 lowercase bg-[#060b18]"
                  >
                    <option value="change detection">change detection (temporal diff)</option>
                    <option value="land cover">land cover classification</option>
                    <option value="urban growth">urban growth index</option>
                    <option value="vegetation">vegetation health (ndvi)</option>
                    <option value="water analysis">water body boundary analysis</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-gray-300 lowercase">
                    constellation dataset
                  </label>
                  <select
                    value={dataset}
                    onChange={(e) => setDataset(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl glass-input text-xs font-mono text-gray-200 lowercase bg-[#060b18]"
                  >
                    <option value="sentinel-2 optical (10m)">sentinel-2 optical l2a (10m)</option>
                    <option value="landsat-9 multispectral (30m)">landsat-9 multispectral (30m)</option>
                    <option value="planetscope daily (3m)">planetscope daily composite (3m)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-gray-300 lowercase">
                    temporal epochs
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={startYear}
                      onChange={(e) => setStartYear(e.target.value)}
                      className="w-1/2 px-3 py-2.5 rounded-xl glass-input text-xs font-mono text-white"
                    />
                    <span className="text-gray-500 font-mono">→</span>
                    <input
                      type="number"
                      value={endYear}
                      onChange={(e) => setEndYear(e.target.value)}
                      className="w-1/2 px-3 py-2.5 rounded-xl glass-input text-xs font-mono text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <GlassButton
                  type="submit"
                  size="lg"
                  variant="primary"
                  disabled={loading}
                  icon={Play}
                >
                  {loading ? 'dispatching...' : 'run new analysis'}
                </GlassButton>
              </div>
            </form>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
