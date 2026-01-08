import { useScreeningStore } from '@/app/lib/stores/screening.store';
import { useSession } from '@/components/templates/screening-flow';
import { ProgressIndicator } from '@/components/atoms/progress-indicator';
import { VideoFeed } from '@/components/organisms/video-feed';
import { X, Wifi, Monitor, Video as VideoIcon, VideoOff } from 'lucide-react';
import dynamic from 'next/dynamic';

const DrawingCanvasDynamic = dynamic(() => import('@/components/organisms/drawing-canvas').then(mod => mod.DrawingCanvas), { ssr: false });

export function DrawingChallenge() {
  const { challenges, currentChallengeIndex, setStep, connectionStatus } = useScreeningStore();
  const { remoteStreams, myStreams } = useSession();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <header className="w-full max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <button onClick={() => setStep('intro')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
           <X className="w-6 h-6 text-gray-500" />
        </button>
        
        <div className="flex flex-col items-center">
           <span className="font-bold text-gray-900 dark:text-white">Step {currentChallengeIndex + 1} of {challenges.length}</span>
           <ProgressIndicator total={challenges.length} current={currentChallengeIndex} className="mt-2" />
        </div>

        <div className="flex items-center gap-4">
             {/* Status Indicators */}
             <div className="flex gap-2 bg-white dark:bg-slate-900 p-2 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm">
                 <div className={`p-1.5 rounded-full ${myStreams.camera ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                     {myStreams.camera ? <VideoIcon className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                 </div>
                 <div className={`p-1.5 rounded-full ${myStreams.screen ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                     <Monitor className="w-4 h-4" />
                 </div>
                 <div className={`p-1.5 rounded-full ${connectionStatus === 'connected' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                     <Wifi className="w-4 h-4" />
                 </div>
             </div>
             
             {/* Dr. PIP */}
             {remoteStreams.camera && (
                <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-white shadow-lg relative bg-black hidden sm:block">
                    <VideoFeed stream={remoteStreams.camera} className="w-full h-full" label="Dr." />
                </div>
             )}
        </div>
      </header>

      <main className="grow flex flex-col items-center justify-center p-4">
        <div className="mb-6 text-center">
           <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{challenges[currentChallengeIndex].name}</h1>
           <p className="text-gray-500 text-lg">{challenges[currentChallengeIndex].instruction}</p>
        </div>
        <DrawingCanvasDynamic />
      </main>
    </div>
  );
}