'use client';

import { createContext, useContext } from 'react';
import { useScreeningStore } from '@/app/lib/stores/screening.store';
import { usePeerSession } from '@/app/lib/hooks/use-peer-session';
import { ScreeningIntro } from './screening-intro';
import { ScreeningStandby } from './screening-standby';
import { DrawingChallenge } from './drawing-challenge';

// Context to share the persistent session
interface SessionContextType {
  session: ReturnType<typeof usePeerSession>;
}

const SessionContext = createContext<SessionContextType | null>(null);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) throw new Error('useSession must be used within ScreeningFlow');
  return context.session;
};

export function ScreeningFlow() {
  const { step } = useScreeningStore();
  // Initialize hook here - it persists as long as ScreeningFlow is mounted
  const session = usePeerSession('patient');

  return (
    <SessionContext.Provider value={{ session }}>
      <div className="w-full h-full">
        {step === 'intro' && <ScreeningIntro />}
        {step === 'standby' && <ScreeningStandby />}
        {step === 'challenges' && <DrawingChallenge />}
      </div>

      {/* Hidden Debug Overlay (Optional) */}
      <div className="fixed bottom-0 left-0 bg-black/80 text-green-400 text-xs p-2 max-h-32 overflow-y-auto w-64 opacity-50 hover:opacity-100 z-100 pointer-events-none hover:pointer-events-auto">
        {session.logs.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </SessionContext.Provider>
  );
}
