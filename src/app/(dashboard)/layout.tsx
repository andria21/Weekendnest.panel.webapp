"use client";
import Navbar from "@/components/Navbar";
import useUser from "@/hooks/use-user";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Navbar>{children}</Navbar>;
}
