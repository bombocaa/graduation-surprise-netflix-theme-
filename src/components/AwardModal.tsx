import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Sparkles, Award as AwardIcon, HeartHandshake, Crown } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const AwardModal: React.FC = () => {
  const { activeAward, setActiveAward, triggerConfetti } = useStory();

  if (!activeAward) return null;

  const renderIcon = () => {
    switch (activeAward.iconName) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-12 h-12 text-amber-400" />;
      case 'Trophy':
        return <Trophy className="w-12 h-12 text-amber-400" />;
      case 'Crown':
        return <Crown className="w-12 h-12 text-amber-400" />;
      default:
        return <AwardIcon className="w-12 h-12 text-amber-400" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-xl bg-neutral-950 border border-amber-500/40 rounded-2xl p-8 shadow-[0_0_60px_rgba(217,119,6,0.3)] text-white text-center flex flex-col items-center"
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveAward(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Trophy Graphic Container */}
          <motion.div
            animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className={`p-6 rounded-full bg-gradient-to-tr ${activeAward.statuetteColor} shadow-[0_0_40px_rgba(245,158,11,0.5)] mb-6 border-2 border-amber-300/40`}
          >
            {renderIcon()}
          </motion.div>

          {/* Award Badge */}
          <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-400 text-xs font-mono font-bold tracking-widest uppercase mb-2">
            {activeAward.badge}
          </span>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-1">
            {activeAward.title}
          </h2>

          <p className="text-sm font-bold text-amber-400 mb-4 font-mono">
            RECIPIENT: {activeAward.recipient}
          </p>

          {/* Category */}
          <p className="text-xs text-neutral-400 uppercase tracking-widest mb-6">
            Category: {activeAward.category}
          </p>

          {/* Award Description */}
          <div className="bg-neutral-900/80 p-4 rounded-xl border border-neutral-800 text-sm text-neutral-300 font-light leading-relaxed mb-6 w-full text-left">
            {activeAward.description}
          </div>

          {/* Acceptance Speech Tribute */}
          <div className="bg-gradient-to-r from-amber-950/40 to-neutral-900 p-5 rounded-xl border border-amber-900/40 w-full text-left mb-6">
            <h3 className="text-xs font-mono text-amber-400 font-bold uppercase mb-2 flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1" /> Acceptance Speech & Tribute
            </h3>
            <p className="text-sm text-neutral-200 italic font-serif leading-relaxed">
              "{activeAward.speech}"
            </p>
          </div>

          {/* Celebrate Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={triggerConfetti}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-extrabold text-sm tracking-wide uppercase shadow-lg shadow-amber-900/50 transition-all cursor-pointer"
          >
            🎉 Celebrate Award & Fire Confetti!
          </motion.button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
