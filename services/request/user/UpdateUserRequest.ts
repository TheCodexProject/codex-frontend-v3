/**
 * A user update request
 */
export class UpdateUserRequest
{
    public firstname: string | null;
    public lastname: string | null;
    public email: string | null;

    constructor(firstname: string | null, lastname: string | null, email: string | null)
    {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }
}