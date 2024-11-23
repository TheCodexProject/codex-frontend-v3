"use client";

import React, { useEffect, useState } from "react";
import { useProjects } from "@/hooks/services/ProjectService";
import { useProject } from "@/contexts/ProjectContext";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { Search, ArrowLeft, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProjectProgress from "./ProjectProgressBar";
import QuickActions from "./QuickActionsCard";
import ActiveMilestonesCard from "./ActiveMilestonesCard";
import CurrentIterationsCard from "./CurrentIterationsCard";
import TaskBoard from "./TaskBoard";
import { EditProjectDialog } from "./EditProjectDialog";
import { Button } from "@/components/ui/button";

const ProjectView: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const { currentProject, setCurrentProject } = useProject();

  const { data: projects = [], isLoading } = useProjects(
    currentWorkspace?.id || ""
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && projects.length > 0 && !currentProject) {
      // Automatically set the first project as current
      setCurrentProject(projects[0]);
    }
  }, [projects, isLoading, currentProject, setCurrentProject]);

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-600">No project selected.</p>
      </div>
    );
  }

  const handleBackClick = () => {
    setCurrentProject(null); // Set the current project to null
  };

  return (
    <div className="h-screen overflow-hidden">
      <main className="h-full overflow-y-auto w-full bg-background">
        {/* Header */}
        <nav className="sticky top-0 z-10 bg-background border-b border-border px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={handleBackClick}
              className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200"
            >
              <ArrowLeft color="white" className="h-5 w-5 text-foreground" />
            </Button>
            <div className="relative group">
              <h1 className="text-2xl font-bold inline-block">
                {currentProject.title}
              </h1>
              <button
                onClick={() => setIsEditDialogOpen(true)}
                className="absolute -right-12 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded hover:bg-muted"
                aria-label="Edit Project"
              >
                <Pencil className="h-5 w-5 text-foreground" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tasks..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Project Progress */}
          <div className="mb-8">
            <ProjectProgress />
          </div>

          {/* Quick Actions, Milestones, Iterations */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <QuickActions />
            <ActiveMilestonesCard />
            <CurrentIterationsCard />
          </div>

          {/* Task Board */}
          <TaskBoard />
        </div>
      </main>

      {/* Edit Project Dialog */}
      <EditProjectDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        project={currentProject}
      />
    </div>
  );
};

export default ProjectView;
