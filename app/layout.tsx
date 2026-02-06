import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tech For Artists - Email Signature Builder",
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
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <a href="/" className="text-xl font-bold text-indigo-600">
              Tech For Artists
            </a>
            <div className="flex gap-4">
              <a href="/" className="text-sm text-gray-600 hover:text-indigo-600">Home</a>
              <a href="/editor" className="text-sm text-gray-600 hover:text-indigo-600">Editor</a>
              <a href="/templates" className="text-sm text-gray-600 hover:text-indigo-600">Templates</a>
              <a href="/settings" className="text-sm text-gray-600 hover:text-indigo-600">Settings</a>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
