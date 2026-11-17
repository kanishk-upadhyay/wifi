import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Activity } from 'lucide-react';

export const StatusGraphic = ({ theme = 'light' }) => {
  const isNoc = theme === 'noc';
  const [ping, setPing] = useState(24);
  const [ip, setIp] = useState('192.168.1.1');

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setIp(data.ip))
      .catch(() => setIp('192.168.1.1'));

    const interval = setInterval(() => {
      setPing(prev => (prev === 24 ? 28 : prev === 28 ? 22 : 24));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative w-full max-w-md aspect-square flex items-center justify-center select-none"
    >
      {/* Background Subtle Radar Arc */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`w-72 h-72 rounded-full border transition-all duration-700 ${
          isNoc ? 'border-emerald-500/20' : 'border-blue-400/20'
        }`} />
      </div>

      {/* Main Precision NOC Router Terminal Chassis */}
      <div className="relative z-10 w-80 sm:w-88 h-56">
        {/* Antennas */}
        <div className="absolute -top-12 left-16 w-3.5 h-24 bg-slate-800 rounded-full origin-bottom rotate-[-20deg]">
          <span className="absolute -top-1.5 left-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500" />
        </div>

        <div className="absolute -top-12 right-16 w-3.5 h-24 bg-slate-800 rounded-full origin-bottom rotate-[20deg]">
          <span className="absolute -top-1.5 left-0 right-0 w-3.5 h-3.5 rounded-full bg-cyan-500" />
        </div>

        {/* Router Chassis */}
        <div className={`w-full h-full rounded-2xl flex flex-col items-center justify-between p-6 border transition-all duration-200 ${
          isNoc
            ? 'bg-slate-950 border-slate-800 text-slate-100 shadow-lg'
            : 'bg-white border-gray-200 text-gray-900 shadow-lg'
        }`}>
          {/* LED Status Row with Full Accessible 12px Labels */}
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono font-bold text-slate-400">PWR</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono font-bold text-slate-400">WAN</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span className="text-xs font-mono font-bold text-slate-400">5G</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono font-bold text-slate-400">2.4G</span>
            </div>
          </div>

          {/* Central WiFi Graphic */}
          <div className="relative flex items-center justify-center my-2">
            <Wifi size={56} className={isNoc ? 'text-emerald-400' : 'text-blue-600'} />
          </div>

          {/* Device Signal & Ping Telemetry */}
          <div className="flex items-center justify-between w-full pt-3 border-t border-gray-200/20 text-xs font-mono">
            <div className="flex items-center gap-2">
              <Activity size={15} className="text-emerald-400" />
              <span className={isNoc ? 'text-slate-300' : 'text-gray-600'}>Latency:</span>
              <span className="font-bold text-emerald-400">{ping}ms</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className={isNoc ? 'text-slate-400' : 'text-gray-500'}>Gateway:</span>
              <span className={`font-semibold ${isNoc ? 'text-cyan-300' : 'text-gray-800'}`}>
                {ip}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default StatusGraphic;
