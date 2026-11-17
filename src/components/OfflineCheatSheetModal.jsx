import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Printer, X, ShieldAlert, Cpu, Terminal, Radio } from 'lucide-react';

export const OfflineCheatSheetModal = ({ isOpen, onClose, theme = 'light' }) => {
  if (!isOpen) return null;
  const isNoc = theme === 'noc';

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`relative w-full max-w-3xl rounded-3xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto border shadow-2xl printable-protocol ${
            isNoc
              ? 'bg-slate-950 border-emerald-500/40 text-white'
              : 'bg-white border-gray-200 text-gray-900'
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-200/20 mb-6 print:border-black">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 print:border-black">
                  <ShieldAlert size={20} />
                </span>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-red-500 font-bold block">
                    EMERGENCY OFFLINE RUNBOOK • TIER-1 FIELD MANUAL
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                    WiFi & Network Offline Recovery Protocol
                  </h2>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 print:hidden">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-colors cursor-pointer"
              >
                <Printer size={15} />
                <span>Print 1-Page Field Guide</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Section 1: 60-Second Cold Boot Sequence */}
          <div className="mb-6">
            <h3 className="text-sm font-black font-mono uppercase tracking-wider text-emerald-500 mb-3 flex items-center gap-2">
              <Cpu size={16} /> 1. The Strict 60-Second Power Cycle Sequence
            </h3>
            <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-2 ${
              isNoc ? 'bg-slate-900/70 border-slate-800' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-start gap-2">
                <span className="font-mono font-bold text-emerald-400">01.</span>
                <span><strong>Unplug Everything:</strong> Disconnect power to your Modem/ONT AND your Wi-Fi Router.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono font-bold text-emerald-400">02.</span>
                <span><strong>Bleed Capacitors:</strong> Wait a full 60 seconds (do not rush; capacitors hold volatile cache memory for up to 45s).</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono font-bold text-emerald-400">03.</span>
                <span><strong>Boot Gateway First:</strong> Plug in the Modem/ONT ONLY. Wait 2 to 3 minutes until the "Online" or "Broadband" LED is solid.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono font-bold text-emerald-400">04.</span>
                <span><strong>Boot Router Second:</strong> Plug in your Wi-Fi router. Allow 90 seconds for DHCP allocation to client devices.</span>
              </div>
            </div>
          </div>

          {/* Section 2: Router LED Quick Decoder */}
          <div className="mb-6">
            <h3 className="text-sm font-black font-mono uppercase tracking-wider text-cyan-500 mb-3 flex items-center gap-2">
              <Radio size={16} /> 2. Router Diagnostic LED Decoder
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className={`border-b ${isNoc ? 'border-slate-800 text-gray-400' : 'border-gray-200 text-gray-600'}`}>
                    <th className="py-2 px-3 font-mono font-bold">LED ICON</th>
                    <th className="py-2 px-3 font-mono font-bold">SOLID COLOR</th>
                    <th className="py-2 px-3 font-mono font-bold">BLINKING</th>
                    <th className="py-2 px-3 font-mono font-bold">RED / OFF</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/10 font-mono">
                  <tr>
                    <td className="py-2 px-3 font-bold text-emerald-400">POWER</td>
                    <td className="py-2 px-3">System Healthy</td>
                    <td className="py-2 px-3">Firmware Updating (Do NOT unplug)</td>
                    <td className="py-2 px-3 text-red-400">Power brick failure / Surge</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-cyan-400">INTERNET / WAN</td>
                    <td className="py-2 px-3">Sync Locked (Online)</td>
                    <td className="py-2 px-3">Active Data Transmission</td>
                    <td className="py-2 px-3 text-red-400">No ISP carrier / Coax cut</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-amber-400">2.4G / 5G WIFI</td>
                    <td className="py-2 px-3">SSID Broadcasting</td>
                    <td className="py-2 px-3">Traffic exchanging with clients</td>
                    <td className="py-2 px-3 text-red-400">Radio module disabled</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Emergency Client Terminal Commands */}
          <div className="mb-6">
            <h3 className="text-sm font-black font-mono uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-2">
              <Terminal size={16} /> 3. One-Click Emergency Terminal Commands
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className={`p-3 rounded-xl border ${
                isNoc ? 'bg-black/60 border-slate-800' : 'bg-gray-100 border-gray-200'
              }`}>
                <div className="font-bold text-blue-400 mb-1">Windows (PowerShell / CMD)</div>
                <pre className="font-mono text-[11px] text-gray-300 overflow-x-auto whitespace-pre-wrap select-all">
                  ipconfig /release{'\n'}ipconfig /renew{'\n'}ipconfig /flushdns{'\n'}netsh winsock reset
                </pre>
              </div>

              <div className={`p-3 rounded-xl border ${
                isNoc ? 'bg-black/60 border-slate-800' : 'bg-gray-100 border-gray-200'
              }`}>
                <div className="font-bold text-purple-400 mb-1">macOS (Terminal)</div>
                <pre className="font-mono text-[11px] text-gray-300 overflow-x-auto whitespace-pre-wrap select-all">
                  sudo dscacheutil -flushcache{'\n'}sudo killall -HUP mDNSResponder{'\n'}networksetup -setdnsservers Wi-Fi 1.1.1.1 8.8.8.8
                </pre>
              </div>
            </div>
          </div>

          {/* Section 4: Universal Gateway & DNS Directory */}
          <div className={`p-3.5 rounded-2xl border text-xs flex flex-wrap items-center justify-between gap-4 font-mono ${
            isNoc ? 'bg-slate-900/50 border-slate-800 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-800'
          }`}>
            <div>
              <span className="text-[10px] text-gray-500 uppercase block">Standard Admin IP:</span>
              <span className="font-bold text-emerald-400">192.168.1.1 / 192.168.0.1 / 10.0.0.1</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase block">Anycast Fast DNS:</span>
              <span className="font-bold text-cyan-400">1.1.1.1 (Cloudflare) • 8.8.8.8 (Google)</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase block">Security / Malware Block:</span>
              <span className="font-bold text-purple-400">9.9.9.9 (Quad9)</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default OfflineCheatSheetModal;
