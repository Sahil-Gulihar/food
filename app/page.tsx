"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Heart, Eye, EyeOff } from "lucide-react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "sahil_gulihar" && password === "archbtw") {
      window.location.href = "/dashboard";
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-yellow-100 flex items-center justify-center p-4 font-sans">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
              opacity: 0.4 + Math.random() * 0.3,
              transform: `scale(${0.5 + Math.random() * 0.8})`,
            }}
          >
            <Heart size={24} color="#ff6b81" fill="#ff6b81" />
          </div>
        ))}
      </div>

      <Card className="w-full max-w-md shadow-xl rounded-3xl border-2 border-pink-200 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center space-y-2 pb-2">
          <div className="flex justify-center mb-2 relative">
            <div
              className="w-32 h-32 rounded-full bg-yellow-100 border-2 border-yellow-200 overflow-hidden flex items-center justify-center transition-all duration-300"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div
                className={`transition-transform duration-500 ${
                  isHovering ? "scale-110" : "scale-100"
                }`}
              >
                <img
                  src="/logo.png"
                  alt="Cute Character"
                  className="object-cover"
                />
              </div>
            </div>
            <div
              className={`absolute -bottom-1 transition-transform duration-300 ${
                isHovering ? "scale-125" : "scale-100"
              }`}
            >
              <Heart
                size={32}
                color="#ff6b81"
                fill="#ff6b81"
                className="animate-pulse"
              />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-pink-500">
            Hello Friend!
          </CardTitle>
          <CardDescription className="text-gray-500 text-lg">
            Sign in with your happy heart ♥
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8">
          {error && (
            <div className="mb-6 p-3 bg-pink-50 rounded-lg border border-pink-200 text-center">
              <p className="text-pink-500 text-sm flex items-center justify-center gap-2">
                <span>Oopsie! {error}</span>
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="block text-gray-600 font-medium pl-2"
              >
                Username
              </Label>
              <Input
                id="username"
                placeholder="Type your username here~"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border-2 border-pink-100 px-4 py-3 focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50 transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="block text-gray-600 font-medium pl-2"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  placeholder="Enter your secret password~"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border-2 border-pink-100 px-4 py-3 focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-3 text-lg rounded-xl bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 border-0 text-white font-medium transition-all duration-300 hover:shadow-lg hover:scale-102 transform"
            >
              Sign In
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-center px-8 pb-8">
          <p className="text-sm text-gray-500 w-full">
            Forgot your password?{" "}
            <a
              href="#"
              className="text-pink-500 hover:text-pink-600 font-medium hover:underline transition-colors"
            >
              Reset it here
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

// Add these animations to your global CSS
const styles = `
@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
}

.animate-float {
  animation: float 10s ease-in-out infinite;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}
`;

// Render the component
export default Login;
