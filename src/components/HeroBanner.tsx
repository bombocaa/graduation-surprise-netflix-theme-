import React from 'react';
import { motion } from 'framer-motion';
import { Play, Info, Sparkles } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const HeroBanner: React.FC = () => {
  const { storyData, setActiveEpisode, progress } = useStory();
  const { hero, episodes } = storyData;

  const handlePlayLatest = () => {
    // Find first unwatched episode or episode 1
    const unwatched = episodes.find((ep) => !progress.completedEpisodes.includes(ep.id));
    const target = unwatched || episodes[0];
    setActiveEpisode(target);
  };

  const handleMoreInfo = () => {
    const section = document.getElementById('episodes');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[85vh] md:min-h-screen flex items-center justify-start bg-black text-white pt-20 overflow-hidden">
      {/* Background Image Container with Dark Gradient Mask */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter brightness-60 transition-all duration-1000 scale-105"
        style={{ backgroundImage: `url('${hero.heroImage}')` }}
      />

      {/* Netflix Multi-layer Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent w-full md:w-3/4" />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-black/60" />
      <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black/90 pointer-events-none" />

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-3xl mx-auto md:mx-0 px-6 md:px-16 py-12 flex flex-col items-start">
        {/* Netflix Original Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-2 text-xs md:text-sm font-mono tracking-[0.25em] text-red-500 uppercase font-semibold mb-4"
        >
          <span className="w-5 h-5 rounded bg-red-600 text-white font-serif font-black flex items-center justify-center text-xs">
            N
          </span>
          <span>ORIGINAL DOCUMENTARY SERIES</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-4 font-sans leading-none drop-shadow-2xl"
        >
          {hero.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-2xl font-medium text-neutral-200 mb-6 max-w-xl leading-snug"
        >
          {hero.subtitle}
        </motion.p>

        {/* Metadata Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs md:text-sm mb-6 text-neutral-300 font-medium"
        >
          <span className="text-emerald-400 font-bold font-mono">100% Match</span>
          <span className="px-2 py-0.5 rounded bg-neutral-800/80 border border-neutral-700 text-neutral-300 font-mono">
            {hero.graduationDate}
          </span>
          <span className="px-2 py-0.5 rounded bg-neutral-800/80 border border-neutral-700 font-mono text-amber-400">
            5 Episodes
          </span>
          <span className="px-2 py-0.5 rounded bg-red-950/60 border border-red-600/40 text-red-400 font-mono text-xs">
            4K ULTRA HD
          </span>
          <span className="px-2 py-0.5 rounded bg-neutral-800/80 border border-neutral-700 font-mono text-xs">
            5.1 SURROUND
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xs sm:text-sm md:text-base text-neutral-300 mb-8 max-w-2xl leading-relaxed font-light line-clamp-3 md:line-clamp-none"
        >
          {hero.description}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayLatest}
            className="flex items-center space-x-3 bg-white hover:bg-neutral-200 text-black font-bold text-base md:text-lg px-7 py-3.5 rounded-lg transition-colors cursor-pointer shadow-lg shadow-white/10"
          >
            <Play className="w-6 h-6 fill-black" />
            <span>▶ Watch Now</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMoreInfo}
            className="flex items-center space-x-3 bg-neutral-800/90 hover:bg-neutral-700 text-white font-medium text-base md:text-lg px-7 py-3.5 rounded-lg border border-neutral-600/60 transition-colors cursor-pointer shadow-lg backdrop-blur-sm"
          >
            <Info className="w-6 h-6" />
            <span>ℹ More Information</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Hero Footnote Bar */}
      <div className="absolute bottom-4 right-8 hidden md:flex items-center space-x-3 text-xs text-neutral-400 bg-neutral-900/80 px-4 py-2 rounded-lg border border-neutral-800 backdrop-blur-md">
        <Sparkles className="w-4 h-4 text-amber-400" />
        <span>Dedicated to Mom & Dad</span>
      </div>
    </section>
  );
};
