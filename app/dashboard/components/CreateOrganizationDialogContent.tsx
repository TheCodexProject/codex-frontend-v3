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
import { useCreateOrganization } from "@/hooks/services/OrganizationService";
import { useUser } from "@/contexts/UserContext";

export const CreateOrganizationDialogContent: React.FC<{
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}> = ({ open, onOpenChange }) => {
  const { currentUser } = useUser();
  const createOrganizationMutation = useCreateOrganization();

  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      // Simple validation
      return;
    }

    if (!currentUser) {
      console.warn("No current user available.");
      return;
    }

    createOrganizationMutation.mutate(
      {
        name: name.trim(),
        ownerId: currentUser.id,
      },
      {
        onSuccess: () => {
          setName(""); // Reset form on success
          onOpenChange(false); // Close the dialog
        },
      }
    );
  };

  const isLoading = createOrganizationMutation.status === "pending";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Organization</DialogTitle>
          <DialogDescription>
            Add a new organization to manage your workspaces.
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
            {createOrganizationMutation.status === "error" && (
              <p className="text-red-500 text-sm col-span-4 mt-2">
                {createOrganizationMutation.error?.message ||
                  "Failed to create organization. Please try again."}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading || !name.trim()}
              className="mr-2"
            >
              {isLoading ? "Creating..." : "Create Organization"}
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
