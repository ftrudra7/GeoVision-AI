import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Globe, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassPanel, GlassButton, GlassInput } from '../components/ui/Glass';
import { GlobeScene } from '../components/globe/GlobeScene';

export default function SignUp() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('passwords do not match');
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
      const loginRes = await api.post('/api/auth/login', {
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      });

      await login(loginRes.data.access_token);
      navigate('/dashboard');
    } catch (err: any) {
      if (err.message === 'Network Error' || err.code === 'ERR_NETWORK') {
        setError('cannot reach geovision api. make sure the backend is running.');
      } else if (err.response?.status === 409) {
        setError('an account with this email already exists.');
      } else if (err.response?.status === 422) {
        setError('please check the information you entered.');
      } else if (err.response?.status >= 500) {
        setError('geovision server error. check the backend logs.');
      } else {
        setError(err.response?.data?.detail || 'unable to connect to geovision. please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background text-primary overflow-hidden py-12">
      {/* Background Globe & Ambient Light */}
      <div className="absolute inset-0 z-0 opacity-40">
        <GlobeScene />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background to-background" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 w-full max-w-md px-6"
      >
        <div className="text-center mb-8">
          <Globe className="w-10 h-10 text-accent mx-auto mb-4 opacity-80" />
          <h1 className="text-2xl font-medium tracking-tight mb-2">initialize account</h1>
          <p className="text-sm text-secondary">establish a new geospatial workspace.</p>
        </div>

        <GlassPanel className="p-8">
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-3 bg-error/10 border border-error/50 rounded flex items-start gap-3 text-sm text-error"
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-secondary mb-1.5 ml-1">full name</label>
              <GlassInput 
                type="text" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-secondary mb-1.5 ml-1">email address</label>
              <GlassInput 
                type="email" 
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-secondary mb-1.5 ml-1">password</label>
              <GlassInput 
                type="password" 
                required
                minLength={8}
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-secondary mb-1.5 ml-1">confirm password</label>
              <GlassInput 
                type="password" 
                required
                value={formData.confirmPassword}
                onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>

            <GlassButton 
              type="submit" 
              variant="primary"
              disabled={loading}
              className="w-full mt-6 py-3"
            >
              {loading ? 'processing...' : 'create account'}
            </GlassButton>
          </form>

          <p className="mt-8 text-center text-sm text-secondary">
            already have an account?{' '}
            <Link to="/signin" className="text-accent hover:text-white transition-colors">
              sign in
            </Link>
          </p>
        </GlassPanel>
      </motion.div>
    </div>
  );
}
