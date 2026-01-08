import { create } from 'zustand';

export type ScreeningStep = 'intro' | 'standby' | 'challenges';
export type ConnectionStatus = 'idle' | 'connecting' | 'connected' | 'disconnected' | 'error';
export type ChallengeShape = 'square' | 'circle' | 'triangle' | 'diamond' | 'house';

interface Challenge {
  id: string;
  name: string;
  instruction: string;
  shape: ChallengeShape;
}

interface ScreeningState {
  // Session State
  step: ScreeningStep;
  connectionStatus: ConnectionStatus;
  error: string | null;
  
  // Media State (Local)
  isCameraEnabled: boolean;
  isMicEnabled: boolean;
  isScreenShareEnabled: boolean;
  
  // Challenge State
  challenges: Challenge[];
  currentChallengeIndex: number;
  
  // Actions
  setStep: (step: ScreeningStep) => void;
  setConnectionStatus: (status: ConnectionStatus) => void;
  setError: (error: string | null) => void;
  toggleCamera: (enabled: boolean) => void;
  toggleMic: (enabled: boolean) => void;
  toggleScreenShare: (enabled: boolean) => void;
  nextChallenge: () => void;
  resetScreening: () => void;
}

export const MOCK_CHALLENGES: Challenge[] = [
  { id: '1', name: 'Square', instruction: 'Draw a square box', shape: 'square' },
  { id: '2', name: 'Circle', instruction: 'Draw a perfect round circle', shape: 'circle' },
  { id: '3', name: 'Triangle', instruction: 'Draw a triangle with three sides', shape: 'triangle' },
  { id: '4', name: 'Diamond', instruction: 'Draw a diamond shape', shape: 'diamond' },
  { id: '5', name: 'House', instruction: 'Draw a simple house', shape: 'house' },
];

export const useScreeningStore = create<ScreeningState>((set) => ({
  step: 'intro',
  connectionStatus: 'idle',
  error: null,
  isCameraEnabled: true,
  isMicEnabled: true,
  isScreenShareEnabled: false,
  challenges: MOCK_CHALLENGES,
  currentChallengeIndex: 0,

  setStep: (step) => set({ step }),
  setConnectionStatus: (status) => set({ connectionStatus: status }),
  setError: (error) => set({ error }),
  toggleCamera: (enabled) => set({ isCameraEnabled: enabled }),
  toggleMic: (enabled) => set({ isMicEnabled: enabled }),
  toggleScreenShare: (enabled) => set({ isScreenShareEnabled: enabled }),
  nextChallenge: () => set((state) => ({ 
    currentChallengeIndex: Math.min(state.currentChallengeIndex + 1, state.challenges.length - 1) 
  })),
  resetScreening: () => set({ 
    step: 'intro', 
    currentChallengeIndex: 0, 
    connectionStatus: 'idle',
    error: null 
  }),
}));