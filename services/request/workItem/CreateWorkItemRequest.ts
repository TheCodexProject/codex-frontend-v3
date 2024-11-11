/**
 * A request to create a new work item in a project
 */
export class CreateWorkItemRequest
{
    public title: string;
    public projectId: string;

    constructor(title: string, projectId: string)
    {
        this.title = title;
        this.projectId = projectId;
    }
}