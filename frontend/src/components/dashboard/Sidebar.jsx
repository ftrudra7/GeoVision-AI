import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Globe,
  Compass,
  Layers,
  History,
  FolderKanban,
  Database,
  Cpu,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import GlassPanel from '../common/GlassPanel';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { to: '/dashboard', label: 'overview', icon: Compass, end: true },
    { to: '/dashboard/analysis', label: 'new analysis', icon: Globe },
    { to: '/dashboard/projects', label: 'projects', icon: FolderKanban },
    { to: '/dashboard/history', label: 'history', icon: History },
    { to: '/dashboard/datasets', label: 'datasets', icon: Database },
    { to: '/dashboard/workflows', label: 'workflows', icon: Cpu },
    { to: '/dashboard/settings', label: 'settings', icon: Settings },
  ];

  return (
    <aside
      className={`fixed left-4 top-4 bottom-4 z-40 flex flex-col justify-between p-3 rounded-2xl glass-panel border border-white/10 transition-all duration-300 pointer-events-auto ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Top Brand & Toggle */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2 pt-1">
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-3 cursor-pointer group overflow-hidden"
          >
            <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center flex-shrink-0">
              <Globe className="w-4 h-4 text-sky-400 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white tracking-tight">
                  geovision ai
                </span>
                <span className="text-[9px] text-gray-500 font-mono tracking-wider">
                  command center
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-lg hover:bg-white/[0.08] text-gray-400 hover:text-white transition-colors"
          >
            {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-mono lowercase transition-all ${
                    isActive
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30 shadow-[0_0_15px_rgba(56,189,248,0.15)] font-medium'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]'
                  }`
                }
              >
                <Icon className="w-4 h-4 flex-shrink-0 opacity-80" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Info & Logout */}
      <div className="space-y-2 pt-4 border-t border-white/[0.08]">
        {!collapsed && (
          <div className="px-3 py-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="text-[11px] text-gray-300 font-medium truncate lowercase">
              {user?.name || 'analyst'}
            </div>
            <div className="text-[9px] text-gray-500 font-mono truncate lowercase">
              {user?.email || 'analyst@geovision.ai'}
            </div>
          </div>
        )}

        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs font-mono text-gray-400 hover:text-red-300 hover:bg-red-500/10 transition-colors lowercase"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>sign out</span>}
        </button>
      </div>
    </aside>
  );
}
