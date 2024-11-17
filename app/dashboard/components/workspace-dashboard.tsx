"use client";

import * as React from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Dialog } from "@/components/ui/dialog";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useOrganization } from "@/contexts/OrganizationContext";
import {
  useWorkspaces,
  useDeleteWorkspace,
} from "@/hooks/services/WorkspaceService";
import ProjectsList from "./ProjectsList";
import { CreateWorkspaceDialogContent } from "./CreateWorkspaceDialogContent";
import { EditWorkspaceDialogContent } from "./EditWorkspaceDialogContent";

export default function WorkspaceDashboard() {
  const { setCurrentWorkspace } = useWorkspace();
  const { currentOrganization } = useOrganization();
  const { data: workspaces = [] } = useWorkspaces(
    currentOrganization?.id || ""
  );

  const deleteWorkspaceMutation = useDeleteWorkspace();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);

  const handleDeleteWorkspace = (id: string) => {
    deleteWorkspaceMutation.mutate(id);
  };

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
            <Card key={workspace.id} className="flex flex-col group">
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  {workspace.title}
                </CardTitle>
                <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setCurrentWorkspace(workspace);
                            setIsEditDialogOpen(true);
                          }}
                          className="h-8 w-8 p-0 hover:text-primary"
                          aria-label={`Edit ${workspace.title} workspace`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit workspace</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive/90"
                              aria-label={`Delete ${workspace.title} workspace`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the {workspace.title}{" "}
                                workspace and all of its projects.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleDeleteWorkspace(workspace.id)
                                }
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete workspace</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-sm text-muted-foreground mb-4">
                  {workspace.projects.length} Projects
                </div>
                <ProjectsList workspace={workspace} />
              </CardContent>
            </Card>
          ))}

          {/* Add New Workspace */}
          <Card className="flex items-center justify-center border-2 border-dashed cursor-pointer transition-colors">
            <Button
              variant="ghost"
              className="h-full w-full text-primary"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Plus className="mr-2 h-5 w-5" />
              Create New Workspace
            </Button>
          </Card>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <CreateWorkspaceDialogContent
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            />
          </Dialog>

          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <EditWorkspaceDialogContent
              open={isEditDialogOpen}
              onOpenChange={setIsEditDialogOpen}
            />
          </Dialog>
        </div>
      </div>
    </div>
  );
}
