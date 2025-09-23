"use client";
import Navbar from "@/components/Navbar";
import useUser from "@/hooks/use-user";
import { redirect } from "next/navigation"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = useUser();

  if (!user) redirect("/login");
  return <Navbar>{children}</Navbar>;
}
