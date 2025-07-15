import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Heart, WineOff } from "lucide-react";

const SavedProducts = () => {
  const [SavedProducts, setSavedProducts] = useState([]);
  const userId = window.localStorage.getItem("userId");
  const token = window.localStorage.getItem("token");

  if (!userId){
    window.location = "/login"
  }
  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_HOST_STRING}/app/v1/users/${userId}/save`,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setSavedProducts(res.data.saved);
      } catch (err) {
        console.error("Failed to fetch saved products:", err);
      }
    };
    fetchSaved();
  }, []);

  if (SavedProducts.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center text-center px-4 bg-slate-50">
        <Heart className="w-16 h-16 text-purple-500 mb-4" />
        <h2 className="text-3xl font-bold text-gray-700 mb-2">No Saved Products Yet</h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven’t added any favorites. Start exploring and save what you love!
        </p>
        <a
          href="/"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition"
        >
          🔍 Explore Products
        </a>
      </div>
    );
  }

  return (
    <section className="bg-slate-50 flex flex-wrap gap-12 p-6 justify-center">
      {SavedProducts.map((product) => (
        <ProductCard key={product._id} product={product}/>
      ))}
    </section>
  );
};

export default SavedProducts;
