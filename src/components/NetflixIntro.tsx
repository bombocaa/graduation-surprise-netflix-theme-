import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStory } from '../context/StoryContext';
import introVideo from '../assets/intro.mp4';

export const NetflixIntro: React.FC = () => {
  const { setStage } = useStory();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt unmuted play first; if Chrome/browser policy blocks unmuted audio on load, play muted so video never freezes!
    video.muted = false;
    video.volume = 1.0;

    video.play().catch(() => {
      video.muted = true;
      video.play().catch((err) => console.error('Video autoplay error:', err));
    });
  }, []);

  const handleEnded = () => {
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
      {/* Clean Fullscreen Video - Guaranteed Autoplay */}
      <video
        ref={videoRef}
        src={introVideo}
        autoPlay
        playsInline
        onEnded={handleEnded}
        onError={handleEnded}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};
