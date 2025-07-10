import React, { useEffect, useState } from "react";
import fetchProducts from "../hooks/useFetchProducts";
import ProductCard from "../components/ProductCard"; // Premium card UI assumed

const UserPage = () => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchProducts();
        setProducts(res);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const sortProducts = (products, sortBy) => {
    const sorted = [...products];
    switch (sortBy) {
      case "price-asc":
        return sorted.sort((a, b) => a.discountedPrice - b.discountedPrice);
      case "price-desc":
        return sorted.sort((a, b) => b.discountedPrice - a.discountedPrice);
      case "rating":
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts(products, sortBy);

  return (
    <div className="bg-slate-50 min-h-screen px-6 py-8 font-[Roboto]">
      {/* Header bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">All Products</h1>

        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="text-sm font-medium text-gray-600">
            Sort By:
          </label>
          <select
            id="sort"
            className="p-2 border border-gray-300 rounded-md bg-white shadow-sm text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Products grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {loading ? (
          <p className="col-span-full text-center text-gray-500">Loading...</p>
        ) : sortedProducts.length ? (
          sortedProducts.map((product) => {
            return <ProductCard product={product} key={product._id} />;
          })
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products available
          </p>
        )}
      </div>
    </div>
  );
};

export default UserPage;
