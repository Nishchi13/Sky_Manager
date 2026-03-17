"use client";

import * as React from "react";
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <div className="flex min-h-screen">
        <AppSidebar />
        <SidebarInset className="p-4 sm:p-6 lg:p-8 flex-1">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
