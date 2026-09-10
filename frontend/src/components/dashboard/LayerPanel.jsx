import React from 'react';
import GlassPanel from '../common/GlassPanel';
import { Layers, Eye, EyeOff, Sliders } from 'lucide-react';

export default function LayerPanel({
  layers = {
    satellite: true,
    urban: true,
    roads: false,
    vegetation: false,
    water: false,
    boundary: true,
  },
  onToggleLayer,
}) {
  const layerDefs = [
    { key: 'satellite', label: 'satellite base (optical)', category: 'raster' },
    { key: 'urban', label: 'urban density footprint', category: 'analysis' },
    { key: 'roads', label: 'transport arterial vectors', category: 'vector' },
    { key: 'vegetation', label: 'ndvi vegetation index', category: 'spectral' },
    { key: 'water', label: 'hydrological bodies', category: 'vector' },
    { key: 'boundary', label: 'delhi ncr boundary box', category: 'aoi' },
  ];

  return (
    <GlassPanel className="p-4 border border-white/10 shadow-2xl space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-xs font-mono text-gray-200 lowercase">
            geospatial layers
          </span>
        </div>
        <span className="text-[10px] font-mono text-gray-500 lowercase">
          6 available
        </span>
      </div>

      <div className="space-y-1.5">
        {layerDefs.map((l) => {
          const isEnabled = layers[l.key] ?? false;
          return (
            <div
              key={l.key}
              onClick={() => onToggleLayer && onToggleLayer(l.key)}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${
                isEnabled
                  ? 'bg-sky-500/10 border border-sky-400/20 text-white'
                  : 'bg-white/[0.02] border border-transparent text-gray-400 hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isEnabled ? 'bg-sky-400' : 'bg-gray-600'
                  }`}
                />
                <span className="text-xs font-mono lowercase">{l.label}</span>
              </div>

              {isEnabled ? (
                <Eye className="w-3.5 h-3.5 text-sky-400" />
              ) : (
                <EyeOff className="w-3.5 h-3.5 text-gray-600" />
              )}
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
}
