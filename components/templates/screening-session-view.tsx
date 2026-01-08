'use client';

import { usePeerSession } from '@/app/lib/hooks/use-peer-session';
import { useScreeningStore } from '@/app/lib/stores/screening.store';
import { Header } from '@/components/organisms/header';
import { VideoFeed } from '@/components/organisms/video-feed';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, Video, MonitorUp, Activity, RefreshCw } from 'lucide-react';

export function ScreeningSessionView({ screeningId }: { screeningId: string }) {
  const { myStreams, remoteStreams, logs, connect, setupCamera } = usePeerSession('psychologist');
  const { connectionStatus } = useScreeningStore();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
       <Header title={`Live Observation: ${screeningId}`} status={connectionStatus === 'connected' ? 'online' : 'offline'} userName="Dr. Sarah" />
       
       <main className="grow p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-64px)] overflow-hidden">
          {/* Main Stage - Patient Screen Share */}
          <div className="lg:col-span-3 flex flex-col gap-4 h-full">
            <div className="relative grow bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
               <VideoFeed 
                 stream={remoteStreams.screen} 
                 label="Leo K. (Screen)" 
                 className="w-full h-full absolute inset-0 object-contain bg-black" 
                 isActive={!!remoteStreams.screen}
               />
               
               {/* Overlay if screen not shared yet */}
               {!remoteStreams.screen && connectionStatus === 'connected' && (
                   <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                       <div className="text-center p-6 bg-slate-800 rounded-xl">
                           <MonitorUp className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                           <h2 className="text-xl font-bold">Waiting for Screen Share</h2>
                           <p className="text-slate-400">Patient has not started sharing yet</p>
                       </div>
                   </div>
               )}

               {connectionStatus !== 'connected' && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
                    <div className="text-center">
                       <Activity className="w-12 h-12 text-blue-500 animate-pulse mx-auto mb-4" />
                       <h2 className="text-xl font-bold">Connecting...</h2>
                       <Button variant="outline" size="sm" onClick={connect} className="mt-4 gap-2">
                           <RefreshCw className="w-4 h-4"/> Reconnect
                       </Button>
                    </div>
                 </div>
               )}
               
               {/* PIP - Patient Camera (Overlay on Screen Share) */}
               {remoteStreams.camera && (
                   <div className="absolute top-4 right-4 w-48 aspect-video rounded-lg overflow-hidden border border-white/20 shadow-2xl bg-black">
                       <VideoFeed 
                           stream={remoteStreams.camera} 
                           label="Patient Cam" 
                           className="w-full h-full"
                       />
                   </div>
               )}
            </div>

            {/* Bottom Controls / Stats */}
            <div className="grid grid-cols-3 gap-4 h-32">
               <Card className="bg-slate-900 border-slate-800 p-4 overflow-y-auto text-xs font-mono text-green-400/80">
                 <h3 className="text-slate-400 text-xs font-bold mb-2 sticky top-0 bg-slate-900">SYSTEM LOGS</h3>
                 {logs.map((log, i) => <div key={i}>{log}</div>)}
               </Card>
               {/* ... stats cards ... */}
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
             {/* Self View */}
             <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden border border-slate-800 relative">
                <VideoFeed stream={myStreams.camera} isSelf label="You" className="w-full h-full" />
                {!myStreams.camera && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Button onClick={setupCamera} variant="ghost">Enable Camera</Button>
                    </div>
                )}
             </div>
             
             {/* Controls */}
             {/* ... existing controls ... */}
          </div>
       </main>
    </div>
  );
}