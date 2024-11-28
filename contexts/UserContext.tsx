"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useUsers } from "@/hooks/services/UserService";
import { User } from "@/services/models/User";
import { useRouter } from "next/navigation";

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  isUserLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  // Fetch users using the service hook
  const { data: users = [], isLoading: isUserLoading } = useUsers();

  // Load currentUser from localStorage on initial render
  useEffect(() => {
    const storedUser =
      typeof window !== "undefined"
        ? localStorage.getItem("currentUser")
        : null;

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // Persist currentUser to localStorage whenever it changes
  useEffect(() => {
    if (currentUser && typeof window !== "undefined") {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  // Sync currentUser with the list of users whenever it updates
  useEffect(() => {
    if (users.length > 0 && currentUser) {
      const updatedUser = users.find((user) => user.id === currentUser.id);

      if (updatedUser) {
        // Update currentUser with the latest server state if needed
        setCurrentUser((prev) =>
          prev && prev.id === updatedUser.id
            ? { ...prev, ...updatedUser }
            : prev
        );
      } else {
        // If currentUser is invalid, clear it and redirect
        setCurrentUser(null);
        router.push("/signup");
      }
    } else if (users.length === 0 && currentUser) {
      // If no users exist, clear currentUser and redirect
      setCurrentUser(null);
      router.push("/signup");
    }
  }, [users]);

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, isUserLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
