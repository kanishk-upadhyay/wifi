import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ExpertModal = () => {
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
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
                    aria-label="Close modal"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                {submitted ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
                        <p className="text-gray-600">A network specialist will review your details and reach out shortly.</p>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-6">
                            <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3">
                                Online Now
                            </div>
                            <h2 className="text-3xl font-black mb-2">Need Expert Help?</h2>
                            <p className="text-gray-600">Enter your details below and a network specialist will contact you immediately.</p>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-bold ml-1 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold ml-1 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold ml-1 mb-1">Phone Number <span className="text-gray-400 font-normal">(Optional)</span></label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors"
                                    placeholder="(555) 000-0000"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-black text-white font-bold py-4 rounded-xl text-lg hover:bg-gray-800 transition-all hover:shadow-lg transform hover:-translate-y-1 mt-2 cursor-pointer"
                            >
                                Get Instant Help
                            </button>
                            <p className="text-xs text-center text-gray-400 mt-4">
                                By submitting you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </form>
                    </>
                )}
            </motion.div>
        </div>
    )
}

export default ExpertModal
