"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProjects } from "@/hooks/services/ProjectService";
import { Project } from "@/services/models/Project";
import { useWorkspace } from "@/contexts/WorkspaceContext";

interface ProjectContextType {
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  isProjectLoading: boolean;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const { currentWorkspace, isWorkspaceLoading } = useWorkspace(); // Get the current workspace and its loading state
  const router = useRouter();

  const [currentProject, setCurrentProjectState] = useState<Project | null>(
    null
  );

  // Fetch projects using the service hook
  const { data: projects = [], isLoading: isProjectsFetching } = useProjects(
    currentWorkspace?.id || "",
    {
      enabled: !!currentWorkspace, // Fetch only when currentWorkspace exists
    }
  );

  // Combined loading state
  const isProjectLoading = isWorkspaceLoading || isProjectsFetching;

  // Sync currentProject with the latest projects list
  useEffect(() => {
    if (isProjectLoading) return; // Wait for loading to complete

    if (currentWorkspace && projects.length > 0) {
      if (currentProject) {
        const updatedProject = projects.find(
          (proj) => proj.id === currentProject.id
        );

        if (updatedProject) {
          // Update currentProject only if it differs from the latest data
          setCurrentProjectState((prev) =>
            prev?.id === updatedProject.id
              ? { ...prev, ...updatedProject }
              : prev
          );
        } else {
          // If the currentProject is invalid, reset to null
          setCurrentProjectState(null);
        }
      } else {
        // If no currentProject is set, reset to null
        setCurrentProjectState(null);
      }
    } else {
      // If no projects or no workspace, reset to null
      setCurrentProjectState(null);
    }
  }, [isProjectLoading, projects]);

  // Wrapper to control when setCurrentProject can be called
  const setCurrentProject = (project: Project | null) => {
    if (!currentWorkspace) {
      console.warn(
        "Cannot set currentProject because no currentWorkspace is set."
      );
      return;
    }
    setCurrentProjectState(project);
  };

  return (
    <ProjectContext.Provider
      value={{
        currentProject,
        setCurrentProject,
        isProjectLoading,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};
