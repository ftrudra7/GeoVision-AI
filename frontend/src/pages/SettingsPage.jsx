import React, { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import GlassPanel from '../components/common/GlassPanel';
import GlassButton from '../components/common/GlassButton';
import CesiumGlobe from '../components/cesium/CesiumGlobe';
import { useAuth } from '../context/AuthContext';
import { Settings, Key, User, Shield, Check, Save, Eye, EyeOff, Globe, Sliders, Moon } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const [showToken, setShowToken] = useState(false);
  const [cesiumToken, setCesiumToken] = useState(
    localStorage.getItem('geovision_cesium_token') || ''
  );
  const [mapQuality, setMapQuality] = useState('high');
  const [defaultDataset, setDefaultDataset] = useState('sentinel-2');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (cesiumToken) {
      localStorage.setItem('geovision_cesium_token', cesiumToken);
    } else {
      localStorage.removeItem('geovision_cesium_token');
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#020408] text-white">
      {/* Subdued Globe Background for Settings */}
      <div className="absolute inset-0 z-0 opacity-25">
        <CesiumGlobe
          cameraTarget={{ lng: 78.0, lat: 20.0, height: 18000000, pitch: -90, heading: 0 }}
          interactive={false}
          autoRotate={false}
        />
      </div>

      <Sidebar />

      <div className="absolute top-16 lg:top-8 left-4 lg:left-72 right-4 lg:right-8 bottom-4 lg:bottom-8 z-20 pointer-events-none overflow-y-auto">
        <div className="max-w-2xl pointer-events-auto space-y-6">
          <div className="p-4 rounded-2xl text-readable-backdrop space-y-1">
            <span className="text-xs font-mono text-sky-400 lowercase tracking-wider">
              system preferences
            </span>
            <h1 className="text-3xl font-normal text-white lowercase tracking-tight">
              settings & configuration
            </h1>
          </div>

          <GlassPanel variant="level-2" className="p-6 md:p-8 space-y-6 border border-white/10 shadow-2xl backdrop-blur-2xl">
            {/* User Profile Info */}
            <div className="space-y-3 pb-6 border-b border-white/[0.08]">
              <h2 className="text-sm font-medium text-white lowercase flex items-center gap-2">
                <User className="w-4 h-4 text-sky-400" />
                authenticated user profile
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-gray-500 block text-[10px] lowercase">analyst name:</span>
                  <span className="text-gray-200 lowercase font-medium">{user?.name || 'mission analyst'}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-gray-500 block text-[10px] lowercase">analyst email:</span>
                  <span className="text-gray-200 font-medium">{user?.email || 'analyst@geovision.ai'}</span>
                </div>
              </div>
            </div>

            {/* Map & Terrain Preferences */}
            <div className="space-y-3 pb-6 border-b border-white/[0.08]">
              <h2 className="text-sm font-medium text-white lowercase flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-400" />
                spatial viewport & map preferences
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 lowercase">terrain mesh detail</label>
                  <select
                    value={mapQuality}
                    onChange={(e) => setMapQuality(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs font-mono text-gray-200 bg-[#060b18] lowercase"
                  >
                    <option value="high">high precision ellipsoid (natural earth ii)</option>
                    <option value="balanced">balanced raster streaming</option>
                    <option value="eco">low bandwidth wireframe</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 lowercase">default analysis dataset</label>
                  <select
                    value={defaultDataset}
                    onChange={(e) => setDefaultDataset(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs font-mono text-gray-200 bg-[#060b18] lowercase"
                  >
                    <option value="sentinel-2">sentinel-2 optical l2a (10m)</option>
                    <option value="landsat-9">landsat-9 multispectral (30m)</option>
                    <option value="planetscope">planetscope superdove (3m)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Cesium Ion Access Token (Masked & Protected) */}
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-sm font-medium text-white lowercase flex items-center gap-2">
                  <Key className="w-4 h-4 text-sky-400" />
                  custom cesium ion token (optional)
                </h2>
                <p className="text-xs text-gray-400 font-light lowercase leading-relaxed">
                  an optional user token for accessing custom private 3d ion asset repositories. geovision works out of the box with offline ellipsoid textures.
                </p>

                <div className="relative">
                  <input
                    type={showToken ? 'text' : 'password'}
                    value={cesiumToken}
                    onChange={(e) => setCesiumToken(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full pl-3.5 pr-12 py-2.5 rounded-xl glass-input text-xs font-mono text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowToken(!showToken)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
                    title={showToken ? 'hide token' : 'show token'}
                  >
                    {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
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
