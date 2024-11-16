import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import WorkspaceService from "@/services/features/WorkspaceService";
import { Workspace } from "@/services/models/Workspace";
import { Resource } from "@/services/models/Resource";

// Fetch all workspaces for an organization
export const useWorkspaces = (organizationId: string) => {
  return useQuery({
    queryKey: ["workspaces", organizationId],
    queryFn: () => WorkspaceService.getWorkspaces(organizationId),
  });
};

// Fetch a single workspace by ID
export const useWorkspace = (workspaceId: string) => {
  return useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: () => WorkspaceService.getWorkspaceById(workspaceId),
  });
};

// Create a new workspace
export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      title,
      organizationId,
    }: {
      title: string;
      organizationId: string;
    }) => WorkspaceService.createWorkspace(title, organizationId),
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
    mutationFn: ({
      id,
      updates,
    }: {
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
        id,
        updates.title,
        updates.contactsToAdd,
        updates.contactsToRemove,
        updates.projectsToAdd,
        updates.projectsToRemove
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
export const useWorkspaceResources = (workspaceId: string) => {
  return useQuery({
    queryKey: ["workspaceResources", workspaceId],
    queryFn: () => WorkspaceService.getWorkspaceResources(workspaceId),
  });
};

// Fetch a single resource for a workspace
export const useWorkspaceResource = (
  workspaceId: string,
  resourceId: string
) => {
  return useQuery({
    queryKey: ["workspaceResource", workspaceId, resourceId],
    queryFn: () =>
      WorkspaceService.getWorkspaceResource(workspaceId, resourceId),
  });
};

// Create a resource for a workspace
export const useCreateWorkspaceResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workspaceId,
      title,
      url,
    }: {
      workspaceId: string;
      title: string;
      url: string;
    }) => WorkspaceService.createWorkspaceResource(workspaceId, title, url),
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
    mutationFn: ({
      workspaceId,
      resourceId,
      updates,
    }: {
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
        workspaceId,
        resourceId,
        updates.title,
        updates.url,
        updates.description,
        updates.type
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
    mutationFn: ({
      workspaceId,
      resourceId,
    }: {
      workspaceId: string;
      resourceId: string;
    }) => WorkspaceService.deleteWorkspaceResource(workspaceId, resourceId),
    onSuccess: (_, { workspaceId }) => {
      queryClient.invalidateQueries({
        queryKey: ["workspaceResources", workspaceId],
      });
    },
  });
};
