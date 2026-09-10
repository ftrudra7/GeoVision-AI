import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Globe, Compass, LogIn, UserPlus, LayoutDashboard, LogOut } from 'lucide-react';
import GlassButton from './GlassButton';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 pointer-events-none">
      {/* Brand logo */}
      <Link
        to="/"
        className="pointer-events-auto flex items-center gap-3 group"
      >
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-sky-500/10 border border-sky-400/30 group-hover:border-sky-400/60 transition-colors">
          <Globe className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute inset-0 rounded-full bg-sky-400/20 blur-[6px] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-tight text-white group-hover:text-sky-200 transition-colors">
            geovision ai
          </span>
          <span className="text-[10px] text-gray-500 tracking-wider">
            planetary intelligence
          </span>
        </div>
      </Link>

      {/* Navigation Links */}
      {!isDashboard && (
        <nav className="pointer-events-auto hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/[0.08] shadow-lg">
          <a
            href="#story"
            className="px-3.5 py-1 text-xs text-gray-400 hover:text-white transition-colors"
          >
            intelligence
          </a>
          <a
            href="#orchestration"
            className="px-3.5 py-1 text-xs text-gray-400 hover:text-white transition-colors"
          >
            gis workflow
          </a>
          <a
            href="#temporal"
            className="px-3.5 py-1 text-xs text-gray-400 hover:text-white transition-colors"
          >
            change detection
          </a>
          <a
            href="#analyst"
            className="px-3.5 py-1 text-xs text-gray-400 hover:text-white transition-colors"
          >
            ai analyst
          </a>
        </nav>
      )}

      {/* Actions */}
      <div className="pointer-events-auto flex items-center gap-3">
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            {!isDashboard ? (
              <GlassButton
                size="sm"
                variant="primary"
                icon={LayoutDashboard}
                onClick={() => navigate('/dashboard')}
              >
                command center
              </GlassButton>
            ) : (
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-xs text-gray-400 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
                  {user?.name || user?.email}
                </span>
                <GlassButton
                  size="sm"
                  variant="minimal"
                  icon={LogOut}
                  onClick={logout}
                >
                  sign out
                </GlassButton>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/signin">
              <GlassButton size="sm" variant="secondary" icon={LogIn}>
                sign in
              </GlassButton>
            </Link>
            <Link to="/signup">
              <GlassButton size="sm" variant="primary" icon={UserPlus}>
                get started
              </GlassButton>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
