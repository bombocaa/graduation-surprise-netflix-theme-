import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Heart, Smile, Users } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { soundFX } from '../utils/soundFX';

export const WelcomeScreen: React.FC = () => {
  const { setStage, setSelectedProfile } = useStory();

  const handleSelectProfile = (profileName: string) => {
    soundFX.playUnlockChime();
    setSelectedProfile(profileName as any);
    setStage('main');
  };

  const profiles = [
    {
      id: 'mom',
      name: 'Mom',
      bgGradient: 'from-red-600 to-rose-700',
      icon: <Heart className="w-14 h-14 text-white fill-white/20" />
    },
    {
      id: 'dad',
      name: 'Dad',
      bgGradient: 'from-blue-600 to-cyan-700',
      icon: <Smile className="w-14 h-14 text-white" />
    },
    {
      id: 'family',
      name: 'Family',
      bgGradient: 'from-amber-500 to-orange-600',
      icon: <Users className="w-14 h-14 text-white" />
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

      {/* Top Header Netflix Logo */}
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

        {/* Profile Avatar Cards Grid */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
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
      </div>
    </motion.div>
  );
};
