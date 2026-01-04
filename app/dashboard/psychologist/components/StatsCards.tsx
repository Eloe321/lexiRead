"use client";

import { memo } from "react";
import {
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useDashboardStore } from "@/app/lib/stores";

interface StatsCardsProps {
  firstName: string;
}

function StatsCardsComponent({ firstName }: StatsCardsProps) {
  // Subscribe only to stats
  const stats = useDashboardStore((state) => state.stats);

  return (
    <>
      {/* Dashboard Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">
          Welcome back, Dr. {firstName}. Here is the latest screening activity.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">Total Patients</p>
            <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
              <Users className="h-4 w-4 text-sky-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {stats.totalPatients}
          </p>
          <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
            <TrendingUp className="h-3 w-3" />
            +5% this month
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">In Progress</p>
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="h-4 w-4 text-orange-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-orange-500">
            {stats.inProgress}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Active screening sessions
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">Completed</p>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.completed}</p>
          <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
            <TrendingUp className="h-3 w-3" />
            +12% vs last week
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">Pending Review</p>
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="h-4 w-4 text-red-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {stats.pendingReview}
          </p>
          <p className="text-xs text-gray-400 mt-1">Needs doctor attention</p>
        </div>
      </div>
    </>
  );
}

// Memoize to prevent unnecessary re-renders
export const StatsCards = memo(StatsCardsComponent);
