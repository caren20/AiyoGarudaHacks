import { Icons } from "@/components/icons";

export function AboutUsSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 relative overflow-hidden">
      {/* Decorative Stars */}
      <div className="absolute top-10 left-10 text-yellow-400 opacity-60">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
      <div className="absolute top-32 right-20 text-yellow-400 opacity-60">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
      <div className="absolute bottom-20 left-32 text-yellow-400 opacity-60">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
      <div className="absolute bottom-10 right-40 text-yellow-400 opacity-60">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">About Us</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Image and Laptop */}
          <div className="relative">
            <div className="relative">
              {/* Circular background with silhouette */}
              <div className="w-80 h-80 mx-auto rounded-full bg-gradient-to-br from-pink-300 via-orange-300 to-yellow-300 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-orange-400 to-yellow-200"></div>
                <div className="relative z-10">
                  <svg
                    className="w-32 h-32 text-black opacity-80"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM8.5 7H15.5C16.3 7 17 7.7 17 8.5V10.5C17 11.3 16.3 12 15.5 12H14V22H10V12H8.5C7.7 12 7 11.3 7 10.5V8.5C7 7.7 7.7 7 8.5 7Z" />
                  </svg>
                </div>
              </div>

              {/* Laptop Mockup */}
              <div className="absolute -bottom-8 -right-8 transform rotate-12">
                <div className="bg-gray-300 rounded-lg p-2 shadow-xl w-64">
                  <div className="bg-black rounded-lg p-1">
                    <div className="bg-white rounded-lg overflow-hidden aspect-video">
                      <div className="bg-gray-100 px-2 py-1 flex items-center space-x-1 border-b">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 h-full">
                        <div className="grid grid-cols-2 gap-1 mb-2">
                          <div className="bg-blue-200 rounded h-8"></div>
                          <div className="bg-green-200 rounded h-8"></div>
                          <div className="bg-orange-200 rounded h-8"></div>
                          <div className="bg-red-200 rounded h-8"></div>
                        </div>
                        <div className="space-y-1">
                          <div className="bg-purple-200 rounded h-4"></div>
                          <div className="bg-pink-200 rounded h-4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-400 rounded-b-lg h-2"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Text and Logo */}
          <div className="space-y-8">
            {/* Stemify Logo */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center relative">
                  <div className="text-white text-xl">
                    <Icons.logo />
                  </div>
                  <div className="absolute -top-1 -right-1 text-yellow-400">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-4xl font-bold">
                  <span className="text-blue-600">Stem</span>
                  <span className="text-pink-500">ify</span>
                </h3>
              </div>
            </div>

            {/* Description Text */}
            <div className="space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                Stemify is an inclusive learning platform designed to{" "}
                <span className="font-bold text-gray-900">
                  empower women in STEM
                </span>{" "}
                through accessible courses, inspiring stories, and interactive
                tools. Built with features that support diverse needs, including{" "}
                <span className="font-bold text-gray-900">
                  disability-friendly design
                </span>{" "}
                and color-blind-safe themes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
