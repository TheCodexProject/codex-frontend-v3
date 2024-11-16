import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectService } from "@/services/features/ProjectService";
import { Project } from "@/services/models/Project";
import { Resource } from "@/services/models/Resource";
import { ProjectActivity } from "@/services/models/ProjectActivity";

// Fetch all projects for a workspace
export const useProjects = (workspaceId: string) => {
  return useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: () => ProjectService.getProjects(workspaceId),
  });
};

// Fetch a single project by ID
export const useProject = (projectId: string) => {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: () => ProjectService.getProjectById(projectId),
  });
};

// Create a new project
export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      name,
      workspaceId,
    }: {
      name: string;
      workspaceId: string;
    }) => ProjectService.createProject(name, workspaceId),
    onSuccess: (_, { workspaceId }) => {
      queryClient.invalidateQueries({ queryKey: ["projects", workspaceId] });
    },
  });
};

// Update a project
export const useUpdateProject = () => {
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
        startDate?: Date | null;
        endDate?: Date | null;
      };
    }) =>
      ProjectService.updateProject(
        id,
        updates.title ?? null,
        updates.description ?? null,
        updates.status ?? null,
        updates.priority ?? null,
        updates.startDate ?? null,
        updates.endDate ?? null
      ),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["project", id] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

// Delete a project
export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ProjectService.deleteProject(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", id] });
    },
  });
};

// Fetch all resources for a project
export const useProjectResources = (projectId: string) => {
  return useQuery({
    queryKey: ["projectResources", projectId],
    queryFn: () => ProjectService.getResourcesForProject(projectId),
  });
};

// Fetch a single resource by ID for a project
export const useProjectResource = (projectId: string, resourceId: string) => {
  return useQuery({
    queryKey: ["projectResource", projectId, resourceId],
    queryFn: () =>
      ProjectService.getResourceForProjectById(projectId, resourceId),
  });
};

// Add a resource to a project
export const useAddResourceToProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      resourceId,
    }: {
      projectId: string;
      resourceId: string;
    }) => ProjectService.addResourceToProject(projectId, resourceId),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({
        queryKey: ["projectResources", projectId],
      });
    },
  });
};

// Update a resource for a project
export const useUpdateProjectResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      resourceId,
      updates,
    }: {
      projectId: string;
      resourceId: string;
      updates: {
        title?: string | null;
        url?: string | null;
        description?: string | null;
        type?: string | null;
      };
    }) =>
      ProjectService.updateResourceForProject(
        projectId,
        resourceId,
        updates.title ?? null,
        updates.url ?? null,
        updates.description ?? null,
        updates.type ?? null
      ),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({
        queryKey: ["projectResources", projectId],
      });
    },
  });
};

// Delete a resource for a project
export const useDeleteProjectResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      resourceId,
    }: {
      projectId: string;
      resourceId: string;
    }) => ProjectService.deleteResourceForProject(projectId, resourceId),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({
        queryKey: ["projectResources", projectId],
      });
    },
  });
};

// Fetch all iterations for a project
export const useProjectIterations = (projectId: string) => {
  return useQuery({
    queryKey: ["projectIterations", projectId],
    queryFn: () => ProjectService.getIterationsForProject(projectId),
  });
};

// Fetch a single iteration by ID for a project
export const useProjectIteration = (projectId: string, iterationId: string) => {
  return useQuery({
    queryKey: ["projectIteration", projectId, iterationId],
    queryFn: () =>
      ProjectService.getIterationForProjectById(projectId, iterationId),
  });
};

// Create an iteration for a project
export const useCreateProjectIteration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, title }: { projectId: string; title: string }) =>
      ProjectService.createIterationForProject(projectId, title),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({
        queryKey: ["projectIterations", projectId],
      });
    },
  });
};

// Update an iteration for a project
export const useUpdateProjectIteration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      iterationId,
      updates,
    }: {
      projectId: string;
      iterationId: string;
      updates: {
        title?: string | null;
        description?: string | null;
        itemsToAdd?: string[] | null;
        itemsToRemove?: string[] | null;
      };
    }) =>
      ProjectService.updateIterationForProject(
        projectId,
        iterationId,
        updates.title ?? null,
        updates.description ?? null,
        updates.itemsToAdd ?? null,
        updates.itemsToRemove ?? null
      ),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({
        queryKey: ["projectIterations", projectId],
      });
    },
  });
};

// Delete an iteration for a project
export const useDeleteProjectIteration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      iterationId,
    }: {
      projectId: string;
      iterationId: string;
    }) => ProjectService.deleteIterationForProject(projectId, iterationId),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({
        queryKey: ["projectIterations", projectId],
      });
    },
  });
};

// Fetch all milestones for a project
export const useProjectMilestones = (projectId: string) => {
  return useQuery({
    queryKey: ["projectMilestones", projectId],
    queryFn: () => ProjectService.getMilestonesForProject(projectId),
  });
};

// Fetch a single milestone by ID for a project
export const useProjectMilestone = (projectId: string, milestoneId: string) => {
  return useQuery({
    queryKey: ["projectMilestone", projectId, milestoneId],
    queryFn: () =>
      ProjectService.getMilestoneForProjectById(projectId, milestoneId),
  });
};

// Create a milestone for a project
export const useCreateProjectMilestone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, title }: { projectId: string; title: string }) =>
      ProjectService.createMilestoneForProject(projectId, title),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({
        queryKey: ["projectMilestones", projectId],
      });
    },
  });
};

// Update a milestone for a project
export const useUpdateProjectMilestone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      milestoneId,
      updates,
    }: {
      projectId: string;
      milestoneId: string;
      updates: {
        title?: string | null;
        description?: string | null;
        itemsToAdd?: string[] | null;
        itemsToRemove?: string[] | null;
      };
    }) =>
      ProjectService.updateMilestoneForProject(
        projectId,
        milestoneId,
        updates.title ?? null,
        updates.description ?? null,
        updates.itemsToAdd ?? null,
        updates.itemsToRemove ?? null
      ),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({
        queryKey: ["projectMilestones", projectId],
      });
    },
  });
};

// Delete a milestone for a project
export const useDeleteProjectMilestone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      milestoneId,
    }: {
      projectId: string;
      milestoneId: string;
    }) => ProjectService.deleteMilestoneForProject(projectId, milestoneId),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({
        queryKey: ["projectMilestones", projectId],
      });
    },
  });
};
