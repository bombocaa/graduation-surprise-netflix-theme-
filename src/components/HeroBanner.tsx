import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, VolumeX, X, ArrowLeft } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import thumbnailImg from '../assets/thumbnail.jpg';
import introVideo from '../assets/intro.mp4';

export const HeroBanner: React.FC = () => {
  const { storyData, isMuted, toggleMute, isPlayingVideo, setIsPlayingVideo } = useStory();
  const { hero } = storyData;

  const [showControls, setShowControls] = useState<boolean>(true);
  const [mouseActivity, setMouseActivity] = useState<number>(0);

  const handleMouseMove = () => {
    setShowControls(true);
    setMouseActivity(Date.now());
  };

  useEffect(() => {
    if (!isPlayingVideo) return;

    const timer = setTimeout(() => {
      setShowControls(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [isPlayingVideo, mouseActivity]);

  const handlePlayLatest = () => {
    setShowControls(true);
    setIsPlayingVideo(true);
  };

  const heroImageSrc = thumbnailImg || hero.heroImage;

  return (
    <section id="hero" className="relative min-h-[90vh] md:min-h-screen flex items-center justify-start bg-black text-white pt-16 overflow-hidden select-none">
      {/* Background Hero Image with Vignette */}
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-70 scale-105 transition-all duration-1000"
        style={{ backgroundImage: `url('${heroImageSrc}')` }}
      />

      {/* Netflix Multi-layer Gradient Masking (Left, Bottom, Radial) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent w-full md:w-3/5 z-1" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-1" />
      <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/80 pointer-events-none z-1" />

      {/* Hero Content Area */}
      <div className="relative z-10 max-w-2xl px-6 sm:px-12 md:px-16 pt-20 pb-12 flex flex-col items-start">
        {/* N DOCUMENTARY Series Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-2 mb-3"
        >
          <span className="text-3xl font-serif font-black text-red-600 drop-shadow-[0_0_10px_rgba(229,9,20,0.9)]">
            N
          </span>
          <span className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-neutral-300">
            D O C U M E N T A R Y
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black font-sans tracking-tight text-white mb-4 leading-none drop-shadow-2xl"
        >
          {hero.title}
        </motion.h1>

        {/* Top 10 Rank Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center space-x-3 mb-4"
        >
          <div className="flex items-center justify-center w-7 h-7 bg-red-600 text-white font-black text-xs rounded-sm shadow-md">
            #1
          </div>
          <span className="text-sm md:text-base font-bold text-white tracking-tight">
            #1 in Family Originals Today
          </span>
        </motion.div>

        {/* Metadata Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center gap-3 text-xs md:text-sm mb-4 text-neutral-300 font-medium"
        >
          <span className="text-emerald-400 font-bold font-mono">99% Match</span>
          <span className="text-neutral-400">2026</span>
          <span className="px-1.5 py-0.5 rounded border border-neutral-600 text-[11px] text-neutral-300 font-mono">
            G (Gratitude)
          </span>
          <span className="px-1.5 py-0.5 rounded border border-neutral-600 text-[11px] text-neutral-300 font-mono">
            5 Episodes
          </span>
          <span className="px-1.5 py-0.5 rounded border border-neutral-600 text-[11px] text-red-500 font-mono">
            4K ULTRA HD
          </span>
        </motion.div>

        {/* Description Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm md:text-base text-neutral-200 mb-8 leading-relaxed font-normal drop-shadow-md max-w-xl line-clamp-3 md:line-clamp-none"
        >
          {hero.description}
        </motion.p>

        {/* Netflix Buttons Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center space-x-4"
        >
          <button
            onClick={handlePlayLatest}
            className="flex items-center space-x-3 bg-white hover:bg-neutral-200 text-black font-bold text-base md:text-lg px-8 py-3 rounded-md transition-colors cursor-pointer shadow-lg active:scale-95"
          >
            <Play className="w-6 h-6 fill-black text-black" />
            <span>Play</span>
          </button>
        </motion.div>
      </div>

      {/* Right Side Control Overlay (Mute Button + Age Rating Badge) */}
      <div className="absolute bottom-24 right-0 z-20 flex items-center space-x-3">
        <button
          onClick={toggleMute}
          className="p-3 rounded-full border border-neutral-500/80 bg-neutral-900/60 hover:bg-neutral-800 text-white transition-colors cursor-pointer backdrop-blur-md"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>

        <div className="bg-neutral-900/80 border-l-4 border-white px-4 py-1.5 text-xs font-semibold text-neutral-200 backdrop-blur-md pr-6">
          G | Gratitude for Mom & Dad
        </div>
      </div>

      {/* Fullscreen Video Player Modal */}
      <AnimatePresence>
        {isPlayingVideo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            onMouseMove={handleMouseMove}
            className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center select-none ${!showControls ? 'cursor-none' : ''
              }`}
          >
            {/* Top Navigation Control Bar */}
            <div
              className={`absolute top-0 left-0 right-0 z-10 p-6 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent transition-opacity duration-500 ${showControls ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            >
              <button
                onClick={() => setIsPlayingVideo(false)}
                className="flex items-center space-x-2 text-neutral-300 hover:text-white bg-black/50 hover:bg-black/80 px-4 py-2 rounded-lg border border-neutral-700 transition-colors cursor-pointer backdrop-blur-md"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold text-sm">Back to Browse</span>
              </button>

              <button
                onClick={() => setIsPlayingVideo(false)}
                className="p-2.5 rounded-full text-neutral-300 hover:text-white bg-black/50 hover:bg-black/80 border border-neutral-700 transition-colors cursor-pointer backdrop-blur-md"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Video Player */}
            <video
              src={introVideo}
              autoPlay
              controls
              playsInline
              onMouseMove={handleMouseMove}
              onEnded={() => setIsPlayingVideo(false)}
              className="w-full h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
