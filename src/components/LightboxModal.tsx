import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const LightboxModal: React.FC = () => {
  const { activeGalleryPhoto, setActiveGalleryPhoto, storyData } = useStory();
  const { gallery } = storyData;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeGalleryPhoto) return;
      const currentIndex = gallery.findIndex((p) => p.id === activeGalleryPhoto.id);

      if (e.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % gallery.length;
        setActiveGalleryPhoto(gallery[nextIndex]);
      } else if (e.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + gallery.length) % gallery.length;
        setActiveGalleryPhoto(gallery[prevIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGalleryPhoto, gallery, setActiveGalleryPhoto]);

  if (!activeGalleryPhoto) return null;

  const currentIndex = gallery.findIndex((p) => p.id === activeGalleryPhoto.id);

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + gallery.length) % gallery.length;
    setActiveGalleryPhoto(gallery[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % gallery.length;
    setActiveGalleryPhoto(gallery[nextIndex]);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/95 backdrop-blur-md">
        {/* Close Button */}
        <button
          onClick={() => setActiveGalleryPhoto(null)}
          className="absolute top-4 right-4 z-50 p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Modal Card */}
        <motion.div
          key={activeGalleryPhoto.id}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.25 }}
          className="relative max-w-4xl w-full max-h-[90vh] bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
        >
          {/* Image Left / Top */}
          <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] md:min-h-[450px]">
            <img
              src={activeGalleryPhoto.url}
              alt={activeGalleryPhoto.title}
              className="max-h-[70vh] w-full object-contain"
            />
          </div>

          {/* Details Right / Bottom */}
          <div className="w-full md:w-80 p-6 bg-neutral-900 flex flex-col justify-between border-t md:border-t-0 md:border-l border-neutral-800">
            <div>
              <span className="text-xs font-mono uppercase text-red-400 font-bold tracking-widest">
                {activeGalleryPhoto.category}
              </span>
              <h2 className="text-xl font-bold text-white mt-1 mb-3">
                {activeGalleryPhoto.title}
              </h2>

              <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6 italic font-serif">
                "{activeGalleryPhoto.caption}"
              </p>

              <div className="space-y-2 text-xs font-mono text-neutral-400">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{activeGalleryPhoto.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{activeGalleryPhoto.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 text-xs text-neutral-500 font-mono text-center">
              Use ← → arrow keys to navigate
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
