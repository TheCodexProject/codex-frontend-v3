"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";

const SignUpForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setStatus("idle");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (
      email &&
      firstName &&
      lastName &&
      password &&
      password === confirmPassword
    ) {
      setStatus("success");
    } else {
      setStatus("error");
    }

    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSignUp}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" name="firstName" type="text" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" name="lastName" type="text" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
          />
        </div>
        <Button disabled={isLoading} className="w-full">
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
        {status === "success" && (
          <Alert>
            <CheckCircle2 />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Successfully created an account.
            </AlertDescription>
          </Alert>
        )}
        {status === "error" && (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Please ensure all fields are filled and passwords match.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </form>
  );
};

export default SignUpForm;
