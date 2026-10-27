import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Command } from 'lucide-react';

interface ShortcutHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

const shortcuts = [
  { keys: ['Home'], description: 'Scroll to Top' },
  { keys: ['Esc'], description: 'Close Modals/Overlays' },
  { keys: ['G', 'H'], description: 'Go to Home' },
  { keys: ['G', 'P'], description: 'Go to Projects' },
  { keys: ['G', 'C'], description: 'Go to Contact' },
  { keys: ['?'], description: 'Show Shortcuts Help' },
];

export default function ShortcutHelp({ isOpen, onClose }: ShortcutHelpProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-card border border-white/10 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                  <Command size={20} />
                </div>
                <h2 className="text-2xl font-black tracking-tight">Keyboard Shortcuts</h2>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-text-main transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-6">
              {shortcuts.map((s, idx) => (
                <div key={idx} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                  <span className="text-base text-text-muted">{s.description}</span>
                  <div className="flex gap-2">
                    {s.keys.map(k => (
                      <kbd key={k} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-black min-w-[32px] text-center">
                        {k}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-white/5 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary/40">Power User Experience</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
