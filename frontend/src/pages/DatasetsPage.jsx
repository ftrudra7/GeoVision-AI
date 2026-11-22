import React, { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import GlassPanel from '../components/common/GlassPanel';
import GlassButton from '../components/common/GlassButton';
import CesiumGlobe from '../components/cesium/CesiumGlobe';
import { Satellite, ArrowRight, Eye } from 'lucide-react';

const datasets = [
  {
    name: 'modis terra',
    shortName: 'MODIS Terra',
    provider: 'NASA / MODIS on Terra',
    resolution: '250m–1km (product dependent)',
    bands: 'Product-dependent spectral bands',
    coverage: 'Global observations; long-running archive',
    status: 'planned integration',
    description: 'Broad-scale, frequent observations for vegetation trends, land-surface temperature, and regional environmental monitoring.',
    products: 'MOD13Q1 (vegetation indices), MOD11A2 (land-surface temperature)',
    use: 'Vegetation monitoring, land-surface temperature, long-term regional trends',
  },
  {
    name: 'modis aqua',
    shortName: 'MODIS Aqua',
    provider: 'NASA / MODIS on Aqua',
    resolution: '250m–1km (product dependent)',
    bands: 'Product-dependent spectral bands',
    coverage: 'Global observations; complementary to Terra',
    status: 'planned integration',
    description: 'Complementary MODIS observations that can improve temporal sampling for vegetation and environmental monitoring.',
    products: 'MYD13Q1 (vegetation indices), MYD11A2 (land-surface temperature)',
    use: 'Vegetation condition, land-surface temperature, temporal comparison',
  },
  {
    name: 'sentinel-1',
    shortName: 'Sentinel-1',
    provider: 'European Union Copernicus programme / ESA',
    resolution: 'Product and acquisition-mode dependent',
    bands: 'C-band SAR; VV / VH where available',
    coverage: 'Global radar observations; day/night and cloud-penetrating',
    status: 'planned integration',
    description: 'Synthetic Aperture Radar observations suited to flood-extent mapping and surface-change applications, including cloudy conditions.',
    products: 'GRD (Ground Range Detected), SLC (Single Look Complex)',
    use: 'Flood extent, surface-water monitoring, selected surface-change analysis',
  },
  {
    name: 'sentinel-2',
    shortName: 'Sentinel-2',
    provider: 'European Union Copernicus programme / ESA',
    resolution: '10m / 20m / 60m',
    bands: '13 multispectral bands',
    coverage: 'Global land observations; 2015 onward',
    status: 'planned integration',
    description: 'Multispectral optical imagery for vegetation, water, urban expansion, and land-cover analysis.',
    products: 'Level-1C (top-of-atmosphere), Level-2A (surface reflectance)',
    use: 'Vegetation, urban expansion, water-body mapping, land-cover analysis',
  },
];

export default function DatasetsPage() {
  const [selectedDataset, setSelectedDataset] = useState(null);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#020408] text-white">
      <div className="absolute inset-0 z-0">
        <CesiumGlobe cameraTarget={{ lng: 78.0, lat: 20.0, height: 11000000, pitch: -80, heading: 0 }} interactive autoRotate={false} />
      </div>
      <Sidebar />
      <div className="absolute top-16 lg:top-8 left-4 lg:left-72 right-4 lg:right-8 bottom-4 lg:bottom-8 z-20 pointer-events-none overflow-y-auto">
        <div className="max-w-4xl pointer-events-auto space-y-6">
          <div className="p-4 rounded-2xl text-readable-backdrop space-y-1">
            <span className="text-xs font-mono text-sky-400 lowercase tracking-wider">earth observation data registry</span>
            <h1 className="text-3xl font-normal text-white lowercase tracking-tight">satellite dataset roadmap</h1>
            <p className="text-xs text-gray-300 font-light lowercase">
              four primary data sources defined by the project README. These are planned integrations, not live imagery feeds.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {datasets.map((d) => (
              <GlassPanel key={d.name} variant="subtle" className="p-5 space-y-4 border border-white/10 hover:border-sky-400/30 transition-all flex flex-col justify-between group">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-400/20 lowercase">{d.status}</span>
                    <Satellite className="w-4 h-4 text-sky-400/80 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-base font-medium text-white lowercase group-hover:text-sky-200 transition-colors">{d.shortName}</h3>
                  <p className="text-xs text-gray-400 font-light lowercase">{d.description}</p>
                </div>
                <div className="space-y-1.5 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-gray-400">
                  <div className="flex justify-between gap-3"><span className="text-gray-500">provider:</span><span className="text-gray-300 text-right">{d.provider}</span></div>
                  <div className="flex justify-between gap-3"><span className="text-gray-500">resolution:</span><span className="text-gray-200 text-right">{d.resolution}</span></div>
                  <div className="flex justify-between gap-3"><span className="text-gray-500">coverage:</span><span className="text-sky-300 text-right">{d.coverage}</span></div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] text-amber-300/80 font-mono lowercase">not connected to a live catalog</span>
                  <button onClick={() => setSelectedDataset(d)} className="text-[11px] font-mono text-gray-300 hover:text-white flex items-center gap-1 transition-colors">
                    <Eye className="w-3 h-3" /><span>view details</span>
                  </button>
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </div>
      {selectedDataset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
          <div className="max-w-xl w-full">
            <GlassPanel variant="level-3" className="p-6 md:p-8 space-y-5 border border-sky-400/30 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-sky-400 lowercase">dataset specification • planned</span>
                  <h2 className="text-xl font-normal text-white lowercase">{selectedDataset.shortName}</h2>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-400/20">planned</span>
              </div>
              <p className="text-xs text-gray-300 font-light lowercase leading-relaxed">{selectedDataset.description}</p>
              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-2 text-xs font-mono text-gray-300">
                <div className="flex justify-between gap-3"><span className="text-gray-500">provider:</span><span className="text-right">{selectedDataset.provider}</span></div>
                <div className="flex justify-between gap-3"><span className="text-gray-500">resolution:</span><span className="text-right">{selectedDataset.resolution}</span></div>
                <div className="flex justify-between gap-3"><span className="text-gray-500">bands:</span><span className="text-right">{selectedDataset.bands}</span></div>
                <div className="flex justify-between gap-3"><span className="text-gray-500">example products:</span><span className="text-right">{selectedDataset.products}</span></div>
                <div className="flex justify-between gap-3"><span className="text-gray-500">use cases:</span><span className="text-right">{selectedDataset.use}</span></div>
              </div>
              <div className="flex justify-end"><GlassButton size="sm" variant="secondary" onClick={() => setSelectedDataset(null)}>close</GlassButton></div>
            </GlassPanel>
          </div>
        </div>
      )}
    </div>
  );
}
