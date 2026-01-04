"use client";

import { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Settings,
  Plus,
} from "lucide-react";

interface PsychologistSidebarProps {
  firstName: string;
  lastName: string;
}

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard/psychologist",
    icon: LayoutDashboard,
  },
  {
    title: "Patients",
    href: "/dashboard/psychologist/patients",
    icon: Users,
  },
  {
    title: "Appointments",
    href: "/dashboard/psychologist/appointments",
    icon: Calendar,
  },
  {
    title: "Reports",
    href: "/dashboard/psychologist/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/dashboard/psychologist/settings",
    icon: Settings,
  },
];

function PsychologistSidebarComponent({
  firstName,
  lastName,
}: PsychologistSidebarProps) {
  const pathname = usePathname();

  const getInitials = (first: string, last: string) => {
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
  };

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="" />
            <AvatarFallback className="bg-sky-100 text-sky-600 font-medium">
              {getInitials(firstName, lastName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900 text-sm">
              Dr. {firstName}
            </span>
            <span className="text-xs text-gray-500">Dyslexia Specialist</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className={`w-full justify-start gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      pathname === item.href
                        ? "bg-sky-50 text-sky-600 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-lg gap-2">
          <Plus className="h-4 w-4" />
          New Screening
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

// Memoize to prevent unnecessary re-renders
export const PsychologistSidebar = memo(PsychologistSidebarComponent);
