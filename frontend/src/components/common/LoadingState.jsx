import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export default function LoadingState({ message = 'loading planetary systems...' }) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#020408] text-gray-400">
      <div className="relative flex items-center justify-center w-16 h-16 mb-4">
        <motion.div
          className="absolute inset-0 rounded-full border border-sky-400/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, ease: 'linear', repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-t-2 border-sky-400"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
        />
        <Globe className="w-6 h-6 text-sky-400/80 animate-pulse" />
      </div>
      <p className="text-xs text-gray-500 tracking-wider lowercase font-mono">
        {message}
      </p>
    </div>
  );
}
