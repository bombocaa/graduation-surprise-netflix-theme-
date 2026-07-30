import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Sparkles, Award as AwardIcon, HeartHandshake, Crown, Calendar, School } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const AwardModal: React.FC = () => {
  const { activeAward, setActiveAward, triggerConfetti } = useStory();

  if (!activeAward) return null;

  const renderIcon = () => {
    switch (activeAward.iconName) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-8 h-8 text-amber-400" />;
      case 'Trophy':
        return <Trophy className="w-8 h-8 text-amber-400" />;
      case 'Crown':
        return <Crown className="w-8 h-8 text-amber-400" />;
      default:
        return <AwardIcon className="w-8 h-8 text-amber-400" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-xl bg-neutral-950 border border-amber-500/40 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(217,119,6,0.3)] text-white text-left my-8"
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveAward(null)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer border border-neutral-700"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Certificate Image Header */}
          <div className="relative aspect-video w-full bg-neutral-900 overflow-hidden">
            <img
              src={activeAward.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80'}
              alt={activeAward.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

            {/* Top Floating Badge */}
            <div className="absolute bottom-4 left-6 flex items-center space-x-3">
              <div className={`p-3 rounded-xl bg-gradient-to-tr ${activeAward.statuetteColor} border border-amber-300/40 shadow-lg`}>
                {renderIcon()}
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded bg-amber-950/90 border border-amber-500/50 text-amber-400 text-[10px] font-mono font-bold tracking-widest uppercase">
                  {activeAward.badge}
                </span>
                <p className="text-xs text-neutral-300 font-mono mt-1">
                  {activeAward.issuer || activeAward.category}
                </p>
              </div>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 md:p-8">
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 font-sans">
              {activeAward.title}
            </h2>

            {/* Metadata Line */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 mb-6">
              {activeAward.issuer && (
                <span className="flex items-center text-amber-400">
                  <School className="w-3.5 h-3.5 mr-1.5" />
                  {activeAward.issuer}
                </span>
              )}
              {activeAward.date && (
                <span className="flex items-center text-neutral-300">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  {activeAward.date}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="bg-neutral-900/80 p-4 rounded-xl border border-neutral-800 text-sm text-neutral-300 font-light leading-relaxed mb-6">
              {activeAward.description}
            </div>

            {/* Tribute Quote */}
            <div className="bg-gradient-to-r from-amber-950/40 to-neutral-900 p-5 rounded-xl border border-amber-900/40 text-left mb-6">
              <h3 className="text-xs font-mono text-amber-400 font-bold uppercase mb-1.5 flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Honors Citation
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
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-extrabold text-sm tracking-wide uppercase shadow-lg shadow-amber-900/40 transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>🎉 Celebrate Award & Fire Confetti!</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
