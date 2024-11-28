"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateProjectMilestone } from "@/hooks/services/ProjectService";
import { useProject } from "@/contexts/ProjectContext";

export const CreateMilestoneDialogContent: React.FC<{
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}> = ({ open, onOpenChange }) => {
  const { currentProject } = useProject();
  const createMilestoneMutation = useCreateProjectMilestone();

  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      // Simple validation
      return;
    }

    if (!currentProject) {
      console.warn("No project is selected.");
      return;
    }

    createMilestoneMutation.mutate(
      {
        projectId: currentProject.id,
        title: title.trim(),
      },
      {
        onSuccess: () => {
          setTitle(""); // Reset form on success
          onOpenChange(false); // Close the dialog
        },
      }
    );
  };

  const isLoading = createMilestoneMutation.status === "pending";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Milestone</DialogTitle>
          <DialogDescription>
            Add a new milestone to organize your project's progress.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                required
                disabled={isLoading}
              />
            </div>
            {createMilestoneMutation.status === "error" && (
              <p className="text-red-500 text-sm col-span-4 mt-2">
                {createMilestoneMutation.error?.message ||
                  "Failed to create milestone. Please try again."}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading || !title.trim()}
              className="mr-2"
            >
              {isLoading ? "Creating..." : "Create Milestone"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
