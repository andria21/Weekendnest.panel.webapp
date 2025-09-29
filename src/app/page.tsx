"use client";

import { useAuth } from "@/stores/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard"); // replace() is better than push() here
  }, [router]);

  return null;
}
// (
//     <div className="flex justify-center items-center h-screen w-full">
//       <Spinner />
//     </div>
//   );