import React from 'react';
import { motion } from 'framer-motion';
import { Camera, MessageSquare } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const BehindTheScenes: React.FC = () => {
  const { storyData } = useStory();
  const { behindTheScenes } = storyData;

  return (
    <section id="bts" className="py-16 px-4 md:px-12 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 text-left">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-red-500 mb-1">
            <Camera className="w-3.5 h-3.5" />
            <span>BEHIND THE SCENES</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Director's Bloopers & Uncut Moments
          </h2>
          <p className="text-sm md:text-base text-neutral-400 font-light mt-2 max-w-xl">
            The raw, unscripted footage: late-night coffee cups, debugging meltdowns, cap & gown fitting rehearsals, and real family moments.
          </p>
        </div>

        {/* BTS Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {behindTheScenes.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 flex flex-col justify-between shadow-lg"
            >
              {/* Image Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] font-mono text-red-400 font-bold border border-neutral-700">
                  {item.category}
                </div>
              </div>

              {/* Details & Director's Note */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light mb-4">
                    {item.caption}
                  </p>
                </div>

                {/* Director's Commentary Note */}
                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-xs text-neutral-300 font-light">
                  <div className="flex items-center space-x-1 text-[10px] font-mono text-red-400 font-bold mb-1 uppercase">
                    <MessageSquare className="w-3 h-3" />
                    <span>Director's Note</span>
                  </div>
                  <p className="italic font-serif text-neutral-300">"{item.directorNote}"</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
