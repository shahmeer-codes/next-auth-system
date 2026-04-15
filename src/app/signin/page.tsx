"use client";

import axios from "axios";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/signin", {
        email,
        password,
      });

      console.log("LOGIN SUCCESS:", res.data);
    } catch (err) {
      console.log("LOGIN ERROR:", err);
     
    }
  };

  // Google login
  const handleGoogleSignIn = (): void => {
    console.log("Google Sign In");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-800">
        
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center justify-center">
          <div className="w-full h-px bg-gray-700" />
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="w-full h-px bg-gray-700" />
        </div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="w-full flex items-center justify-center gap-3 bg-gray-800 text-white border border-gray-700 p-3 rounded-lg hover:bg-gray-700 transition"
        >
          <FcGoogle size={22} />
          <span>Sign in with Google</span>
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <a href="register" className="text-blue-500 cursor-pointer hover:underline">
            Register
          </a>
        </p>

      </div>
    </div>
  );
};

export default Page;