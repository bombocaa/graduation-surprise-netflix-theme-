/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import Lenis from 'lenis';
import storyDataJson from '../data/storyData.json';
import type { StoryData, Episode, FamilyMember, Award, GalleryPhoto, Letter, ProgressState } from '../data/types';
import { getStoredProgress, saveProgress, resetStoredProgress } from '../utils/storage';
import { soundFX } from '../utils/soundFX';
import confetti from 'canvas-confetti';

export type AppStage = 'loading' | 'intro' | 'welcome' | 'main' | 'ending' | 'credits';
export type AppProfile = 'Mom' | 'Dad' | 'Family' | 'Guest';

interface StoryContextType {
  stage: AppStage;
  setStage: (stage: AppStage) => void;
  selectedProfile: AppProfile;
  setSelectedProfile: (profile: AppProfile) => void;
  storyData: StoryData;
  progress: ProgressState;
  isUnlocked: boolean;
  completeEpisode: (episodeId: number) => void;
  markLetterRead: (letterId: 'mom' | 'dad') => void;
  resetProgress: () => void;
  
  // Modals
  activeEpisode: Episode | null;
  setActiveEpisode: (ep: Episode | null) => void;
  activeFamilyMember: FamilyMember | null;
  setActiveFamilyMember: (fm: FamilyMember | null) => void;
  activeAward: Award | null;
  setActiveAward: (award: Award | null) => void;
  activeGalleryPhoto: GalleryPhoto | null;
  setActiveGalleryPhoto: (photo: GalleryPhoto | null) => void;
  activeLetter: Letter | null;
  setActiveLetter: (letter: Letter | null) => void;
  isEasterEggOpen: boolean;
  setIsEasterEggOpen: (open: boolean) => void;
  
  // Sound
  isMuted: boolean;
  toggleMute: () => void;
  triggerConfetti: () => void;
}

const storyDataTyped = storyDataJson as StoryData;

const StoryContext = createContext<StoryContextType | undefined>(undefined);

export const StoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stage, setStage] = useState<AppStage>('intro');
  const [selectedProfile, setSelectedProfile] = useState<AppProfile>('Mom');
  const [progress, setProgressState] = useState<ProgressState>(getStoredProgress());
  
  // Modals
  const [activeEpisode, setActiveEpisode] = useState<Episode | null>(null);
  const [activeFamilyMember, setActiveFamilyMember] = useState<FamilyMember | null>(null);
  const [activeAward, setActiveAward] = useState<Award | null>(null);
  const [activeGalleryPhoto, setActiveGalleryPhoto] = useState<GalleryPhoto | null>(null);
  const [activeLetter, setActiveLetter] = useState<Letter | null>(null);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState<boolean>(false);
  
  // Audio state
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const totalEpisodes = storyDataTyped.episodes.length;
  const isUnlocked = progress.completedEpisodes.length >= totalEpisodes;

  const triggerConfetti = useCallback(() => {
    soundFX.playUnlockChime();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#e50914', '#f59e0b', '#3b82f6', '#ec4899', '#ffffff']
    });
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Keyboard Shortcuts (N for Easter Egg, C for Confetti, Esc to close modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.key === 'n' || e.key === 'N') {
        soundFX.playTaDum();
        setIsEasterEggOpen(true);
      } else if (e.key === 'c' || e.key === 'C') {
        triggerConfetti();
      } else if (e.key === 'Escape') {
        setActiveEpisode(null);
        setActiveFamilyMember(null);
        setActiveAward(null);
        setActiveGalleryPhoto(null);
        setActiveLetter(null);
        setIsEasterEggOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerConfetti]);

  const completeEpisode = (episodeId: number) => {
    if (progress.completedEpisodes.includes(episodeId)) return;
    const nextCompleted = [...progress.completedEpisodes, episodeId];
    const updated = saveProgress({ completedEpisodes: nextCompleted });
    setProgressState(updated);

    if (nextCompleted.length >= totalEpisodes) {
      triggerConfetti();
    }
  };

  const markLetterRead = (letterId: 'mom' | 'dad') => {
    const updated = saveProgress({
      lettersRead: {
        ...progress.lettersRead,
        [letterId]: true
      }
    });
    setProgressState(updated);
  };

  const resetProgress = () => {
    const reset = resetStoredProgress();
    setProgressState(reset);
    setStage('intro');
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundFX.setMuted(nextMuted);
  };

  return (
    <StoryContext.Provider
      value={{
        stage,
        setStage,
        selectedProfile,
        setSelectedProfile,
        storyData: storyDataTyped,
        progress,
        isUnlocked,
        completeEpisode,
        markLetterRead,
        resetProgress,
        activeEpisode,
        setActiveEpisode,
        activeFamilyMember,
        setActiveFamilyMember,
        activeAward,
        setActiveAward,
        activeGalleryPhoto,
        setActiveGalleryPhoto,
        activeLetter,
        setActiveLetter,
        isEasterEggOpen,
        setIsEasterEggOpen,
        isMuted,
        toggleMute,
        triggerConfetti
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export function useStory() {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error('useStory must be used within a StoryProvider');
  }
  return context;
}
