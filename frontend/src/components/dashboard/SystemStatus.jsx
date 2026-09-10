import React from 'react';
import GlassPanel from '../common/GlassPanel';
import { Activity, Wifi, Cpu, ShieldCheck } from 'lucide-react';

export default function SystemStatus() {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-[10px] font-mono text-gray-400 pointer-events-auto">
      <span className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-gray-300">cesium webgl: 60 fps</span>
      </span>
      <span className="text-gray-600">•</span>
      <span className="text-gray-300">backend api: online (0.4ms)</span>
      <span className="text-gray-600">•</span>
      <span className="text-sky-300">constellation: synchronized</span>
    </div>
  );
}
