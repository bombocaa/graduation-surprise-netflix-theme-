import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { soundFX } from '../utils/soundFX';

export const LetterDetailModal: React.FC = () => {
  const { activeLetter, setActiveLetter, markLetterRead, setStage } = useStory();

  if (!activeLetter) return null;

  return (
    <LetterModalContent
      activeLetter={activeLetter}
      setActiveLetter={setActiveLetter}
      markLetterRead={markLetterRead}
      setStage={setStage}
    />
  );
};

const LetterModalContent: React.FC<{
  activeLetter: NonNullable<ReturnType<typeof useStory>['activeLetter']>;
  setActiveLetter: (letter: null) => void;
  markLetterRead: (id: 'mom' | 'dad') => void;
  setStage: (stage: 'ending') => void;
}> = ({ activeLetter, setActiveLetter, markLetterRead, setStage }) => {
  const [typedParagraphs, setTypedParagraphs] = useState<string[]>([]);
  const [currentParaIndex, setCurrentParaIndex] = useState<number>(0);

  useEffect(() => {
    soundFX.playPaperRustle();
    soundFX.startBackgroundMusic();
    markLetterRead(activeLetter.id);

    return () => {
      soundFX.stopBackgroundMusic();
    };
  }, [activeLetter.id, markLetterRead]);

  useEffect(() => {
    if (currentParaIndex < activeLetter.letterContent.length) {
      const timer = setTimeout(() => {
        setTypedParagraphs((prev) => [...prev, activeLetter.letterContent[currentParaIndex]]);
        setCurrentParaIndex((prev) => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [activeLetter.letterContent, currentParaIndex]);

  const handleProceedToFinale = () => {
    setActiveLetter(null);
    setStage('ending');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-lg overflow-y-auto">
        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-amber-50/95 border-4 border-amber-900/30 rounded-3xl p-6 sm:p-10 text-amber-950 shadow-[0_0_100px_rgba(229,9,20,0.4)] scrollbar-thin scrollbar-thumb-amber-900/30"
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveLetter(null)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-amber-900/10 hover:bg-amber-900/20 text-amber-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Letter Header Stamp */}
          <div className="flex items-center justify-between border-b-2 border-amber-900/20 pb-4 mb-6">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-red-700 uppercase">
                {activeLetter.subtitle}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold font-serif text-amber-950 mt-1">
                {activeLetter.title}
              </h1>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-700 text-amber-100 flex items-center justify-center font-serif font-black text-xl shadow-md border-2 border-amber-200">
              <Heart className="w-6 h-6 fill-amber-100" />
            </div>
          </div>

          {/* Letter Body / Typewriter Paragraphs */}
          <div className="space-y-4 text-base sm:text-lg font-serif leading-relaxed text-amber-900 min-h-[250px]">
            {typedParagraphs.map((para, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={idx === 0 ? 'font-bold text-xl text-amber-950' : ''}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Letter Sign-off Footer */}
          <div className="mt-10 pt-6 border-t-2 border-amber-900/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <img
                src={activeLetter.photoUrl}
                alt={activeLetter.recipient}
                className="w-16 h-16 rounded-full object-cover border-2 border-amber-800 shadow-md"
              />
              <div>
                <p className="text-base font-bold font-serif text-amber-950">{activeLetter.signature}</p>
                <p className="text-xs font-mono text-amber-800">{activeLetter.date}</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleProceedToFinale}
              className="px-6 py-3.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-sans font-bold text-sm tracking-wide flex items-center space-x-2 shadow-lg shadow-red-900/40 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Proceed to Documentary Finale</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
