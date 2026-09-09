import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Globe, AlertCircle } from 'lucide-react';

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const loginParams = new URLSearchParams();
      loginParams.append('username', formData.email);
      loginParams.append('password', formData.password);
      
      const response = await api.post('/api/auth/login', loginParams, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      await login(response.data.access_token);
      navigate('/dashboard');
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Invalid email or password.');
      } else {
        setError('Unable to connect to GeoVision. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background font-sans text-primary">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-1 flex-col justify-center items-center relative overflow-hidden border-r border-border bg-panel">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-50"></div>
        <div className="w-[120%] h-[120%] absolute border-[0.5px] border-border/30 rounded-full animate-[spin_120s_linear_infinite]"></div>
        <div className="w-[100%] h-[100%] absolute border-[0.5px] border-accent/20 rounded-full animate-[spin_90s_linear_infinite_reverse]"></div>
        <div className="z-10 text-center">
          <Globe className="w-16 h-16 text-accent mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-light tracking-widest uppercase mb-2">GeoVision AI</h2>
          <p className="text-secondary font-mono text-sm">SECURE ACCESS TERMINAL</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-light tracking-wide mb-2">AUTHENTICATE</h1>
            <p className="text-sm text-secondary">Enter credentials to access your geospatial workspace.</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-error/10 border border-error/50 rounded flex items-start gap-3 text-sm text-error">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-secondary mb-1 uppercase tracking-wider">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full bg-panel border border-border rounded px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-secondary mb-1 uppercase tracking-wider">Password</label>
              <input 
                type="password" 
                required
                className="w-full bg-panel border border-border rounded px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-6 bg-primary text-background hover:bg-white/90 font-medium py-2.5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'AUTHENTICATING...' : 'SIGN IN'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-secondary">
            Don't have an account?{' '}
            <Link to="/signup" className="text-accent hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
