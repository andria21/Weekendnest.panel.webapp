import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "./data.json";
import { useAuth } from "@/stores/useAuth";
import { Button } from "../ui/button";

type User = {
  name: string;
  // add other user properties if needed
};

export default function Dashboard({ user }: { user: User }) {
    const { logout } = useAuth()
  return (
    <div className="flex flex-1 flex-col">
      <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
      <Button variant={"destructive"} className="cursor-pointer w-25"
      onClick={() => {
          logout()
        }}
      >
        Logout
      </Button>
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6"></div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}
