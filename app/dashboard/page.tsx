"use client";

import * as React from "react";
import SidebarTemplate from "./components/sidebar";
// Uncomment these when implementing the respective components
// import WorkspaceDashboard from "@/components/ui/custom/workspace/workspace-dashboard";
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
              <h1>Workspace Dashboard Placeholder</h1>
              {/* <WorkspaceDashboard
                workspaces={workspaces}
                onSelectProject={handleSelectProject}
                onCreateWorkspace={handleCreateWorkspace}
                onEditWorkspace={handleEditWorkspace}
                onDeleteWorkspace={handleDeleteWorkspace}
                isDarkMode={isDarkMode}
              /> */}
            </div>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
}
