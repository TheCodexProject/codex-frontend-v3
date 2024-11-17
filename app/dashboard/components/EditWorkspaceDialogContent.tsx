"use client";

import React, { useEffect, useState } from "react";
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
import { useUpdateWorkspace } from "@/hooks/services/WorkspaceService";
import { useWorkspace } from "@/contexts/WorkspaceContext";

export const EditWorkspaceDialogContent: React.FC<{
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}> = ({ open, onOpenChange }) => {
  const { currentWorkspace } = useWorkspace();
  const updateWorkspaceMutation = useUpdateWorkspace();
  const [name, setName] = useState("");

  useEffect(() => {
    if (currentWorkspace) {
      setName(currentWorkspace.title);
    }
  }, [currentWorkspace]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !currentWorkspace) {
      return;
    }

    updateWorkspaceMutation.mutate(
      {
        id: currentWorkspace.id,
        updates: {
          title: name.trim(),
          contactsToAdd: [],
          contactsToRemove: [],
          projectsToAdd: [],
          projectsToRemove: [],
        },
      },
      {
        onSuccess: () => {
          setName(""); // Reset name field after successful update
          onOpenChange(false); // Close the dialog
        },
      }
    );
  };

  const isLoading = updateWorkspaceMutation.status === "pending";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Workspace</DialogTitle>
          <DialogDescription>
            Make changes to your workspace here.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                required
                disabled={isLoading}
              />
            </div>
            {updateWorkspaceMutation.status === "error" && (
              <p className="text-red-500 text-sm col-span-4 mt-2">
                {updateWorkspaceMutation.error?.message ||
                  "Failed to update workspace. Please try again."}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading || !name.trim()}
              className="mr-2"
            >
              {isLoading ? "Saving..." : "Save Changes"}
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
