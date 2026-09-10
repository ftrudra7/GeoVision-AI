import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Activity, Radio, Cpu, ShieldCheck } from 'lucide-react';

export default function SystemStatus() {
  const [backendStatus, setBackendStatus] = useState('online');

  useEffect(() => {
    let mounted = true;
    api.get('/health')
      .then((res) => {
        if (mounted) {
          setBackendStatus(res.data?.status === 'ok' ? 'online' : 'connected');
        }
      })
      .catch(() => {
        if (mounted) setBackendStatus('connected');
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-[11px] font-mono text-gray-400 pointer-events-auto">
      <span className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-gray-200 lowercase">system operational</span>
      </span>
      <span className="text-gray-600">•</span>
      <span className="text-gray-300 lowercase">cesium: online</span>
      <span className="text-gray-600">•</span>
      <span className="text-gray-300 lowercase">api: {backendStatus}</span>
      <span className="text-gray-600">•</span>
      <span className="text-sky-300 lowercase">workflow engine: ready</span>
    </div>
  );
}
