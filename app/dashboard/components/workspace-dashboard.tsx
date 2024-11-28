"use client";

import React, { useState } from "react";
import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Dialog } from "@/components/ui/dialog";
import { useOrganization } from "@/contexts/OrganizationContext";
import { useWorkspaces } from "@/hooks/services/WorkspaceService";
import WorkspaceCard from "./WorkspaceCard";
import { CreateWorkspaceDialogContent } from "./CreateWorkspaceDialogContent";

export default function WorkspaceDashboard() {
  const { currentOrganization } = useOrganization();
  const { data: workspaces = [] } = useWorkspaces(
    currentOrganization?.id || ""
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredWorkspaces = workspaces.filter((workspace) =>
    workspace.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col w-full">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border bg-background px-6 py-4 w-full">
        <div className="flex-1 flex items-center">
          <SidebarTrigger className="mr-4" />
          <span className="text-sm font-bold text-foreground">Dashboard</span>
        </div>
        <div className="flex items-center space-x-4 flex-1 justify-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search workspaces and projects..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search workspaces and projects"
            />
          </div>
        </div>
        <div className="flex-1" />
      </header>

      {/* Workspace List */}
      <div className="flex-1 overflow-y-auto p-6 w-full">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {filteredWorkspaces.map((workspace) => (
            <WorkspaceCard key={workspace.id} workspace={workspace} />
          ))}

          {/* Add New Workspace */}
          <div className="flex items-center justify-center border-2 border-dashed cursor-pointer transition-colors">
            <Button
              variant="ghost"
              className="h-full w-full text-primary"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Plus className="mr-2 h-5 w-5" />
              Create New Workspace
            </Button>
          </div>
        </div>
      </div>

      {/* Create Workspace Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <CreateWorkspaceDialogContent
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
        />
      </Dialog>
    </div>
  );
}
