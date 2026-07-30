import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Heart, GraduationCap, Users } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { soundFX } from '../utils/soundFX';

export const WelcomeScreen: React.FC = () => {
  const { setStage } = useStory();

  const handleSelectProfile = (_profileName: string) => {
    soundFX.playUnlockChime();
    setStage('main');
  };

  const profiles = [
    {
      id: 'mom-dad',
      name: 'Mom & Dad',
      bgGradient: 'from-red-600 to-red-800',
      icon: <Heart className="w-12 h-12 text-white fill-white/20" />,
      badge: 'VIP PRODUCERS'
    },
    {
      id: 'graduate',
      name: 'Graduate (2026)',
      bgGradient: 'from-blue-600 to-indigo-800',
      icon: <GraduationCap className="w-12 h-12 text-white" />,
      badge: 'STAR'
    },
    {
      id: 'family',
      name: 'Family Memories',
      bgGradient: 'from-amber-500 to-orange-700',
      icon: <Users className="w-12 h-12 text-white" />,
      badge: 'CAST & CREW'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 py-12 select-none overflow-hidden"
    >
      {/* Subtle Background Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black pointer-events-none" />

      {/* Top Header Logo */}
      <div className="absolute top-8 left-8 flex items-center space-x-2">
        <span className="text-4xl font-netflix-brand tracking-wider text-red-600 drop-shadow-[0_0_20px_rgba(229,9,20,0.8)]">
          NETFLIX
        </span>
      </div>

      {/* Main Profile Selection Content */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl w-full text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-12 font-sans"
        >
          Who's watching?
        </motion.h1>

        {/* Profile Avatar Cards */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-16">
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelectProfile(profile.name)}
              className="group flex flex-col items-center cursor-pointer w-32 md:w-40"
            >
              {/* Profile Avatar Square */}
              <div className={`relative w-32 h-32 md:w-40 md:h-40 rounded-md bg-gradient-to-br ${profile.bgGradient} flex items-center justify-center border-2 border-transparent group-hover:border-white shadow-xl transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] overflow-hidden`}>
                {profile.icon}
                <span className="absolute bottom-2 text-[10px] uppercase font-mono tracking-widest bg-black/60 px-2 py-0.5 rounded text-neutral-300">
                  {profile.badge}
                </span>
              </div>

              {/* Profile Name Label */}
              <span className="mt-4 text-base md:text-lg font-medium text-neutral-400 group-hover:text-white transition-colors">
                {profile.name}
              </span>
            </motion.div>
          ))}

          {/* Add Profile Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="group flex flex-col items-center cursor-pointer w-32 md:w-40 opacity-70 hover:opacity-100 transition-opacity"
            onClick={() => handleSelectProfile('Guest')}
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-md bg-neutral-900 flex items-center justify-center border-2 border-neutral-800 group-hover:border-neutral-500 transition-all">
              <Plus className="w-12 h-12 text-neutral-500 group-hover:text-neutral-300" />
            </div>
            <span className="mt-4 text-base md:text-lg font-medium text-neutral-500 group-hover:text-neutral-300">
              Add Profile
            </span>
          </motion.div>
        </div>

        {/* Dedicated Message Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-xl bg-neutral-950/80 border border-neutral-800/80 rounded-xl p-5 backdrop-blur-md"
        >
          <p className="text-xs md:text-sm text-neutral-300 leading-relaxed font-sans">
            <span className="text-red-500 font-semibold uppercase tracking-wider block mb-1">A Special Graduation Original</span>
            "Dedicated to Mom & Dad. Every frame of this documentary represents your unconditional love, guidance, and endless sacrifices."
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
