import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import OrganizationService from "@/services/features/OrganizationService";
import { Organization } from "@/services/models/Organization";
import { Resource } from "@/services/models/Resource";

// Fetch all organizations
export const useOrganizations = (userId: string) => {
  return useQuery({
    queryKey: ["organizations", userId],
    queryFn: () => OrganizationService.getOrganizations(userId),
  });
};

// Fetch a single organization
export const useOrganization = (id: string) => {
  return useQuery({
    queryKey: ["organization", id],
    queryFn: () => OrganizationService.getOrganization(id),
  });
};

// Create an organization
export const useCreateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, ownerId }: { name: string; ownerId: string }) =>
      OrganizationService.createOrganization(name, ownerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
    onError: (error) => {
      console.error("Failed to create organization:", error);
    },
  });
};

// Update an organization
export const useUpdateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      id: string;
      updates: {
        name?: string | null;
        membersToAdd?: string[] | null;
        membersToRemove?: string[] | null;
      };
    }) =>
      OrganizationService.updateOrganization(
        params.id,
        params.updates.name ?? null,
        params.updates.membersToAdd ?? null,
        params.updates.membersToRemove ?? null
      ),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      queryClient.invalidateQueries({ queryKey: ["organization", id] });
    },
    onError: (error) => {
      console.error("Failed to update organization:", error);
    },
  });
};

// Delete an organization
export const useDeleteOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => OrganizationService.deleteOrganization(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
    onError: (error) => {
      console.error("Failed to delete organization:", error);
    },
  });
};

// Fetch resources for an organization
export const useOrganizationResources = (organizationId: string) => {
  return useQuery({
    queryKey: ["organizationResources", organizationId],
    queryFn: () => OrganizationService.getOrganizationResources(organizationId),
  });
};

// Fetch a single organization resource
export const useOrganizationResource = (
  organizationId: string,
  resourceId: string
) => {
  return useQuery({
    queryKey: ["organizationResource", organizationId, resourceId],
    queryFn: () =>
      OrganizationService.getOrganizationResource(organizationId, resourceId),
  });
};

// Create a resource for an organization
export const useCreateOrganizationResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      organizationId: string;
      title: string;
      url: string;
    }) =>
      OrganizationService.createOrganizationResource(
        params.organizationId,
        params.title,
        params.url
      ),
    onSuccess: (_, { organizationId }) => {
      queryClient.invalidateQueries({
        queryKey: ["organizationResources", organizationId],
      });
    },
    onError: (error) => {
      console.error("Failed to create resource:", error);
    },
  });
};

// Update a resource for an organization
export const useUpdateOrganizationResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      organizationId: string;
      resourceId: string;
      updates: {
        title?: string | null;
        url?: string | null;
        description?: string | null;
        type?: string | null;
      };
    }) =>
      OrganizationService.updateOrganizationResource(
        params.organizationId,
        params.resourceId,
        params.updates.title ?? null,
        params.updates.url ?? null,
        params.updates.description ?? null,
        params.updates.type ?? null
      ),
    onSuccess: (_, { organizationId }) => {
      queryClient.invalidateQueries({
        queryKey: ["organizationResources", organizationId],
      });
    },
    onError: (error) => {
      console.error("Failed to update resource:", error);
    },
  });
};

// Delete a resource for an organization
export const useDeleteOrganizationResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { organizationId: string; resourceId: string }) =>
      OrganizationService.deleteOrganizationResource(
        params.organizationId,
        params.resourceId
      ),
    onSuccess: (_, { organizationId }) => {
      queryClient.invalidateQueries({
        queryKey: ["organizationResources", organizationId],
      });
    },
    onError: (error) => {
      console.error("Failed to delete resource:", error);
    },
  });
};
