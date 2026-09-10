import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import CesiumGlobe from '../components/cesium/CesiumGlobe';
import AnalysisInput from '../components/dashboard/AnalysisInput';
import WorkflowTrace from '../components/dashboard/WorkflowTrace';
import TemporalTimeline from '../components/dashboard/TemporalTimeline';
import LayerPanel from '../components/dashboard/LayerPanel';
import RegionPanel from '../components/dashboard/RegionPanel';
import AIAnalystPanel from '../components/dashboard/AIAnalystPanel';
import SystemStatus from '../components/dashboard/SystemStatus';
import { analysisService } from '../services/analysisService';

export default function DashboardPage() {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [isPlayingTimeline, setIsPlayingTimeline] = useState(false);
  const [isRunningAnalysis, setIsRunningAnalysis] = useState(false);
  const [workflowStepIndex, setWorkflowStepIndex] = useState(5);
  const [resultSummary, setResultSummary] = useState(
    'temporal analysis between 2020 and 2024 completed for delhi ncr. detected built-up expansion index: +14.2% across peripheral corridors. canopy index (ndvi) variance: -3.8% in urbanized sectors. (demo analysis — prototype demonstration)'
  );

  const [layers, setLayers] = useState({
    satellite: true,
    urban: true,
    roads: false,
    vegetation: false,
    water: false,
    boundary: true,
  });

  const [regionCoords, setRegionCoords] = useState({
    lat: 28.6139,
    lng: 77.2090,
    name: 'delhi ncr, india',
  });

  const [cameraTarget, setCameraTarget] = useState({
    lng: 77.2090,
    lat: 28.6139,
    height: 450000,
    pitch: -50,
    heading: 0,
  });

  const handleToggleLayer = (key) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRunAnalysis = async (data) => {
    setIsRunningAnalysis(true);
    setWorkflowStepIndex(0);
    setResultSummary(null);

    // If region changed, adjust camera
    if (data.region.includes('mumbai')) {
      setRegionCoords({ lat: 19.0760, lng: 72.8777, name: 'mumbai metropolitan region, india' });
      setCameraTarget({ lng: 72.8777, lat: 19.0760, height: 400000, pitch: -45, heading: 0 });
    } else if (data.region.includes('bengaluru')) {
      setRegionCoords({ lat: 12.9716, lng: 77.5946, name: 'bengaluru urban, india' });
      setCameraTarget({ lng: 77.5946, lat: 12.9716, height: 400000, pitch: -45, heading: 0 });
    } else {
      setRegionCoords({ lat: 28.6139, lng: 77.2090, name: 'delhi ncr, india' });
      setCameraTarget({ lng: 77.2090, lat: 28.6139, height: 450000, pitch: -50, heading: 0 });
    }

    // Step progression animation
    for (let i = 1; i <= 5; i++) {
      await new Promise((r) => setTimeout(r, 600));
      setWorkflowStepIndex(i);
    }

    // Save to real backend SQLite database
    try {
      await analysisService.createAnalysis({
        query: data.query,
        region: data.region,
        start_year: data.start_year,
        end_year: data.end_year,
        status: 'completed',
      });
    } catch (e) {
      console.warn('could not persist analysis to backend:', e);
    }

    setResultSummary(
      `analysis generated for ${data.region} [${data.start_year} → ${data.end_year}]. ${data.analysis_type} processed across ${data.dataset}. (demo analysis — imagery source demonstration)`
    );
    setIsRunningAnalysis(false);
  };

  // Timeline auto-play simulation
  useEffect(() => {
    if (!isPlayingTimeline) return;
    const interval = setInterval(() => {
      setSelectedYear((prev) => (prev >= 2024 ? 2020 : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [isPlayingTimeline]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#020408] text-white">
      {/* Background Full Cesium Globe */}
      <div className="absolute inset-0 z-0">
        <CesiumGlobe
          cameraTarget={cameraTarget}
          interactive={true}
          autoRotate={false}
          highlightRegion={
            layers.boundary
              ? {
                  lng: regionCoords.lng,
                  lat: regionCoords.lat,
                  radius: 50000.0,
                  name: regionCoords.name,
                }
              : null
          }
          markers={[
            {
              lng: regionCoords.lng,
              lat: regionCoords.lat,
              title: `${regionCoords.name} [aoi]`,
            },
          ]}
        />
      </div>

      {/* Floating Sidebar */}
      <Sidebar />

      {/* Top Bar: Telemetry & Status */}
      <div className="absolute top-4 left-16 lg:left-72 right-4 lg:right-6 z-30 flex items-center justify-between pointer-events-none overflow-x-auto pb-1">
        <SystemStatus />
      </div>

      {/* Main Command Center Floating Layout */}
      <div className="absolute top-16 left-4 lg:left-72 right-4 lg:right-6 bottom-4 z-20 pointer-events-none flex flex-col justify-between gap-4 overflow-y-auto lg:overflow-hidden">
        {/* Top Input Bar */}
        <div className="pointer-events-auto max-w-4xl w-full">
          <AnalysisInput
            onRunAnalysis={handleRunAnalysis}
            isRunning={isRunningAnalysis}
          />
        </div>

        {/* Middle Panels Grid */}
        <div className="flex-1 flex flex-col md:flex-row items-start justify-between gap-4 overflow-visible lg:overflow-hidden pointer-events-none py-2 lg:py-0">
          {/* Left Stack: Layers & Telemetry */}
          <div className="w-full md:w-72 space-y-3 pointer-events-auto overflow-y-visible lg:overflow-y-auto max-h-none lg:max-h-[calc(100vh-280px)]">
            <LayerPanel layers={layers} onToggleLayer={handleToggleLayer} />
            <RegionPanel
              regionName={regionCoords.name}
              coords={{ lat: regionCoords.lat, lng: regionCoords.lng }}
            />
          </div>

          {/* Right Stack: Workflow Trace & AI Analyst Drawer */}
          <div className="w-full md:w-80 lg:w-96 space-y-3 pointer-events-auto overflow-y-visible lg:overflow-y-auto max-h-none lg:max-h-[calc(100vh-280px)]">
            <WorkflowTrace
              currentStepIndex={workflowStepIndex}
              isRunning={isRunningAnalysis}
              resultSummary={resultSummary}
            />
            <AIAnalystPanel currentRegion={regionCoords.name} />
          </div>
        </div>

        {/* Bottom Bar: Timeline Slider */}
        <div className="pointer-events-auto max-w-2xl w-full">
          <TemporalTimeline
            selectedYear={selectedYear}
            onChangeYear={setSelectedYear}
            isPlaying={isPlayingTimeline}
            onTogglePlay={() => setIsPlayingTimeline(!isPlayingTimeline)}
          />
        </div>
      </div>
    </div>
  );
}
