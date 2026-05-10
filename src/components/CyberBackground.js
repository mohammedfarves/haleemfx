"use client";
import { motion } from "framer-motion";

export default function CyberBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,43,43,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,43,43,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"></div>
      
      {/* Moving scanline */}
      <motion.div 
        className="absolute inset-0 h-[2px] w-full bg-[#ff2b2b]/20 shadow-[0_0_15px_#ff2b2b]"
        animate={{ y: ["-10vh", "110vh"] }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      />
      
      {/* Subtle glowing orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#ff2b2b]/5 blur-[120px] rounded-full mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#6b0000]/20 blur-[120px] rounded-full mix-blend-screen" />
    </div>
  );
}
