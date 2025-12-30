import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const HelpAccordion = () => {
    const [activeCategory, setActiveCategory] = useState(0);

    const categories = [
        {
            title: "Connection Problems",
            description: "Issues with connecting to WiFi or no internet access.",
            items: [
                {
                    q: "No internet connection despite WiFi showing connected",
                    a: "If your device shows connected to WiFi but can't access the internet, try restarting your router by unplugging it for 30 seconds. Also check if other devices have the same issue to determine if it's device-specific."
                },
                {
                    q: "Can't find or connect to your WiFi network",
                    a: "Make sure your WiFi network is broadcasting (not hidden) and within range. Check that you're entering the correct network password. If the network doesn't appear, try restarting your device's WiFi adapter."
                },
                {
                    q: "Frequent disconnections from WiFi network",
                    a: "Intermittent disconnections can be caused by interference, weak signal, or power management settings. Move closer to the router, check for interference from other devices, and disable power saving mode on your WiFi adapter."
                }
            ]
        },
        {
            title: "Speed & Performance Issues",
            description: "Slow internet speeds, buffering, and latency issues.",
            items: [
                {
                    q: "Internet is extremely slow or pages won't load",
                    a: "Run a speed test to check your actual speeds against what you're paying for. Clear your browser cache, close unnecessary applications, and try connecting via ethernet cable to test if it's a WiFi-specific issue."
                },
                {
                    q: "Video streaming keeps buffering or cutting out",
                    a: "Streaming issues are often due to bandwidth limitations or network congestion. Try lowering video quality, pausing other downloads, or upgrading to a higher speed plan if multiple devices are competing for bandwidth."
                },
                {
                    q: "WiFi works but is much slower than expected",
                    a: "WiFi speeds are typically slower than ethernet. Check your distance from the router, look for interference from microwaves or other 2.4GHz devices, and consider upgrading to a 5GHz network if available."
                }
            ]
        },
        {
            title: "Setup & Configuration",
            description: "Router setup, password changes, and admin settings.",
            items: [
                {
                    q: "How to set up a new router or modem",
                    a: "Connect your modem to the router via ethernet cable, plug in power, and wait 2-3 minutes for full startup. Use the setup wizard through your browser (usually 192.168.1.1) or the manufacturer's mobile app to configure your network name and password."
                },
                {
                    q: "Router lights showing red or orange (error states)",
                    a: "Red or orange lights typically indicate connection issues. Check all cable connections, ensure your internet service is active, and try power cycling your modem and router. Contact your ISP if the issue persists after basic troubleshooting."
                },
                {
                    q: "Changing WiFi password or network settings",
                    a: "Access your router's admin panel by typing its IP address (usually 192.168.1.1 or 192.168.0.1) in your browser. Login with admin credentials and navigate to WiFi or Wireless settings to change your network name, password, or security settings."
                }
            ]
        }
    ];

    return (
        <div className="glass-card rounded-3xl p-8 border border-white/50 w-full">
            <h3 className="text-2xl font-bold mb-2">WiFi Issues Help Center</h3>
            <p className="text-gray-500 mb-8 max-w-xl">Find quick answers to the most common network problems. Select a category below to get started.</p>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Left Column: Navigation Tabs */}
                <div className="lg:col-span-4 space-y-3">
                    {categories.map((cat, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveCategory(index)}
                            className={`w-full text-left px-6 py-4 rounded-2xl font-bold text-sm lg:text-base transition-all duration-300 flex items-center justify-between group ${activeCategory === index
                                    ? 'bg-black text-white shadow-lg transform scale-[1.02]'
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {cat.title}
                            {activeCategory === index && (
                                <motion.span
                                    layoutId="arrow"
                                    className="text-white"
                                >
                                    →
                                </motion.span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Right Column: Dynamic Content */}
                <div className="lg:col-span-8 bg-white/50 rounded-3xl p-6 lg:p-8 min-h-[400px]">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="mb-6 pb-6 border-b border-gray-100">
                                <h4 className="text-xl font-black mb-2">{categories[activeCategory].title}</h4>
                                <p className="text-gray-500 text-sm">{categories[activeCategory].description}</p>
                            </div>

                            <div className="space-y-8">
                                {categories[activeCategory].items.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group"
                                    >
                                        <h5 className="font-bold text-lg mb-2 flex items-start gap-3">
                                            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs mt-0.5">
                                                {idx + 1}
                                            </span>
                                            {item.q}
                                        </h5>
                                        <p className="text-gray-600 leading-relaxed pl-9 text-sm lg:text-base">
                                            {item.a}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <div className="bg-gray-900 rounded-2xl p-6 text-center text-white">
                                    <h5 className="font-bold mb-2">Still need help?</h5>
                                    <p className="text-gray-400 text-sm mb-4">Our network experts are available 24/7.</p>
                                    <button className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg w-full sm:w-auto">
                                        Contact Support
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default HelpAccordion
