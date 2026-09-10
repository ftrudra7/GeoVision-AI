import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import GlassPanel from '../components/common/GlassPanel';
import GlassButton from '../components/common/GlassButton';
import CesiumGlobe from '../components/cesium/CesiumGlobe';
import AnalysisResultModal from '../components/dashboard/AnalysisResultModal';
import { analysisService } from '../services/analysisService';
import { History, Clock, MapPin, Calendar, CheckCircle2, Loader2, Eye, RotateCw, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadHistory() {
      try {
        setLoading(true);
        const data = await analysisService.getHistory();
        setHistory(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadHistory();
  }, []);

  const handleOpenAnalysis = (item) => {
    setSelectedAnalysis({
      id: item.id,
      query: item.action || item.query || 'temporal analysis',
      region: item.region || 'delhi ncr, india',
      start_year: item.start_year || 2020,
      end_year: item.end_year || 2024,
      dataset: 'sentinel-2 optical l2a',
      analysis_type: 'temporal change detection',
      created_at: item.created_at,
    });
    setShowModal(true);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#020408] text-white">
      {/* Background Globe */}
      <div className="absolute inset-0 z-0">
        <CesiumGlobe
          cameraTarget={{ lng: 77.2090, lat: 28.6139, height: 7500000, pitch: -80, heading: 0 }}
          interactive={true}
          autoRotate={false}
        />
      </div>

      <Sidebar />

      {/* Main Content */}
      <div className="absolute top-8 left-72 right-8 bottom-8 z-20 pointer-events-none overflow-y-auto">
        <div className="max-w-4xl pointer-events-auto space-y-6">
          <div className="p-4 rounded-2xl text-readable-backdrop space-y-1">
            <span className="text-xs font-mono text-sky-400 lowercase tracking-wider">
              audit & activity trail
            </span>
            <h1 className="text-3xl font-normal text-white lowercase tracking-tight">
              spatial analysis history
            </h1>
          </div>

          {loading ? (
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400 p-8">
              <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
              <span>fetching analysis history...</span>
            </div>
          ) : history.length === 0 ? (
            <GlassPanel variant="level-2" className="p-8 md:p-10 text-center space-y-4 border border-white/10">
              <div className="w-12 h-12 rounded-full bg-sky-500/10 border border-sky-400/20 flex items-center justify-center mx-auto text-sky-400">
                <History className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-xl font-medium text-white lowercase">no history records yet</div>
                <p className="text-xs text-gray-400 lowercase font-light max-w-md mx-auto">
                  run an analysis query from the command center to populate your verifiable activity trail.
                </p>
              </div>
              <div className="pt-2">
                <GlassButton
                  size="md"
                  variant="primary"
                  onClick={() => navigate('/dashboard/new-analysis')}
                >
                  start new analysis
                </GlassButton>
              </div>
            </GlassPanel>
          ) : (
            <div className="space-y-3">
              {history.map((h) => (
                <GlassPanel
                  key={h.id}
                  variant="subtle"
                  className="p-4 md:p-5 border border-white/10 hover:border-sky-400/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-sm font-mono text-white lowercase font-medium group-hover:text-sky-200 transition-colors">
                        {h.action || h.query}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-gray-400">
                      {h.region && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-sky-400" />
                          {h.region}
                        </span>
                      )}
                      {h.start_year && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-sky-400" />
                          {h.start_year} → {h.end_year}
                        </span>
                      )}
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-400/20">
                        completed
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <div className="text-[10px] font-mono text-gray-500 flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(h.created_at).toLocaleDateString()}</span>
                    </div>

                    <button
                      onClick={() => handleOpenAnalysis(h)}
                      className="px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-mono flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>open</span>
                    </button>
                  </div>
                </GlassPanel>
              ))}
            </div>
          )}
        </div>
      </div>

      <AnalysisResultModal
        analysis={selectedAnalysis}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
