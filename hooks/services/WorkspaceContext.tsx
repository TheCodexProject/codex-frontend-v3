"use client";

import React, { createContext, useContext, useState } from "react";
import WorkspaceService from "@/services/features/WorkspaceService";
import { Workspace } from "@/services/models/Workspace";
import { Resource } from "@/services/models/Resource";

interface WorkspaceContextType {
  workspaces: Workspace[];
  resources: Record<string, Resource[]>; // Map workspaceId -> resources
  getWorkspaces: () => Promise<void>;
  createWorkspace: (title: string, organizationId: string) => Promise<void>;
  updateWorkspace: (
    id: string,
    title: string,
    contactsToAdd: string[],
    contactsToRemove: string[],
    projectsToAdd: string[],
    projectsToRemove: string[]
  ) => Promise<void>;
  deleteWorkspace: (id: string) => Promise<void>;
  getWorkspaceResources: (workspaceId: string) => Promise<void>;
  createWorkspaceResource: (
    workspaceId: string,
    title: string,
    url: string
  ) => Promise<void>;
  updateWorkspaceResource: (
    workspaceId: string,
    resourceId: string,
    title: string,
    url: string,
    description: string,
    type: string
  ) => Promise<void>;
  deleteWorkspaceResource: (
    workspaceId: string,
    resourceId: string
  ) => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined
);

export const WorkspaceProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]); // Start as an empty array
  const [resources, setResources] = useState<Record<string, Resource[]>>({});

  const getWorkspaces = async () => {
    const data = await WorkspaceService.getWorkspaces();
    setWorkspaces(data);
  };

  const createWorkspace = async (title: string, organizationId: string) => {
    const newWorkspace = await WorkspaceService.createWorkspace(
      title,
      organizationId
    );
    setWorkspaces((prev) => [...prev, newWorkspace]);
  };

  const updateWorkspace = async (
    id: string,
    title: string,
    contactsToAdd: string[],
    contactsToRemove: string[],
    projectsToAdd: string[],
    projectsToRemove: string[]
  ) => {
    const updatedWorkspace = await WorkspaceService.updateWorkspace(
      id,
      title,
      contactsToAdd,
      contactsToRemove,
      projectsToAdd,
      projectsToRemove
    );
    setWorkspaces((prev) =>
      prev.map((ws) => (ws.id === id ? updatedWorkspace : ws))
    );
  };

  const deleteWorkspace = async (id: string) => {
    await WorkspaceService.deleteWorkspace(id);
    setWorkspaces((prev) => prev.filter((workspace) => workspace.id !== id));
  };

  const getWorkspaceResources = async (workspaceId: string) => {
    const data = await WorkspaceService.getWorkspaceResources(workspaceId);
    setResources((prev) => ({ ...prev, [workspaceId]: data }));
  };

  const createWorkspaceResource = async (
    workspaceId: string,
    title: string,
    url: string
  ) => {
    const newResource = await WorkspaceService.createWorkspaceResource(
      workspaceId,
      title,
      url
    );
    setResources((prev) => ({
      ...prev,
      [workspaceId]: prev[workspaceId]
        ? [...prev[workspaceId], newResource]
        : [newResource],
    }));
  };

  const updateWorkspaceResource = async (
    workspaceId: string,
    resourceId: string,
    title: string,
    url: string,
    description: string,
    type: string
  ) => {
    const updatedResource = await WorkspaceService.updateWorkspaceResource(
      workspaceId,
      resourceId,
      title,
      url,
      description,
      type
    );
    setResources((prev) => ({
      ...prev,
      [workspaceId]: prev[workspaceId]
        ? prev[workspaceId].map((res) =>
            res.id === resourceId ? updatedResource : res
          )
        : [],
    }));
  };

  const deleteWorkspaceResource = async (
    workspaceId: string,
    resourceId: string
  ) => {
    await WorkspaceService.deleteWorkspaceResource(workspaceId, resourceId);
    setResources((prev) => ({
      ...prev,
      [workspaceId]: prev[workspaceId]
        ? prev[workspaceId].filter((res) => res.id !== resourceId)
        : [],
    }));
  };

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        resources,
        getWorkspaces,
        createWorkspace,
        updateWorkspace,
        deleteWorkspace,
        getWorkspaceResources,
        createWorkspaceResource,
        updateWorkspaceResource,
        deleteWorkspaceResource,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspaceData = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspaceData must be used within a WorkspaceProvider");
  }
  return context;
};
