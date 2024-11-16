import React, { createContext, useContext, useState, useEffect } from "react";
import { Workspace } from "@/services/models/Workspace";
import { useOrganization } from "@/contexts/OrganizationContext";

interface WorkspaceContextType {
  currentWorkspace: Workspace | null;
  setCurrentWorkspace: React.Dispatch<React.SetStateAction<Workspace | null>>;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined
);

export const WorkspaceProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const { currentOrganization } = useOrganization(); // Get the current organization
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(
    null
  );

  useEffect(() => {
    // Reset workspace if the organization changes
    if (!currentOrganization) {
      setCurrentWorkspace(null);
    }
  }, [currentOrganization]);

  return (
    <WorkspaceContext.Provider
      value={{ currentWorkspace, setCurrentWorkspace }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
};
