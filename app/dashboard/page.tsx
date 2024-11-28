"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import SidebarTemplate from "./components/sidebar";
import WorkspaceDashboard from "./components/workspace-dashboard";
import ProjectView from "./components/project-view";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useProject } from "@/contexts/ProjectContext";
import { useUser } from "@/contexts/UserContext";

export default function AppLayout() {
  const { currentProject } = useProject();
  const { currentUser, isUserLoading } = useUser(); // Use loading state
  const router = useRouter();

  React.useEffect(() => {
    if (!isUserLoading && !currentUser) {
      router.push("/signup"); // Redirect to the sign-in page
    }
  }, [currentUser, isUserLoading, router]);

  if (isUserLoading) {
    // Optional: Show a loading spinner or placeholder while user state is initializing
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!currentUser) {
    // Prevent rendering if no user is logged in
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <SidebarTemplate />
        <main className="flex-1 overflow-hidden w-screen bg-background">
          {currentProject ? (
            <div>
              <ProjectView />
            </div>
          ) : (
            <div>
              <WorkspaceDashboard />
            </div>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
}
