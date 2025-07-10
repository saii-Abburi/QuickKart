import React, { useEffect, useState } from "react";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewsTab from "./ReviewsTab";
import Toast from "./Toast";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [tab, setTab] = useState("reviews");
  const { id } = useParams();
  const userId = window.localStorage.getItem("userId");
  const [toastMessage, setToastMessage] = useState(null); // ✅ Toast state

  const showToast = (message, type = "success") => {
    setToastMessage({ message, type });
  };

  const fetchProduct = async () => {
    try {
      const endpoint = `http://localhost:3000/app/v1/products/${id}`;
      const res = await axios.get(endpoint);
      const fetchedProduct = res.data?.product?.[0];
      setProduct(fetchedProduct);
      setSelectedImage(fetchedProduct?.images?.[0]);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };
  const addToCart = async (product) => {
    const endpoint = "http://localhost:3000/app/v1/cart/add";
    if(!userId){
      window.location = '/login'
    }
    try {
      await axios.post(endpoint, {
        userId,
        productId: product._id,
        quantity: 1,
      });
      showToast("Added to cart", "success");
    } catch (error) {
      showToast("Error adding to cart", "error");
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="text-center py-10">Loading product details...</p>;
  }
  return (
    <section className="w-full min-h-screen bg-slate-50 py-10 font-[Roboto]">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <p className="text-xl mb-8 text-gray-600">
          <a href="/" className="hover:underline">
            Home
          </a>{" "}
          /{" "}
          <a href="/products" className="hover:underline">
            Products
          </a>{" "}
          /{" "}
          {product?.name?.length > 20
            ? product.name.split(" ")[0] + "..."
            : product.name}
        </p>

        {/* Main content */}
        <div className="flex max-md:flex-col gap-10">
          {/* Image Section */}
          <div className="flex flex-col gap-4 max-w-md">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-[300px] object-cover rounded-xl"
            />
            <div className="flex gap-3">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumb-${index}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-20 object-cover rounded-md border ${
                    selectedImage === img ? "border-black" : "border-gray-300"
                  } cursor-pointer`}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>

            {/* Ratings */}
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.avgRating || 2.5)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600">
                ({product.reviews.length} Reviews)
              </span>
            </div>

            {/* Pricing */}
            <div className="mb-4">
              <p className="text-3xl font-bold text-black">
                ₹{product.discountedPrice} 
              </p>
              <p className="line-through text-gray-500 text-sm">
                ₹{product.actualPrice}
              </p>
              <p className=" text-gray-500 text-sm">
                pack : {product.weight}kg
              </p>
              <p className="text-green-600 text-sm">
                Save {product.priceOff}% right now
              </p>
              <p className="text-red-600 text-sm pt-2">
                {product.quantity} products remaining
              </p>
            </div>

            <ul className="list-disc ml-5 mb-4 text-sm text-gray-700">
              {product.tags[0]?.split(",").map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4 mb-6">
              <button
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 flex items-center gap-2"
                onClick={() => addToCart(product)}
              >
                <ShoppingCart className="w-4 h-4" /> Add to cart
              </button>
              <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100">
                <Heart className="w-4 h-4" />
              </button>
            </div>

            {/* Delivery info */}
            <ul className="text-sm text-gray-600 space-y-2">
              <li>🚚 Free shipping worldwide</li>
              <li>🔐 100% Secured Payment</li>
              <li>👨‍🔧 Made by Professionals</li>
            </ul>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <div className="flex gap-6 border-b text-sm font-medium">
            {["description", "reviews", "support"].map((tabName) => (
              <button
                key={tabName}
                onClick={() => setTab(tabName)}
                className={`pb-2 ${
                  tab === tabName
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500"
                }`}
              >
                {tabName === "reviews"
                  ? `Reviews (${product.reviews.length})`
                  : tabName.charAt(0).toUpperCase() + tabName.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="mt-6 text-gray-700 text-sm leading-relaxed">
            {tab === "description" && <p>{product.description}</p>}

            {tab === "reviews" && (
              <ReviewsTab
                productId={product._id}
                reviews={product.reviews}
                fetchProduct={fetchProduct} // pass the refetch method
              />
            )}

            {tab === "support" && (
              <p>
                For support related to your product, contact us at{" "}
                <a
                  href="mailto:support@quickcart.com"
                  className="text-blue-600 underline"
                >
                  support@quickcart.com
                </a>{" "}
                or call 1800-000-123.
              </p>
            )}
          </div>
        </div>
        {toastMessage && (
          <Toast
            message={toastMessage.message}
            type={toastMessage.type}
            onClose={() => setToastMessage(null)}
          />
        )}
      </div>
    </section>
  );
};

export default ProductDetail;
