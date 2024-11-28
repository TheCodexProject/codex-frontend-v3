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
  const [isUserLoading, setIsUserLoading] = useState(true); // Represents the localStorage loading state
  const [isUsersLoaded, setIsUsersLoaded] = useState(false); // Tracks whether users list is fully loaded
  const router = useRouter();

  // Fetch users using the service hook
  const { data: users = [], isLoading: isUsersLoading } = useUsers();

  // Load currentUser from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
        console.log("User from local storage:", storedUser);
      }
      setIsUserLoading(false); // Local storage loading is done
    }
  }, []);

  // Track when users list is fully loaded
  useEffect(() => {
    if (!isUsersLoading) {
      setIsUsersLoaded(true);
    }
  }, [isUsersLoading]);

  // Persist currentUser to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (currentUser) {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      } else {
        localStorage.removeItem("currentUser");
      }
    }
  }, [currentUser]);

  // Sync currentUser with the list of users whenever it updates
  useEffect(() => {
    if (!isUserLoading && isUsersLoaded) {
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
    }
  }, [users, isUserLoading, isUsersLoaded]);

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
