import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CesiumGlobe from '../components/cesium/CesiumGlobe';
import GlassPanel from '../components/common/GlassPanel';
import GlassButton from '../components/common/GlassButton';
import { Globe, Lock, Mail, User, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('all fields are required');
      return;
    }

    if (password.length < 6) {
      setError('password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      await signup(name, email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('signup error:', err);
      let msg = 'failed to create account';
      if (err.response?.data?.error) {
        msg = err.response.data.error;
      } else if (err.response?.data?.message) {
        msg = err.response.data.message;
      } else if (err.code === 'ERR_NETWORK' || err.message?.toLowerCase().includes('network')) {
        msg = 'unable to reach geovision api. please check connection and try again.';
      } else if (err.message) {
        msg = err.message;
      }
      setError(msg.toLowerCase());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-6 bg-[#020408]">
      {/* Background Cesium Globe */}
      <div className="fixed inset-0 z-0">
        <CesiumGlobe
          cameraTarget={{ lng: 77.2090, lat: 28.6139, height: 18000000, pitch: -85, heading: 0 }}
          interactive={false}
          autoRotate={true}
        />
      </div>

      {/* Glass Auth Card */}
      <GlassPanel className="relative z-10 w-full max-w-md p-8 md:p-10 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group mb-2">
            <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center">
              <Globe className="w-4 h-4 text-sky-400" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-white">
              geovision ai
            </span>
          </Link>

          <h1 className="text-2xl md:text-3xl font-normal text-white lowercase tracking-tight">
            create planetary account
          </h1>
          <p className="text-xs text-gray-400 lowercase font-light">
            start analyzing multi-sensor geospatial observations
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-2 p-3 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300 font-mono lowercase">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-gray-400 lowercase">
              full name
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="rudra sharma"
                required
                className="w-full px-4 py-3 pl-10 rounded-xl glass-input text-xs font-mono text-white placeholder-gray-600 lowercase"
              />
              <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-gray-400 lowercase">
              email address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="analyst@geovision.ai"
                required
                className="w-full px-4 py-3 pl-10 rounded-xl glass-input text-xs font-mono text-white placeholder-gray-600 lowercase"
              />
              <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-gray-400 lowercase">
              password (minimum 6 characters)
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 pl-10 rounded-xl glass-input text-xs font-mono text-white placeholder-gray-600"
              />
              <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="pt-2">
            <GlassButton
              type="submit"
              size="lg"
              variant="primary"
              disabled={loading}
              className="w-full"
              icon={loading ? Loader2 : ArrowRight}
            >
              {loading ? 'creating account...' : 'create account'}
            </GlassButton>
          </div>
        </form>

        {/* Footer Switch */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] text-center text-xs text-gray-400 font-light lowercase">
          already have an account?{' '}
          <Link to="/signin" className="text-sky-400 hover:text-sky-300 font-medium">
            sign in
          </Link>
        </div>
      </GlassPanel>
    </div>
  );
}
