import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Technology For Artists - Email Signature Builder",
  description: "Create professional email signatures for Gmail and other email apps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <header className="border-b border-gray-200 bg-white">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Technology For Artists
            </Link>
            <div className="flex gap-4">
              <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/editor" className="text-sm text-gray-600 hover:text-gray-900">Editor</Link>
              <Link href="/templates" className="text-sm text-gray-600 hover:text-gray-900">Templates</Link>
              <Link href="/settings" className="text-sm text-gray-600 hover:text-gray-900">Settings</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
