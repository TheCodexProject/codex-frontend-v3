"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOrganizationData } from "@/hooks/services/OrganizationContext"; // Import the context hook

interface CreateOrganizationDialogProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

export function CreateOrganizationDialog({
  isOpen,
  setOpen,
}: CreateOrganizationDialogProps) {
  const [newOrgName, setNewOrgName] = React.useState(""); // Track the input for organization name
  const [isLoading, setIsLoading] = React.useState(false); // Track loading state
  const { createOrganization } = useOrganizationData(); // Use the context to access the createOrganization method

  // Hardcoded ownerId
  const ownerId = "a298577d-f2e2-45f8-981e-fc220d036007";

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await createOrganization(newOrgName, ownerId); // Create the organization via context
      setNewOrgName(""); // Reset input field
      setOpen(false); // Close the dialog
    } catch (error) {
      console.error("Error creating organization:", error);
    } finally {
      setIsLoading(false); // Stop the loading spinner
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] dark:text-gray-100">
        <DialogHeader>
          <DialogTitle>Create New Organization</DialogTitle>
          <DialogDescription className="dark:text-gray-400">
            Enter a name for your new organization. You can add more details
            later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="org-name"
                className="text-right dark:text-gray-300"
              >
                Name
              </Label>
              <Input
                id="org-name"
                value={newOrgName}
                onChange={(e) => setNewOrgName(e.target.value)}
                className="col-span-3"
                placeholder="Enter organization name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!newOrgName.trim() || isLoading}>
              {isLoading ? "Creating..." : "Create Organization"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
