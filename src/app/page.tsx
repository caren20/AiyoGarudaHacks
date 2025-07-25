"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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
      <div className="font-sans flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="font-sans flex items-center justify-center min-h-screen">
        <div>Redirecting to dashboard...</div>
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
