"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Edit3 } from "lucide-react";
import { Project } from "@/services/models/Project";
import { DeleteProjectDialog } from "./DeleteProjectDialog";
import { EditProjectDialog } from "./EditProjectDialog";

interface ProjectCardProps {
  project: Project;
  onProjectClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onProjectClick,
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleDeleteDialog = () => setIsDeleteDialogOpen(true);
  const handleEditDialog = () => setIsEditDialogOpen(true);

  return (
    <div className="flex items-center justify-between w-full group">
      <Button
        variant="ghost"
        className="w-full justify-start"
        onClick={() => onProjectClick(project)}
      >
        <span>{project.title}</span>
      </Button>
      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="text-primary hover:text-primary/90"
          onClick={handleEditDialog}
        >
          <Edit3 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive/90"
          onClick={handleDeleteDialog}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Delete Project Dialog */}
      <DeleteProjectDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        project={project}
      />

      {/* Edit Project Dialog */}
      <EditProjectDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        project={project}
      />
    </div>
  );
};

export default ProjectCard;
