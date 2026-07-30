import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { soundFX } from '../utils/soundFX';
import { useStory } from '../context/StoryContext';
import { Heart, Film } from 'lucide-react';

const lines = [
  "This diploma has my name on it.",
  "But every sacrifice behind it belongs to you.",
  "Thank you Mom.",
  "Thank you Dad.",
  "I love you."
];

export const FinalEnding: React.FC = () => {
  const { setStage, triggerConfetti } = useStory();
  const [visibleLineCount, setVisibleLineCount] = useState<number>(0);

  useEffect(() => {
    soundFX.startBackgroundMusic();

    const interval = setInterval(() => {
      setVisibleLineCount((prev) => {
        if (prev >= lines.length) {
          clearInterval(interval);
          triggerConfetti();
          return lines.length;
        }
        return prev + 1;
      });
    }, 1800);

    return () => {
      clearInterval(interval);
      soundFX.stopBackgroundMusic();
    };
  }, [triggerConfetti]);

  const handleRollCredits = () => {
    soundFX.stopBackgroundMusic();
    setStage('credits');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white px-6 py-12 select-none overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div className="absolute w-[800px] h-[800px] rounded-full bg-radial from-red-950/40 via-amber-950/20 to-transparent blur-3xl pointer-events-none" />

      {/* Main Ending Typography Container */}
      <div className="relative z-10 max-w-3xl w-full text-center space-y-8">
        {lines.slice(0, visibleLineCount).map((text, idx) => (
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className={`font-serif leading-relaxed ${
              idx === lines.length - 1
                ? 'text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-red-500 drop-shadow-[0_0_30px_rgba(229,9,20,0.8)]'
                : idx >= 2
                ? 'text-3xl md:text-5xl font-bold text-amber-300'
                : 'text-2xl md:text-4xl font-medium text-neutral-200'
            }`}
          >
            {text}
          </motion.p>
        ))}

        {/* Graduation Heart Icon */}
        {visibleLineCount >= lines.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col items-center pt-8"
          >
            <div className="p-4 rounded-full bg-red-600/20 border border-red-600/50 shadow-[0_0_40px_rgba(229,9,20,0.6)] mb-8">
              <Heart className="w-10 h-10 text-red-500 fill-red-500 animate-pulse" />
            </div>

            {/* Roll Credits Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRollCredits}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 text-white font-bold text-base md:text-lg flex items-center space-x-3 shadow-xl shadow-red-900/50 cursor-pointer"
            >
              <Film className="w-5 h-5" />
              <span>🎬 Watch End Credits</span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
