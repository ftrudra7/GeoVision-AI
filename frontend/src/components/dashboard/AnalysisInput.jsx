import React, { useState } from 'react';
import GlassPanel from '../common/GlassPanel';
import GlassButton from '../common/GlassButton';
import { Sparkles, Play, Search, MapPin, Calendar, Layers, Sliders } from 'lucide-react';

export default function AnalysisInput({ onRunAnalysis, isRunning = false }) {
  const [query, setQuery] = useState('what changed in this region between 2020 and 2024?');
  const [region, setRegion] = useState('delhi ncr, india');
  const [startYear, setStartYear] = useState('2020');
  const [endYear, setEndYear] = useState('2024');
  const [dataset, setDataset] = useState('sentinel-2');
  const [analysisType, setAnalysisType] = useState('change detection');

  const analysisTypes = [
    'change detection',
    'land cover',
    'urban growth',
    'vegetation',
    'water analysis',
    'site suitability',
  ];

  const datasets = [
    'sentinel-2 optical (10m)',
    'landsat-9 multispectral (30m)',
    'planetscope daily composite (3m)',
    'sentinel-1 synthetic aperture radar (sar)',
  ];

  const regions = [
    'delhi ncr, india',
    'mumbai metropolitan region, india',
    'bengaluru urban, india',
    'singapore central, singapore',
    'dubai coastal, uae',
  ];

  const handleExecute = (e) => {
    e.preventDefault();
    if (!query.trim() || isRunning) return;

    if (onRunAnalysis) {
      onRunAnalysis({
        query: query.trim(),
        region,
        start_year: parseInt(startYear, 10),
        end_year: parseInt(endYear, 10),
        dataset,
        analysis_type: analysisType,
      });
    }
  };

  return (
    <GlassPanel className="p-4 md:p-5 border border-white/10 shadow-2xl backdrop-blur-2xl">
      <form onSubmit={handleExecute} className="space-y-4">
        {/* Main natural language search input */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-sky-400">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="what changed in this region between 2020 and 2024?"
            className="w-full pl-11 pr-32 py-3.5 rounded-xl glass-input text-sm font-mono text-white placeholder-gray-500 lowercase tracking-tight"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <GlassButton
              type="submit"
              size="sm"
              variant="primary"
              disabled={isRunning || !query.trim()}
              icon={Play}
            >
              {isRunning ? 'processing...' : 'run analysis'}
            </GlassButton>
          </div>
        </div>

        {/* Dropdown Parameters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-1 text-xs font-mono">
          {/* Region */}
          <div className="space-y-1">
            <label className="flex items-center gap-1 text-[10px] text-gray-400 lowercase">
              <MapPin className="w-3 h-3 text-sky-400" />
              region
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg glass-input text-xs font-mono text-gray-200 lowercase bg-[#060b18]"
            >
              {regions.map((r) => (
                <option key={r} value={r} className="bg-[#030712] text-white">
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Analysis Type */}
          <div className="space-y-1">
            <label className="flex items-center gap-1 text-[10px] text-gray-400 lowercase">
              <Sliders className="w-3 h-3 text-sky-400" />
              analysis type
            </label>
            <select
              value={analysisType}
              onChange={(e) => setAnalysisType(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg glass-input text-xs font-mono text-gray-200 lowercase bg-[#060b18]"
            >
              {analysisTypes.map((t) => (
                <option key={t} value={t} className="bg-[#030712] text-white">
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Dataset */}
          <div className="space-y-1">
            <label className="flex items-center gap-1 text-[10px] text-gray-400 lowercase">
              <Layers className="w-3 h-3 text-sky-400" />
              dataset
            </label>
            <select
              value={dataset}
              onChange={(e) => setDataset(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg glass-input text-xs font-mono text-gray-200 lowercase bg-[#060b18]"
            >
              {datasets.map((d) => (
                <option key={d} value={d} className="bg-[#030712] text-white">
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Temporal Range */}
          <div className="space-y-1">
            <label className="flex items-center gap-1 text-[10px] text-gray-400 lowercase">
              <Calendar className="w-3 h-3 text-sky-400" />
              temporal window
            </label>
            <div className="flex items-center gap-1">
              <select
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                className="w-1/2 px-2 py-1.5 rounded-lg glass-input text-xs font-mono text-gray-200 lowercase bg-[#060b18]"
              >
                {['2018', '2019', '2020', '2021', '2022'].map((y) => (
                  <option key={y} value={y} className="bg-[#030712] text-white">
                    {y}
                  </option>
                ))}
              </select>
              <span className="text-gray-500">→</span>
              <select
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                className="w-1/2 px-2 py-1.5 rounded-lg glass-input text-xs font-mono text-gray-200 lowercase bg-[#060b18]"
              >
                {['2022', '2023', '2024', '2025', '2026'].map((y) => (
                  <option key={y} value={y} className="bg-[#030712] text-white">
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </form>
    </GlassPanel>
  );
}
