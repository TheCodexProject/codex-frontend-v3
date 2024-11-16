import React, { createContext, useContext, useState, useEffect } from "react";
import { Project } from "@/services/models/Project";
import { useWorkspace } from "@/contexts/WorkspaceContext";

interface ProjectContextType {
  currentProject: Project | null;
  setCurrentProject: React.Dispatch<React.SetStateAction<Project | null>>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const { currentWorkspace } = useWorkspace(); // Get the current workspace
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  useEffect(() => {
    // Reset project if the workspace changes
    if (!currentWorkspace) {
      setCurrentProject(null);
    }
  }, [currentWorkspace]);

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
