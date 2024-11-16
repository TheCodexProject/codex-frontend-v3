import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UserService from "@/services/features/UserService";
import { User } from "@/services/models/User";

// Fetch all users
export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => UserService.getUsers(),
  });
};

// Fetch a single user by ID
export const useUser = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => UserService.getUser(id),
  });
};

// Create a new user
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      firstname,
      lastname,
      email,
    }: {
      firstname: string;
      lastname: string;
      email: string;
    }) => UserService.createUser(firstname, lastname, email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// Update a user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: {
        firstname?: string | null;
        lastname?: string | null;
        email?: string | null;
      };
    }) =>
      UserService.updateUser(
        id,
        updates.firstname ?? null,
        updates.lastname ?? null,
        updates.email ?? null
      ),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// Delete a user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => UserService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
