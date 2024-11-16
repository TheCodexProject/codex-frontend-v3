"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "@/contexts/UserContext";
import { OrganizationProvider } from "@/contexts/OrganizationContext";
import { WorkspaceProvider } from "@/contexts/WorkspaceContext";
import { ProjectProvider } from "@/contexts/ProjectContext";

const queryClient = new QueryClient();

const ContextProviders: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <OrganizationProvider>
          <WorkspaceProvider>
            <ProjectProvider>{children}</ProjectProvider>
          </WorkspaceProvider>
        </OrganizationProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default ContextProviders;
