"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col pt-[60px] items-center bg-white justify-center min-h-screen bg-gray-100 text-gray-700">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you are looking for does not exist.</p>
      <Link href="/" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
        Go Back Home
      </Link>
    </div>
  );
}
