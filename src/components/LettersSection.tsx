import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import type { Letter } from '../data/types';
import { LetterDetailModal } from './LetterDetailModal';

export const LettersSection: React.FC = () => {
  const { storyData, isUnlocked, setActiveLetter, progress } = useStory();
  const { letters } = storyData;

  return (
    <section id="letters" className="py-20 px-4 md:px-12 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-red-500 mb-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-600/30">
            <Heart className="w-3.5 h-3.5 fill-red-500" />
            <span>THE CLIMAX SURPRISE</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Heartfelt Letters to Mom & Dad
          </h2>

          <p className="text-sm md:text-base text-neutral-400 font-light mt-2 max-w-lg">
            Personal handwritten messages stored in sealed envelopes.
          </p>
        </div>

        {/* If Locked Warning Box */}
        {!isUnlocked ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-neutral-900/90 border-2 border-dashed border-red-600/40 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col items-center"
          >
            <div className="p-5 rounded-full bg-red-950/60 border border-red-600/40 text-red-500 mb-4 animate-bounce">
              <Lock className="w-10 h-10" />
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              🔒 Final Surprise Locked
            </h3>

            <p className="text-sm text-neutral-300 font-light mb-6 text-center">
              These letters are protected by your documentary progress. Watch all 5 episodes to unlock the sealed envelopes for Mom and Dad.
            </p>

            <div className="flex items-center space-x-3 bg-neutral-950 px-5 py-2.5 rounded-full border border-neutral-800 text-xs font-mono text-neutral-400">
              <span>Episodes Completed:</span>
              <span className="text-red-500 font-bold">{progress.completedEpisodes.length} / 5</span>
            </div>
          </motion.div>
        ) : (
          /* Unlocked Envelopes Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {letters.map((letter: Letter) => {
              const isRead = progress.lettersRead[letter.id];
              return (
                <motion.div
                  key={letter.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  onClick={() => setActiveLetter(letter)}
                  className={`group relative rounded-3xl p-8 border-2 shadow-2xl cursor-pointer transition-all flex flex-col items-center text-center bg-gradient-to-b ${letter.envelopeColor} border-amber-500/40 hover:border-red-500`}
                >
                  {/* Wax Seal Icon */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-2 border-amber-300/40 mb-6 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: letter.waxSealColor }}
                  >
                    <Mail className="w-8 h-8 text-white" />
                  </div>

                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest mb-1">
                    {letter.subtitle}
                  </span>

                  <h3 className="text-2xl font-extrabold text-white mb-3">
                    {letter.title}
                  </h3>

                  <p className="text-xs text-neutral-300 font-light mb-6 max-w-xs">
                    Click envelope to unseal and read the handwritten letter.
                  </p>

                  <div className="w-full pt-4 border-t border-white/10 flex items-center justify-center space-x-2 text-xs font-mono text-amber-300">
                    {isRead ? (
                      <span className="flex items-center text-emerald-400 font-bold">
                        <CheckCircle2 className="w-4 h-4 mr-1" /> Letter Read
                      </span>
                    ) : (
                      <span className="flex items-center text-amber-400 font-bold group-hover:text-white">
                        <Sparkles className="w-4 h-4 mr-1" /> Tap to Open Envelope
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <LetterDetailModal />
    </section>
  );
};
