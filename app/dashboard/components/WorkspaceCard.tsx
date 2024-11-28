"use client";

import React, { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useDeleteWorkspace } from "@/hooks/services/WorkspaceService";
import { Workspace } from "@/services/models/Workspace";
import { useProjects } from "@/hooks/services/ProjectService";
import { Project } from "@/services/models/Project";
import { EditWorkspaceDialogContent } from "./EditWorkspaceDialogContent";
import { CreateProjectDialogContent } from "./CreateProjectDialogContent";
import ProjectCard from "./ProjectCard";

interface WorkspaceCardProps {
  workspace: Workspace;
}

const WorkspaceCard: React.FC<WorkspaceCardProps> = ({ workspace }) => {
  const deleteWorkspaceMutation = useDeleteWorkspace();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateProjectDialogOpen, setIsCreateProjectDialogOpen] =
    useState(false);

  const { data: projects = [], isLoading, isError } = useProjects(workspace.id);

  const handleDeleteWorkspace = () => {
    deleteWorkspaceMutation.mutate(workspace.id);
  };

  return (
    <Card key={workspace.id} className="flex flex-col group">
      {/* Header */}
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
                  className="h-8 w-8 p-0 hover:text-primary"
                  aria-label={`Edit ${workspace.title} workspace`}
                  onClick={() => setIsEditDialogOpen(true)}
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
                        This action cannot be undone. This will permanently
                        delete the {workspace.title} workspace and all of its
                        projects.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteWorkspace}>
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

      {/* Content */}
      <CardContent className="flex-1">
        <div className="text-sm text-muted-foreground mb-2">
          {projects.length} Projects
        </div>
        {isLoading && <p>Loading projects...</p>}
        {isError && <p>Failed to load projects.</p>}
        <div>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onProjectClick={() => {}}
            />
          ))}
        </div>
        <Button
          variant="ghost"
          className="mt-4 w-full text-primary border-2 border-dashed cursor-pointer transition-colors"
          onClick={() => setIsCreateProjectDialogOpen(true)}
        >
          <Plus className="mr-2 h-5 w-5" />
          Create New Project
        </Button>
      </CardContent>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <EditWorkspaceDialogContent
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          workspace={workspace}
        />
      </Dialog>

      {/* Create Project Dialog */}
      <Dialog
        open={isCreateProjectDialogOpen}
        onOpenChange={setIsCreateProjectDialogOpen}
      >
        <CreateProjectDialogContent
          open={isCreateProjectDialogOpen}
          onOpenChange={setIsCreateProjectDialogOpen}
          workspaceId={workspace.id}
        />
      </Dialog>
    </Card>
  );
};

export default WorkspaceCard;
