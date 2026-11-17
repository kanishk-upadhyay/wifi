import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Wifi, Zap, RefreshCw, AlertTriangle, Terminal, ShieldCheck, Globe } from 'lucide-react';
import SpeedometerGauge from './SpeedometerGauge';
import { runDiagnosticsBurst, getTelemetry } from '../utils/networkDiagnostics';

export const NetworkDiagnosticsEngine = ({ theme = 'light', onCompleteTest }) => {
  const isNoc = theme === 'noc';
  const [telemetry, setTelemetry] = useState(getTelemetry());
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentPing, setCurrentPing] = useState(24);
  const [jitter, setJitter] = useState(4);
  const [packetLoss, setPacketLoss] = useState(0);
  const [logs, setLogs] = useState([
    'Diagnostics ready. Web API interfaces initialized.',
    'Telemetry listener registered for navigator.connection.',
  ]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const handleStatus = () => setTelemetry(getTelemetry());
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);
    return () => {
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
    };
  }, []);

  const handleRunTest = async () => {
    setIsRunning(true);
    setProgress(5);
    setLogs(['Probing edge CDN endpoints with rapid micro-bursts...']);

    try {
      const res = await runDiagnosticsBurst((pct, pingVal, logMsg) => {
        setProgress(pct);
        if (pingVal > 0) setCurrentPing(pingVal);
        setLogs(prev => [...prev.slice(-5), logMsg]);
      });

      setCurrentPing(res.ping);
      setJitter(res.jitter);
      setPacketLoss(res.packetLoss);
      setResult(res);
      if (onCompleteTest) onCompleteTest(res);
    } catch (err) {
      console.error(err);
      setLogs(prev => [...prev, 'Network probe timed out.']);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className={`rounded-2xl p-6 lg:p-8 transition-all duration-200 border ${
      isNoc
        ? 'bg-slate-950 border-slate-800 text-slate-100 shadow-xl'
        : 'bg-white border-gray-200 text-gray-900 shadow-xl'
    }`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200/20">
        <div>
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${telemetry.isOnline ? 'bg-emerald-500' : 'bg-red-500'}`} />
            <h2 className="text-xl lg:text-2xl font-black tracking-tight flex items-center gap-2">
              <Activity className={isNoc ? 'text-emerald-400' : 'text-blue-600'} size={22} />
              In-Browser Network Diagnostics Engine
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl [text-wrap:pretty]">
            Real-time HTTP timing, jitter variance analysis, and client connection stability metrics.
          </p>
        </div>

        <button
          onClick={handleRunTest}
          disabled={isRunning}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer ${
            isRunning
              ? 'bg-gray-500 text-white cursor-not-allowed opacity-75'
              : isNoc
              ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black'
              : 'bg-black hover:bg-gray-800 text-white'
          }`}
        >
          <RefreshCw size={15} className={isRunning ? 'animate-spin' : ''} />
          {isRunning ? 'Probing Network...' : 'Run Diagnostics Test'}
        </button>
      </div>

      {/* Progress Bar */}
      {isRunning && (
        <div className="w-full bg-gray-200/20 rounded-full h-1.5 mb-6 overflow-hidden">
          <motion.div
            className={`h-1.5 rounded-full ${isNoc ? 'bg-emerald-400' : 'bg-blue-600'}`}
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.2 }}
          />
        </div>
      )}

      {/* Layout: Speedometer on Left, Metrics & Log on Right */}
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Speedometer Gauge */}
        <div className="lg:col-span-5 flex justify-center">
          <SpeedometerGauge
            ping={currentPing}
            jitter={jitter}
            packetLoss={packetLoss}
            isTesting={isRunning}
            theme={theme}
          />
        </div>

        {/* Telemetry Metrics & Monospace Console (Flattened, no nested cards) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Flat 4-Column Metric Grid with High-Contrast Typography */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 font-mono">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase">
                <Wifi size={14} /> Link Status
              </div>
              <div className="text-sm font-bold text-emerald-400 mt-1">
                {telemetry.isOnline ? 'ONLINE' : 'OFFLINE'}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Type: {telemetry.effectiveType.toUpperCase()}
              </div>
            </div>

            <div className="border-l border-gray-200/20 pl-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase">
                <Zap size={14} /> Downlink Est.
              </div>
              <div className="text-sm font-bold text-cyan-400 mt-1">
                {telemetry.downlink ? `${telemetry.downlink} Mbps` : 'N/A'}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Web API link cap
              </div>
            </div>

            <div className="border-l border-gray-200/20 pl-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase">
                <Globe size={14} /> CDN Edge
              </div>
              <div className="text-sm font-bold text-indigo-400 mt-1">
                Anycast Multi-POP
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Cloudflare / Google
              </div>
            </div>

            <div className="border-l border-gray-200/20 pl-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase">
                <ShieldCheck size={14} /> Rating
              </div>
              <div className={`text-sm font-bold mt-1 ${
                result?.rating === 'CRITICAL' ? 'text-red-400' : 'text-emerald-400'
              }`}>
                {result ? result.rating : 'STABLE'}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Measured quality
              </div>
            </div>
          </div>

          {/* Diagnostic Evaluation Banner */}
          {result && (
            <div className={`p-4 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
              result.rating === 'CRITICAL' || result.rating === 'POOR'
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
            }`}>
              <AlertTriangle size={18} className="shrink-0 mt-0.5 text-amber-400" />
              <div>
                <span className="font-bold uppercase tracking-wider block mb-0.5">Diagnostic Evaluation:</span>
                {result.recommendation}
              </div>
            </div>
          )}

          {/* Monospace Micro-Probe Log Terminal */}
          <div className="p-4 font-mono text-xs bg-black/40 text-slate-300">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-800 text-xs text-slate-400 uppercase tracking-wider">
              <span className="flex items-center gap-1.5 font-bold">
                <Terminal size={14} className="text-emerald-400" />
                Network Micro-Probe Handshake Log
              </span>
              <span className="text-emerald-400 font-bold">READY</span>
            </div>
            <div className="space-y-1.5 h-20 overflow-y-auto scrollbar-thin">
              {logs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 select-none">›</span>
                  <span className={log.includes('BURST') ? 'text-cyan-300' : log.includes('COMPLETE') ? 'text-emerald-300 font-bold' : ''}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NetworkDiagnosticsEngine;
