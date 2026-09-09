import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { GlassButton } from '../ui/Glass';

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto glass-nav rounded-2xl px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <Globe className="w-5 h-5 text-accent opacity-80 group-hover:opacity-100 transition-opacity" />
          <span className="font-medium tracking-wide">geovision ai</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm text-secondary">
          <a href="#features" className="hover:text-primary transition-colors">features</a>
          <a href="#how-it-works" className="hover:text-primary transition-colors">how it works</a>
          <a href="#platform" className="hover:text-primary transition-colors">platform</a>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <Link to="/signin" className="text-secondary hover:text-primary transition-colors hidden sm:block">
            sign in
          </Link>
          <Link to="/signup">
            <GlassButton variant="primary" className="py-2 px-4 text-xs font-medium">
              get started
            </GlassButton>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
