import {User} from "@/services/models/User";
import {UpdateUserRequest} from "@/services/request/user/UpdateUserRequest";
import {CreateUserRequest} from "@/services/request/user/CreateUserRequest";

/**
 * A service for managing users using the API
 */
export default class UserService
{
     /**
     * Create a new user
     * @param firstname The first name of the user
     * @param lastname The last name of the user
     * @param email The email address of the user
     * @returns The newly created user
     */
    public static async createUser(firstname: string, lastname: string, email: string) : Promise<User>
    {
        // * Create a new user
        const user = new CreateUserRequest(firstname, lastname, email);

        // # Send the request to the API
        const response = await fetch('https://localhost:7006/api/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // ? Check if the request was successful
        if (response.ok)
        {
            // * Parse the response
            const data = await response.json();

            // * Convert the response to a user object
            return new User(data.id, data.firstname, data.lastname, data.email, data.OwnedOrganizations, data.MemberOfOrganizations);
        }
        else
        {
            // ! Throw an error
            // TODO: Change this to a little alert in the corner of the screen or something..
            throw new Error('Failed to create user');
        }
    }

    /**
     * Get all users
     * @returns All users
     */
    public static async getUsers() : Promise<User[]>
    {
        // # Send the request to the API
        const response = await fetch('https://localhost:7006/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // ? Check if the request was successful
        if (response.ok)
        {
            // * Parse the response
            const data = await response.json();

            // * Convert the response to a user object
            return data.map((user: User) => new User(user.id, user.firstname, user.lastname, user.email, user.OwnedOrganizations, user.MemberOfOrganizations));
        }
        else
        {
            // ! Throw an error
            throw new Error('Failed to get users');
        }
    }

    /**
     * Get a user by their id
     * @param id The id of the user
     * @returns The user
     */
    public static async getUser(id: string) : Promise<User>
    {
        // # Send the request to the API
        const response = await fetch(`https://localhost:7006/api/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // ? Check if the request was successful
        if (response.ok)
        {
            // * Parse the response
            const data = await response.json();

            // * Convert the response to a user object
            return new User(data.id, data.firstName, data.lastName, data.email, data.ownedOrganizations, data.memberOfOrganizations);
        }
        else
        {
            // ! Throw an error
            throw new Error('Failed to get user');
        }
    }

    /**
     * Update a user
     * @param id The id of the user
     * @param firstname The first name of the user
     * @param lastname The last name of the user
     * @param email The email address of the user
     * @returns The updated user
     */
    public static async updateUser(id: string, firstname: string | null, lastname: string | null, email: string | null) : Promise<User>
    {
        // * Create a new user
        const user = new UpdateUserRequest(firstname, lastname, email);

        // # Send the request to the API
        const response = await fetch(`https://localhost:7006/api/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // ? Check if the request was successful
        if (response.ok) {
            // * Parse the response
            const data = await response.json();

            // * Convert the response to a user object
            return new User(data.id, data.firstname, data.lastname, data.email, data.OwnedOrganizations, data.MemberOfOrganizations);
        } else {
            // ! Throw an error
            throw new Error('Failed to update user');
        }
    }

    /**
     * Delete a user
     * @param id The id of the user
     */
    public static async deleteUser(id: string) : Promise<void>
    {
        // # Send the request to the API
        const response = await fetch(`https://localhost:7006/api/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // ? Check if the request was successful
        if (!response.ok)
        {
            // ! Throw an error
            throw new Error('Failed to delete user');
        }
    }
}




