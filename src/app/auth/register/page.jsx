"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/Model/YupSchemas";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { SignUpWithEmail } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const { username, email, password } = data;
    try {
      const result = await SignUpWithEmail(email, password, username);
      if (result.success) {
        setLoading(true);
        reset();
        toast.success("Registration successful! Please log in.", {
          autoClose: 1500,
          onClose: () => {
            router.push("/auth/login");
          },
        });

        setLoading(false);
      } else {
        toast.error("Registration failed Please try again");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Registration error: " + error.message);
    }
    setTimeout(() => setLoading(false), 1500);
  };

  const continueWithGoogle = () => {
    console.log("Google clicked");
  };

  const continueWithGithub = () => {
    console.log("Github clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-4">
      <div className="w-full max-w-md bg-[#1e293b] p-8 rounded-2xl shadow-lg text-white">
        <h1 className="text-3xl font-bold text-center">Create Account</h1>
        <p className="text-center text-gray-300 mt-2">
          Join us and start your journey.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div>
            <label className="block mb-1 text-sm">Full Name</label>
            <input
              type="text"
              {...register("username")}
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your full name"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm">Email Address</label>
            <input
              type="email"
              {...register("email")}
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label className="block mb-1 text-sm">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className={`w-full bg-[#0f172a] border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.password ? "border-red-500" : "border-gray-700"
              }`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 rounded-xl font-semibold cursor-pointer"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-700" />
          <span className="mx-4 text-gray-400">OR</span>
          <hr className="flex-1 border-gray-700" />
        </div>

        <div className="space-y-4">
          <button
            onClick={continueWithGoogle}
            className="w-full flex items-center justify-center gap-3 bg-[#0f172a] border border-gray-700 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            <span className="text-sm">Continue with Google</span>
          </button>

          <button
            onClick={continueWithGithub}
            className="w-full flex items-center justify-center gap-3 bg-[#0f172a] border border-gray-700 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            <span className="text-sm">Continue with Github</span>
          </button>
        </div> */}

        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <Link className="text-indigo-400 hover:underline" href="/auth/login">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
