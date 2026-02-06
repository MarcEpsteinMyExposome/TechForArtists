import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

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
    <html lang="en" className={dmSans.variable}>
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased flex flex-col">
        <header className="bg-white shadow-sm">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/" className="group flex items-center gap-2">
              <span className="text-xl font-bold tracking-wide text-gray-900 uppercase" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.08em' }}>
                Technology
              </span>
              <span className="text-xs font-medium text-accent-500 uppercase tracking-widest mt-0.5">
                for Artists
              </span>
            </Link>
            <div className="flex gap-6">
              <Link href="/" className="nav-link text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Home</Link>
              <Link href="/editor" className="nav-link text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Editor</Link>
              <Link href="/templates" className="nav-link text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Templates</Link>
              <Link href="/settings" className="nav-link text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Settings</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-gray-200 bg-white mt-auto">
          <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div>
                <span className="text-sm font-semibold tracking-wide text-gray-900 uppercase" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.06em' }}>
                  Technology <span className="text-accent-500">for Artists</span>
                </span>
                <p className="mt-1 text-xs text-gray-400">
                  Professional email signatures, made simple.
                </p>
              </div>
              <div className="flex gap-6">
                <Link href="/editor" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Editor</Link>
                <Link href="/templates" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Templates</Link>
                <Link href="/settings" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Settings</Link>
              </div>
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
