"use client";

import React, { useEffect } from "react";
import { useProjects } from "@/hooks/services/ProjectService";
import { useProject } from "@/contexts/ProjectContext";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProjectProgress from "./ProjectProgress"; // Import the ProjectProgress component
import QuickActions from "./QuickActionsCard";
import MilestoneCard from "./MilestoneCard";
import IterationCard from "./IterationCard";
import TaskBoard from "./TaskBoard";

const ProjectView: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const { currentProject, setCurrentProject } = useProject();

  const { data: projects = [], isLoading } = useProjects(
    currentWorkspace?.id || ""
  );

  useEffect(() => {
    if (!isLoading && projects.length > 0 && !currentProject) {
      // Automatically set the first project as current
      setCurrentProject(projects[0]);
    }
  }, [projects, isLoading, currentProject, setCurrentProject]);

  const [searchQuery, setSearchQuery] = React.useState("");

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-600">No project selected.</p>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden">
      <main className="h-full overflow-y-auto w-full bg-background">
        {/* Header */}
        <nav className="sticky top-0 z-10 bg-background border-b border-border px-4 py-2 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{currentProject.title}</h1>
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
        </nav>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Project Progress */}
          <div className="mb-8">
            <ProjectProgress /> {/* Add the ProjectProgress component */}
          </div>

          {/* Quick Actions, Milestones, Iterations */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <QuickActions />
            <MilestoneCard />
            <IterationCard />
          </div>

          {/* Task Board */}
          <TaskBoard />
        </div>
      </main>
    </div>
  );
};

export default ProjectView;
