import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import GlassPanel from '../components/common/GlassPanel';
import GlassButton from '../components/common/GlassButton';
import CesiumGlobe from '../components/cesium/CesiumGlobe';
import { projectService } from '../services/projectService';
import { FolderKanban, Plus, Trash2, Calendar, MapPin, Loader2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const exampleTemplates = [
    {
      title: 'urban expansion monitor',
      desc: 'multi-temporal built-up density analysis across metropolitan corridors.',
      suggestedName: 'ncr metropolitan urban growth',
      suggestedDesc: 'monitoring 2020-2024 built-up expansion using sentinel-2 optical l2a rasters.',
    },
    {
      title: 'vegetation canopy health',
      desc: 'continuous ndvi differential tracking across regional forest parcels.',
      suggestedName: 'regional canopy & biomass audit',
      suggestedDesc: 'evaluating multi-year vegetation index variation across protected ecological zones.',
    },
    {
      title: 'hydrological flood risk',
      desc: 'surface water boundary extraction and seasonal flood inundation mapping.',
      suggestedName: 'river basin inundation assessment',
      suggestedDesc: 'tracking water body boundary shifts and monsoon surface water extent.',
    },
  ];

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getProjects();
      setProjects(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await projectService.createProject(name.trim(), description.trim());
      setName('');
      setDescription('');
      setIsCreating(false);
      fetchProjects();
    } catch (e) {
      console.error(e);
    }
  };

  const handleApplyTemplate = (tmpl) => {
    setName(tmpl.suggestedName);
    setDescription(tmpl.suggestedDesc);
    setIsCreating(true);
  };

  const handleDelete = async (id) => {
    try {
      await projectService.deleteProject(id);
      fetchProjects();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#020408] text-white">
      {/* Background Globe */}
      <div className="absolute inset-0 z-0">
        <CesiumGlobe
          cameraTarget={{ lng: 78.0, lat: 20.0, height: 9500000, pitch: -80, heading: 0 }}
          interactive={true}
          autoRotate={false}
        />
      </div>

      <Sidebar />

      {/* Main Content */}
      <div className="absolute top-8 left-72 right-8 bottom-8 z-20 pointer-events-none overflow-y-auto">
        <div className="max-w-4xl pointer-events-auto space-y-6">
          <div className="flex items-center justify-between p-4 rounded-2xl text-readable-backdrop">
            <div className="space-y-1">
              <span className="text-xs font-mono text-sky-400 lowercase tracking-wider">
                workspace management • persistent missions
              </span>
              <h1 className="text-3xl font-normal text-white lowercase tracking-tight">
                spatial intelligence projects
              </h1>
            </div>

            <GlassButton
              size="sm"
              variant="primary"
              icon={Plus}
              onClick={() => setIsCreating(!isCreating)}
            >
              {isCreating ? 'cancel' : 'new project'}
            </GlassButton>
          </div>

          {/* New Project Form Modal / Drawer */}
          {isCreating && (
            <GlassPanel variant="level-3" className="p-6 md:p-8 border border-sky-400/30 shadow-2xl space-y-4 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <h2 className="text-base font-medium text-white lowercase">create new spatial mission</h2>
                <span className="text-[10px] font-mono text-gray-400">sqlite database persistence</span>
              </div>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-gray-300 lowercase">mission name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. ncr urban expansion monitor"
                    required
                    className="w-full px-3.5 py-3 rounded-xl glass-input text-xs font-mono text-white lowercase"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-gray-300 lowercase">mission objective / description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="describe temporal range, target coordinates, and research scope..."
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono text-white lowercase"
                  />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-gray-500">creates a persistent workspace for analyses</span>
                  <div className="flex gap-2">
                    <GlassButton type="button" size="sm" variant="secondary" onClick={() => setIsCreating(false)}>
                      cancel
                    </GlassButton>
                    <GlassButton type="submit" size="sm" variant="primary">
                      save mission
                    </GlassButton>
                  </div>
                </div>
              </form>
            </GlassPanel>
          )}

          {/* Projects List or Empty State */}
          {loading ? (
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400 p-8">
              <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
              <span>fetching spatial missions...</span>
            </div>
          ) : projects.length === 0 ? (
            <div className="space-y-6">
              {/* Refined Empty State */}
              <GlassPanel variant="level-2" className="p-8 md:p-10 text-center space-y-4 border border-white/10">
                <div className="w-12 h-12 rounded-full bg-sky-500/10 border border-sky-400/20 flex items-center justify-center mx-auto text-sky-400">
                  <FolderKanban className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl font-medium text-white lowercase">no spatial missions yet</h2>
                  <p className="text-xs text-gray-400 lowercase font-light max-w-md mx-auto leading-relaxed">
                    create a persistent workspace for analyses, temporal comparisons, and workflow history.
                  </p>
                </div>
                <div className="pt-2">
                  <GlassButton
                    size="md"
                    variant="primary"
                    icon={Plus}
                    onClick={() => setIsCreating(true)}
                  >
                    create first project
                  </GlassButton>
                </div>
              </GlassPanel>

              {/* Example Mission Templates (Clearly marked) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-gray-400 px-1">
                  <span className="lowercase">example mission templates</span>
                  <span className="text-[10px] text-gray-500 lowercase">select to prefill</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {exampleTemplates.map((tmpl, idx) => (
                    <GlassPanel
                      key={idx}
                      variant="subtle"
                      className="p-5 space-y-3 border border-white/[0.08] hover:border-sky-400/40 transition-all cursor-pointer flex flex-col justify-between group"
                      onClick={() => handleApplyTemplate(tmpl)}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-mono text-sky-400">
                          <span>template 0{idx + 1}</span>
                          <Sparkles className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <h3 className="text-sm font-medium text-white lowercase group-hover:text-sky-200 transition-colors">
                          {tmpl.title}
                        </h3>
                        <p className="text-xs text-gray-400 font-light lowercase leading-relaxed">
                          {tmpl.desc}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-mono text-sky-400 pt-2 border-t border-white/[0.06]">
                        <span>use template</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </GlassPanel>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((p) => (
                <GlassPanel
                  key={p.id}
                  variant="subtle"
                  className="p-5 space-y-4 border border-white/10 hover:border-sky-400/30 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-sky-400">
                        mission #{p.id}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(p.id);
                        }}
                        className="text-gray-500 hover:text-red-400 p-1 transition-colors"
                        title="delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h3 className="text-base font-medium text-white lowercase group-hover:text-sky-200 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs text-gray-400 font-light lowercase line-clamp-2">
                      {p.description || 'no description provided'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-[10px] font-mono text-gray-500">
                    <div className="flex items-center gap-2">
                      <span>{p.analysis_count || 0} analyses</span>
                      <span>•</span>
                      <span>{new Date(p.created_at).toLocaleDateString()}</span>
                    </div>

                    <button
                      onClick={() => navigate('/dashboard/new-analysis')}
                      className="text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1"
                    >
                      <span>new analysis</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </GlassPanel>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
