import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Plus, Minus, X } from "lucide-react";
import Toast from "./Toast";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const [toastMessage, setToastMessage] = useState(null); // ✅ Toast state
  const navigate = useNavigate();

  const showToast = (message, type = "success") => {
    setToastMessage({ message, type });
  };
  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) return (window.location.href = "/login");

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_HOST_STRING}/app/v1/cart/${userId}`
        );
        
        setCartData(data.cart || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_HOST_STRING}/app/v1/cart/remove`, {
        data: { userId, productId },
      });
      showToast("item Removed from the cart", "success");
      setCartData((prev) =>
        prev.filter((item) => item.productId._id !== productId)
      );
    } catch (error) {
      showToast(`Error in remoivng product ${error}`, "error");
    }
  };

  const handleQuantity = async (productId, delta) => {
    const updatedCart = cartData.map((item) =>
      item.productId._id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );

    setCartData(updatedCart); // Update local state

    const updatedItem = updatedCart.find(
      (item) => item.productId._id === productId
    );

    try {
      await axios.patch(`${import.meta.env.VITE_HOST_STRING}/app/v1/cart/update-quantity`, {
        userId,
        productId,
        quantity: updatedItem.quantity,
      });
      console.log("✅ Quantity updated in backend");
    } catch (error) {
      console.error("❌ Failed to update quantity", error);
    }
  };

  const handleClearCart = async () => {
    // Simulate clear all — implement backend if needed

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_HOST_STRING}/app/v1/cart/clear`,
        {
          data: { userId: localStorage.getItem("userId") },
        }
      );

      if (response.status === 200) {
        setCartData([]);
        showToast("cleared the cart", "success");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      showToast("failed to clear the cart", "error");
    }
  };

  const subtotal = cartData.reduce(
    (acc, item) => acc + item.productId.discountedPrice * item.quantity,
    0
  );

  if (loading) {
    return (
      <section className="h-screen grid place-items-center bg-gradient-to-br from-white to-blue-100">
        <h1 className="text-2xl font-medium text-gray-700 animate-pulse">
          Loading cart...
        </h1>
      </section>
    );
  }
  if (!cartData || cartData.length === 0) {
    return (
      <section className="bg-black/90 h-screen text-center grid place-items-center">
        <div>
          <h1 className="text-white text-5xl mb-8">Your Cart is Empty</h1>
          <motion.button
            onClick={() => (window.location.href = "/products")}
            whileHover={{ scale: 1.1, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-white border-white border-2 px-12 py-4 rounded-tr-2xl rounded-bl-2xl cursor-pointer hover:bg-white hover:text-purple-500 transition-all duration-300"
          >
            Start Shopping
          </motion.button>
        </div>
      </section>
    );
  }




  const handlePayment = ()=>{
      navigate("/payment", { state: { cartItems:cartData } });
  }

  return (
    <section className="min-h-screen bg-gradient-to-br font-[Roboto] from-white to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-700">Shopping Cart</h2>
          <button
            onClick={handleClearCart}
            className="text-red-500 text-sm hover:underline"
          >
            Remove all
          </button>
        </div>

        {cartData.map((item) => (
          <div
            key={item.productId._id}
            className="flex items-center justify-between py-6 "
          > 
            <div className="flex gap-4 items-center">
              <img
                src={item.productId.images?.[0]}
                alt={item.productId.name}
                className="w-14 h-14 rounded object-cover"
              />
              <div>
                <h3 className="font-bold text-gray-800 text-lg">
                  {item.productId.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {item.productId.weight}kg
                </p>
              </div>
            </div>
            <div className="flex items-center  rounded-full overflow-hidden">
              <button
                className="px-3 py-3  cursor-pointer  bg-gray-100 rounded-full hover:bg-gray-200"
                onClick={() => handleQuantity(item.productId._id, 1)}
              >
                <Plus className="w-4 h-4" />
              </button>
              <span className="px-4 text-sm font-bold">{item.quantity}</span>
              <button
                className="px-3 py-3 cursor-pointer rounded-full bg-gray-100 hover:bg-gray-200"
                onClick={() => handleQuantity(item.productId._id, -1)}
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right text-sm text-red-500 flex flex-col  items-end">
                <p className="text-lg font-semibold text-gray-800">
                  ₹{item.productId.discountedPrice.toFixed(2) * item.quantity}
                </p>
                <button className="text-blue-500 hover:underline">
                  Save for later
                </button>
                <button
                  onClick={() => handleRemoveItem(item.productId._id)}
                  className="hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Subtotal */}
        <div className="mt-6 pt-6 border-t flex justify-end gap-6 items-end">
          <div>
            <p className="text-gray-600 text-sm">Sub-Total</p>
            <p className="text-gray-400 text-xs">{cartData.length} items</p>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            ₹{subtotal.toFixed(2)}
          </p>
        </div>

        {/* Checkout */}
        <button className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full text-lg font-medium transition" onClick={()=>handlePayment()}>
          Checkout
        </button>

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

export default Cart;
