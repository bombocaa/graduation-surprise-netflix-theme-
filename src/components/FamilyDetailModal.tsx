import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles, MessageCircle, Star } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const FamilyDetailModal: React.FC = () => {
  const { activeFamilyMember, setActiveFamilyMember } = useStory();

  if (!activeFamilyMember) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/90 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl text-white scrollbar-thin scrollbar-thumb-neutral-800"
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveFamilyMember(null)}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero Banner Header */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-neutral-900">
            <img
              src={activeFamilyMember.heroImage}
              alt={activeFamilyMember.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-red-950/80 border border-red-600/40 text-red-400 text-xs font-mono mb-2">
                  <Star className="w-3.5 h-3.5 fill-red-400" />
                  <span>STAR CAST & CREW</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
                  {activeFamilyMember.name}
                </h1>
                <p className="text-sm sm:text-base text-red-400 font-medium mt-1">
                  {activeFamilyMember.role}
                </p>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 md:p-8 space-y-8">
            {/* Subtitle / Relationship Tagline */}
            <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-neutral-400">ROLE & RELATIONSHIP</span>
              <span className="text-sm font-bold text-amber-400 font-mono">{activeFamilyMember.relationship}</span>
            </div>

            {/* Bio */}
            <div>
              <h2 className="text-lg font-bold text-white mb-2 flex items-center">
                <Sparkles className="w-4 h-4 text-red-500 mr-2" /> Biography & Impact
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                {activeFamilyMember.bio}
              </p>
            </div>

            {/* Favorite Memory */}
            <div className="bg-gradient-to-r from-red-950/40 to-neutral-900 p-5 rounded-xl border border-red-900/30">
              <h2 className="text-base font-bold text-red-400 mb-2 flex items-center">
                <Heart className="w-4 h-4 text-red-500 mr-2 fill-red-500" /> Favorite Memory
              </h2>
              <p className="text-sm text-neutral-200 italic font-serif">
                "{activeFamilyMember.favoriteMemory}"
              </p>
            </div>

            {/* Thank You Message */}
            <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800">
              <h2 className="text-base font-bold text-white mb-2 flex items-center">
                <MessageCircle className="w-4 h-4 text-emerald-400 mr-2" /> Dedicated Thank You Message
              </h2>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                {activeFamilyMember.thankYouMessage}
              </p>
            </div>

            {/* Photo Gallery */}
            {activeFamilyMember.photos && activeFamilyMember.photos.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-white mb-4">Dedicated Photos</h2>
                <div className="grid grid-cols-2 gap-4">
                  {activeFamilyMember.photos.map((photo, idx) => (
                    <img
                      key={idx}
                      src={photo}
                      alt={`${activeFamilyMember.name} photo ${idx + 1}`}
                      className="w-full h-40 object-cover rounded-xl border border-neutral-800"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
