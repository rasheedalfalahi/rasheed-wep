import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show for first-time session visit on mobile, and dismiss rapidly
    const isMobile = window.innerWidth < 768;
    const hasSeenSplash = sessionStorage.getItem('rf_splash_seen');

    if (isMobile && !hasSeenSplash) {
      setIsVisible(true);
      sessionStorage.setItem('rf_splash_seen', 'true');
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 850);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
           initial={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.35, ease: "easeOut" }}
           onClick={() => setIsVisible(false)}
           className="fixed inset-0 z-[9999] bg-[#003032] flex items-center justify-center overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative flex flex-col items-center"
            >
              <div className="w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center p-3 relative z-10">
                <img 
                  src="/images/projects/icon.png" 
                  alt="Logo" 
                  className="w-full h-full object-contain"
                  loading="eager"
                  decoding="async"
                />
              </div>

              {/* Minimal Straight Progress Bar */}
              <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden mt-4">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full bg-brand-primary"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
