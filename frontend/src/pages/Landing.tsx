import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Crosshair, Map as MapIcon, Database, Activity, GitCommit } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-primary font-sans">
      {/* Navbar */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Globe className="text-accent w-6 h-6" />
              <span className="font-bold tracking-wider uppercase text-sm">GeoVision AI</span>
            </div>
            <div className="hidden md:flex gap-8 text-sm font-medium text-secondary">
              <a href="#features" className="hover:text-primary transition-colors">FEATURES</a>
              <a href="#how-it-works" className="hover:text-primary transition-colors">HOW IT WORKS</a>
              <a href="#platform" className="hover:text-primary transition-colors">PLATFORM</a>
            </div>
            <div className="flex gap-4">
              <Link to="/signin" className="text-sm font-medium text-secondary hover:text-primary px-4 py-2">
                SIGN IN
              </Link>
              <Link to="/signup" className="text-sm font-medium bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 px-4 py-2 rounded transition-colors">
                GET STARTED
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border">
        {/* Background Map Simulation */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/20 via-background to-background"></div>
          {/* Simulated grid lines */}
          <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-40 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs font-mono mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            SYSTEM ONLINE
          </div>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
            Understand the Earth.<br />
            <span className="font-bold">Ask it anything.</span>
          </h1>
          <p className="text-secondary max-w-2xl mx-auto text-lg mb-10 leading-relaxed">
            GeoVision AI transforms natural-language questions into intelligent geospatial analysis using satellite imagery, GIS workflows, and AI-powered reasoning.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/signup" className="bg-accent text-background font-medium px-8 py-3 rounded hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              Start Analyzing
            </Link>
            <a href="#platform" className="border border-border text-primary font-medium px-8 py-3 rounded hover:bg-white/5 transition-colors">
              Explore Platform
            </a>
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="features" className="py-24 bg-panel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xs font-mono text-accent tracking-widest mb-2">CAPABILITIES</h2>
            <h3 className="text-3xl font-light">From Question to Insight</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: "SATELLITE INTELLIGENCE", desc: "Analyze satellite imagery to understand geographic patterns.", badge: "COMING SOON" },
              { icon: Crosshair, title: "CHANGE DETECTION", desc: "Identify changes in urban development, vegetation, water bodies, and land cover.", badge: "COMING SOON" },
              { icon: Activity, title: "AI GEOSPATIAL ANALYST", desc: "Ask complex spatial questions in natural language.", badge: "COMING SOON" },
              { icon: GitCommit, title: "AUTOMATED GIS WORKFLOWS", desc: "Transform natural-language requests into sequential geoprocessing operations.", badge: "COMING SOON" },
              { icon: MapIcon, title: "INTERACTIVE MAPS", desc: "Explore spatial results through an interactive geographic interface.", badge: "ACTIVE" },
              { icon: Database, title: "TRACEABLE ANALYSIS", desc: "Understand the workflow used to produce each result.", badge: "ACTIVE" },
            ].map((f, i) => (
              <div key={i} className="p-6 border border-border bg-background/50 hover:bg-background transition-colors group relative">
                <div className="absolute top-4 right-4">
                  <span className={`text-[10px] font-mono px-2 py-1 border ${f.badge === 'ACTIVE' ? 'border-accent/50 text-accent' : 'border-secondary/30 text-secondary'}`}>
                    {f.badge}
                  </span>
                </div>
                <f.icon className="w-8 h-8 text-secondary group-hover:text-accent transition-colors mb-4" />
                <h4 className="font-mono text-sm tracking-wider mb-2">{f.title}</h4>
                <p className="text-sm text-secondary leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div id="how-it-works" className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "ASK", desc: "Describe the geographic problem in natural language." },
              { step: "02", title: "PLAN", desc: "GeoVision determines the required geospatial operations." },
              { step: "03", title: "ANALYZE", desc: "GIS and AI tools process relevant datasets." },
              { step: "04", title: "UNDERSTAND", desc: "Receive maps, metrics, visualizations, and explanations." }
            ].map((s, i) => (
              <div key={i} className="relative">
                {i !== 3 && <div className="hidden md:block absolute top-6 left-full w-full border-t border-dashed border-border -ml-4 z-0"></div>}
                <div className="relative z-10 bg-background pr-4">
                  <div className="text-4xl font-light text-accent/20 mb-4">{s.step}</div>
                  <h4 className="font-mono text-sm tracking-wider mb-2 text-primary">{s.title}</h4>
                  <p className="text-sm text-secondary">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-panel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Globe className="text-accent w-5 h-5" />
              <span className="font-bold tracking-wider uppercase text-sm">GeoVision AI</span>
            </div>
            <p className="text-xs text-secondary">Intelligent geospatial analysis for a changing world.</p>
          </div>
          <div className="text-xs text-secondary font-mono">
            GeoVision AI — Final Year Capstone Project
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
