import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award as AwardIcon, HeartHandshake, Crown, Sparkles } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import type { Award } from '../data/types';
import { AwardModal } from './AwardModal';

export const AwardsSection: React.FC = () => {
  const { storyData, setActiveAward } = useStory();
  const { awards } = storyData;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-8 h-8 text-amber-400" />;
      case 'Trophy':
        return <Trophy className="w-8 h-8 text-amber-400" />;
      case 'Crown':
        return <Crown className="w-8 h-8 text-amber-400" />;
      default:
        return <AwardIcon className="w-8 h-8 text-amber-400" />;
    }
  };

  return (
    <section id="awards" className="py-16 px-4 md:px-12 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-left">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-1">
            <Trophy className="w-3.5 h-3.5" />
            <span>HONORS & AWARDS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            The Graduation Film Awards
          </h2>
          <p className="text-sm md:text-base text-neutral-400 font-light mt-2 max-w-xl">
            Recognizing the extraordinary contributions, sacrifices, and unconditional support that earned the highest honors in our family history.
          </p>
        </div>

        {/* Awards Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {awards.map((award: Award, index: number) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              onClick={() => setActiveAward(award)}
              className="group relative bg-neutral-900 rounded-2xl p-6 border border-neutral-800 hover:border-amber-500/60 shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] cursor-pointer flex flex-col justify-between transition-all"
            >
              <div>
                {/* Statuette Graphic */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-tr ${award.statuetteColor} border border-amber-400/30 shadow-md`}>
                    {getIcon(award.iconName)}
                  </div>
                  <span className="px-2.5 py-1 rounded bg-amber-950/60 border border-amber-600/40 text-[10px] font-mono text-amber-400 font-bold tracking-widest uppercase">
                    {award.badge}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-white group-hover:text-amber-400 transition-colors mb-1">
                  {award.title}
                </h3>

                <p className="text-xs font-bold text-amber-400 font-mono mb-3">
                  Honoree: {award.recipient}
                </p>

                <p className="text-xs text-neutral-400 font-light line-clamp-3 leading-relaxed">
                  {award.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400 group-hover:text-amber-400 transition-colors font-mono">
                <span>View Presentation</span>
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
