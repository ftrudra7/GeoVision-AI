import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GlassPanelProps extends HTMLMotionProps<'div'> {
  className?: string;
  children: React.ReactNode;
}

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn('glass-panel rounded-xl border border-white/10 overflow-hidden', className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
GlassPanel.displayName = 'GlassPanel';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  className?: string;
  children: React.ReactNode;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={cn('glass-card rounded-xl p-6 relative group overflow-hidden', className)}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-transparent transition-colors duration-500 pointer-events-none" />
        {children}
      </motion.div>
    );
  }
);
GlassCard.displayName = 'GlassCard';

interface GlassButtonProps extends HTMLMotionProps<'button'> {
  className?: string;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = 'secondary', children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'glass-button px-6 py-2.5 rounded-lg flex items-center justify-center gap-2',
          variant === 'primary' && 'bg-accent/10 text-accent hover:bg-accent/20 border-accent/20 hover:border-accent/40',
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
GlassButton.displayName = 'GlassButton';

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn('glass-input w-full px-4 py-2.5 rounded-lg text-sm', className)}
        {...props}
      />
    );
  }
);
GlassInput.displayName = 'GlassInput';
