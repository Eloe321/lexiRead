"use client";

import { memo, useState } from "react";

function PatientSessionWaitingComponent() {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  return (
    <div>
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8 max-w-7xl mx-auto w-full">
        {/* Title Section */}
        <div className="text-center mb-8 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Screening Standby
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Please wait here. Dr. Smith will join shortly to guide you through the screening.
          </p>
        </div>

        {/* Video Preview */}
        <div className="relative w-full max-w-4xl aspect-video bg-slate-800 dark:bg-black rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center group">
          
          {/* Camera Preview Icon */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm mb-4">
              <svg className="w-16 h-16 md:w-20 md:h-20 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <span className="text-white/30 text-sm font-medium tracking-wider uppercase">
              Camera Preview
            </span>
          </div>

          {/* Video Controls */}
          <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={toggleMic}
                className={`w-14 h-14 rounded-full backdrop-blur-md flex items-center justify-center transition-all border border-white/10 group-hover:scale-105 active:scale-95 shadow-lg ${
                  isMicOn 
                    ? 'bg-gray-700/80 hover:bg-gray-600' 
                    : 'bg-red-600/80 hover:bg-red-500'
                }`}
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  {isMicOn ? (
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1 1.93c-3.94-.49-7-3.85-7-7.93h2c0 3.31 2.69 6 6 6s6-2.69 6-6h2c0 4.08-3.05 7.44-7 7.93V19h4v2H8v-2h4v-3.07z" />
                  ) : (
                    <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z" />
                  )}
                </svg>
              </button>
              <span className="text-white/80 text-xs font-medium">Mic</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <button
                onClick={toggleCamera}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg group-hover:scale-105 active:scale-95 ${
                  isCameraOn
                    ? 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/30'
                    : 'bg-red-600 hover:bg-red-500 shadow-red-500/30'
                }`}
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  {isCameraOn ? (
                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                  ) : (
                    <path d="M21 6.5l-4 4V7c0-.55-.45-1-1-1H9.82L21 17.18V6.5zM3.27 2L2 3.27 4.73 6H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.21 0 .39-.08.54-.18L19.73 21 21 19.73 3.27 2z" />
                  )}
                </svg>
              </button>
              <span className="text-white/80 text-xs font-medium">Camera</span>
            </div>
          </div>

          {/* Picture-in-Picture Placeholder */}
          <div className="absolute top-4 right-4 w-32 md:w-48 aspect-video bg-black/40 rounded-lg border border-white/10 hidden md:block"></div>
        </div>

        {/* Status Section */}
        <div className="w-full max-w-4xl flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full border border-blue-100 dark:border-blue-800/30 shadow-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
            </svg>
            <span className="text-sm font-semibold">Ready to connect</span>
          </div>
          
          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
            Checking bandwidth...
          </p>

          {/* Waiting Card */}
          <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center gap-4 mt-4">
            <svg
              className="w-8 h-8 text-blue-500 animate-spin"
              style={{ animationDuration: '2s' }}
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="text-xl font-semibold text-gray-600 dark:text-gray-300">
              Waiting for Dr. Smith...
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

export const PatientSessionWaiting = memo(PatientSessionWaitingComponent);