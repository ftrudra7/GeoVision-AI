import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import GlassPanel from '../components/common/GlassPanel';
import CesiumGlobe from '../components/cesium/CesiumGlobe';
import { Database, Satellite, Layers, Radio, Globe, Shield } from 'lucide-react';

export default function DatasetsPage() {
  const datasets = [
    {
      name: 'sentinel-2 optical l2a',
      provider: 'european space agency (esa)',
      resolution: '10m / 20m / 60m',
      bands: '13 spectral bands (vnir + swir)',
      revisit: '5 days global',
      status: 'active stream',
    },
    {
      name: 'landsat 8 / 9 oli-2',
      provider: 'usgs / nasa',
      resolution: '15m pan / 30m ms',
      bands: '11 spectral bands + thermal',
      revisit: '8 days combined',
      status: 'active archive',
    },
    {
      name: 'planetscope constellation',
      provider: 'planet labs',
      resolution: '3.0m ground sample distance',
      bands: '8-band superdove (rgb + nir + rededge)',
      revisit: 'daily global coverage',
      status: 'demo connection',
    },
    {
      name: 'sentinel-1 synthetic aperture radar (sar)',
      provider: 'esa / copernicus',
      resolution: '5m x 20m (iw mode)',
      bands: 'c-band dual polarization (vv, vh)',
      revisit: '6 days global',
      status: 'radar pipeline',
    },
    {
      name: 'srtm global digital elevation model',
      provider: 'nasa / nga',
      resolution: '30m elevation grid',
      bands: 'topographic surface elevation',
      revisit: 'static global baseline',
      status: 'terrain ready',
    },
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#020408] text-white">
      <div className="absolute inset-0 z-0">
        <CesiumGlobe
          cameraTarget={{ lng: 78.0, lat: 20.0, height: 10000000, pitch: -80, heading: 0 }}
          interactive={true}
          autoRotate={false}
        />
      </div>

      <Sidebar />

      <div className="absolute top-8 left-72 right-8 bottom-8 z-20 pointer-events-none overflow-y-auto">
        <div className="max-w-4xl pointer-events-auto space-y-6">
          <div>
            <span className="text-xs font-mono text-sky-400">satellite constellation catalog</span>
            <h1 className="text-3xl font-normal text-white lowercase tracking-tight">
              planetary datasets
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {datasets.map((d, idx) => (
              <GlassPanel
                key={idx}
                variant="subtle"
                className="p-5 space-y-4 border border-white/10 hover:border-sky-400/30 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-400/20">
                      {d.status}
                    </span>
                    <Satellite className="w-4 h-4 text-sky-400/80" />
                  </div>

                  <h3 className="text-base font-medium text-white lowercase">
                    {d.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-light lowercase">
                    provider: {d.provider}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-gray-400">
                  <div className="flex justify-between">
                    <span className="text-gray-500">resolution:</span>
                    <span className="text-gray-200">{d.resolution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">bands:</span>
                    <span className="text-gray-200">{d.bands}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">cadence:</span>
                    <span className="text-sky-300">{d.revisit}</span>
                  </div>
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
