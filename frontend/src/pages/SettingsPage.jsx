import React, { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import GlassPanel from '../components/common/GlassPanel';
import GlassButton from '../components/common/GlassButton';
import CesiumGlobe from '../components/cesium/CesiumGlobe';
import { useAuth } from '../context/AuthContext';
import { Settings, Key, User, Shield, Check, Save } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const [cesiumToken, setCesiumToken] = useState(
    localStorage.getItem('geovision_cesium_token') || ''
  );
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (cesiumToken) {
      localStorage.setItem('geovision_cesium_token', cesiumToken);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#020408] text-white">
      <div className="absolute inset-0 z-0">
        <CesiumGlobe
          cameraTarget={{ lng: 78.0, lat: 20.0, height: 11000000, pitch: -80, heading: 0 }}
          interactive={true}
          autoRotate={false}
        />
      </div>

      <Sidebar />

      <div className="absolute top-8 left-72 right-8 bottom-8 z-20 pointer-events-none overflow-y-auto">
        <div className="max-w-2xl pointer-events-auto space-y-6">
          <div>
            <span className="text-xs font-mono text-sky-400">system preferences</span>
            <h1 className="text-3xl font-normal text-white lowercase tracking-tight">
              settings & telemetry
            </h1>
          </div>

          <GlassPanel className="p-6 md:p-8 space-y-6 border border-white/10 shadow-2xl backdrop-blur-2xl">
            {/* User Profile Info */}
            <div className="space-y-3 pb-6 border-b border-white/[0.08]">
              <h2 className="text-sm font-medium text-white lowercase flex items-center gap-2">
                <User className="w-4 h-4 text-sky-400" />
                authenticated user profile
              </h2>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-gray-500 block text-[10px]">name:</span>
                  <span className="text-gray-200">{user?.name || 'analyst'}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-gray-500 block text-[10px]">email:</span>
                  <span className="text-gray-200">{user?.email || 'analyst@geovision.ai'}</span>
                </div>
              </div>
            </div>

            {/* Cesium Ion Settings */}
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <h2 className="text-sm font-medium text-white lowercase flex items-center gap-2">
                  <Key className="w-4 h-4 text-sky-400" />
                  cesium ion access token (optional)
                </h2>
                <p className="text-xs text-gray-400 font-light lowercase">
                  connect your custom cesium ion token for private high-resolution 3d tile assets.
                </p>
                <input
                  type="text"
                  value={cesiumToken}
                  onChange={(e) => setCesiumToken(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono text-white"
                />
              </div>

              {saved && (
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                  <Check className="w-4 h-4" />
                  <span>preferences saved successfully</span>
                </div>
              )}

              <div className="pt-2">
                <GlassButton type="submit" size="sm" variant="primary" icon={Save}>
                  save settings
                </GlassButton>
              </div>
            </form>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
