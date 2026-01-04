"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Settings, HelpCircle, LogOut, Camera, Mic } from "lucide-react";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface PatientDashboardContentProps {
  user: User;
}

export function PatientDashboardContent({
  user,
}: PatientDashboardContentProps) {
  // Get current date info
  const now = new Date();
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const monthDay = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  // Get greeting based on time
  const hour = now.getHours();
  let greeting = "Good Morning";
  if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
  if (hour >= 17) greeting = "Good Evening";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="" />
              <AvatarFallback className="bg-sky-100 text-sky-600 font-medium">
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="font-semibold text-gray-900">
                {user.firstName} {user.lastName.charAt(0)}.
              </span>
              <p className="text-xs text-gray-500">ID: #9821-LK</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Settings className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <HelpCircle className="h-5 w-5" />
            </button>
            <form action="/api/auth/signout" method="POST">
              <Button
                variant="outline"
                size="sm"
                className="text-red-500 border-red-200 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="flex-1 p-6">
        {/* Date & Greeting */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1">
            {dayName}, {monthDay}
          </p>
          <h1 className="text-3xl font-bold text-gray-900">
            {greeting}, {user.firstName}! 👋
          </h1>
          <p className="text-gray-500 mt-2">
            You&apos;re all set for today&apos;s session. Check your equipment
            below and jump right in.
          </p>
        </div>

        {/* Equipment Status */}
        <div className="flex gap-3 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200">
            <Camera className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-gray-700">
              Camera Ready
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200">
            <Mic className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-gray-700">Mic Ready</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Screening Session */}
          <div className="lg:col-span-2 space-y-6">
            {/* Screening Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-6">
                <div className="relative w-40 h-40 rounded-2xl overflow-hidden bg-linear-to-br from-sky-100 to-teal-100 shrink-0">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Doctor illustration placeholder */}
                    <div className="w-32 h-32 bg-linear-to-br from-sky-200 to-teal-200 rounded-xl flex items-center justify-center">
                      <span className="text-4xl">👨‍⚕️</span>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    Invite
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Screening Session
                  </h2>
                  <p className="text-gray-500 mb-4">
                    Dr. Sarah is waiting for you to join the fun games. Get
                    ready to show us your superpowers!
                  </p>
                  <Button className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-6">
                    <span className="mr-2">▶</span>
                    Start Screening
                  </Button>
                </div>
              </div>
            </div>

            {/* Tip of the Day */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-sky-500 text-lg">💡</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Tip of the Day
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Remember to take deep breaths. There is no rush, just do
                    your best! We believe in you.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Trophies & Sessions */}
          <div className="space-y-6">
            {/* Trophies */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Your Trophies</h3>
                <Link
                  href="/trophies"
                  className="text-sm text-sky-500 hover:text-sky-600"
                >
                  See All
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-yellow-500">🏆</span>
                  </div>
                  <p className="text-xs font-medium text-gray-900">
                    Word Wizard
                  </p>
                  <p className="text-xs text-gray-400">Unlocked yesterday</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-purple-500">🎮</span>
                  </div>
                  <p className="text-xs font-medium text-gray-900">3 Games</p>
                  <p className="text-xs text-gray-400">Consistency master</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-sky-500">⭐</span>
                  </div>
                  <p className="text-xs font-medium text-gray-900">
                    Super Star
                  </p>
                  <p className="text-xs text-gray-400">Perfect score</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-gray-400">🔒</span>
                  </div>
                  <p className="text-xs font-medium text-gray-500">Next Goal</p>
                  <p className="text-xs text-gray-400">Keep playing!</p>
                </div>
              </div>
            </div>

            {/* Past Sessions */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">
                Past Sessions
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-500">✓</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Completed Screening
                    </p>
                    <p className="text-xs text-gray-400">Oct 20 • 45m</p>
                  </div>
                  <span className="text-gray-300">›</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-500">⚙</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Setup & Calibration
                    </p>
                    <p className="text-xs text-gray-400">Oct 18 • 15m</p>
                  </div>
                  <span className="text-gray-300">›</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto px-6 py-4 border-t border-gray-200 bg-white">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>© 2023 LexiREAD App v2.4.1 (Build 890)</span>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            Your data is encrypted and stored locally.
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-600">
              Privacy Policy (HIPAA)
            </Link>
            <Link href="/terms" className="hover:text-gray-600">
              Terms of Service
            </Link>
            <Link href="/support" className="hover:text-gray-600">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
