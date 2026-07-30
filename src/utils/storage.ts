import type { ProgressState } from '../data/types';

const STORAGE_KEY = 'graduation_netflix_progress_v1';

const defaultState: ProgressState = {
  completedEpisodes: [],
  lettersRead: {
    mom: false,
    dad: false
  },
  hasSeenIntro: false
};

export const getStoredProgress = (): ProgressState => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return defaultState;
    const parsed = JSON.parse(data);
    return {
      completedEpisodes: Array.isArray(parsed.completedEpisodes) ? parsed.completedEpisodes : [],
      lettersRead: {
        mom: Boolean(parsed.lettersRead?.mom),
        dad: Boolean(parsed.lettersRead?.dad)
      },
      hasSeenIntro: Boolean(parsed.hasSeenIntro)
    };
  } catch {
    return defaultState;
  }
};

export const saveProgress = (state: Partial<ProgressState>): ProgressState => {
  try {
    const current = getStoredProgress();
    const updated: ProgressState = {
      ...current,
      ...state,
      lettersRead: {
        ...current.lettersRead,
        ...(state.lettersRead || {})
      }
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return defaultState;
  }
};

export const resetStoredProgress = (): ProgressState => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  return defaultState;
};
