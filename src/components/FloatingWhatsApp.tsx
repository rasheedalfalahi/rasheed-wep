import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = 'https://wa.me/message/SKHTX76Y7XXIF1';
  const [showTooltip, setShowTooltip] = useState(false);
  const longPressTimerRef = useRef<number | null>(null);
  const autoHideTimerRef = useRef<number | null>(null);
  const isLongPressRef = useRef(false);

  const clearTimers = () => {
    if (longPressTimerRef.current) {
      window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    if (autoHideTimerRef.current) {
      window.clearTimeout(autoHideTimerRef.current);
      autoHideTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const handleTouchStart = () => {
    isLongPressRef.current = false;
    clearTimers();
    longPressTimerRef.current = window.setTimeout(() => {
      isLongPressRef.current = true;
      setShowTooltip(true);
      autoHideTimerRef.current = window.setTimeout(() => {
        setShowTooltip(false);
      }, 3500);
    }, 350);
  };

  const handleTouchEnd = () => {
    if (longPressTimerRef.current) {
      window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isLongPressRef.current) {
      e.preventDefault();
      isLongPressRef.current = false;
    }
  };

  return (
    <aside 
      aria-label="تواصل عبر واتساب" 
      className="fixed z-[90] bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] end-[max(1.125rem,calc(env(safe-area-inset-left,0px)+1rem))] sm:bottom-7 sm:end-7"
    >
      <div className="relative flex flex-col items-end">
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              role="tooltip"
              initial={{ opacity: 0, y: 8, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.94 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-full mb-3 end-0 z-20 pointer-events-none whitespace-nowrap"
            >
              <div className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#04333e]/95 border border-[#25D366]/35 text-white shadow-xl shadow-black/40 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse shrink-0" />
                <span className="text-xs sm:text-sm font-bold font-arabic text-slate-100">
                  هل لديك استفسار؟ تواصل معي فوراً
                </span>
                {/* Tooltip Arrow */}
                <span className="absolute -bottom-1.5 end-5 w-3 h-3 rotate-45 bg-[#04333e]/95 border-b border-e border-[#25D366]/35" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.a
          id="floating-whatsapp-btn"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          onContextMenu={(e) => {
            if (isLongPressRef.current) e.preventDefault();
          }}
          onClick={handleClick}
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: 0.6,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-2.5 h-12 sm:h-13 px-3.5 sm:px-4 rounded-full bg-[#03262e]/90 hover:bg-[#04333e] border border-white/15 hover:border-brand-primary/50 text-white shadow-xl shadow-black/40 backdrop-blur-md transition-all duration-300 select-none"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0 group-hover:bg-brand-primary/20 transition-colors">
            <img 
              src="/images/whatsapp.svg" 
              alt="WhatsApp" 
              className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 group-hover:scale-110" 
            />
          </div>

          <span className="hidden sm:inline-block text-xs font-bold text-slate-100 font-arabic tracking-normal group-hover:text-brand-primary transition-colors whitespace-nowrap">
            محادثة واتساب
          </span>

          <ArrowLeft 
            size={14} 
            className="hidden sm:inline-block text-brand-primary/70 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:text-brand-primary shrink-0" 
          />
        </motion.a>
      </div>
    </aside>
  );
};

export default FloatingWhatsApp;
