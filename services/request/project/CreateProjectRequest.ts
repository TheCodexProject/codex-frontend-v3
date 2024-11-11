/**
 * A request to create a new project
 */
export class CreateProjectRequest
{
    public title: string;
    public workspaceId: string;

    constructor(title: string, workspaceId: string)
    {
        this.title = title;
        this.workspaceId = workspaceId;
    }
}