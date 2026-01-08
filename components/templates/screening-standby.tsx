import { useEffect, useState } from 'react';
import { useScreeningStore } from '@/app/lib/stores/screening.store';
import { useSession } from '@/components/templates/screening-flow';
import { VideoFeed } from '@/components/organisms/video-feed';
import { Header } from '@/components/organisms/header';
import { Loader2, Mic, Camera, Monitor, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function ScreeningStandby() {
  const { setStep, connectionStatus, toggleCamera, toggleMic, isCameraEnabled, isMicEnabled } = useScreeningStore();
  const { myStreams, setupCamera, setupScreenShare } = useSession();
  
  const [permissions, setPermissions] = useState({ camera: false, screen: false });

  // Initial Camera Setup
  useEffect(() => {
    if (!myStreams.camera) {
      setupCamera().then(stream => {
        if (stream) setPermissions(p => ({ ...p, camera: true }));
      });
    } else {
      setPermissions(p => ({ ...p, camera: true }));
    }
  }, [myStreams.camera, setupCamera]);

  const handleStartScreenShare = async () => {
    const stream = await setupScreenShare();
    if (stream) setPermissions(p => ({ ...p, screen: true }));
  };

  // Ready state
  const isReady = permissions.camera && permissions.screen && connectionStatus === 'connected';

  const handleStart = () => {
    if (isReady) setStep('challenges');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Header userName="Dr. Smith" status={connectionStatus === 'connected' ? 'online' : 'offline'} showBack />
      
      <main className="grow flex flex-col items-center justify-center p-6 w-full max-w-7xl mx-auto">
        <div className="text-center mb-8 max-w-2xl">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Setup & Standby</h2>
          <p className="text-gray-500">Please enable your camera and share your screen to begin.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mb-8">
          <Card className="p-4 bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-800">
            <div className="aspect-video bg-black rounded-lg overflow-hidden relative mb-4">
              <VideoFeed stream={myStreams.camera} isSelf label="Camera" className="w-full h-full" muted />
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-sm">Camera & Mic</span>
              <div className="flex gap-2">
                <Button
                  variant={isMicEnabled ? 'secondary' : 'destructive'}
                  size="icon"
                  onClick={() => toggleMic(!isMicEnabled)}
                >
                  <Mic className="w-4 h-4" />
                </Button>
                <Button
                  variant={isCameraEnabled ? 'secondary' : 'destructive'}
                  size="icon"
                  onClick={() => toggleCamera(!isCameraEnabled)}
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-800 flex flex-col">
            <div className="aspect-video bg-slate-100 dark:bg-black rounded-lg overflow-hidden relative mb-4 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700">
              {myStreams.screen ? (
                <VideoFeed stream={myStreams.screen} isSelf label="Screen Share" className="w-full h-full" muted />
              ) : (
                <div className="text-center p-6">
                  <Monitor className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 mb-4">Screen share required</p>
                  <Button onClick={handleStartScreenShare}>Share Screen</Button>
                  <p className="text-xs text-blue-500 mt-2">Please select "Current Tab"</p>
                </div>
              )}
            </div>
            <div className="flex justify-between items-center mt-auto">
              <span className="font-semibold text-sm">Screen Recording</span>
              {myStreams.screen && <CheckCircle className="w-5 h-5 text-green-500" />}
            </div>
          </Card>
        </div>

        <div className="w-full max-w-md bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {connectionStatus === 'connected' ? (
                <span className="flex items-center gap-2 text-green-600 font-medium"><CheckCircle className="w-4 h-4" />Doctor Connected</span>
              ) : (
                <span className="flex items-center gap-2 text-amber-500 font-medium animate-pulse"><Loader2 className="w-4 h-4 animate-spin" />Connecting to Doctor...</span>
              )}
            </div>
          </div>

          <Button className="w-full h-12 text-lg font-bold" disabled={!isReady} onClick={handleStart}>
            {isReady ? 'Start Challenges' : 'Complete Setup to Start'}
          </Button>

          {!isReady && (
            <p className="text-xs text-center text-gray-500">Both camera and screen share permissions are required.</p>
          )}
        </div>
      </main>
    </div>
  );
}
