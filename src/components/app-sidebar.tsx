"use client";

import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconLogin,
  IconRegistered,
  IconPackage,
  IconArchive,
  IconShoppingCart,
  IconTruck,
  IconLayersUnion,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const data = {
  user: {
    name: "andria",
    email: "am@example.dev",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Brands",
      url: "brands",
      icon: IconArchive,
    },
    {
      title: "Collections",
      url: "collections",
      icon: IconLayersUnion,
    },
    {
      title: "Categories",
      url: "categories",
      icon: IconFolder,
    },
    {
      title: "Shipping",
      url: "shipping",
      icon: IconTruck,
    },
    {
      title: "Products",
      url: "products",
      icon: IconPackage,
    },
    {
      title: "Cart",
      url: "cart",
      icon: IconShoppingCart,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  authentication: [
    {
      name: "Login",
      url: "/login",
      icon: IconLogin,
    },
    {
      name: "Register",
      url: "register",
      icon: IconRegistered,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Weekendnest</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavDocuments items={data.authentication} />
        <NavMain items={data.navMain} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
