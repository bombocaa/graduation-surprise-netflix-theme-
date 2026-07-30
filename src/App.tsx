import React from 'react';
import { StoryProvider, useStory } from './context/StoryContext';
import { NetflixIntro } from './components/NetflixIntro';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ContinueWatching } from './components/ContinueWatching';
import { EpisodeModal } from './components/EpisodeModal';
import { FamilySection } from './components/FamilySection';
import { AwardsSection } from './components/AwardsSection';
import { BehindTheScenes } from './components/BehindTheScenes';
import { PhotoGallery } from './components/PhotoGallery';
import { LettersSection } from './components/LettersSection';
import { FinalEnding } from './components/FinalEnding';
import { EndCredits } from './components/EndCredits';
import { ParticleBackground } from './components/ParticleBackground';
import { EasterEggModal } from './components/EasterEggModal';
import { GraduationCap, Heart, RotateCcw } from 'lucide-react';

const MainContent: React.FC = () => {
  const { stage, resetProgress } = useStory();

  if (stage === 'intro') {
    return <NetflixIntro />;
  }

  if (stage === 'welcome') {
    return <WelcomeScreen />;
  }

  if (stage === 'ending') {
    return <FinalEnding />;
  }

  if (stage === 'credits') {
    return <EndCredits />;
  }

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Sections Flow */}
      <main className="relative z-10">
        <HeroBanner />
        <ContinueWatching />
        <FamilySection />
        <AwardsSection />
        <BehindTheScenes />
        <PhotoGallery />
        <LettersSection />
      </main>

      {/* Fullscreen Documentary Modals & Easter Egg */}
      <EpisodeModal />
      <EasterEggModal />

      {/* Footer */}
      <footer className="relative z-10 bg-neutral-950 border-t border-neutral-900 py-12 px-6 text-center text-xs text-neutral-400 font-mono">
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2 text-red-600 font-serif font-black text-xl">
            <GraduationCap className="w-5 h-5 text-red-600" />
            <span>NETFLIX GRADUATION DOCUMENTARY</span>
          </div>

          <p className="max-w-md text-neutral-400 font-sans font-light">
            Created with profound gratitude for Mom and Dad. Thank you for making every step of this journey possible.
          </p>

          <div className="flex items-center space-x-4 pt-2">
            <button
              onClick={resetProgress}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Journey Progress</span>
            </button>
          </div>

          <div className="pt-4 text-neutral-600 flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>for Mom & Dad • Class of 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <StoryProvider>
      <MainContent />
    </StoryProvider>
  );
}

export default App;
