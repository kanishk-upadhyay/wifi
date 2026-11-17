import React from 'react';

export const NocTicker = ({ theme = 'light' }) => {
  const isNoc = theme === 'noc';

  const tickerItems = [
    { label: 'Cloudflare Edge CDN', status: '12ms • Operational', state: 'good' },
    { label: 'Google Anycast DNS 8.8.8.8', status: '100% Reachable', state: 'good' },
    { label: 'AWS Transit Gateway (us-east-1)', status: 'Nominal Routing', state: 'good' },
    { label: 'Fastly Global POPs', status: '14ms Avg RTT', state: 'good' },
    { label: 'Tier-1 Transatlantic Fiber Trunks', status: '99.998% Uptime', state: 'good' },
    { label: 'Xfinity Regional Node Maintenance', status: 'Resolved • Channels Bonded', state: 'warning' },
    { label: 'AT&T Central OLT Fiber Links', status: 'Optical Sync Locked', state: 'good' },
    { label: 'Global BGP Routing Table', status: 'Zero Route Leaks Detected', state: 'good' },
  ];

  return (
    <div className={`w-full overflow-hidden border-y py-2 text-xs font-mono transition-colors duration-200 ${
      isNoc
        ? 'bg-black/90 border-slate-800 text-slate-200'
        : 'bg-slate-900 border-slate-800 text-slate-200'
    }`}>
      <div className="flex items-center">
        {/* Fixed Lead Badge */}
        <div className={`flex items-center gap-2 px-3 py-1 shrink-0 font-bold uppercase tracking-wider text-xs z-10 border-r ${
          isNoc ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40' : 'bg-blue-900 text-blue-200 border-slate-700'
        }`}>
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>NOC PULSE</span>
        </div>

        {/* Infinite Auto-Scrolling Marquee Track */}
        <div className="relative flex overflow-x-hidden w-full group">
          <div className="flex shrink-0 animate-marquee whitespace-nowrap items-center group-hover:[animation-play-state:paused]">
            {tickerItems.concat(tickerItems).map((item, idx) => (
              <div key={idx} className="inline-flex items-center mx-5 space-x-2">
                <span className={`w-1.5 h-1.5 rounded-full ${
                  item.state === 'good' ? 'bg-emerald-400' : 'bg-amber-400'
                }`} />
                <span className="font-bold opacity-90">{item.label}:</span>
                <span className={item.state === 'good' ? 'text-emerald-400 font-semibold' : 'text-amber-300 font-semibold'}>
                  {item.status}
                </span>
                <span className="opacity-30 pl-3">|</span>
              </div>
            ))}
          </div>

          <div className="flex shrink-0 animate-marquee2 whitespace-nowrap items-center group-hover:[animation-play-state:paused]" aria-hidden="true">
            {tickerItems.concat(tickerItems).map((item, idx) => (
              <div key={`dup-${idx}`} className="inline-flex items-center mx-5 space-x-2">
                <span className={`w-1.5 h-1.5 rounded-full ${
                  item.state === 'good' ? 'bg-emerald-400' : 'bg-amber-400'
                }`} />
                <span className="font-bold opacity-90">{item.label}:</span>
                <span className={item.state === 'good' ? 'text-emerald-400 font-semibold' : 'text-amber-300 font-semibold'}>
                  {item.status}
                </span>
                <span className="opacity-30 pl-3">|</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default NocTicker;
