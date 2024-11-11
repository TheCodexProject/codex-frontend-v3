import {Organization} from "@/services/models/Organization";
import {Resource} from "@/services/models/Resource";
import {UpdateResourceRequest} from "@/services/request/resource/UpdateResourceRequest";
import {CreateResourceRequest} from "@/services/request/resource/CreateResourceRequest";
import {UpdateOrganizationRequest} from "@/services/request/organization/UpdateOrganizationRequest";
import {CreateOrganizationRequest} from "@/services/request/organization/CreateOrganizationRequest";

/**
 * A service for managing organizations using the API
 */
export default class OrganizationService
{
    // # ------------ #
    // # Organization #
    // # ------------ #

    /**
     * Create a new organization
     * @param name The name of the organization
     * @param ownerId The ID of the owner of the organization
     * @returns The newly created organization
     */
    public static async createOrganization(name: string, ownerId: string) : Promise<Organization> {
        // * Create a new organization
        const organization = new CreateOrganizationRequest(name, ownerId);

        // # Send the request to the API
        const response = await fetch('https://localhost:7006/api/organizations', {
            method: 'POST',
            body: JSON.stringify(organization),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // ? Check if the request was successful
        if (response.ok) {
            // * Parse the response
            const data = await response.json();

            // * Convert the response to an organization object
            return new Organization(data.id, data.name, data.owner, data.members);
        } else {
            // ! Throw an error
            throw new Error('Failed to create organization');
        }
    }

    /**
     * Get all organizations
     * @returns All organizations
     */
    public static async getOrganizations() : Promise<Organization[]> {
        // # Send the request to the API
        const response = await fetch('https://localhost:7006/api/organizations', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // ? Check if the request was successful
        if (response.ok) {
            // * Parse the response
            const data = await response.json();

            // * Convert the response to an array of organization objects
            return data.map((organization: Organization) => new Organization(organization.id, organization.name, organization.owner, organization.members));
        } else {
            // ! Throw an error
            throw new Error('Failed to get organizations');
        }
    }

    /**
     * Get an organization by ID
     * @param id The ID of the organization
     * @returns The organization
     */
    public static async getOrganization(id: string) : Promise<Organization> {
        // # Send the request to the API
        const response = await fetch(`https://localhost:7006/api/organizations/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // ? Check if the request was successful
        if (response.ok) {
            // * Parse the response
            const data = await response.json();

            // * Convert the response to an organization object
            return new Organization(data.id, data.name, data.owner, data.members);
        } else {
            // ! Throw an error
            throw new Error('Failed to get organization');
        }
    }

    /**
     * Update an organization
     * @param id The ID of the organization
     * @param name The name of the organization
     * @param membersToAdd The IDs of the members to add to the organization
     * @param membersToRemove The IDs of the members to remove from the organization
     * @returns The updated organization
     */
    public static async updateOrganization(id: string, name: string | null, membersToAdd: string[] | null, membersToRemove: string[] | null) : Promise<Organization> {
        // * Create a new organization
        const organization = new UpdateOrganizationRequest(name, membersToAdd, membersToRemove);

        // # Send the request to the API
        const response = await fetch(`https://localhost:7006/api/organizations/${id}`, {
            method: 'PUT',
            body: JSON.stringify(organization),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // ? Check if the request was successful
        if (response.ok) {
            // * Parse the response
            const data = await response.json();

            // * Convert the response to an organization object
            return new Organization(data.id, data.name, data.owner, data.members);
        } else {
            // ! Throw an error
            throw new Error('Failed to update organization');
        }
    }

    /**
     * Delete an organization
     * @param id The ID of the organization
     */
    public static async deleteOrganization(id: string) : Promise<void> {
        // # Send the request to the API
        const response = await fetch(`https://localhost:7006/api/organizations/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // ? Check if the request was successful
        if (!response.ok) {
            // ! Throw an error
            throw new Error('Failed to delete organization');
        }
    }

    // # ---------------------- #
    // # Organization Resources #
    // # ---------------------- #

    /**
     * Create a new organization resource
     * @param organizationId The ID of the organization
     * @param title The title of the resource
     * @param url The URL of the resource
     * @returns The newly created organization resource
     */
    public static async createOrganizationResource(organizationId: string, title: string, url: string) : Promise<Resource> {
        // * Create a new organization resource
        const resource = new CreateResourceRequest(title, url);

        // # Send the request to the API
        const response = await fetch(`https://localhost:7006/api/organizations/${organizationId}/resources`, {
            method: 'POST',
            body: JSON.stringify(resource),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // ? Check if the request was successful
        if (response.ok) {
            // * Parse the response
            const data = await response.json();

            // * Convert the response to an organization resource object
            return new Resource(data.id, data.title, data.url, data.description, data.type);
        } else {
            // ! Throw an error
            throw new Error('Failed to create organization resource');
        }
    }

    /**
     * Get all organization resources
     * @param organizationId The ID of the organization
     * @returns All organization resources
     */
    public static async getOrganizationResources(organizationId: string) : Promise<Resource[]> {
        // # Send the request to the API
        const response = await fetch(`https://localhost:7006/api/organizations/${organizationId}/resources`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // ? Check if the request was successful
        if (response.ok) {
            // * Parse the response
            const data = await response.json();

            // * Convert the response to an array of organization resource objects
            return data.map((resource: Resource) => new Resource(resource.id, resource.title, resource.url, resource.description, resource.type));
        } else {
            // ! Throw an error
            throw new Error('Failed to get organization resources');
        }
    }

    /**
     * Get an organization resource by ID
     * @param organizationId The ID of the organization
     * @param resourceId The ID of the resource
     * @returns The organization resource
     */
    public static async getOrganizationResource(organizationId: string, resourceId: string) : Promise<Resource> {
        // # Send the request to the API
        const response = await fetch(`https://localhost:7006/api/organizations/${organizationId}/resources/${resourceId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // ? Check if the request was successful
        if (response.ok) {
            // * Parse the response
            const data = await response.json();

            // * Convert the response to an organization resource object
            return new Resource(data.id, data.title, data.url, data.description, data.type);
        } else {
            // ! Throw an error
            throw new Error('Failed to get organization resource');
        }
    }

    /**
     * Update an organization resource
     * @param organizationId The ID of the organization
     * @param resourceId The ID of the resource
     * @param title The title of the resource
     * @param url The URL of the resource
     * @param description The description of the resource
     * @param type The type of the resource
     * @returns The updated organization resource
     */
    public static async updateOrganizationResource(organizationId: string, resourceId: string, title: string | null, url: string | null, description: string | null, type: string | null) : Promise<Resource> {
        // * Create a new organization resource
        const resource = new UpdateResourceRequest(title, url, description, type);

        // # Send the request to the API
        const response = await fetch(`https://localhost:7006/api/organizations/${organizationId}/resources/${resourceId}`, {
            method: 'PUT',
            body: JSON.stringify(resource),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // ? Check if the request was successful
        if (response.ok) {
            // * Parse the response
            const data = await response.json();

            // * Convert the response to an organization resource object
            return new Resource(data.id, data.title, data.url, data.description, data.type);
        } else {
            // ! Throw an error
            throw new Error('Failed to update organization resource');
        }
    }

    /**
     * Delete an organization resource
     * @param organizationId The ID of the organization
     * @param resourceId The ID of the resource
     */
    public static async deleteOrganizationResource(organizationId: string, resourceId: string) : Promise<void> {
        // # Send the request to the API
        const response = await fetch(`https://localhost:7006/api/organizations/${organizationId}/resources/${resourceId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // ? Check if the request was successful
        if (!response.ok) {
            // ! Throw an error
            throw new Error('Failed to delete organization resource');
        }
    }
}







