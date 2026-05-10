"use client";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function StatCard({ title, value, unit, icon: Icon, className, main = false }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "relative p-5 rounded-xl border border-[#ff2b2b]/30 bg-black/40 backdrop-blur-md overflow-hidden group",
        main ? "glow-box border-[#ff2b2b]/60" : "",
        className
      )}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff2b2b]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="flex items-start justify-between relative z-10">
        <h3 className="uppercase tracking-widest text-xs text-[#888] font-semibold">{title}</h3>
        {Icon && <Icon className="w-5 h-5 text-[#ff2b2b] opacity-80" />}
      </div>
      
      <div className="mt-4 flex items-baseline gap-2 relative z-10">
        <motion.span 
          key={value}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "font-bold text-[#f5f5f5]",
            main ? "text-5xl text-[#ff2b2b] glow-text" : "text-3xl"
          )}
          style={{ fontFamily: 'var(--font-rajdhani)' }}
        >
          {value}
        </motion.span>
        {unit && <span className="text-[#888] text-sm uppercase tracking-wider">{unit}</span>}
      </div>
    </motion.div>
  );
}
