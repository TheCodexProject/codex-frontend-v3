"use client";

import React, { useState } from "react";
import { CreateOrganizationDialog } from "@/container Components/pop-ups/organization/createOrganizationDialog";
import { OrganizationProvider } from "@/hooks/services/OrganizationContext";

export default function TestPage() {
  const [isDialogOpen, setDialogOpen] = useState(false);

  // Simulated user ID (replace with actual logic for getting the current user's ID)
  const currentUserId = "a298577d-f2e2-45f8-981e-fc220d036007";

  return (
    <OrganizationProvider>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">
          Test CreateOrganizationDialog
        </h1>
        <button
          onClick={() => setDialogOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Open Create Organization Dialog
        </button>
        <CreateOrganizationDialog
          isOpen={isDialogOpen}
          setOpen={setDialogOpen}
          ownerId={currentUserId}
        />
      </div>
    </OrganizationProvider>
  );
}
