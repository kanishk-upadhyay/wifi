import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronLeft, ChevronRight, MoveHorizontal } from 'lucide-react';
import { categories } from '../data/helpData';

export const HelpAccordion = ({ theme = 'light' }) => {
  const isNoc = theme === 'noc';
  const [activeCategory, setActiveCategory] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const contentRef = useRef(null);
  const containerRef = useRef(null);
  const lastScrollTime = useRef(0);

  // Wheel scroll boundary & Trackpad horizontal swipe navigation
  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    // Reset scroll to top when category changes
    element.scrollTop = 0;

    const handleWheel = (e) => {
      const now = Date.now();

      // 1. Trackpad horizontal swipe (deltaX)
      if (Math.abs(e.deltaX) > 35 && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        if (now - lastScrollTime.current > 450) {
          if (e.deltaX > 0 && activeCategory < categories.length - 1) {
            e.preventDefault();
            lastScrollTime.current = now;
            setDirection(1);
            setActiveCategory(prev => prev + 1);
          } else if (e.deltaX < 0 && activeCategory > 0) {
            e.preventDefault();
            lastScrollTime.current = now;
            setDirection(-1);
            setActiveCategory(prev => prev - 1);
          }
        }
        return;
      }

      // 2. Vertical scroll boundary trigger
      const isAtBottom = element.scrollHeight - element.scrollTop - element.clientHeight <= 4;
      const isAtTop = element.scrollTop <= 0;

      // Scrolling Down at the bottom
      if (e.deltaY > 0 && isAtBottom && activeCategory < categories.length - 1) {
        if (now - lastScrollTime.current > 500) {
          e.preventDefault();
          lastScrollTime.current = now;
          setDirection(1);
          setActiveCategory(prev => prev + 1);
        }
      }
      // Scrolling Up at the top
      else if (e.deltaY < 0 && isAtTop && activeCategory > 0) {
        if (now - lastScrollTime.current > 500) {
          e.preventDefault();
          lastScrollTime.current = now;
          setDirection(-1);
          setActiveCategory(prev => prev - 1);
        }
      }
    };

    element.addEventListener('wheel', handleWheel, { passive: false });
    return () => element.removeEventListener('wheel', handleWheel);
  }, [activeCategory]);

  const goToCategory = (idx) => {
    setDirection(idx > activeCategory ? 1 : -1);
    setActiveCategory(idx);
  };

  // Drag-end handler for Framer Motion interactive swiping
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 45;
    const { offset, velocity } = info;

    if (offset.x < -swipeThreshold || velocity.x < -300) {
      if (activeCategory < categories.length - 1) {
        setDirection(1);
        setActiveCategory(prev => prev + 1);
      }
    } else if (offset.x > swipeThreshold || velocity.x > 300) {
      if (activeCategory > 0) {
        setDirection(-1);
        setActiveCategory(prev => prev - 1);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`rounded-2xl p-6 sm:p-8 border transition-all duration-200 w-full relative ${
        isNoc
          ? 'bg-slate-950 border-slate-800 text-slate-100 shadow-xl'
          : 'bg-white border-gray-200 text-gray-900 shadow-xl'
      }`}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-2">
          <HelpCircle size={22} className={isNoc ? 'text-emerald-400' : 'text-blue-600'} />
          <h3 className="text-2xl font-black">WiFi Diagnostics Knowledgebase</h3>
        </div>

        {/* Swipe / Category Navigator on Mobile & Desktop */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-400">
            <MoveHorizontal size={14} className="hidden sm:inline opacity-70" />
            <span>Swipe or click to cycle:</span>
            <span className="font-bold text-on-surface">
              {activeCategory + 1} / {categories.length}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => activeCategory > 0 && goToCategory(activeCategory - 1)}
              disabled={activeCategory === 0}
              className={`p-1.5 rounded-lg border transition-colors ${
                activeCategory === 0
                  ? 'opacity-30 cursor-not-allowed border-gray-200/10'
                  : 'hover:bg-slate-800 border-gray-200/20 text-slate-200 cursor-pointer active:scale-95'
              }`}
              title="Previous Category (or swipe right)"
              aria-label="Previous diagnostic category"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => activeCategory < categories.length - 1 && goToCategory(activeCategory + 1)}
              disabled={activeCategory === categories.length - 1}
              className={`p-1.5 rounded-lg border transition-colors ${
                activeCategory === categories.length - 1
                  ? 'opacity-30 cursor-not-allowed border-gray-200/10'
                  : 'hover:bg-slate-800 border-gray-200/20 text-slate-200 cursor-pointer active:scale-95'
              }`}
              title="Next Category (or swipe left)"
              aria-label="Next diagnostic category"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <p className={`mb-6 max-w-xl text-sm leading-relaxed [text-wrap:pretty] ${isNoc ? 'text-slate-400' : 'text-gray-600'}`}>
        Interactive field runbooks. Drag or swipe left/right to switch categories, or scroll through diagnostic steps.
      </p>

      {/* Category Indicator Dots for Quick Mobile Glancing */}
      <div className="flex items-center gap-1.5 mb-6">
        {categories.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToCategory(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeCategory === idx
                ? isNoc
                  ? 'w-8 bg-emerald-400'
                  : 'w-8 bg-blue-600'
                : 'w-2 bg-gray-300 dark:bg-slate-800 hover:bg-gray-400'
            }`}
            aria-label={`Jump to category ${idx + 1}`}
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Category List Tabs */}
        <div className="lg:col-span-4 self-start space-y-2">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => goToCategory(index)}
              className={`w-full text-left px-5 py-3.5 rounded-xl font-bold text-sm transition-all duration-150 flex items-center justify-between group cursor-pointer ${
                activeCategory === index
                  ? isNoc
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                    : 'bg-black text-white shadow-md'
                  : isNoc
                  ? 'bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-100'
              }`}
            >
              <span>{cat.title}</span>
              {activeCategory === index && <span>→</span>}
            </button>
          ))}
        </div>

        {/* Content Pane with Touch/Drag Swipe & Directional Animation */}
        <div
          ref={contentRef}
          className="lg:col-span-8 p-6 min-h-[360px] max-h-[540px] overflow-y-auto overflow-x-hidden scroll-smooth relative rounded-xl border border-gray-200/20 bg-surface/50"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="cursor-grab active:cursor-grabbing touch-pan-y"
            >
              <div className="mb-6 pb-4 border-b border-gray-200/20">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-black mb-1">{categories[activeCategory].title}</h4>
                  <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                    Drag card left/right ↔
                  </span>
                </div>
                <p className={`text-sm [text-wrap:pretty] ${isNoc ? 'text-slate-400' : 'text-gray-600'}`}>
                  {categories[activeCategory].description}
                </p>
              </div>

              <div className="space-y-6">
                {categories[activeCategory].items.map((item, idx) => (
                  <div key={idx} className="pointer-events-auto">
                    <h5 className="font-bold text-base mb-1.5 flex items-start gap-2.5">
                      <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono font-bold mt-0.5 ${
                        isNoc ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {idx + 1}
                      </span>
                      <span>{item.q}</span>
                    </h5>
                    <p className={`leading-relaxed pl-7 text-sm max-w-prose [text-wrap:pretty] ${
                      isNoc ? 'text-slate-300' : 'text-gray-700'
                    }`}>
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HelpAccordion;
