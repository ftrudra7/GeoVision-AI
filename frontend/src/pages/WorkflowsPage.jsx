import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import GlassPanel from '../components/common/GlassPanel';
import CesiumGlobe from '../components/cesium/CesiumGlobe';
import { Cpu, Play, CheckCircle2, ArrowRight } from 'lucide-react';
import GlassButton from '../components/common/GlassButton';
import { useNavigate } from 'react-router-dom';

export default function WorkflowsPage() {
  const navigate = useNavigate();

  const workflows = [
    {
      name: 'temporal built-up differential (ndbi)',
      type: 'urban expansion',
      inputs: 'sentinel-2 optical (swir - nir) / (swir + nir)',
      steps: 5,
      runtime: '~1.8s',
      status: 'verified pipeline',
    },
    {
      name: 'normalized difference vegetation index (ndvi)',
      type: 'canopy health',
      inputs: 'sentinel-2 / landsat-9 (nir - red) / (nir + red)',
      steps: 4,
      runtime: '~1.2s',
      status: 'verified pipeline',
    },
    {
      name: 'modified normalized difference water index (mndwi)',
      type: 'hydrology',
      inputs: 'sentinel-2 (green - swir) / (green + swir)',
      steps: 4,
      runtime: '~1.4s',
      status: 'verified pipeline',
    },
    {
      name: 'land use & land cover semantic segmentation',
      type: 'deep learning classification',
      inputs: 'multi-spectral 8-band stack + elevation dem',
      steps: 7,
      runtime: '~3.4s',
      status: 'verified pipeline',
    },
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#020408] text-white">
      <div className="absolute inset-0 z-0">
        <CesiumGlobe
          cameraTarget={{ lng: 78.0, lat: 20.0, height: 9000000, pitch: -75, heading: 0 }}
          interactive={true}
          autoRotate={false}
        />
      </div>

      <Sidebar />

      <div className="absolute top-8 left-72 right-8 bottom-8 z-20 pointer-events-none overflow-y-auto">
        <div className="max-w-4xl pointer-events-auto space-y-6">
          <div>
            <span className="text-xs font-mono text-sky-400">automated geoprocessing</span>
            <h1 className="text-3xl font-normal text-white lowercase tracking-tight">
              deterministic gis workflows
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workflows.map((wf, idx) => (
              <GlassPanel
                key={idx}
                variant="subtle"
                className="p-5 space-y-4 border border-white/10 hover:border-sky-400/30 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-400/20">
                      {wf.status}
                    </span>
                    <Cpu className="w-4 h-4 text-sky-400/80" />
                  </div>

                  <h3 className="text-base font-medium text-white lowercase">
                    {wf.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-light lowercase">
                    category: {wf.type}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-gray-400">
                  <div>
                    <span className="text-gray-500">algebra: </span>
                    <span className="text-gray-300">{wf.inputs}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span>pipeline steps: {wf.steps}</span>
                    <span className="text-sky-300">exec time: {wf.runtime}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <GlassButton
                    size="sm"
                    variant="primary"
                    className="w-full"
                    icon={Play}
                    onClick={() => navigate('/dashboard/analysis')}
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
