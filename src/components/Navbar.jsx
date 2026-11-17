import React from 'react';
import { Wifi, Activity, Moon, Sun, ShieldAlert } from 'lucide-react';

export const Navbar = ({
  theme = 'light',
  onToggleTheme,
  onOpenCheatSheet,
}) => {
  const isNoc = theme === 'noc';

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-200 ${
      isNoc
        ? 'bg-slate-950/90 border-slate-800 text-slate-100'
        : 'bg-white/90 border-gray-200 text-gray-900 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('home')}>
          <div className={`p-2 rounded-xl flex items-center justify-center ${
            isNoc
              ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
              : 'bg-black text-white'
          }`}>
            <Wifi size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-base sm:text-lg tracking-tight">WIFI WIZARD</span>
              {isNoc && (
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                  NOC TERMINAL
                </span>
              )}
            </div>
            <span className="text-xs font-mono text-slate-400 block leading-tight">
              Network Inspector v2.0
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold tracking-wide uppercase">
          <button
            onClick={() => scrollTo('diagnostics-suite')}
            className="hover:text-blue-500 dark:hover:text-emerald-400 transition-colors cursor-pointer text-slate-300"
          >
            Live Diagnostics
          </button>
          <button
            onClick={() => scrollTo('troubleshoot-wizard')}
            className="hover:text-blue-500 dark:hover:text-emerald-400 transition-colors cursor-pointer text-slate-300"
          >
            ISP Decision Tree
          </button>
          <button
            onClick={() => scrollTo('help')}
            className="hover:text-blue-500 dark:hover:text-emerald-400 transition-colors cursor-pointer text-slate-300"
          >
            Runbooks & FAQs
          </button>
        </nav>

        {/* Actions: Runbook + Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenCheatSheet}
            className={`flex items-center gap-1.5 px-3 py-2 min-h-[36px] rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              isNoc
                ? 'bg-red-950/40 border-red-500/40 text-red-300 hover:bg-red-900/60'
                : 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'
            }`}
          >
            <ShieldAlert size={15} />
            <span className="hidden sm:inline">Offline Runbook</span>
            <span className="sm:hidden">Runbook</span>
          </button>

          <button
            onClick={onToggleTheme}
            title={isNoc ? 'Switch to Modern Expressive Theme' : 'Switch to NOC Operations Center Theme'}
            className={`flex items-center gap-1.5 px-3 py-2 min-h-[36px] rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              isNoc
                ? 'bg-slate-900 border-slate-700 text-yellow-400 hover:border-yellow-400/50'
                : 'bg-gray-100 border-gray-200 text-slate-800 hover:bg-gray-200'
            }`}
          >
            {isNoc ? <Sun size={15} /> : <Moon size={15} />}
            <span className="hidden sm:inline">{isNoc ? 'Light Mode' : 'NOC Mode'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
