"use client";

import React, { useState } from "react";
import { CreateOrganizationDialog } from "@/container Components/pop-ups/organization/createOrganizationDialog";
import { OrganizationProvider } from "@/hooks/services/OrganizationContext";

export default function TestPage() {
  const [isDialogOpen, setDialogOpen] = useState(false);

  // Simulated user ID (replace with actual logic for getting the current user's ID)
  const currentUserId = "a298577d-f2e2-45f8-981e-fc220d036007";

  return <></>;
}
