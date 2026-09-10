import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import GlassPanel from '../components/common/GlassPanel';
import CesiumGlobe from '../components/cesium/CesiumGlobe';
import { Cpu, Play, CheckCircle2, ArrowRight, Layers, Sliders } from 'lucide-react';
import GlassButton from '../components/common/GlassButton';
import { useNavigate } from 'react-router-dom';

export default function WorkflowsPage() {
  const navigate = useNavigate();

  const workflows = [
    {
      name: 'temporal built-up differential (ndbi)',
      category: 'urban expansion',
      inputs: 'sentinel-2 optical (swir - nir) / (swir + nir)',
      compatibility: 'sentinel-2 optical l2a, landsat-9',
      operations: 5,
      status: 'workflow template',
      description: 'computes normalized difference built-up index between historical and observation rasters to map impervious surface growth.',
    },
    {
      name: 'vegetation canopy health index (ndvi)',
      category: 'vegetation monitoring',
      inputs: 'sentinel-2 / landsat-9 (nir - red) / (nir + red)',
      compatibility: 'sentinel-2 optical, planetscope, landsat-8/9',
      operations: 4,
      status: 'workflow template',
      description: 'measures normalized chlorophyll absorption across near-infrared and red bands to assess agricultural and canopy vigor.',
    },
    {
      name: 'modified normalized difference water index (mndwi)',
      category: 'hydrological assessment',
      inputs: 'sentinel-2 (green - swir) / (green + swir)',
      compatibility: 'sentinel-2 optical l2a, landsat-8/9',
      operations: 4,
      status: 'workflow template',
      description: 'suppresses built-up noise while highlighting open water bodies and wetlands for flood risk boundaries.',
    },
    {
      name: 'multi-spectral land cover classification',
      category: 'land use & land cover',
      inputs: 'multi-spectral 8-band stack + elevation dem',
      compatibility: 'sentinel-2 optical + srtm dem',
      operations: 6,
      status: 'workflow template',
      description: 'partitions spatial terrain into discrete land use classes using radiometric signatures and elevation topology.',
    },
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#020408] text-white">
      <div className="absolute inset-0 z-0">
        <CesiumGlobe
          cameraTarget={{ lng: 78.0, lat: 20.0, height: 9500000, pitch: -75, heading: 0 }}
          interactive={true}
          autoRotate={false}
        />
      </div>

      <Sidebar />

      <div className="absolute top-8 left-72 right-8 bottom-8 z-20 pointer-events-none overflow-y-auto">
        <div className="max-w-4xl pointer-events-auto space-y-6">
          <div className="p-4 rounded-2xl text-readable-backdrop space-y-1">
            <span className="text-xs font-mono text-sky-400 lowercase tracking-wider">
              deterministic geoprocessing catalog
            </span>
            <h1 className="text-3xl font-normal text-white lowercase tracking-tight">
              spatial workflow templates
            </h1>
            <p className="text-xs text-gray-300 font-light lowercase">
              reusable raster algebra and multi-epoch geoprocessing pipelines for rapid intelligence extraction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workflows.map((wf, idx) => (
              <GlassPanel
                key={idx}
                variant="subtle"
                className="p-5 space-y-4 border border-white/10 hover:border-sky-400/30 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-400/30 lowercase">
                      {wf.status}
                    </span>
                    <Cpu className="w-4 h-4 text-sky-400/80 group-hover:scale-110 transition-transform" />
                  </div>

                  <h3 className="text-base font-medium text-white lowercase group-hover:text-sky-200 transition-colors">
                    {wf.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-light lowercase">
                    {wf.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-gray-400">
                  <div className="flex justify-between">
                    <span className="text-gray-500">category:</span>
                    <span className="text-gray-300">{wf.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">compatibility:</span>
                    <span className="text-gray-300 truncate max-w-[200px]">{wf.compatibility}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">pipeline trace:</span>
                    <span className="text-sky-300">{wf.operations} operations</span>
                  </div>
                </div>

                <div className="pt-2">
                  <GlassButton
                    size="sm"
                    variant="primary"
                    className="w-full"
                    icon={Play}
                    onClick={() => navigate('/dashboard/new-analysis')}
                  >
                    launch in command center
                  </GlassButton>
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
