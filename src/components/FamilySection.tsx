import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import type { FamilyMember } from '../data/types';
import { FamilyDetailModal } from './FamilyDetailModal';

export const FamilySection: React.FC = () => {
  const { storyData, setActiveFamilyMember } = useStory();
  const { family } = storyData;

  return (
    <section id="family" className="py-16 px-4 md:px-12 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 text-left">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-red-500 mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>CAST & CREW</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            The Executive Producers of My Life
          </h2>
          <p className="text-sm md:text-base text-neutral-400 font-light mt-2 max-w-xl">
            No movie is made alone. Meet the extraordinary cast members who built the foundation, provided the love, and made this victory possible.
          </p>
        </div>

        {/* Cast Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {family.map((member: FamilyMember, index: number) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              onClick={() => setActiveFamilyMember(member)}
              className="group relative bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-red-600/60 shadow-xl cursor-pointer flex flex-col transition-all"
            >
              {/* Avatar Image Header */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-950">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />

                {/* Role Tag */}
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-neutral-700 text-[11px] font-mono text-red-400 font-bold">
                  {member.relationship}
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-white group-hover:text-red-500 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-medium text-amber-400 mt-0.5 mb-2 font-mono">
                    {member.role}
                  </p>
                  <p className="text-xs text-neutral-400 font-light line-clamp-2">
                    {member.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400 group-hover:text-white transition-colors">
                  <span>View Tribute</span>
                  <Heart className="w-4 h-4 text-red-500 group-hover:fill-red-500 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <FamilyDetailModal />
    </section>
  );
};
