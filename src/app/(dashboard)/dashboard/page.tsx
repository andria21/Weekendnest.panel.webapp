"use client";

import Dashboard from "@/components/dashboard/Dashboard";
import useUser from "@/hooks/use-user";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  return <Dashboard />;
}
