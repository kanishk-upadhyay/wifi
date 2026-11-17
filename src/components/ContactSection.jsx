import React, { useState, useEffect } from 'react';

export const ContactSection = ({ theme = 'noc' }) => {
  const isNoc = theme === 'noc';
  const [attention, setAttention] = useState(false);

  useEffect(() => {
    const handleAttention = () => {
      setAttention(true);
      setTimeout(() => setAttention(false), 2000);
    };
    window.addEventListener('trigger-contact-attention', handleAttention);
    return () => window.removeEventListener('trigger-contact-attention', handleAttention);
  }, []);

  const openModal = () => {
    window.dispatchEvent(new Event('open-expert-modal'));
  };

  const scrollToStatus = () => {
    const el = document.getElementById('home');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="max-w-4xl mx-auto w-full my-16 px-4" id="contact-support-section">
      <div className={`rounded-2xl p-8 lg:p-12 text-center transition-all duration-200 shadow-xl border ${
        isNoc
          ? 'bg-slate-900 border-slate-800 text-white'
          : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <h2 className="text-2xl lg:text-3xl font-black mb-3">Still Need Assistance?</h2>
        <p className={`text-sm sm:text-base mb-8 max-w-lg mx-auto [text-wrap:pretty] ${
          isNoc ? 'text-slate-300' : 'text-slate-600'
        }`}>
          Our network engineering support desk is available 24/7 to run remote loop tests and schedule on-site technician dispatches.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={openModal}
            className={`px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wide transition-all shadow-md cursor-pointer ${
              isNoc
                ? 'bg-white text-black hover:bg-slate-100'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            Contact Network Support
          </button>
          <button
            onClick={scrollToStatus}
            className={`px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wide transition-all border cursor-pointer ${
              isNoc
                ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                : 'border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            View Real-Time Metrics
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
