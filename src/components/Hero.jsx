import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Wrench, ShieldAlert } from 'lucide-react';

export const Hero = ({ theme = 'light', onOpenCheatSheet }) => {
  const isNoc = theme === 'noc';

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="space-y-6 max-w-2xl"
    >
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] [text-wrap:balance]">
        Instant WiFi & ISP Network Diagnostics
      </h1>

      <p className={`text-base sm:text-lg leading-relaxed [text-wrap:pretty] ${
        isNoc ? 'text-slate-300' : 'text-gray-700'
      }`}>
        Diagnose high latency, jitter spikes, and packet loss directly in your browser. Access step-by-step resolution trees for Xfinity, AT&T, Spectrum, and Verizon, plus emergency 1-page offline reset runbooks.
      </p>

      {/* Hero Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          onClick={() => scrollTo('diagnostics-suite')}
          className={`px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md flex items-center gap-2 cursor-pointer ${
            isNoc
              ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black'
              : 'bg-black hover:bg-gray-800 text-white'
          }`}
        >
          <Activity size={18} />
          <span>Run Live Diagnostics</span>
        </button>

        <button
          onClick={() => scrollTo('troubleshoot-wizard')}
          className={`px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all border flex items-center gap-2 cursor-pointer ${
            isNoc
              ? 'bg-slate-900 hover:bg-slate-800 text-slate-100 border-slate-700'
              : 'bg-white hover:bg-gray-50 text-gray-900 border-gray-300'
          }`}
        >
          <Wrench size={17} />
          <span>Self-Healing Tree</span>
        </button>

        {onOpenCheatSheet && (
          <button
            onClick={onOpenCheatSheet}
            className={`px-5 py-3.5 rounded-xl font-bold text-sm transition-all border flex items-center gap-2 cursor-pointer ${
              isNoc
                ? 'bg-red-950/50 hover:bg-red-900/70 text-red-300 border-red-500/40'
                : 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200'
            }`}
          >
            <ShieldAlert size={17} />
            <span>Emergency Runbook</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};
export default Hero;
