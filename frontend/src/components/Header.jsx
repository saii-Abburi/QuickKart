import React, { useState } from "react";
import { Heart, Menu, ShoppingCart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = ({ loggedIn, userType }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate("/profile");
  };
  return (
    <header className="bg-white shadow-md sticky top-0 z-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="text-3xl font-bold text-primary">
          QuickCart
        </a>

        {/* Desktop Navigation */}
        {!["seller", "admin"].includes(userType) && (
          <nav className="hidden md:flex space-x-6 text-base text-dark font-medium">
            <a
              href="/"
              className="hover:underline underline-offset-4 text-[18px]"
            >
              Home
            </a>
            <a
              href="/products"
              className="hover:underline underline-offset-4 text-[18px]"
            >
              Shop
            </a>
            <a
              href="/about"
              className="hover:underline underline-offset-4 text-[18px]"
            >
              About
            </a>
            <a
              href="/contact"
              className="hover:underline underline-offset-4 text-[18px]"
            >
              Contact
            </a>
          </nav>
        )}

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={() => setOpenMenu(!openMenu)}>
            <Menu size={28} />
          </button>
        </div>

        {/* Cart and Login */}
        <div className="flex items-center space-x-4">
          {(!loggedIn || userType === "user") && (
            <>
              <a href="/saved">
                <Heart  className="w-10 h-10 hover:bg-slate-100 p-2 rounded-full cursor-pointer"/>
              </a>
              <a href="/cart" className="relative">
                <ShoppingCart className="w-10 h-10 hover:bg-slate-100 p-2 rounded-full cursor-pointer" />
              </a>
            </>
          )}
          {!loggedIn ? (
            <a
              href="/login"
              className="text-black text-[18px]  bg-purple-400 p-2 rounded-tr-2xl rounded-bl-2xl shadow-md  hover:bg-purple-600/80 transition-colors"
            >
              Login
            </a>
          ) : (
            <div className="flex items-center gap-4 p-4">
              <User
                onClick={handleImageClick}
                className="w-10 h-10 hover:bg-slate-100 p-2 rounded-full cursor-pointer"
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
        <div className="md:hidden flex flex-col bg-white shadow-md px-4 py-2 space-y-2 text-dark text-base font-medium anima">
          <a href="/">Home</a>
          <a href="/products">Shop</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
      )}
    </header>
  );
};

export default Header;
