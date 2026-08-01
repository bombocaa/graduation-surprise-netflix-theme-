import React from 'react';
import { motion } from 'framer-motion';
import { Play, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import type { Episode } from '../data/types';
import thumbnailImg from '../assets/thumbnail.jpg';

export const ContinueWatching: React.FC = () => {
  const { storyData, setActiveEpisode, progress } = useStory();
  const { episodes } = storyData;

  const isCompleted = (id: number) => progress.completedEpisodes.includes(id);

  return (
    <section id="episodes" className="relative py-12 px-4 md:px-12 bg-neutral-950 text-white overflow-hidden">
      {/* Row Header */}
      <div className="flex items-center justify-between mb-8 max-w-7xl mx-auto">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-red-500 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CONTINUE WATCHING</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
            Documentary Episodes
          </h2>
        </div>

        {/* Progress Tracker */}
        <div className="hidden sm:flex items-center space-x-3 bg-neutral-900/80 px-4 py-2 rounded-xl border border-neutral-800 text-xs text-neutral-300">
          <span>Completion Progress:</span>
          <div className="w-24 h-2 bg-neutral-800 rounded-full overflow-hidden border border-neutral-700">
            <div
              className="h-full bg-gradient-to-r from-red-600 to-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${(progress.completedEpisodes.length / episodes.length) * 100}%` }}
            />
          </div>
          <span className="font-mono text-red-400 font-bold">
            {progress.completedEpisodes.length}/{episodes.length}
          </span>
        </div>
      </div>

      {/* Episodes Grid Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {episodes.map((ep: Episode, index: number) => {
          const completed = isCompleted(ep.id);
          return (
            <motion.div
              key={ep.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              onClick={() => setActiveEpisode(ep)}
              className="group relative bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-red-600/60 shadow-lg hover:shadow-[0_0_30px_rgba(229,9,20,0.3)] transition-all cursor-pointer flex flex-col"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
                <img
                  src={thumbnailImg || ep.thumbnail}
                  alt={ep.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Thumbnail Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/40" />

                {/* Badge Overlay */}
                <div className="absolute top-2 left-2 flex items-center space-x-1.5">
                  <span className="bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono font-bold text-red-500 border border-neutral-700">
                    EP {ep.id}
                  </span>
                  {completed && (
                    <span className="bg-emerald-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono font-bold text-emerald-400 border border-emerald-600/40 flex items-center">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> WATCHED
                    </span>
                  )}
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs">
                  <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-900/60 transform group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-white ml-1" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 flex items-center space-x-1 text-[11px] font-mono text-neutral-300 bg-black/70 px-2 py-0.5 rounded backdrop-blur-md border border-neutral-800">
                  <Clock className="w-3 h-3" />
                  <span>{ep.duration}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                    <span className="text-emerald-400 font-mono">{ep.matchScore}</span>
                    <span>{ep.year}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-red-500 transition-colors line-clamp-1 mb-1">
                    {ep.title}
                  </h3>

                  <p className="text-xs text-neutral-400 line-clamp-2 mb-3 font-light">
                    {ep.subtitle}
                  </p>
                </div>

                {/* Card Progress Bar */}
                <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden mt-2">
                  <div
                    className={`h-full ${
                      completed
                        ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]'
                        : 'bg-red-600 shadow-[0_0_8px_rgba(229,9,20,0.8)]'
                    }`}
                    style={{ width: completed ? '100%' : '35%' }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
