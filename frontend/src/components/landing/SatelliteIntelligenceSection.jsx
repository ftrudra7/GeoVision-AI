import React, { useState } from 'react';
import GlassPanel from '../common/GlassPanel';
import GeoViewer from '../cesium/GeoViewer';
import GlassButton from '../common/GlassButton';
import { Layers, Eye, SplitSquareVertical, Sparkles } from 'lucide-react';

export default function SatelliteIntelligenceSection() {
  const [showSyncViewer, setShowSyncViewer] = useState(false);
  const [activeLayers, setActiveLayers] = useState({
    satellite: true,
    urban: false,
    roads: false,
    vegetation: false,
    water: false,
  });

  const layerList = [
    { key: 'satellite', label: 'satellite imagery', desc: 'high-resolution optical base' },
    { key: 'urban', label: 'urban density', desc: 'built-up surface footprint' },
    { key: 'roads', label: 'transport networks', desc: 'arterial & transit vectors' },
    { key: 'vegetation', label: 'vegetation index (ndvi)', desc: 'canopy & biomass health' },
    { key: 'water', label: 'hydrological bodies', desc: 'surface water & wetlands' },
  ];

  const toggleLayer = (key) => {
    setActiveLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 py-32 z-10 pointer-events-none">
      <div className="max-w-6xl mx-auto w-full pointer-events-auto space-y-12">
        {/* Section marker */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-sky-400">06</span>
          <div className="w-8 h-[1px] bg-sky-400/40" />
          <span className="text-xs font-mono text-gray-400 lowercase tracking-wider">
            satellite intelligence
          </span>
        </div>

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 p-6 rounded-2xl text-readable-backdrop">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-3xl md:text-5xl font-normal text-white lowercase tracking-tight">
              multi-layer planetary telemetry.
            </h2>
            <p className="text-base text-gray-300/90 font-normal lowercase">
              composite optical, radar, and synthetic vector layers dynamically over the 3d terrain.
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

        {/* Synchronized 3D / 2D Viewer Showcase (Toggled or inline) */}
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
                  <span>synchronized 3d perspective + 2d nadir</span>
                </div>
                <h3 className="text-2xl font-normal text-white lowercase tracking-tight">
                  ellipsoid camera synchronization
                </h3>
                <p className="text-xs text-gray-400 font-light lowercase leading-relaxed">
                  as you rotate, zoom, or pitch the 3d perspective camera, the 2d orthographic nadir viewer tracks the ground ray intersection and altitude in real time.
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

              {/* Schematic mini preview */}
              <div className="w-full md:w-80 p-4 rounded-xl bg-black/60 border border-white/10 space-y-3 font-mono text-[11px]">
                <div className="flex justify-between text-gray-400 pb-2 border-b border-white/[0.08]">
                  <span>sync engine</span>
                  <span className="text-emerald-400">active listener</span>
                </div>
                <div className="space-y-1.5 text-gray-400">
                  <div className="flex justify-between">
                    <span>view 3d master:</span>
                    <span className="text-sky-300">quaternion rot</span>
                  </div>
                  <div className="flex justify-between">
                    <span>view 2d slave:</span>
                    <span className="text-sky-300">orthographic</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ground delta:</span>
                    <span className="text-emerald-300">0.001 rad sync</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassPanel>
        )}

        {/* Layer selector bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {layerList.map((item) => {
            const isActive = activeLayers[item.key];
            return (
              <button
                key={item.key}
                onClick={() => toggleLayer(item.key)}
                className={`p-4 rounded-xl text-left transition-all border ${
                  isActive
                    ? 'bg-sky-500/15 border-sky-400/40 shadow-[0_0_20px_rgba(56,189,248,0.1)]'
                    : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isActive ? 'bg-sky-400' : 'bg-gray-600'
                    }`}
                  />
                  <Eye className={`w-3.5 h-3.5 ${isActive ? 'text-sky-300' : 'text-gray-600'}`} />
                </div>
                <div className="text-xs font-medium text-white lowercase">
                  {item.label}
                </div>
                <div className="text-[10px] text-gray-400 lowercase font-light mt-0.5">
                  {item.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
