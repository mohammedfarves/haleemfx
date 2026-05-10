"use client";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export default function CyberSelect({ label, options, selected, onChange }) {
  return (
    <div className="w-full py-2">
      <label className="uppercase tracking-widest text-xs text-[#888] font-semibold mb-3 block">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected === option.value;
          return (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange(option.value)}
              className={twMerge(
                clsx(
                  "relative px-4 py-2 rounded border text-sm uppercase tracking-wider font-semibold transition-colors duration-200 overflow-hidden",
                  isSelected 
                    ? "border-[#ff2b2b] text-[#f5f5f5] glow-box bg-[#ff2b2b]/10" 
                    : "border-[#333] text-[#888] bg-black/40 hover:border-[#ff2b2b]/50 hover:text-[#bbb]"
                )
              )}
            >
              {isSelected && (
                <motion.div
                  layoutId={`${label}-active`}
                  className="absolute inset-0 bg-[#ff2b2b]/10 -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {option.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
