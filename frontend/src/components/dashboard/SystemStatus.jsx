import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export default function SystemStatus() {
  const [backendStatus, setBackendStatus] = useState('checking');

  useEffect(() => {
    let mounted = true;
    api.get('/health')
      .then((res) => {
        if (mounted) setBackendStatus(res.data?.status === 'ok' ? 'online' : 'reachable');
      })
      .catch(() => {
        if (mounted) setBackendStatus('unavailable');
      });
    return () => { mounted = false; };
  }, []);

  return (
    <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-[11px] font-mono text-gray-400 pointer-events-auto">
      <span className="flex items-center gap-1.5">
        <span className={`w-2 h-2 rounded-full ${backendStatus === 'online' ? 'bg-emerald-400' : backendStatus === 'unavailable' ? 'bg-red-400' : 'bg-amber-400'}`} />
        <span className="text-gray-200 lowercase">application status</span>
      </span>
      <span className="text-gray-600">•</span>
      <span className="text-gray-300 lowercase">cesium: available</span>
      <span className="text-gray-600">•</span>
      <span className="text-gray-300 lowercase">api: {backendStatus}</span>
      <span className="text-gray-600">•</span>
      <span className="text-amber-300 lowercase">eo processing: planned</span>
    </div>
  );
}
