"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWorkspaces } from "@/hooks/services/WorkspaceService";
import { Workspace } from "@/services/models/Workspace";
import { useOrganization } from "@/contexts/OrganizationContext";

interface WorkspaceContextType {
  currentWorkspace: Workspace | null;
  setCurrentWorkspace: (workspace: Workspace | null) => void;
  isWorkspaceLoading: boolean;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined
);

export const WorkspaceProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const { currentOrganization, isOrganizationLoading } = useOrganization(); // Get the current organization and its loading state
  const router = useRouter();

  const [currentWorkspace, setCurrentWorkspaceState] =
    useState<Workspace | null>(null);

  // Fetch workspaces using the service hook
  const { data: workspaces = [], isLoading: isWorkspacesFetching } =
    useWorkspaces(currentOrganization?.id || "", {
      enabled: !!currentOrganization, // Fetch only when currentOrganization exists
    });

  // Combined loading state
  const isWorkspaceLoading = isOrganizationLoading || isWorkspacesFetching;

  // Sync currentWorkspace with the latest workspaces list
  useEffect(() => {
    if (isWorkspaceLoading) return; // Wait for loading to complete

    if (currentOrganization && workspaces.length > 0) {
      if (currentWorkspace) {
        const updatedWorkspace = workspaces.find(
          (ws) => ws.id === currentWorkspace.id
        );

        if (updatedWorkspace) {
          // Update currentWorkspace only if it differs from the latest data
          setCurrentWorkspaceState((prev) =>
            prev?.id === updatedWorkspace.id
              ? { ...prev, ...updatedWorkspace }
              : prev
          );
        } else {
          // If the currentWorkspace is invalid, reset to null
          setCurrentWorkspaceState(null);
        }
      } else {
        // If no currentWorkspace is set, reset to null
        setCurrentWorkspaceState(null);
      }
    } else {
      // If no workspaces or no organization, reset to null
      setCurrentWorkspaceState(null);
    }
  }, [isWorkspaceLoading, workspaces]);

  // Wrapper to control when setCurrentWorkspace can be called
  const setCurrentWorkspace = (workspace: Workspace | null) => {
    if (!currentOrganization) {
      console.warn(
        "Cannot set currentWorkspace because no currentOrganization is set."
      );
      return;
    }
    setCurrentWorkspaceState(workspace);
  };

  return (
    <WorkspaceContext.Provider
      value={{
        currentWorkspace,
        setCurrentWorkspace,
        isWorkspaceLoading,
      }}
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
