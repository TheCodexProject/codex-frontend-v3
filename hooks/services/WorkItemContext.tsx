"use client";

import React, { createContext, useContext, useState } from "react";
import { WorkItem } from "@/services/models/WorkItem";
import { WorkItemService } from "@/services/features/WorkItemService";

interface WorkItemContextType {
  workItems: WorkItem[] | null;
  getWorkItems: (projectId: string) => Promise<void>;
  createWorkItem: (projectId: string, title: string) => Promise<void>;
  updateWorkItem: (
    id: string,
    title?: string | null,
    description?: string | null,
    status?: string | null,
    priority?: string | null,
    assignee?: string | null,
    subItemsToAdd?: string[] | null,
    subItemsToRemove?: string[] | null
  ) => Promise<void>;
  deleteWorkItem: (id: string) => Promise<void>;
}

const WorkItemContext = createContext<WorkItemContextType | undefined>(
  undefined
);

export const WorkItemProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [workItems, setWorkItems] = useState<WorkItem[] | null>(null);
  const workItemService = new WorkItemService();

  const getWorkItems = async (projectId: string) => {
    const items = await workItemService.getWorkItems(projectId);
    setWorkItems(items);
  };

  const createWorkItem = async (projectId: string, title: string) => {
    const newWorkItem = await workItemService.createWorkItem(projectId, title);
    setWorkItems((prev) => (prev ? [...prev, newWorkItem] : [newWorkItem]));
  };

  const updateWorkItem = async (
    id: string,
    title?: string | null,
    description?: string | null,
    status?: string | null,
    priority?: string | null,
    assignee?: string | null,
    subItemsToAdd?: string[] | null,
    subItemsToRemove?: string[] | null
  ) => {
    const updatedWorkItem = await workItemService.updateWorkItem(
      id,
      title ?? null, // Convert undefined to null
      description ?? null, // Convert undefined to null
      status ?? null, // Convert undefined to null
      priority ?? null, // Convert undefined to null
      assignee ?? null, // Convert undefined to null
      subItemsToAdd ?? null, // Convert undefined to null
      subItemsToRemove ?? null // Convert undefined to null
    );

    setWorkItems((prev) =>
      prev
        ? prev.map((item) => (item.id === id ? updatedWorkItem : item))
        : null
    );
  };

  const deleteWorkItem = async (id: string) => {
    await workItemService.deleteWorkItem(id);
    setWorkItems((prev) =>
      prev ? prev.filter((item) => item.id !== id) : null
    );
  };

  return (
    <WorkItemContext.Provider
      value={{
        workItems,
        getWorkItems,
        createWorkItem,
        updateWorkItem,
        deleteWorkItem,
      }}
    >
      {children}
    </WorkItemContext.Provider>
  );
};

export const useWorkItems = () => {
  const context = useContext(WorkItemContext);
  if (!context) {
    throw new Error("useWorkItems must be used within a WorkItemProvider");
  }
  return context;
};
