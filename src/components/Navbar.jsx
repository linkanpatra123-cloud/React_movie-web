"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/?search=${searchQuery}`);
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md px-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold text-yellow-500">
          MovieFlix
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-l-md text-white focus:outline-white border-2 border-white"
          />
          <button type="submit" className="bg-yellow-500 text-black px-4 py-2 rounded-r-md font-semibold hover:bg-yellow-600">
            Search
          </button>
        </form>

        {/* Links */}
        <div className="flex gap-10">
          <Link href="/" className="border-2 px-3 py-1 rounded-md font-semibold hover:text-yellow-500 transition">Home</Link>
          <Link href="/add-movie" className="w-28 h-8 flex items-center rounded-md justify-center text-black font-semibold bg-yellow-500 hover:bg-yellow-600 transition">+ Add Movie</Link>
        </div>
      </div>
    </nav>
  );
}