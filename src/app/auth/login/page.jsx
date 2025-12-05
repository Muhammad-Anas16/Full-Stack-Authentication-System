"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { Lock } from "lucide-react";
import { loginSchema } from "@/Model/YupSchemas";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { SignInGithub, SignInGoogle, signInWithEmail } from "@/lib/auth-client";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    setLoading(true);
    const { email, password } = data;

    try {
      const result = await signInWithEmail(email, password);

      if (result.success) {
        reset();
        toast.success("Login successful!");
      }
    } catch (networkError) {
      toast.error("Unexpected error: " + networkError.message);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setGoogleLoading(true);
    const result = await SignInGoogle();
    if (!result.success) {
      // console.error('Sign in failed:', result.error);
      toast.error("Google sign-in failed. Please try again.");
      return;
    }
    setGoogleLoading(false);
    router.push(result.data.url);
  };

  const loginWithGithub = async () => {
    setGithubLoading(true);
    const result = await SignInGithub();
    if (!result.success) {
      toast.error("GitHub sign-in failed. Please try again.");
      return;
    }
    router.push(result.data.url);
    setGithubLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0f172a] px-4">
      <div className="w-full max-w-md bg-[#111827] p-8 rounded-2xl shadow-lg border border-gray-800 text-white">
        {/* Lock Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 p-4 rounded-full shadow-lg">
            <Lock size={30} className="text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center">Welcome Back</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <div className="relative">
              <input
                type="email"
                {...register("email")}
                className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="••••••••"
              />
              <span
                className="absolute right-4 top-3 cursor-pointer text-gray-400 curdor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
            </div>

            <div className="flex justify-end mt-1">
              <Link
                href="/auth/reset-password"
                className="text-blue-500 text-sm hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 transition text-white py-3 rounded-xl font-semibold cursor-pointer"
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        {/* OR divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-700" />
          <span className="mx-4 text-gray-400">OR</span>
          <hr className="flex-1 border-gray-700" />
        </div>

        {/* Social Buttons */}
        <div className="space-y-4">
          <button
            onClick={loginWithGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-xl hover:bg-gray-100 transition cursor-pointer"
          >
            <FcGoogle size={20} />
            {googleLoading ? (
              "Processing..."
            ) : (
              <span>Continue with Google</span>
            )}
          </button>

          <button
            onClick={loginWithGithub}
            disabled={githubLoading}
            className="w-full flex items-center justify-center gap-3 bg-[#1f2937] py-3 rounded-xl border border-gray-700 hover:bg-gray-800 transition cursor-pointer"
          >
            <FaGithub size={20} />
            {githubLoading ? (
              "Processing..."
            ) : (
              <span>Continue with GitHub</span>
            )}
          </button>
        </div>

        {/* Sign up */}
        <p className="text-center text-gray-400 mt-6 text-sm">
          {"Don't have an account?"}{" "}
          <Link className="text-blue-500 hover:underline" href="/auth/register">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
