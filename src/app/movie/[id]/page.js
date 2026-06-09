"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaArrowAltCircleLeft, FaArrowCircleLeft, FaBackspace, FaEdit, FaExpandArrowsAlt, FaLocationArrow, FaLongArrowAltLeft, FaReply, FaTrash } from "react-icons/fa";
import { FaArrowRightArrowLeft, FaArrowRotateLeft, FaTentArrowTurnLeft } from "react-icons/fa6";

export default function MovieDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {

    const movies = JSON.parse(sessionStorage.getItem("movies")) || [];
    const foundMovie = movies.find((m) => m.id === id);
    setMovie(foundMovie);
    
    if (foundMovie) {
      setFormData(foundMovie);
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    
    const movies = JSON.parse(sessionStorage.getItem("movies")) || [];
    
    const updatedMovies = movies.map((m) => (m.id === id ? formData : m));
    
    
    sessionStorage.setItem("movies", JSON.stringify(updatedMovies));
  
    setMovie(formData);
    setIsEditing(false); 
    
    alert("Movie Details Updated Successfully!");
  };

  
  const handleDelete = () => {
   
    const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
    
    if (confirmDelete) {
      const movies = JSON.parse(sessionStorage.getItem("movies")) || [];
      
      const filteredMovies = movies.filter((m) => m.id !== id);
    
      sessionStorage.setItem("movies", JSON.stringify(filteredMovies));
      
      alert("Movie Deleted Successfully!");
      router.push("/"); 
    }
  };

  if (!movie) return <div className="text-center mt-20 text-xl font-bold">Loading...</div>;

  // "Edit" button
  if (isEditing) {
    return (
      <div className="max-w-xl mx-auto bg-gray-900 p-8 rounded-lg shadow-md mt-10 relative">
        {/* Cancel Edit Button */}
        <button 
          onClick={() => setIsEditing(false)} 
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold transition"
          title="Cancel"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-white">Edit Movie Details</h2>
        
        <form onSubmit={handleUpdate} className="flex flex-col gap-4 items-center">
          <input type="text" name="name" value={formData.name} required onChange={handleChange} className="p-3 border rounded w-full" />
          <textarea name="description" value={formData.description} required onChange={handleChange} className="p-3 border rounded w-full h-24" />
          <input type="number" name="year" value={formData.year} required onChange={handleChange} className="p-3 border rounded w-full" />
          <input type="url" name="image" value={formData.image} required onChange={handleChange} className="p-3 border rounded w-full" />
          
          <select name="category" value={formData.category} onChange={handleChange} className="p-3 border rounded w-full bg-gray-900 text-white">
            <option value="Bollywood">Bollywood</option>
            <option value="Hollywood">Hollywood</option>
            <option value="South Indian">South Indian</option>
          </select>
          
          <button type="submit" className="bg-yellow-500 text-black font-bold px-3 py-2 rounded-4xl mt-4 hover:bg-yellow-600 transition">
            Update Movie
          </button>
        </form>
      </div>
    );
  }

  // Movie Details View
  return (
    <div className="max-w-4xl h-110 mx-auto bg-white p-6 mt-10 rounded-lg shadow-lg flex flex-col md:flex-row gap-8">
      <img src={movie.image} alt={movie.name} className="w-full md:w-1/3 rounded-lg object-cover shadow" />
      
      <div className="flex-1">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{movie.name}</h1>
        <div className="flex gap-4 text-gray-600 mb-6 font-semibold">
          <span>Release Year: {movie.year}</span>
          <span>|</span>
          <span>Category: {movie.category}</span>
        </div>
        
        <h3 className="text-xl text-black font-bold mb-2 border-b pb-2">Description</h3>
        <p className="text-gray-700 leading-relaxed mb-8">{movie.description}</p>
        
        {/* Buttons Section */}
        <div className="flex gap-4">
          <button onClick={() => router.back()} className="bg-gray-800 text-white px-3 py-2 rounded hover:bg-gray-700 transition">
            <FaReply />
          </button>
          
          <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-black font-bold px-3 py-2 rounded hover:bg-yellow-600 transition">
            <FaEdit />
          </button>

          <button onClick={handleDelete} className="bg-red-600 text-white font-bold px-3 py-2 rounded hover:bg-red-700 transition">
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}