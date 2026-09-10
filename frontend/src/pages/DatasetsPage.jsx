import React, { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import GlassPanel from '../components/common/GlassPanel';
import GlassButton from '../components/common/GlassButton';
import CesiumGlobe from '../components/cesium/CesiumGlobe';
import { Database, Satellite, Layers, Radio, Globe, Shield, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DatasetsPage() {
  const navigate = useNavigate();
  const [selectedDataset, setSelectedDataset] = useState(null);

  const datasets = [
    {
      name: 'sentinel-2 optical l2a',
      provider: 'european space agency (esa) / copernicus',
      resolution: '10m / 20m / 60m',
      bands: '13 spectral bands (vnir + swir)',
      coverage: 'global land surfaces (2015 → present)',
      status: 'catalog entry',
      description: 'high-resolution optical multispectral imagery with bottom-of-atmosphere reflectance correction for land cover & change detection.',
    },
    {
      name: 'landsat 8 / 9 oli-2',
      provider: 'usgs / nasa',
      resolution: '15m pan / 30m ms / 100m thermal',
      bands: '11 spectral bands + dual thermal',
      coverage: 'global continuous (2013 → present)',
      status: 'catalog entry',
      description: 'calibrated multispectral and thermal infrared measurements for longitudinal environmental and climate observations.',
    },
    {
      name: 'planetscope superdove',
      provider: 'planet labs',
      resolution: '3.0m ground sample distance',
      bands: '8-band superdove (rgb + nir + rededge)',
      coverage: 'daily global coverage capability',
      status: 'demo connection',
      description: 'high-cadence daily monitoring constellation for micro-parcel and rapid change analysis.',
    },
    {
      name: 'sentinel-1 c-band sar',
      provider: 'esa / copernicus',
      resolution: '5m x 20m (iw mode)',
      bands: 'c-band dual polarization (vv, vh)',
      coverage: 'global radar passes (all-weather)',
      status: 'catalog entry',
      description: 'synthetic aperture radar observations penetrating cloud cover and night conditions for flood & surface deformation analysis.',
    },
    {
      name: 'srtm global elevation (dem)',
      provider: 'nasa / nga',
      resolution: '30m elevation grid',
      bands: 'topographic surface height',
      coverage: 'near-global 60°n to 56°s',
      status: 'catalog entry',
      description: 'shuttle radar topography mission digital elevation data for 3d terrain morphology and hydrological flow modeling.',
    },
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#020408] text-white">
      <div className="absolute inset-0 z-0">
        <CesiumGlobe
          cameraTarget={{ lng: 78.0, lat: 20.0, height: 11000000, pitch: -80, heading: 0 }}
          interactive={true}
          autoRotate={false}
        />
      </div>

      <Sidebar />

      <div className="absolute top-16 lg:top-8 left-4 lg:left-72 right-4 lg:right-8 bottom-4 lg:bottom-8 z-20 pointer-events-none overflow-y-auto">
        <div className="max-w-4xl pointer-events-auto space-y-6">
          <div className="p-4 rounded-2xl text-readable-backdrop space-y-1">
            <span className="text-xs font-mono text-sky-400 lowercase tracking-wider">
              satellite constellation registry
            </span>
            <h1 className="text-3xl font-normal text-white lowercase tracking-tight">
              planetary dataset catalog
            </h1>
            <p className="text-xs text-gray-300 font-light lowercase">
              explore validated optical, multispectral, and radar imagery providers supported by geovision analysis pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {datasets.map((d, idx) => (
              <GlassPanel
                key={idx}
                variant="subtle"
                className="p-5 space-y-4 border border-white/10 hover:border-sky-400/30 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-400/20 lowercase">
                      {d.status}
                    </span>
                    <Satellite className="w-4 h-4 text-sky-400/80 group-hover:scale-110 transition-transform" />
                  </div>

                  <h3 className="text-base font-medium text-white lowercase group-hover:text-sky-200 transition-colors">
                    {d.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-light lowercase line-clamp-2">
                    {d.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-gray-400">
                  <div className="flex justify-between">
                    <span className="text-gray-500">provider:</span>
                    <span className="text-gray-300 truncate max-w-[200px]">{d.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">resolution:</span>
                    <span className="text-gray-200">{d.resolution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">coverage:</span>
                    <span className="text-sky-300">{d.coverage}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setSelectedDataset(d)}
                    className="text-[11px] font-mono text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <Eye className="w-3 h-3" />
                    <span>view details</span>
                  </button>

                  <button
                    onClick={() => navigate('/dashboard/new-analysis')}
                    className="text-[11px] font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
                  >
                    <span>use in analysis</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </div>

      {/* Dataset Details Modal */}
      {selectedDataset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
          <div className="max-w-xl w-full">
            <GlassPanel variant="level-3" className="p-6 md:p-8 space-y-5 border border-sky-400/30 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-sky-400 lowercase">catalog specification</span>
                  <h2 className="text-xl font-normal text-white lowercase">{selectedDataset.name}</h2>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-400/30 lowercase">
                  {selectedDataset.status}
                </span>
              </div>

              <p className="text-xs text-gray-300 font-light lowercase leading-relaxed">
                {selectedDataset.description}
              </p>

              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-2 text-xs font-mono text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-500">provider:</span>
                  <span>{selectedDataset.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">spatial resolution:</span>
                  <span>{selectedDataset.resolution}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">spectral bands:</span>
                  <span>{selectedDataset.bands}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">temporal archive:</span>
                  <span className="text-sky-300">{selectedDataset.coverage}</span>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <GlassButton size="sm" variant="secondary" onClick={() => setSelectedDataset(null)}>
                  close
                </GlassButton>
                <GlassButton
                  size="sm"
                  variant="primary"
                  icon={ArrowRight}
                  onClick={() => {
                    setSelectedDataset(null);
                    navigate('/dashboard/new-analysis');
                  }}
                >
                  launch analysis
                </GlassButton>
              </div>
            </GlassPanel>
          </div>
        </div>
      )}
    </div>
  );
}
