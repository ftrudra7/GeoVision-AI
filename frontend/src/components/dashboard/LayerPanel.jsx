import React from 'react';
import GlassPanel from '../common/GlassPanel';
import { Layers, Eye, EyeOff, Lock } from 'lucide-react';

export default function LayerPanel({ layers = { boundary: true }, onToggleLayer }) {
  const layerDefs = [
    { key: 'boundary', label: 'area of interest marker', available: true, note: 'Cesium preview' },
    { key: 'satellite', label: 'MODIS / Sentinel imagery', available: false, note: 'planned data integration' },
    { key: 'urban', label: 'urban change layer', available: false, note: 'planned raster analysis' },
    { key: 'vegetation', label: 'NDVI / EVI vegetation', available: false, note: 'planned index calculation' },
    { key: 'water', label: 'flood / surface water', available: false, note: 'planned SAR workflow' },
    { key: 'roads', label: 'transport / context vectors', available: false, note: 'planned vector data' },
  ];

  return (
    <GlassPanel className="p-4 border border-white/10 shadow-2xl space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
        <div className="flex items-center gap-2"><Layers className="w-3.5 h-3.5 text-sky-400" /><span className="text-xs font-mono text-gray-200 lowercase">map layers</span></div>
        <span className="text-[10px] font-mono text-gray-500 lowercase">1 active • 5 planned</span>
      </div>
      <div className="space-y-1.5">
        {layerDefs.map((layer) => {
          const enabled = layer.available && (layers[layer.key] ?? false);
          return (
            <button
              type="button"
              key={layer.key}
              disabled={!layer.available}
              onClick={() => onToggleLayer?.(layer.key)}
              title={layer.note}
              className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-all ${enabled ? 'bg-sky-500/10 border border-sky-400/20 text-white' : 'bg-white/[0.02] border border-transparent text-gray-400'} ${layer.available ? 'cursor-pointer hover:bg-white/[0.04]' : 'cursor-not-allowed opacity-55'}`}
            >
              <span className="flex flex-col gap-0.5">
                <span className="text-xs font-mono lowercase">{layer.label}</span>
                <span className="text-[9px] text-gray-500 font-mono lowercase">{layer.note}</span>
              </span>
              {layer.available ? (enabled ? <Eye className="w-3.5 h-3.5 text-sky-400" /> : <EyeOff className="w-3.5 h-3.5" />) : <Lock className="w-3 h-3 text-gray-500" />}
            </button>
          );
        })}
      </div>
    </GlassPanel>
  );
}
