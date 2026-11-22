import React, { useState } from 'react';
import GlassPanel from '../common/GlassPanel';
import GeoViewer from '../cesium/GeoViewer';
import GlassButton from '../common/GlassButton';
import { Eye, SplitSquareVertical, Sparkles } from 'lucide-react';

export default function SatelliteIntelligenceSection() {
  const [showSyncViewer, setShowSyncViewer] = useState(false);
  const [activeLayers, setActiveLayers] = useState({
    modisTerra: true,
    modisAqua: false,
    sentinel1: false,
    sentinel2: false,
  });

  const layerList = [
    { key: 'modisTerra', label: 'modis terra', desc: 'frequent optical & thermal observations' },
    { key: 'modisAqua', label: 'modis aqua', desc: 'complementary optical & thermal observations' },
    { key: 'sentinel1', label: 'sentinel-1 sar', desc: 'radar observations for cloudy conditions' },
    { key: 'sentinel2', label: 'sentinel-2 optical', desc: 'multispectral vegetation & land-cover data' },
  ];

  const toggleLayer = (key) => {
    setActiveLayers((previous) => ({ ...previous, [key]: !previous[key] }));
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 py-32 z-10 pointer-events-none">
      <div className="max-w-6xl mx-auto w-full pointer-events-auto space-y-12">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-sky-400">06</span>
          <div className="w-8 h-[1px] bg-sky-400/40" />
          <span className="text-xs font-mono text-gray-400 lowercase tracking-wider">
            satellite intelligence
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 p-6 rounded-2xl text-readable-backdrop">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-3xl md:text-5xl font-normal text-white lowercase tracking-tight">
              multi-source earth observation data.
            </h2>
            <p className="text-base text-gray-300/90 font-normal lowercase">
              explore the four planned data families: modis terra, modis aqua, sentinel-1 sar, and sentinel-2 optical. live catalogue discovery and processing are still on the roadmap.
            </p>
          </div>

          <GlassButton
            size="sm"
            variant={showSyncViewer ? 'secondary' : 'primary'}
            icon={SplitSquareVertical}
            onClick={() => setShowSyncViewer(!showSyncViewer)}
          >
            {showSyncViewer ? 'close dual viewer' : 'launch synchronized 3d/2d viewer'}
          </GlassButton>
        </div>

        {showSyncViewer ? (
          <GeoViewer
            initialPosition={{ lng: 77.2090, lat: 28.6139, height: 180000 }}
            label="delhi ncr region"
          />
        ) : (
          <GlassPanel className="p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-lg">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-mono text-sky-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>earth observation data roadmap</span>
                </div>
                <h3 className="text-2xl font-normal text-white lowercase tracking-tight">
                  synchronized 3d perspective + 2d nadir
                </h3>
                <p className="text-xs text-gray-400 font-light lowercase leading-relaxed">
                  inspect the cesium globe and its synchronized 2d/3d camera views. satellite data catalogues and raster overlays will be connected in a later processing phase.
                </p>
                <GlassButton
                  size="md"
                  variant="primary"
                  icon={SplitSquareVertical}
                  onClick={() => setShowSyncViewer(true)}
                >
                  open interactive dual viewer
                </GlassButton>
              </div>

              <div className="w-full md:w-80 p-4 rounded-xl bg-black/60 border border-white/10 space-y-3 font-mono text-[11px]">
                <div className="flex justify-between text-gray-400 pb-2 border-b border-white/[0.08]">
                  <span>viewer</span>
                  <span className="text-emerald-400">cesium ready</span>
                </div>
                <div className="space-y-1.5 text-gray-400">
                  <div className="flex justify-between">
                    <span>view 3d:</span>
                    <span className="text-sky-300">interactive master</span>
                  </div>
                  <div className="flex justify-between">
                    <span>view 2d:</span>
                    <span className="text-sky-300">orthographic</span>
                  </div>
                  <div className="flex justify-between">
                    <span>data integration:</span>
                    <span className="text-amber-300">planned</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassPanel>
        )}

        <div>
          <p className="text-[10px] font-mono text-gray-500 lowercase mb-3">
            dataset selection preview · selected sources are not yet fetched
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {layerList.map((item) => {
              const isActive = activeLayers[item.key];
              return (
                <button
                  key={item.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => toggleLayer(item.key)}
                  className={`p-4 rounded-xl text-left transition-all border ${
                    isActive
                      ? 'bg-sky-500/15 border-sky-400/40 shadow-[0_0_20px_rgba(56,189,248,0.1)]'
                      : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-sky-400' : 'bg-gray-600'}`} />
                    <Eye className={`w-3.5 h-3.5 ${isActive ? 'text-sky-300' : 'text-gray-600'}`} />
                  </div>
                  <div className="text-xs font-medium text-white lowercase">{item.label}</div>
                  <div className="text-[10px] text-gray-400 lowercase font-light mt-0.5">{item.desc}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
