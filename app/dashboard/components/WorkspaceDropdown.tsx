"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Workspace } from "@/services/models/Workspace";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useProject } from "@/contexts/ProjectContext";
import { useProjects } from "@/hooks/services/ProjectService";

interface WorkspaceDropdownProps {
  workspace: Workspace;
}

const WorkspaceDropdown: React.FC<WorkspaceDropdownProps> = ({ workspace }) => {
  const { currentWorkspace, setCurrentWorkspace } = useWorkspace();
  const { setCurrentProject } = useProject();
  const { data: projects = [], isLoading } = useProjects(workspace.id);

  const isOpen = currentWorkspace?.id === workspace.id;

  const handleToggle = () => {
    setCurrentWorkspace(isOpen ? null : workspace);
  };

  const handleProjectSelect = (project: any) => {
    setCurrentProject(project); // Set the clicked project as the current project
  };

  return (
    <Collapsible open={isOpen}>
      <CollapsibleTrigger asChild>
        <SidebarMenuButton
          className="flex w-full items-center justify-between group relative pl-4 border-l-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={handleToggle}
        >
          <span className="flex items-center">
            <span className="ml-2 text-sm">{workspace.title}</span>
          </span>
          <ChevronRight
            className={`h-4 w-4 transition-transform duration-200 ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {isLoading ? (
          <p className="ml-4 text-sm text-muted-foreground">
            Loading projects...
          </p>
        ) : (
          <SidebarMenu className="ml-4">
            {projects.map((project) => (
              <SidebarMenuItem key={project.id}>
                <SidebarMenuButton
                  className="group flex items-center py-1 text-sm"
                  onClick={() => handleProjectSelect(project)} // Handle project click
                >
                  {project.title}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default WorkspaceDropdown;
