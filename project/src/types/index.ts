export interface Mood {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
  intensity: number; // 1-10 scale
}

export interface MusicPlaylist {
  id: string;
  name: string;
  mood: string;
  tracks: Track[];
  duration: number;
  description: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  url?: string; // Optional URL for actual audio files
}

export interface WellnessSession {
  id: string;
  type: 'music' | 'breathing' | 'meditation';
  mood: string;
  duration: number;
  timestamp: Date;
  rating?: number;
}

export interface User {
  id: string;
  name: string;
  sessions: WellnessSession[];
  preferences: {
    favoriteGenres: string[];
    defaultSessionLength: number;
  };
}