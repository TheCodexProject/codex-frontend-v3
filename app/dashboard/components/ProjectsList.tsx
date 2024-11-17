"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Edit3 } from "lucide-react";
import { useProjects } from "@/hooks/services/ProjectService";
import { Workspace } from "@/services/models/Workspace";
import { useProject } from "@/contexts/ProjectContext";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { Project } from "@/services/models/Project";
import { DeleteProjectDialog } from "./DeleteProjectDialog";
import { EditProjectDialog } from "./EditProjectDialog";

interface ProjectsListProps {
  workspace: Workspace;
}

const ProjectsList: React.FC<ProjectsListProps> = ({ workspace }) => {
  const { setCurrentProject } = useProject();
  const { currentWorkspace, setCurrentWorkspace } = useWorkspace();
  const [pendingProject, setPendingProject] = useState<Project | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  const { data: projects = [], isLoading, isError } = useProjects(workspace.id);

  useEffect(() => {
    if (pendingProject && currentWorkspace?.id === workspace.id) {
      setCurrentProject(pendingProject);
      setPendingProject(null); // Clear pending project
    }
  }, [currentWorkspace, pendingProject, setCurrentProject, workspace.id]);

  const handleProjectClick = (project: (typeof projects)[0]) => {
    if (currentWorkspace?.id !== workspace.id) {
      setCurrentWorkspace(workspace);
      setPendingProject(project);
    } else {
      setCurrentProject(project);
    }
  };

  const openDeleteDialog = (project: Project) => {
    setProjectToDelete(project);
    setIsDeleteDialogOpen(true);
  };

  const openEditDialog = (project: Project) => {
    setProjectToEdit(project);
    setIsEditDialogOpen(true);
  };

  if (isLoading) {
    return <p>Loading projects...</p>;
  }

  if (isError) {
    return <p>Failed to load projects.</p>;
  }

  return (
    <div className="space-y-2">
      {projects.map((project) => (
        <div
          key={project.id}
          className="flex items-center justify-between w-full group"
        >
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleProjectClick(project)}
          >
            <span>{project.title}</span>
          </Button>
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary hover:text-primary/90"
              onClick={() => openEditDialog(project)}
            >
              <Edit3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive/90"
              onClick={() => openDeleteDialog(project)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      {projectToDelete && (
        <DeleteProjectDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          project={projectToDelete}
        />
      )}
      {projectToEdit && (
        <EditProjectDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          project={projectToEdit}
        />
      )}
    </div>
  );
};

export default ProjectsList;
