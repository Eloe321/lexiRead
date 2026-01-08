import { useState, useCallback, useEffect } from 'react';

interface MediaStreamState {
  stream: MediaStream | null;
  error: Error | null;
  isLoading: boolean;
  isPermissionGranted: boolean;
}

export const useMediaStream = () => {
  const [cameraState, setCameraState] = useState<MediaStreamState>({
    stream: null,
    error: null,
    isLoading: false,
    isPermissionGranted: false,
  });

  const [screenState, setScreenState] = useState<MediaStreamState>({
    stream: null,
    error: null,
    isLoading: false,
    isPermissionGranted: false,
  });

  const stopStream = (stream: MediaStream | null) => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const initializeCamera = useCallback(async () => {
    setCameraState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
        audio: true,
      });
      setCameraState({
        stream,
        error: null,
        isLoading: false,
        isPermissionGranted: true,
      });
      return stream;
    } catch (err) {
      setCameraState((prev) => ({
        ...prev,
        isLoading: false,
        error: err as Error,
        isPermissionGranted: false,
      }));
      return null;
    }
  }, []);

  const initializeScreenShare = useCallback(async () => {
    setScreenState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      // @ts-ignore - selfBrowserSurface is experimental types
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: "browser" },
        audio: false,
        selfBrowserSurface: "include", // Hint to prefer current tab
        preferCurrentTab: true, 
      } as any);
      setScreenState({
        stream,
        error: null,
        isLoading: false,
        isPermissionGranted: true,
      });
      return stream;
    } catch (err) {
      setScreenState((prev) => ({
        ...prev,
        isLoading: false,
        error: err as Error,
        isPermissionGranted: false,
      }));
      return null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopStream(cameraState.stream);
      stopStream(screenState.stream);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    camera: cameraState,
    screen: screenState,
    initializeCamera,
    initializeScreenShare,
    stopStream,
  };
};