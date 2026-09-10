import React from 'react';
import { motion } from 'framer-motion';
import GlassButton from '../common/GlassButton';
import { Compass, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FinalCTASection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 md:px-16 py-32 z-10 pointer-events-none">
      <div className="max-w-3xl pointer-events-auto space-y-8">
        {/* Section marker */}
        <div className="flex items-center justify-center gap-3">
          <span className="text-xs font-mono text-sky-400">10</span>
          <div className="w-8 h-[1px] bg-sky-400/40" />
          <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
            planetary access
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal text-white lowercase tracking-tight leading-tight">
          ready to see the planet differently?
        </h2>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-gray-400 font-light lowercase max-w-xl mx-auto">
          join analysts, researchers, and spatial engineers utilizing autonomous geospatial intelligence workflows.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link to="/signup">
            <GlassButton size="lg" variant="primary" icon={Compass}>
              create free account
            </GlassButton>
          </Link>
          <Link to="/dashboard">
            <GlassButton size="lg" variant="secondary" icon={ArrowRight}>
              launch command center
            </GlassButton>
          </Link>
        </div>

        {/* Footer info */}
        <div className="pt-20 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-gray-500 gap-4">
          <span>geovision ai • planetary intelligence platform</span>
          <span className="lowercase">all rights reserved • 2026</span>
        </div>
      </div>
    </section>
  );
}
