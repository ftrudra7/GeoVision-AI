import React from 'react';
import { motion } from 'framer-motion';

export default function GlassPanel({
  children,
  className = '',
  interactive = false,
  variant = 'default',
  initial,
  animate,
  exit,
  transition,
  ...props
}) {
  let baseClasses = 'glass-level-2';
  if (variant === 'level-1' || variant === 'atmospheric') {
    baseClasses = 'glass-level-1';
  } else if (variant === 'level-3' || variant === 'focused') {
    baseClasses = 'glass-level-3';
  } else if (variant === 'subtle') {
    baseClasses = 'glass-panel-subtle';
  } else if (variant === 'level-2' || variant === 'workspace' || variant === 'default') {
    baseClasses = interactive ? 'glass-panel-interactive' : 'glass-level-2';
  }

  if (interactive && !baseClasses.includes('interactive')) {
    baseClasses += ' glass-panel-interactive';
  }

  const combinedClasses = `${baseClasses} rounded-2xl ${className}`;

  if (initial || animate || exit) {
    return (
      <motion.div
        className={combinedClasses}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={transition}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  );
}
