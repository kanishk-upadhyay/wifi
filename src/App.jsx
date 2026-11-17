import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import NocTicker from './components/NocTicker';
import Hero from './components/Hero';
import StatusGraphic from './components/StatusGraphic';
import NetworkDiagnosticsEngine from './components/NetworkDiagnosticsEngine';
import WifiProvider from './components/WifiProvider';
import HelpAccordion from './components/HelpAccordion';
import Section from './components/Section';
import ContactSection from './components/ContactSection';
import ExpertModal from './components/ExpertModal';
import OfflineCheatSheetModal from './components/OfflineCheatSheetModal';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('wifi_theme') || 'noc';
  });
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('wifi_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'noc' ? 'light' : 'noc'));
  };

  const isNoc = theme === 'noc';

  return (
    <div className={`min-h-screen relative overflow-x-hidden font-sans transition-colors duration-200 ${
      isNoc
        ? 'bg-[#080d1a] text-slate-100 selection:bg-emerald-500 selection:text-black'
        : 'bg-slate-50 text-slate-900 selection:bg-black selection:text-white'
    }`}>
      {/* Background Precision Grid Lines */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className={`w-full h-full opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]`} />
      </div>

      {/* Top Sticky Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
      />

      {/* Auto-Scrolling Marquee Status Bar */}
      <NocTicker theme={theme} />

      <main className="relative z-10">
        {/* Hero Section */}
        <Section id="home" className="!py-10 lg:!py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Hero theme={theme} onOpenCheatSheet={() => setIsCheatSheetOpen(true)} />
            <div className="flex justify-center lg:justify-end">
              <StatusGraphic theme={theme} />
            </div>
          </div>
        </Section>

        {/* Live Diagnostics Suite */}
        <Section id="diagnostics-suite" className="!min-h-0 !py-8 lg:!py-12">
          <div className="max-w-6xl mx-auto w-full">
            <NetworkDiagnosticsEngine theme={theme} />
          </div>
        </Section>

        {/* ISP Decision Tree & Wizard */}
        <Section id="troubleshoot-wizard" className="!min-h-0 !py-8 lg:!py-12">
          <div className="max-w-3xl mx-auto w-full">
            <WifiProvider theme={theme} onOpenCheatSheet={() => setIsCheatSheetOpen(true)} />
          </div>
        </Section>

        {/* Support Knowledgebase FAQ */}
        <Section id="help" className="!min-h-0 !py-8 lg:!py-12">
          <div className="max-w-6xl mx-auto w-full">
            <HelpAccordion theme={theme} />
          </div>
        </Section>

        {/* Contact Support */}
        <ContactSection theme={theme} />
      </main>

      {/* Modals */}
      <ExpertModal theme={theme} />
      <OfflineCheatSheetModal
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
        theme={theme}
      />
    </div>
  );
}

export default App;
