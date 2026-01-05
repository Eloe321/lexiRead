import React, { useState, useRef, useEffect, memo } from 'react';
import { set } from 'zod';

export function DrawingComponent() {
  const [isDark, setIsDark] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [paths, setPaths] = useState<Array<{ points: Array<{x: number, y: number}>, tool: string }>>([]);
  const [currentPath, setCurrentPath] = useState<Array<{x: number, y: number}>>([]);
  const [currentTest, setCurrentTest] = useState(0);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const tests = [ "Draw the letter B", "Draw a house", "Draw a tree" ];

  const handleSkip = () => {
    setCurrentTest(currentTest + 1);
    console.log('Skip clicked');
  };

  const handlePlaySound = () => {
    console.log('Play sound clicked');
  };

  const handleClearAll = () => {
    setPaths([]);
    setCurrentPath([]);
  };

  const handleDone = () => {
    // Handle saving the drawing here
    setCurrentTest(currentTest + 1);
    console.log('Done clicked');
  };

  const getMousePos = (e: React.MouseEvent | React.TouchEvent) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    const pos = getMousePos(e);
    setCurrentPath([pos]);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    
    const pos = getMousePos(e);
    setCurrentPath(prev => [...prev, pos]);
  };

  const stopDrawing = () => {
    if (isDrawing && currentPath.length > 0) {
      setPaths(prev => [...prev, { points: currentPath, tool }]);
      setCurrentPath([]);
    }
    setIsDrawing(false);
  };

  const pathToSVG = (points: Array<{x: number, y: number}>) => {
    if (points.length < 2) return '';
    
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L ${points[i].x} ${points[i].y}`;
    }
    return d;
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 flex flex-col transition-colors duration-300">
        
        {/* Header */}
        <header className="w-full max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex flex-col items-center">
            <h2 className="font-bold text-lg">Step {currentTest + 1} of {tests.length}</h2>
            <div className="flex gap-2 mt-2">
              {tests.map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-1.5 rounded-full ${i < currentTest + 1 ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                />
              ))}
              {/* <div className="w-8 h-1.5 rounded-full bg-blue-500"></div>
              <div className="w-8 h-1.5 rounded-full bg-blue-500"></div>
              <div className="w-8 h-1.5 rounded-full bg-blue-500"></div>
              <div className="w-8 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="w-8 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700"></div> */}
            </div>
          </div>
          
          <button
            onClick={handleSkip}
            className="font-semibold text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
          >
            Skip
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center max-w-3xl mx-auto w-full px-6 py-4">
          
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="font-bold text-4xl mb-3 tracking-tight">
              Drawing Challenge
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
              Tap the speaker to hear the word
            </p>
          </div>

          {/* Audio Player
          <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm mb-8 flex items-center justify-between border border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <div className="flex items-center gap-5">
              <button className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors group">
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              </button>
              <div className="flex flex-col">
                <span className="font-bold text-xl">Play Sound</span>
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">0:04s • Listen carefully</span>
              </div>
            </div>
            <button
              onClick={handlePlaySound}
              className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all hover:scale-105 active:scale-95"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div> */}

          <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm mb-8 flex items-center justify-center border border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <span className="text-4xl text-gray-600 dark:text-gray-400 font-medium text-center"> {tests[currentTest]} </span>
          </div>

          {/* Drawing Canvas */}
          <div className="w-full relative flex-grow flex flex-col">
            <div
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="relative w-full aspect-[4/3] sm:aspect-video bg-white dark:bg-gray-800 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 overflow-hidden shadow-inner mb-6 group cursor-crosshair"
              style={{
                backgroundImage: 'radial-gradient(circle, #CBD5E1 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            >
              {paths.length === 0 && currentPath.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-40 group-hover:opacity-20 transition-opacity">
                  <svg className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span className="text-xl text-gray-400 dark:text-gray-500">Draw inside the box</span>
                </div>
              )}
              
              <svg
                ref={svgRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {paths.map((path, index) => (
                  <path
                    key={index}
                    d={pathToSVG(path.points)}
                    stroke={path.tool === 'eraser' ? (isDark ? '#1F2937' : '#ffffffff') : (isDark ? '#F9FAFB' : '#111827')}
                    strokeWidth={path.tool === 'eraser' ? 20 : 3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                ))}
                {currentPath.length > 0 && (
                  <path
                    d={pathToSVG(currentPath)}
                    stroke={tool === 'eraser' ? (isDark ? '#1F2937' : '#FFFFFF') : (isDark ? '#F9FAFB' : '#111827')}
                    strokeWidth={tool === 'eraser' ? 20 : 3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                )}
              </svg>
            </div>

            {/* Toolbar */}
            <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
                <button
                  onClick={() => setTool('pen')}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 ${
                    tool === 'pen' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                  title="Pen"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                
                <button
                  onClick={() => setTool('eraser')}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                    tool === 'eraser' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  title="Eraser"
                >
                  <svg className="w-5 h-5 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                
                <div className="w-px h-8 bg-gray-200 dark:bg-gray-600 mx-1"></div>
                
                <button
                  onClick={handleClearAll}
                  className="w-12 h-12 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-600 dark:text-gray-400 hover:text-red-500 flex items-center justify-center transition-colors"
                  title="Clear All"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              
              <button
                onClick={handleDone}
                className="w-full sm:w-auto px-8 py-3.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>I'm Done</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full py-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>
            Screening ID: #8392-DYS • <a className="underline hover:text-blue-500" href="#">Need Help?</a>
          </p>
        </footer>

        {/* Dark Mode Toggle
        <div className="fixed bottom-6 right-6">
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:scale-110 transition-transform z-50"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div> */}
      </div>
    </div>
  );
}

// Memoize to prevent unnecessary re-renders
export const Drawing = memo(DrawingComponent);