import { useEffect, useState, useRef, useCallback } from 'react';
import Peer, { MediaConnection, DataConnection } from 'peerjs';
import { useScreeningStore } from '@/app/lib/stores/screening.store';

// Static IDs for mocking
const PATIENT_PEER_ID = 'lexiread-patient-mock-id';
const PSYCHOLOGIST_PEER_ID = 'lexiread-psychologist-mock-id';

type Role = 'patient' | 'psychologist';

export const usePeerSession = (role: Role) => {
  const { 
    setConnectionStatus, 
    setError, 
    connectionStatus,
    setStep
  } = useScreeningStore();

  const [myStreams, setMyStreams] = useState<{ camera: MediaStream | null; screen: MediaStream | null }>({ camera: null, screen: null });
  const [remoteStreams, setRemoteStreams] = useState<{ camera: MediaStream | null; screen: MediaStream | null }>({ camera: null, screen: null });
  const [logs, setLogs] = useState<string[]>([]);
  
  const peerRef = useRef<Peer | null>(null);
  const callsRef = useRef<MediaConnection[]>([]);
  const connRef = useRef<DataConnection | null>(null);

  const addLog = (msg: string) => {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    const logMsg = `[${timestamp}] ${msg}`;
    // Also keep logs in state so UI can show them
    setLogs(prev => [...prev.slice(-19), logMsg]);
    console.log(logMsg);
  };

  // --- 1. Media Setup ---

  const setupCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      addLog('Camera/Mic acquired');
      setMyStreams(prev => ({ ...prev, camera: stream }));
      return stream;
    } catch (err: any) {
      addLog(`Camera Error: ${err?.message || err}`);
      setError('Camera access denied');
      return null;
    }
  }, [setError]);

  const callPeer = (stream: MediaStream, type: 'camera' | 'screen') => {
    if (!peerRef.current) return;
    const targetId = role === 'patient' ? PSYCHOLOGIST_PEER_ID : PATIENT_PEER_ID; // Assuming 1:1
    
    addLog(`Calling ${targetId} (${type} stream)...`);
    const call = peerRef.current.call(targetId, stream, {
      metadata: { type }
    });
    
    callsRef.current.push(call);

    // Attach handlers so if remote answers with streams, they're handled
    handleIncomingStream(call, type);
  };

  const setupScreenShare = useCallback(async () => {
    try {
      // @ts-ignore newer constraints in some browsers
      const stream = await (navigator.mediaDevices as any).getDisplayMedia({
        video: {
          displaySurface: 'browser',
        } as MediaTrackConstraints,
        audio: false,
        // @ts-ignore - 'selfBrowserSurface' is newer standard
        selfBrowserSurface: 'include',
        preferCurrentTab: true,
      });

      addLog('Screen share acquired');
      setMyStreams(prev => ({ ...prev, screen: stream }));
      // Handle user stopping share via browser UI
      const vt = stream.getVideoTracks()[0];
      if (vt) {
        vt.onended = () => {
          addLog('User stopped screen share');
          setMyStreams(prev => ({ ...prev, screen: null }));
        };
      }

      // If already connected, call again to add this stream
      if (role === 'patient' && connectionStatus === 'connected' && peerRef.current) {
        callPeer(stream, 'screen');
      }

      return stream;
    } catch (err: any) {
      addLog(`Screen Share Error: ${err?.message || err}`);
      return null;
    }
  }, [role, connectionStatus]);

  // --- 2. Peer Setup & Connection ---

  const initPeer = useCallback(() => {
    if (peerRef.current) return;
    
    const myId = role === 'patient' ? PATIENT_PEER_ID : PSYCHOLOGIST_PEER_ID;
    addLog(`Initializing Peer as ${myId}...`);

    const peer = new Peer(myId, { debug: 1 });
    peerRef.current = peer;

    peer.on('open', (id) => {
      addLog(`Peer Open. ID: ${id}`);
      setConnectionStatus('idle');
      
      if (role === 'psychologist') {
        // Psych initiates data channel
        connectToPatient();
      }
    });

    peer.on('call', (call) => {
      addLog(`Incoming call from ${call.peer}`);
      const isScreenCall = (call.metadata as any)?.type === 'screen';

      // Answer to receive remote stream; Psych usually answers
      try {
        // answer with no stream (receive-only) if psych, or answer with camera if psych sends anything
        call.answer();
        handleIncomingStream(call, isScreenCall ? 'screen' : 'camera');
      } catch (err: any) {
        addLog(`Call answer failed: ${err?.message || err}`);
      }
    });

    peer.on('connection', (conn) => {
      addLog(`Data connection from ${conn.peer}`);
      setupDataConnection(conn);
    });

    peer.on('disconnected', () => {
      addLog('Peer disconnected from server');
      setConnectionStatus('disconnected');
      setTimeout(() => {
        if (peerRef.current && !peerRef.current.destroyed) {
          addLog('Attempting reconnect...');
          try {
            (peerRef.current as any).reconnect();
          } catch (err) {
            addLog(`Reconnect failed: ${err}`);
          }
        }
      }, 3000);
    });

    peer.on('error', (err: any) => {
      addLog(`Peer Error: ${err?.type || 'unknown'} - ${err?.message || err}`);
      setConnectionStatus('error');
    });

  }, [role, setConnectionStatus]);

  const connectToPatient = () => {
    if (!peerRef.current) return;
    addLog('Initiating data connection to Patient...');
    const conn = peerRef.current.connect(PATIENT_PEER_ID);
    setupDataConnection(conn);
  };

  const setupDataConnection = (conn: DataConnection) => {
    connRef.current = conn;
    conn.on('open', () => {
      addLog('Data Connection Established');
      setConnectionStatus('connected');
    });

    conn.on('data', (data: any) => {
      // Handle signaling
      if (data?.type === 'STEP_CHANGE') {
        addLog(`Remote Step Change: ${data.step}`);
      }
    });

    conn.on('close', () => {
      addLog('Data Connection Closed');
      setConnectionStatus('disconnected');
    });
    
    conn.on('error', (err) => {
      addLog(`Data Conn Error: ${err}`);
    });
  };

  const handleIncomingStream = (call: MediaConnection, type: 'camera' | 'screen') => {
    call.on('stream', (remoteStream) => {
      addLog(`Received remote ${type} stream`);
      setRemoteStreams(prev => ({ ...prev, [type]: remoteStream }));
    });
    
    call.on('close', () => {
      addLog(`Remote ${type} stream closed`);
      setRemoteStreams(prev => ({ ...prev, [type]: null }));
    });

    call.on('error', (err) => {
      addLog(`Call Error (${type}): ${err}`);
    });
  };

  // --- 3. Public Actions ---
  const startSession = async () => {
    if (role === 'patient') {
      if (connectionStatus === 'connected' && myStreams.camera) {
        callPeer(myStreams.camera, 'camera');
        if (myStreams.screen) callPeer(myStreams.screen, 'screen');
      }
    }
  };

  // When data connection opens and streams are ready, call
  useEffect(() => {
    if (connectionStatus === 'connected' && role === 'patient') {
      if (myStreams.camera) callPeer(myStreams.camera, 'camera');
      if (myStreams.screen) callPeer(myStreams.screen, 'screen');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionStatus, role]);

  // Initialize peer on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      initPeer();
    }
    return () => {
      // Keep peer alive for session persistence; only cleanup if explicitly needed
    };
  }, [initPeer]);

  return {
    myStreams,
    remoteStreams,
    setupCamera,
    setupScreenShare,
    logs,
    connect: initPeer,
    startSession,
  };
};