"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import {
  Code,
  Moon,
  Sun,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [loginStatus, setLoginStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const searchParams = useSearchParams();
  const defaultTab =
    searchParams.get("tab") === "signup" ? "register" : "login";

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
    document.documentElement.classList.toggle("dark", isDarkMode);

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setLoginStatus("idle");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real application, you would validate credentials against your backend
    if (email && password) {
      setLoginStatus("success");
    } else {
      setLoginStatus("error");
    }

    setIsLoading(false);
  }

  return (
    <div className="min-h-screen w-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md"
            : "bg-white dark:bg-gray-900"
        }`}
      >
        <div className="container mx-auto flex h-14 items-center px-4">
          <Link className="flex items-center justify-center" href="/">
            <Code className="h-6 w-6 text-gray-800 dark:text-gray-200" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
              Codex
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4 ml-auto mr-4">
            <Link
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              href="#"
            >
              Features
            </Link>
            <Link
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              href="#"
            >
              Pricing
            </Link>
            <Link
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              href="#"
            >
              About
            </Link>
            <Link
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              href="#"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white border-gray-300 dark:border-gray-600"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 mt-14">
        <Card className="w-full max-w-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white">
              Welcome to{" "}
              <span className="text-gray-800 dark:text-gray-200">Codex</span>
            </CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-400">
              Enter your details to sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={defaultTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger
                  value="login"
                  className="text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:bg-gray-100 dark:text-gray-400 dark:data-[state=active]:text-white dark:data-[state=active]:bg-gray-700"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:bg-gray-100 dark:text-gray-400 dark:data-[state=active]:text-white dark:data-[state=active]:bg-gray-700"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={onSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-gray-700 dark:text-gray-300"
                      >
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        placeholder="m@example.com"
                        required
                        type="email"
                        className="border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="password"
                        className="text-gray-700 dark:text-gray-300"
                      >
                        Password
                      </Label>
                      <Input
                        id="password"
                        name="password"
                        required
                        type="password"
                        className="border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <Button
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                    {loginStatus === "success" && (
                      <Alert variant="default">
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>
                          You have successfully logged in as admin.
                        </AlertDescription>
                      </Alert>
                    )}
                    {loginStatus === "error" && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                          Invalid credentials. Please try again.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form onSubmit={onSubmit}>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label
                        htmlFor="new-email"
                        className="text-gray-700 dark:text-gray-300"
                      >
                        Email
                      </Label>
                      <Input
                        id="new-email"
                        placeholder="m@example.com"
                        required
                        type="email"
                        className="border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="first-name"
                        className="text-gray-700 dark:text-gray-300"
                      >
                        First Name
                      </Label>
                      <Input
                        id="first-name"
                        placeholder="John"
                        required
                        className="border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="last-name"
                        className="text-gray-700 dark:text-gray-300"
                      >
                        Last Name
                      </Label>
                      <Input
                        id="last-name"
                        placeholder="Doe"
                        required
                        className="border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="new-password"
                        className="text-gray-700 dark:text-gray-300"
                      >
                        Password
                      </Label>
                      <Input
                        id="new-password"
                        required
                        type="password"
                        className="border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="confirm-password"
                        className="text-gray-700 dark:text-gray-300"
                      >
                        Confirm Password
                      </Label>
                      <Input
                        id="confirm-password"
                        required
                        type="password"
                        className="border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <Button
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2023 Codex. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer>
      <Button
        className="fixed bottom-20 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 w-10 h-10 flex items-center justify-center"
        onClick={toggleDarkMode}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? (
          <Sun className="h-5 w-5 text-yellow-500" />
        ) : (
          <Moon className="h-5 w-5 text-gray-700" />
        )}
      </Button>
    </div>
  );
}
