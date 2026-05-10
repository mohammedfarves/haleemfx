"use client";
import { motion } from "framer-motion";

export default function GlowingSlider({ label, value, min, max, onChange, unit }) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full py-2">
      <div className="flex justify-between items-end mb-4">
        <label className="uppercase tracking-widest text-xs text-[#888] font-semibold">{label}</label>
        <span className="text-[#ff2b2b] font-bold text-xl glow-text" style={{ fontFamily: 'var(--font-rajdhani)' }}>
          {value} <span className="text-sm text-[#888]">{unit}</span>
        </span>
      </div>
      
      <div className="relative h-2 w-full bg-black/60 rounded-full border border-[#333]">
        {/* Glow track */}
        <motion.div 
          className="absolute top-0 left-0 h-full bg-[#ff2b2b] rounded-full shadow-[0_0_10px_#ff2b2b]"
          style={{ width: `${percentage}%` }}
          layout
        />
        
        {/* Native Input Range on top, invisible but interactive */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        {/* Custom Thumb */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_white] pointer-events-none transition-all duration-200"
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>
    </div>
  );
}
