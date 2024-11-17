"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useProjects } from "@/hooks/services/ProjectService";
import { Workspace } from "@/services/models/Workspace";
import { useProject } from "@/contexts/ProjectContext";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { Project } from "@/services/models/Project";

interface ProjectsListProps {
  workspace: Workspace;
}

const ProjectsList: React.FC<ProjectsListProps> = ({ workspace }) => {
  const { setCurrentProject } = useProject();
  const { currentWorkspace, setCurrentWorkspace } = useWorkspace();
  const [pendingProject, setPendingProject] = useState<Project | null>(null);

  const { data: projects = [], isLoading, isError } = useProjects(workspace.id);

  useEffect(() => {
    // If there's a pending project and the workspace has been updated, set the project
    if (pendingProject && currentWorkspace?.id === workspace.id) {
      setCurrentProject(pendingProject);
      setPendingProject(null); // Clear pending project
    }
  }, [currentWorkspace, pendingProject, setCurrentProject, workspace.id]);

  if (isLoading) {
    return <p>Loading projects...</p>;
  }

  if (isError) {
    return <p>Failed to load projects.</p>;
  }

  const handleProjectClick = (project: (typeof projects)[0]) => {
    // If the workspace is not already the current workspace, set it first
    if (currentWorkspace?.id !== workspace.id) {
      setCurrentWorkspace(workspace);
      setPendingProject(project); // Save the project temporarily
    } else {
      // Otherwise, set the project directly
      setCurrentProject(project);
    }
  };

  return (
    <div className="space-y-2">
      {projects.map((project) => (
        <Button
          key={project.id}
          variant="ghost"
          className="w-full justify-start"
          onClick={() => handleProjectClick(project)}
        >
          <span>{project.title}</span>
          <ChevronRight className="ml-auto h-4 w-4" />
        </Button>
      ))}
    </div>
  );
};

export default ProjectsList;
