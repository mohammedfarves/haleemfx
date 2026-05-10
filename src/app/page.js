"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const YoutubeIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.17 1 12 1 12s0 3.83.46 5.58a2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.83 23 12 23 12s0-3.83-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>
);
const InstagramIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const GithubIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);
const XIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

/*
══════════════════════════════════════════════════════════
SCIENCE-VERIFIED PROTEIN MULTIPLIERS  (g per kg body weight)
──────────────────────────────────────────────────────────
Muscle Build  -> 1.6-2.2 g/kg  (Morton et al. 2018 meta; ISSN 2017)
Fat Loss      -> 1.8-2.7 g/kg  (Helms et al. 2014; Stokes et al. 2018)
Bulking       -> 1.4-1.8 g/kg  (Phillips & Van Loon 2011)
Cutting       -> 2.3-3.1 g/kg  (Helms et al. 2014 aggressive cut)
Body Recomp   -> 2.2-2.8 g/kg  (Barakat et al. 2020; Stokes et al. 2018)
══════════════════════════════════════════════════════════
*/
const GOALS = [
  { id: "muscle", label: "Muscle Build", sub: "Hypertrophy", mul: { sed: 1.6, act: 1.8, ath: 2.0 } },
  { id: "fatloss", label: "Fat Loss", sub: "Deficit Phase", mul: { sed: 1.8, act: 2.0, ath: 2.3 } },
  { id: "bulking", label: "Bulking", sub: "Caloric Surplus", mul: { sed: 1.4, act: 1.6, ath: 1.8 } },
  { id: "cutting", label: "Cutting", sub: "Lean Preservation", mul: { sed: 2.0, act: 2.3, ath: 2.5 } },
  { id: "bodyrecomp", label: "Body Recomp", sub: "Build & Burn", mul: { sed: 2.0, act: 2.2, ath: 2.4 } },
];

const EXP = [
  { id: "beg", label: "Beginner", years: "< 1 yr", boost: 0.00 },
  { id: "int", label: "Intermediate", years: "1-3 yrs", boost: 0.10 },
  { id: "adv", label: "Advanced", years: "3+ yrs", boost: 0.15 },
];

const ACT = [
  { id: "sed", label: "Sedentary", sub: "desk / minimal" },
  { id: "act", label: "Active", sub: "3-5 days / wk" },
  { id: "ath", label: "Athlete", sub: "6+ sessions / wk" },
];

const GENDERS = [
  { id: "Male", sym: "♂" },
  { id: "Female", sym: "♀" },
  { id: "Other", sym: "◎" },
];

/* == SVG GOAL ICONS — clean vector body art == */
const GoalIcon = ({ id, active, size = 30 }) => {
  const hi = active ? "var(--cr2)" : "var(--tx3)";
  const mid = active ? "var(--cr)" : "color-mix(in srgb, var(--tx3) 50%, transparent)";
  const lo = active ? "var(--cr3)" : "var(--ln2)";
  const s = { width: size, height: size, display: "block", flexShrink: 0 };

  if (id === "muscle") return (
    <svg viewBox="0 0 36 36" style={s} fill="none">
      <circle cx="18" cy="6.5" r="3.8" fill={hi} />
      <rect x="16.5" y="9.8" width="3" height="2.5" rx="1" fill={hi} />
      <path d="M12 12.5 Q18 11 24 12.5 L23 26 Q18 27.5 13 26 Z" fill={mid} />
      <line x1="18" y1="13" x2="18" y2="23" stroke={lo} strokeWidth="1" strokeLinecap="round" />
      <path d="M13 15.5 Q15.5 14.5 18 15" stroke={hi} strokeWidth="0.8" strokeLinecap="round" fill="none" />
      <path d="M23 15.5 Q20.5 14.5 18 15" stroke={hi} strokeWidth="0.8" strokeLinecap="round" fill="none" />
      <path d="M12 13 C8 13 5.5 15 6 18.5 C6.5 21 9 22 11 20.5" fill={hi} stroke={hi} strokeWidth="0.5" />
      <path d="M12 19 C10 20.5 9.5 22.5 11 23.5 C12.5 24.5 14 23 13.5 21.5" fill={mid} stroke="none" />
      <path d="M24 13 C28 13 30.5 15 30 18.5 C29.5 21 27 22 25 20.5" fill={hi} stroke={hi} strokeWidth="0.5" />
      <path d="M24 19 C26 20.5 26.5 22.5 25 23.5 C23.5 24.5 22 23 22.5 21.5" fill={mid} stroke="none" />
      <path d="M13 26 L12 33 Q14 34 15.5 33 L16 26.5" fill={hi} />
      <path d="M23 26 L24 33 Q22 34 20.5 33 L20 26.5" fill={hi} />
    </svg>
  );

  if (id === "fatloss") return (
    <svg viewBox="0 0 36 36" style={s} fill="none">
      <path d="M18 34 C12 34 8 27 10 20 C11 15.5 14 13 13 8 C16 12 15 15.5 18 17.5 C19 14 21.5 10 20.5 5 C24.5 10 28 16 26 23 C25 28 22 34 18 34Z" fill={hi} />
      <path d="M18 30 C15 30 13 25.5 14.5 21 C15.5 18 17 17 18 19 C19 17 20.5 18 21.5 21 C23 25.5 21 30 18 30Z" fill={mid} />
      <path d="M16 20 L18 24 L20 20" stroke={lo} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="18" y1="17" x2="18" y2="23" stroke={lo} strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="8" cy="8" r="3" fill={hi} opacity="0.7" />
      <path d="M5.5 11 Q8 10 10.5 11 L11 19 Q8 20 5 19 Z" fill={mid} opacity="0.7" />
      <path d="M5 19 L4.5 26" stroke={hi} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M11 19 L11.5 26" stroke={hi} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );

  if (id === "bulking") return (
    <svg viewBox="0 0 36 36" style={s} fill="none">
      <rect x="6" y="19" width="24" height="3" rx="1.5" fill={mid} />
      <rect x="5" y="15.5" width="5" height="10" rx="1.8" fill={hi} />
      <rect x="3" y="17" width="3" height="7" rx="1" fill={mid} />
      <rect x="26" y="15.5" width="5" height="10" rx="1.8" fill={hi} />
      <rect x="30" y="17" width="3" height="7" rx="1" fill={mid} />
      <circle cx="18" cy="8" r="3.2" fill={hi} />
      <path d="M15.5 11 Q18 10 20.5 11 L21.5 19.5 Q18 20.5 14.5 19.5 Z" fill={mid} />
      <line x1="14" y1="13" x2="11" y2="20" stroke={hi} strokeWidth="2.2" strokeLinecap="round" />
      <line x1="22" y1="13" x2="25" y2="20" stroke={hi} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M17 3 L18 1 L19 3" stroke={hi} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="18" y1="1.5" x2="18" y2="6" stroke={hi} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="15.5" y1="20" x2="14.5" y2="28" stroke={hi} strokeWidth="2.2" strokeLinecap="round" />
      <line x1="20.5" y1="20" x2="21.5" y2="28" stroke={hi} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );

  if (id === "cutting") return (
    <svg viewBox="0 0 36 36" style={s} fill="none">
      <circle cx="18" cy="6.5" r="3.2" fill={hi} />
      <path d="M15.5 9.5 Q18 8.5 20.5 9.5 L21 24 Q18 25.5 15 24 Z" fill={mid} />
      <line x1="18" y1="11" x2="18" y2="23" stroke={lo} strokeWidth="0.9" strokeLinecap="round" />
      <line x1="15.5" y1="14.5" x2="20.5" y2="14.5" stroke={lo} strokeWidth="0.7" strokeLinecap="round" />
      <line x1="15.5" y1="18" x2="20.5" y2="18" stroke={lo} strokeWidth="0.7" strokeLinecap="round" />
      <line x1="15" y1="11" x2="12" y2="20" stroke={hi} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="21" y1="11" x2="24" y2="20" stroke={hi} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="16" y1="24" x2="15" y2="33" stroke={hi} strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="24" x2="21" y2="33" stroke={hi} strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="8" x2="10" y2="30" stroke={hi} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d="M26 8 L30 6 L28 10 Z" fill={hi} opacity="0.85" />
    </svg>
  );

  if (id === "bodyrecomp") return (
    <svg viewBox="0 0 36 36" style={s} fill="none">
      <circle cx="9" cy="7" r="3" fill={lo} />
      <ellipse cx="9" cy="16" rx="5" ry="7" fill={lo} />
      <line x1="7" y1="23" x2="6.5" y2="31" stroke={lo} strokeWidth="2" strokeLinecap="round" />
      <line x1="11" y1="23" x2="11.5" y2="31" stroke={lo} strokeWidth="2" strokeLinecap="round" />

      <path d="M15 15 L14 13 L17 15 L14 17 Z" fill={hi} />
      <path d="M21 15 L22 13 L19 15 L22 17 Z" fill={hi} />
      <line x1="14" y1="15" x2="22" y2="15" stroke={hi} strokeWidth="1" strokeLinecap="round" />

      <circle cx="27" cy="7" r="3" fill={hi} />
      <path d="M24 10 Q27 9 30 10 L30.5 22 Q27 23.5 23.5 22 Z" fill={mid} />
      <path d="M23.5 11 C21 11 19.5 13 20 15.5 C20.5 17.5 22.5 18 23.5 17" fill={hi} stroke={hi} strokeWidth="0.4" />
      <path d="M30.5 11 C33 11 34.5 13 34 15.5 C33.5 17.5 31.5 18 30.5 17" fill={hi} stroke={hi} strokeWidth="0.4" />
      <line x1="26" y1="22.5" x2="25.5" y2="31" stroke={hi} strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="22.5" x2="28.5" y2="31" stroke={hi} strokeWidth="2" strokeLinecap="round" />

      <path d="M6 4 Q18 -1 30 4" stroke={hi} strokeWidth="0.9" strokeLinecap="round" fill="none" strokeDasharray="2 2" opacity="0.5" />
      <path d="M6 33 Q18 37 30 33" stroke={lo} strokeWidth="0.9" strokeLinecap="round" fill="none" strokeDasharray="2 2" opacity="0.5" />
    </svg>
  );

  return null;
};

/* -- animated counter hook -- */
function useAnimatedNumber(target, duration = 400) {
  const [display, setDisplay] = useState(target);
  const prev = useRef(target);
  const frame = useRef(null);

  useEffect(() => {
    const start = prev.current, diff = target - start;
    if (!diff) return;
    const t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(start + diff * ease));
      if (p < 1) frame.current = requestAnimationFrame(tick);
      else prev.current = target;
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [target]);

  return display;
}

/* ══════════════════════════ COMPONENTS ══════════════════════════ */
const PromoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'absolute', inset: 0, background: 'var(--bg1)', opacity: 0.8, backdropFilter: 'blur(5px)' }}
            onClick={closePopup}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="panel"
            style={{
              position: 'relative', width: '100%', maxWidth: '420px', padding: '30px',
              boxShadow: '0 0 30px var(--crg), inset 0 0 20px color-mix(in srgb, var(--cr) 10%, transparent)',
              background: 'var(--bg0)', zIndex: 10
            }}
          >
            {/* Animated neon pulse border */}
            <motion.div
              style={{ position: 'absolute', inset: 0, borderRadius: '12px', pointerEvents: 'none', border: '1px solid color-mix(in srgb, var(--cr) 40%, transparent)' }}
              animate={{ boxShadow: ["0 0 0px transparent", "0 0 15px var(--crg)", "0 0 0px transparent"] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />

            <button
              onClick={closePopup}
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', color: 'var(--tx3)', cursor: 'pointer', zIndex: 20 }}
            >
              <motion.div whileHover={{ rotate: 90, color: 'var(--cr2)' }} transition={{ duration: 0.2 }}>
                <XIcon size={20} />
              </motion.div>
            </button>

            <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 className="brand-name" style={{ fontSize: '28px', marginBottom: '10px', textShadow: '0 0 15px var(--crg)' }}>
                <span>Enjoying Haleem FX?</span>
              </h2>
              <p style={{ color: 'var(--tx2)', fontSize: '12px', marginBottom: '24px', lineHeight: '1.5', letterSpacing: '0.03em' }}>
                Subscribe for more futuristic fitness tools and Contents.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                <a
                  href="https://youtube.com/@haleemfx" target="_blank" rel="noreferrer"
                  className="popup-btn"
                  style={{ '--theme': 'var(--cr2)' }}
                >
                  <YoutubeIcon size={16} /> <span>YouTube Subscribe</span>
                </a>

                <a
                  href="https://instagram.com/haleem.fx" target="_blank" rel="noreferrer"
                  className="popup-btn"
                  style={{ '--theme': 'var(--cr)' }}
                >
                  <InstagramIcon size={16} /> <span>Instagram Follow</span>
                </a>

                <button
                  onClick={closePopup}
                  style={{ marginTop: '10px', background: 'transparent', border: 'none', color: 'var(--tx3)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, cursor: 'pointer', transition: 'color 0.3s' }}
                  onMouseOver={(e) => e.target.style.color = 'var(--tx)'}
                  onMouseOut={(e) => e.target.style.color = 'var(--tx3)'}
                >
                  Continue to Dashboard
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ReferencePopup = ({ isOpen, closePopup }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'absolute', inset: 0, background: 'rgba(5,5,7,0.8)', backdropFilter: 'blur(5px)' }}
            onClick={closePopup}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="panel"
            style={{
              position: 'relative', width: '100%', maxWidth: '550px', maxHeight: '80vh', overflowY: 'auto', padding: '30px',
              boxShadow: '0 0 30px var(--crg), inset 0 0 20px color-mix(in srgb, var(--cr) 10%, transparent)',
              background: 'var(--bg0)', zIndex: 10
            }}
          >
            <button
              onClick={closePopup}
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', color: 'var(--tx3)', cursor: 'pointer', zIndex: 20 }}
            >
              <motion.div whileHover={{ rotate: 90, color: 'var(--cr2)' }} transition={{ duration: 0.2 }}>
                <XIcon size={20} />
              </motion.div>
            </button>

            <h2 className="brand-name" style={{ fontSize: '24px', marginBottom: '15px', color: 'var(--tx)' }}>
              References & Scientific Basis
            </h2>
            <div style={{ color: 'var(--tx2)', fontSize: '12px', lineHeight: '1.6', fontFamily: '"Space Mono", monospace' }}>
              <p style={{ marginBottom: '15px' }}>
                The protein intake multipliers used in this calculator are based on peer-reviewed sports nutrition and muscle metabolism research. Values are cross-checked from internationally recognized studies and evidence-based recommendations.
              </p>

              <h3 style={{ color: 'var(--cr2)', fontSize: '14px', marginBottom: '8px', marginTop: '20px', fontFamily: '"Oswald", sans-serif', textTransform: 'uppercase' }}>Research References</h3>
              <ul style={{ paddingLeft: '20px', marginBottom: '15px', color: 'var(--tx2)' }}>
                <li>Morton et al. (2018)</li>
                <li>ISSN Sports Nutrition Guidelines (2017)</li>
                <li>Helms et al. (2014)</li>
                <li>Stokes et al. (2018)</li>
                <li>Phillips & Van Loon (2011)</li>
                <li>Barakat et al. (2020)</li>
              </ul>

              <h3 style={{ color: 'var(--cr2)', fontSize: '14px', marginBottom: '8px', marginTop: '20px', fontFamily: '"Oswald", sans-serif', textTransform: 'uppercase' }}>Science-Based Protein Multipliers (g/kg)</h3>
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', marginBottom: '15px', border: '1px solid var(--ln2)' }}>
                <thead>
                  <tr style={{ background: 'var(--bg1)', color: 'var(--tx)' }}>
                    <th style={{ padding: '8px', borderBottom: '1px solid var(--ln2)' }}>Goal</th>
                    <th style={{ padding: '8px', borderBottom: '1px solid var(--ln2)' }}>Sedentary</th>
                    <th style={{ padding: '8px', borderBottom: '1px solid var(--ln2)' }}>Active</th>
                    <th style={{ padding: '8px', borderBottom: '1px solid var(--ln2)' }}>Athlete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={{ padding: '8px', borderBottom: '1px solid var(--ln2)' }}>Muscle Build</td><td style={{ padding: '8px', borderBottom: '1px solid var(--ln2)' }}>1.6</td><td style={{ padding: '8px', borderBottom: '1px solid var(--ln2)' }}>1.8</td><td style={{ padding: '8px', borderBottom: '1px solid var(--ln2)' }}>2.0</td></tr>
                  <tr><td style={{ padding: '8px', borderBottom: '1px solid var(--ln2)' }}>Fat Loss</td><td style={{ padding: '8px', borderBottom: '1px solid var(--ln2)' }}>1.8</td><td style={{ padding: '8px', borderBottom: '1px solid var(--ln2)' }}>2.0</td><td style={{ padding: '8px', borderBottom: '1px solid var(--ln2)' }}>2.3</td></tr>
                  <tr><td style={{ padding: '8px', borderBottom: '1px solid var(--ln2)' }}>Bulking</td><td style={{ padding: '8px', borderBottom: '1px solid var(--ln2)' }}>1.4</td><td style={{ padding: '8px', borderBottom: '1px solid var(--ln2)' }}>1.6</td><td style={{ padding: '8px', borderBottom: '1px solid var(--ln2)' }}>1.8</td></tr>
                  <tr><td style={{ padding: '8px', borderBottom: '1px solid var(--ln2)' }}>Cutting</td><td style={{ padding: '8px', borderBottom: '1px solid var(--ln2)' }}>2.0</td><td style={{ padding: '8px', borderBottom: '1px solid var(--ln2)' }}>2.3</td><td style={{ padding: '8px', borderBottom: '1px solid var(--ln2)' }}>2.5</td></tr>
                  <tr><td style={{ padding: '8px' }}>Body Recomp</td><td style={{ padding: '8px' }}>2.0</td><td style={{ padding: '8px' }}>2.2</td><td style={{ padding: '8px' }}>2.4</td></tr>
                </tbody>
              </table>

              <h3 style={{ color: 'var(--cr3)', fontSize: '14px', marginBottom: '8px', marginTop: '20px', fontFamily: '"Oswald", sans-serif', textTransform: 'uppercase' }}>Disclaimer</h3>
              <p style={{ fontSize: '10px', color: 'var(--tx3)', fontStyle: 'italic', lineHeight: '1.4' }}>
                These values are educational estimates based on current sports nutrition research and may vary depending on age, metabolism, medical conditions, training intensity, and individual goals.<br /><br />
                For maximum accuracy and personalized nutrition guidance, consult a certified dietitian, nutritionist, or medical doctor before making major dietary changes.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Footer = ({ onOpenReferences }) => {
  return (
    <div className="ftr">
      <div className="ftr-content">
        <div className="ftr-left">
          <div className="ftr-brand">
            Powered by <span><a href="https://infygrid.in" target="_blank" rel="noopener noreferrer">InfyGrid Solutions</a></span>
          </div>
          <div className="ftr-copy-row">
            <span>© {new Date().getFullYear()} Haleem FX. All rights reserved.</span>
            <span className="ftr-div">|</span>
            <button className="ftr-ref-btn" onClick={onOpenReferences}>
              References & Scientific Basis
            </button>
          </div>
        </div>

        <div className="ftr-socials">
          <a href="https://www.instagram.com/haleem.fx" target="_blank" rel="noreferrer" className="ftr-link">
            <InstagramIcon size={16} />
          </a>
          <a href="https://www.youtube.com/@HaleemFX" target="_blank" rel="noreferrer" className="ftr-link">
            <YoutubeIcon size={16} />
          </a>
          {/* <a href="https://github.com" target="_blank" rel="noreferrer" className="ftr-link">
            <GithubIcon size={16} />
          </a> */}
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════ CSS ══════════════════════════ */
const getCSS = (theme) => `
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Space+Mono:wght@400;700&family=Outfit:wght@300;400;500;600&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body,#root{width:100%;height:100%;background:${theme === 'dark' ? '#050507' : '#F0F4F8'};scroll-behavior:smooth;}

:root{
  ${theme === 'dark' ? `
  --cr: #00E5FF;
  --cr2: #00FFFF;
  --cr3: #008B8B;
  --crg: rgba(0, 229, 255, 0.25);
  
  --bg0: #050507;
  --bg1: rgba(18, 18, 23, 0.85);
  --bg2: #0B0B0E;
  
  --ln: #1A1C23;
  --ln2: #2A2D3A;
  
  --tx: #FFFFFF;
  --tx2: #A0A5B5;
  --tx3: #656A7A;
  
  --mt: #1A1C23;
  ` : `
  --cr: #0099CC;
  --cr2: #007A99;
  --cr3: #005C7A;
  --crg: rgba(0, 153, 204, 0.15);
  
  --bg0: #F0F4F8;
  --bg1: rgba(255, 255, 255, 0.95);
  --bg2: #E2E8F0;
  
  --ln: #CBD5E1;
  --ln2: #94A3B8;
  
  --tx: #0F172A;
  --tx2: #334155;
  --tx3: #475569;
  
  --mt: #E2E8F0;
  `}
}

/* -- keyframes -- */
@keyframes fadeUp   {from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@keyframes scanX    {0%{top:-4px;opacity:1}85%{opacity:.8}100%{top:100%;opacity:0}}
@keyframes shimmer  {0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes tickUp   {0%{transform:translateY(7px);opacity:0}100%{transform:none;opacity:1}}
@keyframes glowPop  {0%{filter:drop-shadow(0 0 2px var(--cr2))}45%{filter:drop-shadow(0 0 18px var(--cr2))}100%{filter:drop-shadow(0 0 7px var(--crg))}}
@keyframes pulseRing{0%{box-shadow:0 0 0 0 var(--crg)}70%{box-shadow:0 0 0 9px rgba(0,0,0,0)}100%{box-shadow:0 0 0 0 rgba(0,0,0,0)}}
@keyframes ripple   {0%{transform:scale(0);opacity:.4}100%{transform:scale(5);opacity:0}}
@keyframes floatUp  {0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-26px)}}
@keyframes borderGlow{0%,100%{opacity:.3}50%{opacity:.7}}
@keyframes iconBounce{0%{transform:scale(1)}30%{transform:scale(1.22)}70%{transform:scale(.95)}100%{transform:scale(1)}}
@keyframes panelSlide{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}

/* -- root -- */
.root{
  width:100vw;min-height:100vh;
  background:
  radial-gradient(ellipse 80% 60% at 15% 10%, color-mix(in srgb, var(--cr) 10%, transparent) 0%, transparent 55%),
  radial-gradient(ellipse 60% 50% at 85% 90%, color-mix(in srgb, var(--cr) 6%, transparent) 0%, transparent 55%),
  var(--bg0);
  display:flex;flex-direction:column;
  font-family:'Outfit',sans-serif;color:var(--tx);
  overflow-x:hidden;overflow-y:auto;position:relative;
  animation:fadeUp .5s ease both;
}
.root::before{
  content:'';position:absolute;inset:0;pointer-events:none;z-index:0;
  background-image:linear-gradient(var(--ln) 1px,transparent 1px),linear-gradient(90deg,var(--ln) 1px,transparent 1px);
  background-size:52px 52px;opacity:.2;
}
.root::after{
  content:'';position:absolute;inset:0;pointer-events:none;z-index:999;
  background:
    radial-gradient(circle at 100% 50%, transparent 20%, rgba(204, 255, 0, 0.04) 21%, rgba(204, 255, 0, 0.04) 34%, transparent 35%, transparent),
    radial-gradient(circle at 0% 50%, transparent 20%, rgba(204, 255, 0, 0.04) 21%, rgba(204, 255, 0, 0.04) 34%, transparent 35%, transparent) 0 -5px;
  background-size:10px 10px;
}

/* scanlines */
.sl1,.sl2{position:absolute;left:0;right:0;z-index:10;pointer-events:none;animation:scanX 1.5s ease both;}
.sl1{height:2px;background:linear-gradient(90deg,transparent,color-mix(in srgb, var(--cr) 75%, transparent),transparent);}
.sl2{height:1px;background:linear-gradient(90deg,transparent,color-mix(in srgb, var(--cr) 35%, transparent),transparent);animation-delay:.18s;}

/* -- HEADER -- */
.hdr{
  display:flex;align-items:center;justify-content:space-between;
  padding:15px 25px;border-bottom:1px solid var(--ln2);
  position:relative;z-index:2;flex-shrink:0;
  background:linear-gradient(180deg, color-mix(in srgb, var(--cr) 8%, transparent) 0%,transparent 100%);
  animation:fadeUp .5s .1s ease both;
}
.hdr::after{
  content:'';position:absolute;bottom:-1px;left:20px;right:20px;height:1px;
  background:linear-gradient(90deg,transparent 0%,var(--cr) 40%,var(--cr) 60%,transparent 100%);
  opacity:.5;animation:borderGlow 3s ease infinite;
}
.brand{display:flex;flex-direction:column;align-items:flex-start;}
.brand-img{height:140px;object-fit:contain;margin-bottom:10px;transition:height 0.3s;}
.brand-name{font-family:'Oswald',sans-serif;font-size:42px;font-weight:600;line-height:1;letter-spacing:0.05em;text-transform:uppercase;display:none;}
.brand-tag{font-family:'Space Mono',monospace;font-size:10px;font-weight:700;letter-spacing:0.4em;text-transform:uppercase;color:var(--cr);margin-top:2px;}
.brand-div{width:1px;height:60px;background:var(--ln2);flex-shrink:0;margin:0 20px;}

/* result pill */
.rpill{
  display:flex;align-items:center;gap:12px;
  background:var(--bg2);border:1px solid var(--ln2);border-radius:10px;padding:7px 16px;
  position:relative;overflow:hidden;
}
.rpill::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg, color-mix(in srgb, var(--cr) 6%, transparent) 0%,transparent 60%);pointer-events:none;}
.rpill::after{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,color-mix(in srgb, var(--cr) 60%, transparent),transparent);}
.pnum{
  font-family:'Oswald',sans-serif;font-size:58px;font-weight:600;line-height:0.85;
  color:var(--cr2);filter:drop-shadow(0 0 18px var(--crg));min-width:3ch;text-align:right;
}
.pnum.pop{animation:tickUp .22s ease,glowPop .55s ease;}
.rmeta{display:flex;flex-direction:column;gap:4px;}
.rg{font-family:'Space Mono',monospace;font-size:11px;font-weight:700;color:var(--tx3);letter-spacing:0.2em;text-transform:uppercase;}
.rmeal{font-family:'Space Mono',monospace;font-size:10px;color:var(--tx3);}
.rmeal b{color:var(--tx2);font-weight:700;}
.rmult{font-family:'Space Mono',monospace;font-size:10px;font-weight:700;color:var(--cr2);border:1px solid var(--ln);border-radius:4px;padding:2px 6px;display:inline-block;}

/* -- BODY GRID -- */
.body{
  flex:1;display:grid;grid-template-columns:1fr 1fr;
  gap:12px;padding:12px 20px;
  position:relative;z-index:2;
  animation:fadeUp .5s .2s ease both;
}

/* -- PANEL -- */
.panel{
  background:var(--bg1);border:1px solid var(--ln2);border-radius:12px;
  padding:14px 16px;display:flex;flex-direction:column;
  position:relative;overflow:hidden;
  transition:border-color .25s,box-shadow .25s;
  backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
}
.panel:hover{border-color:color-mix(in srgb, var(--cr) 58%, transparent);box-shadow:0 0 25px color-mix(in srgb, var(--cr) 12%, transparent),inset 0 0 20px color-mix(in srgb, var(--cr) 4%, transparent);}
.panel::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,color-mix(in srgb, var(--cr) 65%, transparent),transparent);}
.ptitle{
  font-family:'Space Mono',monospace;font-size:10px;font-weight:700;letter-spacing:0.32em;text-transform:uppercase;
  color:var(--tx3);margin-bottom:12px;flex-shrink:0;display:flex;align-items:center;gap:10px;
}
.ptitle::before{content:'';width:14px;height:1px;background:var(--cr);opacity:0.8;}
.ptitle::after{content:'';flex:1;height:1px;background:var(--ln);}

/* -- SLIDERS -- */
.sl{margin-bottom:12px;}
.sl:last-child{margin-bottom:0;}
.sl-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;}
.sl-name{font-family:'Space Mono',monospace;font-size:11px;font-weight:700;color:var(--tx2);text-transform:uppercase;letter-spacing:0.1em;}
.sl-right{display:flex;align-items:center;gap:7px;}
.sl-val{font-family:'Oswald',sans-serif;font-size:28px;font-weight:500;color:var(--tx);line-height:0.8;}
.sl-unit{font-family:'Space Mono',monospace;font-size:10px;font-weight:700;color:var(--tx3);}
.track{position:relative;height:4px;background:var(--mt);border-radius:99px;cursor:pointer;}
.tf{position:absolute;left:0;top:0;height:100%;border-radius:99px;background:linear-gradient(90deg,var(--cr3) 0%,var(--cr2) 100%);transition:width .18s cubic-bezier(.4,0,.2,1);box-shadow:0 0 6px var(--crg);}
.thumb{position:absolute;top:50%;transform:translateY(-50%);width:14px;height:14px;border-radius:50%;background:var(--cr2);border:2px solid #e84848;box-shadow:0 0 0 3px var(--crg),0 2px 6px rgba(0,0,0,.6);pointer-events:none;transition:left .18s cubic-bezier(.4,0,.2,1);}
.thumb.active{animation:pulseRing .7s ease;}
.track input[type=range]{position:absolute;top:50%;left:0;transform:translateY(-50%);width:100%;opacity:0;cursor:pointer;height:22px;margin:0;}
.utog{display:flex;background:var(--mt);border-radius:5px;padding:2px;gap:1px;}
.ubtn{border:none;border-radius:3px;padding:2px 7px;cursor:pointer;font-family:'Outfit',sans-serif;font-size:9px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;background:transparent;color:var(--tx3);transition:all .18s;}
.ubtn.on{background:var(--cr);color:#fff;box-shadow:0 1px 6px var(--crg);}

/* -- GENDER -- */
.gender-row{display:flex;gap:6px;margin-bottom:8px;}
.gchip{
  flex:1;border-radius:8px;padding:6px 4px;cursor:pointer;
  border:1px solid var(--ln);background:transparent;color:var(--tx3);
  transition:all .2s;font-family:'Outfit',sans-serif;font-size:11px;font-weight:500;
  text-align:center;display:flex;flex-direction:column;align-items:center;gap:1px;
  position:relative;overflow:hidden;
}
.gchip .gsym{font-size:16px;}
.gchip:hover:not(.on){border-color:var(--ln2);color:var(--tx2);transform:translateY(-1px);}
.gchip.on{background:linear-gradient(135deg, color-mix(in srgb, var(--cr) 18%, transparent), color-mix(in srgb, var(--cr) 4%, transparent));border-color:var(--cr);color:var(--cr2);box-shadow:0 0 12px color-mix(in srgb, var(--cr) 20%, transparent);transform:translateY(-1px);}

/* -- EXPERIENCE -- */
.exp-col{display:flex;flex-direction:column;gap:5px;flex:1;}
.ebtn{
  border-radius:8px;padding:6px 10px;cursor:pointer;
  border:1px solid var(--ln);background:transparent;color:var(--tx3);
  transition:all .2s;font-family:'Outfit',sans-serif;
  display:flex;align-items:center;justify-content:space-between;gap:6px;
  flex-shrink:0;position:relative;overflow:hidden;min-height:30px;
}
.ebtn:hover:not(.on){border-color:var(--ln2);}
.ebtn.on{background:linear-gradient(90deg, color-mix(in srgb, var(--cr) 16%, transparent), color-mix(in srgb, var(--cr) 3%, transparent));border-color:var(--cr);color:var(--cr2);box-shadow:0 0 10px color-mix(in srgb, var(--cr) 15%, transparent);}
.elabel{font-size:11px;font-weight:600;letter-spacing:.04em;}
.eyears{font-family:'Space Mono',monospace;font-size:9px;color:var(--tx3);border:1px solid var(--ln);border-radius:4px;padding:1px 5px;transition:all .2s;}
.ebtn.on .eyears{border-color:color-mix(in srgb, var(--cr) 40%, transparent);color:var(--cr2);}
.edot{width:7px;height:7px;border-radius:50%;flex-shrink:0;border:1.5px solid var(--tx3);transition:all .2s;}
.ebtn.on .edot{background:var(--cr2);border-color:var(--cr2);box-shadow:0 0 6px var(--crg);animation:pulseRing .6s ease;}

/* -- GOAL GRID -- */
.ggrid{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,1fr);gap:5px;flex:1;min-height:0;}
.gbtn{
  border-radius:10px;cursor:pointer;
  border:1px solid var(--ln);background:transparent;color:var(--tx3);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:5px 3px;gap:3px;font-family:'Outfit',sans-serif;
  width:100%;height:100%;min-height:55px;
  position:relative;overflow:hidden;
  transition:border-color .2s,box-shadow .2s,transform .15s,background .2s;
}
.gbtn:hover:not(.on){border-color:var(--ln2);transform:translateY(-1px);background:color-mix(in srgb, var(--cr) 4%, transparent);}
.gbtn.on{
  background:linear-gradient(160deg, color-mix(in srgb, var(--cr) 22%, transparent), color-mix(in srgb, var(--cr) 4%, transparent));
  border-color:var(--cr);color:var(--cr2);
  box-shadow:0 0 16px color-mix(in srgb, var(--cr) 25%, transparent),inset 0 0 12px color-mix(in srgb, var(--cr) 5%, transparent);
  transform:translateY(-1px);
}
.gbtn .glbl{font-size:8px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;text-align:center;line-height:1.3;}
.gbtn .gsub{font-size:6px;color:var(--tx3);letter-spacing:.06em;text-align:center;font-weight:500;}
.gbtn.on .gsub{color:color-mix(in srgb, var(--tx) 50%, transparent);}
.gbtn .gicon-wrap{transition:transform .25s cubic-bezier(.34,1.56,.64,1);}
.gbtn:hover .gicon-wrap,.gbtn.on .gicon-wrap{transform:scale(1.1);}
.gbtn.just-clicked .gicon-wrap{animation:iconBounce .4s cubic-bezier(.34,1.56,.64,1);}

/* ripple */
.rpl{
  position:absolute;border-radius:50%;width:60px;height:60px;
  background:color-mix(in srgb, var(--cr) 32%, transparent);pointer-events:none;
  animation:ripple .65s ease-out forwards;transform-origin:center;
}
/* float-up value label */
.flt{
  position:absolute;font-family:'Space Mono',monospace;font-size:9px;
  color:var(--cr2);pointer-events:none;white-space:nowrap;z-index:20;
  animation:floatUp .75s ease-out forwards;
}

/* -- ACTIVITY -- */
.act-col{display:flex;flex-direction:column;gap:5px;flex:1;}
.abtn{
  border-radius:8px;padding:8px 10px;cursor:pointer;
  border:1px solid var(--ln);background:transparent;color:var(--tx3);
  transition:all .2s;font-family:'Outfit',sans-serif;
  display:flex;align-items:center;gap:10px;flex-shrink:0;min-height:36px;
  position:relative;overflow:hidden;
}
.abtn:hover:not(.on){border-color:var(--ln2);background:color-mix(in srgb, var(--cr) 3%, transparent);}
.abtn.on{background:linear-gradient(90deg, color-mix(in srgb, var(--cr) 16%, transparent), color-mix(in srgb, var(--cr) 2%, transparent));border-color:var(--cr);}
.adot{width:8px;height:8px;border-radius:50%;flex-shrink:0;border:1.5px solid var(--tx3);transition:all .2s;}
.abtn.on .adot{background:var(--cr2);border-color:var(--cr2);box-shadow:0 0 7px var(--crg);animation:pulseRing .6s ease;}
.atext{display:flex;flex-direction:column;}
.albl{font-size:12px;font-weight:600;letter-spacing:.04em;color:var(--tx2);transition:color .2s;}
.abtn.on .albl{color:var(--cr2);}
.asub{font-size:8.5px;color:var(--tx3);letter-spacing:.05em;}

/* -- mobile sticky result -- */
.mobile-sticky-result { display: none; }

/* -- BOTTOM -- */
.bot{
  display:flex;align-items:center;gap:12px;
  padding:7px 16px 9px;border-top:1px solid var(--ln2);
  position:relative;z-index:2;flex-shrink:0;
  background:linear-gradient(0deg, color-mix(in srgb, var(--cr) 4%, transparent) 0%,transparent 100%);
  animation:fadeUp .5s .3s ease both;
}
.bot::before{content:'';position:absolute;top:-1px;left:16px;right:16px;height:1px;background:linear-gradient(90deg,transparent 0%,var(--cr) 40%,var(--cr) 60%,transparent 100%);opacity:.3;}
.stats{display:flex;gap:10px;align-items:center;flex-shrink:0;}
.stat{text-align:center;}
.sv{font-family:'Space Mono',monospace;font-size:18px;font-weight:500;color:var(--cr2);line-height:1;}
.slbl{font-size:7px;font-weight:600;color:var(--tx3);letter-spacing:.22em;text-transform:uppercase;margin-top:2px;}
.sdiv{width:1px;height:26px;background:var(--ln2);}
.bar-area{flex:1;}
.btrk{height:3px;background:var(--mt);border-radius:99px;overflow:hidden;}
.bfill{height:100%;border-radius:99px;background:linear-gradient(90deg,var(--cr3) 0%,var(--cr2) 100%);box-shadow:0 0 6px var(--crg);transition:width .5s cubic-bezier(.34,1.2,.64,1);}
.blbl{font-size:7px;color:var(--tx3);margin-top:3px;text-align:right;letter-spacing:.12em;font-family:'Space Mono',monospace;}
.badge{font-family:'Cormorant Garamond',serif;font-size:12px;font-weight:600;color:var(--cr3);letter-spacing:.12em;border:1px solid var(--ln2);border-radius:6px;padding:3px 10px;flex-shrink:0;}

/* Glow box util for popup */
.glow-box{
  box-shadow: 0 0 15px var(--crg), inset 0 0 10px color-mix(in srgb, var(--cr) 5%, transparent);
}
.popup-btn{
  display:flex;align-items:center;justify-content:center;gap:10px;
  width:100%;padding:12px;border-radius:8px;
  background:color-mix(in srgb, var(--theme) 10%, transparent);
  border:1px solid color-mix(in srgb, var(--theme) 40%, transparent);
  color:var(--theme);font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;
  transition:all 0.3s;text-decoration:none;
}
.popup-btn:hover{
  background:var(--theme);color:#fff;
  box-shadow:0 0 20px color-mix(in srgb, var(--theme) 50%, transparent);
  transform:translateY(-2px);
}

/* -- FOOTER -- */
.ftr{
  display:flex;align-items:center;justify-content:center;
  padding:12px 16px 14px;border-top:1px solid var(--ln2);
  position:relative;z-index:2;flex-shrink:0;
  background:linear-gradient(0deg, color-mix(in srgb, var(--cr) 6%, transparent) 0%,transparent 100%);
  animation:fadeUp .5s .4s ease both;
}
.ftr::before{content:'';position:absolute;top:-1px;left:16px;right:16px;height:1px;background:linear-gradient(90deg,transparent 0%,var(--cr) 40%,var(--cr) 60%,transparent 100%);opacity:.3;animation:borderGlow 3s ease infinite;}
.ftr-content{width:100%;display:flex;justify-content:space-between;align-items:center;}
.ftr-left{display:flex;flex-direction:column;gap:3px;}
.ftr-brand{font-size:9px;text-transform:uppercase;letter-spacing:.2em;color:var(--tx2);font-weight:600;}
.ftr-brand span{color:var(--cr2);font-weight:700;text-shadow:0 0 10px var(--crg);}
.ftr-brand a{color:inherit;text-decoration:none;transition:color 0.3s;}
.ftr-brand a:hover{color:var(--cr);}
.ftr-copy-row{display:flex;align-items:center;gap:10px;font-family:'Space Mono',monospace;font-size:8px;color:var(--tx3);letter-spacing:.05em;}
.ftr-div{color:var(--ln2);}
.ftr-ref-btn{background:none;border:none;color:var(--tx3);cursor:pointer;font-family:inherit;font-size:inherit;text-decoration:underline;transition:color 0.2s;}
.ftr-ref-btn:hover{color:var(--tx2);}
.ftr-socials{display:flex;gap:12px;align-items:center;}
.ftr-link{color:var(--tx3);transition:all .3s;}
.ftr-link:hover{color:var(--cr2);filter:drop-shadow(0 0 8px var(--crg));transform:translateY(-2px);}

@media (max-width: 800px) {
  .body { grid-template-columns: 1fr; display: flex; flex-direction: column; gap: 15px; padding: 12px; }
  .ggrid { grid-template-columns: repeat(2, 1fr); grid-template-rows: auto; gap: 8px; }
  .gbtn { min-height: 65px; }
  .hdr { 
    flex-direction: row; align-items: center; justify-content: space-between; 
    padding: 12px 15px; gap: 8px; 
    background: color-mix(in srgb, var(--bg0) 90%, transparent); 
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid color-mix(in srgb, var(--cr) 20%, transparent); 
    margin-bottom: 15px;
    position: sticky; top: 0; z-index: 1000;
  }
  .brand { align-items: center; flex-direction: row; gap: 8px; }
  .brand-tag, .brand-div, .rpill { display: none; }
  .brand-img { height: 32px; margin-bottom: 0; }
  .print-btn { font-size: 8px; padding: 6px 10px; margin: 0 !important; white-space: nowrap; gap: 4px; }
  .bot { flex-direction: column; align-items: stretch; gap: 15px; text-align: center; }
  .stats { justify-content: space-between; flex-wrap: wrap; width: 100%; padding: 0 5px; }
  .bot .badge { display: none; }
  .ftr-content { flex-direction: column; gap: 20px; text-align: center; }
  .ftr-left { align-items: center; }
  .ftr-copy-row { flex-direction: column; gap: 5px; }
  .ftr-div { display: none; }
  .gender-row { flex-wrap: wrap; }
  .exp-col { gap: 8px; }
  .ebtn { flex-wrap: wrap; }
  
  .mobile-sticky-result {
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 75px; z-index: 100;
    background: var(--bg1); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    border: 1px solid color-mix(in srgb, var(--cr) 30%, transparent);
    padding: 12px 24px; border-radius: 50px;
    margin: 0 12px 15px 12px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.5), inset 0 0 10px var(--crg);
  }
  .msr-val { font-size: 26px; font-weight: 700; color: var(--cr); font-family: 'Oswald', sans-serif; text-shadow: 0 0 10px var(--crg); }
  .msr-lbl { font-size: 13px; color: var(--tx); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; }
}

.print-btn{
  background:color-mix(in srgb, var(--cr) 8%, transparent);border:1px solid var(--ln);border-radius:8px;padding:6px 12px;
  color:var(--cr2);font-family:'Outfit',sans-serif;font-size:9px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;
  cursor:pointer;transition:all .3s;display:flex;align-items:center;gap:6px;
}
.print-btn:hover{
  background:color-mix(in srgb, var(--cr) 15%, transparent);border-color:var(--cr);box-shadow:0 0 10px var(--crg);transform:translateY(-1px);
}
@media print {
  .print-btn, .ftr-socials, .track input, .fixed { display: none !important; }
  body, .root { background: #050505 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; height: auto !important; min-height: auto !important; overflow: visible !important; }
  .panel { break-inside: avoid; border: 1px solid #333 !important; }
  .bot, .ftr { border-top: 1px solid #333 !important; }
}
`;

/* ══════════════════════════ MODULAR CALCULATION LOGIC ══════════════════════════ */
export function calculateProtein(params) {
  const { weight, age, unit, gender, goal, exp, act, GOALS, EXP } = params;

  // 1. Convert Weight
  const weightKg = unit === "kg" ? weight : weight * 0.453592;

  // 2. Age Adjustment
  const ageFactor = age > 60 ? 0.10 : age > 50 ? 0.05 : 0;

  // 3 & 4. Goal and Experience Lookups
  const G = GOALS.find(x => x.id === goal);
  const E = EXP.find(x => x.id === exp);

  const goalMultiplier = G ? G.mul[act] : 1.6;
  const experienceBoost = E ? E.boost : 0;

  // 5. Gender Factor
  const genderFactor = gender === "Female" ? -0.05 : gender === "Other" ? -0.025 : 0;

  // 6. Final Multiplier
  const finalMultiplier = goalMultiplier + experienceBoost + genderFactor + ageFactor;

  // 6. Core Metrics
  const proteinPerDay = Math.round(weightKg * finalMultiplier);
  const proteinPerMeal = Math.round(proteinPerDay / 4);
  const proteinCalories = Math.round(proteinPerDay * 4);

  // 7. Progress Percentage (bound = 2.5 per new spec)
  const progressPercentage = Math.min((proteinPerDay / (weightKg * 2.5)) * 100, 100);

  return {
    protein: proteinPerDay,
    perMeal: proteinPerMeal,
    calories: proteinCalories,
    pct: progressPercentage,
    mult: finalMultiplier
  };
}

/* ══════════════════════════ APP ══════════════════════════ */
export default function App() {
  const [weight, setWeight] = useState(75);
  const [age, setAge] = useState(26);
  const [unit, setUnit] = useState("kg");
  const [gender, setGender] = useState("Male");
  const [goal, setGoal] = useState("muscle");
  const [exp, setExp] = useState("beg");
  const [act, setAct] = useState("act");
  const [thumbW, setThumbW] = useState(false);
  const [thumbA, setThumbA] = useState(false);
  const [bumpKey, setBumpKey] = useState(0);
  const [ripples, setRipples] = useState([]);
  const [floats, setFloats] = useState([]);
  const [clicked, setClicked] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [theme, setTheme] = useState("dark");
  const [showRefs, setShowRefs] = useState(false);
  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const results = calculateProtein({ weight, age, unit, gender, goal, exp, act, GOALS, EXP });
  const { protein, perMeal, mult, pct } = results;

  const displayProtein = useAnimatedNumber(protein);
  const displayKcal = useAnimatedNumber(Math.round(protein * 4));

  useEffect(() => { setBumpKey(k => k + 1); }, [protein]);

  /* sliders */
  const wMin = unit === "kg" ? 30 : 66, wMax = unit === "kg" ? 200 : 440;
  const wPct = ((weight - wMin) / (wMax - wMin)) * 100;
  const aPct = ((age - 14) / (80 - 14)) * 100;

  const switchUnit = u => {
    if (u === unit) return;
    setUnit(u);
    setWeight(u === "lbs" ? Math.round(weight * 2.20462) : Math.round(weight / 2.20462));
  };

  const handleGoalClick = (gid, ev) => {
    setGoal(gid);
    setClicked(gid);
    setTimeout(() => setClicked(null), 450);

    const rect = ev.currentTarget.getBoundingClientRect();
    const rx = ev.clientX - rect.left - 30;
    const ry = ev.clientY - rect.top - 30;
    const rid = Date.now();
    setRipples(r => [...r, { id: rid, x: rx, y: ry, gid }]);
    setTimeout(() => setRipples(r => r.filter(x => x.id !== rid)), 700);
    const previewResults = calculateProtein({ weight, age, unit, gender, goal: gid, exp, act, GOALS, EXP });
    const preview = previewResults.protein;
    const fid = rid + 1;
    setFloats(f => [...f, { id: fid, x: ev.clientX - rect.left - 12, y: ry + 30, label: `${preview}g` }]);
    setTimeout(() => setFloats(f => f.filter(x => x.id !== fid)), 800);
  };

  const handleExportPDF = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      
      const themeBg = theme === 'dark' ? '#050507' : '#F0F4F8';
      const themeTx = theme === 'dark' ? '#FFFFFF' : '#0F172A';
      const themeTx2 = theme === 'dark' ? '#A0A5B5' : '#334155';
      const themeCr = theme === 'dark' ? '#00E5FF' : '#0099CC';

      doc.setFillColor(themeBg);
      doc.rect(0, 0, 210, 297, 'F');

      doc.setTextColor(themeCr);
      doc.setFontSize(28);
      doc.setFont('helvetica', 'bold');
      doc.text("Haleem FX", 20, 30);
      
      doc.setTextColor(themeTx2);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text("Precision Protein Calculator - Nutrition Report", 20, 40);

      doc.setDrawColor(themeCr);
      doc.setLineWidth(0.5);
      doc.line(20, 45, 190, 45);

      doc.setTextColor(themeCr);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text("User Profile", 20, 60);

      doc.setTextColor(themeTx);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Weight: ${weight} ${unit}`, 20, 70);
      doc.text(`Age: ${age} years`, 20, 80);
      doc.text(`Gender: ${gender}`, 20, 90);
      
      const gLabel = GOALS.find(g => g.id === goal)?.label || goal;
      const eLabel = EXP.find(e => e.id === exp)?.label || exp;
      const aLabel = ACT.find(a => a.id === act)?.label || act;
      
      doc.text(`Primary Goal: ${gLabel}`, 90, 70);
      doc.text(`Experience Level: ${eLabel}`, 90, 80);
      doc.text(`Activity Level: ${aLabel}`, 90, 90);

      doc.line(20, 100, 190, 100);

      doc.setTextColor(themeCr);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text("Target Macros", 20, 115);

      doc.setTextColor(themeTx);
      doc.setFontSize(36);
      doc.text(`${protein}g`, 20, 135);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(themeTx2);
      doc.text("Daily Protein Intake", 20, 145);

      doc.setTextColor(themeTx);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text(`${Math.round(protein * 4)}`, 100, 135);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(themeTx2);
      doc.text("KCAL", 100, 145);

      doc.setTextColor(themeTx);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text(`${perMeal}g`, 140, 135);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(themeTx2);
      doc.text("PER MEAL", 140, 145);
      
      doc.setTextColor(themeTx);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text(`${mult.toFixed(1)}x`, 175, 135);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(themeTx2);
      doc.text("MULTIPLIER", 175, 145);

      doc.setFontSize(10);
      doc.setTextColor(themeTx2);
      doc.text(`Generated on ${new Date().toLocaleDateString()} by Haleem FX | infygrid.in`, 20, 280);

      doc.save("HaleemFX-Protein-Plan.pdf");
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <>
      <style>{getCSS(theme)}</style>
      <PromoPopup />
      <ReferencePopup isOpen={showRefs} closePopup={() => setShowRefs(false)} />

      <div className="root">
        {/* Dynamic Mouse Glow */}
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', transition: 'opacity 0.3s',
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(176,16,24,0.06), transparent 50%)`
          }}
        />
        <div className="sl1" /><div className="sl2" />

        {/* -- HEADER -- */}
        <div className="hdr relative z-10">
          <div className="brand">
            <img
              src="/logo.png"
              alt="Haleem FX Logo"
              className="brand-img"
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
            />
            <div className="brand-name" style={{ display: 'none' }}><span>Haleem FX</span></div>
            <div className="brand-tag">Precision Protein Calculator</div>
          </div>
          <div style={{ flex: 1 }} />
          <button className="print-btn" onClick={toggleTheme} style={{ marginRight: '10px' }}>
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button className="print-btn" onClick={handleExportPDF}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            Export PDF
          </button>
          <div className="brand-div" style={{ margin: '0 15px' }} />
          <div className="rpill">
            <div className={`pnum${bumpKey > 1 ? " pop" : ""}`} key={bumpKey}>{displayProtein}</div>
            <div className="rmeta">
              <div className="rg">g / day</div>
              <div className="rmeal"><b>{perMeal}g</b> per meal · 4×</div>
              <div className="rmult">{mult.toFixed(2)}× / kg</div>
            </div>
          </div>
        </div>

        {/* -- MOBILE STICKY RESULT -- */}
        <div className="mobile-sticky-result">
          <div className="msr-lbl">PROTEIN OUTPUT</div>
          <div className={`msr-val${bumpKey > 1 ? " pop" : ""}`} key={bumpKey + 'm'}>{displayProtein}g</div>
        </div>

        {/* -- BODY -- */}
        <div className="body relative z-10">
          {/* P1 - Body Stats */}
          <div className="panel">
            <div className="ptitle">Body Stats</div>
            <div className="sl">
              <div className="sl-top">
                <span className="sl-name">Weight</span>
                <div className="sl-right">
                  <span className="sl-val">{weight}</span>
                  <div className="utog">
                    {["kg", "lbs"].map(u => (
                      <button key={u} className={`ubtn${unit === u ? " on" : ""}`} onClick={() => switchUnit(u)}>{u}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="track">
                <div className="tf" style={{ width: `${wPct}%` }} />
                <div className={`thumb${thumbW ? " active" : ""}`} style={{ left: `calc(${wPct}% - 7px)` }} />
                <input type="range" min={wMin} max={wMax} value={weight}
                  onChange={ev => { setWeight(+ev.target.value); setThumbW(true); setTimeout(() => setThumbW(false), 700); }} />
              </div>
            </div>
            <div className="sl" style={{ marginBottom: 0 }}>
              <div className="sl-top">
                <span className="sl-name">Age</span>
                <div className="sl-right">
                  <span className="sl-val">{age}</span>
                  <span className="sl-unit">yrs</span>
                </div>
              </div>
              <div className="track">
                <div className="tf" style={{ width: `${aPct}%` }} />
                <div className={`thumb${thumbA ? " active" : ""}`} style={{ left: `calc(${aPct}% - 7px)` }} />
                <input type="range" min={14} max={80} value={age}
                  onChange={ev => { setAge(+ev.target.value); setThumbA(true); setTimeout(() => setThumbA(false), 700); }} />
              </div>
            </div>
          </div>

          {/* P2 - Gender + Experience */}
          <div className="panel">
            <div className="ptitle">Gender</div>
            <div className="gender-row">
              {GENDERS.map(({ id, sym }) => (
                <button key={id} className={`gchip${gender === id ? " on" : ""}`} onClick={() => setGender(id)}>
                  <span className="gsym">{sym}</span>
                  <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.07em" }}>{id}</span>
                </button>
              ))}
            </div>
            <div className="ptitle">Experience</div>
            <div className="exp-col">
              {EXP.map(e => (
                <button key={e.id} className={`ebtn${exp === e.id ? " on" : ""}`} onClick={() => setExp(e.id)}>
                  <span className="edot" />
                  <span className="elabel">{e.label}</span>
                  <span className="eyears">{e.years}</span>
                </button>
              ))}
            </div>
          </div>

          {/* P3 - Goal */}
          <div className="panel">
            <div className="ptitle">Goal</div>
            <div className="ggrid">
              {GOALS.map(g => (
                <button
                  key={g.id}
                  className={`gbtn${goal === g.id ? " on" : ""}${clicked === g.id ? " just-clicked" : ""}`}
                  onClick={ev => handleGoalClick(g.id, ev)}
                >
                  {ripples.filter(r => r.gid === g.id).map(r => (
                    <span key={r.id} className="rpl" style={{ left: r.x, top: r.y }} />
                  ))}
                  {floats.map(f => (
                    <span key={f.id} className="flt" style={{ left: f.x, top: f.y }}>{f.label}</span>
                  ))}
                  <span className="gicon-wrap">
                    <GoalIcon id={g.id} size={28} active={goal === g.id} />
                  </span>
                  <span className="glbl">{g.label}</span>
                  <span className="gsub">{g.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* P4 - Activity */}
          <div className="panel">
            <div className="ptitle">Activity Level</div>
            <div className="act-col">
              {ACT.map(a => (
                <button key={a.id} className={`abtn${act === a.id ? " on" : ""}`} onClick={() => setAct(a.id)}>
                  <span className="adot" />
                  <span className="atext">
                    <span className="albl">{a.label}</span>
                    <span className="asub">{a.sub}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* -- BOTTOM HUD -- */}
        <div className="bot relative z-10">
          <div className="stats">
            <div className="stat"><div className="sv">{displayKcal}</div><div className="slbl">Kcal</div></div>
            <div className="sdiv" />
            <div className="stat"><div className="sv">{perMeal}</div><div className="slbl">g/meal</div></div>
            <div className="sdiv" />
            <div className="stat"><div className="sv">{mult.toFixed(1)}</div><div className="slbl">×/kg</div></div>
          </div>
          <div className="bar-area">
            <div className="btrk"><div className="bfill" style={{ width: `${pct}%` }} /></div>
            <div className="blbl">{pct.toFixed(0)}% of max evidence range</div>
          </div>
          <div className="badge">Haleem FX</div>
        </div>

        <Footer onOpenReferences={() => setShowRefs(true)} />
      </div>
    </>
  );
}
