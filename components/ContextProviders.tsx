"use client";

import React from "react";
import { UserProvider } from "@/hooks/services/UserContext";
import { WorkItemProvider } from "@/hooks/services/WorkItemContext";
import { WorkspaceProvider } from "@/hooks/services//WorkspaceContext";
import { ProjectProvider } from "@/hooks/services//ProjectContext";
import { OrganizationProvider } from "@/hooks/services//OrganizationContext";

const ContextProviders: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <UserProvider>
      <WorkItemProvider>
        <WorkspaceProvider>
          <ProjectProvider>
            <OrganizationProvider>{children}</OrganizationProvider>
          </ProjectProvider>
        </WorkspaceProvider>
      </WorkItemProvider>
    </UserProvider>
  );
};

export default ContextProviders;
