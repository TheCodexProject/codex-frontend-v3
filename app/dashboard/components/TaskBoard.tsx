import React, { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { ChevronDown, Filter, SortAsc, MoreHorizontal } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useWorkItems } from "@/hooks/services/WorkItemService"
import { useProject } from "@/contexts/ProjectContext"
import { WorkItem as ImportedWorkItem } from "@/services/models/WorkItem"

enum Status {
  None = 0,
  Open = 1,
  InProgress = 2,
  ReadyForReview = 3,
  Done = 4,
  Closed = 5
}

enum Priority {
  None = 0,
  Low = 1,
  Medium = 2,
  High = 3,
  Critical = 4
}

interface WorkItem {
  id: string
  containedIn: string
  title: string
  description: string
  status: Status
  priority: Priority
  type: string
  assignedTo: string
}

const mapStatus = (status: string): Status => {
  switch (status.toLowerCase()) {
    case 'open': return Status.Open
    case 'inprogress': return Status.InProgress
    case 'readyforreview': return Status.ReadyForReview
    case 'done': return Status.Done
    case 'closed': return Status.Closed
    default: return Status.None
  }
}

const mapPriority = (priority: string): Priority => {
  switch (priority.toLowerCase()) {
    case 'low': return Priority.Low
    case 'medium': return Priority.Medium
    case 'high': return Priority.High
    case 'critical': return Priority.Critical
    default: return Priority.None
  }
}

export default function Component() {
  const { currentProject } = useProject()
  const { data: importedWorkItems = [], isLoading } = useWorkItems(currentProject!.id)

  const [tasks, setTasks] = useState<WorkItem[]>([])
  const [filteredTasks, setFilteredTasks] = useState<WorkItem[]>([])
  const [selectedStatus, setSelectedStatus] = useState<Status | "All">("All")
  const [sortOption, setSortOption] = useState("")

  useEffect(() => {
    if (importedWorkItems.length > 0) {
      const mappedTasks = importedWorkItems.map((item: ImportedWorkItem) => ({
        ...item,
        status: mapStatus(item.status),
        priority: mapPriority(item.priority)
      }))
      setTasks(mappedTasks)
      setFilteredTasks(mappedTasks)
    }
  }, [importedWorkItems])

  const onFilter = (status: Status | "All") => {
    setSelectedStatus(status)
    setFilteredTasks(status === "All" ? tasks : tasks.filter((task) => task.status === status))
  }

  const onSort = (option: string) => {
    setSortOption(option)
    const sortedTasks = [...filteredTasks].sort((a, b) => {
      if (option === "title") return a.title.localeCompare(b.title)
      if (option === "status") return a.status - b.status
      if (option === "priority") return a.priority - b.priority
      return 0
    })
    setFilteredTasks(sortedTasks)
  }

  const getPriorityBadge = (priority: Priority) => {
    const variants = {
      [Priority.Critical]: "destructive",
      [Priority.High]: "destructive",
      [Priority.Medium]: "default",
      [Priority.Low]: "secondary",
      [Priority.None]: "outline",
    } as const

    const icons = {
      [Priority.Critical]: "⚠️",
      [Priority.High]: "🔥",
      [Priority.Medium]: "⚡",
      [Priority.Low]: "🟢",
      [Priority.None]: "⚪",
    }

    return (
      <Badge variant={variants[priority]} className="font-medium">
        {icons[priority]} {Priority[priority]}
      </Badge>
    )
  }

  const getStatusBadge = (status: Status) => {
    const variants = {
      [Status.None]: "outline",
      [Status.Open]: "secondary",
      [Status.InProgress]: "default",
      [Status.ReadyForReview]: "destructive",
      [Status.Done]: "secondary",
      [Status.Closed]: "default",
    } as const

    const icons = {
      [Status.None]: "⚪",
      [Status.Open]: "📋",
      [Status.InProgress]: "🔄",
      [Status.ReadyForReview]: "👀",
      [Status.Done]: "✅",
      [Status.Closed]: "🔒",
    }

    return (
      <Badge variant={variants[status]} className="font-medium">
        {icons[status]} {Status[status]}
      </Badge>
    )
  }

  if (isLoading) {
    return (
      <div className="flex h-[450px] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
          <p className="mt-2 text-sm text-muted-foreground">Loading tasks...</p>
        </div>
      </div>
    )
  }

  const statusColumns = [Status.Open, Status.InProgress, Status.ReadyForReview, Status.Done, Status.Closed]

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Task Board</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="list" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="board">Board View</TabsTrigger>
            </TabsList>
            <div className="flex space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => onFilter("All")}>All</DropdownMenuItem>
                  {statusColumns.map((status) => (
                    <DropdownMenuItem key={status} onSelect={() => onFilter(status)}>
                      {Status[status]}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <SortAsc className="mr-2 h-4 w-4" />
                    Sort
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => onSort("title")}>Title</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => onSort("status")}>Status</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => onSort("priority")}>Priority</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <TabsContent value="list">
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <Card key={task.id} className="hover:bg-muted/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarImage src={`/avatars/${task.assignedTo}.png`} alt={task.assignedTo} />
                          <AvatarFallback>{task.assignedTo.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h3 className="font-semibold leading-none">{task.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 min-w-[100px]">
                        {getPriorityBadge(task.priority)}
                        {getStatusBadge(task.status)}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                            <DropdownMenuItem>Change Status</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="board">
            <DragDropContext onDragEnd={(result) => {
              if (!result.destination) return
              const updatedTasks = Array.from(tasks)
              const [movedTask] = updatedTasks.splice(result.source.index, 1)
              movedTask.status = parseInt(result.destination.droppableId) as Status
              updatedTasks.splice(result.destination.index, 0, movedTask)
              setTasks(updatedTasks)
              setFilteredTasks(updatedTasks)
            }}>
              <div className="grid gap-6 md:grid-cols-5">
                {statusColumns.map((status) => (
                  <Droppable key={status} droppableId={status.toString()}>
                    {(provided) => (
                      <Card className="bg-muted/50">
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm font-medium">{Status[status]}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3 min-h-[200px]">
                            {tasks
                              .filter((task) => task.status === status)
                              .map((task, index) => (
                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                  {(provided) => (
                                    <Card
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="bg-background hover:bg-muted/50 transition-colors"
                                    >
                                      <CardContent className="p-3">
                                        <div className="space-y-2">
                                          <div className="flex items-start justify-between">
                                            <div className="flex items-center space-x-2">
                                              <Avatar className="h-6 w-6">
                                                <AvatarImage
                                                  src={`/avatars/${task.assignedTo}.png`}
                                                  alt={task.assignedTo}
                                                />
                                                <AvatarFallback>{task.assignedTo.charAt(0)}</AvatarFallback>
                                              </Avatar>
                                              <span className="font-medium">{task.title}</span>
                                            </div>
                                            {getPriorityBadge(task.priority)}
                                          </div>
                                          <p className="text-sm text-muted-foreground line-clamp-2">
                                            {task.description}
                                          </p>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  )}
                                </Draggable>
                              ))}
                            {provided.placeholder}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </Droppable>
                ))}
              </div>
            </DragDropContext>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}