import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStory } from '../context/StoryContext';
import introVideo from '../assets/loading intro.mp4';

export const NetflixIntro: React.FC = () => {
  const { setStage } = useStory();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Play video with audio, or muted fallback if browser autoplay policy blocks unmuted audio
    video.play().catch(() => {
      video.muted = true;
      video.play().catch((err) => console.error(err));
    });
  }, []);

  const handleEnded = () => {
    setStage('welcome');
  };

  const handleSkip = () => {
    setStage('welcome');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden select-none"
    >
      {/* Clean Fullscreen Video */}
      <video
        ref={videoRef}
        src={introVideo}
        autoPlay
        playsInline
        onEnded={handleEnded}
        onError={handleEnded}
        className="w-full h-full object-cover"
      />

      {/* Skip Intro Button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-8 right-8 z-30 px-4 py-2 bg-black/70 hover:bg-black border border-neutral-700 hover:border-white text-xs font-mono tracking-widest text-neutral-300 hover:text-white rounded backdrop-blur-md transition-all cursor-pointer opacity-70 hover:opacity-100"
      >
        SKIP INTRO
      </button>
    </motion.div>
  );
};
