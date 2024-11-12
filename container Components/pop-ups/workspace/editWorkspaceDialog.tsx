"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import WorkspaceService from "@/services/features/WorkspaceService";
import { Workspace } from "@/services/models/Workspace";
import { User } from "@/services/models/User";

const TitleSchema = z.string().min(1, "Workspace title is required.");

type EditWorkspaceDialogProps = {
  workspace: Workspace;
  trigger: React.ReactNode;
  availableContacts: User[];
  onWorkspaceUpdated?: (updatedWorkspace: Workspace) => void;
  onWorkspaceDeleted?: (workspaceId: string) => void; // Callback for when the workspace is deleted
};

export function EditWorkspaceDialog({
  workspace,
  trigger,
  availableContacts,
  onWorkspaceUpdated,
  onWorkspaceDeleted,
}: EditWorkspaceDialogProps) {
  const [title, setTitle] = useState(workspace.title);
  const [contactsToAdd, setContactsToAdd] = useState<string[]>([]);
  const [contactsToRemove, setContactsToRemove] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setTitle(workspace.title);
      setContactsToAdd([]);
      setContactsToRemove([]);
    }
  }, [isOpen, workspace]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContactToggle = (contactId: string) => {
    if (workspace.contacts.some((contact) => contact.id === contactId)) {
      setContactsToRemove((prev) =>
        prev.includes(contactId)
          ? prev.filter((id) => id !== contactId)
          : [...prev, contactId]
      );
      setContactsToAdd((prev) => prev.filter((id) => id !== contactId));
    } else {
      setContactsToAdd((prev) =>
        prev.includes(contactId)
          ? prev.filter((id) => id !== contactId)
          : [...prev, contactId]
      );
      setContactsToRemove((prev) => prev.filter((id) => id !== contactId));
    }
  };

  const handleSubmit = async () => {
    const validationResult = TitleSchema.safeParse(title);
    if (!validationResult.success) {
      setErrors([validationResult.error.errors[0].message]);
      return;
    }

    setLoading(true);

    try {
      const updatedWorkspace = await WorkspaceService.updateWorkspace(
        workspace.id,
        title,
        contactsToAdd,
        contactsToRemove,
        [], // No projects to add
        [] // No projects to remove
      );

      setErrors([]);
      setLoading(false);
      setIsOpen(false);

      onWorkspaceUpdated?.(updatedWorkspace);
    } catch (err) {
      setErrors([
        err instanceof Error ? err.message : "An unexpected error occurred.",
      ]);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await WorkspaceService.deleteWorkspace(workspace.id);
      setLoading(false);
      setIsOpen(false);
      onWorkspaceDeleted?.(workspace.id); // Trigger callback after deletion
    } catch (err) {
      setErrors([
        err instanceof Error ? err.message : "An unexpected error occurred.",
      ]);
      setLoading(false);
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setErrors([]);
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <div onClick={() => setIsOpen(true)}>{trigger}</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Workspace</DialogTitle>
          <DialogDescription>
            Update the details for the selected workspace.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title">Title</Label>
            <div className="col-span-3">
              <Input
                id="title"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter workspace title"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label>Contacts</Label>
            <div className="col-span-3">
              {availableContacts.map((contact) => (
                <div key={contact.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={
                      contactsToAdd.includes(contact.id) ||
                      (!contactsToRemove.includes(contact.id) &&
                        workspace.contacts.some((c) => c.id === contact.id))
                    }
                    onChange={() => handleContactToggle(contact.id)}
                    className="mr-2"
                  />
                  <span>
                    {contact.firstname} {contact.lastname}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {errors.length > 0 && (
            <div className="text-red-500 text-sm mt-2">
              <ul className="list-disc ml-5">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <DialogFooter className="flex justify-between">
          <Button
            disabled={loading}
            variant="destructive"
            type="button"
            onClick={handleDelete}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Delete Workspace"
            )}
          </Button>
          <Button disabled={loading} type="button" onClick={handleSubmit}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Update Workspace"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
