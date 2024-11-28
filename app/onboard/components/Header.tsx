"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Code } from "lucide-react";

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
          ? "bg-background/70 backdrop-blur-md shadow-md"
          : "bg-background"
      }`}
    >
      <div className="container mx-auto flex h-14 items-center px-4 justify-between">
        <Link className="flex items-center justify-center" href="/">
          <Code className="h-6 w-6 text-primary" aria-hidden="true" />
          <span className="ml-2 text-xl font-bold text-foreground">Codex</span>
        </Link>
        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <Link
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
                href="#"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
                href="#"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
                href="#"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
                href="#"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
