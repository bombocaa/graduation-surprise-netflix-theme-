import React from 'react';
import { motion } from 'framer-motion';
import { useStory } from '../context/StoryContext';
import type { Award } from '../data/types';
import { AwardModal } from './AwardModal';

export const AwardsSection: React.FC = () => {
  const { storyData, setActiveAward } = useStory();
  const { awards } = storyData;

  return (
    <section id="awards" className="py-16 px-4 md:px-12 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-left">
          <p className="text-xs font-mono uppercase tracking-widest text-amber-500 mb-1 font-semibold">
            COLLEGE HONORS & ACHIEVEMENTS
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight font-sans">
            College Awards & Distinctions
          </h2>
          <p className="text-sm md:text-base text-neutral-400 font-light mt-2 max-w-2xl leading-relaxed">
            A showcase of academic excellence, competition trophies, capstone honors, and leadership distinctions achieved throughout the university journey.
          </p>
        </div>

        {/* Clean Award Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {awards.map((award: Award, index: number) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              onClick={() => setActiveAward(award)}
              className="group relative bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-amber-500/60 shadow-xl cursor-pointer flex flex-col justify-between transition-all"
            >
              <div>
                {/* Clean Top Image Header (No Badges, No Icons) */}
                <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
                  <img
                    src={award.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80'}
                    alt={award.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80" />
                </div>

                {/* Card Details Under Image */}
                <div className="p-5">
                  {/* Clean Issuer & Date Metadata Line */}
                  <div className="text-[11px] font-mono text-neutral-400 mb-2 truncate">
                    <span className="text-amber-400/90 font-medium">{award.issuer || award.category}</span>
                    {award.date && <span className="text-neutral-500 font-normal"> • {award.date}</span>}
                  </div>

                  {/* Award Title */}
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 mb-2 leading-snug font-sans">
                    {award.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-neutral-300 font-light leading-relaxed line-clamp-3">
                    {award.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AwardModal />
    </section>
  );
};
