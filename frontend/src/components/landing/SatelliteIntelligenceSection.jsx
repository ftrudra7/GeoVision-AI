import React, { useState } from 'react';
import GlassPanel from '../common/GlassPanel';
import GeoViewer from '../cesium/GeoViewer';
import { Layers, Eye, Shield, MapPin } from 'lucide-react';

export default function SatelliteIntelligenceSection() {
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
          <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
            satellite intelligence
          </span>
        </div>

        {/* Section header */}
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl md:text-5xl font-normal text-white lowercase tracking-tight">
            multi-layer planetary telemetry.
          </h2>
          <p className="text-base text-gray-400 font-light lowercase">
            composite optical, radar, and synthetic vector layers dynamically over the 3d terrain.
          </p>
        </div>

        {/* Synchronized 3D / 2D Viewer Showcase */}
        <GeoViewer
          initialPosition={{ lng: 77.2090, lat: 28.6139, height: 180000 }}
          label="delhi ncr region"
        />

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
