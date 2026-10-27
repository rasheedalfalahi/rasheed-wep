import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface AnimatedDividerProps {
  className?: string;
  color?: string;
}

const AnimatedDivider: React.FC<AnimatedDividerProps> = ({ 
  className = "", 
  color = "#0d9488" // Brand Teal
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-6 sm:py-10 lg:py-14 overflow-hidden ${className}`}>
      <div className="relative flex items-center justify-center w-full max-w-4xl px-6 sm:px-10">
        
        {/* Left Fading Line */}
        <motion.div 
          className="h-px flex-1 bg-linear-to-r from-transparent via-teal-200/50 to-teal-500/20"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "circOut" }}
        />

        {/* Center Sparkle */}
        <div className="relative flex items-center px-5 sm:px-10">
          {/* Main Large Sparkle */}
          <motion.div
            className="relative"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Sparkles size={26} className="sm:w-8 sm:h-8" color={color} strokeWidth={1.5} fill={color} fillOpacity={0.2} />
            </motion.div>
            
            {/* Glow effect behind main sparkle */}
            <div 
              className="absolute inset-0 blur-xl opacity-20 pointer-events-none"
              style={{ backgroundColor: color }}
            />
          </motion.div>
        </div>

        {/* Right Fading Line */}
        <motion.div 
          className="h-px flex-1 bg-linear-to-l from-transparent via-teal-200/50 to-teal-500/20"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "circOut" }}
        />
      </div>
    </div>
  );
};

export default AnimatedDivider;
