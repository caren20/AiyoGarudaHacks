"use client";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  // Get user's initials for avatar fallback
  const getUserInitials = () => {
    if (user?.displayName) {
      const names = user.displayName.split(" ");
      return names.length > 1
        ? `${names[0][0]}${names[1][0]}`.toUpperCase()
        : names[0][0].toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  // Extract first and last name from displayName
  const getFirstName = () => {
    if (user?.displayName) {
      return user.displayName.split(" ")[0];
    }
    return "";
  };

  const getLastName = () => {
    if (user?.displayName) {
      const names = user.displayName.split(" ");
      return names.length > 1 ? names.slice(1).join(" ") : "";
    }
    return "";
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading user information...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-blue-200 relative overflow-hidden">
      {/* Decorative Wave Background */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-300 to-purple-200 opacity-60">
        <svg
          className="absolute bottom-0 w-full h-32"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path
            d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z"
            className="text-purple-300 opacity-50"
          />
        </svg>
      </div>

      {/* Profile Photo */}
      <div className="mb-8 relative z-10">
        <div className="w-32 h-32 mx-auto mb-4">
          <Avatar className="w-full h-full">
            <AvatarImage
              src={user.photoURL || undefined}
              alt={user.displayName || "User"}
            />
            <AvatarFallback className="text-2xl">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="grid grid-cols-1 max-w-4xl mx-auto relative z-10">
        {/* Personal Information Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            Personal Information
          </h2>

          <div className="space-y-6">
            {/* First Name */}
            <div className="flex items-center space-x-4">
              <label className="text-gray-600 font-medium w-24 flex-shrink-0">
                First Name
              </label>
              <div className="flex-1">
                <Input
                  value={getFirstName()}
                  readOnly
                  className="bg-gray-50 border-gray-200 text-gray-800 font-medium"
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="flex items-center space-x-4">
              <label className="text-gray-600 font-medium w-24 flex-shrink-0">
                Last Name
              </label>
              <div className="flex-1">
                <Input
                  value={getLastName()}
                  readOnly
                  className="bg-gray-50 border-gray-200 text-gray-800 font-medium"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-4">
              <label className="text-gray-600 font-medium w-24 flex-shrink-0">
                Email
              </label>
              <div className="flex-1">
                <Input
                  value={user.email || ""}
                  readOnly
                  className="bg-gray-50 border-gray-200 text-gray-800 font-medium"
                />
              </div>
            </div>

            {/* User ID */}
            <div className="flex items-center space-x-4">
              <label className="text-gray-600 font-medium w-24 flex-shrink-0">
                User ID
              </label>
              <div className="flex-1">
                <Input
                  value={user.uid}
                  readOnly
                  className="bg-gray-50 border-gray-200 text-gray-800 font-medium"
                />
              </div>
            </div>

            {/* Account Created */}
            <div className="flex items-center space-x-4">
              <label className="text-gray-600 font-medium w-24 flex-shrink-0">
                Created
              </label>
              <div className="flex-1">
                <Input
                  value={
                    user.metadata?.creationTime
                      ? new Date(
                          user.metadata.creationTime
                        ).toLocaleDateString()
                      : "N/A"
                  }
                  readOnly
                  className="bg-gray-50 border-gray-200 text-gray-800 font-medium"
                />
              </div>
            </div>

            {/* Last Sign In */}
            <div className="flex items-center space-x-4">
              <label className="text-gray-600 font-medium w-24 flex-shrink-0">
                Last Login
              </label>
              <div className="flex-1">
                <Input
                  value={
                    user.metadata?.lastSignInTime
                      ? new Date(
                          user.metadata.lastSignInTime
                        ).toLocaleDateString()
                      : "N/A"
                  }
                  readOnly
                  className="bg-gray-50 border-gray-200 text-gray-800 font-medium"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
