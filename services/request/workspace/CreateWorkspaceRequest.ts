export class CreateWorkspaceRequest
{
    public title: string;
    public organizationId: string;

    constructor(title: string, organizationId: string)
    {
        this.title = title;
        this.organizationId = organizationId;
    }
}