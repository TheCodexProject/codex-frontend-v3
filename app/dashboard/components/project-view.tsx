"use client";

import React, { useEffect } from "react";
import { useProjects } from "@/hooks/services/ProjectService";
import { useProject } from "@/contexts/ProjectContext";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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
          Project Progress
          {/* <div className="mb-8 relative">
            <Progress
              value={currentProject.progress || 0}
              className="w-full h-6 bg-gray-200 dark:bg-gray-700"
            />
            <span
              className={`absolute top-1/2 transform -translate-y-1/2 text-sm font-medium ${
                currentProject.progress === 0
                  ? "left-1/2 -translate-x-1/2"
                  : `left-[calc(${currentProject.progress}%_-_46px)] text-white`
              }`}
            >
              {currentProject.progress || 0}%
            </span>
          </div> */}
          {/* Quick Actions, Milestones, Iterations */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <div>
              <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
              <button className="block w-full px-4 py-2 bg-primary text-white rounded-md">
                <Plus className="mr-2 inline-block" /> Add New Task
              </button>
              <button className="block w-full px-4 py-2 bg-primary text-white rounded-md mt-2">
                <Plus className="mr-2 inline-block" /> Create Milestone
              </button>
              <button className="block w-full px-4 py-2 bg-primary text-white rounded-md mt-2">
                <Plus className="mr-2 inline-block" /> Start New Iteration
              </button>
            </div>
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
