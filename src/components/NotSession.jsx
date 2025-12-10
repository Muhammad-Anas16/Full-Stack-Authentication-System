"use client";

import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const NotSession = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLoginRedirect = () => {
    setLoading(true);
    toast.info("Redirecting to login page...");
    setTimeout(() => {
      router.push("/auth/login");
    }, 2000);
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      {/* NAVBAR */}
      <nav className="w-full border-b border-gray-800 bg-[#0d0d0d] px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-wide">My Dashboard</h1>

        <button
          onClick={handleLoginRedirect}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl hover:bg-gray-200 transition font-medium cursor-pointer"
        >
          <LogIn className="h-5 w-5" />
          {loading ? "Loading..." : "Login"}
        </button>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex flex-col items-center justify-center flex-1 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Welcome 👋</h2>

        <p className="text-gray-400 text-lg max-w-lg">
          Please <span className="text-white font-semibold">login</span> to
          access your dashboard and view your account activity.
        </p>

        <button
          onClick={handleLoginRedirect}
          className="mt-8 bg-white text-black px-5 py-3 rounded-xl text-lg font-semibold hover:bg-gray-200 transition cursor-pointer"
        >
          {loading ? "Loading..." : "Go to Login"}
        </button>
      </main>
    </div>
  );
};

export default NotSession;
