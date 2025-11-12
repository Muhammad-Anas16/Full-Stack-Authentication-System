"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-blue-700 flex items-center justify-between px-8 py-4">
        <h1 className="font-bold text-lg">MERNAuthFlow</h1>
        <nav className="space-x-6 text-sm">
          <Link href="/" className="hover:text-gray-200">
            Dashboard
          </Link>
          <Link href="/profile" className="hover:text-gray-200">
            Profile
          </Link>
        </nav>
        <button className="bg-red-500 px-4 py-2 rounded-lg text-white">
          Logout
        </button>
      </header>

      <main className="max-w-6xl mx-auto p-8">
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Welcome Back, User!</h2>
            <p className="text-gray-400 mt-2">
              Your personalized dashboard awaits. Discover insights and manage
              your account with ease.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">📊</div>
        </div>
      </main>
    </div>
  );
}
