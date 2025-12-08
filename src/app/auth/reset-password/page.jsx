// "use client";

// import { forgetPassword } from "@/lib/auth-client";
// import { useState } from "react";

// const ForgetPasswordForm = () => {
//   const [email, setEmail] = useState("");
//   const handleForgotPassword = async (e) => {
//     e.preventDefault();
//     const result = await forgetPassword(email);

//     if (result.success) {
//       // Show success message
//       toast.success("If your email exists, you'll receive a reset link");
//     } else {
//       // Handle error
//       toast.error(result.error);
//     }
//   };

// };

// export default ForgetPasswordForm;

"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    console.log("Reset password:", password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] px-4">
      <div className="w-full max-w-md bg-[#1E293B] rounded-2xl p-8 shadow-xl border border-gray-700">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-white text-center">
          Reset Your Password
        </h2>
        <p className="text-gray-400 text-center mt-2">
          Enter and confirm your new password below.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">

          {/* New Password */}
          <label className="text-gray-300 text-sm mb-1 block">
            New Password
          </label>

          <div className="relative mb-5">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#0F172A] text-gray-200 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <label className="text-gray-300 text-sm mb-1 block">
            Confirm New Password
          </label>

          <div className="relative mb-2">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter your new password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl bg-[#0F172A] text-gray-200 border ${
                error ? "border-red-500" : "border-gray-600"
              } focus:ring-2 focus:ring-blue-500 outline-none`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4">Error: {error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition rounded-xl text-white font-semibold"
          >
            Update Password
          </button>
        </form>

        {/* Back to login */}
        <div className="text-center mt-6">
          <Link
            href="/auth/login"
            className="text-blue-400 hover:underline text-sm"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
