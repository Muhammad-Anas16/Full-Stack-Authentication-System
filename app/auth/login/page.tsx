"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient, SignInGoogle, signInWithEmail } from "@/app/lib/auth-client";
import Image from "next/image";

const Login: React.FC = () => {
  const router = useRouter();

  // ✅ Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Validation + loading + error
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /** ✅ Validate inputs before submit */
  const validate = () => {
    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    setError("");
    return true;
  };

  /** ✅ Handle form submission */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    try {
      // console.log("User logged in:", { email, password });
      await signInWithEmail(email, password);
      // await authClient.signIn.email(
      //   {
      //     email,
      //     password,
      //     callbackURL: "/",
      //     rememberMe: false,
      //   },
      //   {
      //     onRequest: (ctx) => {
      //       toast("Logging your account...");
      //     },
      //     onSuccess: (ctx) => {
      //       toast.success(ctx.data?.message || "Sign In successfully!");
      //     },
      //     onError: (ctx) => {
      //       toast.error(ctx.error.message);
      //     },
      //   }
      // );
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="min-h-screen bg-black flex items-center justify-center text-white px-4">
      <section className="w-full max-w-md bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-lg">
        <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
        <p className="text-gray-400 text-center mt-2">
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Email Field */}
          <div>
            <label className="text-sm text-gray-400 block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full p-3 rounded-lg bg-gray-950 border border-gray-800 text-white focus:ring-2 focus:ring-blue-600 outline-none"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="text-sm text-gray-400 block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 rounded-lg bg-gray-950 border border-gray-800 text-white focus:ring-2 focus:ring-blue-600 outline-none"
              required
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link
              href="/verify-otp"
              className="text-blue-400 text-sm hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold transition duration-300 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          {/* Google Login Button */}
          <button
            type="button"
            className="w-full bg-[#030712] hover:bg-[#030712]/90 p-3 rounded-lg font-semibold transition duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            onClick={SignInGoogle}
          >
            <Image
              src="/google icon.png"
              alt="Google Logo"
              width={25}
              height={25}
              className="inline-block"
            />
            <span>Sign in with Google</span>
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-gray-400 text-sm mt-4">
            Don’t have an account?{" "}
            <Link href="/auth/register" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Login;
