import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Layers, History, Database, Activity, Settings, LayoutDashboard, Globe, LogOut, ChevronRight, Plus, Map as MapIcon, Loader2, CheckCircle2, Circle } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Dashboard State
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(-1);
  const [year, setYear] = useState(2022);
  const [layers, setLayers] = useState({
    satellite: true,
    urban: true,
    roads: false,
    vegetation: false,
    water: false,
    analysis: false
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsAnalyzing(true);
    setAnalysisStep(0);
    
    // Simulate AI Workflow
    const steps = [
      setTimeout(() => setAnalysisStep(1), 1500),
      setTimeout(() => setAnalysisStep(2), 3000),
      setTimeout(() => setAnalysisStep(3), 4500),
      setTimeout(() => setAnalysisStep(4), 6000),
      setTimeout(() => {
        setAnalysisStep(5);
        setLayers(prev => ({...prev, analysis: true}));
      }, 7500)
    ];
  };

  const workflowSteps = [
    { name: "Interpreting query", desc: "NLP processing of geospatial intent" },
    { name: "Identifying region", desc: "Bounding box extraction" },
    { name: "Preparing data", desc: "Retrieving relevant satellite tiles" },
    { name: "GIS processing", desc: "Executing spatial operations" },
    { name: "AI interpretation", desc: "Generating final insights" }
  ];

  return (
    <div className="h-screen flex flex-col bg-background text-primary overflow-hidden font-sans">
      {/* Top Bar */}
      <header className="h-12 border-b border-border bg-panel flex items-center justify-between px-4 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-accent" />
          <span className="font-bold tracking-widest text-sm uppercase">GeoVision AI</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success"></span>
            <span className="text-xs font-mono text-secondary tracking-wider">SYSTEM STATUS OPERATIONAL</span>
          </div>
          <div className="w-px h-4 bg-border"></div>
          <span className="text-xs font-medium">{user?.name}</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-panel flex flex-col shrink-0">
          <div className="p-4">
            <button className="w-full flex items-center justify-center gap-2 bg-accent/10 text-accent border border-accent/20 py-2 rounded text-sm font-medium hover:bg-accent/20 transition-colors">
              <Plus className="w-4 h-4" />
              NEW ANALYSIS
            </button>
          </div>
          <nav className="flex-1 py-2 overflow-y-auto">
            <div className="px-3 mb-2">
              <span className="text-[10px] font-mono text-secondary tracking-widest px-2">MAIN</span>
            </div>
            {[
              { icon: LayoutDashboard, label: "Overview", active: true },
              { icon: Layers, label: "Projects", comingSoon: true },
              { icon: History, label: "History", comingSoon: true }
            ].map((item, idx) => (
              <a key={idx} href="#" className={`flex items-center justify-between px-5 py-2 text-sm ${item.active ? 'text-accent bg-accent/5 border-l-2 border-accent' : 'text-secondary hover:text-primary'}`}>
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </div>
                {item.comingSoon && <span className="text-[9px] font-mono border border-border px-1 rounded">SOON</span>}
              </a>
            ))}

            <div className="px-3 mt-6 mb-2">
              <span className="text-[10px] font-mono text-secondary tracking-widest px-2">RESOURCES</span>
            </div>
            {[
              { icon: Database, label: "Datasets", comingSoon: true },
              { icon: Activity, label: "Workflows", comingSoon: true },
              { icon: Settings, label: "Settings", comingSoon: true }
            ].map((item, idx) => (
              <a key={idx} href="#" className="flex items-center justify-between px-5 py-2 text-sm text-secondary hover:text-primary">
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </div>
                {item.comingSoon && <span className="text-[9px] font-mono border border-border px-1 rounded">SOON</span>}
              </a>
            ))}
          </nav>
          
          <div className="p-4 border-t border-border mt-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded bg-accent/20 text-accent flex items-center justify-center font-bold text-sm">
                {user?.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-secondary truncate">{user?.email}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 text-xs text-secondary hover:text-primary transition-colors w-full">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex relative">
          {/* Map Layer (Simulated) */}
          <div className="absolute inset-0 bg-[#020408] z-0 overflow-hidden flex items-center justify-center">
            {/* Base Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
            
            {/* Simulated Satellite View Element */}
            {layers.satellite && (
               <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 50%, #06b6d4 0%, transparent 70%)'}}></div>
            )}
            
            {/* Simulated Geographic Shapes */}
            <div className={`absolute w-96 h-96 border ${layers.urban ? 'border-accent/40 bg-accent/5' : 'border-border bg-transparent'} transition-all duration-1000`}>
              {/* Technical crosshairs */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent/50 -mt-1 -ml-1"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent/50 -mt-1 -mr-1"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-accent/50 -mb-1 -ml-1"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent/50 -mb-1 -mr-1"></div>
              
              <div className="absolute top-2 left-2 text-[10px] font-mono text-accent/70">LAT 28.6139 LON 77.2090</div>
              
              {/* Demo active analysis overlay */}
              {layers.analysis && (
                <div className="absolute inset-4 bg-error/10 border border-error/30 animate-pulse flex items-center justify-center">
                  <span className="text-[10px] font-mono text-error uppercase">Change Detected</span>
                </div>
              )}
            </div>
          </div>

          {/* Overlays / Panels */}
          <div className="absolute inset-0 z-10 pointer-events-none p-4 flex flex-col justify-between">
            {/* Top row panels */}
            <div className="flex justify-between items-start">
              {/* Layer Controls */}
              <div className="bg-panel-elevated/90 backdrop-blur border border-border rounded p-4 pointer-events-auto w-64 shadow-2xl">
                <h3 className="text-xs font-mono text-secondary tracking-widest mb-3">LAYERS</h3>
                <div className="space-y-2">
                  {Object.entries(layers).map(([key, value]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={value} 
                        onChange={() => setLayers(prev => ({...prev, [key]: !prev[key as keyof typeof layers]}))}
                        className="w-3 h-3 accent-accent bg-transparent border-border"
                      />
                      <span className={`text-xs uppercase font-mono ${value ? 'text-primary' : 'text-secondary'} group-hover:text-primary transition-colors`}>{key}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Stats Panel */}
              <div className="bg-panel-elevated/90 backdrop-blur border border-border rounded p-4 pointer-events-auto flex gap-6 shadow-2xl">
                <div>
                  <div className="text-[10px] font-mono text-secondary mb-1">PROJECTS</div>
                  <div className="text-xl font-light">0</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-secondary mb-1">ANALYSES</div>
                  <div className="text-xl font-light">0</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-secondary mb-1">DATASETS</div>
                  <div className="text-xl font-light">0</div>
                </div>
              </div>
            </div>

            {/* Bottom area (Analysis + Timeline + Workflow) */}
            <div className="flex gap-4 items-end">
              
              {/* Ask GeoVision Panel */}
              <div className="bg-panel-elevated/95 backdrop-blur border border-border border-t-accent rounded p-4 pointer-events-auto flex-1 max-w-lg shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <h3 className="text-xs font-mono text-accent tracking-widest mb-3 flex items-center gap-2">
                  <Activity className="w-3 h-3" /> ASK GEOVISION
                </h3>
                <form onSubmit={handleAnalyze} className="relative">
                  <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Show me what changed in this region between 2020 and 2024."
                    className="w-full bg-background border border-border rounded px-3 py-3 text-sm focus:outline-none focus:border-accent transition-colors mb-3"
                    disabled={isAnalyzing && analysisStep < 5}
                  />
                  <button 
                    type="submit" 
                    disabled={!query.trim() || (isAnalyzing && analysisStep < 5)}
                    className="absolute right-2 top-2 bg-accent/10 text-accent p-1.5 rounded hover:bg-accent/20 transition-colors disabled:opacity-50"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
                <div className="text-[10px] text-secondary flex justify-between">
                  <span>DEMO MODE — AI ANALYSIS ENGINE COMING SOON</span>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-panel-elevated/90 backdrop-blur border border-border rounded p-4 pointer-events-auto flex-1 mb-0 shadow-2xl">
                 <div className="flex justify-between text-[10px] font-mono text-secondary mb-2">
                    <span>TEMPORAL CONTROL</span>
                    <span className="text-accent">YEAR: {year}</span>
                 </div>
                 <input 
                    type="range" 
                    min="2018" max="2024" step="1"
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                    className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
                 />
                 <div className="flex justify-between text-[10px] text-secondary mt-1">
                    <span>2018</span>
                    <span>2024</span>
                 </div>
              </div>

              {/* Workflow Trace Panel */}
              {isAnalyzing && (
                <div className="bg-panel-elevated/95 backdrop-blur border border-border rounded p-4 pointer-events-auto w-72 shadow-2xl transition-all h-64 overflow-y-auto">
                  <h3 className="text-xs font-mono text-secondary tracking-widest mb-4">WORKFLOW TRACE</h3>
                  <div className="space-y-4 relative">
                    <div className="absolute left-2 top-2 bottom-4 w-px bg-border z-0"></div>
                    {workflowSteps.map((step, idx) => {
                      const isActive = analysisStep === idx;
                      const isDone = analysisStep > idx;
                      const isPending = analysisStep < idx;
                      
                      return (
                        <div key={idx} className="flex gap-3 relative z-10">
                          <div className="shrink-0 mt-0.5 bg-panel-elevated">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-success" />
                            ) : isActive ? (
                              <Loader2 className="w-4 h-4 text-accent animate-spin" />
                            ) : (
                              <Circle className="w-4 h-4 text-secondary/30" />
                            )}
                          </div>
                          <div>
                            <p className={`text-xs font-mono uppercase ${isDone ? 'text-primary' : isActive ? 'text-accent' : 'text-secondary'}`}>
                              {step.name}
                            </p>
                            <p className="text-[10px] text-secondary mt-0.5">{step.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {analysisStep >= 5 && (
                    <div className="mt-4 p-2 bg-success/10 border border-success/30 rounded text-[10px] text-success font-mono uppercase text-center">
                      Demo Workflow Complete
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
