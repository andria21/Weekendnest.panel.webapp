"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export default function RouteLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Start loading when route changes
    setLoading(true);

    // Fake small delay so spinner is visible
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Spinner />
      <span className="ml-2">Loading...</span>
    </div>
  );
}
