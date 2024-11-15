import React, { createContext, useContext, useState } from "react";
import OrganizationService from "@/services/features/OrganizationService";
import { Organization } from "@/services/models/Organization";
import { Resource } from "@/services/models/Resource";

interface OrganizationContextType {
  organizations: Organization[] | null;
  resources: Record<string, Resource[]>; // Map organizationId -> resources
  getOrganizations: () => Promise<void>;
  createOrganization: (name: string, ownerId: string) => Promise<void>;
  updateOrganization: (
    id: string,
    name?: string | null,
    membersToAdd?: string[] | null,
    membersToRemove?: string[] | null
  ) => Promise<void>;
  deleteOrganization: (id: string) => Promise<void>;
  getOrganizationResources: (organizationId: string) => Promise<void>;
  createOrganizationResource: (
    organizationId: string,
    title: string,
    url: string
  ) => Promise<void>;
  updateOrganizationResource: (
    organizationId: string,
    resourceId: string,
    title?: string | null,
    url?: string | null,
    description?: string | null,
    type?: string | null
  ) => Promise<void>;
  deleteOrganizationResource: (
    organizationId: string,
    resourceId: string
  ) => Promise<void>;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(
  undefined
);

export const OrganizationProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [organizations, setOrganizations] = useState<Organization[] | null>(
    null
  );
  const [resources, setResources] = useState<Record<string, Resource[]>>({});

  const getOrganizations = async () => {
    const data = await OrganizationService.getOrganizations();
    setOrganizations(data);
  };

  const createOrganization = async (name: string, ownerId: string) => {
    const newOrg = await OrganizationService.createOrganization(name, ownerId);
    setOrganizations((prev) => (prev ? [...prev, newOrg] : [newOrg]));
  };

  const updateOrganization = async (
    id: string,
    name?: string | null,
    membersToAdd?: string[] | null,
    membersToRemove?: string[] | null
  ) => {
    const updatedOrg = await OrganizationService.updateOrganization(
      id,
      name ?? null,
      membersToAdd ?? null,
      membersToRemove ?? null
    );
    setOrganizations((prev) =>
      prev ? prev.map((org) => (org.id === id ? updatedOrg : org)) : null
    );
  };

  const deleteOrganization = async (id: string) => {
    await OrganizationService.deleteOrganization(id);
    setOrganizations((prev) =>
      prev ? prev.filter((org) => org.id !== id) : null
    );
  };

  const getOrganizationResources = async (organizationId: string) => {
    const data = await OrganizationService.getOrganizationResources(
      organizationId
    );
    setResources((prev) => ({ ...prev, [organizationId]: data }));
  };

  const createOrganizationResource = async (
    organizationId: string,
    title: string,
    url: string
  ) => {
    const newResource = await OrganizationService.createOrganizationResource(
      organizationId,
      title,
      url
    );
    setResources((prev) => ({
      ...prev,
      [organizationId]: prev[organizationId]
        ? [...prev[organizationId], newResource]
        : [newResource],
    }));
  };

  const updateOrganizationResource = async (
    organizationId: string,
    resourceId: string,
    title?: string | null,
    url?: string | null,
    description?: string | null,
    type?: string | null
  ) => {
    const updatedResource =
      await OrganizationService.updateOrganizationResource(
        organizationId,
        resourceId,
        title ?? null,
        url ?? null,
        description ?? null,
        type ?? null
      );
    setResources((prev) => ({
      ...prev,
      [organizationId]: prev[organizationId]
        ? prev[organizationId].map((res) =>
            res.id === resourceId ? updatedResource : res
          )
        : [],
    }));
  };

  const deleteOrganizationResource = async (
    organizationId: string,
    resourceId: string
  ) => {
    await OrganizationService.deleteOrganizationResource(
      organizationId,
      resourceId
    );
    setResources((prev) => ({
      ...prev,
      [organizationId]: prev[organizationId]
        ? prev[organizationId].filter((res) => res.id !== resourceId)
        : [],
    }));
  };

  return (
    <OrganizationContext.Provider
      value={{
        organizations,
        resources,
        getOrganizations,
        createOrganization,
        updateOrganization,
        deleteOrganization,
        getOrganizationResources,
        createOrganizationResource,
        updateOrganizationResource,
        deleteOrganizationResource,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganizationData = () => {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error(
      "useOrganizationData must be used within an OrganizationProvider"
    );
  }
  return context;
};
