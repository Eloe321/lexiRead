'use client';

import { redirect } from "next/navigation";
import { useState } from 'react';

export default function IntroductionContent() {
  const handleStartScreening = () => {
    console.log('Start Screening clicked');
    redirect('/playground/screening');
  };

  const handleBack = () => {
    console.log('Back clicked');
    redirect('/dashboard/patient');
  };

  return (
    <div>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200 flex flex-col">
        {/* Navigation Bar */}
        <nav className="w-full bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={handleBack}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Introduction</h1>
              {/* <div className="w-10 flex items-center justify-center">
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                >
                  {isDark ? '☀️' : '🌙'}
                </button>
              </div> */}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl w-full space-y-12">
            {/* Header Section */}
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4 ring-8 ring-white dark:ring-gray-900 shadow-lg">
                <span className="text-6xl">🧠</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                How the Screening Works
              </h2>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                This short screening helps us understand your reading style. It is not a test with grades, so just relax and do your best.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Card 1: 10-15 Minutes */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 flex flex-col items-start h-full">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mb-4">
                  <span className="text-2xl">⏱️</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">10-15 Minutes</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You can take your time. There is no rush to finish quickly.
                </p>
              </div>

              {/* Card 2: Simple Games */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 flex flex-col items-start h-full">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center mb-4">
                  <span className="text-2xl">🧩</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Simple Games</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You will play 3 simple word activities. Just be yourself.
                </p>
              </div>

              {/* Card 3: Private Results */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 flex flex-col items-start h-full">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Private Results</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your answers are safe. Only you and your parents will see them.
                </p>
              </div>
            </div>

            {/* Start Button */}
            <div className="flex justify-center pt-8 pb-12">
              <button
                onClick={handleStartScreening}
                className="w-full sm:w-auto px-12 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center text-lg gap-2 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              >
                Start Screening
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}