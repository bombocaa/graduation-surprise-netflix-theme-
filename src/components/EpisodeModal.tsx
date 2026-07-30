import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, Clock, Calendar, Quote, Sparkles } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const EpisodeModal: React.FC = () => {
  const { activeEpisode, setActiveEpisode, completeEpisode, progress, storyData } = useStory();
  const { episodes } = storyData;

  if (!activeEpisode) return null;

  const isCompleted = progress.completedEpisodes.includes(activeEpisode.id);
  const nextEpisode = episodes.find((ep) => ep.id === activeEpisode.id + 1);

  const handleCompleteAndNext = () => {
    completeEpisode(activeEpisode.id);
    if (nextEpisode) {
      setActiveEpisode(nextEpisode);
    } else {
      setActiveEpisode(null);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/90 backdrop-blur-md">
        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl text-white scrollbar-thin scrollbar-thumb-neutral-800"
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveEpisode(null)}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Hero Banner Header */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-neutral-900">
            <img
              src={activeEpisode.heroImage}
              alt={activeEpisode.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />

            {/* Title overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col items-start">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-red-500 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>EPISODE {activeEpisode.id} OF 5</span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-2 leading-tight">
                {activeEpisode.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-neutral-300">
                <span className="text-emerald-400 font-bold font-mono">{activeEpisode.matchScore}</span>
                <span className="flex items-center text-neutral-400">
                  <Calendar className="w-3.5 h-3.5 mr-1" /> {activeEpisode.year}
                </span>
                <span className="flex items-center text-neutral-400">
                  <Clock className="w-3.5 h-3.5 mr-1" /> {activeEpisode.duration}
                </span>
                {isCompleted && (
                  <span className="flex items-center px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-600/40 font-mono text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Completed
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Modal Body Content */}
          <div className="p-6 md:p-10 space-y-10">
            {/* Summary */}
            <div className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800">
              <p className="text-base sm:text-lg text-neutral-200 font-medium italic leading-relaxed">
                "{activeEpisode.summary}"
              </p>
            </div>

            {/* Full Story Narrative */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 border-b border-neutral-800 pb-2">
                The Chapter Story
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                {activeEpisode.fullStory.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            {/* Milestone Timeline */}
            <div>
              <h2 className="text-xl font-bold text-white mb-6 border-b border-neutral-800 pb-2">
                Milestones & Timeline
              </h2>
              <div className="relative border-l-2 border-red-600/60 ml-4 space-y-6">
                {activeEpisode.timeline.map((item, idx) => (
                  <div key={idx} className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-red-600 border-2 border-black" />
                    <span className="text-xs font-mono text-red-400 font-bold uppercase">{item.year}</span>
                    <h3 className="text-base font-bold text-white mt-0.5">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-neutral-400 font-light mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Parent & Family Quotes */}
            {activeEpisode.quotes && activeEpisode.quotes.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4 border-b border-neutral-800 pb-2">
                  Words of Wisdom
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeEpisode.quotes.map((q, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-red-950/40 to-neutral-900 p-5 rounded-xl border border-red-900/30 flex items-start space-x-3">
                      <Quote className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-neutral-200 italic font-serif">"{q.text}"</p>
                        <p className="text-xs font-mono text-red-400 font-bold mt-2">— {q.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Memories Photo Gallery */}
            {activeEpisode.memories && activeEpisode.memories.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4 border-b border-neutral-800 pb-2">
                  Featured Memories
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeEpisode.memories.map((mem, idx) => (
                    <div key={idx} className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800">
                      <img src={mem.image} alt={mem.title} className="w-full h-44 object-cover" />
                      <div className="p-4">
                        <h3 className="text-sm font-bold text-white">{mem.title}</h3>
                        <p className="text-xs text-neutral-400 mt-1 font-light">{mem.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Complete & Next Action Footer */}
            <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => completeEpisode(activeEpisode.id)}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                  isCompleted
                    ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-600/50'
                    : 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/50'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isCompleted ? 'Marked as Watched' : 'Complete Episode'}</span>
              </button>

              <button
                onClick={handleCompleteAndNext}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-sm flex items-center justify-center space-x-2 border border-neutral-700 transition-all cursor-pointer"
              >
                <span>{nextEpisode ? 'Complete & Watch Next' : 'Finish All Episodes'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
