import React, { useEffect, useState } from "react";
import axios from "axios";
import SellerSidebar from "../components/SellerSidebar";
import SellerTopbar from "../components/SellerTopbar";
import CreateProductForm from "../components/CreateProduct";
import { Pencil, Trash2 } from "lucide-react";

const SellerProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const token = localStorage.getItem("token");
  const sellerId = localStorage.getItem("userId");

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_HOST_STRING}/app/v1/products/seller/${sellerId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const handleDelete = async (productId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`${import.meta.env.VITE_HOST_STRING}/app/v1/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete product.");
    }
  };

  const handleEdit = (product) => {
    const editedProduct = {
      ...product,
      expiryDate: product.expiryDate.split("T")[0],
    };

    setSelectedProduct(editedProduct);
    console.log(editedProduct); // Logs the correct value

    setIsEdit(true);
    setShowForm(true);
  };

  const handleCreate = () => {
    setSelectedProduct(null);
    setIsEdit(false);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setSelectedProduct(null);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col flex-1 relative">
      <main className="p-6 overflow-y-auto min-h-[80vh]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">
            🛍️ Your Products
          </h2>
          <button
            onClick={handleCreate}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-medium shadow"
          >
            + Create Product
          </button>
        </div>

        {products.length === 0 ? (
          <p className="text-gray-600">No products found. Add some!</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 group"
              >
                <div className="relative">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-44 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-blue-100 text-blue-700 p-2 rounded-full hover:bg-blue-200"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-100 text-red-700 p-2 rounded-full hover:bg-red-200"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-bold mt-3">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.location}</p>
                <p className="text-purple-700 font-semibold mt-1 text-base">
                  ₹{product.discountedPrice}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create/Edit Product Form */}
      {showForm && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-start pt-10 overflow-auto">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl relative shadow-lg animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>
            <CreateProductForm
              initialData={selectedProduct}
              isEdit={isEdit}
              onSuccess={handleSuccess}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProductsPage;
