"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useUpdateOrganization,
  useDeleteOrganization,
  useOrganizations,
} from "@/hooks/services/OrganizationService";
import { useOrganization } from "@/contexts/OrganizationContext";
import { Organization } from "@/services/models/Organization";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";

export const EditDeleteOrganizationDialog: React.FC<{
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  organization: Organization | null; // Organization to edit
}> = ({ open, onOpenChange, organization }) => {
  const router = useRouter();
  const [name, setName] = useState<string>(organization?.name || "");
  const [isDeleting, setIsDeleting] = useState(false);

  const { currentUser, setCurrentUser } = useUser();
  const { currentOrganization, setCurrentOrganization } = useOrganization();
  const { data: organizations = [], isLoading: isLoadingOrganizations } =
    useOrganizations(currentUser?.id || "");

  const updateOrganizationMutation = useUpdateOrganization();
  const deleteOrganizationMutation = useDeleteOrganization();

  const isUpdating = updateOrganizationMutation.status === "pending";
  const isDeletingOrg = deleteOrganizationMutation.status === "pending";

  useEffect(() => {
    // Reset the name field when the dialog opens with a new organization
    if (organization) {
      setName(organization.name);
    }
  }, [organization]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Organization name cannot be empty.");
      return;
    }

    if (!organization) {
      console.error("No organization provided to update.");
      return;
    }

    updateOrganizationMutation.mutate(
      { id: organization.id, updates: { name: name.trim() } },
      {
        onSuccess: () => {
          // Update the current organization if it matches the edited one
          if (currentOrganization?.id === organization.id) {
            setCurrentOrganization({
              ...currentOrganization,
              name: name.trim(),
            });
          }
          onOpenChange(false); // Close dialog
        },
      }
    );
  };

  const handleDelete = () => {
    if (!organization) {
      console.error("No organization provided to delete.");
      return;
    }

    setIsDeleting(true);
    deleteOrganizationMutation.mutate(organization.id, {
      onSuccess: () => {
        // Clear the current organization if it's the one being deleted
        if (currentOrganization?.id === organization.id) {
          setCurrentOrganization(null);
          if (organizations.length <= 1) {
            router.push("/onboard");
          }
        }
        onOpenChange(false); // Close dialog
      },
      onError: () => {
        setIsDeleting(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Organization</DialogTitle>
          <DialogDescription>
            You can update the organization's name or delete it. Deleting an
            organization cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdate}>
          <div className="py-4">
            <Input
              id="organizationName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Organization Name"
              disabled={isUpdating || isDeletingOrg}
            />
            {updateOrganizationMutation.isError && (
              <p className="text-red-500 text-sm mt-2">
                {updateOrganizationMutation.error instanceof Error
                  ? updateOrganizationMutation.error.message
                  : "Failed to update organization. Please try again."}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isUpdating || isDeletingOrg}>
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeletingOrg || isUpdating}
            >
              {isDeletingOrg ? "Deleting..." : "Delete"}
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
