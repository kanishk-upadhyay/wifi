import React from 'react';
import { motion } from 'framer-motion';

export const SpeedometerGauge = ({
  ping = 0,
  jitter = 0,
  packetLoss = 0,
  isTesting = false,
  theme = 'light',
}) => {
  const isNoc = theme === 'noc';

  // Map ping (0ms to 250ms+) to angle (-110 deg to +110 deg, total 220 deg range)
  const clampedPing = Math.min(Math.max(ping, 0), 250);
  const angle = -110 + (clampedPing / 250) * 220;

  // Rating color
  let statusColor = isNoc ? '#10b981' : '#16a34a';
  let statusText = 'OPTIMAL';
  if (ping > 150 || packetLoss > 15) {
    statusColor = isNoc ? '#ef4444' : '#dc2626';
    statusText = 'HIGH LATENCY';
  } else if (ping > 75 || jitter > 30) {
    statusColor = isNoc ? '#f59e0b' : '#d97706';
    statusText = 'MODERATE JITTER';
  } else if (ping > 35) {
    statusColor = isNoc ? '#06b6d4' : '#0284c7';
    statusText = 'GOOD';
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-sm">
      {/* SVG Radial Gauge */}
      <div className="relative w-64 h-48 flex items-center justify-center">
        <svg viewBox="0 0 200 150" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="35%" stopColor="#06b6d4" />
              <stop offset="70%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>

          {/* Background Arc */}
          <path
            d="M 29.5 84.3 A 75 75 0 1 1 170.5 84.3"
            fill="none"
            stroke={isNoc ? '#1e293b' : '#e2e8f0'}
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Meter Arc */}
          <path
            d="M 29.5 84.3 A 75 75 0 1 1 170.5 84.3"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            opacity={0.9}
          />

          {/* Dial Ticks with Accessible Size */}
          {[
            { val: '0ms', x: 28, y: 105 },
            { val: '50ms', x: 44, y: 48 },
            { val: '125ms', x: 92, y: 24 },
            { val: '200ms', x: 145, y: 48 },
            { val: '250ms', x: 162, y: 105 },
          ].map((t, idx) => (
            <text
              key={idx}
              x={t.x}
              y={t.y}
              fontSize="9"
              fontWeight="bold"
              fill={isNoc ? '#cbd5e1' : '#64748b'}
              fontFamily="monospace"
              textAnchor="middle"
            >
              {t.val}
            </text>
          ))}

          {/* Center Hub */}
          <circle cx="100" cy="110" r="8" fill={isNoc ? '#0f172a' : '#1e293b'} stroke={statusColor} strokeWidth="3" />

          {/* Animated Needle */}
          <motion.g
            animate={{ rotate: angle }}
            transition={{ type: 'spring', stiffness: 70, damping: 15 }}
            style={{ originX: '100px', originY: '110px' }}
          >
            <line
              x1="100"
              y1="110"
              x2="100"
              y2="42"
              stroke={statusColor}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx="100" cy="42" r="3" fill={statusColor} />
          </motion.g>
        </svg>

        {/* Live Digital Readout */}
        <div className="absolute bottom-1 flex flex-col items-center">
          <div className="flex items-baseline gap-1">
            <span className={`text-4xl font-black font-mono tracking-tight ${isNoc ? 'text-white' : 'text-gray-900'}`}>
              {ping > 0 ? ping : '--'}
            </span>
            <span className="text-xs font-bold font-mono text-slate-400">ms RTT</span>
          </div>
          <span
            className="text-xs font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded mt-0.5"
            style={{
              backgroundColor: `${statusColor}22`,
              color: statusColor,
              border: `1px solid ${statusColor}55`,
            }}
          >
            {isTesting ? 'MEASURING BURST...' : statusText}
          </span>
        </div>
      </div>

      {/* Metrics Row: Flattened, no nested cards */}
      <div className="grid grid-cols-2 gap-4 w-full mt-4 pt-3 border-t border-gray-200/20 text-center font-mono">
        <div>
          <div className="text-xs font-semibold text-slate-400 uppercase">Jitter Variance</div>
          <div className="text-base font-bold text-cyan-400 mt-0.5">±{jitter} ms</div>
        </div>
        <div className="border-l border-gray-200/20">
          <div className="text-xs font-semibold text-slate-400 uppercase">Packet Loss</div>
          <div className={`text-base font-bold mt-0.5 ${packetLoss > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
            {packetLoss}%
          </div>
        </div>
      </div>
    </div>
  );
};
export default SpeedometerGauge;
