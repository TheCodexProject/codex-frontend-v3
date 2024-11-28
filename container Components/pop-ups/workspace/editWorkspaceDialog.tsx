"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
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
import { Workspace } from "@/services/models/Workspace";
import { useWorkspaceData } from "@/hooks/services/WorkspaceContext";
import { useUserData } from "@/hooks/services/UserContext";

interface EditWorkspaceDialogProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  workspace: Workspace;
}

export function EditWorkspaceDialog({
  isOpen,
  setOpen,
  workspace,
}: EditWorkspaceDialogProps) {
  if (!workspace) {
    return;
  }

  const { updateWorkspace } = useWorkspaceData();
  const { users: availableContacts } = useUserData();

  const [title, setTitle] = useState(workspace.title);
  const [contactsToAdd, setContactsToAdd] = useState<string[]>([]);
  const [contactsToRemove, setContactsToRemove] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setTitle(workspace.title);
      setContactsToAdd([]);
      setContactsToRemove([]);
      setErrors([]);
    }
  }, [isOpen, workspace]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      setErrors(["Workspace title is required."]);
      return;
    }

    setIsLoading(true);
    try {
      await updateWorkspace(
        workspace.id,
        title,
        contactsToAdd,
        contactsToRemove,
        [],
        []
      );
      setOpen(false);
    } catch (err) {
      setErrors([
        err instanceof Error ? err.message : "An unexpected error occurred.",
      ]);
    } finally {
      setIsLoading(false);
    }
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

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] dark:text-gray-100">
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
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter workspace title"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label>Contacts</Label>
            <div className="col-span-3">
              {availableContacts?.map((contact) => (
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
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Update"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
