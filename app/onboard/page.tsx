"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation"; // For routing
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCreateOrganization } from "@/hooks/services/OrganizationService";
import { useOrganization } from "@/contexts/OrganizationContext";
import { useUser } from "@/contexts/UserContext";

const CreateOrganization: React.FC = () => {
  const [orgName, setOrgName] = useState("");
  const [orgDescription, setOrgDescription] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useUser();
  const { setCurrentOrganization } = useOrganization();
  const createOrganization = useCreateOrganization();
  const router = useRouter();

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value } = e.target;
      if (id === "orgName") {
        setOrgName(value);
      } else if (id === "orgDescription") {
        setOrgDescription(value);
      }
      clearErrors();
    },
    [clearErrors]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    clearErrors();

    if (!currentUser) {
      console.warn("No current user. Redirecting to signup.");
      router.push("/signup"); // Redirect to signup page
      return;
    }

    createOrganization.mutate(
      { name: orgName, ownerId: currentUser.id }, // Use current user's ID
      {
        onSuccess: (data) => {
          console.log("Organization created successfully:", data);
          setCurrentOrganization(data); // Set the current organization in context
          router.push("/dashboard"); // Navigate to dashboard
        },
        onError: (error: any) => {
          console.error("Error creating organization:", error);
          setErrors(["An unexpected error occurred."]);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      }
    );
  };

  useEffect(() => {
    if (!currentUser) {
      console.warn("No current user. Redirecting to signup.");
      router.push("/signup"); // Redirect to signup if no current user
    }
  }, [currentUser, router]);

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      <Header />
      <main className="flex-grow pt-14">
        <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-8rem)]">
          <Card className="w-full max-w-md bg-card text-card-foreground">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Welcome to <span className="text-primary">Codex</span>
              </CardTitle>
              <CardDescription className="text-center">
                Before we can start dividing tasks, we need to set up your
                personal organization.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="orgName">
                    Organization Name
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="orgName"
                    placeholder="Enter your organization name"
                    value={orgName}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orgDescription">
                    Organization Description
                  </Label>
                  <Textarea
                    id="orgDescription"
                    placeholder="Briefly describe your organization"
                    value={orgDescription}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create Organization"}
                </Button>
                {errors.length > 0 && (
                  <Alert variant="destructive" className="w-full">
                    <AlertDescription>
                      <ul className="list-disc pl-4">
                        {errors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateOrganization;
