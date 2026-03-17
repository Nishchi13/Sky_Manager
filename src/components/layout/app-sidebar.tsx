"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Plane, Ticket, Briefcase } from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="p-4 justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground rounded-full p-2">
            <Plane className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-lg text-foreground group-data-[collapsible=icon]:hidden">
            Sky Manager
          </h2>
        </div>
        <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/"}
              tooltip={{ children: "Search Flights" }}
            >
              <Link href="/">
                <Briefcase />
                <span>Search Flights</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith("/bookings")}
              tooltip={{ children: "My Bookings" }}
            >
              <Link href="/bookings">
                <Ticket />
                <span>My Bookings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
