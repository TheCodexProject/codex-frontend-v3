import "@/app/globals.css";
import { Inter } from "next/font/google";
import ContextProviders from "@/components/ContextProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Codex - Project Management Tool",
  description: "The ultimate project management tool for modern teams.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen`}>
        <ContextProviders>{children}</ContextProviders>
      </body>
    </html>
  );
}
