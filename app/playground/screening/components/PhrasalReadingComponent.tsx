import React, { memo, useState } from 'react';

export function PhrasalReadingComponent() {
  const [isDark, setIsDark] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(0);

  const phrases = [
    "The big red dog",
    "ran to the park.",
    "He barked at",
    "a blue bird."
  ];

  // Handle eye tracking logic here

  const handleContinue = () => {
    if (currentPhrase < phrases.length - 1) {
      setCurrentPhrase(currentPhrase + 1);
    } else {
      console.log('Test complete');
    }
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-300">
        
        {/* Background Decorations */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-100 dark:bg-slate-800 rounded-full blur-3xl opacity-50 dark:opacity-20"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-50 dark:bg-slate-900 rounded-full blur-3xl opacity-50 dark:opacity-20"></div>
        </div>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center w-full px-6 max-w-4xl mx-auto relative overflow-hidden">
          
          {/* Instructions */}
          <div className="text-center my-8 md:mb-12 max-w-2xl flex-shrink-0">
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
              Read the text aloud as the blue ring moves.
            </p>
            <p className="mt-2 text-sm text-blue-500 font-medium dark:text-blue-400 flex items-center justify-center">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
              Microphone Active
            </p>
          </div>

          {/* Text Display - Scrollable */}
          <div className="w-full text-center space-y-4 md:space-y-6 overflow-y-auto flex-1 pb-8 px-4">
            {phrases.map((phrase, index) => (
              <div key={index} className={index === 0 ? "relative inline-block" : "block transition-opacity duration-300"}>
                {index === currentPhrase ? (
                  <div className="inline-block border-[3px] border-blue-500 rounded-2xl px-6 py-3 bg-white dark:bg-slate-800 shadow-sm transition-all duration-300">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
                      {phrase}
                    </h1>
                  </div>
                ) : (
                  <h1 className={`text-4xl md:text-6xl font-bold tracking-tight ${
                    index > currentPhrase 
                      ? 'text-gray-400 dark:text-slate-700 opacity-40'
                      : 'text-gray-500 dark:text-slate-600 opacity-60'
                  }`}>
                    {phrase}
                  </h1>
                )}
              </div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full px-6 pb-10 pt-10 flex flex-col items-center justify-end max-w-md mx-auto relative z-10">
          
          {/* Audio Wave Animation */}
          <div className="flex items-center justify-center space-x-1 mb-4 h-12">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className={`w-1.5 rounded-full animate-wave ${
                  i % 2 === 0 ? 'bg-blue-500' : 'bg-blue-300 dark:bg-blue-600'
                }`}
                style={{
                  animation: `wave 1.2s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`
                }}
              ></div>
            ))}
          </div>
          
          <p className="text-blue-500 font-bold tracking-widest text-sm mb-8 uppercase dark:text-blue-400">
            Listening...
          </p>
          
          <button
            onClick={handleContinue}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg shadow-blue-500/20 transform active:scale-95 transition-all duration-200 flex items-center justify-center text-lg group"
          >
            Continue
            <svg className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
          </button>
        </footer>

        {/* Dark Mode Toggle */}
        <div className="fixed bottom-6 right-6">
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:scale-110 transition-transform z-50"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>

        <style>{`
          @keyframes wave {
            0%, 100% { height: 10px; }
            50% { height: 24px; }
          }
          .animate-wave {
            animation: wave 1.2s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  );
}

// Memoize to prevent unnecessary re-renders
export const PhrasalReading = memo(PhrasalReadingComponent);