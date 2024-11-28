import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import WorkspaceService from "@/services/features/WorkspaceService";
import { Workspace } from "@/services/models/Workspace";
import { Resource } from "@/services/models/Resource";

// Fetch all workspaces for an organization
export const useWorkspaces = (
  organizationId: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["workspaces", organizationId],
    queryFn: () => WorkspaceService.getWorkspaces(organizationId),
    enabled: options?.enabled ?? true, // Default to enabled unless explicitly set to false
  });
};

// Fetch a single workspace by ID
export const useWorkspace = (
  workspaceId: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: () => WorkspaceService.getWorkspaceById(workspaceId),
    enabled: options?.enabled ?? true,
  });
};

// Create a new workspace
export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { title: string; organizationId: string }) =>
      WorkspaceService.createWorkspace(params.title, params.organizationId),
    onSuccess: (_, { organizationId }) => {
      queryClient.invalidateQueries({
        queryKey: ["workspaces", organizationId],
      });
    },
  });
};

// Update a workspace
export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      id: string;
      updates: {
        title: string;
        contactsToAdd: string[];
        contactsToRemove: string[];
        projectsToAdd: string[];
        projectsToRemove: string[];
      };
    }) =>
      WorkspaceService.updateWorkspace(
        params.id,
        params.updates.title,
        params.updates.contactsToAdd,
        params.updates.contactsToRemove,
        params.updates.projectsToAdd,
        params.updates.projectsToRemove
      ),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["workspace", id] });
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  });
};

// Delete a workspace
export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workspaceId: string) =>
      WorkspaceService.deleteWorkspace(workspaceId),
    onSuccess: (_, workspaceId) => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", workspaceId] });
    },
  });
};

// Fetch all resources for a workspace
export const useWorkspaceResources = (
  workspaceId: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["workspaceResources", workspaceId],
    queryFn: () => WorkspaceService.getWorkspaceResources(workspaceId),
    enabled: options?.enabled ?? true,
  });
};

// Fetch a single resource for a workspace
export const useWorkspaceResource = (
  workspaceId: string,
  resourceId: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["workspaceResource", workspaceId, resourceId],
    queryFn: () =>
      WorkspaceService.getWorkspaceResource(workspaceId, resourceId),
    enabled: options?.enabled ?? true,
  });
};

// Create a resource for a workspace
export const useCreateWorkspaceResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { workspaceId: string; title: string; url: string }) =>
      WorkspaceService.createWorkspaceResource(
        params.workspaceId,
        params.title,
        params.url
      ),
    onSuccess: (_, { workspaceId }) => {
      queryClient.invalidateQueries({
        queryKey: ["workspaceResources", workspaceId],
      });
    },
  });
};

// Update a resource for a workspace
export const useUpdateWorkspaceResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      workspaceId: string;
      resourceId: string;
      updates: {
        title: string;
        url: string;
        description: string;
        type: string;
      };
    }) =>
      WorkspaceService.updateWorkspaceResource(
        params.workspaceId,
        params.resourceId,
        params.updates.title,
        params.updates.url,
        params.updates.description,
        params.updates.type
      ),
    onSuccess: (_, { workspaceId }) => {
      queryClient.invalidateQueries({
        queryKey: ["workspaceResources", workspaceId],
      });
      queryClient.invalidateQueries({
        queryKey: ["workspaceResource", workspaceId],
      });
    },
  });
};

// Delete a resource for a workspace
export const useDeleteWorkspaceResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { workspaceId: string; resourceId: string }) =>
      WorkspaceService.deleteWorkspaceResource(
        params.workspaceId,
        params.resourceId
      ),
    onSuccess: (_, { workspaceId }) => {
      queryClient.invalidateQueries({
        queryKey: ["workspaceResources", workspaceId],
      });
    },
  });
};
