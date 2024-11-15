"use client";

import * as React from "react";
import {
  ChevronDown,
  ChevronRight,
  Folder,
  LayoutDashboard,
  Plus,
  Search,
  Settings,
  Pencil,
  Trash2,
  Briefcase,
  Code,
  Megaphone,
  DollarSign,
  Users,
  FileText,
  Calendar,
  User,
  LogOut,
  ChevronUp,
  Moon,
  Sun,
  Building,
} from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateOrganizationDialog } from "@/container Components/pop-ups/organization/createOrganizationDialog";
import { useOrganizationData } from "@/hooks/services/OrganizationContext";

import { EditWorkspaceDialog } from "@/container Components/pop-ups/workspace/editWorkspaceDialog";
import { DeleteWorkspaceDialog } from "@/container Components/pop-ups/workspace/DeleteWorkspaceDialog";
import { CreateWorkspaceDialog } from "@/container Components/pop-ups/workspace/createWorkspaceDialog";
import { useWorkspaceData } from "@/hooks/services/WorkspaceContext";
import { Workspace } from "@/services/models/Workspace";

const currentUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "/placeholder.svg?height=32&width=32",
};

const availableIcons = [
  { name: "Folder", icon: Folder },
  { name: "Briefcase", icon: Briefcase },
  { name: "LayoutDashboard", icon: LayoutDashboard },
  { name: "Code", icon: Code },
  { name: "Megaphone", icon: Megaphone },
  { name: "DollarSign", icon: DollarSign },
  { name: "Users", icon: Users },
  { name: "FileText", icon: FileText },
  { name: "Calendar", icon: Calendar },
  { name: "Settings", icon: Settings },
];

const availableColors = [
  "#4CAF50",
  "#2196F3",
  "#FFC107",
  "#E91E63",
  "#9C27B0",
  "#FF5722",
  "#795548",
  "#607D8B",
];

export default function OrganizationDashboard() {
  const { organizations, getOrganizations } = useOrganizationData();
  const [currentOrganization, setCurrentOrganization] = React.useState(
    organizations[0]
  );

  const { workspaces, getWorkspaces } = useWorkspaceData();

  const [isCreateWorkspaceDialogOpen, setIsCreateWorkspaceDialogOpen] =
    React.useState(false);
  const [isCreateOrgDialogOpen, setIsCreateOrgDialogOpen] =
    React.useState(false);
  const [editingWorkspace, setEditingWorkspace] =
    React.useState<Workspace | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [deletingWorkspace, setDeletingWorkspace] =
    React.useState<Workspace | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    getOrganizations();
    getWorkspaces();
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    if (organizations && organizations.length > 0) {
      setCurrentOrganization(organizations[0]);
    }
  }, [organizations]);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const handleEditWorkspace = (workspace: Workspace) => {
    if (workspace) {
      setEditingWorkspace(workspace);
      setIsEditDialogOpen(true);
    }
  };

  const handleDeleteWorkspace = (workspace: Workspace) => {
    if (workspace) {
      setDeletingWorkspace(workspace);
      setIsDeleteDialogOpen(true);
    }
  };

  const renderIcon = (iconName: string, color: string) => {
    const IconComponent =
      availableIcons.find((i) => i.name === iconName)?.icon || Folder;
    return <IconComponent className="h-5 w-5" style={{ color: color }} />;
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const filteredWorkspaces = workspaces.filter(
    (workspace) =>
      workspace.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workspace.projects.some((project) =>
        project.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  if (isLoading) {
    return <>isLoading</>;
  }

  return (
    <SidebarProvider>
      <div
        className={`flex h-screen overflow-hidden ${isDarkMode ? "dark" : ""}`}
      >
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
                      <AvatarImage alt={currentOrganization?.name} />
                      <AvatarFallback>
                        {currentOrganization?.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        {currentOrganization?.name}
                      </span>
                    </div>
                    <ChevronDown className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {organizations.map((org) => (
                    <DropdownMenuItem
                      key={org.id}
                      onSelect={() => setCurrentOrganization(org)}
                    >
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage alt={org.name} />
                        <AvatarFallback>{org.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {org.name}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={() => setIsCreateOrgDialogOpen(true)}
                  >
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
                  <SidebarMenuButton asChild>
                    <Link
                      href="/dashboard"
                      className="flex items-center text-primary bg-accent font-bold"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4 text-primary" />
                      Dashboard
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <div className="mt-4">
                  <h3 className="mb-2 px-4 text-xs font-semibold uppercase text-muted-foreground">
                    Workspaces
                  </h3>
                  {workspaces.map((workspace) => (
                    <Collapsible key={workspace.id}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="flex w-full items-center justify-between group relative pl-4 border-l-2 border-transparent data-[state=open]:border-gray-300 dark:data-[state=open]:border-gray-600 data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800">
                          <span className="flex items-center">
                            {/* {renderIcon(workspace.icon, workspace.color)} */}
                            <span className="ml-2 text-sm">
                              {workspace.title}
                            </span>
                          </span>
                          <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenu className="ml-4">
                          {workspace.projects.map((project) => (
                            <SidebarMenuItem key={project}>
                              <SidebarMenuButton asChild>
                                <Link
                                  href={`/workspace/${workspace.id}/project/${project}`}
                                  className="group flex items-center py-1 text-sm"
                                >
                                  {project}
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </SidebarMenu>
            </ScrollArea>
          </SidebarContent>
          <SidebarFooter className="border-t border-gray-200 dark:border-gray-700 pt-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="w-full justify-between">
                      <div className="flex items-center">
                        <Avatar className="mr-2 h-6 w-6">
                          <AvatarImage
                            src={currentUser.avatar}
                            alt={currentUser.name}
                          />
                          <AvatarFallback>
                            {currentUser.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {currentUser.name}
                      </div>
                      <ChevronUp className="h-4 w-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={toggleDarkMode}>
                      {isDarkMode ? (
                        <>
                          <Sun className="mr-2 h-4 w-4" />
                          <span>Light Mode</span>
                        </>
                      ) : (
                        <>
                          <Moon className="mr-2 h-4 w-4" />
                          <span>Dark Mode</span>
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 overflow-hidden w-screen bg-background">
          <div className="flex h-full flex-col w-full">
            <header className="flex items-center justify-between border-b border-border bg-background px-6 py-4 w-full">
              <div className="flex-1 flex items-center">
                <SidebarTrigger className="mr-4" />
                <span className="text-sm font-bold text-foreground">
                  Dashboard
                </span>
              </div>
              <div className="flex items-center space-x-4 flex-1 justify-center">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search workspaces and projects..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search workspaces and projects"
                  />
                </div>
              </div>
              <div className="flex-1" />
            </header>
            <div className="flex-1 overflow-y-auto p-6 w-full">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
                {filteredWorkspaces.map((workspace) => (
                  <Card key={workspace.id} className="flex flex-col group">
                    <CardHeader className="relative">
                      <CardTitle className="flex items-center gap-2 text-foreground">
                        {/* {renderIcon(workspace.icon, workspace.color)} */}
                        {workspace.title}
                      </CardTitle>
                      <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditWorkspace(workspace)}
                                className="h-8 w-8 p-0 hover:text-primary"
                                aria-label={`Edit ${workspace.title} workspace`}
                              >
                                <span className="sr-only">Edit workspace</span>
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit workspace</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteWorkspace(workspace)}
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive/90"
                                aria-label={`Delete ${workspace.title} workspace`}
                              >
                                <span className="sr-only">
                                  Delete workspace
                                </span>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete workspace</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="text-sm text-muted-foreground mb-4">
                        {workspace.title
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                          ? workspace.projects.length
                          : workspace.projects.filter((project) =>
                              project
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase())
                            ).length}{" "}
                        Projects
                      </div>
                      <div className="space-y-2">
                        {(workspace.title
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                          ? workspace.projects
                          : workspace.projects.filter((project) =>
                              project
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase())
                            )
                        ).map((project) => (
                          <Link
                            key={project}
                            href={`/workspace/${workspace.id}/project/${project}`}
                            className="flex items-center justify-between rounded-lg py-2 text-sm hover:text-primary transition-colors group"
                          >
                            <span>{project}</span>
                            <ChevronRight className="h-4 w-4 transition-transform hover:translate-x-1" />
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <CreateWorkspaceDialog
                  isOpen={isCreateWorkspaceDialogOpen}
                  setOpen={setIsCreateWorkspaceDialogOpen}
                  organization={currentOrganization!}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
      <EditWorkspaceDialog
        isOpen={isEditDialogOpen}
        setOpen={setIsCreateOrgDialogOpen}
        workspace={editingWorkspace!}
      />
      <DeleteWorkspaceDialog
        isOpen={isDeleteDialogOpen}
        setOpen={setIsDeleteDialogOpen}
        workspace={deletingWorkspace!}
      />
      <CreateOrganizationDialog
        isOpen={isCreateOrgDialogOpen}
        setOpen={setIsCreateOrgDialogOpen}
      />
      <style jsx>{`
        .group:hover .group-hover\:translate-x-1 {
          transform: translateX(0.25rem);
        }
      `}</style>
    </SidebarProvider>
  );
}
