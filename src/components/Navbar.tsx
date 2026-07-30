import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, RotateCcw, Lock, Unlock, GraduationCap } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const Navbar: React.FC = () => {
  const { isUnlocked, isMuted, toggleMute, setStage, progress } = useStory();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplayIntro = () => {
    setStage('intro');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/60 py-3 shadow-lg'
          : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Left Section: Logo & Links */}
        <div className="flex items-center space-x-6 md:space-x-10">
          {/* Netflix Style Graduation Logo */}
          <div
            onClick={() => scrollToSection('hero')}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-red-600 shadow-[0_0_15px_rgba(229,9,20,0.8)] group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-black font-serif tracking-tighter text-red-600 group-hover:text-red-500 transition-colors">
              NETFLIX
            </span>
          </div>

          {/* Navigation Links */}
          <ul className="hidden lg:flex items-center space-x-6 text-sm font-medium text-neutral-300">
            <li>
              <button
                onClick={() => scrollToSection('hero')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('episodes')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Episodes
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('family')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Family
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('awards')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Awards
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('bts')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Behind Scenes
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('gallery')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Gallery
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('letters')}
                className="flex items-center space-x-1.5 hover:text-white transition-colors cursor-pointer"
              >
                <span>Letters</span>
                {isUnlocked ? (
                  <span className="inline-flex items-center text-xs px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    <Unlock className="w-3 h-3 mr-0.5" /> Unlocked
                  </span>
                ) : (
                  <span className="inline-flex items-center text-xs px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
                    <Lock className="w-3 h-3 mr-0.5 text-red-400" /> {progress.completedEpisodes.length}/5
                  </span>
                )}
              </button>
            </li>
          </ul>
        </div>

        {/* Right Section: Audio, Replay, Avatar */}
        <div className="flex items-center space-x-3 md:space-x-4">
          {/* Mute Toggle */}
          <button
            onClick={toggleMute}
            className="p-2 rounded-full bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Replay Intro */}
          <button
            onClick={handleReplayIntro}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 text-xs font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Replay Netflix Intro"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay Intro</span>
          </button>

          {/* Profile Avatar */}
          <div 
            onClick={() => scrollToSection('family')}
            className="w-8 h-8 rounded bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center font-bold text-xs text-white cursor-pointer shadow-md shadow-red-900/40 hover:scale-105 transition-transform"
            title="Family Profile"
          >
            M&D
          </div>
        </div>
      </div>
    </nav>
  );
};
