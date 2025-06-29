import { Mood, MusicPlaylist } from '../types';

export const moods: Mood[] = [
  {
    id: 'anxious',
    name: 'Anxious',
    emoji: '😰',
    color: 'from-orange-400 to-red-400',
    description: 'Feeling worried or overwhelmed',
    intensity: 8
  },
  {
    id: 'stressed',
    name: 'Stressed',
    emoji: '😣',
    color: 'from-red-400 to-pink-400',
    description: 'Under pressure and tense',
    intensity: 7
  },
  {
    id: 'sad',
    name: 'Sad',
    emoji: '😢',
    color: 'from-blue-400 to-indigo-400',
    description: 'Feeling down or melancholy',
    intensity: 6
  },
  {
    id: 'neutral',
    name: 'Neutral',
    emoji: '😐',
    color: 'from-gray-400 to-slate-400',
    description: 'Balanced and steady',
    intensity: 5
  },
  {
    id: 'calm',
    name: 'Calm',
    emoji: '😌',
    color: 'from-green-400 to-teal-400',
    description: 'Peaceful and relaxed',
    intensity: 3
  },
  {
    id: 'happy',
    name: 'Happy',
    emoji: '😊',
    color: 'from-yellow-400 to-orange-400',
    description: 'Joyful and content',
    intensity: 2
  },
  {
    id: 'energetic',
    name: 'Energetic',
    emoji: '🤗',
    color: 'from-purple-400 to-pink-400',
    description: 'Full of energy and enthusiasm',
    intensity: 4
  }
];

export const musicPlaylists: MusicPlaylist[] = [
  {
    id: 'anxious-relief',
    name: 'Anxiety Relief',
    mood: 'anxious',
    duration: 1800,
    description: 'Gentle melodies to ease anxiety and promote calm',
    tracks: [
      { 
        id: '1', 
        title: 'Weightless', 
        artist: 'Marconi Union', 
        duration: 508,
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
      },
      { 
        id: '2', 
        title: 'Deep Peace', 
        artist: 'Bill Douglas', 
        duration: 324,
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
      },
      { 
        id: '3', 
        title: 'Aqueous Transmission', 
        artist: 'Incubus', 
        duration: 457,
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
      }
    ]
  },
  {
    id: 'stress-relief',
    name: 'Stress Relief',
    mood: 'stressed',
    duration: 1500,
    description: 'Soothing sounds to melt away tension',
    tracks: [
      { 
        id: '4', 
        title: 'Clair de Lune', 
        artist: 'Claude Debussy', 
        duration: 284,
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
      },
      { 
        id: '5', 
        title: 'River Flows in You', 
        artist: 'Yiruma', 
        duration: 211,
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
      },
      { 
        id: '6', 
        title: 'Gymnopédie No. 1', 
        artist: 'Erik Satie', 
        duration: 197,
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3'
      }
    ]
  },
  {
    id: 'mood-lift',
    name: 'Mood Lifter',
    mood: 'sad',
    duration: 1200,
    description: 'Uplifting tunes to brighten your spirits',
    tracks: [
      { 
        id: '7', 
        title: 'Here Comes the Sun', 
        artist: 'The Beatles', 
        duration: 185,
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3'
      },
      { 
        id: '8', 
        title: 'What a Wonderful World', 
        artist: 'Louis Armstrong', 
        duration: 138,
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'
      },
      { 
        id: '9', 
        title: 'Don\'t Stop Me Now', 
        artist: 'Queen', 
        duration: 209,
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3'
      }
    ]
  },
  {
    id: 'calm-focus',
    name: 'Calm Focus',
    mood: 'calm',
    duration: 1800,
    description: 'Peaceful sounds for meditation and focus',
    tracks: [
      { 
        id: '10', 
        title: 'Ambient Peace', 
        artist: 'Nature Sounds', 
        duration: 600,
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3'
      },
      { 
        id: '11', 
        title: 'Gentle Waves', 
        artist: 'Ocean Sounds', 
        duration: 480,
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3'
      },
      { 
        id: '12', 
        title: 'Forest Whispers', 
        artist: 'Nature Collection', 
        duration: 720,
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3'
      }
    ]
  },
  {
    id: 'happy-vibes',
    name: 'Happy Vibes',
    mood: 'happy',
    duration: 1200,
    description: 'Upbeat tracks to amplify your joy',
    tracks: [
      { 
        id: '13', 
        title: 'Sunshine Day', 
        artist: 'Happy Collective', 
        duration: 240,
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3'
      },
      { 
        id: '14', 
        title: 'Good Vibes Only', 
        artist: 'Positive Energy', 
        duration: 195,
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3'
      },
      { 
        id: '15', 
        title: 'Feel Good Melody', 
        artist: 'Joyful Sounds', 
        duration: 220,
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3'
      }
    ]
  },
  {
    id: 'energetic-boost',
    name: 'Energy Boost',
    mood: 'energetic',
    duration: 1000,
    description: 'High-energy tracks to fuel your enthusiasm',
    tracks: [
      { 
        id: '16', 
        title: 'Power Up', 
        artist: 'Energy Wave', 
        duration: 180,
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3'
      },
      { 
        id: '17', 
        title: 'Dynamic Flow', 
        artist: 'Motion Music', 
        duration: 165,
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
      },
      { 
        id: '18', 
        title: 'Unstoppable', 
        artist: 'Drive Force', 
        duration: 200,
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
      }
    ]
  }
];

export const breathingPatterns = [
  {
    id: 'basic',
    name: '4-7-8 Breathing',
    description: 'Classic relaxation technique',
    inhale: 4,
    hold: 7,
    exhale: 8,
    cycles: 4
  },
  {
    id: 'box',
    name: 'Box Breathing',
    description: 'Equal timing for balance',
    inhale: 4,
    hold: 4,
    exhale: 4,
    cycles: 6
  },
  {
    id: 'coherent',
    name: 'Coherent Breathing',
    description: 'Heart rate variability optimization',
    inhale: 5,
    hold: 0,
    exhale: 5,
    cycles: 10
  }
];