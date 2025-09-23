"use client";

import { useAuth } from "@/stores/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export default function Home() {
  const router = useRouter();
  const { user, init, initialized } = useAuth();

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (initialized && !user) {
      router.replace("/login");
    }
    if (initialized && user) {
      router.replace("/dashboard");
    }
  }, [initialized, user, router]);

  if (!initialized || !user) {
    return (
      <div className="p-8">
        <Spinner />
        Checking authentication...
      </div>
    );
  }

  // While waiting for router.push
  return null;
}
