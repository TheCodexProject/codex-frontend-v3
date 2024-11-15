"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import UserService from "@/services/features/UserService";
import { User } from "@/services/models/User";

interface UserContextType {
  users: User[] | null;
  getUserById: (id: string) => User | undefined;
  createUser: (
    firstname: string,
    lastname: string,
    email: string
  ) => Promise<void>;
  updateUser: (
    id: string,
    firstname?: string,
    lastname?: string,
    email?: string
  ) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  refreshUsers: () => void;
}

// Use React.PropsWithChildren to add the `children` prop
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[] | null>(null);

  const loadUsers = async () => {
    const data = await UserService.getUsers();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers(); // Initial load
  }, []);

  const getUserById = (id: string) => {
    return users?.find((user) => user.id === id);
  };

  const createUser = async (
    firstname: string,
    lastname: string,
    email: string
  ) => {
    await UserService.createUser(firstname, lastname, email);
    await loadUsers(); // Refresh data after creating a user
  };

  const updateUser = async (
    id: string,
    firstname?: string,
    lastname?: string,
    email?: string
  ) => {
    // Convert `undefined` to `null` explicitly
    await UserService.updateUser(
      id,
      firstname ?? null,
      lastname ?? null,
      email ?? null
    );
    await loadUsers(); // Refresh data after updating a user
  };

  const deleteUser = async (id: string) => {
    await UserService.deleteUser(id);
    await loadUsers(); // Refresh data after deleting a user
  };

  return (
    <UserContext.Provider
      value={{
        users,
        getUserById,
        createUser,
        updateUser,
        deleteUser,
        refreshUsers: loadUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserProvider");
  }
  return context;
};
