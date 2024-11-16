"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Project } from "@/services/models/Project";
import { useWorkspace } from "@/contexts/WorkspaceContext";

interface ProjectContextType {
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const { currentWorkspace } = useWorkspace(); // Get the current workspace
  const [currentProject, setCurrentProjectState] = useState<Project | null>(
    null
  );

  useEffect(() => {
    // Reset project if the workspace changes
    if (!currentWorkspace) {
      setCurrentProjectState(null);
    }
  }, [currentWorkspace]);

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
    <ProjectContext.Provider value={{ currentProject, setCurrentProject }}>
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
