"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Code,
  GitBranch,
  LayoutDashboard,
  Moon,
  Sun,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <div className="min-h-screen w-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md"
            : "bg-white dark:bg-gray-900"
        }`}
      >
        <div className="container mx-auto flex h-14 items-center px-4 justify-between">
          <Link className="flex items-center justify-center" href="/">
            <Code className="h-6 w-6 text-gray-800 dark:text-gray-200" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
              Codex
            </span>
          </Link>
          <nav className="flex items-center space-x-4">
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
            <Link href={"/signup?tab=login"}>
              <Button
                variant="outline"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Login
              </Button>
            </Link>
            <Link href={"/signup?tab=signup"}>
              <Button className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200">
                Sign up
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 w-full pt-14">
        <section className="w-full space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container mx-auto flex max-w-[64rem] flex-col items-center gap-4 text-center px-4">
            <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Welcome to{" "}
              <span className="text-gray-800 dark:text-gray-200">Codex</span>
            </h1>
            <p className="max-w-[42rem] leading-normal text-gray-500 sm:text-xl sm:leading-8 dark:text-gray-400">
              The ultimate project management tool for modern teams. Organize,
              collaborate, and deliver with ease.
            </p>
            <div className="space-x-4">
              <Button className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200">
                Get Started
              </Button>
              <Button
                variant="outline"
                className="border-gray-200 text-gray-900 hover:bg-gray-100 dark:border-gray-800 dark:text-gray-50 dark:hover:bg-gray-800"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full bg-gray-100 dark:bg-gray-800 py-8 md:py-12 lg:py-24">
          <div className="container mx-auto space-y-6 px-4">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                Key Features
              </h2>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <Users className="h-5 w-5" />
                    Organizations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Create and manage multiple organizations for different teams
                    or clients.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <LayoutDashboard className="h-5 w-5" />
                    Workspaces
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Organize your projects into dedicated workspaces for better
                    management.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <GitBranch className="h-5 w-5" />
                    Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Plan and execute projects with customizable work items,
                    milestones, and iterations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full bg-gray-900 dark:bg-gray-50 py-8 md:py-12 lg:py-24">
          <div className="container mx-auto space-y-6 px-4">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl text-white dark:text-gray-900">
                Ready to boost your productivity?
              </h2>
              <p className="max-w-[42rem] leading-normal text-gray-400 dark:text-gray-600 sm:text-xl sm:leading-8">
                Join thousands of teams already using Codex to streamline their
                project management.
              </p>
              <Button className="bg-white text-gray-900 hover:bg-gray-200 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0 px-4">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-gray-500 dark:text-gray-400 md:text-left">
              © 2023 Codex. All rights reserved.
            </p>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
      <Button
        className="fixed bottom-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 w-10 h-10 flex items-center justify-center"
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
