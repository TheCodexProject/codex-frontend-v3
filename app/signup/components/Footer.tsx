"use client";

import Link from "next/link";

const Footer: React.FC = () => {
  return (
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
  );
};

export default Footer;
