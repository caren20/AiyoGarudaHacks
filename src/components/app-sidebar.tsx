"use client";

import type React from "react";
import { useAuth } from "@/contexts/AuthContext";

import {
  Home,
  BookOpen,
  Newspaper,
  User,
  Settings,
  LogOut,
} from "lucide-react";
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
  SidebarRail,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Home",
    icon: Home,
    url: "#",
    isActive: true,
  },
  {
    title: "Course",
    icon: BookOpen,
    url: "#",
    isActive: false,
  },
  {
    title: "News",
    icon: Newspaper,
    url: "#",
    isActive: false,
  },
  {
    title: "Profile",
    icon: User,
    url: "#",
    isActive: false,
  },
];

const bottomItems = [
  {
    title: "Settings",
    icon: Settings,
    url: "#",
  },
  {
    title: "Log Out",
    icon: LogOut,
    url: "#",
    className: "text-red-600 hover:text-red-700 hover:bg-red-50",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { signOut } = useAuth();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    signOut();
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-2 py-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="text-xl font-bold text-gray-800 group-data-[collapsible=icon]:hidden">
            BrightHer
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    tooltip={item.title}
                  >
                    <a href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {bottomItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.title === "Log Out" ? (
                <SidebarMenuButton
                  tooltip={item.title}
                  className={item.className}
                  onClick={handleLogout}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              ) : (
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={item.className}
                >
                  <a href={item.url}>
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
