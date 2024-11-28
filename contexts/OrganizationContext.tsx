"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Organization } from "@/services/models/Organization";
import { useUser } from "@/contexts/UserContext";

interface OrganizationContextType {
  currentOrganization: Organization | null;
  setCurrentOrganization: (organization: Organization | null) => void;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(
  undefined
);

export const OrganizationProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const { currentUser } = useUser(); // Get the current user
  const [currentOrganization, setCurrentOrganizationState] =
    useState<Organization | null>(null);

  useEffect(() => {
    // Reset organization if the user changes
    if (!currentUser) {
      setCurrentOrganizationState(null);
    }
  }, [currentUser]);

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
      value={{ currentOrganization, setCurrentOrganization }}
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
