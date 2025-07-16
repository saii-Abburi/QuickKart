import React, { useState } from "react";
import { Heart, Menu, ShoppingCart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = ({ loggedIn, userType }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleImageClick = () => {
    navigate("/profile");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-3xl font-bold text-primary">
          QuickCart
        </a>

        {/* Desktop Navigation */}
        {!["seller", "admin"].includes(userType) && (
          <nav className="hidden md:flex space-x-6 text-base text-dark font-medium">
            <a href="/" className="hover:underline underline-offset-4 text-[18px]">
              Home
            </a>
            <a href="/products" className="hover:underline underline-offset-4 text-[18px]">
              Shop
            </a>
            <a href="/about" className="hover:underline underline-offset-4 text-[18px]">
              About
            </a>
            <a href="/contact" className="hover:underline underline-offset-4 text-[18px]">
              Contact
            </a>
          </nav>
        )}

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Menu size={26} />
            </button>
          </div>

          {/* Cart & Saved (Visible for users only) */}
          {(!loggedIn || userType === "user") && (
            <div className="hidden sm:flex items-center space-x-3">
              <a href="/saved">
                <Heart className="w-9 h-9 hover:bg-slate-100 p-2 rounded-full cursor-pointer" />
              </a>
              <a href="/cart" className="relative">
                <ShoppingCart className="w-9 h-9 hover:bg-slate-100 p-2 rounded-full cursor-pointer" />
              </a>
            </div>
          )}

          {/* Auth Section */}
          {!loggedIn ? (
            <a
              href="/login"
              className="hidden sm:block text-black text-[16px] bg-purple-400 px-4 py-2 rounded-tr-2xl rounded-bl-2xl shadow-md hover:bg-purple-600/80 transition-colors"
            >
              Login
            </a>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <User
                onClick={handleImageClick}
                className="w-9 h-9 hover:bg-slate-100 p-2 rounded-full cursor-pointer"
              />
              <button
                className="bg-red-500 px-4 py-2 text-white rounded-2xl hover:bg-red-600 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {openMenu && (
        <div className="md:hidden w-full bg-white shadow-md border-t animate-slide-down">
          <div className="flex flex-col p-4 space-y-3 text-dark font-medium text-[17px]">
            <a href="/" className="hover:text-purple-600">Home</a>
            <a href="/products" className="hover:text-purple-600">Shop</a>
            <a href="/about" className="hover:text-purple-600">About</a>
            <a href="/contact" className="hover:text-purple-600">Contact</a>

            {/* Mobile Only Saved & Cart */}
            {(!loggedIn || userType === "user") && (
              <div className="flex items-center gap-4 pt-3 border-t">
                <a href="/saved">
                  <Heart className="w-8 h-8 hover:bg-slate-100 p-2 rounded-full cursor-pointer" />
                </a>
                <a href="/cart">
                  <ShoppingCart className="w-8 h-8 hover:bg-slate-100 p-2 rounded-full cursor-pointer" />
                </a>
              </div>
            )}

            {/* Mobile Auth Buttons */}
            {!loggedIn ? (
              <a
                href="/login"
                className="block text-center mt-2 text-white text-[16px] bg-purple-500 px-4 py-2 rounded-xl hover:bg-purple-600 transition"
              >
                Login
              </a>
            ) : (
              <div className="flex flex-col gap-3 pt-3 border-t">
                <button
                  onClick={handleImageClick}
                  className="flex items-center justify-center gap-2 bg-gray-100 py-2 rounded-xl hover:bg-gray-200"
                >
                  <User /> Profile
                </button>
                <button
                  className="bg-red-500 py-2 text-white rounded-xl hover:bg-red-600 transition"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
