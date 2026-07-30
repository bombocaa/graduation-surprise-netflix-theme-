import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, FastForward, Heart, GraduationCap } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { soundFX } from '../utils/soundFX';

export const EndCredits: React.FC = () => {
  const { storyData, setStage } = useStory();
  const { credits } = storyData;
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);

  useEffect(() => {
    soundFX.startBackgroundMusic();
    return () => soundFX.stopBackgroundMusic();
  }, []);

  const handleReturnHome = () => {
    soundFX.stopBackgroundMusic();
    setStage('main');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black text-white overflow-hidden select-none flex flex-col justify-between">
      {/* Top Floating Control Bar */}
      <div className="relative z-20 flex items-center justify-between p-6 bg-gradient-to-b from-black via-black/80 to-transparent">
        <div className="flex items-center space-x-2 text-red-600 font-serif font-black text-xl tracking-tighter">
          <GraduationCap className="w-6 h-6 text-red-600" />
          <span>NETFLIX</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 2.5 : 1))}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 text-xs font-mono text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>{speedMultiplier > 1 ? 'Speed 2.5x' : 'Fast Forward'}</span>
          </button>

          <button
            onClick={handleReturnHome}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-lg shadow-red-900/40"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </button>
        </div>
      </div>

      {/* Upward Scrolling Credits Window */}
      <div className="relative flex-1 overflow-hidden flex justify-center">
        <motion.div
          key={speedMultiplier}
          initial={{ y: '100vh' }}
          animate={{ y: '-140%' }}
          transition={{
            duration: 35 / speedMultiplier,
            ease: 'linear'
          }}
          className="max-w-xl w-full text-center space-y-16 py-12 px-6 font-mono text-neutral-300"
        >
          {/* Main Title */}
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-red-500 font-semibold">
              A GRADUATION DOCUMENTARY FILM
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white mt-2 tracking-tight font-sans">
              THE JOURNEY
            </h1>
            <p className="text-sm text-neutral-400 font-serif italic mt-2">
              Class of 2026
            </p>
          </div>

          {/* Director & Creator */}
          <div>
            <span className="text-xs text-neutral-500 uppercase tracking-widest block mb-1">DIRECTED & DEVELOPED BY</span>
            <span className="text-2xl font-bold text-white font-sans">{credits.director}</span>
          </div>

          {/* Executive Producers */}
          <div>
            <span className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">EXECUTIVE PRODUCERS</span>
            <div className="space-y-1">
              {credits.producers.map((prod, idx) => (
                <p key={idx} className="text-xl font-bold text-amber-400 font-sans">{prod}</p>
              ))}
            </div>
          </div>

          {/* Starring Cast */}
          <div>
            <span className="text-xs text-neutral-500 uppercase tracking-widest block mb-4">STARRING CAST</span>
            <div className="space-y-3">
              {credits.cast.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm border-b border-neutral-900 pb-1">
                  <span className="text-neutral-400 text-left">{item.role}</span>
                  <span className="text-white font-bold text-right font-sans">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Special Thanks */}
          <div>
            <span className="text-xs text-neutral-500 uppercase tracking-widest block mb-3">SPECIAL THANKS</span>
            <div className="space-y-2 text-sm text-neutral-300 font-serif italic">
              {credits.specialThanks.map((thanks, idx) => (
                <p key={idx}>"{thanks}"</p>
              ))}
            </div>
          </div>

          {/* Soundtrack */}
          <div>
            <span className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">ORIGINAL SOUNDTRACK</span>
            <div className="space-y-1 text-xs text-neutral-400">
              {credits.music.map((m, idx) => (
                <p key={idx}>♫ {m}</p>
              ))}
            </div>
          </div>

          {/* Dedication */}
          <div className="pt-8 border-t border-neutral-900">
            <Heart className="w-8 h-8 text-red-500 fill-red-500 mx-auto mb-4 animate-pulse" />
            <p className="text-base text-neutral-200 font-serif italic max-w-md mx-auto leading-relaxed">
              "{credits.dedication}"
            </p>
          </div>

          {/* Copyright */}
          <div className="text-xs text-neutral-600 pt-12">
            © 2026 Netflix Graduation Surprise Experience. All rights reserved with love.
          </div>
        </motion.div>
      </div>
    </div>
  );
};
