import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import GlassPanel from '../components/common/GlassPanel';
import GlassButton from '../components/common/GlassButton';
import CesiumGlobe from '../components/cesium/CesiumGlobe';
import { projectService } from '../services/projectService';
import { FolderKanban, Plus, Trash2, Calendar, MapPin, Loader2 } from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

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
          cameraTarget={{ lng: 78.0, lat: 20.0, height: 8000000, pitch: -75, heading: 0 }}
          interactive={true}
          autoRotate={false}
        />
      </div>

      <Sidebar />

      {/* Main Content */}
      <div className="absolute top-8 left-72 right-8 bottom-8 z-20 pointer-events-none overflow-y-auto">
        <div className="max-w-4xl pointer-events-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-sky-400">workspace management</span>
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
            <GlassPanel className="p-6 border border-white/10 shadow-2xl space-y-4">
              <h2 className="text-sm font-medium text-white lowercase">create new spatial project</h2>
              <form onSubmit={handleCreate} className="space-y-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="project name (e.g. ncr urban expansion monitor)"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono text-white lowercase"
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="project description..."
                  rows={2}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono text-white lowercase"
                />
                <div className="flex justify-end">
                  <GlassButton type="submit" size="sm" variant="primary">
                    save project
                  </GlassButton>
                </div>
              </form>
            </GlassPanel>
          )}

          {/* Projects List */}
          {loading ? (
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400 p-8">
              <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
              <span>fetching projects from sqlite database...</span>
            </div>
          ) : projects.length === 0 ? (
            <GlassPanel className="p-8 text-center space-y-3 border border-white/10">
              <FolderKanban className="w-8 h-8 text-gray-600 mx-auto" />
              <div className="text-sm font-medium text-white lowercase">no projects found</div>
              <p className="text-xs text-gray-400 lowercase font-light">
                create your first project to organize analyses and temporal layers.
              </p>
            </GlassPanel>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((p) => (
                <GlassPanel
                  key={p.id}
                  variant="subtle"
                  className="p-5 space-y-3 border border-white/10 hover:border-sky-400/30 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-sky-400">
                        project id #{p.id}
                      </span>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-gray-500 hover:text-red-400 p-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h3 className="text-base font-medium text-white lowercase">
                      {p.name}
                    </h3>
                    <p className="text-xs text-gray-400 font-light lowercase line-clamp-2">
                      {p.description || 'no description provided'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-[10px] font-mono text-gray-500">
                    <span>{p.analysis_count || 0} analyses</span>
                    <span>{new Date(p.created_at).toLocaleDateString()}</span>
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
