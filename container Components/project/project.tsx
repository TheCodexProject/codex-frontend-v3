"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";

//import { ThemeProvider } from "@/components/ui/theme-provider"

import { Badge } from "@/components/ui/badge"
import { ThemeModeToggle } from "@/components/theme-mode-toggle"

//import { WorkItemEditDialog } from "@/app/workItem/dialog/work-item-edit-dialog"
import { CreateWorkitemDialog } from "@/container Components/pop-ups/workitem/createWorkitemDialog"
import { EditWorkItemDialog, Priority, Status } from "@/container Components/pop-ups/workitem/editWorkitemDialog"
import { WorkItem } from "@/services/models/WorkItem"
import { User } from "@/services/models/User"
import { WorkItemService } from "@/services/features/WorkItemService"

export function chooseBadgePriorityColor(priority: "High" | "Medium" | "Low" | "None"): string {
  //const colorMap: { [key: string]: string } = {
  //  High: "Red",
  //  Medium: "Orange",
  //  Low: "Green",
  //  None: "default"
  //};

  const colorMap: { [key: string]: string } = {
    High: "destructive",
    Medium: "secondary",
    Low: "outline",
    None: "default"
  };


  return colorMap[priority] || "default";
}

export function chooseBadgeStatusColor(status: "Open" | "In Progress" | "Completed" | "None"): string {
  //const colorMap: { [key: string]: string } = {
  //  Open: "Blue",
  //  "In Progress": "Yellow",
  //  Completed: "Green",
  //  None: "default"
  //};

  const colorMap: { [key: string]: string } = {
    Open: "destructive",
    "In Progress": "secondary",
    Completed: "outline",
    None: "default"
  };

  return colorMap[status] || "default";
}
 
export const columns: ColumnDef<WorkItem>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="italic truncate max-w-xs">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const badgeVariant = chooseBadgeStatusColor(status as "None" | "Open" | "In Progress" | "Completed") ;
      return (
        <div className="capitalize">
          <Badge variant={badgeVariant as "destructive" || "secondary" || "outline" ||"default"}>{row.getValue("status")}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Priority
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const priority = row.getValue("priority");
      console.log('Priority:', priority); // Debugging line to check the value
      const badgeVariant = chooseBadgePriorityColor(priority as "High" | "Medium" | "Low" | "None") ;
      return (
        <div className="capitalize">
          <Badge variant={badgeVariant as "destructive" || "secondary" || "outline" ||"default"}>{row.getValue("priority")}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("type")}</div>
    ),
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("assignedTo")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const workItem = {...row.original}
 
      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <EditWorkItemDialog 
                workItem={workItem as WorkItem} 
                trigger={
                  <DropdownMenuLabel>
                    Edit
                  </DropdownMenuLabel>
                }
              />
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit work item</DialogTitle>
              <DialogDescription>
                Make changes to your work item here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="Title" className="text-right">
                  Title
                </Label>
                <Input id="Title" defaultValue={workItem.title} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="Description" className="text-right">
                  Description
                </Label>
                <Input id="Description" defaultValue={workItem.description} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
              {/* Add button functionality later */}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
    },
  },
]

interface WorkItemTableProps {
  projectId: string;
  children?: React.ReactNode;
}

export default function WorkItemTable({ projectId, children }: WorkItemTableProps) {
  const { setTheme } = useTheme();
  const [tasks, setTasks] = useState<WorkItem[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const workItemService = new WorkItemService();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await workItemService.getWorkItems("0e63a6cf-01ec-4354-98ff-f8a680f71838"); // Replace with the actual project ID
        console.log(data)
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const table = useReactTable({
    data: tasks,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter tasks by title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        
        <ThemeModeToggle />

        <CreateWorkitemDialog 
          projectId="0e63a6cf-01ec-4354-98ff-f8a680f71838" 
          trigger={
            <Button variant="outline" className="ml-4">
              Add Task
            </Button>
          } 
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

