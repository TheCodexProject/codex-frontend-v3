"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Plus,
  Edit3, // Edit icon
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { useUser } from "@/contexts/UserContext";
import { useOrganization } from "@/contexts/OrganizationContext";
import { useWorkspaces } from "@/hooks/services/WorkspaceService";
import { useOrganizations } from "@/hooks/services/OrganizationService";
import WorkspaceDropdown from "./WorkspaceDropdown";
import { CreateOrganizationDialogContent } from "./CreateOrganizationDialogContent";
import { EditDeleteOrganizationDialog } from "./EditDeleteOrganizationDialog";
import { Organization } from "@/services/models/Organization";

export default function SidebarTemplate() {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useUser();
  const { currentOrganization, setCurrentOrganization } = useOrganization();
  const { data: organizations = [], isLoading: isLoadingOrganizations } =
    useOrganizations(currentUser?.id || "");
  const { data: workspaces = [], isLoading: isLoadingWorkspaces } =
    useWorkspaces(currentOrganization?.id || "");

  const [openWorkspaces, setOpenWorkspaces] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for both dialogs
  const [organizationToEdit, setOrganizationToEdit] =
    useState<Organization | null>(null); // Currently selected organization for editing

  useEffect(() => {
    if (
      !isLoadingOrganizations &&
      currentUser &&
      !currentOrganization &&
      organizations.length > 0
    ) {
      setCurrentOrganization(organizations[0]);
    }
  }, [
    isLoadingOrganizations,
    currentUser,
    currentOrganization,
    organizations,
    setCurrentOrganization,
  ]);

  useEffect(() => {
    if (
      !isLoadingOrganizations &&
      currentUser &&
      !currentOrganization &&
      organizations.length === 0
    ) {
      router.push("/onboard");
    }
  }, [
    isLoadingOrganizations,
    currentUser,
    currentOrganization,
    organizations,
    router,
  ]);

  const toggleWorkspace = (workspaceId: string) => {
    setOpenWorkspaces((prev) =>
      prev.includes(workspaceId)
        ? prev.filter((id) => id !== workspaceId)
        : [...prev, workspaceId]
    );
  };

  const handleLogout = () => {
    setCurrentUser(null); // Clear current user
    setCurrentOrganization(null); // Optional: Clear current organization
    router.push("/login"); // Redirect to login page
  };

  const openEditDialog = (organization: Organization) => {
    setOrganizationToEdit(organization);
    setIsDialogOpen(true);
  };

  if (!currentUser || !currentOrganization) {
    return null; // Prevent rendering until redirection
  }

  return (
    <>
      <Sidebar className="border-r border-border">
        <SidebarHeader>
          <div className="flex items-center justify-between gap-2 px-4 py-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-0 hover:bg-gray-100 dark:hover:bg-gray-800 group flex items-center rounded-md transition-colors"
                >
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback>
                      {currentOrganization?.name?.charAt(0) || "N"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      {currentOrganization?.name || "Select Organization"}
                    </span>
                  </div>
                  <ChevronRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {organizations.map((org) => (
                  <DropdownMenuItem
                    key={org.id}
                    onSelect={() => setCurrentOrganization(org)}
                  >
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarFallback>{org.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{org.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent the parent `DropdownMenuItem` from triggering
                          openEditDialog(org);
                        }}
                        className="h-8 w-8 p-0 hover:text-primary"
                        aria-label={`Edit ${org.name} organization`}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setIsDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Organization
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Link href="/dashboard" className="flex items-center">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <div className="mt-4">
                <h3 className="mb-2 px-4 text-xs font-semibold uppercase text-muted-foreground">
                  Workspaces
                </h3>
                {workspaces.map((workspace) => (
                  <WorkspaceDropdown key={workspace.id} workspace={workspace} />
                ))}
              </div>
            </SidebarMenu>
          </ScrollArea>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <div className="flex items-center">
                  <Avatar className="mr-2 h-6 w-6">
                    <AvatarFallback>
                      {currentUser.firstname[0]}
                      {currentUser.lastname[0]}
                    </AvatarFallback>
                  </Avatar>
                  {`${currentUser.firstname} ${currentUser.lastname}`}
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Edit/Delete Organization Dialog */}
      <EditDeleteOrganizationDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        organization={organizationToEdit}
      />
    </>
  );
}
