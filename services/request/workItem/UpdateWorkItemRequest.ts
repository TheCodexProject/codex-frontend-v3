/**
 * A request to update a work item
 */
export class UpdateWorkItemRequest
{
    public title: string | null;
    public description: string | null;
    public status: string | null;
    public priority: string | null;
    public assignee: string | null;
    public subItemsToAdd: string[] | null;
    public subItemsToRemove: string[] | null;

    constructor(title: string | null, description: string | null, status: string | null, priority: string | null, assignee: string | null, subItemsToAdd: string[] | null, subItemsToRemove: string[] | null)
    {
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.assignee = assignee;
        this.subItemsToAdd = subItemsToAdd;
        this.subItemsToRemove = subItemsToRemove;
    }
}