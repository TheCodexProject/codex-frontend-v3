import React, { createContext, useContext, useState, useEffect } from "react";
import { Organization } from "@/services/models/Organization";
import { useUser } from "@/contexts/UserContext";

interface OrganizationContextType {
  currentOrganization: Organization | null;
  setCurrentOrganization: React.Dispatch<
    React.SetStateAction<Organization | null>
  >;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(
  undefined
);

export const OrganizationProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const { user } = useUser(); // Get the current user
  const [currentOrganization, setCurrentOrganization] =
    useState<Organization | null>(null);

  useEffect(() => {
    // Reset organization if the user changes
    if (!user) {
      setCurrentOrganization(null);
    }
  }, [user]);

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
