"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import {
  HeroSection,
  SDGSection,
  AboutUsSection,
  Footer,
} from "./landing/components";

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to home page if authenticated
  useEffect(() => {
    if (!loading && user) {
      router.push("/home");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-40 h-40 bg-black rounded-full flex items-center justify-center mb-6">
            <Image
              src="/images/logo-loading.gif"
              alt="Loading..."
              width={96}
              height={96}
              unoptimized
            />
          </div>
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-40 h-40 bg-black rounded-full flex items-center justify-center mb-6">
            <Image
              src="/images/logo-loading.gif"
              alt="Loading..."
              width={96}
              height={96}
              unoptimized
            />
          </div>
          <div className="text-lg text-gray-600">
            Redirecting to dashboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <HeroSection />
      <SDGSection />
      <AboutUsSection />
      <Footer />
    </div>
  );
}
