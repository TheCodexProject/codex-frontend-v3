import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { WorkItemService } from "@/services/features/WorkItemService";
import { WorkItem } from "@/services/models/WorkItem";

// Fetch all work items in a project
export const useWorkItems = (projectId: string) => {
  return useQuery({
    queryKey: ["workItems", projectId],
    queryFn: () => WorkItemService.getWorkItems(projectId),
  });
};

// Fetch a single work item by ID
export const useWorkItem = (id: string) => {
  return useQuery({
    queryKey: ["workItem", id],
    queryFn: () => WorkItemService.getWorkItem(id),
  });
};

// Create a new work item
export const useCreateWorkItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, title }: { projectId: string; title: string }) =>
      WorkItemService.createWorkItem(projectId, title),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ["workItems", projectId] });
    },
  });
};

// Update a work item
export const useUpdateWorkItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: {
        title?: string | null;
        description?: string | null;
        status?: string | null;
        priority?: string | null;
        assignee?: string | null;
        subItemsToAdd?: string[] | null;
        subItemsToRemove?: string[] | null;
      };
    }) =>
      WorkItemService.updateWorkItem(
        id,
        updates.title ?? null,
        updates.description ?? null,
        updates.status ?? null,
        updates.priority ?? null,
        updates.assignee ?? null,
        updates.subItemsToAdd ?? null,
        updates.subItemsToRemove ?? null
      ),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["workItem", id] });
      queryClient.invalidateQueries({ queryKey: ["workItems"] });
    },
  });
};

// Delete a work item
export const useDeleteWorkItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => WorkItemService.deleteWorkItem(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["workItems"] });
      queryClient.invalidateQueries({ queryKey: ["workItem", id] });
    },
  });
};
