import React from 'react';
import GlassPanel from '../common/GlassPanel';
import { MapPin, Navigation, Radio, Compass, CloudRain } from 'lucide-react';

export default function RegionPanel({
  regionName = 'delhi ncr',
  coords = { lat: 28.6139, lng: 77.2090 },
  elevation = '216m msl',
  cloudCover = '0.8%',
  resolution = '10m / px',
}) {
  return (
    <GlassPanel className="p-4 border border-white/10 shadow-2xl space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-xs font-mono text-gray-200 lowercase">
            region telemetry
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-400/20 lowercase">
          active aoi
        </span>
      </div>

      <div className="space-y-2 text-xs font-mono">
        <div className="text-sm font-medium text-white lowercase">
          {regionName}
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-gray-400">
          <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04]">
            <span className="text-gray-500 block text-[9px]">coordinates:</span>
            <span className="text-gray-200">
              {coords.lat.toFixed(4)}° n, {coords.lng.toFixed(4)}° e
            </span>
          </div>

          <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04]">
            <span className="text-gray-500 block text-[9px]">elevation:</span>
            <span className="text-gray-200">{elevation}</span>
          </div>

          <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04]">
            <span className="text-gray-500 block text-[9px]">cloud cover:</span>
            <span className="text-emerald-300">{cloudCover}</span>
          </div>

          <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04]">
            <span className="text-gray-500 block text-[9px]">spatial resolution:</span>
            <span className="text-sky-300">{resolution}</span>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}
