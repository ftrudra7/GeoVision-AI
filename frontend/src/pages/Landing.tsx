import { motion, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Navbar } from '../components/navigation/Navbar';
import { GlobeScene } from '../components/globe/GlobeScene';
import { GlassCard, GlassButton } from '../components/ui/Glass';
import { Satellite, Map, Zap, Layers, BarChart, Clock, ArrowRight, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const FADE_UP_ANIMATION_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: "spring", stiffness: 100, damping: 20 } },
};

export default function Landing() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity1 = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="relative min-h-screen bg-background text-primary overflow-x-hidden selection:bg-accent/30 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        {/* Spatial Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-panel via-background to-background z-0" />
        <GlobeScene />
        
        <motion.div 
          style={{ y: y1, opacity: opacity1 }}
          className="relative z-10 max-w-4xl mx-auto flex flex-col items-center mt-12"
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
              }
            }
          }}
        >
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="mb-8">
            <span className="glass px-4 py-1.5 rounded-full text-xs font-mono text-accent flex items-center gap-2 border-accent/20">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              system online
            </span>
          </motion.div>

          <motion.h1 variants={FADE_UP_ANIMATION_VARIANTS} className="text-5xl md:text-7xl font-medium tracking-tight leading-[0.95] mb-6">
            understand the earth.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-secondary">ask it anything.</span>
          </motion.h1>

          <motion.p variants={FADE_UP_ANIMATION_VARIANTS} className="text-lg md:text-xl text-secondary max-w-2xl font-light tracking-wide mb-10 leading-relaxed">
            turn natural-language questions into intelligent geospatial analysis.
          </motion.p>

          <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="flex flex-col sm:flex-row items-center gap-4">
            <Link to="/signup">
              <GlassButton variant="primary" className="py-3 px-8 text-sm">
                start analyzing <ArrowRight className="w-4 h-4 ml-1" />
              </GlassButton>
            </Link>
            <a href="#platform">
              <GlassButton className="py-3 px-8 text-sm">
                explore platform
              </GlassButton>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 px-6 z-10 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } }
            }}
            className="text-center mb-20"
          >
            <motion.h2 variants={FADE_UP_ANIMATION_VARIANTS} className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
              from question to insight
            </motion.h2>
            <motion.p variants={FADE_UP_ANIMATION_VARIANTS} className="text-secondary">
              the next generation of geospatial intelligence.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Satellite, title: "satellite intelligence", desc: "access massive archives of multi-spectral imagery instantly." },
              { icon: Zap, title: "change detection", desc: "automatically highlight structural and environmental shifts over time." },
              { icon: Map, title: "ai geospatial analyst", desc: "process natural language queries into executable gis workflows." },
              { icon: Layers, title: "automated gis workflows", desc: "orchestrate complex geospatial tasks without writing scripts." },
              { icon: BarChart, title: "interactive maps", desc: "beautiful, performant webgl visualizations of your data." },
              { icon: Clock, title: "traceable analysis", desc: "transparent methodology for every ai-generated insight." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlassCard className="h-full">
                  <feature.icon className="w-6 h-6 text-accent mb-4 opacity-80" />
                  <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                  <p className="text-secondary text-sm leading-relaxed">{feature.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative py-32 px-6 z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_var(--tw-gradient-stops))] from-accent/5 via-background to-background opacity-50 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight">the workflow</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "ask", desc: "describe what you want to know in plain english." },
              { step: "02", title: "plan", desc: "geovision formulates an optimized analytical strategy." },
              { step: "03", title: "analyze", desc: "distributed execution of gis tools and models." },
              { step: "04", title: "understand", desc: "interactive reports and visual data overlays." },
            ].map((stage, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="relative"
              >
                {i < 3 && <div className="hidden md:block absolute top-6 left-[60%] w-full h-[1px] bg-gradient-to-r from-accent/50 to-transparent" />}
                <div className="mb-4">
                  <span className="font-mono text-accent text-sm tracking-widest">{stage.step}</span>
                </div>
                <h3 className="text-xl font-medium mb-2">{stage.title}</h3>
                <p className="text-secondary text-sm">{stage.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-40 px-6 overflow-hidden z-10 flex flex-col items-center text-center">
        <div className="absolute inset-0 bg-panel/50 z-0 border-t border-white/5" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">ask the earth anything.</h2>
          <p className="text-secondary text-lg mb-10">turn complex spatial questions into actionable intelligence.</p>
          <Link to="/signup">
            <GlassButton variant="primary" className="py-4 px-10 text-sm">
              start analyzing
            </GlassButton>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-6 border-t border-white/5 z-10 bg-background text-sm text-secondary">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-accent opacity-50" />
            <span>geovision ai</span>
          </div>
          <div className="flex gap-6">
            <a href="#features" className="hover:text-primary transition-colors">features</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">how it works</a>
            <a href="#platform" className="hover:text-primary transition-colors">platform</a>
            <Link to="/signin" className="hover:text-primary transition-colors">sign in</Link>
          </div>
          <div className="font-mono text-xs opacity-50">
            geospatial intelligence, reimagined.
          </div>
        </div>
      </footer>
    </div>
  );
}
