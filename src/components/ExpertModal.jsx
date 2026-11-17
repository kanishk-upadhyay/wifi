import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExpertModal = ({ theme = 'noc' }) => {
    const isNoc = theme === 'noc';
    const [isOpen, setIsOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        const handleOpen = () => {
            setSubmitted(false);
            setIsOpen(true);
        };
        window.addEventListener('open-expert-modal', handleOpen);
        return () => window.removeEventListener('open-expert-modal', handleOpen);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setIsOpen(false);
            setSubmitted(false);
            setName('');
            setEmail('');
            setPhone('');
        }, 2200);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`relative rounded-3xl p-8 max-w-md w-full shadow-2xl border transition-all ${
                    isNoc
                        ? 'bg-slate-950 border-slate-800 text-slate-100'
                        : 'bg-white border-gray-200 text-gray-900'
                }`}
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className={`absolute top-4 right-4 transition-colors cursor-pointer ${
                        isNoc ? 'text-slate-400 hover:text-white' : 'text-gray-400 hover:text-black'
                    }`}
                    aria-label="Close modal"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                {submitted ? (
                    <div className="text-center py-8">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                            isNoc ? 'bg-emerald-500/20 text-emerald-400' : 'bg-green-100 text-green-600'
                        }`}>
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
                        <p className={`text-sm ${isNoc ? 'text-slate-300' : 'text-gray-600'}`}>
                            A network specialist will review your details and reach out shortly.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-6">
                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3 ${
                                isNoc
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                    : 'bg-green-100 text-green-700'
                            }`}>
                                Support Online
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black mb-2">Need Expert Help?</h2>
                            <p className={`text-sm ${isNoc ? 'text-slate-300' : 'text-gray-600'}`}>
                                Enter your details below and a network specialist will contact you immediately.
                            </p>
                        </div>

                        <form className="space-y-4 font-sans text-xs sm:text-sm" onSubmit={handleSubmit}>
                            <div>
                                <label className="block font-bold ml-1 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={`w-full rounded-xl px-4 py-3 outline-none transition-colors border ${
                                        isNoc
                                            ? 'bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-emerald-500'
                                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-black'
                                    }`}
                                    placeholder="Jane Smith"
                                />
                            </div>
                            <div>
                                <label className="block font-bold ml-1 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full rounded-xl px-4 py-3 outline-none transition-colors border ${
                                        isNoc
                                            ? 'bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-emerald-500'
                                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-black'
                                    }`}
                                    placeholder="jane@example.com"
                                />
                            </div>
                            <div>
                                <label className="block font-bold ml-1 mb-1">
                                    Phone Number <span className={isNoc ? 'text-slate-400 font-normal' : 'text-gray-400 font-normal'}>(Optional)</span>
                                </label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className={`w-full rounded-xl px-4 py-3 outline-none transition-colors border ${
                                        isNoc
                                            ? 'bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-emerald-500'
                                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-black'
                                    }`}
                                    placeholder="(555) 000-0000"
                                />
                            </div>

                            <button
                                type="submit"
                                className={`w-full font-bold py-3.5 rounded-xl text-sm sm:text-base transition-all shadow-lg cursor-pointer mt-2 ${
                                    isNoc
                                        ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                                        : 'bg-black text-white hover:bg-gray-800'
                                }`}
                            >
                                Dispatch Help Request
                            </button>
                            <p className={`text-xs text-center mt-3 ${isNoc ? 'text-slate-400' : 'text-gray-400'}`}>
                                Encrypted telemetry transmission under network privacy guidelines.
                            </p>
                        </form>
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default ExpertModal;
