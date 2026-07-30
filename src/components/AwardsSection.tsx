import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award as AwardIcon, HeartHandshake, Crown, Sparkles, Calendar, School } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import type { Award } from '../data/types';
import { AwardModal } from './AwardModal';

export const AwardsSection: React.FC = () => {
  const { storyData, setActiveAward } = useStory();
  const { awards } = storyData;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-amber-400" />;
      case 'Trophy':
        return <Trophy className="w-5 h-5 text-amber-400" />;
      case 'Crown':
        return <Crown className="w-5 h-5 text-amber-400" />;
      default:
        return <AwardIcon className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="awards" className="py-16 px-4 md:px-12 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-left">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>COLLEGE HONORS & ACHIEVEMENTS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight font-sans">
            College Awards & Distinctions
          </h2>
          <p className="text-sm md:text-base text-neutral-400 font-light mt-2 max-w-2xl leading-relaxed">
            A showcase of academic excellence, competition trophies, capstone honors, and leadership distinctions achieved throughout the university journey.
          </p>
        </div>

        {/* Awards Cards Grid - Top Image & Details Below */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {awards.map((award: Award, index: number) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => setActiveAward(award)}
              className="group relative bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-amber-500/60 shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] cursor-pointer flex flex-col justify-between transition-all"
            >
              <div>
                {/* Top Card Image Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
                  <img
                    src={award.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80'}
                    alt={award.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/50" />

                  {/* Top Left Icon Badge */}
                  <div className="absolute top-3 left-3 p-2 rounded-lg bg-black/80 backdrop-blur-md border border-neutral-700/80 shadow-md">
                    {getIcon(award.iconName)}
                  </div>

                  {/* Top Right Award Category Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded bg-amber-950/90 backdrop-blur-md border border-amber-500/50 text-[10px] font-mono text-amber-400 font-bold tracking-wider uppercase shadow-md">
                      {award.badge}
                    </span>
                  </div>
                </div>

                {/* Card Details Below */}
                <div className="p-5">
                  {/* Issuer & Date Metadata Line */}
                  <div className="flex items-center space-x-3 text-[11px] font-mono text-neutral-400 mb-2">
                    <span className="flex items-center text-amber-400/90 truncate">
                      <School className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{award.issuer || award.category}</span>
                    </span>
                    {award.date && (
                      <span className="flex items-center text-neutral-400 flex-shrink-0">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{award.date}</span>
                      </span>
                    )}
                  </div>

                  {/* Award Title */}
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 mb-2 leading-snug">
                    {award.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-neutral-300 font-light leading-relaxed line-clamp-3">
                    {award.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Bar */}
              <div className="px-5 py-3.5 bg-neutral-950/60 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400 group-hover:text-amber-400 transition-colors font-mono">
                <span>View Honors Details</span>
                <Sparkles className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AwardModal />
    </section>
  );
};
