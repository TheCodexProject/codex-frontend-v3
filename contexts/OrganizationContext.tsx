"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOrganizations } from "@/hooks/services/OrganizationService";
import { Organization } from "@/services/models/Organization";
import { useUser } from "@/contexts/UserContext";

interface OrganizationContextType {
  currentOrganization: Organization | null;
  setCurrentOrganization: (organization: Organization | null) => void;
  isOrganizationLoading: boolean;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(
  undefined
);

export const OrganizationProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const { currentUser, isUserLoading } = useUser(); // Get the current user and loading state
  const router = useRouter();

  const [currentOrganization, setCurrentOrganizationState] =
    useState<Organization | null>(null);

  // Fetch organizations using the service hook
  const { data: organizations = [], isLoading: isOrganizationLoading } =
    useOrganizations(currentUser?.id || "", {
      enabled: !!currentUser, // Fetch only when currentUser exists
    });

  // Combined loading state
  const isLoading = isUserLoading || isOrganizationLoading;

  // Sync currentOrganization with the latest organizations list
  useEffect(() => {
    if (isLoading) return; // Wait for loading to complete

    if (currentUser && organizations.length > 0) {
      if (currentOrganization) {
        const updatedOrganization = organizations.find(
          (org) => org.id === currentOrganization.id
        );

        if (updatedOrganization) {
          // Update currentOrganization with the latest server state only if necessary
          setCurrentOrganizationState((prev) =>
            prev?.id === updatedOrganization.id
              ? { ...prev, ...updatedOrganization }
              : prev
          );
        } else {
          // If the currentOrganization is invalid, set it to the first in the list
          setCurrentOrganizationState(organizations[0]);
        }
      } else {
        // If no currentOrganization is set, default to the first organization
        setCurrentOrganizationState(organizations[0]);
      }
    } else if (currentUser) {
      // Redirect to /onboard if no organizations exist for the user
      setCurrentOrganizationState(null);
      router.push("/onboard");
    } else {
      // Reset if there's no user
      setCurrentOrganizationState(null);
    }
  }, [isLoading, organizations]);

  // Wrapper to control when setCurrentOrganization can be called
  const setCurrentOrganization = (organization: Organization | null) => {
    if (!currentUser) {
      console.warn(
        "Cannot set currentOrganization because no currentUser is set."
      );
      return;
    }
    setCurrentOrganizationState(organization);
  };

  return (
    <OrganizationContext.Provider
      value={{
        currentOrganization,
        setCurrentOrganization,
        isOrganizationLoading: isLoading,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error(
      "useOrganization must be used within an OrganizationProvider"
    );
  }
  return context;
};
