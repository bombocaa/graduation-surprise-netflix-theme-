export interface Episode {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  year: string;
  matchScore: string;
  thumbnail: string;
  heroImage: string;
  summary: string;
  fullStory: string[];
  timeline: {
    year: string;
    title: string;
    description: string;
  }[];
  quotes: {
    text: string;
    author: string;
  }[];
  memories: {
    title: string;
    description: string;
    image: string;
  }[];
  videoUrl?: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  role: string;
  subtitle: string;
  avatar: string;
  heroImage: string;
  relationship: string;
  bio: string;
  favoriteMemory: string;
  thankYouMessage: string;
  photos: string[];
}

export interface Award {
  id: string;
  title: string;
  recipient: string;
  category: string;
  iconName: string;
  badge: string;
  description: string;
  speech: string;
  statuetteColor: string;
  image?: string;
  issuer?: string;
  date?: string;
}

export interface BehindTheSceneItem {
  id: string;
  title: string;
  category: string;
  caption: string;
  image: string;
  directorNote: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'all' | 'childhood' | 'school' | 'family' | 'graduation';
  url: string;
  caption: string;
  date: string;
  location: string;
}

export interface Letter {
  id: 'mom' | 'dad';
  recipient: string;
  title: string;
  subtitle: string;
  envelopeColor: string;
  waxSealColor: string;
  letterContent: string[];
  photoUrl: string;
  signature: string;
  date: string;
}

export interface StoryData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    graduationDate: string;
    degree: string;
    university: string;
    heroImage: string;
    heroVideo?: string;
    youtubeId?: string;
  };
  welcome: {
    title: string;
    subtitle: string;
    greeting: string;
    quote: string;
  };
  episodes: Episode[];
  family: FamilyMember[];
  awards: Award[];
  behindTheScenes: BehindTheSceneItem[];
  gallery: GalleryPhoto[];
  letters: Letter[];
  credits: {
    director: string;
    producers: string[];
    cast: { role: string; name: string }[];
    specialThanks: string[];
    music: string[];
    dedication: string;
  };
}

export interface ProgressState {
  completedEpisodes: number[];
  lettersRead: {
    mom: boolean;
    dad: boolean;
  };
  hasSeenIntro: boolean;
}
