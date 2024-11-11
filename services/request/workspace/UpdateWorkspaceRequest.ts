export class UpdateWorkspaceRequest
{
    public title: string | null;
    public contactsToAdd: string[] | null;
    public contactsToRemove: string[] | null;
    public projectsToAdd: string[] | null;
    public projectsToRemove: string[] | null;

    constructor(title: string | null, contactsToAdd: string[] | null, contactsToRemove: string[] | null, projectsToAdd: string[] | null, projectsToRemove: string[] | null)
    {
        this.title = title;
        this.contactsToAdd = contactsToAdd;
        this.contactsToRemove = contactsToRemove;
        this.projectsToAdd = projectsToAdd;
        this.projectsToRemove = projectsToRemove;
    }
}