/**
 * A request to create a new organization
 */
export class CreateOrganizationRequest
{
    public name: string;
    public ownerId: string;

    constructor(name: string, ownerId: string)
    {
        this.name = name;
        this.ownerId = ownerId;
    }
}