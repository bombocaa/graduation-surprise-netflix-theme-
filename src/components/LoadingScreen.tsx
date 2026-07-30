import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const LoadingScreen: React.FC = () => {
  const { setStage } = useStory();
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setStage('intro');
          }, 600);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(100, prev + increment);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [setStage]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white px-4"
    >
      <div className="relative flex flex-col items-center max-w-sm w-full">
        {/* Animated Graduation Cap Icon with Red Glow */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="relative mb-8 p-6 rounded-full bg-red-950/30 border border-red-600/30 shadow-[0_0_50px_rgba(229,9,20,0.4)]"
        >
          <GraduationCap className="w-16 h-16 text-red-600 drop-shadow-[0_0_15px_rgba(229,9,20,0.8)]" />
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl md:text-2xl font-medium tracking-wide text-neutral-200 mb-2 font-sans"
        >
          Preparing your story...
        </motion.h2>

        <p className="text-xs text-neutral-400 uppercase tracking-widest mb-8">
          A Netflix Original Documentary
        </p>

        {/* Progress Bar Container */}
        <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden mb-4 border border-neutral-700/50 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-red-700 via-red-600 to-amber-500 rounded-full shadow-[0_0_12px_rgba(229,9,20,0.8)]"
            style={{ width: `${percent}%` }}
            transition={{ ease: 'easeOut', duration: 0.2 }}
          />
        </div>

        {/* Percentage Counter */}
        <div className="flex justify-between w-full text-xs font-mono text-neutral-400">
          <span>INITIALIZING DOCUMENTARY</span>
          <span className="text-red-500 font-bold">{percent}%</span>
        </div>
      </div>
    </motion.div>
  );
};
