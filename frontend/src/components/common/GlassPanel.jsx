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
  const baseClasses = variant === 'subtle'
    ? 'glass-panel-subtle'
    : interactive
    ? 'glass-panel-interactive'
    : 'glass-panel';

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
