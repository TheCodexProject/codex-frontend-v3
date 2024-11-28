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
import { useCreateWorkspace } from "@/hooks/services/WorkspaceService";
import { useOrganization } from "@/contexts/OrganizationContext";

export const CreateWorkspaceDialogContent: React.FC<{
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}> = ({ open, onOpenChange }) => {
  const { currentOrganization } = useOrganization();
  const createWorkspaceMutation = useCreateWorkspace();

  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      // Simple validation
      return;
    }

    if (!currentOrganization) {
      console.warn("No organization is selected.");
      return;
    }

    createWorkspaceMutation.mutate(
      {
        title: name.trim(),
        organizationId: currentOrganization.id,
      },
      {
        onSuccess: () => {
          setName(""); // Reset form on success
          onOpenChange(false); // Close the dialog
        },
      }
    );
  };

  const isLoading = createWorkspaceMutation.status === "pending";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Workspace</DialogTitle>
          <DialogDescription>
            Add a new workspace to organize your projects.
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
            {createWorkspaceMutation.status === "error" && (
              <p className="text-red-500 text-sm col-span-4 mt-2">
                {createWorkspaceMutation.error?.message ||
                  "Failed to create workspace. Please try again."}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading || !name.trim()}
              className="mr-2"
            >
              {isLoading ? "Creating..." : "Create Workspace"}
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
