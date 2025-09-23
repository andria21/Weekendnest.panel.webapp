"use client";

import { useAuth } from "@/stores/useAuth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function useUser() {
  const { user, initialized } = useAuth();

  useEffect(() => {
    if (initialized && !user) {
      redirect("/login"); // client redirect
    }
  }, [initialized, user]);

  return user;
}
