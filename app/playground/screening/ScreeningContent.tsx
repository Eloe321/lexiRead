"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import {
  DrawingComponent,
  PhrasalReadingComponent,
} from "./components";


export default function ScreeningContent() {
  const [currentTest, setCurrentTest] = useState(0);

  const components = [
    { name: "Phrasal Reading", Component: PhrasalReadingComponent },
    { name: "Drawing", Component: DrawingComponent },
  ];

  const handleNext = () => {
    if (currentTest < components.length - 1) {
      setCurrentTest(currentTest + 1);
    } else {
      redirect('/playground');
    }
  };

  const handlePrevious = () => {
    if (currentTest > 0) {
      setCurrentTest(currentTest - 1);
    } else {
      redirect('/playground');
    }
  };

  const ActiveComponent = components[currentTest].Component;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <header className="w-full py-4 px-6 bg-white dark:bg-gray-900 shadow-md flex items-center justify-between sticky top-0 z-10">
        <div className="max-w-5xl w-full mx-auto flex items-center justify-between">
          <button onClick={handlePrevious} className="text-gray-900 dark:text-gray-100 hover:bg-slate-200 dark:hover:bg-slate-800 p-2 rounded-full transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="hidden md:flex flex-col items-center">
            <span className="text-sm font-bold text-gray-500 dark:text-gray-400 tracking-widest uppercase">
              {components[currentTest].name}
            </span>
          </div>

          <span className="text-sm font-bold text-gray-500 dark:text-gray-400 tracking-widest">
            TEST {currentTest + 1} OF {components.length}
          </span>

          <button onClick={handleNext} className="text-gray-900 dark:text-gray-100 hover:bg-slate-200 dark:hover:bg-slate-800 p-2 rounded-full transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </header>

      <main className="flex-1 min-h-0 overflow-auto max-w-5xl w-full mx-auto px-6">
        <div className="w-full h-full flex flex-col">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
} 