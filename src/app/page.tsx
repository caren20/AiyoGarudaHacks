"use client";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return (
      <div className="font-sans flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex items-center gap-4 w-full justify-between">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          {user ? (
            <div className="flex items-center gap-4">
              <div className="text-sm">
                Welcome back, {user.displayName || user.email}!
              </div>
              <Button variant="outline" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button>Sign In</Button>
              </Link>
            </div>
          )}
        </div>

        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to {siteConfig.name}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Your modern web application with Firebase authentication
          </p>
        </div>

        {user ? (
          <div>
            <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
              <li className="mb-2 tracking-[-.01em]">
                You are now logged in with Firebase! Your authentication is
                working.
              </li>
              <li className="tracking-[-.01em]">
                Start building your authenticated app features.
              </li>
            </ol>

            <div className="flex gap-4 items-center flex-col sm:flex-row mt-8">
              <Button>Get Started</Button>
              <Button variant="outline">View Profile</Button>
            </div>
          </div>
        ) : (
          <div>
            <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
              <li className="mb-2 tracking-[-.01em]">
                Sign in with your Google account to get started.
              </li>
              <li className="tracking-[-.01em]">
                Access all the amazing features after authentication.
              </li>
            </ol>

            <div className="flex gap-4 items-center flex-col sm:flex-row mt-8">
              <Link href="/login">
                <Button size="lg">Get Started</Button>
              </Link>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
