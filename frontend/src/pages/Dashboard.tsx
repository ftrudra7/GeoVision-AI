import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Globe, LayoutDashboard, History, Database, 
  Settings, LogOut, Layers, Clock,
  Search, Crosshair, Navigation, Activity, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassPanel, GlassButton } from '../components/ui/Glass';
import { GlobeScene } from '../components/globe/GlobeScene';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [activeLayer, setActiveLayer] = useState('satellite');
  const [year, setYear] = useState(2024);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [query, setQuery] = useState('');

  const runAnalysis = () => {
    if (!query) return;
    setIsAnalyzing(true);
    setAnalysisStep(1);
    
    setTimeout(() => setAnalysisStep(2), 2000);
    setTimeout(() => setAnalysisStep(3), 4500);
    setTimeout(() => {
      setAnalysisStep(4);
      setIsAnalyzing(false);
    }, 7000);
  };

  return (
    <div className="flex h-screen bg-background text-primary overflow-hidden selection:bg-accent/30 selection:text-white">
      
      {/* Background Spatial Environment */}
      <div className="absolute inset-0 z-0">
        <GlobeScene />
        {/* Subtle grid and vignetting */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background/80 to-background pointer-events-none" />
      </div>

      {/* Floating Sidebar */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 h-[calc(100vh-2rem)] m-4 z-10 flex flex-col"
      >
        <GlassPanel className="flex-1 flex flex-col">
          <div className="p-6 border-b border-white/5 flex items-center gap-3">
            <Globe className="w-6 h-6 text-accent" />
            <span className="font-medium tracking-wide">geovision ai</span>
          </div>
          
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            <div className="px-3 mb-2 text-xs font-mono text-secondary uppercase tracking-widest">workspace</div>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5 text-primary text-sm font-medium transition-colors">
              <LayoutDashboard className="w-4 h-4" /> overview
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover:bg-white/5 hover:text-primary text-sm transition-colors">
              <Activity className="w-4 h-4" /> projects
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover:bg-white/5 hover:text-primary text-sm transition-colors">
              <History className="w-4 h-4" /> history
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover:bg-white/5 hover:text-primary text-sm transition-colors">
              <Database className="w-4 h-4" /> datasets
            </button>
          </nav>

          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3 px-3 py-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-medium text-sm">
                {user?.name.charAt(0).toLowerCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{user?.name.toLowerCase()}</div>
                <div className="text-xs text-secondary truncate">{user?.email.toLowerCase()}</div>
              </div>
            </div>
            
            <button className="w-full flex items-center gap-3 px-3 py-2 text-secondary hover:text-primary text-sm transition-colors">
              <Settings className="w-4 h-4" /> settings
            </button>
            <button 
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2 text-secondary hover:text-error text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" /> sign out
            </button>
          </div>
        </GlassPanel>
      </motion.aside>

      {/* Main Workspace */}
      <main className="flex-1 relative m-4 ml-0 z-10 flex flex-col pointer-events-none">
        
        {/* Top Controls */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-start pointer-events-auto"
        >
          {/* Ask GeoVision Input */}
          <GlassPanel className="flex-1 max-w-2xl flex items-center p-2">
            <Search className="w-5 h-5 text-secondary ml-3" />
            <input 
              type="text" 
              placeholder="ask geovision (e.g. what changed in this region between 2020 and 2024?)"
              className="flex-1 bg-transparent border-none px-4 py-2 text-sm focus:outline-none focus:ring-0 placeholder-secondary/50 text-primary"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && runAnalysis()}
            />
            <GlassButton 
              variant="primary" 
              className="py-2 px-4 text-xs"
              onClick={runAnalysis}
              disabled={isAnalyzing || !query}
            >
              {isAnalyzing ? 'analyzing...' : 'analyze'}
            </GlassButton>
          </GlassPanel>

          {/* Map Controls */}
          <div className="flex gap-2 ml-4">
            <GlassPanel className="p-1 flex flex-col gap-1">
              {['satellite', 'urban', 'terrain'].map((layer) => (
                <button
                  key={layer}
                  onClick={() => setActiveLayer(layer)}
                  className={`p-2.5 rounded-lg flex items-center justify-center transition-colors ${
                    activeLayer === layer ? 'bg-accent/20 text-accent' : 'text-secondary hover:bg-white/5 hover:text-primary'
                  }`}
                  title={`${layer} layer`}
                >
                  <Layers className="w-4 h-4" />
                </button>
              ))}
            </GlassPanel>
            
            <GlassPanel className="p-1 flex flex-col gap-1">
              <button className="p-2.5 rounded-lg text-secondary hover:bg-white/5 hover:text-primary transition-colors">
                <Navigation className="w-4 h-4" />
              </button>
              <button className="p-2.5 rounded-lg text-secondary hover:bg-white/5 hover:text-primary transition-colors">
                <Crosshair className="w-4 h-4" />
              </button>
            </GlassPanel>
          </div>
        </motion.div>

        {/* Spatial Reticle / Map Center Indicator */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
          <div className="w-12 h-12 border border-accent/30 rounded-full flex items-center justify-center relative">
            <div className="w-1 h-1 bg-accent rounded-full animate-pulse" />
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-accent/20 -translate-x-1/2" />
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-accent/20 -translate-y-1/2" />
          </div>
        </div>

        {/* Bottom Area: Timeline & Analysis Trace */}
        <div className="mt-auto pointer-events-auto flex gap-4">
          
          {/* Analysis Workflow Trace */}
          <AnimatePresence>
            {analysisStep > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-80"
              >
                <GlassPanel className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-4 h-4 text-accent" />
                    <h3 className="text-sm font-medium">analysis trace</h3>
                  </div>
                  
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[11px] before:w-[1px] before:bg-white/10">
                    {[
                      { step: 1, text: "parsing geospatial intent" },
                      { step: 2, text: "fetching sentinel-2 imagery" },
                      { step: 3, text: "running change detection model" },
                      { step: 4, text: "generating insights" }
                    ].map((item) => (
                      <div key={item.step} className="relative pl-8">
                        <div className={`absolute left-0 w-6 h-6 rounded-full flex items-center justify-center border text-[10px] bg-panel transition-colors duration-500 ${
                          analysisStep >= item.step ? 'border-accent text-accent shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'border-white/20 text-secondary'
                        }`}>
                          {analysisStep === item.step && isAnalyzing ? (
                            <div className="w-2 h-2 bg-accent rounded-full animate-ping" />
                          ) : (
                            item.step
                          )}
                        </div>
                        <p className={`text-sm transition-colors duration-500 ${
                          analysisStep >= item.step ? 'text-primary' : 'text-secondary'
                        }`}>
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  {analysisStep === 4 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-6 pt-4 border-t border-white/10"
                    >
                      <button className="w-full flex items-center justify-between text-sm text-accent hover:text-white transition-colors">
                        view complete report <ChevronRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </GlassPanel>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Temporal Slider */}
          <GlassPanel className="flex-1 flex flex-col justify-end p-5 h-[120px] mt-auto">
            <div className="flex justify-between items-center mb-4 text-xs font-mono text-secondary">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" /> temporal resolution
              </div>
              <div className="text-accent">{year}</div>
            </div>
            
            <div className="relative w-full h-1 bg-white/10 rounded-full flex items-center">
              <input
                type="range"
                min="2015"
                max="2024"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
              />
              {/* Custom Track Fill */}
              <div 
                className="absolute h-full bg-accent rounded-full pointer-events-none"
                style={{ width: `${((year - 2015) / 9) * 100}%` }}
              />
              {/* Custom Thumb */}
              <div 
                className="absolute w-4 h-4 bg-primary border-[3px] border-accent rounded-full pointer-events-none shadow-[0_0_10px_rgba(6,182,212,0.5)] transform -translate-x-1/2 transition-transform"
                style={{ left: `${((year - 2015) / 9) * 100}%` }}
              />
              
              <div className="absolute top-4 left-0 text-[10px] font-mono text-secondary/50">2015</div>
              <div className="absolute top-4 right-0 text-[10px] font-mono text-secondary/50">2024</div>
            </div>
          </GlassPanel>

        </div>
        
        {/* Subtle Status Bar */}
        <div className="absolute bottom-4 right-4 flex items-center gap-4 text-xs font-mono text-secondary/50 pointer-events-auto">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            data stream connected
          </div>
          <div>lat: 40.7128</div>
          <div>lng: -74.0060</div>
        </div>

      </main>

    </div>
  );
}
