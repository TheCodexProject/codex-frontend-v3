/**
 * A class representing a user
 */
export class User
{
    public id: string;
    public firstname: string;
    public lastname: string;
    public email: string;

    public OwnedOrganizations: string[];

    public MemberOfOrganizations: string[];

    constructor(id: string, firstname: string, lastname: string, email: string, OwnedOrganizations: string[], MemberOfOrganizations: string[])
    {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.OwnedOrganizations = OwnedOrganizations;
        this.MemberOfOrganizations = MemberOfOrganizations;
    }
}
