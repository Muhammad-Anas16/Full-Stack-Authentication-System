"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

interface FormData {
  username: string;
  email: string;
  password: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
}

const Signup: React.FC = () => {
  // ✅ Local state for form fields
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  // ✅ Local state for loading and errors
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState<string>("");

  const router = useRouter();
  // ✅ Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ✅ Validate fields
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.username || formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters.";
    }

    if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!formData.password || formData.password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    return newErrors;
  };

  // ✅ Handle form submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // console.log("Registeration => :", formData.username);
      // console.log("Registeration => :", formData.email);
      // console.log("Registeration => :", formData.password);

      await authClient.signUp.email(
        {
          email: formData.email,
          password: formData.password,
          name: formData.username,
          image: "",
          callbackURL: "/",
        },
        {
          onRequest: (ctx) => {
            toast("Creating your account...");
          },
          onSuccess: (ctx) => {
            toast.success("Account created successfully!");
            router.push("/auth/login");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        }
      );

      // alert("Account created successfully!");
      setFormData({ username: "", email: "", password: "" });
    } catch (error) {
      console.error("Signup error:", error);
      setFormError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-4">
      <div className="w-full max-w-md rounded-2xl bg-gray-900 border border-gray-800 p-8 shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
          Create your account
        </h2>
        <p className="text-gray-400 mt-2 text-center">
          Join MERN AuthFlow today.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Username */}
          <div>
            <label className="text-sm text-gray-400">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-gray-950 border border-gray-800 focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="Your username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-gray-950 border border-gray-800 focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-400">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-gray-950 border border-gray-800 focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="********"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* General error */}
          {formError && <p className="text-red-500 text-center">{formError}</p>}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold transition duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>

          {/* Redirect link */}
          <p className="text-center text-gray-400 text-sm mt-4">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
