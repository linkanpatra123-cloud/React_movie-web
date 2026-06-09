"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMovie() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    year: "",
    image: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = {
      ...formData,
      id: Date.now().toString(),
    };

    const existingMovies = JSON.parse(sessionStorage.getItem("movies")) || [];
    sessionStorage.setItem("movies", JSON.stringify([newMovie, ...existingMovies]));
    
    alert("Movie Added Successfully to Session!");
    router.push("/");
  };

  return (
    <div className="max-w-xl mx-auto bg-gray-900 p-8 rounded-lg shadow-md mt-10 relative">
      
      {/* Cross (X) Close Button */}
      <button 
        onClick={() => router.push("/")} 
        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold transition"
        title="Close"
      >
        ×
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center text-white">Add New Movie</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
        <input type="text" name="name" placeholder="Movie Name" required onChange={handleChange} className="p-3 border rounded w-full" />
        <textarea name="description" placeholder="Movie Description" required onChange={handleChange} className="p-3 border rounded w-full h-24" />
        <input type="number" name="year" placeholder="Release Year" required onChange={handleChange} className="p-3 border rounded w-full" />
        <input type="url" name="image" placeholder="Image URL" required onChange={handleChange} className="p-3 border rounded w-full" />
        
        <select name="category" onChange={handleChange} className="p-3 border rounded w-full bg-gray-900">
          <option value="Select_Category">Select Category</option> 
          <option value="Bollywood">Bollywood</option>
          <option value="Hollywood">Hollywood</option>
          <option value="South Indian">South Indian</option>
        </select>
        
        <button type="submit" className="bg-yellow-500 text-black font-bold w-30 py-3 rounded mt-4 hover:bg-yellow-600 transition">
          Save Movie
        </button>
      </form>
    </div>
  );
}