"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";

const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setStatus("idle");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email && password) {
      setStatus("success");
    } else {
      setStatus("error");
    }

    setIsLoading(false);
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
            <AlertDescription>Successfully logged in.</AlertDescription>
          </Alert>
        )}
        {status === "error" && (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Invalid credentials.</AlertDescription>
          </Alert>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
