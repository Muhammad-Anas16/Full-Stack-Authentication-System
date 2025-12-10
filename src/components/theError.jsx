"use client";

import { AlertTriangle } from "lucide-react";

const TheError = ({ error, handleRetry }) => {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      {/* NAVBAR */}
      <nav className="w-full border-b border-gray-800 bg-[#0d0d0d] px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-wide">My Dashboard</h1>
        <button
          onClick={handleRetry}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl hover:bg-gray-200 transition font-medium cursor-pointer"
        >
          Go Back
        </button>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex flex-col items-center justify-center flex-1 px-6 text-center">
        <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-3xl font-bold mb-4 text-red-500">Oops!</h2>

        <p className="text-gray-400 text-lg max-w-lg">
          {error?.message || "Something went wrong. Please try again later."}
        </p>

        <button
          onClick={handleRetry}
          className="mt-8 bg-red-500 text-white px-5 py-3 rounded-xl text-lg font-semibold hover:bg-red-600 transition cursor-pointer"
        >
          Go Back
        </button>
      </main>
    </div>
  );
};

export default TheError;