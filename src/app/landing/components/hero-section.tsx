import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Decorative Stars */}
      <div className="absolute top-20 left-20 text-pink-400 opacity-60">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
      <div className="absolute top-40 right-32 text-purple-400 opacity-60">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
      <div className="absolute bottom-32 left-16 text-pink-400 opacity-60">
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
      <div className="absolute top-60 right-20 text-purple-400 opacity-60">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>

      {/* Navigation */}
      <nav className="flex justify-center pt-8 pb-4">
        <div className="flex space-x-8">
          <Link
            href="#"
            className="text-blue-600 font-medium hover:text-blue-700"
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-gray-600 font-medium hover:text-gray-700"
          >
            About Us
          </Link>
          <Link
            href="#"
            className="text-gray-600 font-medium hover:text-gray-700"
          >
            SDG
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                {/* Chat bubble character */}
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center relative">
                  <div className="text-white text-2xl">
                    <Icons.logo />
                  </div>
                  {/* Crown/star decoration */}
                  <div className="absolute -top-2 -right-2 text-yellow-400">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-6xl font-bold">
                  <span className="text-blue-600">Stem</span>
                  <span className="text-pink-500">ify</span>
                </h1>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-2xl text-blue-600 font-medium italic">
              Unlock Potential, Spark innovation
            </p>

            {/* Buttons */}
            <div className="flex space-x-4">
              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent rounded-full"
                >
                  Sign Up
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Laptop Mockup */}
          <div className="relative">
            <div className="relative transform rotate-12 hover:rotate-6 transition-transform duration-500">
              {/* Laptop Base */}
              <div className="bg-gray-300 rounded-lg p-2 shadow-2xl">
                {/* Screen */}
                <div className="bg-black rounded-lg p-1">
                  <div className="bg-white rounded-lg overflow-hidden aspect-video">
                    {/* Browser Chrome */}
                    <div className="bg-gray-100 px-4 py-2 flex items-center space-x-2 border-b">
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="flex-1 bg-white rounded px-2 py-1 text-xs text-gray-500">
                        stemify.com
                      </div>
                    </div>

                    {/* Dashboard Content */}
                    <div className="p-4 bg-gray-50 h-full">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-blue-500 rounded"></div>
                          <span className="text-sm font-bold">Stemify</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                        </div>
                      </div>

                      {/* Welcome Section */}
                      <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg p-4 mb-4 text-white">
                        <h2 className="text-lg font-bold mb-2">
                          Welcome Back,
                        </h2>
                        <p className="text-sm mb-2">Amanda</p>
                        <button className="bg-white text-purple-600 px-3 py-1 rounded text-xs font-medium">
                          CONTINUE TO COURSE
                        </button>
                      </div>

                      {/* Course Grid */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-white rounded p-2">
                          <div className="w-full h-8 bg-blue-200 rounded mb-1"></div>
                          <div className="text-xs font-medium">
                            Computer Science
                          </div>
                          <div className="text-xs text-gray-500">
                            Learn programming
                          </div>
                        </div>
                        <div className="bg-white rounded p-2">
                          <div className="w-full h-8 bg-green-200 rounded mb-1"></div>
                          <div className="text-xs font-medium">Electronics</div>
                          <div className="text-xs text-gray-500">
                            Master robotics
                          </div>
                        </div>
                        <div className="bg-white rounded p-2">
                          <div className="w-full h-8 bg-orange-200 rounded mb-1"></div>
                          <div className="text-xs font-medium">Mechanical</div>
                          <div className="text-xs text-gray-500">
                            Design engineering
                          </div>
                        </div>
                        <div className="bg-white rounded p-2">
                          <div className="w-full h-8 bg-red-200 rounded mb-1"></div>
                          <div className="text-xs font-medium">
                            Cybersecurity
                          </div>
                          <div className="text-xs text-gray-500">
                            Protect data
                          </div>
                        </div>
                      </div>

                      {/* News Section */}
                      <div className="bg-white rounded p-2">
                        <div className="text-xs font-bold mb-2">
                          Recent News
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-purple-200 rounded"></div>
                            <div className="text-xs text-gray-600">
                              Breaking stereotypes...
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-pink-200 rounded"></div>
                            <div className="text-xs text-gray-600">
                              Engineering purpose...
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Laptop Keyboard */}
              <div className="bg-gray-400 rounded-b-lg h-4 shadow-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
