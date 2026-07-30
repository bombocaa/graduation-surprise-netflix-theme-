import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const AwardModal: React.FC = () => {
  const { activeAward, setActiveAward, triggerConfetti } = useStory();

  if (!activeAward) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-xl bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl text-white text-left my-8"
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveAward(null)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer border border-neutral-700"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Clean Certificate Image Header */}
          <div className="relative aspect-video w-full bg-neutral-900 overflow-hidden">
            <img
              src={activeAward.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80'}
              alt={activeAward.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-90" />
          </div>

          {/* Modal Content Body */}
          <div className="p-6 md:p-8">
            {/* Metadata Line */}
            <div className="text-xs font-mono text-amber-400 mb-1">
              <span>{activeAward.issuer || activeAward.category}</span>
              {activeAward.date && <span className="text-neutral-400"> • {activeAward.date}</span>}
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-sans">
              {activeAward.title}
            </h2>

            {/* Description */}
            <div className="bg-neutral-900/80 p-4 rounded-xl border border-neutral-800/80 text-sm text-neutral-300 font-light leading-relaxed mb-6">
              {activeAward.description}
            </div>

            {/* Citation Note */}
            <div className="bg-neutral-900/50 p-5 rounded-xl border border-neutral-800 text-left mb-6">
              <h3 className="text-xs font-mono text-neutral-400 font-semibold uppercase tracking-wider mb-1.5">
                Citation & Details
              </h3>
              <p className="text-sm text-neutral-200 italic font-serif leading-relaxed">
                "{activeAward.speech}"
              </p>
            </div>

            {/* Celebrate Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={triggerConfetti}
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm tracking-wide uppercase transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Celebrate Award & Fire Confetti!</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
