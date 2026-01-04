"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import {
  PsychologistSidebar,
  DashboardHeader,
  StatsCards,
  PatientsTable,
} from "./components";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface PsychologistDashboardContentProps {
  user: User;
}

export function PsychologistDashboardContent({
  user,
}: PsychologistDashboardContentProps) {
  return (
    <SidebarProvider>
      {/* Sidebar - isolated, won't re-render on search/table changes */}
      <PsychologistSidebar
        firstName={user.firstName}
        lastName={user.lastName}
      />

      <SidebarInset className="flex-1 flex flex-col">
        {/* Header with search - isolated, only re-renders on search state changes */}
        <DashboardHeader />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-auto">
          {/* Stats Cards - isolated, only re-renders on stats changes */}
          <StatsCards firstName={user.firstName} />

          {/* Patients Table - isolated, only re-renders on patients/pagination changes */}
          <PatientsTable />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
