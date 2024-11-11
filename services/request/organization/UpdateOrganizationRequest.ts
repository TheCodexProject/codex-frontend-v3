/**
 * A request to update an organization
 */
export class UpdateOrganizationRequest
{
    public name: string | null;
    public membersToAdd: string[] | null;
    public membersToRemove: string[] | null;

    constructor(name: string | null, membersToAdd: string[] | null, membersToRemove: string[] | null)
    {
        this.name = name;
        this.membersToAdd = membersToAdd;
        this.membersToRemove = membersToRemove;
    }
}