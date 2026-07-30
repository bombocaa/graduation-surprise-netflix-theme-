import React from 'react';
import { motion } from 'framer-motion';
import { Play, Heart } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const WelcomeScreen: React.FC = () => {
  const { storyData, setStage } = useStory();
  const { welcome } = storyData;

  const handleBegin = () => {
    setStage('main');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex items-center justify-center bg-black text-white px-4 py-12 overflow-hidden"
    >
      {/* Background Image Overlay with Dark Vignette */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter brightness-40 blur-[2px] transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1920&q=80')` }}
      />
      
      {/* Dark Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
      <div className="absolute inset-0 bg-radial from-transparent via-black/70 to-black pointer-events-none" />

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 max-w-2xl w-full bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-2xl p-8 md:p-12 shadow-[0_0_80px_rgba(0,0,0,0.9)] text-center flex flex-col items-center"
      >
        {/* Netflix Original Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-600/40 text-red-500 text-xs font-mono tracking-widest uppercase mb-6">
          <Heart className="w-3.5 h-3.5 fill-red-500" />
          <span>DEDICATED TO MOM & DAD</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 font-sans leading-tight">
          {welcome.title}
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-xl font-medium text-red-400 mb-6 max-w-lg">
          {welcome.subtitle}
        </p>

        {/* Heartfelt Greeting Text */}
        <p className="text-sm md:text-base text-neutral-300 leading-relaxed mb-6 font-light">
          {welcome.greeting}
        </p>

        {/* Emotional Quote Box */}
        <div className="w-full bg-neutral-950/60 border-l-4 border-red-600 p-4 rounded-r-lg mb-8 text-left">
          <p className="text-xs md:text-sm italic text-neutral-300">
            {welcome.quote}
          </p>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(229,9,20,0.6)' }}
          whileTap={{ scale: 0.96 }}
          onClick={handleBegin}
          className="group relative flex items-center justify-center space-x-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-base md:text-lg px-8 py-4 rounded-lg transition-colors cursor-pointer shadow-lg shadow-red-900/40"
        >
          <Play className="w-5 h-5 fill-white transition-transform group-hover:scale-110" />
          <span>▶ Begin Our Journey</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
