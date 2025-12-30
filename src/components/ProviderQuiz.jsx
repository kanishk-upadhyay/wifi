import React, { useState } from 'react'

const ProviderQuiz = () => {
    const [step, setStep] = useState(1);
    const [selections, setSelections] = useState({
        provider: '',
        issue: '',
        name: '',
        email: '',
        phone: ''
    });

    const providers = [
        { name: 'Verizon', color: 'bg-red-50' },
        { name: 'AT&T', color: 'bg-blue-50' },
        { name: 'T-Mobile', color: 'bg-pink-50' },
        { name: 'Xfinity', color: 'bg-purple-50' },
        { name: 'Spectrum', color: 'bg-indigo-50' },
        { name: 'Other Provider', color: 'bg-gray-50' }
    ];

    const issues = [
        "No internet connection at all",
        "Very slow internet speeds",
        "Connection keeps dropping",
        "Can't connect to WiFi network",
        "Weak signal / limited range",
        "Specific devices won't connect"
    ];

    const handleProviderSelect = (providerName) => {
        setSelections(prev => ({ ...prev, provider: providerName }));
        setStep(2);
    };

    const handleIssueSelect = (issue) => {
        setSelections(prev => ({ ...prev, issue: issue }));
        setStep(3);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep(4);
    };

    const handleReset = () => {
        setStep(1);
        setSelections({
            provider: '',
            issue: '',
            name: '',
            email: '',
            phone: ''
        });
    };

    // Progress Calculation
    const progress = (step / 4) * 100;

    return (
        <div className="glass-card rounded-3xl p-8 border border-white/50 w-full transition-all duration-300">
            {step < 4 && (
                <div className="mb-6">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Step {step} of 3</span>
                        <span className="text-sm font-bold text-blue-600">{Math.round((step / 3) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${(step / 3) * 100}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {/* Step 1: Provider Selection */}
            {step === 1 && (
                <div className="animate-[slideUp_0.4s_ease-out]">
                    <h3 className="text-2xl font-bold mb-6">Who is your internet provider?</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {providers.map((p) => (
                            <button
                                key={p.name}
                                onClick={() => handleProviderSelect(p.name)}
                                className={`${p.color} p-4 rounded-xl border-2 border-transparent hover:border-black transition-all duration-200 text-left font-bold text-sm lg:text-base hover:shadow-md flex items-center justify-between group`}
                            >
                                {p.name}
                                <span className="opacity-0 group-hover:opacity-100 text-black transition-opacity">→</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Step 2: Issue Selection */}
            {step === 2 && (
                <div className="animate-[slideUp_0.4s_ease-out]">
                    <button
                        onClick={() => setStep(1)}
                        className="text-sm text-gray-400 hover:text-black mb-4 flex items-center gap-1 transition-colors"
                    >
                        ← Back
                    </button>
                    <h3 className="text-2xl font-bold mb-6">What is the main issue?</h3>
                    <div className="space-y-3">
                        {issues.map((issue) => (
                            <button
                                key={issue}
                                onClick={() => handleIssueSelect(issue)}
                                className="w-full bg-white p-4 rounded-xl border-2 border-gray-100 hover:border-black transition-all duration-200 text-left font-medium hover:shadow-md flex items-center justify-between group"
                            >
                                {issue}
                                <span className="opacity-0 group-hover:opacity-100 text-black transition-opacity">→</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Step 3: Contact Form */}
            {step === 3 && (
                <div className="animate-[slideUp_0.4s_ease-out]">
                    <button
                        onClick={() => setStep(2)}
                        className="text-sm text-gray-400 hover:text-black mb-4 flex items-center gap-1 transition-colors"
                    >
                        ← Back
                    </button>
                    <h3 className="text-2xl font-bold mb-6">One Final Step</h3>

                    {/* Summary Box */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 text-sm">
                        <div className="flex gap-2 mb-1">
                            <span className="font-bold text-blue-800">Provider:</span>
                            <span className="text-blue-900">{selections.provider}</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="font-bold text-blue-800">Issue:</span>
                            <span className="text-blue-900">{selections.issue}</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold ml-1 mb-1">Full Name</label>
                            <input
                                required
                                value={selections.name}
                                onChange={(e) => setSelections({ ...selections, name: e.target.value })}
                                type="text"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors"
                                placeholder="Jane Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold ml-1 mb-1">Email Address</label>
                            <input
                                required
                                value={selections.email}
                                onChange={(e) => setSelections({ ...selections, email: e.target.value })}
                                type="email"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors"
                                placeholder="jane@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold ml-1 mb-1">Phone Number <span className="text-gray-400 font-normal">(Optional)</span></label>
                            <input
                                value={selections.phone}
                                onChange={(e) => setSelections({ ...selections, phone: e.target.value })}
                                type="tel"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors"
                                placeholder="(555) 123-4567"
                            />
                        </div>

                        <button type="submit" className="w-full bg-black text-white font-bold py-4 rounded-xl text-lg hover:bg-gray-800 transition-all hover:shadow-lg transform hover:-translate-y-1 mt-2">
                            Get Help Now
                        </button>
                    </form>
                </div>
            )}

            {/* Step 4: Success / Actions */}
            {step === 4 && (
                <div className="animate-[slideUp_0.4s_ease-out] text-center">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>

                    <h3 className="text-2xl font-black mb-2">Our Agent Will Reach You Soon!</h3>
                    <p className="text-gray-600 mb-8">
                        Thanks <span className="font-bold text-black">{selections.name}</span>! We've received your WiFi issue report for <span className="font-bold text-black">{selections.provider}</span>.
                    </p>

                    <div className="space-y-3">
                        <a href="tel:+18102583601" className="block w-full bg-green-500 text-white font-bold py-4 rounded-xl text-lg hover:bg-green-600 transition-all hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            Call Now - 24/7
                        </a>

                        <a href="https://devicedetect.vercel.app/" target="_blank" rel="noopener noreferrer" className="block w-full bg-black text-white font-bold py-4 rounded-xl text-lg hover:bg-gray-800 transition-all hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            Scan Now - 24/7
                        </a>

                        <button
                            onClick={handleReset}
                            className="block w-full bg-white text-gray-500 font-bold py-4 rounded-xl text-lg border-2 border-transparent hover:border-gray-200 transition-all"
                        >
                            Start New Troubleshoot
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProviderQuiz
