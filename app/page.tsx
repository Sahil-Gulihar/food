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
import { Cookie, Eye, EyeOff } from "lucide-react";

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

  // Custom food emoji array
  const foodEmojis = [
    "🍰",
    "🍪",
    "🍩",
    "🍦",
    "🧁",
    "🍭",
    "🍫",
    "🍬",
    "🍮",
    "🥞",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center p-4 font-sans">
      {/* Floating food items background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => {
          const emoji = foodEmojis[i % foodEmojis.length];
          return (
            <div
              key={i}
              className="absolute animate-float text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
                opacity: 0.7,
                transform: `scale(${0.7 + Math.random() * 0.5})`,
              }}
            >
              {emoji}
            </div>
          );
        })}
      </div>

      <Card className="w-full max-w-md shadow-xl rounded-3xl border-2 border-amber-200 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center space-y-2 pb-2">
          <div className="flex justify-center mb-2 relative">
            <div
              className="w-32 h-32 rounded-full bg-amber-50 border-2 border-amber-200 overflow-hidden flex items-center justify-center transition-all duration-300"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              style={{ boxShadow: "0 4px 10px rgba(245, 158, 11, 0.2)" }}
            >
              <div
                className={`transition-transform duration-500 ${
                  isHovering ? "scale-110" : "scale-100"
                }`}
              >
                <img
                  src="/api/placeholder/150/150"
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
              <Cookie
                size={32}
                color="#f59e0b"
                fill="#f59e0b"
                className="animate-pulse"
              />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-amber-600">
            Yummy Login!
          </CardTitle>
          <CardDescription className="text-gray-600 text-lg">
            Sign in for sweet treats 🍩
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8">
          {error && (
            <div className="mb-6 p-3 bg-amber-50 rounded-lg border border-amber-200 text-center">
              <p className="text-amber-600 text-sm flex items-center justify-center gap-2">
                <span>Oops, that's not the recipe! {error}</span>
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
                placeholder="Type your tasty username~"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border-2 border-amber-200 px-4 py-3 focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition-all"
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
                  placeholder="Enter your secret recipe~"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border-2 border-amber-200 px-4 py-3 focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-3 text-lg rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 border-0 text-white font-medium transition-all duration-300 hover:shadow-lg hover:scale-102 transform"
            >
              Take a Bite! 🍪
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-center px-8 pb-8">
          <p className="text-sm text-gray-500 w-full">
            Forgot your recipe?{" "}
            <a
              href="#"
              className="text-amber-500 hover:text-amber-600 font-medium hover:underline transition-colors"
            >
              Get a new one!
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
