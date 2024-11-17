"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/services/models/User";

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Retrieve the user from localStorage if available
    const storedUser =
      typeof window !== "undefined"
        ? localStorage.getItem("currentUser")
        : null;
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // Persist the current user in localStorage whenever it changes
    if (currentUser && typeof window !== "undefined") {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser");
    }

    console.log("Current user updated:", currentUser);
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
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
