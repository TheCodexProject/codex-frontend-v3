"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code, ArrowLeft } from "lucide-react";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
        <Button
          variant="outline"
          className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white border-gray-300 dark:border-gray-600"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </div>
    </header>
  );
};

export default Header;
