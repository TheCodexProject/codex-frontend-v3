"use client";

import * as React from "react";
import SidebarTemplate from "./components/sidebar";
import WorkspaceDashboard from "./components/workspace-dashboard";
import ProjectView from "./components/project-view";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useProject } from "@/contexts/ProjectContext";

export default function AppLayout() {
  const { currentProject } = useProject();

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <SidebarTemplate />
        <main className="flex-1 overflow-hidden w-screen bg-background">
          {currentProject ? (
            // Render `ProjectView` when `currentProject` is set
            <div>
              <ProjectView />
            </div>
          ) : (
            // Render `WorkspaceDashboard` when `currentProject` is null
            <div>
              <WorkspaceDashboard />
            </div>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
}
