"use client";

import { useState } from "react";
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
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Settings,
  Plus,
  LogOut,
  User,
  Bell,
  Shield,
  Loader2,
} from "lucide-react";
import { signOut } from "@/app/lib/auth/actions";

interface SettingsContentProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
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

export function SettingsContent({ user }: SettingsContentProps) {
  const pathname = usePathname();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const getInitials = (first: string, last: string) => {
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut();
  };

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-gray-200 bg-white">
        <SidebarHeader className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="" />
              <AvatarFallback className="bg-sky-100 text-sky-600 font-medium">
                {getInitials(user.firstName, user.lastName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 text-sm">
                Dr. {user.firstName}
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

      <SidebarInset className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
          <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
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
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-auto">
          <div className="max-w-2xl space-y-6">
            {/* Profile Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                  <User className="h-5 w-5 text-sky-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">Profile</h2>
                  <p className="text-sm text-gray-500">
                    Manage your account information
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-sky-100 text-sky-600 text-xl font-medium">
                      {getInitials(user.firstName, user.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">
                      Dr. {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      defaultValue={user.firstName}
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      defaultValue={user.lastName}
                      disabled
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue={user.email} disabled />
                </div>
              </div>
            </div>

            {/* Notifications Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Bell className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">Notifications</h2>
                  <p className="text-sm text-gray-500">
                    Configure notification preferences
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      Email Notifications
                    </p>
                    <p className="text-sm text-gray-500">
                      Receive updates about patient screenings
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-gray-300 text-sky-500 focus:ring-sky-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      New Patient Alerts
                    </p>
                    <p className="text-sm text-gray-500">
                      Get notified when new patients are assigned
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-gray-300 text-sky-500 focus:ring-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">Security</h2>
                  <p className="text-sm text-gray-500">
                    Manage your account security
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Two-Factor Authentication
                </Button>
              </div>
            </div>

            {/* Sign Out Section */}
            <div className="bg-white rounded-xl border border-red-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <LogOut className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">Sign Out</h2>
                  <p className="text-sm text-gray-500">
                    Sign out of your account on this device
                  </p>
                </div>
              </div>

              <Button
                variant="destructive"
                className="w-full"
                onClick={handleSignOut}
                disabled={isSigningOut}
              >
                {isSigningOut ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Signing out...
                  </>
                ) : (
                  <>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </>
                )}
              </Button>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
