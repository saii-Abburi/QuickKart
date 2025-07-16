import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Toast from "./Toast";

const SignIn = () => {
  const [signIn, setSignIn] = useState(true);
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const userId = window.localStorage.getItem('userId')
  const panelVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };
  const [toast, setToast] = useState(null);
  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    const endpoint = signIn
      ? `${import.meta.env.VITE_HOST_STRING}/app/v1/users/login`
      : `${import.meta.env.VITE_HOST_STRING}/app/v1/users`;
    try {
      const res = await axios.post(endpoint, formData);
      console.log(res);

      const data = res.data;
      localStorage.setItem("token", data.token);
      localStorage.setItem("userType", data.user.role);
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("userId", data.user.id);
      if (data.user.role === "user") {
        window.location = "/products";
      } else {
        window.location = "/dashboard";
      }

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "",
      });
    } catch (err) {
      console.error("Error:", err.response?.data?.message || err.message);
      showToast(err.message, "failure");
    }
  };
  const addToCart = async (product) => {
    const endpoint = `${import.meta.env.HOST_STRING}/app/v1/cart/add`;
    try {
      const res = await axios.post(endpoint, {
        userId,
        productId: product._id,
        quantity: 1,
      });
      alert('added into the cart')
    } catch (error) {
      alert('error in adding to the cart')
    }
  };
  useEffect(() => {
    
    if (isLoggedIn) {
      const pendingProduct = localStorage.getItem("pendingCartProduct");

      if (pendingProduct) {
        const parsedProduct = JSON.parse(pendingProduct);
        addToCart(parsedProduct);
        localStorage.removeItem("pendingCartProduct");

        window.location.href = "/cart";
      }
    }
  }, [isLoggedIn]);

  return (
    <section className="h-max bg-white grid place-items-center px-4 ">
      <div
        className={`w-full max-w-4xl  bg-gray-50 rounded-2xl shadow-lg overflow-hidden max-sm:flex-col max-sm:h-max
        flex ${
          !signIn ? "flex-row-reverse" : "flex-row"
        } transition-all duration-500`}
      >
        {/* Left Info Panel */}
        <div
          className={`flex-1 bg-purple-500 text-white p-8 flex flex-col justify-center
          ${
            signIn
              ? "rounded-tr-2xl rounded-br-2xl"
              : "rounded-tl-2xl rounded-bl-2xl"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={signIn ? "info-signin" : "info-register"}
              initial={{ opacity: 0, x: signIn ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: signIn ? 100 : -100 }}
              transition={{ duration: 0.4 }}
              className={`flex-1 bg-purple-500 text-white p-8 flex flex-col justify-center
      ${
        signIn
          ? "rounded-tr-2xl rounded-br-2xl"
          : "rounded-tl-2xl rounded-bl-2xl"
      }`}
            >
              <h1 className="text-3xl font-bold mb-4">
                {signIn ? "New Here?" : "Already Have an Account?"}
              </h1>
              <p className="mb-6">
                {signIn
                  ? "Register now and enjoy amazing discounts on your shopping!"
                  : "Login to continue shopping smart and sustainably with FlashCart."}
              </p>
              <button
                onClick={() => setSignIn(!signIn)}
                className="bg-white text-purple-500 font-semibold px-6 py-2 rounded-md hover:bg-gray-100 transition"
              >
                {signIn ? "Create Account" : "Go to Login"}
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Form Panel with Animation */}
        <div className="flex-1 p-8 bg-white flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={signIn ? "sign-in" : "register"}
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <h2 className="text-2xl font-bold text-purple-500 mb-6">
                {signIn ? "Sign In" : "Register"}
              </h2>
              <form className="space-y-6" onSubmit={handleLogin}>
                {!signIn && (
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder=" "
                      className="peer w-full border border-gray-300 px-4 pt-6 pb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-4 top-2 bg-white text-gray-500 text-sm transition-all duration-200 
                        peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-90%] 
                        peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                        peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-500"
                    >
                      Name
                    </label>
                  </div>
                )}

                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder=" "
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="peer w-full border border-gray-300 px-4 pt-6 pb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-2 bg-white text-gray-500 text-sm transition-all duration-200 
                      peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-90%] 
                      peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                      peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-500"
                  >
                    Email
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    required
                    placeholder=" "
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="peer w-full border border-gray-300 px-4 pt-6 pb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-4 top-2 bg-white text-gray-500 text-sm transition-all duration-200 
                      peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-90%] 
                      peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                      peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-500"
                  >
                    Password
                  </label>
                </div>

                {!signIn && (
                  <div className="relative">
                    <select
                      id="role"
                      required
                      value={formData.role}
                      onChange={(e) => {
                        setFormData({ ...formData, role: e.target.value });
                      }}
                      className="peer w-full border bg-white border-gray-300 px-4 pt-6 pb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option value="">Select Role</option>
                      <option value="user">User</option>
                      <option value="seller">Seller</option>
                    </select>
                    <label
                      htmlFor="role"
                      className="absolute left-4 top-2 text-gray-500 text-sm transition-all duration-200 
                        peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-500 
                        peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] 
                        peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400"
                    >
                      Select Role
                    </label>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-purple-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-purple-600 transition"
                >
                  {signIn ? "Login" : "Register"}
                </button>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
};

export default SignIn;
