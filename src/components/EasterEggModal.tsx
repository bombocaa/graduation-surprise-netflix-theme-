import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Gift, Key } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const EasterEggModal: React.FC = () => {
  const { isEasterEggOpen, setIsEasterEggOpen, triggerConfetti } = useStory();

  if (!isEasterEggOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-lg bg-neutral-950 border-2 border-red-600/60 rounded-3xl p-8 shadow-[0_0_80px_rgba(229,9,20,0.5)] text-white text-center flex flex-col items-center"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsEasterEggOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon Badge */}
          <div className="p-4 rounded-full bg-red-950/80 border border-red-600/50 text-red-500 mb-4 animate-pulse">
            <Gift className="w-10 h-10" />
          </div>

          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-950/60 text-red-400 text-xs font-mono mb-2 border border-red-600/30">
            <Key className="w-3.5 h-3.5" />
            <span>SECRET EASTER EGG DISCOVERED!</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
            Press 'N' For Netflix Magic
          </h2>

          <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
            You found the hidden Easter egg! Here is a secret message to Mom and Dad:
          </p>

          <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 text-sm text-amber-300 font-serif italic mb-6 w-full text-left leading-relaxed">
            "No matter how many lines of code I write, or how many degrees I obtain, the greatest title I will ever hold is being your child. Thank you for making my life feel like a blockbuster movie!"
          </div>

          {/* Actions */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              triggerConfetti();
              setIsEasterEggOpen(false);
            }}
            className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm uppercase tracking-wide shadow-lg shadow-red-900/50 transition-colors cursor-pointer flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Trigger Celebration Confetti</span>
          </motion.button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
