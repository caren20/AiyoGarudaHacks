"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Mascot Image */}
        <div className="relative mb-8">
          {/* Mascot container */}
          <div className="relative flex justify-center">
            <div className="w-48 h-48 flex items-center justify-center">
              <Image
                src="/images/logo-sad.png"
                alt="Sad mascot"
                width={192}
                height={192}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Puddle effect */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4">
            <div className="w-32 h-6 bg-blue-200 opacity-30 rounded-full blur-sm"></div>
            <div className="w-16 h-3 bg-blue-200 opacity-20 rounded-full blur-sm ml-8 -mt-2"></div>
          </div>
        </div>{" "}
        {/* Error Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-6xl font-bold text-gray-600 mb-2">
              Error <span className="text-gray-800">404</span>
            </h1>
            <p className="text-gray-600 text-lg mb-4">
              Sorry, the page you were looking for doesn&apos;t exist.
            </p>
            <div className="text-gray-500 text-sm">
              Try going to{" "}
              <Link
                href="/"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Stemify.com
              </Link>
              , or follow us on{" "}
              <span className="text-purple-600 font-medium">Twitter</span> or{" "}
              <span className="text-purple-600 font-medium">Facebook</span>.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              asChild
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3"
            >
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-3"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
