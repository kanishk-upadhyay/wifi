import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { categories } from '../data/helpData';

const HelpAccordion = () => {
    const [activeCategory, setActiveCategory] = useState(0);
    const contentRef = useRef(null);
    const lastScrollTime = useRef(0);

    useEffect(() => {
        const element = contentRef.current;
        if (!element) return;

        // Reset scroll to top when category changes
        element.scrollTop = 0;

        const handleWheel = (e) => {
            const isAtBottom = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 2;
            const isAtTop = element.scrollTop <= 0;

            // Scrolling Down
            if (e.deltaY > 0) {
                if (isAtBottom && activeCategory < categories.length - 1) {
                    e.preventDefault(); // Prevent page scroll

                    const now = Date.now();
                    if (now - lastScrollTime.current > 500) {
                        lastScrollTime.current = now;
                        setActiveCategory(prev => prev + 1);
                    }
                }
            }
            // Scrolling Up
            else if (e.deltaY < 0) {
                if (isAtTop && activeCategory > 0) {
                    e.preventDefault(); // Prevent page scroll

                    const now = Date.now();
                    if (now - lastScrollTime.current > 500) {
                        lastScrollTime.current = now;
                        setActiveCategory(prev => prev - 1);
                    }
                }
            }
        };

        element.addEventListener('wheel', handleWheel, { passive: false });
        return () => element.removeEventListener('wheel', handleWheel);
    }, [activeCategory, categories.length]);

    return (
        <div className="glass-card rounded-3xl p-8 border border-white/50 w-full relative">
            <h3 className="text-2xl font-bold mb-2">WiFi Issues Help Center</h3>
            <p className="text-gray-500 mb-8 max-w-xl">Find quick answers to the most common network problems.</p>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4 self-start space-y-3">
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

                <div
                    ref={contentRef}
                    className="lg:col-span-8 bg-white/50 rounded-3xl p-6 lg:p-8 min-h-[400px] max-h-[600px] overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
                >
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
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default HelpAccordion
