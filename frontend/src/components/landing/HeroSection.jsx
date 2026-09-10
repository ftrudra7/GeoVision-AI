import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassButton from '../common/GlassButton';

export default function HeroSection({ onExploreClick }) {
  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-24 px-6 md:px-16 z-10 pointer-events-none">
      <div className="max-w-4xl pointer-events-auto space-y-6">
        {/* Subtle badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/[0.1] shadow-2xl"
        >
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span className="text-xs font-mono text-gray-300 lowercase tracking-wide">
            planetary intelligence v1.0
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-tighter text-white lowercase leading-[1.05]"
        >
          ask the planet <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-sky-200 to-sky-400">
            a question.
          </span>
        </motion.h1>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl text-lg md:text-xl text-gray-300/90 font-normal lowercase leading-relaxed p-2 rounded-xl text-readable-backdrop"
        >
          turn natural-language questions into traceable geospatial intelligence.
        </motion.p>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-4 pt-4"
        >
          <GlassButton
            size="lg"
            variant="primary"
            onClick={onExploreClick}
            icon={Compass}
          >
            explore geovision
          </GlassButton>

          <Link to="/dashboard">
            <GlassButton size="lg" variant="secondary" icon={ArrowRight}>
              open command center
            </GlassButton>
          </Link>
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 right-8 hidden md:flex items-center gap-3 text-xs font-mono text-gray-500 lowercase pointer-events-auto"
      >
        <span>scroll to orchestrate</span>
        <div className="w-8 h-[1px] bg-gray-700" />
      </motion.div>
    </section>
  );
}
