"use client"

import React, { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { usePathname } from "next/navigation"

export default function Navbar({children}:{children:ReactNode}) {
  const pathname = usePathname()

  const pageTitleMap: Record<string, string> = {
    "/": "Dashboard",
    "/navigation": "Navigation",
    "/hero-section": "Hero Section",
    "/products": "Products",
    "/login": "Login",
    "/register": "Register",
  }

  const title = pageTitleMap[pathname] || "Untitled"

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title={title} />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
