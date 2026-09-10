import React from 'react';
import { motion } from 'framer-motion';

export default function GlassButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  icon: Icon,
  type = 'button',
  ...props
}) {
  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  }[size] || 'px-5 py-2.5 text-sm';

  const variantClasses = {
    primary:
      'bg-sky-500/15 hover:bg-sky-500/25 text-sky-200 border border-sky-400/30 hover:border-sky-400/50 shadow-[0_0_20px_rgba(56,189,248,0.15)] hover:shadow-[0_0_30px_rgba(56,189,248,0.25)]',
    secondary:
      'bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 hover:text-white border border-white/10 hover:border-white/20',
    danger:
      'bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 hover:border-red-500/40',
    minimal:
      'bg-transparent hover:bg-white/[0.05] text-gray-400 hover:text-gray-200 border border-transparent',
  }[variant] || 'bg-white/[0.04] text-gray-300';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 backdrop-blur-md lowercase tracking-tight ${sizeClasses} ${variantClasses} ${
        disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 opacity-80" />}
      <span>{children}</span>
    </motion.button>
  );
}
