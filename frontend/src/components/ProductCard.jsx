import {
  Home,
  ShoppingCart,
  Timer,
  BadgePercent,
  Heart,
  Share2,
  Eye,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Toast from "./Toast"; // ✅ Import Toast

const ProductCard = ({ product  }) => {
  const user = window.localStorage.getItem("loggedIn");
  const [fullProduct, setFullProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imgSrc, setImgSrc] = useState("");
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const token = window.localStorage.getItem("token");
  const userId = window.localStorage.getItem("userId");
  const [toastMessage, setToastMessage] = useState(null); // ✅ Toast state
  const [SavedProducts, setSavedProducts] = useState([]);
  const [savedProductIds, setSavedProductIds] = useState([]);

  const showToast = (message, type = "success") => {
    setToastMessage({ message, type });
  };

  const handleShare = (product) => {
    const shareData = {
      title: product.name,
      text: `Check out this deal on FlashCart: ${product.name}`,
      url: `${window.location.origin}/products/${product._id}`,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => showToast("Product shared successfully!", "success"))
        .catch(() => showToast("Error sharing product", "error"));
    } else {
      navigator.clipboard
        .writeText(shareData.url)
        .then(() => showToast("Link copied to clipboard!", "success"))
        .catch(() => showToast("Failed to copy link", "error"));
    }
  };

  const addToCart = async (product) => {
    const endpoint = `${import.meta.env.VITE_HOST_STRING}/app/v1/cart/add`;
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
  const toggleSave = async (productId) => {
    if(!userId){
      window.location = '/login'
    }
    if (savedProductIds.includes(productId)) {
      const res = await axios.delete(
        `${import.meta.env.VITE_HOST_STRING}/app/v1/users/${userId}/save/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchSaved();
    } else {
      const res = await axios.post(
        `${import.meta.env.VITE_HOST_STRING}/app/v1/users/${userId}/save/${productId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchSaved();
    }
  };

  const handleCart = (product) => {
    if (!isLoggedIn) {
      window.localStorage.setItem(
        "pendingCartProduct",
        JSON.stringify(product)
      );
      window.location.href = "/login";
      return;
    }
    addToCart(product);
  };

  const handleOpenProduct = ({ id }) => {
    window.location = `/products/${id}`;
  };

  const expiryDate = (date) => {
    const currentDate = new Date();
    const targetDate = new Date(date);
    const timeDiff = targetDate - currentDate;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };
  const fetchSaved = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_HOST_STRING}/app/v1/users/${userId}/save`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setSavedProducts(res.data.saved);
    const ids = res.data.saved.map((item) => item._id);
    setSavedProductIds(ids);
  };

  useEffect(() => {
    fetchSaved();
  }, []);


  if (!product) {
    return (
      <p className="text-center text-gray-500 py-8">Loading products...</p>
    );
  }

  return (
    <section>

      <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto text-black cursor-pointer pb-24">
        <div
          key={product._id}
          className="bg-white text-dark rounded-xl shadow-card w-80 p-4 text-left flex flex-col"
        >
          <div className="relative mb-8 select-none">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <p className="absolute -top-2 -left-2 z-10 bg-amber-300 text-dark px-3 py-1 flex items-center gap-1 rounded-tr-2xl rounded-bl-2xl font-semibold text-sm shadow-md">
              <BadgePercent className="w-4 h-4" />
              {product.priceOff}%
            </p>
            <div className="absolute top-2 right-2 flex flex-col gap-4">
              {SavedProducts.some((p) => p._id === product._id) ? (
                <button
                  className="bg-white/80 hover:bg-white p-1 rounded-full shadow transition"
                  onClick={() => toggleSave(product._id)}
                >
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                </button>
              ) : (
                <button
                  className="bg-white/80 hover:bg-white p-1 rounded-full shadow transition"
                  onClick={() => toggleSave(product._id)}
                >
                  <Heart className="w-4 h-4 text-red-500" />
                </button>
              )}
              <button
                className="bg-white/80 hover:bg-white p-1 rounded-full shadow transition"
                onClick={() => handleShare(product)}
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>

              <button
                className="bg-white/80 hover:bg-white p-1 rounded-full shadow transition"
                onClick={() => {
                  setSelectedProduct(product);
                  setImgSrc(product.images?.[0] || "");
                  setFullProduct(true);
                }}
              >
                <Eye className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div
            className="flex flex-col gap-2 flex-grow"
            onClick={() => handleOpenProduct({ id: product._id })}
          >
            <span className="flex justify-between">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <h3 className="text-lg text-primary font-bold">
                ₹{product.discountedPrice}
              </h3>
            </span>

            <div className="flex items-center text-sm text-muted gap-2">
              <Home className="w-4 h-4 text-green-500" />
              <p>{product.location}</p>
            </div>

            <div className="flex items-center text-sm text-muted gap-2">
              <Timer className="w-4 h-4 text-red-500" />
              Exp: {expiryDate(product.expiryDate)} Days
            </div>
          </div>

          <button
            className="cursor-pointer mt-4 flex items-center justify-center gap-2 bg-purple-400 text-white px-4 py-2 rounded-md hover:bg-purple-600/80 transition"
            onClick={() => handleCart(product)}
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>

      {fullProduct && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-6">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl p-8 relative overflow-hidden">
            <button
              onClick={() => setFullProduct(false)}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow-md transition"
            >
              <X className="w-5 h-5 text-gray-800 cursor-pointer" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-6">
                <img
                  src={imgSrc}
                  alt={selectedProduct.name}
                  className="w-full rounded-xl object-cover max-h-[350px]"
                />
                <div className="flex gap-3">
                  {selectedProduct.images?.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      onClick={() => setImgSrc(img)}
                      className={`w-20 h-20 rounded-md object-cover cursor-pointer transition-transform duration-200 ${
                        imgSrc === img
                          ? "ring-2 ring-purple-600 scale-105"
                          : "hover:scale-105"
                      }`}
                      alt={`thumb-${index}`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-between space-y-6">
                <div>
                  <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4 capitalize">
                    {selectedProduct.type}
                  </p>

                  <div className="space-y-2 text-base text-gray-700">
                    <div>
                      <span className="font-medium text-gray-800">
                        Actual Price:
                      </span>{" "}
                      <span className="line-through">
                        ₹{selectedProduct.actualPrice}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">
                        Discounted Price:
                      </span>{" "}
                      <span className="text-purple-700 font-semibold text-lg">
                        ₹{selectedProduct.discountedPrice}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">
                        Expires in:
                      </span>{" "}
                      <span className="text-red-500">
                        {expiryDate(selectedProduct.expiryDate)} days
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">
                        Location:
                      </span>{" "}
                      {selectedProduct.location}
                    </div>
                  </div>

                  <p className="mt-6 text-sm text-gray-600 leading-relaxed">
                    FlashCart features deals on near-expiry items to help save
                    money and reduce waste. Stock is limited — grab yours before
                    it's gone!
                  </p>
                </div>

                <button
                  className="cursor-pointer w-full bg-purple-600 hover:bg-purple-700 transition text-white py-3 rounded-lg text-lg font-medium shadow-md"
                  onClick={() => handleCart(selectedProduct)}
                >
                  <ShoppingCart className="inline-block mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Toast UI */}
      {toastMessage && (
        <Toast
          message={toastMessage.message}
          type={toastMessage.type}
          onClose={() => setToastMessage(null)}
        />
      )}
    </section>
  );
};

export default ProductCard;






// why fetching the saved products here ? what is the use in that refernce from the parent - need to solve
