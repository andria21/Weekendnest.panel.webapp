"use client";

import { useAuth } from "@/stores/useAuth";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { user, init, initialized } = useAuth();

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (initialized && !user) {
      router.push("/login");
    }
  }, [initialized, user, router]);

  if (!user) {
    return <div className="p-8">Checking authentication...</div>;
  }

  redirect("/dashboard");
  // TODO: redirect /dashboard
}
