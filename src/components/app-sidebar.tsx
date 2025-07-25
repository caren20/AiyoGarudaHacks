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
  type LucideIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Icons } from "./icons";
import { siteConfig } from "@/config/site";
import { NavSecondary } from "./nav-secondary";
import { NavMain } from "./nav-main";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: Home,
      isActive: true,
    },
    {
      title: "Course",
      url: "/courses",
      icon: BookOpen,
    },
    {
      title: "News",
      url: "#",
      icon: Newspaper,
    },
    {
      title: "Profile",
      url: "#",
      icon: User,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      title: "Log Out",
      url: "#",
      icon: LogOut,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { signOut } = useAuth();

  const handleNavSecondaryClick = (item: {
    title: string;
    url: string;
    icon: LucideIcon;
  }) => {
    if (item.title === "Log Out") {
      signOut();
    }
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
            <Icons.logo />
          </div>
          <span className="truncate font-medium">{siteConfig.name}</span>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary
          items={data.navSecondary}
          onItemClick={handleNavSecondaryClick}
          className="mt-auto"
        />
      </SidebarContent>
    </Sidebar>
  );
}
