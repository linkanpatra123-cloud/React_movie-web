"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function MovieDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // sessionStorage se specific ID wali movie dundhna
    const movies = JSON.parse(sessionStorage.getItem("movies")) || [];
    const foundMovie = movies.find((m) => m.id === id);
    setMovie(foundMovie);
  }, [id]);

  if (!movie) return <div className="text-center mt-20 text-xl font-bold">Loading...</div>;

  return (
    <div className="max-w-4xl h-110 mx-auto bg-white p-6 mt-10 rounded-lg shadow-lg flex flex-col md:flex-row gap-8">
      <img src={movie.image} alt={movie.name} className="w-full md:w-1/3 rounded-lg object-cover shadow" />
      
      <div className="flex-1">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{movie.name}</h1>
        <div className="flex gap-4 text-gray-600 mb-6 font-semibold">
          <span>Release Year: {movie.year}</span>
          <span>|</span>
          <span> {movie.category}</span>
        </div>
        
        <h3 className="text-xl text-black font-bold mb-2 border-b pb-2">Description</h3>
        <p className="text-gray-700 leading-relaxed mb-8">{movie.description}</p>
        
        <button onClick={() => router.back()} className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition">
          Back
        </button>
      </div>
    </div>
  );
}