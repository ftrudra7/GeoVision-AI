import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import GlassPanel from '../components/common/GlassPanel';
import CesiumGlobe from '../components/cesium/CesiumGlobe';
import { Cpu, ArrowRight } from 'lucide-react';
import GlassButton from '../components/common/GlassButton';
import { useNavigate } from 'react-router-dom';

const workflows = [
  {
    name: 'vegetation condition monitoring',
    category: 'vegetation / environmental trends',
    datasets: 'Sentinel-2, MODIS Terra, MODIS Aqua',
    methods: 'NDVI / EVI time series; quality filtering',
    description: 'Planned workflow for monitoring vegetation condition across dates and comparing broad-scale MODIS trends with Sentinel-2 detail.',
  },
  {
    name: 'urban expansion assessment',
    category: 'built-up growth / land cover',
    datasets: 'Sentinel-2',
    methods: 'Multispectral indices and land-cover comparison',
    description: 'Planned workflow for comparing built-up areas across multiple observation periods. It requires imagery retrieval and raster processing.',
  },
  {
    name: 'flood extent mapping',
    category: 'flood / surface water',
    datasets: 'Sentinel-1 GRD; terrain and hydrological context',
    methods: 'SAR preprocessing and water classification',
    description: 'Planned radar-based workflow for mapping potential flood extent. Flood forecasting and susceptibility require additional validated inputs.',
  },
  {
    name: 'land-use and land-cover analysis',
    category: 'land cover / environmental change',
    datasets: 'Sentinel-2; MODIS for regional context',
    methods: 'Multispectral classification and temporal comparison',
    description: 'Planned workflow for classifying land cover and comparing changes. No classifier or live processing pipeline is connected yet.',
  },
  {
    name: 'spatial suitability assessment',
    category: 'public infrastructure planning',
    datasets: 'Vector, demographic, accessibility and contextual data',
    methods: 'Weighted spatial criteria and overlays',
    description: 'Planned decision-support workflow for exploring suitable locations for hospitals, schools, and emergency services.',
  },
];

export default function WorkflowsPage() {
  const navigate = useNavigate();
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#020408] text-white">
      <div className="absolute inset-0 z-0">
        <CesiumGlobe cameraTarget={{ lng: 78.0, lat: 20.0, height: 9500000, pitch: -75, heading: 0 }} interactive autoRotate={false} />
      </div>
      <Sidebar />
      <div className="absolute top-16 lg:top-8 left-4 lg:left-72 right-4 lg:right-8 bottom-4 lg:bottom-8 z-20 pointer-events-none overflow-y-auto">
        <div className="max-w-4xl pointer-events-auto space-y-6">
          <div className="p-4 rounded-2xl text-readable-backdrop space-y-1">
            <span className="text-xs font-mono text-sky-400 lowercase tracking-wider">research and development roadmap</span>
            <h1 className="text-3xl font-normal text-white lowercase tracking-tight">geospatial workflow concepts</h1>
            <p className="text-xs text-gray-300 font-light lowercase">
              These are planned analytical workflows from the project roadmap. They are not executable pipelines yet.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workflows.map((wf) => (
              <GlassPanel key={wf.name} variant="subtle" className="p-5 space-y-4 border border-white/10 hover:border-sky-400/30 transition-all flex flex-col justify-between group">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-400/20 lowercase">planned</span>
                    <Cpu className="w-4 h-4 text-sky-400/80 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-base font-medium text-white lowercase group-hover:text-sky-200 transition-colors">{wf.name}</h3>
                  <p className="text-xs text-gray-400 font-light lowercase">{wf.description}</p>
                </div>
                <div className="space-y-1.5 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-gray-400">
                  <div className="flex justify-between gap-3"><span className="text-gray-500">category:</span><span className="text-gray-300 text-right">{wf.category}</span></div>
                  <div className="flex justify-between gap-3"><span className="text-gray-500">datasets:</span><span className="text-gray-300 text-right">{wf.datasets}</span></div>
                  <div className="flex justify-between gap-3"><span className="text-gray-500">method:</span><span className="text-sky-300 text-right">{wf.methods}</span></div>
                </div>
                <div className="pt-2">
                  <GlassButton size="sm" variant="secondary" className="w-full" icon={ArrowRight} onClick={() => navigate('/dashboard/new-analysis')}>
                    draft an analysis request
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
