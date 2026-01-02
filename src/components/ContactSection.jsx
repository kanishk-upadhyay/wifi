import React, { useState, useEffect } from 'react'

const ContactSection = () => {
    const [attention, setAttention] = useState(false);

    useEffect(() => {
        const handleAttention = () => {
            setAttention(true);
            setTimeout(() => setAttention(false), 2000);
        };
        window.addEventListener('trigger-contact-attention', handleAttention);
        return () => window.removeEventListener('trigger-contact-attention', handleAttention);
    }, []);

    return (
        <div className="max-w-4xl mx-auto w-full mt-12 mb-20 px-4" id="contact-support-section">
            <div className="bg-gray-900 rounded-3xl p-8 lg:p-12 text-center text-white shadow-2xl">
                <h5 className="text-2xl lg:text-3xl font-black mb-4">Still need help?</h5>
                <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
                    Our network experts are standing by to assist you with advanced diagnostics and repairs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className={`bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg w-full sm:w-auto ${attention ? 'animate-pulse' : ''}`}>
                        Contact Support
                    </button>
                    <button className="bg-transparent border-2 border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors w-full sm:w-auto">
                        View System Status
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ContactSection
