import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, ArrowLeft, Phone } from 'lucide-react';
import IspDecisionTree from './IspDecisionTree';

export const WifiProvider = ({
  theme = 'light',
  onOpenCheatSheet,
}) => {
  const isNoc = theme === 'noc';
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    provider: '',
    issue: '',
    name: '',
    email: '',
    phone: '',
  });

  const providers = [
    { name: 'Xfinity', label: 'Xfinity (Comcast)', color: isNoc ? 'bg-purple-950/40 border-purple-500/30 text-purple-200' : 'bg-purple-50 text-purple-900 border-purple-200' },
    { name: 'AT&T', label: 'AT&T Fiber / DSL', color: isNoc ? 'bg-blue-950/40 border-blue-500/30 text-blue-200' : 'bg-blue-50 text-blue-900 border-blue-200' },
    { name: 'Spectrum', label: 'Spectrum (Charter)', color: isNoc ? 'bg-indigo-950/40 border-indigo-500/30 text-indigo-200' : 'bg-indigo-50 text-indigo-900 border-indigo-200' },
    { name: 'Verizon', label: 'Verizon Fios / 5G', color: isNoc ? 'bg-red-950/40 border-red-500/30 text-red-200' : 'bg-red-50 text-red-900 border-red-200' },
    { name: 'T-Mobile', label: 'T-Mobile Home Internet', color: isNoc ? 'bg-pink-950/40 border-pink-500/30 text-pink-200' : 'bg-pink-50 text-pink-900 border-pink-200' },
    { name: 'Universal', label: 'Universal Router / Other', color: isNoc ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-gray-50 text-gray-900 border-gray-200' },
  ];

  const issues = [
    'No internet connection at all (Offline LED / Red light)',
    'Very slow internet speeds & high ping',
    'Connection keeps dropping intermittently',
    'Can\'t connect to WiFi SSID / Authentication failed',
    'Weak signal & limited WiFi range in specific rooms',
    'Certain smart devices / consoles refuse to connect',
  ];

  const handleProviderSelect = (providerName) => {
    setSelections(prev => ({ ...prev, provider: providerName }));
    setStep(2);
  };

  const handleIssueSelect = (issueText) => {
    setSelections(prev => ({ ...prev, issue: issueText }));
    setStep(3);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(5);
  };

  const handleReset = () => {
    setStep(1);
    setSelections({
      provider: '',
      issue: '',
      name: '',
      email: '',
      phone: '',
    });
  };

  return (
    <div className={`rounded-2xl p-6 sm:p-8 border transition-all duration-200 ${
      isNoc
        ? 'bg-slate-950 border-slate-800 text-slate-100 shadow-xl'
        : 'bg-white border-gray-200 text-gray-900 shadow-xl'
    }`}>
      {/* Progress Bar */}
      {step < 5 && (
        <div className="mb-6">
          <div className="flex justify-between items-end mb-2 text-xs font-mono">
            <span className="font-bold text-slate-400 uppercase tracking-wider">
              {step === 1 && 'Step 1/4: Provider Identification'}
              {step === 2 && 'Step 2/4: Issue Classification'}
              {step === 3 && 'Step 3/4: Self-Healing Tree'}
              {step === 4 && 'Step 4/4: Support Escalation'}
            </span>
            <span className={`font-bold ${isNoc ? 'text-emerald-400' : 'text-blue-600'}`}>
              {Math.round((step / 4) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200/20 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                isNoc ? 'bg-emerald-500' : 'bg-blue-600'
              }`}
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* Step 1: Provider Selection */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-2xl font-black mb-2">Select Your Internet Provider</h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6 [text-wrap:pretty]">
              Loads physical and firmware diagnostics tailored to your specific hardware gateway.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {providers.map(p => (
                <button
                  key={p.name}
                  onClick={() => handleProviderSelect(p.name)}
                  className={`${p.color} p-4 rounded-xl border-2 hover:border-black dark:hover:border-emerald-400 transition-all duration-150 text-left font-bold text-sm sm:text-base hover:shadow-sm flex items-center justify-between group cursor-pointer`}
                >
                  <span>{p.label}</span>
                  <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Issue Selection */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => setStep(1)}
              className="text-xs font-mono text-slate-400 hover:text-white mb-4 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} /> Back to Providers
            </button>
            <h3 className="text-2xl font-black mb-2">What is the primary symptom?</h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Selected Provider: <span className="font-bold text-blue-500 dark:text-emerald-400">{selections.provider}</span>
            </p>
            <div className="space-y-2.5">
              {issues.map(issue => (
                <button
                  key={issue}
                  onClick={() => handleIssueSelect(issue)}
                  className={`w-full p-4 rounded-xl border text-left font-medium text-sm sm:text-base hover:shadow-sm flex items-center justify-between group transition-all cursor-pointer ${
                    isNoc
                      ? 'bg-slate-900 border-slate-800 hover:border-emerald-400 text-slate-100'
                      : 'bg-white border-gray-200 hover:border-black text-gray-900'
                  }`}
                >
                  <span>{issue}</span>
                  <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: ISP Decision Tree */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => setStep(2)}
              className="text-xs font-mono text-slate-400 hover:text-white mb-4 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} /> Back to Symptoms
            </button>

            <IspDecisionTree
              provider={selections.provider}
              theme={theme}
              onResolved={() => {}}
              onEscalate={() => {
                setStep(4);
              }}
            />
          </motion.div>
        )}

        {/* Step 4: Escalation Form */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => setStep(3)}
              className="text-xs font-mono text-slate-400 hover:text-white mb-4 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} /> Back to Decision Tree
            </button>
            <h3 className="text-2xl font-black mb-2">Escalate to Support Technician</h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6 [text-wrap:pretty]">
              Self-service checks completed. Request direct technician follow-up for remote line tests.
            </p>

            <div className={`p-4 rounded-xl border mb-6 text-xs font-mono space-y-1.5 ${
              isNoc
                ? 'bg-slate-900 border-cyan-500/30 text-cyan-200'
                : 'bg-blue-50 border-blue-200 text-blue-900'
            }`}>
              <div className="font-bold text-slate-400 uppercase tracking-wider text-xs">
                Diagnostic Dossier Summary
              </div>
              <div><span className="font-bold">Provider:</span> {selections.provider}</div>
              <div><span className="font-bold">Symptom:</span> {selections.issue}</div>
              <div><span className="font-bold">Status:</span> Self-Service Completed • Escalation Requested</div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-1">
                  Full Name
                </label>
                <input
                  required
                  value={selections.name}
                  onChange={e => setSelections({ ...selections, name: e.target.value })}
                  type="text"
                  className={`w-full rounded-xl px-4 py-3 border text-base sm:text-sm focus:outline-none transition-colors ${
                    isNoc
                      ? 'bg-slate-900 border-slate-700 text-white focus:border-emerald-400'
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-black'
                  }`}
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-1">
                  Email Address
                </label>
                <input
                  required
                  value={selections.email}
                  onChange={e => setSelections({ ...selections, email: e.target.value })}
                  type="email"
                  className={`w-full rounded-xl px-4 py-3 border text-base sm:text-sm focus:outline-none transition-colors ${
                    isNoc
                      ? 'bg-slate-900 border-slate-700 text-white focus:border-emerald-400'
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-black'
                  }`}
                  placeholder="jane@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-1">
                  Phone Number (Optional)
                </label>
                <input
                  value={selections.phone}
                  onChange={e => setSelections({ ...selections, phone: e.target.value })}
                  type="tel"
                  className={`w-full rounded-xl px-4 py-3 border text-base sm:text-sm focus:outline-none transition-colors ${
                    isNoc
                      ? 'bg-slate-900 border-slate-700 text-white focus:border-emerald-400'
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-black'
                  }`}
                  placeholder="(555) 234-5678"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-4 rounded-xl font-bold text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer ${
                  isNoc
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black'
                    : 'bg-black hover:bg-gray-800 text-white'
                }`}
              >
                Submit Dossier & Request Assistance
              </button>
            </form>
          </motion.div>
        )}

        {/* Step 5: Success Confirmation */}
        {step === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="text-center py-4"
          >
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <CheckCircle2 size={30} />
            </div>

            <h3 className="text-2xl font-black mb-2">Diagnostic Dossier Submitted</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6 [text-wrap:pretty]">
              Thank you, <span className="font-bold text-white dark:text-emerald-400">{selections.name}</span>. Your report for{' '}
              <span className="font-bold text-white dark:text-cyan-300">{selections.provider}</span> has been logged.
            </p>

            <div className="space-y-3 max-w-md mx-auto">
              <a
                href="tel:+18102583601"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Phone size={16} />
                <span>Call Network Support (24/7)</span>
              </a>

              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl text-xs font-mono font-bold tracking-wider text-slate-400 hover:text-white border border-slate-700 transition-colors"
              >
                Start New Diagnostic
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default WifiProvider;
