"use client";

import { memo, useCallback } from "react";
import { Bell, Search } from "lucide-react";
import { useDashboardStore } from "@/app/lib/stores";

function DashboardHeaderComponent() {
  // Only subscribe to the specific state slices we need
  const searchQuery = useDashboardStore((state) => state.searchQuery);
  const setSearchQuery = useDashboardStore((state) => state.setSearchQuery);
  const notificationCount = useDashboardStore(
    (state) => state.notificationCount
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [setSearchQuery]
  );

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search patients by name or ID..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">
            {new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p className="text-xs text-gray-500">
            {new Date().toLocaleDateString("en-US", { weekday: "long" })}
          </p>
        </div>
        <button className="relative p-2 text-gray-400 hover:text-gray-600">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </button>
      </div>
    </header>
  );
}

// Memoize to prevent unnecessary re-renders
export const DashboardHeader = memo(DashboardHeaderComponent);
