"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useUsers } from "@/hooks/services/UserService"; // Assuming the hook is in a `hooks` folder
import { useRouter } from "next/navigation"; // Import useRouter for routing

const LoginForm: React.FC = () => {
  const { currentUser, setCurrentUser } = useUser(); // Access context to set the current user
  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = useUsers(); // Fetch all users
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const router = useRouter(); // Initialize the router for navigation

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setStatus("idle");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (users && users.length > 0 && email && password) {
      // Select the first user as the current user (fake authentication)
      setCurrentUser(users[0]);
      setStatus("success");

      // Route to onboard page
      router.push("/dashboard");
    } else {
      setStatus("error");
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (usersError) {
      setStatus("error");
    }
  }, [usersError]);

  if (usersLoading) {
    return <div>Loading users...</div>;
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        <Button disabled={isLoading} className="w-full">
          {isLoading ? "Logging in..." : "Login"}
        </Button>
        {status === "success" && (
          <Alert>
            <CheckCircle2 />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Successfully logged in as {currentUser?.firstname}{" "}
              {currentUser?.lastname}.
            </AlertDescription>
          </Alert>
        )}
        {status === "error" && (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {usersError
                ? "Failed to fetch users."
                : "Invalid credentials or no users available."}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
