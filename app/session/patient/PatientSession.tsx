"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { PatientSessionWaiting } from "./components";

export default function PatientSession() {
  const [showExitModal, setShowExitModal] = useState(false);
	const sessionData = {
		// Mock session data for patient
		id: "session123",
		patientId: "patient456",
		psychologistId: null, // simulating psychologist not loading in yet
		startTime: new Date().toISOString(),
		endTime: null,
	};

  const handleBack = () => {
    setShowExitModal(true);
  };

  const handleCancelExit = () => {
    setShowExitModal(false);
  };

  const handleConfirmExit = () => {
    setShowExitModal(false);
		redirect("/dashboard/patient");
  };

  // const toggleMic = () => {
  //   setIsMicOn(!isMicOn);
  // };

  // const toggleCamera = () => {
  //   setIsCameraOn(!isCameraOn);
  // };

	return (
		<div className="min-h-screen flex flex-col">
			{/* Navigation */}
        <nav className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
          <button
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          
						<div className="text-center">
							<h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">
								{sessionData.psychologistId ? "Psychologist" : "Loading..."}
							</h1>
							<div className="flex items-center justify-center gap-1.5 mt-0.5">
								<span className="w-2 h-2 rounded-full bg-yellow-400" />
								<span className="text-xs font-medium text-yellow-600">
									{sessionData.psychologistId ? "Online" : "Loading..."}
								</span>
							</div>
						</div>
          
          <div className="w-10"></div>
        </nav>

			{/* Session Content */}
				<main>
					<PatientSessionWaiting /> {/* temporary static waiting component */}
				</main>

			{/* Footer */}
				<footer className="w-full py-6 text-center text-gray-600 dark:text-gray-400 text-sm opacity-60">
					<p>© 2026 LexiREAD. Secure connection established.</p>
				</footer>

			{/* Exit Confirmation Modal */}
        {showExitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/20 mx-auto mb-4">
                <svg className="w-7 h-7 text-red-600 dark:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 text-center mb-2">
                End Session?
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                Are you sure you want to leave? This will end your screening session.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={handleCancelExit}
                  className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-xl font-semibold transition-colors"
                >
                  Stay in Session
                </button>
                
                <button
                  onClick={handleConfirmExit}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-colors"
                >
                  End Session
                </button>
              </div>
            </div>
          </div>
        )}
		</div>
	);
}