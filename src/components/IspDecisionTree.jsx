import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, AlertCircle, Wrench, Sparkles } from 'lucide-react';

const ISP_TREES = {
  Xfinity: [
    {
      id: 'xf-1',
      title: 'Inspect Xfinity Gateway Top LED Status',
      badge: 'XB6 / XB7 / XB8 Status Check',
      instruction:
        'Look at the top LED indicator on your xFi Gateway. If it is blinking orange, the modem is attempting downstream channel bonding. If blinking green, upstream registration has stalled.',
      actionSnippet: 'Solid White = Online | Blinking Orange = Downstream Lock | Red = No Coax Signal',
      visualTip: 'If blinking orange for >15 minutes, power cycle by pulling the power cord for 45 seconds.',
    },
    {
      id: 'xf-2',
      title: 'Separate 2.4 GHz & 5 GHz WiFi SSIDs',
      badge: 'Band Steering Resolution',
      instruction:
        'Xfinity Gateways merge 2.4GHz and 5GHz into one SSID by default. Older devices and smart home gear frequently disconnect during automated band steering.',
      actionSnippet: 'Open Xfinity App › Connect › View / Edit WiFi › Check "Split 2.4 and 5 GHz bands"',
      visualTip: 'Name the 5GHz network with a "_5G" suffix so high-performance devices stay locked to high speed.',
    },
    {
      id: 'xf-3',
      title: 'Inspect Coaxial Splitter & MoCA Filter',
      badge: 'RF Signal Ingress',
      instruction:
        'Verify that all coaxial connections are finger-tight. Ensure you are using a bi-directional MoCA PoE filter rated 5-1002 MHz or higher. Loose connectors leak RF ingress.',
      actionSnippet: 'Torque check: Hand-tighten all coaxial fittings plus 1/8 turn with wrench',
      visualTip: 'Bypass any unused splitters by connecting the incoming drop coax directly to the gateway.',
    },
  ],
  'AT&T': [
    {
      id: 'att-1',
      title: 'Check BGW320 / BGW210 Broadband Light',
      badge: 'Optical Fiber Signal',
      instruction:
        'Examine the Broadband LED on your AT&T Gateway. Solid Green indicates normal sync with the central office OLT. Blinking Red indicates optical signal loss (broken patch cable or fiber line cut).',
      actionSnippet: 'Broadband Solid Green = Sync OK | Slow Red Blink = Loss of Signal (LOS)',
      visualTip: 'Do not bend the green SFP fiber cable at sharp 90-degree angles; fiber requires a minimum bend radius.',
    },
    {
      id: 'att-2',
      title: 'Two-Stage ONT & Gateway Reset Sequence',
      badge: 'Power Sequence',
      instruction:
        'If you have an external white Nokia/010 ONT on the wall, it must be powered up and locked before the gateway is turned on.',
      actionSnippet: '1. Unplug Gateway & ONT › 2. Plug in ONT › Wait 2 min for PON light › 3. Plug in Gateway',
      visualTip: 'Ensure the PON (Passive Optical Network) LED turns solid green before booting the BGW gateway.',
    },
    {
      id: 'att-3',
      title: 'Disable Packet Filters & Active Armor Conflicts',
      badge: 'Gateway Security Overhaul',
      instruction:
        'AT&T ActiveArmor security occasionally flags benign UDP packets from game servers or Zoom calls, causing severe packet loss.',
      actionSnippet: 'Navigate to 192.168.1.254 › Firewall › Advanced › Toggle Packet Filters OFF',
      visualTip: 'Use Access Code printed on the side sticker of your gateway to save settings.',
    },
  ],
  Spectrum: [
    {
      id: 'spec-1',
      title: 'Modem vs Router Synchronized Boot Order',
      badge: 'DOCSIS 3.1 Provisioning',
      instruction:
        'Spectrum provides a standalone modem (EU2251/E31N2V1) and a standalone Wave 2/Wi-Fi 6 router. They must boot in strict chronological order to negotiate IP handshakes.',
      actionSnippet: 'Unplug both › Plug in Modem only › Wait until "Online" LED turns Solid Blue › Plug in Router',
      visualTip: 'If the Online LED remains flashing Blue & White, the CMTS is unable to lock frequencies in your neighborhood.',
    },
    {
      id: 'spec-2',
      title: 'Clear Spectrum DNS Hijacking',
      badge: 'DNS Configuration',
      instruction:
        'Spectrum default DNS servers frequently cause timeouts on modern content delivery networks. Override with Anycast DNS.',
      actionSnippet: 'Primary DNS: 1.1.1.1 (Cloudflare) | Secondary DNS: 8.8.8.8 (Google)',
      visualTip: 'Flush local resolver cache after setting: macOS `sudo killall -HUP mDNSResponder` | Windows `ipconfig /flushdns`',
    },
  ],
  Verizon: [
    {
      id: 'vz-1',
      title: 'Inspect Fios ONT Enclosure Indicator Lamps',
      badge: 'Fios Optical Terminal',
      instruction:
        'Locate the Verizon Fios ONT (often in basement, garage, or utility closet). Check the diagnostic LEDs:',
      actionSnippet: 'FAIL LED Red = Physical fiber cut | MoCA Green = Gateway communicating | DATA Green = Traffic',
      visualTip: 'If FAIL LED is lit red, no amount of router resetting will help—an outdoor line technician is required.',
    },
    {
      id: 'vz-2',
      title: 'G3100 / CR1000A Ring Status Indicator',
      badge: 'Router Ring Diagnostic',
      instruction:
        'The circular front LED tells the state: Solid White = Normal; Fast Yellow Blink = Pairing WPS; Slow Yellow Blink = Soft disconnection; Solid Red = Internet unavailable.',
      actionSnippet: 'Press & hold the reset pinhole on the back for 10 seconds to restore factory firmware',
      visualTip: 'Ensure the Ethernet cable from the ONT WAN port is clicked firmly into the yellow/white WAN port.',
    },
  ],
  'T-Mobile': [
    {
      id: 'tm-1',
      title: 'Optimize 5G Gateway Antenna Orientation',
      badge: 'Cellular Metric Tuning',
      instruction:
        'T-Mobile 5G home gateways rely on cellular mid-band (Ultra Capacity n41). Rotate the gateway in 45-degree increments to find the strongest RSRP signal.',
      actionSnippet: 'Target Metrics in T-Mobile App: RSRP > -90 dBm | SINR > 10 dB | 4 or 5 Signal Bars',
      visualTip: 'Place on an upper floor near an exterior window with minimal metallic tinting or tree cover.',
    },
    {
      id: 'tm-2',
      title: 'Switch to Manual 5GHz 80MHz Channel Width',
      badge: 'WiFi Throughput Tuning',
      instruction:
        'Avoid 160MHz channel width in crowded apartment complexes. 80MHz provides double the stability with near-zero radar DFS dropouts.',
      actionSnippet: 'Set 5GHz Channel to 48 or 149 with 80MHz bandwidth',
      visualTip: 'Prevents smart TVs from disconnecting whenever weather radar sweeps nearby.',
    },
  ],
  Universal: [
    {
      id: 'gen-1',
      title: 'The 60-Second Capacitor Bleed Power Cycle',
      badge: 'Hardware Reset Standard',
      instruction:
        'A quick 5-second unplug does not drain the volatile capacitors inside your router. Follow the 60-second rule for a clean cold boot.',
      actionSnippet: 'Unplug power › Wait 60 full seconds › Plug back in › Allow 3 full minutes to negotiate IP lease',
      visualTip: 'While waiting, unplug and reseat both ends of the Ethernet cables connecting your modem to router.',
    },
    {
      id: 'gen-2',
      title: 'Flush Local Operating System DNS & Renew DHCP',
      badge: 'Client Resolution',
      instruction:
        'Often your home router has an active connection, but your laptop or phone holds an expired DNS lease or stale subnet route.',
      actionSnippet: 'Windows: ipconfig /flushdns && ipconfig /renew | macOS: sudo dscacheutil -flushcache',
      visualTip: 'Toggle Airplane mode on your mobile device for 10 seconds to drop stale broadcast caches.',
    },
  ],
};

export const IspDecisionTree = ({
  provider = 'Universal',
  theme = 'light',
  onResolved,
  onEscalate,
}) => {
  const isNoc = theme === 'noc';
  const steps = ISP_TREES[provider] || ISP_TREES.Universal;
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isResolved, setIsResolved] = useState(false);

  const step = steps[currentStepIdx];
  const isLastStep = currentStepIdx === steps.length - 1;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStepIdx(prev => prev + 1);
    } else if (onEscalate) {
      onEscalate();
    }
  };

  const handleSuccess = () => {
    setIsResolved(true);
    if (onResolved) onResolved();
  };

  return (
    <div className={`rounded-2xl p-6 lg:p-8 border transition-all duration-200 ${
      isNoc
        ? 'bg-slate-950 border-slate-800 text-slate-100 shadow-xl'
        : 'bg-white border-gray-200 text-gray-900 shadow-xl'
    }`}>
      {/* Branch Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200/20">
        <div>
          <h3 className="text-xl lg:text-2xl font-black">
            {provider || 'Universal'} Resolution Guide
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Step-by-step physical and firmware verification to restore connectivity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {steps.map((s, idx) => (
            <div
              key={s.id}
              className={`h-2 rounded-full transition-all duration-200 ${
                idx === currentStepIdx
                  ? isNoc
                    ? 'w-8 bg-cyan-400'
                    : 'w-8 bg-blue-600'
                  : idx < currentStepIdx
                  ? 'w-2 bg-emerald-500'
                  : 'w-2 bg-gray-300 dark:bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isResolved ? (
          <motion.div
            key="resolved"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-md">
              <Sparkles size={30} />
            </div>
            <h4 className="text-2xl font-black">Connection Restored</h4>
            <p className="text-sm text-slate-300 max-w-md mx-auto [text-wrap:pretty]">
              Your {provider} parameters are stabilized. Re-run the diagnostic engine above to verify current latency and jitter.
            </p>
            <button
              onClick={() => {
                setIsResolved(false);
                setCurrentStepIdx(0);
              }}
              className="px-6 py-2.5 rounded-xl text-xs font-bold font-mono tracking-wider bg-slate-800 text-slate-200 hover:text-white border border-slate-700 transition-colors"
            >
              Restart Diagnostic Sequence
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
          >
            <div>
              <div className="text-xs font-mono font-bold text-cyan-400 mb-1">
                Step {currentStepIdx + 1} of {steps.length}: {step.badge}
              </div>
              <h4 className="text-lg lg:text-xl font-bold mb-2">{step.title}</h4>
              <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">
                {step.instruction}
              </p>
            </div>

            {/* Code / Command Snippet */}
            {step.actionSnippet && (
              <div className={`p-4 rounded-xl border font-mono text-xs ${
                isNoc
                  ? 'bg-black/60 border-cyan-500/30 text-cyan-200'
                  : 'bg-blue-50 border-blue-200 text-blue-900'
              }`}>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">
                  Required Action:
                </div>
                {step.actionSnippet}
              </div>
            )}

            {/* Visual Tip */}
            <div className="flex items-start gap-2.5 text-xs text-amber-300 bg-amber-500/10 p-3.5 rounded-xl border border-amber-500/30">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-amber-400" />
              <span><strong>Hardware Inspection Note:</strong> {step.visualTip}</span>
            </div>

            {/* Action Buttons */}
            <div className="grid sm:grid-cols-2 gap-3 pt-4 border-t border-gray-200/20">
              <button
                onClick={handleSuccess}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all cursor-pointer"
              >
                <CheckCircle2 size={16} />
                This Fixed My Problem
              </button>

              <button
                onClick={handleNext}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider border transition-all cursor-pointer ${
                  isNoc
                    ? 'bg-slate-900 hover:bg-slate-800 text-white border-slate-700'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300'
                }`}
              >
                <span>{isLastStep ? 'Escalate to Support Form' : 'Still Broken — Next Step'}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default IspDecisionTree;
