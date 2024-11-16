"use client";

import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Signup() {
  return (
    <div className="min-h-screen w-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden">
      <Header />
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
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="register">
                <SignUpForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
