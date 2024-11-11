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
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
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

const data: Task[] = [
  {
    title: "Task #2",
    description: "Something very very important to do on this Task specifically...",
    status: "Open",
    priority: "High",
    type: "Task",
    assignedTo: "admin@bobsen.dk",
  },
  {
    title: "Task #4",
    description: "",
    status: "None",
    priority: "Low",
    type: "None",
    assignedTo: "Unassigned",
  },
  {
    title: "Task #3",
    description: "",
    status: "In Progress",
    priority: "Medium",
    type: "None",
    assignedTo: "Unassigned",
  },
]

export type Task = {
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Completed" | "None";
  priority: "High" | "Medium" | "Low" | "None";
  type: "Task" | "Bug" | "Feature" | "None";
  assignedTo: string;
}
 
export const columns: ColumnDef<Task>[] = [
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
      const badgeVariant = chooseBadgeStatusColor(status as Task["status"]) ;
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
      const badgeVariant = chooseBadgePriorityColor(priority as Task["priority"]) ;
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
      const workItem = {id: "123", containedIn: "123", ...row.original}
 
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

export default function DataTableDemo({ children }: any) {
  const { setTheme } = useTheme()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
 
  const table = useReactTable({
    data,
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
  })
 
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
          projectId="222" 
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
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
