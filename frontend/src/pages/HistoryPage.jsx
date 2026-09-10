import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import GlassPanel from '../components/common/GlassPanel';
import CesiumGlobe from '../components/cesium/CesiumGlobe';
import { analysisService } from '../services/analysisService';
import { History, Clock, MapPin, Calendar, CheckCircle2, Loader2 } from 'lucide-react';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#020408] text-white">
      {/* Background Globe */}
      <div className="absolute inset-0 z-0">
        <CesiumGlobe
          cameraTarget={{ lng: 77.2090, lat: 28.6139, height: 7000000, pitch: -80, heading: 0 }}
          interactive={true}
          autoRotate={false}
        />
      </div>

      <Sidebar />

      {/* Main Content */}
      <div className="absolute top-8 left-72 right-8 bottom-8 z-20 pointer-events-none overflow-y-auto">
        <div className="max-w-4xl pointer-events-auto space-y-6">
          <div>
            <span className="text-xs font-mono text-sky-400">audit & activity log</span>
            <h1 className="text-3xl font-normal text-white lowercase tracking-tight">
              spatial analysis history
            </h1>
          </div>

          {loading ? (
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400 p-8">
              <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
              <span>fetching analysis history from database...</span>
            </div>
          ) : history.length === 0 ? (
            <GlassPanel className="p-8 text-center space-y-3 border border-white/10">
              <History className="w-8 h-8 text-gray-600 mx-auto" />
              <div className="text-sm font-medium text-white lowercase">no history records yet</div>
              <p className="text-xs text-gray-400 lowercase font-light">
                run an analysis query from the command center to populate your activity trail.
              </p>
            </GlassPanel>
          ) : (
            <div className="space-y-3">
              {history.map((h) => (
                <GlassPanel
                  key={h.id}
                  variant="subtle"
                  className="p-4 border border-white/10 hover:border-sky-400/30 transition-all flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-sky-400" />
                      <span className="text-xs font-mono text-white lowercase">
                        {h.action || h.query}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] font-mono text-gray-400">
                      {h.region && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-sky-400" />
                          {h.region}
                        </span>
                      )}
                      {h.start_year && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-sky-400" />
                          {h.start_year} → {h.end_year}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-gray-500 flex items-center gap-1.5 flex-shrink-0">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(h.created_at).toLocaleString()}</span>
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
