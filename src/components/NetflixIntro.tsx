import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStory } from '../context/StoryContext';
import { soundFX } from '../utils/soundFX';

export const NetflixIntro: React.FC = () => {
  const { setStage } = useStory();

  useEffect(() => {
    // Play Ta-Dum audio hit
    soundFX.playTaDum();

    // Transition to Welcome Screen after intro finishes
    const timer = setTimeout(() => {
      setStage('welcome');
    }, 4500);

    return () => clearTimeout(timer);
  }, [setStage]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden select-none"
    >
      {/* Background Red Ambient Glow */}
      <motion.div
        animate={{
          scale: [0.8, 1.5, 2.5],
          opacity: [0.2, 0.6, 0]
        }}
        transition={{ duration: 4, ease: 'easeInOut' }}
        className="absolute w-[600px] h-[600px] rounded-full bg-radial from-red-600/40 via-red-900/10 to-transparent blur-3xl pointer-events-none"
      />

      {/* Cinematic Ribbon / Logo Reveal Container */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Glowing Red Initials "J" / "N" Iconography */}
        <motion.div
          initial={{ scale: 0.3, opacity: 0, filter: 'blur(20px)' }}
          animate={{
            scale: [0.3, 1, 1.05, 3.5],
            opacity: [0, 1, 1, 0],
            filter: ['blur(20px)', 'blur(0px)', 'blur(0px)', 'blur(30px)']
          }}
          transition={{
            duration: 4.2,
            times: [0, 0.3, 0.7, 1],
            ease: [0.22, 1, 0.36, 1]
          }}
          className="relative flex items-center justify-center"
        >
          {/* Vertical Red Lens Flares */}
          <div className="absolute w-1 h-96 bg-gradient-to-v from-transparent via-red-500 to-transparent blur-sm animate-pulse" />
          
          <div className="relative flex items-center space-x-1">
            <span className="text-8xl md:text-9xl font-black font-serif text-transparent bg-clip-text bg-gradient-to-b from-red-500 via-red-600 to-red-900 tracking-tighter drop-shadow-[0_0_35px_rgba(229,9,20,0.9)]">
              NETFLIX
            </span>
          </div>
        </motion.div>

        {/* Subtitle Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }}
          transition={{ duration: 4, times: [0, 0.3, 0.75, 1] }}
          className="absolute -bottom-16 text-center"
        >
          <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-red-500/90 font-mono">
            A GRADUATION ORIGINAL
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};
