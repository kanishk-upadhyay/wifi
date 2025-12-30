import React, { useState, useEffect } from 'react'

const ExpertModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 1200); // Delay appearance
        return () => clearTimeout(timer);
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
                onClick={() => setIsOpen(false)}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-[slideUp_0.4s_ease-out]">
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                <div className="text-center mb-6">
                    <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3">
                        Online Now
                    </div>
                    <h2 className="text-3xl font-black mb-2">Need Expert Help?</h2>
                    <p className="text-gray-600">Enter your details below and a network specialist will contact you immediately.</p>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label className="block text-sm font-bold ml-1 mb-1">Full Name</label>
                        <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors" placeholder="John Doe" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold ml-1 mb-1">Email Address</label>
                        <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors" placeholder="john@example.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold ml-1 mb-1">Phone Number</label>
                        <input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors" placeholder="(555) 000-0000" />
                    </div>

                    <button className="w-full bg-black text-white font-bold py-4 rounded-xl text-lg hover:bg-gray-800 transition-all hover:shadow-lg transform hover:-translate-y-1 mt-2">
                        Get Instant Help
                    </button>
                    <p className="text-xs text-center text-gray-400 mt-4">
                        By submitting you agree to our Terms of Service and Privacy Policy.
                    </p>
                </form>
            </div>
        </div>
    )
}

export default ExpertModal
