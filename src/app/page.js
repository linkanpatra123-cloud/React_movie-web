"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("All");
  const [year, setYear] = useState("All");
  const [sortOrder, setSortOrder] = useState("Default"); // Default option set kiya
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const storedMovies = JSON.parse(sessionStorage.getItem("movies")) || [];
    setMovies(storedMovies);
  }, []);

  // Filter Logic
  let filteredMovies = movies.filter((movie) => {
    const matchSearch = movie.name.toLowerCase().includes(searchQuery);
    const matchCategory = category === "All" || movie.category === category;
    const matchYear = year === "All" || movie.year === year;
    return matchSearch && matchCategory && matchYear;
  });

  // Sort Logic (Including Default)
  if (sortOrder === "Ascending") {
    filteredMovies.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOrder === "Descending") {
    filteredMovies.sort((a, b) => b.name.localeCompare(a.name));
  } // 'Default' hone par sequential filtering order maintain rahega (koi extra sorting nahi)

  // Pagination Logic
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMovies = filteredMovies.slice(startIndex, startIndex + itemsPerPage);

  const uniqueYears = ["All", ...new Set(movies.map((m) => m.year))].sort((a, b) => b - a);

  // Sabhi filters aur search ko reset karne ke liye handler
  const resetFilters = () => {
    setCategory("All");
    setYear("All");
    setSortOrder("Default");
    setCurrentPage(1);
    router.push("/");
  };

  // Check karein kya koi bhi filter active hai
  const isFilterActive = searchQuery || category !== "All" || year !== "All" || sortOrder !== "Default";

  return (
    <div className="px-20">
      {/* Home Page Back / Reset Button (Sirf tabhi dikhega jab filters active ho) */}
      {isFilterActive && (
        <button
          onClick={resetFilters}
          className="mb-4 flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded shadow hover:bg-gray-700 transition font-medium"
        >
          Clear All Filter
        </button>
      )}

      {/* Filters & Sorting Section */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 rounded shadow">
        <select value={category} onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }} className="p-2 border-2 border-white rounded text-white">
          <option value="All" className=" text-black">All Categories</option>
          <option value="Bollywood" className=" text-black">Bollywood</option>
          <option value="Hollywood" className=" text-black">Hollywood</option>
          <option value="South Indian" className=" text-black">South Indian</option>
        </select>

        <select value={year} onChange={(e) => { setYear(e.target.value); setCurrentPage(1); }} className="p-2 border-2 border-white rounded text-white">
          <option value="All" className=" text-black">All Years</option>
          {uniqueYears.filter(y => y !== "All").map(y => (
            <option key={y} value={y} className=" text-black">{y}</option>
          ))}
        </select>

        <select value={sortOrder} onChange={(e) => { setSortOrder(e.target.value); setCurrentPage(1); }} className="p-2 border-2 border-white rounded text-white">
          <option value="Default" className=" text-black">Sort</option>
          <option value="Ascending" className=" text-black">A - Z </option>
          <option value="Descending" className=" text-black">Z - A</option>
        </select>
      </div>

      {/* Movies Grid */}
      {paginatedMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-20">
          {paginatedMovies.map((movie) => (
            <Link href={`/movie/${movie.id}`} key={movie.id}>
              <div className="group bg-white rounded-lg shadow-olive-700 shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer flex flex-col h-full w-full">
                <div className="relative w-full h-[280px]">
                  <img src={movie.image} alt={movie.name} className="w-full h-full" />                
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 text-center mt-auto">
                  <h3 className="font-bold text-lg text-gray-800 truncate">{movie.name}</h3>
                  <p className="text-gray-500 text-sm">{movie.year} • {movie.category}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10 text-3xl">No movies found.</p>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 gap-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-800 text-white rounded disabled:bg-gray-400"
          >
            Prev
          </button>
          <span className="font-semibold">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-800 text-white rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading Movies...</div>}>
      <HomeContent />
    </Suspense>
  );
}