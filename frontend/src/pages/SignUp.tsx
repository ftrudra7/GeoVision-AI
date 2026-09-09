import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Globe, AlertCircle } from 'lucide-react';

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      // 1. Sign up
      await api.post('/api/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // 2. Log in automatically
      const loginParams = new URLSearchParams();
      loginParams.append('username', formData.email);
      loginParams.append('password', formData.password);
      
      const loginRes = await api.post('/api/auth/login', loginParams, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      await login(loginRes.data.access_token);
      navigate('/dashboard');
    } catch (err: any) {
      if (err.response?.status === 409) {
        setError('An account with this email already exists.');
      } else {
        setError(err.response?.data?.detail || 'Unable to connect to GeoVision. Please try again.');
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
            <h1 className="text-2xl font-light tracking-wide mb-2">INITIALIZE ACCOUNT</h1>
            <p className="text-sm text-secondary">Enter credentials to establish a new geospatial workspace.</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-error/10 border border-error/50 rounded flex items-start gap-3 text-sm text-error">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-secondary mb-1 uppercase tracking-wider">Full Name</label>
              <input 
                type="text" 
                required
                className="w-full bg-panel border border-border rounded px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
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
                minLength={8}
                className="w-full bg-panel border border-border rounded px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-secondary mb-1 uppercase tracking-wider">Confirm Password</label>
              <input 
                type="password" 
                required
                className="w-full bg-panel border border-border rounded px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                value={formData.confirmPassword}
                onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-6 bg-primary text-background hover:bg-white/90 font-medium py-2.5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'PROCESSING...' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-secondary">
            Already have an account?{' '}
            <Link to="/signin" className="text-accent hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
