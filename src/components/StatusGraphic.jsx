import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const StatusGraphic = () => {
    const [signalBars, setSignalBars] = useState(2);
    const [ping, setPing] = useState(120);
    const [ip, setIp] = useState('Loading...');

    useEffect(() => {
        // Fetch public IP using ipify
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => setIp(data.ip))
            .catch(err => {
                console.error('Failed to fetch IP:', err);
                setIp('Unavailable');
            });

        const interval = setInterval(() => {
            setSignalBars(prev => (prev === 4 ? 1 : prev + 1));
            setPing(Math.floor(Math.random() * (200 - 80) + 80));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="relative w-full max-w-lg aspect-square flex items-center justify-center"
        >
            {/* Main Circle Graphic Background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-white rounded-full opacity-50 blur-xl animate-pulse"></div>

            {/* Stylized Router */}
            <div className="relative z-10 w-96 h-56">
                {/* Antennas */}
                <div className="absolute -top-12 left-16 w-4 h-24 bg-gray-800 rounded-full origin-bottom rotate-[-20deg]"></div>
                <div className="absolute -top-12 right-16 w-4 h-24 bg-gray-800 rounded-full origin-bottom rotate-[20deg]"></div>

                {/* Router Body Content */}
                <div className="w-full h-full border-4 border-gray-50 rounded-2xl flex flex-col items-center justify-center bg-gray-50/50 relative overflow-hidden">
                    {/* Status Light Row */}
                    <div className="flex gap-3 mb-6">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                    </div>

                    {/* WiFi Icon */}
                    <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path>
                    </svg>

                    {/* Error Overlay Icon */}
                    <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[1px]">
                        <div className="bg-red-500 text-white rounded-full p-2 shadow-lg animate-bounce">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Connection Failed Badge */}
            <div className="absolute bottom-20 left-0 bg-red-500 text-white px-6 py-3 rounded-lg font-mono font-bold text-lg shadow-xl animate-[shake_2.5s_ease-in-out_infinite] z-20">
                CONNECTION FAILED
            </div>

            {/* Tech Status Card */}
            <div className="absolute bottom-0 right-[-20px] bg-gray-900/95 text-green-400 p-6 rounded-2xl shadow-2xl backdrop-blur-md border border-gray-700 min-w-[240px] z-30 font-mono text-sm leading-relaxed">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-400 font-bold">Error: Network timeout</span>
                </div>
                <div className="h-px bg-gray-700 w-full my-2"></div>
                <div>Status: Disconnected</div>
                <div>Ping: <span className="text-white">{ping}ms</span></div>
                <div>Signal: {'|'.repeat(signalBars)}<span className="text-gray-600">{'|'.repeat(4 - signalBars)}</span></div>
                <div className="mt-2 text-xs text-gray-500">IP: {ip}</div>
            </div>
        </motion.div>
    );
};

export default StatusGraphic;
