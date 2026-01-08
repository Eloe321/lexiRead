import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Mic, MicOff, Video, VideoOff } from 'lucide-react';

interface VideoFeedProps {
  stream: MediaStream | null;
  muted?: boolean;
  isSelf?: boolean;
  label?: string;
  className?: string;
  isActive?: boolean; // For psychologist view to show active speaker or connection status
}

export function VideoFeed({ stream, muted = false, isSelf = false, label, className, isActive = true }: VideoFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      (videoRef.current as HTMLVideoElement).srcObject = stream;
    }
  }, [stream]);

  return (
    <div className={cn("relative overflow-hidden bg-slate-900 rounded-2xl shadow-lg border border-slate-800", className)}>
      {stream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isSelf || muted} // Always mute self to prevent echo
          className={cn("w-full h-full object-cover", isSelf && "scale-x-[-1]")}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-3 text-slate-500">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
            <VideoOff className="w-8 h-8" />
          </div>
          <span className="text-sm font-medium">No Signal</span>
        </div>
      )}
      
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2">
           {isActive ? <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/> : <div className="w-2 h-2 bg-red-500 rounded-full"/>}
           <span className="text-xs font-medium text-white">{label || 'Unknown'}</span>
        </div>
        
        <div className="flex gap-2">
           <div className={cn("p-2 rounded-full backdrop-blur-md bg-black/40 text-white", muted && "bg-red-500/80")}>
             {muted ? <MicOff className="w-4 h-4"/> : <Mic className="w-4 h-4"/>}
           </div>
        </div>
      </div>
    </div>
  );
}
